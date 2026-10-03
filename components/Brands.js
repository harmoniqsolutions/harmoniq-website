import Image from 'next/image';

const BRANDS = [
  { name: 'UniFi', category: 'Networks & cameras', src: '/images/unifi.svg', width: 53, height: 16 },
  { name: 'RUCKUS Wireless', category: 'Wireless networks', src: '/images/ruckus.png', width: 458, height: 226 },
  { name: 'NETGEAR AV', category: 'AV networking', src: '/images/netgear.png', width: 1525, height: 215 },
  { name: 'Shure', category: 'Microphones & sound', src: '/images/shure.png', width: 500, height: 119 },
  { name: 'Biamp', category: 'Audio processing', src: '/images/biamp.png', width: 1010, height: 322 },
  { name: 'Q-SYS', category: 'AV systems', src: '/images/q-sys.png', width: 545, height: 307 },
  { name: 'Crestron', category: 'Control systems', src: '/images/crestron.png', width: 1532, height: 231 },
  { name: 'Extron', category: 'AV infrastructure', src: '/images/extron.png', width: 3000, height: 623 },
  { name: 'Dante', category: 'Audio networking', src: '/images/dante.png', width: 3840, height: 892 },
];

export default function Brands() {
  return (
    <section id="brands" aria-labelledby="brands-title" className="brands-section section-padding">
      <div className="section-container">
        <div className="brands-heading">
          <div>
            <p className="eyebrow">The equipment behind the work</p>
            <h2 id="brands-title" className="section-heading">Technology<br />we work with.</h2>
          </div>
          <p className="section-intro">From wireless networks to room audio, we choose equipment around your project, your space and your budget.</p>
        </div>
        <ul className="brands-grid" aria-label="Technology brands and platforms">
          {BRANDS.map(({ name, category, src, width, height }) => (
            <li className="brand-tile" key={name}>
              <div className="brand-logo-frame">
                <Image className="brand-logo" src={src} alt={name} width={width} height={height} sizes="180px" />
              </div>
              <span className="brand-category">{category}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
