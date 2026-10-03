import Icon from "@/components/Icon";

const STATS = [
  { value: '10+', label: 'Projects completed' },
  { value: '5+', label: 'Years of hands-on experience' },
  { value: '2–3', label: 'People on a typical crew' },
];

const PRINCIPLES = [
  { icon: 'audio', title: 'Audio & video', detail: 'Sound, screens and the connections between them.' },
  { icon: 'network', title: 'Networks & IT', detail: 'Wi-Fi, cabling and the equipment that keeps you connected.' },
  { icon: 'security', title: 'Security', detail: 'Cameras and security systems for your space.' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="about-section section-padding">
      <div className="section-container about-layout">
        <div className="about-copy">
          <h2 id="about-title" className="section-heading">
            Small team.<br />Big attention to detail.
          </h2>
          <p className="section-intro">
            HarmoniQ Solutions is a small, hands-on team installing audio, video,
            IT and security systems for homes, churches and small businesses.
          </p>
          <p className="about-description">
            We help with the everyday upgrades that make a difference: clearer
            sound, a neatly mounted TV, better Wi-Fi or cameras you can actually
            use. We listen to what you need, work with your space and budget,
            and explain how everything works.
          </p>
          <dl className="stats-grid">
            {STATS.map(({ value, label }) => (
              <div className="stat-item" key={label}>
                <dt className="stat-label">{label}</dt>
                <dd className="stat-value">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="about-panel glass-card">
          <div className="panel-circuit" aria-hidden="true"><svg viewBox="0 0 400 110" fill="none"><path d="M0 90H80L130 40H265L310 85H400M0 100H85L135 50H260L305 95H400" /><circle cx="130" cy="40" r="4" /><circle cx="265" cy="40" r="4" /></svg></div>
          <h3>A small crew.<br />A connected approach.</h3>
          <ul className="about-principles">
            {PRINCIPLES.map(({ icon, title, detail }) => (
              <li key={title}>
                <Icon name={icon} className="principle-icon" />
                <div><h4>{title}</h4><p>{detail}</p></div>
              </li>
            ))}
          </ul>
          <p className="team-note">Practical advice. Tidy installation. A clear handover.</p>
        </div>
      </div>
    </section>
  );
}
