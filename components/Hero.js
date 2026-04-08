// =============================================================
// Hero.js — Full-viewport hero section
//
// Design:
//   • Full-screen dark background (deep-blue base)
//   • Floating gradient blob orbs (blue, purple, cyan) — CSS blur only,
//     Framer Motion moves them via transform to avoid repaints
//   • Subtle grid overlay
//   • Vignette at edges
//   • Centered content with staggered entrance animation
//   • Two CTA buttons: "Request a Quote" (primary) + "View Services" (ghost)
// =============================================================

"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Gradient blob definitions — each blob's color, position, and animation
// ---------------------------------------------------------------------------
const BLOBS = [
  {
    color: "radial-gradient(ellipse, rgba(59,130,246,0.45) 0%, transparent 70%)",
    size:  "600px",
    top:   "10%",
    left:  "5%",
    // Framer Motion keyframe arrays for x and y translate
    animX: [0, 40, -25, 0],
    animY: [0, -30, 20, 0],
    dur:   22,
  },
  {
    color: "radial-gradient(ellipse, rgba(139,92,246,0.35) 0%, transparent 70%)",
    size:  "500px",
    top:   "30%",
    right: "2%",
    animX: [0, -30, 20, 0],
    animY: [0, 25, -15, 0],
    dur:   18,
  },
  {
    color: "radial-gradient(ellipse, rgba(6,182,212,0.25) 0%, transparent 70%)",
    size:  "400px",
    bottom:"5%",
    left:  "35%",
    animX: [0, 20, -35, 0],
    animY: [0, -20, 30, 0],
    dur:   25,
  },
];

// ---------------------------------------------------------------------------
// Framer Motion stagger variants for the text + button block
// ---------------------------------------------------------------------------
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center
                 overflow-hidden bg-deep-blue"
    >
      {/* ----------------------------------------------------------------
          Background layer 1 — gradient blob orbs
          Only `transform` is animated (GPU-composited, no layout repaints).
          CSS filter:blur() is set once via inline style, never animated.
      ---------------------------------------------------------------- */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width:     blob.size,
            height:    blob.size,
            top:       blob.top    ?? "auto",
            left:      blob.left   ?? "auto",
            right:     blob.right  ?? "auto",
            bottom:    blob.bottom ?? "auto",
            background: blob.color,
            // blur is a CSS property, NOT animated — avoids expensive repaints
            filter:    "blur(100px)",
            willChange: "transform",
            pointerEvents: "none",
          }}
          animate={{ x: blob.animX, y: blob.animY }}
          transition={{
            duration: blob.dur,
            repeat:   Infinity,
            ease:     "linear",
          }}
        />
      ))}

      {/* ----------------------------------------------------------------
          Background layer 2 — subtle 60px grid overlay
      ---------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-overlay opacity-60"
      />

      {/* ----------------------------------------------------------------
          Background layer 3 — edge vignette to darken corners
      ---------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b
                   from-black/50 via-transparent to-black/70"
      />

      {/* ----------------------------------------------------------------
          Hero content — staggered entrance animation
      ---------------------------------------------------------------- */}
      <div className="relative z-10 section-container text-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl mx-auto"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={itemVariants}
            className="eyebrow text-accent-blue tracking-[0.25em]"
          >
            Professional Audio-Visual Integration
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight
                       tracking-tight text-white"
          >
            Design.{" "}
            <span className="text-gradient">Install.</span>{" "}
            Integrate.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            HarmoniQ Solutions engineers seamless audio-visual environments
            for modern commercial spaces — from conference rooms to large-scale
            deployments.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            {/* Primary CTA */}
            <motion.a
              href="#contact"
              className="btn-primary glow-blue text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{   scale: 0.97 }}
            >
              Request a Quote
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#services"
              className="btn-secondary text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{   scale: 0.97 }}
            >
              View Services
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-center gap-2 text-gray-600"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
