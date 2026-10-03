"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;
const PALETTES = {
  audio: [102, 232, 237],
  network: [161, 244, 247],
  security: [216, 187, 123],
};

// Deterministic geometry: this is a signal sculpture, not a live system monitor.
function createMesh() {
  const lines = [];
  for (let latitude = 1; latitude < 12; latitude++) {
    const angle = latitude / 12 * Math.PI;
    const ring = [];
    for (let i = 0; i <= 72; i++) {
      const a = i / 72 * TAU;
      ring.push([Math.sin(angle) * Math.cos(a) * 154, Math.cos(angle) * 154, Math.sin(angle) * Math.sin(a) * 154]);
    }
    lines.push(ring);
  }
  for (let longitude = 0; longitude < 16; longitude++) {
    const angle = longitude / 16 * TAU;
    const meridian = [];
    for (let i = 0; i <= 48; i++) {
      const a = i / 48 * Math.PI;
      meridian.push([Math.sin(a) * Math.cos(angle) * 154, Math.cos(a) * 154, Math.sin(a) * Math.sin(angle) * 154]);
    }
    lines.push(meridian);
  }
  return lines;
}

export default function SignalSculpture({ selected, paused }) {
  const canvasRef = useRef(null);
  const controls = useRef({ selected, paused, refresh: null, pulse: 0 });

  useEffect(() => {
    const state = controls.current;
    if (state.selected !== selected) state.pulse = 1;
    state.selected = selected;
    state.paused = paused;
    state.refresh?.();
  }, [selected, paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const state = controls.current;
    const stage = canvas.parentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mesh = createMesh();
    let visible = true;
    let frame = 0;
    let lastFrame = 0;
    let time = 0;
    let disposed = false;
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let color = [...PALETTES[state.selected]];

    const moving = () => visible && !document.hidden && !state.paused && !preference.matches;

    const draw = () => {
      const mobile = canvas.clientWidth < 420;
      const targetColor = PALETTES[state.selected];
      const motion = moving();
      pointerX += ((motion ? targetX : 0) - pointerX) * .08;
      pointerY += ((motion ? targetY : 0) - pointerY) * .08;
      color = color.map((value, index) => motion ? value + (targetColor[index] - value) * .08 : targetColor[index]);
      const rgb = color.map(Math.round).join(",");
      const yaw = time * .13 + pointerX * .5;
      const pitch = -.28 + pointerY * .28;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
      const scale = canvas.width / 560;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, 560, 500);
      context.lineCap = "round";
      context.lineJoin = "round";

      const project = (x, y, z) => {
        const rotatedX = x * cy + z * sy;
        const rotatedZ = z * cy - x * sy;
        const rotatedY = y * cx - rotatedZ * sx;
        const depth = y * sx + rotatedZ * cx;
        const perspective = 620 / (620 - depth);
        return [280 + rotatedX * perspective, 235 + rotatedY * perspective, depth];
      };

      // A transparent shell gives the ribbons a legible volume and depth.
      context.strokeStyle = `rgba(${rgb},.16)`;
      context.lineWidth = .6;
      context.beginPath();
      for (let line = 0; line < mesh.length; line++) {
        if (mobile && line % 2) continue;
        mesh[line].forEach(([x, y, z], i) => {
          const [px, py] = project(x, y, z);
          if (i === 0) context.moveTo(px, py); else context.lineTo(px, py);
        });
      }
      context.stroke();

      // Woven orbital ribbons: service selection changes their wavelength and color.
      const amplitude = state.selected === "audio" ? 19 : state.selected === "network" ? 7 : 12;
      const surge = state.pulse * 14;
      const ribbonCount = mobile ? 7 : 11;
      const samples = mobile ? 100 : 144;
      for (let ribbon = 0; ribbon < ribbonCount; ribbon++) {
        const offset = (ribbon - (ribbonCount - 1) / 2) * 3.3;
        const gold = ribbon < 2 && state.selected !== "security";
        const highlight = ribbon === Math.floor(ribbonCount / 2);
        context.strokeStyle = gold ? "rgba(216,187,123,.7)" : `rgba(${rgb},${highlight ? 1 : .5})`;
        context.lineWidth = highlight ? 2 : .9;
        context.shadowColor = `rgba(${rgb},.65)`;
        context.shadowBlur = highlight ? 8 : 0;
        context.beginPath();
        for (let i = 0; i <= samples; i++) {
          const a = i / samples * TAU;
          const radius = 180 + Math.sin(a * 3 - time * .55) * (8 + surge);
          const y = Math.sin(a * 2 + time * .2) * 62 + Math.sin(a * 6 - time * 1.1) * amplitude + offset;
          const [px, py] = project(Math.cos(a) * radius, y, Math.sin(a) * radius);
          if (i === 0) context.moveTo(px, py); else context.lineTo(px, py);
        }
        context.stroke();
      }
      context.shadowBlur = 0;

      // Signal points travel along the shell. A few bright terminals provide depth.
      for (let i = 0; i < (mobile ? 18 : 32); i++) {
        const longitude = i * 2.399963 + time * .11;
        const latitude = Math.acos(1 - 2 * (i + .5) / (mobile ? 18 : 32));
        const [x, y, z] = project(Math.sin(latitude) * Math.cos(longitude) * 157, Math.cos(latitude) * 157, Math.sin(latitude) * Math.sin(longitude) * 157);
        context.fillStyle = `rgba(${rgb},${z > 0 ? .9 : .25})`;
        context.beginPath();
        context.arc(x, y, z > 0 ? 1.7 : 1, 0, TAU);
        context.fill();
      }
      state.pulse *= .94;
    };

    const tick = (now) => {
      frame = 0;
      if (disposed || !moving()) { canvas.dataset.running = "false"; return; }
      const interval = canvas.clientWidth < 420 ? 1000 / 30 : 1000 / 60;
      if (now - lastFrame >= interval - 1) {
        time += Math.min((now - lastFrame) / 1000, .05);
        lastFrame = now;
        draw();
      }
      canvas.dataset.running = "true";
      frame = requestAnimationFrame(tick);
    };

    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = 0;
      canvas.dataset.running = String(moving());
      draw();
      if (moving()) { lastFrame = performance.now(); frame = requestAnimationFrame(tick); }
    };
    state.refresh = refresh;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(canvas.width * 500 / 560));
      refresh();
    };
    const point = (event) => {
      if (!moving() || event.pointerType !== "mouse") return;
      const bounds = stage.getBoundingClientRect();
      targetX = (event.clientX - bounds.left) / bounds.width - .5;
      targetY = (event.clientY - bounds.top) / bounds.height - .5;
    };
    const reset = () => { targetX = 0; targetY = 0; };
    const onPreference = () => { reset(); refresh(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    sizeObserver.observe(canvas);
    stage.addEventListener("pointermove", point, { passive: true });
    stage.addEventListener("pointerleave", reset);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", refresh);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      state.refresh = null;
      observer.disconnect();
      sizeObserver.disconnect();
      stage.removeEventListener("pointermove", point);
      stage.removeEventListener("pointerleave", reset);
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-sculpture" width="560" height="500" aria-hidden="true" />;
}
