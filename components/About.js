const STATS = [
  { value: '10+', label: 'Projects completed' },
  { value: '5+', label: 'Years of hands-on experience' },
  { value: '2–3', label: 'People on a typical crew' },
];

const PRINCIPLES = [
  { number: '01', title: 'Audio & video', detail: 'Sound, screens and the connections between them.' },
  { number: '02', title: 'Networks & IT', detail: 'Wi-Fi, cabling and the equipment that keeps you connected.' },
  { number: '03', title: 'Security', detail: 'Cameras and security systems for your space.' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="about-section section-padding">
      <div className="section-container about-layout">
        <div className="about-copy">
          <p className="eyebrow">The people behind the install</p>
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
          <p className="panel-label"><span aria-hidden="true" /> One team. Connected systems.</p>
          <h3>A small crew.<br />A connected approach.</h3>
          <ul className="about-principles">
            {PRINCIPLES.map(({ number, title, detail }) => (
              <li key={title}>
                <span className="principle-number" aria-hidden="true">{number}</span>
                <div><h4>{title}</h4><p>{detail}</p></div>
                <span className="principle-mark" aria-hidden="true">+</span>
              </li>
            ))}
          </ul>
          <p className="team-note">Practical advice. Tidy installation. A clear handover.</p>
        </div>
      </div>
    </section>
  );
}
