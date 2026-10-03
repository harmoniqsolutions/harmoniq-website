import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createContext, SourceTextModule, SyntheticModule } from "node:vm";

// Run the real route in isolation. Never import the real email SDK or use
// process credentials: every delivery and deferred callback is controlled here.
const routeSource = await readFile(new URL("../app/api/contact/route.js", import.meta.url), "utf8");
const projectTypes = {
  mixed: "A mix of services / I’m not sure yet",
  av: "Audio & video",
  it: "IT, networks & Wi-Fi",
  security: "Security cameras & systems",
};
const accepted = () => ({ data: { id: "mock-email-id" }, error: null });
const valid = { name: "Jane Smith", email: "jane@example.com", message: "Improve the church sound system.", service: "av" };

async function harness({ configured = true, send = async () => accepted() } = {}) {
  const deliveries = [];
  const callbacks = [];
  const logs = [];
  let constructors = 0;
  class MockResend {
    constructor() {
      constructors += 1;
      this.emails = {
        send: async (email) => {
          deliveries.push(email);
          return send(email, deliveries.length);
        },
      };
    }
  }
  const context = createContext({
    Response, TextEncoder,
    process: { env: configured ? { RESEND_API_KEY: "mock-only-key" } : {} },
    console: { error: (...args) => logs.push(args.join(" ")) },
  });
  const dependencies = {
    resend: { Resend: MockResend },
    "next/server": { after: (callback) => callbacks.push(callback) },
    "@/lib/site": { PROJECT_TYPES: projectTypes, SITE: { email: "team@example.com" } },
  };
  const route = new SourceTextModule(routeSource, { context, identifier: "contact-route" });
  await route.link((specifier) => {
    const exports = dependencies[specifier];
    assert.ok(exports, `Unexpected dependency: ${specifier}`);
    return new SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await route.evaluate();
  return {
    deliveries, callbacks, logs,
    constructors: () => constructors,
    post: (body) => route.namespace.POST(new Request("https://example.com/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    })),
    postRaw: (body) => route.namespace.POST(new Request("https://example.com/api/contact", { method: "POST", body })),
    runAfter: async () => { for (const callback of callbacks.splice(0)) await callback(); },
  };
}

async function rejected(body, status = 400) {
  const app = await harness();
  const response = await app.post(body);
  assert.equal(response.status, status);
  assert.equal(typeof (await response.json()).error, "string");
  assert.equal(app.deliveries.length, 0);
  assert.equal(app.callbacks.length, 0);
}

test("malformed JSON and non-object requests fail without sending email", async () => {
  const app = await harness();
  assert.equal((await app.postRaw("{invalid")).status, 400);
  for (const body of [null, [], "text", 42, true]) await rejected(body);
  assert.equal(app.constructors(), 0);
});

test("required fields reject missing, empty, and whitespace-only values", async () => {
  for (const field of ["name", "email", "message"]) {
    for (const value of [undefined, "", "  \n\t "]) await rejected({ ...valid, [field]: value });
  }
});

test("all form fields reject unexpected types instead of throwing", async () => {
  for (const field of ["name", "email", "phone", "company", "message"]) {
    for (const value of [null, 7, true, [], {}]) await rejected({ ...valid, [field]: value });
  }
});

test("email, project types, and control characters are validated", async () => {
  for (const email of ["invalid", "jane@example", "jane @example.com", "jane@example.com\nother@example.com"]) await rejected({ ...valid, email });
  for (const service of ["unknown", "__proto__", "toString", 5, {}]) await rejected({ ...valid, service });
  for (const field of ["name", "phone", "company"]) await rejected({ ...valid, [field]: "Jane\nBcc: address" });
  await rejected({ ...valid, message: "hello\u0000there" });
});

test("field limits accept the boundary and reject oversized values", async () => {
  const limits = { name: 120, phone: 40, company: 160, message: 6000 };
  for (const [field, limit] of Object.entries(limits)) {
    const app = await harness();
    assert.equal((await app.post({ ...valid, [field]: "x".repeat(limit) })).status, 200);
    await rejected({ ...valid, [field]: "x".repeat(limit + 1) });
  }
  const app = await harness();
  assert.equal((await app.post({ ...valid, email: `${"x".repeat(242)}@example.com` })).status, 200);
  await rejected({ ...valid, email: `${"x".repeat(243)}@example.com` });
});

test("request size is bounded in bytes, including multibyte input", async () => {
  await rejected({ ...valid, message: "x".repeat(33000) }, 413);
  const app = await harness();
  assert.equal((await app.postRaw(`{"extra":"${"é".repeat(16000)}"}`)).status, 413);
  assert.equal(app.deliveries.length, 0);
});

test("missing email configuration fails safely without constructing the provider", async () => {
  const app = await harness({ configured: false });
  assert.equal((await app.post(valid)).status, 503);
  assert.equal(app.constructors(), 0);
  assert.equal(app.callbacks.length, 0);
  assert.ok(!app.logs.join(" ").includes("mock-only-key"));
});

test("successful inquiry trims fields and uses shared team address and project labels", async () => {
  const app = await harness();
  const response = await app.post({ ...valid, name: " Jane Smith ", email: " jane@example.com ", company: " Local church ", phone: " 555-1234 " });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(app.deliveries.length, 1);
  const [notification] = app.deliveries;
  assert.equal(notification.to, "team@example.com");
  assert.equal(notification.replyTo, "jane@example.com");
  assert.equal(notification.subject, "New project inquiry from Jane Smith");
  assert.ok(notification.html.includes("Audio &amp; video"));
  assert.ok(notification.html.includes("Local church"));
  assert.ok(notification.html.includes("555-1234"));
  assert.equal(app.callbacks.length, 1);
  await app.runAfter();
  assert.equal(app.deliveries.length, 2);
  assert.equal(app.deliveries[1].to, "jane@example.com");
});

test("optional fields can be omitted and project type defaults to mixed", async () => {
  const app = await harness();
  const response = await app.post({ name: valid.name, email: valid.email, message: valid.message });
  assert.equal(response.status, 200);
  assert.ok(app.deliveries[0].html.includes(projectTypes.mixed));
});

test("untrusted fields are escaped in both notification and confirmation HTML", async () => {
  const app = await harness();
  const attack = `<script>alert("x" & 'y')</script>`;
  const escaped = "&lt;script&gt;alert(&quot;x&quot; &amp; &#39;y&#39;)&lt;/script&gt;";
  assert.equal((await app.post({ ...valid, name: attack, phone: `<b>123</b>`, company: attack, message: `${attack}\nNext line` })).status, 200);
  await app.runAfter();
  for (const email of app.deliveries) {
    assert.ok(email.html.includes(escaped));
    assert.ok(!email.html.includes("<script>"));
    assert.ok(!email.html.includes("<b>123</b>"));
    assert.ok(email.html.includes("\nNext line"));
  }
});

test("provider errors and missing acceptance IDs never report success or schedule confirmation", async () => {
  for (const result of [{ error: { message: "provider-private-detail" }, data: null }, { data: null, error: null }, { data: {} }]) {
    const app = await harness({ send: async () => result });
    const response = await app.post(valid);
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.ok(body.error);
    assert.equal(body.success, undefined);
    assert.equal(app.deliveries.length, 1);
    assert.equal(app.callbacks.length, 0);
    assert.ok(!JSON.stringify(body).includes("provider-private-detail"));
    assert.ok(!app.logs.join(" ").includes("provider-private-detail"));
  }
});

test("thrown provider errors return a recoverable failure without exposing details", async () => {
  const app = await harness({ send: async () => { throw new Error("private-provider-error"); } });
  const response = await app.post(valid);
  assert.equal(response.status, 502);
  assert.ok(!(await response.text()).includes("private-provider-error"));
  assert.equal(app.callbacks.length, 0);
});

test("confirmation failures after delivery cannot change the accepted response", async () => {
  for (const failure of ["returned", "thrown"]) {
    const app = await harness({ send: async (_email, count) => {
      if (count === 1) return accepted();
      if (failure === "thrown") throw new Error("confirmation-private-detail");
      return { error: { message: "confirmation-private-detail" }, data: null };
    } });
    const response = await app.post(valid);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    await assert.doesNotReject(() => app.runAfter());
    assert.equal(app.deliveries.length, 2);
    assert.ok(app.logs.length > 0);
    assert.ok(!app.logs.join(" ").includes("confirmation-private-detail"));
  }
});

test("response awaits team delivery while confirmation runs only in the background", async () => {
  let notifyStarted;
  let acceptNotification;
  let confirmationStarted;
  let finishConfirmation;
  const started = new Promise((resolve) => { notifyStarted = resolve; });
  const notification = new Promise((resolve) => { acceptNotification = resolve; });
  const backgroundStarted = new Promise((resolve) => { confirmationStarted = resolve; });
  const confirmation = new Promise((resolve) => { finishConfirmation = resolve; });
  const app = await harness({ send: (_email, count) => {
    if (count === 1) { notifyStarted(); return notification; }
    confirmationStarted();
    return confirmation;
  } });
  let responseSettled = false;
  const pendingResponse = app.post(valid).then((response) => { responseSettled = true; return response; });
  await started;
  assert.equal(responseSettled, false);
  assert.equal(app.callbacks.length, 0);
  acceptNotification(accepted());
  const response = await pendingResponse;
  assert.equal(response.status, 200);
  assert.equal(app.deliveries.length, 1);
  const background = app.runAfter();
  await backgroundStarted;
  assert.equal(responseSettled, true);
  assert.deepEqual(await response.json(), { success: true });
  finishConfirmation(accepted());
  await background;
  assert.equal(app.deliveries.length, 2);
});
