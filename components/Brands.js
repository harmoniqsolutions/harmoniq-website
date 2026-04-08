// =============================================================
// Brands.js — Manufacturer / partner logo strip
//
// Displays logos of brands HarmoniQ engineers use for designs.
// Dark section background visually separates from adjacent sections.
// Uses "use client" only for Framer Motion entrance animation.
// =============================================================

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewportConfig,
} from '@/components/animations';

// ---------------------------------------------------------------------------
// Brand data — logos placed in /public/images/
// ---------------------------------------------------------------------------
const BRANDS = [
  { name: 'Biamp', src: '/images/biamp.png' },
  { name: 'Q-SYS', src: '/images/q-sys.png' },
  { name: 'Crestron', src: '/images/crestron.png' },
  { name: 'Extron', src: '/images/extron.png' },
  { name: 'Dante', src: '/images/dante.png' },
  { name: 'Shure', src: '/images/shure.png' },
  { name: 'Netgear-AV', src: '/images/netgear-light.png', noInvert: true },
];

export default function Brands() {
  return (
    <section className="relative bg-charcoal section-padding overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 section-container">
        {/* ---- Section heading ---- */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-12"
        >
          <p className="eyebrow text-accent-blue mb-3">Trusted Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Brands Our Engineers{' '}
            <span className="text-gradient">Work With</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            We design and install systems built on industry-leading platforms,
            chosen for performance, reliability, and long-term support.
          </p>
        </motion.div>

        {/* ---- Logo grid ---- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {BRANDS.map((brand) => (
            <motion.div
              key={brand.name}
              variants={staggerItem}
              className="glass-card flex items-center justify-center p-5 aspect-[3/2]
                         hover:border-accent-blue/30
                         hover:shadow-[0_0_24px_rgba(59,130,246,0.10)]
                         transition-all duration-300"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={120}
                height={56}
                className={`w-full h-auto max-h-10 object-contain opacity-70
                            hover:opacity-100 transition-opacity duration-300
                            ${brand.noInvert ? '' : 'brightness-0 invert'}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
