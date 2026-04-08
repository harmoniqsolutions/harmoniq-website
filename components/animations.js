// =============================================================
// animations.js — Shared Framer Motion variants
//
// Import these into any "use client" component to get consistent
// fade-in, slide-up, and stagger animations across the site.
// =============================================================

"use client";

// ---------------------------------------------------------------------------
// Fade + slide up — used for section headings and block elements
// ---------------------------------------------------------------------------
export const fadeInUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Stagger container — wraps a grid of cards to stagger child entrance
// ---------------------------------------------------------------------------
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren:   0.15,
    },
  },
};

// ---------------------------------------------------------------------------
// Stagger item — individual card in a stagger grid
// ---------------------------------------------------------------------------
export const staggerItem = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Viewport config — trigger animation when 20% of element is visible,
// and only animate once (not on scroll back up)
// ---------------------------------------------------------------------------
export const viewportConfig = {
  once:   true,
  amount: 0.15,
};
