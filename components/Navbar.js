// =============================================================
// Navbar.js — Sticky navigation bar
//
// Behavior:
//   • Fixed to top of viewport
//   • Transparent initially → glass blur when user scrolls > 50px
//   • Horizontal logo on the left (links back to #hero)
//   • Nav links scroll to page sections via anchor hrefs
//   • Mobile: hamburger icon → AnimatePresence slide-down menu
// =============================================================

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Navigation links — update hrefs to match section IDs in other components
// ---------------------------------------------------------------------------
const NAV_LINKS = [
  { label: "Home",       href: "#hero"       },
  { label: "Services",   href: "#services"   },
  { label: "About",      href: "#about"      },
  { label: "Industries", href: "#industries" },
  { label: "Why Us",     href: "#why-us"     },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  // ---- State ----
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  // ---- Scroll detection — switches navbar to glass style ----
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Body scroll lock while mobile menu is open ----
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ---- Close mobile menu on link click ----
  const handleLinkClick = () => setMobileOpen(false);

  return (
    <header
      className={[
        // Always fixed + full-width
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Scroll-triggered glass background
        scrolled
          ? "bg-black/70 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      {/* ----------------------------------------------------------------
          Main navbar row
      ---------------------------------------------------------------- */}
      <div className="section-container">
        <nav className="flex h-16 items-center justify-between">

          {/* ---------- Logo ---------- */}
          <a href="#hero" className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded">
            {/* Desktop logo */}
            <Image
              src="/images/logo-horizontal.png"
              alt="HarmoniQ Solutions"
              width={180}
              height={30}
              priority
              className="hidden sm:block h-7 w-auto object-contain"
            />
            {/* Mobile — slightly smaller */}
            <Image
              src="/images/logo-horizontal.png"
              alt="HarmoniQ Solutions"
              width={140}
              height={23}
              priority
              className="block sm:hidden h-6 w-auto object-contain"
            />
          </a>

          {/* ---------- Desktop nav links ---------- */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="px-3 py-2 text-sm text-gray-300 rounded-md
                             transition-colors duration-150
                             hover:text-white hover:bg-white/5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* ---------- Desktop CTA button ---------- */}
          <a
            href="#contact"
            className="hidden md:inline-flex btn-primary text-sm py-2 px-5"
          >
            Request a Quote
          </a>

          {/* ---------- Mobile hamburger ---------- */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white
                       hover:bg-white/5 transition-colors focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            {mobileOpen ? (
              /* X icon */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* ----------------------------------------------------------------
          Mobile menu — AnimatePresence handles mount/unmount transition
      ---------------------------------------------------------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0      }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden
                       bg-black/90 backdrop-blur-xl border-b border-white/10"
          >
            <ul className="section-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-base text-gray-300 rounded-lg
                               transition-colors hover:text-white hover:bg-white/5"
                  >
                    {label}
                  </a>
                </li>
              ))}
              {/* CTA in mobile menu */}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="block btn-primary text-center text-sm"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
