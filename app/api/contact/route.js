// =============================================================
// POST /api/contact
//
// Receives form submissions from the Contact section and sends
// a notification email to sales@harmoniqsolutions.com via Resend.
//
// Environment variables required:
//   RESEND_API_KEY — from resend.com/api-keys
//
// FROM address note:
//   Without domain verification on Resend, the from address must
//   be "onboarding@resend.dev". Once you verify harmoniqsolutions.com
//   in the Resend dashboard, change FROM_ADDRESS to
//   "HarmoniQ Website <noreply@harmoniqsolutions.com>".
// =============================================================

import { Resend } from "resend";

// Change FROM_ADDRESS to "HarmoniQ Website <noreply@harmoniqsolutions.com>"
// after verifying your domain in the Resend dashboard.
const FROM_ADDRESS = "HarmoniQ Website <onboarding@resend.dev>";
const TO_ADDRESS   = "sales@harmoniqsolutions.com";

export async function POST(request) {
  // Resend is instantiated here (not at module level) so the build succeeds
  // even when RESEND_API_KEY isn't present at build time — it's only needed
  // at request time in the Vercel runtime.
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

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  // ---- Send email via Resend ----
  try {
    await resend.emails.send({
      from:     FROM_ADDRESS,
      to:       TO_ADDRESS,
      // Reply-To is set to the submitter's email so the team can
      // reply directly to the prospect from their inbox.
      replyTo:  email,
      subject:  `New quote request from ${name.trim()}`,
      html:     buildEmailHtml({ name, email, phone, company, message }),
    });

    return Response.json({ success: true });
  } catch (error) {
    // Log server-side but don't expose internals to the client
    console.error("[contact] Resend error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Email HTML template
// Plain but clean — renders well in Gmail, Outlook, Apple Mail.
// ---------------------------------------------------------------------------
function buildEmailHtml({ name, email, phone, company, message }) {
  // Escape HTML entities to prevent injection via form fields
  const escape = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const row = (label, value) =>
    value
      ? `<tr>
           <td style="padding:6px 0;color:#9ca3af;font-size:13px;width:130px;vertical-align:top">${label}</td>
           <td style="padding:6px 0;color:#f3f4f6;font-size:14px;vertical-align:top">${escape(value)}</td>
         </tr>`
      : "";

  return `
<!DOCTYPE html>
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
            <p style="margin:0;font-size:11px;font-weight:600;text-transform:uppercase;
                      letter-spacing:0.15em;color:#3b82f6">HarmoniQ Solutions</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff">
              New Quote Request
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px">
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
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06)">
            <p style="margin:0;font-size:12px;color:#4b5563">
              Submitted via harmoniqsolutions.com — reply directly to this email to respond to ${escape(name)}.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
