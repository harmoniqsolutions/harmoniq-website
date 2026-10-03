// =============================================================
// POST /api/contact
//
// Sends two emails on each form submission:
//   1. Internal notification → sales@harmoniqsolutions.com
//   2. Confirmation          → submitter's email address
//
// Environment variables required:
//   RESEND_API_KEY — from resend.com/api-keys
//
// FROM address requires info.harmoniqsolutions.com to be verified
// in the Resend dashboard: resend.com/domains → Add Domain
// =============================================================

import { Resend } from "resend";
import { after } from "next/server";
import { PROJECT_TYPES, SITE } from "@/lib/site";

const FROM_ADDRESS  = "HarmoniQ Solutions <noreply@info.harmoniqsolutions.com>";
const TO_ADDRESS = SITE.email;

const FIELD_LIMITS = { name: 120, email: 254, phone: 40, company: 160, message: 6000 };
const DELIVERY_ERROR = "We couldn't send your message. Your details are still here. Please try again, or call or email us directly.";

export async function POST(request) {
  let body;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > 32000) {
      return Response.json({ error: "Please shorten your project details and try again." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "We couldn't read your message. Please try again." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Please fill out the contact form and try again." }, { status: 400 });
  }

  const fields = {};
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    if (body[field] !== undefined && typeof body[field] !== "string") {
      return Response.json({ error: "Please check the contact form fields and try again." }, { status: 400 });
    }
    fields[field] = (body[field] ?? "").trim();
    if (fields[field].length > limit) {
      return Response.json({ error: `Please keep ${field === "message" ? "project details" : field} under ${limit} characters.` }, { status: 400 });
    }
  }

  const { name, email, phone, company, message } = fields;
  if (!name || !email || !message) {
    return Response.json({ error: "Please add your name, email, and project details." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please check your email address and try again." }, { status: 400 });
  }
  if ([name, email, phone, company].some((value) => /[\u0000-\u001f\u007f]/.test(value)) || message.includes("\u0000")) {
    return Response.json({ error: "Please remove unexpected characters from the form and try again." }, { status: 400 });
  }
  const service = body.service ?? "mixed";
  if (typeof service !== "string" || !Object.hasOwn(PROJECT_TYPES, service)) {
    return Response.json({ error: "Please choose a project type from the list." }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] Email service is not configured.");
    return Response.json({ error: DELIVERY_ERROR }, { status: 503 });
  }

  // A successful inquiry means the team notification was accepted by Resend.
  // The SDK returns provider failures in `error`; they don't necessarily throw.
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const notification = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: buildInternalEmail({ name, email, phone, company, message, service: PROJECT_TYPES[service] }),
    });
    if (notification.error || !notification.data?.id) {
      console.error("[contact] Team notification was not accepted.");
      return Response.json({ error: DELIVERY_ERROR }, { status: 502 });
    }

    // Confirmation is best effort: never ask a customer to resend an inquiry
    // already delivered to the team just because the confirmation failed.
    after(async () => {
      try {
        const confirmation = await resend.emails.send({
          from: FROM_ADDRESS,
          to: email,
          subject: "We received your message — HarmoniQ Solutions",
          html: buildConfirmationEmail({ name, message }),
        });
        if (confirmation.error || !confirmation.data?.id) {
          console.error("[contact] Inquiry accepted; confirmation was not accepted.");
        }
      } catch {
        console.error("[contact] Inquiry accepted; confirmation could not be sent.");
      }
    });
    return Response.json({ success: true });
  } catch {
    console.error("[contact] Email delivery could not be confirmed.");
    return Response.json({ error: DELIVERY_ERROR }, { status: 502 });
  }
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

