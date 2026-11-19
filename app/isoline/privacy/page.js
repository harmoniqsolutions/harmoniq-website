import { SITE } from "@/lib/site";

export const metadata = {
  title: "Isoline privacy policy | HarmoniQ Solutions",
  description: "Privacy policy for Isoline – Audio RTA, the real-time audio analyzer and SPL meter for iOS.",
  alternates: { canonical: "/isoline/privacy" },
};

export default function IsolinePrivacy() {
  return (
    <>
      <h1 className="section-heading">Isoline privacy policy</h1>
      <div className="section-intro space-y-5">
        <p><em>Last updated: November 18, 2026</em></p>
        <p>Isoline uses your device&apos;s microphone only to measure sound in real time. Audio is processed on your device and is never recorded, stored or transmitted.</p>
        <p>Isoline does not collect personal data, does not use analytics or advertising, and does not share information with third parties.</p>
        <p>Your settings, calibration values and saved traces stay on your device and are removed when you delete the app.</p>
        <p>If you buy an upgrade inside the app, the purchase is handled by Apple. We do not receive your payment details.</p>
        <p>Questions: <a className="text-[var(--cyan)] underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </>
  );
}
