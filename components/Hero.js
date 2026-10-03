import Icon from "@/components/Icon";
import Image from "next/image";

const specialties = [
  { icon: "audio", title: "Audio & video", detail: "Sound that carries. Pictures that connect." },
  { icon: "network", title: "IT & networks", detail: "Better Wi-Fi. A stronger connection." },
  { icon: "security", title: "Security systems", detail: "Keep a closer eye on what matters." },
];

export default function Hero() {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="section-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> AV / IT / SECURITY</p>
          <h1 id="hero-title">Your space.<br /><span>Better connected.</span></h1>
          <p className="hero-description">Clearer sound. Reliable Wi-Fi. A little more peace of mind. We install audio, video, IT, and security systems for homes, churches, and small businesses.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Let’s talk about your project <Icon name="arrow" /></a>
            <a href="#services" className="btn-secondary">Explore our services <span aria-hidden="true">↘</span></a>
          </div>
          <p className="hero-note"><span aria-hidden="true" /> A small, hands-on team. Smaller jobs welcome.</p>
        </div>
        <div className="connection-visual" aria-hidden="true">
          <div className="visual-topline"><span>THOUGHTFULLY CONNECTED</span><span>01 — 03</span></div>
          <svg className="circuit-lines" viewBox="0 0 520 480" fill="none">
            <defs><linearGradient id="circuit-gradient" x1="80" y1="80" x2="440" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#66e8ed" /><stop offset="1" stopColor="#d8bb7b" /></linearGradient></defs>
            <circle cx="260" cy="245" r="149" stroke="#66e8ed" strokeOpacity=".1" />
            <circle cx="260" cy="245" r="111" stroke="#66e8ed" strokeOpacity=".2" strokeDasharray="3 9" />
            <path d="M260 245V100H390V158M260 245H115V335M260 245V383H385" stroke="url(#circuit-gradient)" strokeWidth="1.5" />
            <path d="M75 172H165V108M76 420H207V448M414 291H460V340" stroke="#66e8ed" strokeOpacity=".2" />
            <circle cx="260" cy="100" r="4" fill="#66e8ed" /><circle cx="115" cy="245" r="4" fill="#66e8ed" /><circle cx="260" cy="383" r="4" fill="#d8bb7b" />
          </svg>
          <div className="connection-core"><Image src="/images/logo-square.png" alt="" width={1000} height={1000} sizes="160px" className="core-logo" /><span className="core-label">CONNECTED BY DESIGN</span></div>
          <div className="connection-node node-av"><Icon name="audio" /><span>AUDIO + VIDEO</span></div>
          <div className="connection-node node-it"><Icon name="network" /><span>IT + NETWORKS</span></div>
          <div className="connection-node node-security"><Icon name="security" /><span>SECURITY</span></div>
          <div className="visual-bottomline"><span>ONE SPACE. WORKING TOGETHER.</span><span className="visual-cross">+</span></div>
        </div>
      </div>
      <div className="section-container">
        <div className="specialties-rail">
          {specialties.map(({ icon, title, detail }, index) => (
            <a className="specialty" href={`#service-${icon}`} key={title}>
              <span className="specialty-number">0{index + 1}</span><Icon name={icon} />
              <div><h2>{title}</h2><p>{detail}</p></div><span className="specialty-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
