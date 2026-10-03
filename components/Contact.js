"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECT_TYPES, SITE } from "@/lib/site";

const CONTACT_INFO = [
  { label: "Email us", value: SITE.email, href: `mailto:${SITE.email}`, symbol: "@" },
  { label: "Call us", value: SITE.phone, href: SITE.phoneHref, symbol: "+" },
];

const INPUT_CLASS =
  "w-full min-h-12 rounded-xl border border-white/25 bg-[#080b10] px-4 py-3 text-base text-white " +
  "placeholder:text-slate-500 transition-colors focus:border-[#66e8ed] focus:outline-2 focus:outline-offset-2 focus:outline-[#66e8ed]";
const LABEL_CLASS = "text-sm font-medium text-slate-300";
const INITIAL_FORM = { name: "", email: "", phone: "", company: "", service: "mixed", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const successRef = useRef(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setError("");

    if (!form.name.trim() || !form.message.trim()) {
      setError("Please add your name and a few details about your project.");
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "We couldn't confirm delivery. Please try again or contact us directly.");
      }
      setSubmitted(true);
    } catch (failure) {
      setError(failure.name === "AbortError"
        ? "We couldn't confirm delivery in time. Your details are still here. Please call or email us before sending again."
        : failure instanceof TypeError
          ? "We couldn't connect. Your details are still here. Check your connection and try again, or call or email us."
          : failure.message);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden bg-[#080b10] section-padding">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#66e8ed]/40 to-transparent" />
      <div className="section-container relative">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4 text-[#66e8ed]">Let&apos;s talk</p>
          <h2 id="contact-heading" className="mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            A small project can make a <span className="text-[#66e8ed]">big difference.</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            Better sound. Stronger Wi-Fi. A clearer view of your property.
            Tell us what you need, and we&apos;ll work out the next step together.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-white">Talk directly with our team.</h3>
              <p className="max-w-md leading-relaxed text-slate-400">
                We&apos;re a small, hands-on team helping homeowners, churches,
                and small businesses with AV, IT, and security installations.
                You don&apos;t need a detailed brief to get started.
              </p>
            </div>
            <div className="space-y-4">
              {CONTACT_INFO.map(({ label, value, href, symbol }) => (
                <a key={label} href={href} className="group flex min-h-16 items-center gap-4 rounded-xl p-1 text-white transition-colors hover:text-[#66e8ed] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#66e8ed]">
                  <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#66e8ed]/25 bg-[#66e8ed]/5 font-mono text-xl text-[#66e8ed]">{symbol}</span>
                  <span className="min-w-0">
                    <span className="mb-1 block text-xs uppercase tracking-widest text-slate-400">{label}</span>
                    <span className="block break-all text-sm font-medium sm:text-base">{value}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="border-l-2 border-[#d8bb7b]/60 pl-5">
              <p className="mb-2 text-sm font-medium text-[#d8bb7b]">Start with the problem.</p>
              <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                A dead Wi-Fi spot, a TV that needs mounting, or sound that isn&apos;t reaching the room.
                We&apos;ll help you find a practical solution.
              </p>
            </div>
          </div>

          <div className="glass-card relative overflow-hidden p-6 sm:p-8">
            <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#66e8ed] to-transparent" />
            {submitted ? (
              <div className="flex min-h-96 flex-col items-start justify-center gap-5">
                <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full border border-[#66e8ed]/30 bg-[#66e8ed]/10 text-2xl text-[#66e8ed]">✓</span>
                <h3 ref={successRef} tabIndex={-1} className="text-2xl font-semibold text-white focus:outline-none">Your message is with our team.</h3>
                <p className="max-w-md leading-relaxed text-slate-400">Thanks for telling us about your project. We&apos;ll review the details and get in touch using the email you provided.</p>
                <a href={SITE.phoneHref} className="btn-secondary">Prefer to talk? Call us</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} aria-busy={loading} className="space-y-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <h3 className="text-xl font-semibold text-white">Tell us about your project</h3>
                  <span aria-hidden="true" className="font-mono text-xs text-[#66e8ed]">01 / START</span>
                </div>
                <p className="text-sm text-slate-400">Name, email, and project details are required.</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className={LABEL_CLASS}>Name <span className="text-[#66e8ed]">*</span></label>
                    <input id="contact-name" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={handleChange} placeholder="Jane Smith" className={INPUT_CLASS} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className={LABEL_CLASS}>Email <span className="text-[#66e8ed]">*</span></label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={handleChange} placeholder="jane@example.com" className={INPUT_CLASS} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className={LABEL_CLASS}>Phone <span className="font-normal text-slate-400">(optional)</span></label>
                    <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={handleChange} className={INPUT_CLASS} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-company" className={LABEL_CLASS}>Organization <span className="font-normal text-slate-400">(optional)</span></label>
                    <input id="contact-company" name="company" autoComplete="organization" maxLength={160} value={form.company} onChange={handleChange} className={INPUT_CLASS} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-service" className={LABEL_CLASS}>What do you need help with?</label>
                  <select id="contact-service" name="service" value={form.service} onChange={handleChange} className={INPUT_CLASS}>
                    {Object.entries(PROJECT_TYPES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className={LABEL_CLASS}>Project details <span className="text-[#66e8ed]">*</span></label>
                  <textarea id="contact-message" name="message" required maxLength={6000} rows={4} value={form.message} onChange={handleChange} placeholder="What would you like to improve? Tell us a little about your space, location, and timing." className={`${INPUT_CLASS} resize-y`} />
                </div>
                <div role="alert">
                  {error && <p className="rounded-xl border border-red-300/30 bg-red-300/5 p-4 text-sm leading-relaxed text-red-200">{error}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn-primary min-h-12 w-full justify-center disabled:cursor-wait disabled:opacity-60">{loading ? "Sending your message…" : "Send message"}</button>
                <p role="status" className="sr-only">{loading ? "Sending your message." : ""}</p>
                <p className="text-xs leading-relaxed text-slate-400">We&apos;ll use these details to respond to your inquiry.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
