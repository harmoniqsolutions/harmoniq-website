// =============================================================
// Industries.js — Markets served grid
//
// 5 industry cards displayed in a single row at large screens.
// Each card gets a distinct accent color on hover.
// =============================================================

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from "@/components/animations";

// ---------------------------------------------------------------------------
// Industry data — icon is an inline SVG path string (24×24 viewBox)
// ---------------------------------------------------------------------------
const INDUSTRIES = [
  {
    title: "Corporate Offices",
    description:
      "Boardrooms, huddle spaces, executive briefing centers, and all-hands venues built for clear communication and seamless collaboration.",
    accent: "#3b82f6",
    icon: (
      // Building / office icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="2" />
        <polyline points="16 2 12 7 8 2" />
        <line x1="12" y1="22" x2="12" y2="11" />
        <line x1="2"  y1="14" x2="22" y2="14" />
      </svg>
    ),
  },
  {
    title: "Retail Spaces",
    description:
      "Dynamic digital signage, background music systems, and in-store displays that enhance the customer experience and drive engagement.",
    accent: "#8b5cf6",
    icon: (
      // Store / shopping icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l1-5h16l1 5" />
        <path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
        <line x1="1" y1="9" x2="23" y2="9" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    title: "Churches & Houses of Worship",
    description:
      "Intelligible speech, live-sound reinforcement, broadcast-ready video, and lighting integration for meaningful, distraction-free worship.",
    accent: "#06b6d4",
    icon: (
      // Music notes / worship icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6"  cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: "Event Spaces",
    description:
      "Scalable AV systems for ballrooms, convention centers, and multi-purpose venues — ready for keynotes, performances, and live events.",
    accent: "#3b82f6",
    icon: (
      // Stage / event icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Small to Mid-Sized Businesses",
    description:
      "Right-sized AV solutions for growing businesses — professional conferencing, lobby displays, and background audio without enterprise complexity.",
    accent: "#8b5cf6",
    icon: (
      // Team / SMB icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative bg-black section-padding overflow-hidden">

      {/* Grid overlay */}
      <div aria-hidden="true" className="absolute inset-0 grid-overlay opacity-40" />

      <div className="relative z-10 section-container">

        {/* ---- Section heading ---- */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <p className="eyebrow text-accent-blue mb-3">Markets We Serve</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Industries <span className="text-gradient">We Serve</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Wherever people gather to communicate, collaborate, or create
            experiences — HarmoniQ delivers the AV infrastructure that makes it happen.
          </p>
        </motion.div>

        {/* ---- Industry cards ---- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {INDUSTRIES.map((industry) => (
            <IndustryCard key={industry.title} industry={industry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// IndustryCard — individual industry tile
// ---------------------------------------------------------------------------
function IndustryCard({ industry }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card p-6 flex flex-col items-center text-center gap-4
                 transition-all duration-300 hover:border-white/20 cursor-default"
      style={{
        // Dynamic glow color per industry on hover — handled with CSS custom property
        "--hover-glow": `${industry.accent}25`,
      }}
    >
      {/* Icon circle */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${industry.accent}22 0%, ${industry.accent}11 100%)`,
          border:     `1px solid ${industry.accent}33`,
          color:      industry.accent,
        }}
      >
        <div className="w-7 h-7">{industry.icon}</div>
      </div>

      {/* Text */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
          {industry.title}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          {industry.description}
        </p>
      </div>
    </motion.div>
  );
}
