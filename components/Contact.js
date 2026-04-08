// =============================================================
// Contact.js — Get in touch section
//
// Left column  — heading, subtext, contact details (email + phone)
// Right column — glass-card form (Name, Email, Phone, Company, Message)
//
// Form handling: POSTs to /api/contact which sends email via Resend.
// Requires RESEND_API_KEY environment variable (see .env.example).
// =============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/components/animations";

// ---------------------------------------------------------------------------
// Contact details
// ---------------------------------------------------------------------------
const CONTACT_INFO = [
  {
    label: "Email",
    value: "sales@harmoniqsolutions.com",
    href:  "mailto:sales@harmoniqsolutions.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+1 551-223-1520",
    href:  "tel:+15512231520",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.49 2 2 0 0 1 3.59 2.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.9-1.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Shared input className
// ---------------------------------------------------------------------------
const INPUT_CLASS =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm " +
  "placeholder-gray-500 outline-none transition-colors duration-150 " +
  "focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30";

export default function Contact() {
  // ---- Form state ----
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    phone:   "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  // ---- Input change handler ----
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ---- Form submission — POSTs to /api/contact (Resend) ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Surface the server's error message if available
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-charcoal section-padding overflow-hidden">

      {/* Subtle top fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24
                   bg-gradient-to-b from-deep-blue to-transparent pointer-events-none"
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
          <p className="eyebrow text-accent-cyan mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Build Your{" "}
            <span className="text-gradient">AV Solution</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Ready to transform your space? Reach out to discuss your project
            and we&apos;ll get back to you promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ---- Left: Contact information ---- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Contact Us</h3>
              <p className="text-gray-400 leading-relaxed">
                Whether you have a specific project in mind or just want to
                explore what&apos;s possible, our team is ready to help you
                design the right AV system for your environment.
              </p>
            </div>

            {/* Contact detail items */}
            <div className="flex flex-col gap-5">
              {CONTACT_INFO.map(({ label, value, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 text-gray-300
                             hover:text-accent-blue transition-colors duration-200"
                >
                  {/* Icon circle */}
                  <div className="w-11 h-11 rounded-xl glass-card flex items-center justify-center
                                  flex-shrink-0 text-accent-blue group-hover:glow-blue transition-all">
                    <div className="w-5 h-5">{icon}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Optional tagline */}
            <div className="glass-card p-5">
              <p className="text-sm text-gray-400 leading-relaxed italic">
                &ldquo;Every great AV system starts with understanding the people
                who will use it — and the space it lives in.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* ---- Right: Contact form ---- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.15 }}
          >
            <div className="glass-card p-6 md:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ---- Success state ---- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-accent-blue/10 border border-accent-blue/30
                                    flex items-center justify-center text-accent-blue">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white">Message Received!</h4>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Thank you for reaching out. A member of our team will be
                      in touch with you shortly.
                    </p>
                  </motion.div>
                ) : (
                  /* ---- Form ---- */
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                    noValidate
                  >
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs text-gray-400 font-medium">
                          Full Name <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className={INPUT_CLASS}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs text-gray-400 font-medium">
                          Email Address <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    {/* Phone + Company row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-xs text-gray-400 font-medium">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className={INPUT_CLASS}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="company" className="text-xs text-gray-400 font-medium">
                          Company / Organization
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs text-gray-400 font-medium">
                        Message <span className="text-accent-blue">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project — space type, scope, timeline..."
                        className={`${INPUT_CLASS} resize-none`}
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20
                                    rounded-lg px-4 py-3">
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{   scale: loading ? 1 : 0.98 }}
                      className="btn-primary justify-center w-full mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        /* Spinner */
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
                                    strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