// Escape HTML entities to prevent injection via form fields
const escape = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Shared email shell — wraps content in the dark branded layout
function emailShell({ headerLabel, headerTitle, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080b10;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080b10;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#111820;border-radius:12px;border:1px solid rgba(255,255,255,0.1);overflow:hidden;max-width:600px;width:100%">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#102c35 0%,#111820 100%);
                     padding:32px 36px;border-bottom:1px solid rgba(102,232,237,0.2)">
            <!-- Horizontal logo — transparent PNG renders correctly over the dark header -->
            <img
              src="https://harmoniqsolutions.com/images/logo-horizontal.png"
              alt="HarmoniQ Solutions"
              width="160"
              height="27"
              style="display:block;width:160px;height:auto;margin-bottom:20px"
            />
            <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;
                      letter-spacing:0.15em;color:#66e8ed">${headerLabel}</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff">
              ${headerTitle}
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:32px 36px">${bodyHtml}</td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06)">
            <p style="margin:0;font-size:12px;color:#94a3b8">
              HarmoniQ Solutions &nbsp;·&nbsp; harmoniqsolutions.com
              &nbsp;·&nbsp; +1 551-223-1520
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 1. Internal notification email (to sales@harmoniqsolutions.com)
// ---------------------------------------------------------------------------
function buildInternalEmail({ name, email, phone, company, message, service }) {
  const row = (label, value) =>
    value
      ? `<tr>
           <td style="padding:6px 0;color:#9ca3af;font-size:13px;width:130px;vertical-align:top">${label}</td>
           <td style="padding:6px 0;color:#f3f4f6;font-size:14px;vertical-align:top">${escape(value)}</td>
         </tr>`
      : "";

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row("Name",    name)}
      ${row("Email",   email)}
      ${row("Phone",   phone)}
      ${row("Organization", company)}
      ${row("Project type", service)}
    </table>
    <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08)">
      <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;
                letter-spacing:0.1em;color:#94a3b8">Message</p>
      <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;
                white-space:pre-wrap">${escape(message)}</p>
    </div>
    <div style="margin-top:24px">
      <p style="margin:0;font-size:12px;color:#94a3b8">
        Reply directly to this email to respond to ${escape(name)}.
      </p>
    </div>`;

  return emailShell({
    headerLabel: "HarmoniQ Solutions — New Inquiry",
    headerTitle: `Project inquiry from ${escape(name)}`,
    bodyHtml,
  });
}

// ---------------------------------------------------------------------------
// 2. Confirmation email (to the person who submitted the form)
// ---------------------------------------------------------------------------
function buildConfirmationEmail({ name, message }) {
  const bodyHtml = `
    <p style="margin:0 0 20px;font-size:15px;color:#d1d5db;line-height:1.7">
      Hi ${escape(name.trim().split(" ")[0])},
    </p>
    <p style="margin:0 0 20px;font-size:15px;color:#d1d5db;line-height:1.7">
      Thank you for reaching out. We've received your message and a member of
      our team will review your project details and get in touch.
    </p>

    <!-- Echo their message back -->
    <div style="margin:28px 0;padding:20px 24px;background:rgba(255,255,255,0.04);
                border-left:3px solid #66e8ed;border-radius:0 8px 8px 0">
      <p style="margin:0 0 8px;font-size:11px;font-weight:600;text-transform:uppercase;
                letter-spacing:0.1em;color:#94a3b8">Your message</p>
      <p style="margin:0;font-size:14px;color:#9ca3af;line-height:1.7;
                white-space:pre-wrap">${escape(message)}</p>
    </div>

    <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.7">
      In the meantime, feel free to reach us directly at
      <a href="mailto:sales@harmoniqsolutions.com"
         style="color:#66e8ed;text-decoration:none">sales@harmoniqsolutions.com</a>
      or by phone at
      <a href="tel:+15512231520" style="color:#66e8ed;text-decoration:none">+1 551-223-1520</a>.
    </p>`;

  return emailShell({
    headerLabel: "HarmoniQ Solutions",
    headerTitle: "We received your message",
    bodyHtml,
  });
}
