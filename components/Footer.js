import Image from "next/image";
import Icon from "@/components/Icon";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-container footer-grid">
        <div className="footer-brand"><a href="#hero" aria-label="HarmoniQ Solutions, back to top"><Image src="/images/logo-horizontal.png" alt="HarmoniQ Solutions" width={360} height={60} className="nav-logo" /></a><p>Audio. Video. IT. Security.<br />Thoughtfully connected, personally installed.</p></div>
        <div><h2>Explore</h2><ul>{NAV_LINKS.map(({ href, label }) => <li key={href}><a href={href}>{label}</a></li>)}</ul></div>
        <div><h2>Get in touch</h2><ul><li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li><li><a href={SITE.phoneHref}>{SITE.phone}</a></li><li><a href="#contact">Tell us about your project <Icon name="arrow" /></a></li></ul></div>
      </div>
      <div className="section-container footer-bottom"><p>© {new Date().getFullYear()} HarmoniQ Solutions. All rights reserved.</p><a href="#hero">Back to top <Icon name="arrow" className="back-to-top-icon" /></a></div>
    </footer>
  );
}
