import Icon from "@/components/Icon";

const services = [
  { id: "audio", title: "Audio & video", tagline: "Make every room sound and look better.", description: "From a TV on the wall to a church sound system, we help you choose and install equipment that fits your space and the way you use it.", items: ["TVs, displays & projectors", "Speakers, microphones & sound systems", "Home entertainment & meeting room AV", "AV cabling, setup & troubleshooting"], prompt: "Let’s talk AV" },
  { id: "network", title: "IT & networks", tagline: "A good connection changes everything.", description: "Patchy Wi-Fi, a new office, or cables that need sorting? We build and improve networks for everyday work, streaming, and everything in between.", items: ["Wi-Fi & wireless access points", "Routers, switches & network setup", "Ethernet cabling & tidy equipment racks", "IT equipment setup & troubleshooting"], prompt: "Let’s get you connected" },
  { id: "security", title: "Security systems", tagline: "More visibility. More peace of mind.", description: "We install security systems that help you see what’s happening at your home, church, or business, with a setup you can actually use.", items: ["Security cameras & video recording", "Video doorbells & entry systems", "Security system installation & setup", "Remote viewing & a hands-on walkthrough"], prompt: "Let’s talk security" },
];

export default function Services() {
  return (
    <section id="services" className="section-padding services-section" aria-labelledby="services-title">
      <div className="section-container">
        <div className="section-heading-row">
          <h2 id="services-title" className="section-heading">Good technology.<br /><span className="muted-heading">Made to work for you.</span></h2>
          <p className="section-intro">One room or a whole space. A new installation or a fix for what you already have. We’ll start with what you need.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article id={`service-${service.id}`} className={`service-card service-${service.id}`} key={service.id}>
              <div className="service-card-top"><div className="service-icon"><Icon name={service.id} /></div><div className="service-wave" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div></div>
              <h3>{service.title}</h3><p className="service-tagline">{service.tagline}</p><p className="service-description">{service.description}</p>
              <ul>{service.items.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
              <a href="#contact" className="text-link">{service.prompt}<Icon name="arrow" /></a>
            </article>
          ))}
        </div>
        <div className="services-note"><Icon name="network" /><p>Need a mix of all three? That’s where working with one team makes life easier.</p></div>
      </div>
    </section>
  );
}
