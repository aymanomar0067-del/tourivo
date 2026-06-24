import { notFound } from 'next/navigation';
import Link from 'next/link';
import Footer from '../../components/Footer';
import { LandingTourCard } from '../../components/cards';
import {
  activeDestinations, destinationBySlug, curatedCategories, toursByDestination,
  featuredTours, categoryWithTours, categoryStartingFrom, categoryLabel, homeReviews,
  heroImage, imageUrl,
} from '../../../lib/data';
import { canonical, waLink } from '../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return activeDestinations.map((d) => ({ destination: d.slug }));
}

export function generateMetadata({ params }) {
  const d = destinationBySlug(params.destination);
  if (!d) return {};
  return {
    title: `${d.name} Tours & Excursions`,
    description: `Book the best tours, excursions and activities in ${d.name} — boat trips, snorkeling, desert safaris, day trips and spa. ${d.tagline}. Best price, free cancellation, pay online or on arrival.`,
    alternates: { canonical: canonical(`/en/${d.slug}`) },
  };
}

const QUALITY_TIPS = [
  ['Easy hotel pickup', 'Free pickup and drop-off from your hotel — we confirm timing on WhatsApp.'],
  ['What to bring', 'Swimwear, a towel, sunscreen, a hat and your passport or a copy for trips that need it.'],
  ['Best time to visit', 'The Red Sea is warm and sunny most of the year — spring and autumn are ideal for boat trips and diving.'],
  ['Pay your way', 'Pay securely online with Visa or PayPal, or simply pay cash on arrival — no hidden fees.'],
  ['Flexible & refundable', 'Free cancellation on most activities, with full refunds when you cancel in time.'],
  ['We plan it with you', 'Tell us your dates and group, and we tailor the perfect mix of activities for your trip.'],
];

