import Icon from "@/components/Icon";
import ConnectionVisual from "@/components/ConnectionVisual";

const specialties = [
  { icon: "audio", title: "Audio & video", detail: "Sound that carries. Pictures that connect." },
  { icon: "network", title: "IT & networks", detail: "Better Wi-Fi. A stronger connection." },
  { icon: "security", title: "Security systems", detail: "Keep a closer eye on what matters." },
];

export default function Hero() {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-light" aria-hidden="true" />
      <div className="section-container hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">Your space.<br /><span>Better connected.</span></h1>
          <p className="hero-description">Clearer sound. Reliable Wi-Fi. A little more peace of mind. We install audio, video, IT, and security systems for homes, churches, and small businesses.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Let’s talk about your project <Icon name="arrow" /></a>
            <a href="#services" className="btn-secondary">Explore our services <Icon name="arrow" /></a>
          </div>
          <p className="hero-note"><span aria-hidden="true" /> A small, hands-on team. Smaller jobs welcome.</p>
        </div>
        <ConnectionVisual />
      </div>
      <div className="section-container">
        <div className="specialties-rail">
          {specialties.map(({ icon, title, detail }) => (
            <a className="specialty" href={`#service-${icon}`} key={title}>
              <Icon name={icon} />
              <div><h2>{title}</h2><p>{detail}</p></div><Icon name="arrow" className="specialty-arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
