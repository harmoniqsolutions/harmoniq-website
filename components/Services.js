// =============================================================
// Services.js — AV services grid
//
// Displays 7 service cards in a responsive grid.
// Each card has an inline SVG icon, title, and description.
// Scroll-triggered stagger animation via Framer Motion whileInView.
// =============================================================

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from "@/components/animations";

// ---------------------------------------------------------------------------
// Service data — edit content here without touching JSX below
// ---------------------------------------------------------------------------
const SERVICES = [
  {
    title: "AV System Design",
    description:
      "End-to-end audiovisual system design — from needs assessment and schematic drawings through full system engineering and documentation.",
    icon: (
      // Compass / design icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    accent: "#3b82f6", // blue
  },
  {
    title: "Audio & Video Installation",
    description:
      "Professional installation of speakers, displays, projectors, cameras, and cabling — executed cleanly and precisely in any commercial environment.",
    icon: (
      // Tool / wrench icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    accent: "#8b5cf6", // purple
  },
  {
    title: "Conference Room & Collaboration Systems",
    description:
      "Fully integrated meeting room solutions — unified control, displays, cameras, microphones, and video-conferencing platforms.",
    icon: (
      // Monitor icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    accent: "#06b6d4", // cyan
  },
  {
    title: "Sound Systems",
    description:
      "Custom-engineered audio for commercial spaces, houses of worship, and event venues — intelligible speech, immersive music, and reliable performance.",
    icon: (
      // Speaker / volume icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ),
    accent: "#3b82f6",
  },
  {
    title: "Video Walls & Displays",
    description:
      "Design and installation of LED video walls, large-format displays, and multi-screen arrangements for lobbies, control rooms, and public spaces.",
    icon: (
      // Grid / layout icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    accent: "#8b5cf6",
  },
  {
    title: "System Integration & Control",
    description:
      "Unified control system programming (Crestron, Extron, QSC) that ties all AV equipment into a single, intuitive interface.",
    icon: (
      // Sliders / control icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3"  />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8"  x2="12" y2="3"  />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3"  />
        <line x1="1"  y1="14" x2="7"  y2="14" />
        <line x1="9"  y1="8"  x2="15" y2="8"  />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
    accent: "#06b6d4",
  },
  {
    title: "Training & Support",
    description:
      "On-site training, remote support, and service agreements to ensure your AV systems perform reliably and your team can operate them with confidence.",
    icon: (
      // Graduation cap / support icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    accent: "#3b82f6",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-black section-padding overflow-hidden">

      {/* Subtle grid overlay */}
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
          <p className="eyebrow text-accent-cyan mb-3">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            From initial design to ongoing support, we deliver complete AV
            integration solutions tailored to your environment.
          </p>
        </motion.div>

        {/* ---- Service cards grid ---- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ServiceCard — individual card component
// ---------------------------------------------------------------------------
function ServiceCard({ service }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card p-6 md:p-7 flex flex-col gap-4
                 transition-all duration-300
                 hover:border-white/20
                 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]
                 cursor-default"
    >
      {/* Icon container with accent-tinted background */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${service.accent}22 0%, ${service.accent}11 100%)`,
          border:     `1px solid ${service.accent}33`,
          color:      service.accent,
        }}
      >
        <div className="w-6 h-6">{service.icon}</div>
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base font-semibold text-white mb-2 leading-snug">
          {service.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
