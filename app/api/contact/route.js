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

const FROM_ADDRESS  = "HarmoniQ Solutions <noreply@info.harmoniqsolutions.com>";
const TO_ADDRESS    = "sales@harmoniqsolutions.com";

export async function POST(request) {
  // Instantiated here (not at module level) so the build succeeds
  // without RESEND_API_KEY present — it's only needed at request time.
  const resend = new Resend(process.env.RESEND_API_KEY);

  // ---- Parse request body ----
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, company, message } = body;

  // ---- Server-side validation ----
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  // ---- Send both emails in parallel via Resend ----
  try {
    await Promise.all([
      // 1. Internal notification to the HarmoniQ team
      resend.emails.send({
        from:    FROM_ADDRESS,
        to:      TO_ADDRESS,
        // Reply-To lets the team hit Reply and go straight to the submitter
        replyTo: email,
        subject: `New quote request from ${name.trim()}`,
        html:    buildInternalEmail({ name, email, phone, company, message }),
      }),

      // 2. Confirmation to the person who submitted the form
      resend.emails.send({
        from:    FROM_ADDRESS,
        to:      email,
        subject: "We received your message — HarmoniQ Solutions",
        html:    buildConfirmationEmail({ name, message }),
      }),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("[contact] Resend error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
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
    .replace(/"/g, "&quot;");

// Shared email shell — wraps content in the dark branded layout
function emailShell({ headerLabel, headerTitle, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#111111;border-radius:12px;border:1px solid rgba(255,255,255,0.1);overflow:hidden;max-width:600px;width:100%">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a2340 0%,#0f1629 100%);
                     padding:32px 36px;border-bottom:1px solid rgba(59,130,246,0.2)">
            <!-- Horizontal logo — transparent PNG renders correctly over the dark header -->
            <img
              src="https://harmoniqsolutions.com/images/logo-horizontal.png"
              alt="HarmoniQ Solutions"
              width="160"
              height="27"
              style="display:block;width:160px;height:auto;margin-bottom:20px"
            />
            <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;
                      letter-spacing:0.15em;color:#3b82f6">${headerLabel}</p>
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
            <p style="margin:0;font-size:12px;color:#4b5563">
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
function buildInternalEmail({ name, email, phone, company, message }) {
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
      ${row("Company", company)}
    </table>
    <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08)">
      <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;
                letter-spacing:0.1em;color:#6b7280">Message</p>
      <p style="margin:0;font-size:14px;color:#d1d5db;line-height:1.7;
                white-space:pre-wrap">${escape(message)}</p>
    </div>
    <div style="margin-top:24px">
      <p style="margin:0;font-size:12px;color:#6b7280">
        Reply directly to this email to respond to ${escape(name)}.
      </p>
    </div>`;

  return emailShell({
    headerLabel: "HarmoniQ Solutions — New Inquiry",
    headerTitle: `Quote request from ${escape(name)}`,
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
      our team will follow up with you shortly.
    </p>

    <!-- Echo their message back -->
    <div style="margin:28px 0;padding:20px 24px;background:rgba(255,255,255,0.04);
                border-left:3px solid #3b82f6;border-radius:0 8px 8px 0">
      <p style="margin:0 0 8px;font-size:11px;font-weight:600;text-transform:uppercase;
                letter-spacing:0.1em;color:#6b7280">Your message</p>
      <p style="margin:0;font-size:14px;color:#9ca3af;line-height:1.7;
                white-space:pre-wrap">${escape(message)}</p>
    </div>

    <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.7">
      In the meantime, feel free to reach us directly at
      <a href="mailto:sales@harmoniqsolutions.com"
         style="color:#3b82f6;text-decoration:none">sales@harmoniqsolutions.com</a>
      or by phone at
      <a href="tel:+15512231520" style="color:#3b82f6;text-decoration:none">+1 551-223-1520</a>.
    </p>`;

  return emailShell({
    headerLabel: "HarmoniQ Solutions",
    headerTitle: "We received your message",
    bodyHtml,
  });
}
