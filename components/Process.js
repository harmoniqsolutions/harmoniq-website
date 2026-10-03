import Icon from "@/components/Icon";

const STEPS = [
  {
    title: 'Talk it through',
    description: 'Tell us what you want to improve, what you already have and what is getting in the way. We start with your needs and your budget.',
  },
  {
    title: 'Plan & install',
    description: 'We agree on the scope and equipment, then get to work. Thoughtful placement and tidy cabling are part of the job.',
  },
  {
    title: 'Test & hand over',
    description: 'We check the setup and walk you through using it. You can ask questions and get comfortable with the controls before we wrap up.',
  },
];

export default function Process() {
  return (
    <section id="why-us" aria-labelledby="process-title" className="process-section section-padding">
      <div className="section-container">
        <div className="process-heading">
          <h2 id="process-title" className="section-heading">A straightforward process.<br />From first chat to final check.</h2>
          <p className="section-intro">A small team, clear conversations and care for the details. Here is what working with HarmoniQ looks like.</p>
        </div>
        <ol className="process-grid">
          {STEPS.map(({ title, description }, index) => (
            <li key={title} className="process-card">
              <span className="process-number" aria-hidden="true">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
        <div className="process-footer">
          <p>A single upgrade or a few systems working together. We can help you work out the next step.</p>
          <a className="text-link" href="#contact">Tell us about your project <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  );
}
