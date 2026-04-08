// =============================================================
// Footer.js — Site footer
//
// Four-column layout:
//   1. Brand (square logo + tagline)
//   2. Quick links (anchor nav)
//   3. Services list (abbreviated)
//   4. Contact info (email + phone)
//
// Bottom bar: copyright notice.
// This component has no client-side interactivity — Server Component.
// =============================================================

import Image from "next/image";

// ---------------------------------------------------------------------------
// Footer column data
// ---------------------------------------------------------------------------
const QUICK_LINKS = [
  { label: "Home",       href: "#hero"       },
  { label: "Services",   href: "#services"   },
  { label: "About",      href: "#about"      },
  { label: "Industries", href: "#industries" },
  { label: "Why Us",     href: "#why-us"     },
  { label: "Contact",    href: "#contact"    },
];

const SERVICES_LINKS = [
  "AV System Design",
  "Audio & Video Installation",
  "Conference Room Systems",
  "Sound Systems",
  "Video Walls & Displays",
  "System Integration & Control",
  "Training & Support",
];

// ---------------------------------------------------------------------------
// Shared link class
// ---------------------------------------------------------------------------
const LINK_CLASS =
  "text-sm text-gray-400 hover:text-accent-blue transition-colors duration-150";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">

      {/* ---- Main footer columns ---- */}
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <a href="#hero" aria-label="HarmoniQ Solutions — Back to top">
              <Image
                src="/images/logo-square.png"
                alt="HarmoniQ Solutions"
                width={64}
                height={64}
                className="w-14 h-14 object-contain"
              />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Professional audio-visual integration for modern commercial
              environments. Design. Install. Integrate.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-300">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={LINK_CLASS}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-300">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES_LINKS.map((svc) => (
                <li key={svc}>
                  <a href="#services" className={LINK_CLASS}>{svc}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-300">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href="mailto:sales@harmoniqsolutions.com"
                className="group flex items-start gap-3 text-gray-400
                           hover:text-accent-blue transition-colors duration-150"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-blue" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-sm leading-snug">sales@harmoniqsolutions.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+15512231520"
                className="group flex items-start gap-3 text-gray-400
                           hover:text-accent-blue transition-colors duration-150"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-blue" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.49 2 2 0 0 1 3.59 2.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.9-1.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="text-sm">+1 551-223-1520</span>
              </a>
            </div>

            {/* CTA button in footer */}
            <a
              href="#contact"
              className="mt-2 btn-primary text-sm py-2.5 text-center"
            >
              Request a Quote
            </a>
          </div>

        </div>

        {/* ---- Bottom bar ---- */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {year} HarmoniQ Solutions. All rights reserved.
          </p>

          {/* AVIXA membership badge */}
          <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity duration-200">
            <Image
              src="/images/avixa.png"
              alt="AVIXA Member"
              width={100}
              height={50}
              className="h-10 w-auto object-contain"
            />
            <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
              AVIXA Member
            </span>
          </div>

          <p className="text-xs text-gray-600">
            Professional AV Integration Services
          </p>
        </div>

      </div>
    </footer>
  );
}
