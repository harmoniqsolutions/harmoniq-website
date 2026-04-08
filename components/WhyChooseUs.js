// =============================================================
// WhyChooseUs.js — Differentiator grid
//
// 6 key reasons to choose HarmoniQ, displayed in a 3×2 grid.
// Uses deep-blue background to visually separate from adjacent
// black sections. Hover glow is purple (vs blue on Services).
// =============================================================

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from "@/components/animations";

// ---------------------------------------------------------------------------
// Differentiator data
// ---------------------------------------------------------------------------
const REASONS = [
  {
    title: "Custom-Designed Systems",
    description:
      "No off-the-shelf packages. Every system is engineered from the ground up to match your space, workflow, and operational requirements.",
    icon: (
      // Layers / custom icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: "Clean, Professional Installs",
    description:
      "We take pride in installations that look as good as they perform — neat cable management, concealed hardware, and finished results.",
    icon: (
      // Check / quality icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: "Reliable Performance",
    description:
      "Systems designed with redundancy, proper signal levels, and proven hardware so your AV works every time — without surprises.",
    icon: (
      // Shield / reliability icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Scalable Solutions",
    description:
      "Infrastructure that grows with your organization — additional rooms, expanded functionality, and new technology integrated without disruption.",
    icon: (
      // Expand / scale icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 3 21 3 21 9"  />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    ),
  },
  {
    title: "Ongoing Support",
    description:
      "Post-installation support, remote diagnostics, preventive maintenance, and service agreements to keep your systems running at peak performance.",
    icon: (
      // Headset / support icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3  19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"  />
      </svg>
    ),
  },
  {
    title: "Certified Expertise",
    description:
      "Our team carries manufacturer certifications across leading AV platforms — ensuring your system is installed and programmed correctly the first time.",
    icon: (
      // Award / certified icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-deep-blue section-padding overflow-hidden">

      {/* Subtle radial glow at center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 section-container">

        {/* ---- Section heading ---- */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <p className="eyebrow text-accent-purple mb-3">Our Advantage</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-gradient">HarmoniQ</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            We bring technical depth, project discipline, and genuine care for
            outcome to every engagement.
          </p>
        </motion.div>

        {/* ---- Reasons grid ---- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {REASONS.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ReasonCard — individual differentiator card
// ---------------------------------------------------------------------------
function ReasonCard({ reason }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card p-6 flex flex-col gap-4
                 transition-all duration-300
                 hover:border-accent-purple/30
                 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]
                 cursor-default"
    >
      {/* Icon — smaller (36×36) */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                      bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
        <div className="w-5 h-5">{reason.icon}</div>
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base font-semibold text-white mb-2">
          {reason.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {reason.description}
        </p>
      </div>
    </motion.div>
  );
}
