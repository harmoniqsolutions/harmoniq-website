import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Isoline support | HarmoniQ Solutions",
  description: "Support for Isoline – Audio RTA, the real-time audio analyzer and SPL meter for iOS.",
  alternates: { canonical: "/isoline/support" },
};

export default function IsolineSupport() {
  return (
    <>
      <h1 className="section-heading">Isoline support</h1>
      <div className="section-intro space-y-5">
        <p>Need help with Isoline? Contact us at <a className="text-[var(--cyan)] underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> and we&apos;ll get back to you.</p>
        <p><Link className="text-[var(--cyan)] underline" href="/isoline/privacy">Isoline privacy policy</Link></p>
      </div>
    </>
  );
}
