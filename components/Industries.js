const INDUSTRIES = [
  {
    title: 'Homes',
    description: 'Make everyday life a little more connected, from movie night to working from home.',
    examples: 'TVs & sound · Wi-Fi · Cameras',
    path: 'M3 10.5 12 3l9 7.5M5 9v12h14V9M9 21v-7h6v7',
  },
  {
    title: 'Churches & worship spaces',
    description: 'Help your message reach the room with clear sound, useful displays and a setup your team understands.',
    examples: 'Sound systems · Video · Networks',
    path: 'M12 3v7M9 6h6M4 21V12l8-5 8 5v9H4ZM9 21v-6h6v6',
  },
  {
    title: 'Small businesses',
    description: 'Get the essentials in place for your shop, office or workspace, with equipment that fits the way you work.',
    examples: 'Business Wi-Fi · AV · Security',
    path: 'M3 9h18M4 9l1-6h14l1 6M4 9v12h16V9M9 21v-7h6v7',
  },
  {
    title: 'Community spaces',
    description: 'Equip gathering rooms, local venues and shared spaces for meetings, activities and everyday use.',
    examples: 'Room audio · Displays · Connectivity',
    path: 'M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 4a4 4 0 0 1 0 7M21 21v-2a4 4 0 0 0-3-3.87',
  },
];

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="industries-section section-padding">
      <div className="section-container">
        <div className="industries-heading">
          <p className="eyebrow">Where we work</p>
          <h2 id="industries-title" className="section-heading">Built for the places<br />you use every day.</h2>
          <p className="section-intro">Homes, local businesses and the spaces that bring people together. Small projects are welcome.</p>
        </div>
        <div className="industries-grid">
          {INDUSTRIES.map(({ title, description, examples, path }, index) => (
            <article key={title} className="industry-card glass-card">
              <div className="industry-topline">
                <svg className="industry-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
                <span className="industry-index" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <p className="industry-examples">{examples}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
