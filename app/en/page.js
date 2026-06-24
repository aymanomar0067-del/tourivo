import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { destinations, categoriesByDestination, toursByDestination, imageUrl, tourImages } from '../../lib/data';
import { BRAND } from '../../lib/site';

export const metadata = {
  title: `${BRAND.name} — Choose Your Destination`,
  description: BRAND.description,
};

function heroFor(slug) {
  const cat = categoriesByDestination(slug).find((c) => imageUrl(c.bannerImage));
  if (cat) return imageUrl(cat.bannerImage);
  const t = toursByDestination(slug).find((t) => tourImages(t)[0]);
  return t ? tourImages(t)[0] : null;
}

export default function DestinationChooser() {
  return (
    <>
      <Header />
      <main className="container">
        <div style={{ textAlign: 'center', padding: '2.5rem 0 .5rem' }}>
          <h1 style={{ fontSize: '2.2rem' }}>Welcome to Tourivo</h1>
          <p className="muted" style={{ fontSize: '1.1rem' }}>Where are you heading?</p>
        </div>
        <div className="chooser">
          {destinations.map((d) => {
            const img = heroFor(d.slug);
            const inner = (
              <>
                {img ? <img src={img} alt={d.name} /> : <div style={{ position: 'absolute', inset: 0, background: '#bcd' }} />}
                <div className="scrim" />
                {!d.active && <div className="soon">Coming soon</div>}
                <div className="c">
                  <h3>{d.name}</h3>
                  <div style={{ opacity: .9 }}>{d.tagline}</div>
                </div>
              </>
            );
            return d.active ? (
              <Link key={d.slug} href={`/en/${d.slug}`} className="dest">{inner}</Link>
            ) : (
              <div key={d.slug} className="dest disabled">{inner}</div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
