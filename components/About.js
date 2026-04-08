// =============================================================
// About.js — Company overview section
//
// Two-column layout:
//   Left  — company narrative + stat highlights
//   Right — decorative abstract visual (no photos required)
//
// Tone: confident, technical, premium.
// NO IT, VOIP, marketing, branding, or graphic design references.
// =============================================================

'use client';

import { motion } from 'framer-motion';
import { fadeInUp, viewportConfig } from '@/components/animations';

// ---------------------------------------------------------------------------
// Stats displayed below the main text
// ---------------------------------------------------------------------------
const STATS = [
  { value: '20+', label: 'Projects Completed' },
  { value: '10+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
];

// ---------------------------------------------------------------------------
// Abstract decorative shapes for the right-column visual
// Each shape is a rounded rectangle with gradient borders and glow.
// ---------------------------------------------------------------------------
const SHAPES = [
  {
    size: { w: '70%', h: '55%' },
    pos: { top: '8%', left: '5%' },
    gradient: 'from-accent-blue/20 to-accent-purple/10',
    border: 'border-accent-blue/25',
    delay: 0,
  },
  {
    size: { w: '55%', h: '45%' },
    pos: { bottom: '10%', right: '3%' },
    gradient: 'from-accent-purple/20 to-accent-cyan/10',
    border: 'border-accent-purple/25',
    delay: 1.5,
  },
  {
    size: { w: '40%', h: '35%' },
    pos: { top: '30%', right: '20%' },
    gradient: 'from-accent-cyan/15 to-accent-blue/10',
    border: 'border-accent-cyan/20',
    delay: 0.8,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-charcoal section-padding overflow-hidden"
    >
      {/* Very subtle top gradient fade from black into charcoal */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24
                      bg-gradient-to-b from-black to-transparent pointer-events-none"
      />

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ---- Left column: text ---- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col gap-6"
          >
            <p className="eyebrow text-accent-purple">Who We Are</p>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              About <span className="text-gradient">HarmoniQ Solutions</span>
            </h2>

            <div className="flex flex-col gap-4 text-gray-400 text-base leading-relaxed">
              <p>
                HarmoniQ Solutions is a full-service audiovisual integration
                firm dedicated to transforming how organizations communicate and
                collaborate through technology. We design, install, and program
                complete AV systems for commercial environments of every scale.
              </p>
              <p>
                With deep expertise spanning display technology, professional
                audio, control system programming, and system integration, our
                team engineers solutions built for reliability, intuitive
                operation, and long-term performance.
              </p>
              <p>
                Every project is approached with the same commitment: understand
                the client&apos;s workflow, design a system that serves it, and
                deliver an installation that exceeds expectations — on time, on
                budget, and built to last.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-gradient">{value}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-snug">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---- Right column: abstract decorative visual ---- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2 }}
            className="relative h-80 lg:h-[480px]"
          >
            {/* Outer glow backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)',
              }}
            />

            {/* Floating abstract shapes */}
            {SHAPES.map((shape, i) => (
              <motion.div
                key={i}
                aria-hidden="true"
                className={`absolute rounded-2xl bg-gradient-to-br ${shape.gradient}
                            border ${shape.border} backdrop-blur-sm`}
                style={{
                  width: shape.size.w,
                  height: shape.size.h,
                  ...shape.pos,
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5 + i * 1.2,
                  delay: shape.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Central glass card — represents an AV control panel */}
            <motion.div
              className="absolute inset-8 glass-card flex flex-col
                         items-center justify-center gap-4 p-8"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Waveform decoration */}
              <div className="flex items-end gap-1 h-12">
                {[3, 6, 9, 12, 8, 14, 10, 7, 12, 9, 6, 11, 8, 5, 10].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-accent-blue to-accent-cyan"
                      style={{ height: `${h * 3}px` }}
                      animate={{
                        height: [`${h * 3}px`, `${h * 4.5}px`, `${h * 3}px`],
                      }}
                      transition={{
                        duration: 1.2 + i * 0.08,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.04,
                      }}
                    />
                  ),
                )}
              </div>

              <p className="text-xs text-gray-500 uppercase tracking-widest text-center">
                Engineered for Precision
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
