import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { TourCard, CategoryCard } from '../../components/cards';
import {
  activeDestinations, destinationBySlug, categoriesByDestination,
  toursByDestination, publishedGuides, imageUrl,
} from '../../../lib/data';
import { canonical } from '../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return activeDestinations.map((d) => ({ destination: d.slug }));
}

export function generateMetadata({ params }) {
  const d = destinationBySlug(params.destination);
  if (!d) return {};
  const title = `${d.name} Tours & Activities`;
  return {
    title,
    description: `Book the best tours, excursions and activities in ${d.name}. ${d.tagline}.`,
    alternates: { canonical: canonical(`/en/${d.slug}`) },
  };
}

function heroFor(slug) {
  const cat = categoriesByDestination(slug).find((c) => imageUrl(c.bannerImage));
  return cat ? imageUrl(cat.bannerImage) : null;
}

export default function DestinationPage({ params }) {
  const d = destinationBySlug(params.destination);
  if (!d || !d.active) notFound();

  const categories = categoriesByDestination(d.slug).filter((c) => (c.tripCount ?? 0) > 0);
  const allTours = toursByDestination(d.slug);
  const popular = [...allTours].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 8);
  const guides = publishedGuides(d.slug);
  const hero = heroFor(d.slug);

  return (
    <>
      <Header destinationSlug={d.slug} />
      <section className="hero">
        {hero && <img className="bg" src={hero} alt={d.name} />}
        <div className="scrim" />
        <div className="container inner">
          <h1>{d.name} Tours & Activities</h1>
          <p>{d.tagline} — explore {allTours.length} experiences across {categories.length} categories.</p>
        </div>
      </section>

      <main className="container">
        <section className="section">
          <div className="section-head"><h2>Browse by category</h2></div>
          <div className="grid cats">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </section>

        <section className="section">
          <div className="section-head"><h2>Popular activities</h2></div>
          <div className="grid cards">
            {popular.map((t) => <TourCard key={t.slug} tour={t} />)}
          </div>
        </section>

        {guides.length > 0 && (
          <section className="section">
            <div className="section-head"><h2>Travel guide</h2></div>
            <div className="grid cards">
              {guides.slice(0, 8).map((g) => (
                <Link key={g.slug} href={g.url} className="card">
                  {imageUrl((g.images || [])[0]) ? <img className="thumb" src={imageUrl(g.images[0])} alt={g.name} loading="lazy" /> : <div className="thumb" />}
                  <div className="body">
                    <span className="pill">{g.type || 'Guide'}</span>
                    <div className="title">{g.name}</div>
                    {g.description && <div className="desc">{g.description}</div>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