export default function CityPage({ params }) {
  const d = destinationBySlug(params.destination);
  if (!d || !d.active) notFound();
  const slug = d.slug;

  const cats = curatedCategories(slug);
  const allTours = toursByDestination(slug);
  const featured = featuredTours(6, slug);
  const tiles = cats.filter((c) => imageUrl(c.bannerImage)).slice(0, 8);
  const rows = cats
    .map((c) => ({ label: categoryLabel(c), url: c.url, data: categoryWithTours(slug, c.slug, 3) }))
    .filter((r) => r.data && r.data.tours.length >= 2)
    .slice(0, 4);
  const priceTiles = cats
    .map((c) => ({ label: categoryLabel(c), url: c.url, from: categoryStartingFrom(slug, c.slug) }))
    .filter((t) => t.from != null && t.from >= 5)
    .slice(0, 8);
  const reviews = homeReviews(6, slug);
  const hero = heroImage(slug);
  const qualityImg = imageUrl((tiles[3] || tiles[0] || {}).bannerImage) || hero;
  const promoImg = imageUrl((tiles[5] || tiles[1] || {}).bannerImage) || hero;
  const otherCity = activeDestinations.find((x) => x.slug !== slug);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <header className="lp-hero">
        {hero && <img className="bg" src={hero} alt="" />}
        <div className="scrim" />
        <div className="container lp-nav">
          <Link href="/en" className="logo">Tour<span>ivo</span></Link>
          <nav className="links">
            <Link href="/en">Home</Link>
            <div className="has-drop">
              <Link href={`/en/${slug}`}>Activities <span className="caret">▾</span></Link>
              <div className="submenu">
                {cats.slice(0, 6).map((c) => <Link key={c.slug} href={c.url}>{categoryLabel(c)}</Link>)}
              </div>
            </div>
            {otherCity && <Link href={`/en/${otherCity.slug}`}>{otherCity.name}</Link>}
            <Link href={`/en/${slug}/about`}>About</Link>
            <a href={waLink(`Hi Tourivo, I have a question about ${d.name} tours`)}>Contact Us</a>
          </nav>
          <a className="cta" href={waLink(`Hi Tourivo, I would like to book a tour in ${d.name}`)}>Book now</a>
        </div>

        <div className="container lp-hero-inner">
          <div className="lp-overline">Discover {d.name}</div>
          <h1>{d.name} Tours &amp; Excursions</h1>
          <p className="lede">{d.tagline} — boat trips, snorkeling, desert safaris, day trips and spa, handpicked by a trusted local team.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#activities">Explore activities</a>
            <a className="btn btn-wa" href={waLink(`Hi Tourivo, I would like to book a tour in ${d.name}`)}>Book on WhatsApp</a>
          </div>
        </div>

        <div className="container lp-stats">
          <div className="s"><b>{allTours.length}</b><span>Activities</span></div>
          <div className="s"><b>{cats.length}</b><span>Categories</span></div>
          <div className="s"><b>4.9★</b><span>Traveler rating</span></div>
        </div>
      </header>

      {/* ---------- POPULAR ---------- */}
      <section className="lp-section alt" id="activities">
        <div className="container">
          <div className="lp-head">
            <div className="eyebrow">Most booked</div>
            <h2>Popular activities</h2>
            <p>Our travelers&apos; favorites in {d.name}.</p>
          </div>
          <div className="grid cards">
            {featured.map((t) => <LandingTourCard key={t.slug} tour={t} tag="Popular" />)}
          </div>
        </div>
      </section>

      {/* ---------- BROWSE BY CATEGORY (tiles) ---------- */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-head">
            <div className="eyebrow">Categories</div>
            <h2>Browse by category</h2>
            <p>Pick a category and discover every experience.</p>
          </div>
          <div className="tiles">
            {tiles.map((c) => (
              <Link key={c.slug} href={c.url} className="tile">
                <img src={imageUrl(c.bannerImage)} alt={categoryLabel(c)} loading="lazy" />
                <div className="scrim" />
                <div className="lab">{categoryLabel(c)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PER-CATEGORY ROWS ---------- */}
      {rows.map((r) => (
        <section className="lp-section" key={r.url} style={{ paddingTop: '1rem' }}>
          <div className="container">
            <div className="row-head">
              <h2>{r.label}</h2>
              <Link href={r.url}>View all →</Link>
            </div>
            <div className="grid cards three">
              {r.data.tours.map((t) => <LandingTourCard key={t.slug} tour={t} />)}
            </div>
          </div>
        </section>
      ))}

      {/* ---------- WHY US ---------- */}
      <section className="lp-section alt">
        <div className="container">
          <div className="lp-head">
            <div className="eyebrow">Why Tourivo</div>
            <h2>Travel with a trusted local team</h2>
          </div>
          <div className="whyus">
            <div className="f"><div className="ic">🤿</div><h3>Expert local guides</h3><p>Born-and-raised guides who know every reef, trail and hidden gem.</p></div>
            <div className="f"><div className="ic">💎</div><h3>Best-price guarantee</h3><p>Fair, transparent pricing with no hidden fees — pay online or on arrival.</p></div>
            <div className="f"><div className="ic">🛟</div><h3>24/7 support</h3><p>We&apos;re on WhatsApp before, during and after your trip.</p></div>
            <div className="f"><div className="ic">↩️</div><h3>Free cancellation</h3><p>Flexible plans with free cancellation on most activities.</p></div>
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-head">
            <div className="eyebrow">Reviews</div>
            <h2>What our travelers say</h2>
          </div>
          <div className="testi">
            {reviews.map((r, i) => (
              <div className="t" key={i}>
                <div className="stars">{'★'.repeat(Math.round(r.rating))}</div>
                <p>{r.text}</p>
                <div className="who">
                  <div className="av">{(r.name || '?').trim().charAt(0)}</div>
                  <div><b>{r.name}</b><span>{r.tour}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FIND THINGS TO DO (price tiles) ---------- */}
      <section className="lp-section alt">
        <div className="container">
          <div className="lp-head">
            <div className="eyebrow">Plan &amp; compare</div>
            <h2>Find things to do</h2>
            <p>Starting prices across our most popular categories.</p>
          </div>
          <div className="price-tiles">
            {priceTiles.map((t) => (
              <Link key={t.url} href={t.url} className="ptile">
                <h4>{t.label}</h4>
                <div className="loc">📍 {d.name}</div>
                <div className="from">Start from</div>
                <div className="price">{t.from != null ? `$${t.from}` : '—'}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ENJOY OUR BEST QUALITY ---------- */}
      <section className="lp-section">
        <div className="container">
          <div className="quality">
            <div className="qimg">{qualityImg && <img src={qualityImg} alt={`${d.name} experiences`} loading="lazy" />}</div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--teal)', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '.82rem' }}>Why book with us</div>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', margin: '.4rem 0 .6rem' }}>Enjoy our best quality tour &amp; experience</h2>
              <p className="intro">From your hotel pickup to the last sunset, we take care of every detail so you can simply enjoy {d.name}.</p>
              <div className="tips">
                {QUALITY_TIPS.map(([title, text], i) => (
                  <div className="qtip" key={i}>
                    <div className="n">{i + 1}</div>
                    <div><h4>{title}</h4><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROMO ---------- */}
      <section className="lp-section">
        <div className="container">
          <div className="promo">
            {promoImg && <img src={promoImg} alt="" />}
            <div className="scrim" />
            <div className="c">
              <h2>Ready for your {d.name} adventure?</h2>
              <p>Message us on WhatsApp and we&apos;ll help you plan the perfect trip — pickup, timing and the best activities for you.</p>
              <a className="btn btn-wa" href={waLink(`Hi Tourivo, I would like to plan my trip to ${d.name}`)}>Plan my trip on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
