"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";

import { NAV_LINKS } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const header = useRef(null);
  const toggle = useRef(null);
  const menu = useRef(null);

  useEffect(() => {
    let frame = 0;
    const sections = NAV_LINKS.map(({ href }) => ({ href, element: document.querySelector(href) }));
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.current?.style.setProperty("--reading-progress", String(max > 0 ? window.scrollY / max : 0));
      if (header.current) header.current.dataset.scrolled = String(window.scrollY > 24);
      const current = sections.find(({ element }) => {
        if (!element) return false;
        const bounds = element.getBoundingClientRect();
        return bounds.top <= 180 && bounds.bottom > 180;
      });
      setActive((previous) => previous === (current?.href ?? "") ? previous : (current?.href ?? ""));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const clickOutside = (event) => {
      if (!menu.current?.contains(event.target) && !toggle.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", clickOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", clickOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header ref={header} className="site-header">
      <div className="reading-progress" aria-hidden="true" />
      <nav className="section-container nav-row" aria-label="Main navigation">
        <a className="brand-link" href="#hero" aria-label="HarmoniQ Solutions home" onClick={() => setOpen(false)}><Image src="/images/logo-horizontal.png" alt="HarmoniQ Solutions" width={360} height={60} preload className="nav-logo" /></a>
        <ul className="desktop-nav">{NAV_LINKS.map(({ href, label }) => <li key={href}><a href={href} aria-current={active === href ? "location" : undefined}>{label}</a></li>)}</ul>
        <a className="nav-cta" href="#contact">Let’s talk <Icon name="arrow" /></a>
        <button type="button" ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen(!open)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}</svg></button>
        <div ref={menu} id="mobile-navigation" className="mobile-nav" hidden={!open}><ul>{NAV_LINKS.map(({ href, label }) => <li key={href}><a href={href} aria-current={active === href ? "location" : undefined} onClick={() => setOpen(false)}>{label}<Icon name="arrow" /></a></li>)}<li><a href="#contact" onClick={() => setOpen(false)}>Let’s talk about your project <Icon name="arrow" /></a></li></ul></div>
      </nav>
    </header>
  );
}
