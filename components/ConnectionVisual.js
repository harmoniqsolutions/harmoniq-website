"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import SignalSculpture from "@/components/SignalSculpture";

const CONNECTIONS = [
  { id: "audio", title: "Audio & video", detail: "Sound that carries. Pictures that connect.", path: "M280 235V112H428", node: "node-av" },
  { id: "network", title: "IT & networks", detail: "Better Wi-Fi. A stronger connection.", path: "M280 235H130V310H80", node: "node-it" },
  { id: "security", title: "Security systems", detail: "Keep a closer eye on what matters.", path: "M280 235V385H430", node: "node-security" },
];

export default function ConnectionVisual() {
  const [selected, setSelected] = useState("audio");
  const [paused, setPaused] = useState(false);
  const root = useRef(null);
  const frame = useRef(0);
  const reduced = useRef(true);
  const active = CONNECTIONS.find(({ id }) => id === selected);

  useEffect(() => {
    const element = root.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reduced.current = preference.matches;
      element.style.setProperty("--rotate-x", "0deg");
      element.style.setProperty("--rotate-y", "0deg");
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => {
      preference.removeEventListener("change", updatePreference);
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const move = (event) => {
    if (reduced.current || paused || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      root.current?.style.setProperty("--rotate-x", `${-y * 8}deg`);
      root.current?.style.setProperty("--rotate-y", `${x * 10}deg`);
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    root.current?.style.setProperty("--rotate-x", "0deg");
    root.current?.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div ref={root} className="connection-explorer" data-selected={selected} data-paused={paused} data-visible="true">
      <div className="connection-stage" onPointerMove={move} onPointerLeave={reset}>
        <SignalSculpture selected={selected} paused={paused} />
        <div className="connection-depth">
          <svg className="circuit-lines" viewBox="0 0 560 500" fill="none" aria-hidden="true">
            <circle className="orbit-boundary" cx="280" cy="235" r="198" />
            <circle className="orbit-ticks" cx="280" cy="235" r="184" />
            <circle className="orbit-inner" cx="280" cy="235" r="120" />
            <circle className="orbit-sweep" cx="280" cy="235" r="168" />
            <path className="circuit-detail" d="M40 105H104V66H176M397 49H472V82M46 402H142V439M459 274H516V332" />
            {CONNECTIONS.map(({ id, path }) => (
              <g key={id} className={`signal-channel signal-${id}`} data-active={selected === id}>
                <path className="signal-track" d={path} />
                <path className="signal-packet" d={path} pathLength="100" />
              </g>
            ))}
            <g className="circuit-terminals">
              <circle cx="280" cy="112" r="4" /><circle cx="130" cy="235" r="4" /><circle cx="280" cy="385" r="4" />
            </g>
            <g className="circuit-crosses"><path d="M62 210v12m-6-6h12M487 162v12m-6-6h12M207 442v12m-6-6h12" /></g>
          </svg>
          <div className="connection-core" aria-hidden="true">
            <div className="core-ring" />
            <Image src="/images/logo-square.png" alt="" width={1000} height={1000} sizes="150px" className="core-logo" preload />
          </div>
          <div role="group" aria-label="Explore our connected services">
            {CONNECTIONS.map(({ id, title, node }) => (
              <button key={id} type="button" className={`connection-node ${node}`} aria-pressed={selected === id} aria-controls="connection-description" onClick={() => setSelected(id)}>
                <Icon name={id} /><span>{title}</span><span className="node-indicator" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="connection-toolbar">
        <span>One space. Working together.</span>
        <button type="button" className="motion-toggle" aria-pressed={paused} onClick={() => { reset(); setPaused(!paused); }}>
          <Icon name={paused ? "play" : "pause"} /><span>{paused ? "Resume effects" : "Pause effects"}</span>
        </button>
      </div>
      <div id="connection-description" className="connection-description" aria-live="polite" aria-atomic="true">
        <div><p className="connection-title">{active.title}</p><p>{active.detail}</p></div>
        <a href={`#service-${active.id}`} className="connection-link" aria-label={`Explore ${active.title}`}><Icon name="arrow" /></a>
      </div>
    </div>
  );
}
