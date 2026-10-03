"use client";

import { useEffect } from "react";

// Pointer illumination is local to service surfaces; all content stays server-rendered.
export default function SurfaceEffects() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const surfaces = [...document.querySelectorAll(".service-card, .about-panel, .contact-panel")];
    let frame = 0;
    const illuminate = (event) => {
      if (preference.matches || event.pointerType !== "mouse") return;
      const surface = event.currentTarget;
      const bounds = surface.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        surface.style.setProperty("--pointer-x", `${x}px`);
        surface.style.setProperty("--pointer-y", `${y}px`);
      });
    };
    surfaces.forEach((surface) => surface.addEventListener("pointermove", illuminate, { passive: true }));
    return () => {
      cancelAnimationFrame(frame);
      surfaces.forEach((surface) => surface.removeEventListener("pointermove", illuminate));
    };
  }, []);
  return null;
}
