import Link from 'next/link';
import Footer from '../components/Footer';
import { LandingTourCard } from '../components/cards';
import {
  destinations, featuredTours, categoryWithTours, categoryTiles,
  homeReviews, heroImage, imageUrl, tours, categories, categoryStartingFrom,
} from '../../lib/data';
import { BRAND, waLink } from '../../lib/site';

export const metadata = {
  title: `${BRAND.name} — Egypt Red Sea Tours & Excursions`,
  description: 'Book the best tours, excursions and activities in Sharm El Sheikh and Hurghada — boat trips, snorkeling, desert safaris, day trips and spa. Best price, free cancellation, pay online or on arrival.',
};

const TILE_SLUGS = ['boat-trips', 'excursions', 'historical-tours', 'wellness-spa', 'rentals', 'transfers', 'nightlife-parties', 'travel-guide'];
const ROWS = [
  { slug: 'boat-trips', label: 'Boat Trips' },
  { slug: 'excursions', label: 'Excursions' },
  { slug: 'historical-tours', label: 'Historical & Day Trips' },
  { slug: 'wellness-spa', label: 'Wellness & Spa' },
];

export default function HomePage() {
  const hero = heroImage('sharm-el-sheikh');
  const featured = featuredTours(6);
  const tiles = categoryTiles('sharm-el-sheikh', TILE_SLUGS);
  const rows = ROWS.map((r) => ({ ...r, data: categoryWithTours('sharm-el-sheikh', r.slug, 3) })).filter((r) => r.data && r.data.tours.length);
  const reviews = homeReviews(6);
  const promoImg = imageUrl((categories.find((c) => c.slug === 'safari-tours-sharm-el-sheikh') || {}).bannerImage) || hero;
  const qualityImg = imageUrl((categories.find((c) => c.slug === 'diving-tours') || {}).bannerImage) || hero;
  const PRICE_TILES = [
    ['boat-trips', 'Boat Trips'], ['excursions', 'Excursions'], ['historical-tours', 'Historical'], ['wellness-spa', 'Wellness & Spa'],
    ['snorkeling-sharm-el-sheikh', 'Snorkeling'], ['transfers', 'Transfers'], ['day-trips-sharm-el-sheikh', 'Day Trips'], ['nightlife-parties', 'Nightlife'],
  ];
  const priceTiles = PRICE_TILES.map(([slug, label]) => ({ slug, label, url: `/en/sharm-el-sheikh/category/${slug}`, from: categoryStartingFrom('sharm-el-sheikh', slug) }));
  const QUALITY_TIPS = [
    ['Easy hotel pickup', 'Free pickup and drop-off from your hotel in Sharm El Sheikh or Hurghada — we confirm timing on WhatsApp.'],
    ['What to bring', 'Swimwear, a towel, sunscreen, a hat and your passport or a copy for trips that need it.'],
    ['Best time to visit', 'The Red Sea is warm and sunny most of the year — spring and autumn are ideal for boat trips and diving.'],
    ['Pay your way', 'Pay securely online with Visa or PayPal, or simply pay cash on arrival — no hidden fees.'],
    ['Flexible & refundable', 'Free cancellation on most activities, with full refunds when you cancel in time.'],
    ['We plan it with you', 'Tell us your dates and group, and we tailor the perfect mix of activities for your trip.'],
  ];

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
              <Link href="/en/sharm-el-sheikh">Activities <span className="caret">▾</span></Link>
              <div className="submenu">
                <Link href="/en/sharm-el-sheikh">Sharm El Sheikh</Link>
                <Link href="/en/hurghada">Hurghada</Link>
                <Link href="/en/sharm-el-sheikh/category/boat-trips">Boat Trips</Link>
                <Link href="/en/sharm-el-sheikh/category/excursions">Excursions</Link>
                <Link href="/en/sharm-el-sheikh/category/snorkeling-sharm-el-sheikh">Snorkeling</Link>
                <Link href="/en/sharm-el-sheikh/category/wellness-spa">Wellness &amp; Spa</Link>
              </div>
            </div>
            <Link href="/en/sharm-el-sheikh/about">About</Link>
            <a href={waLink('Hi Tourivo, I have a question about your tours')}>Contact Us</a>
          </nav>
          <a className="cta" href={waLink('Hi Tourivo, I would like to book a tour')}>Book now</a>
        </div>

        <div className="container lp-hero-inner">
          <div className="lp-overline">Welcome to Tourivo</div>
          <h1>Egypt&apos;s Red Sea Tours &amp; Excursions</h1>
          <p className="lede">Snorkeling, boat trips, desert safaris, day trips to Cairo &amp; Luxor, spa and nightlife — handpicked experiences in Sharm El Sheikh and Hurghada.</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/en/sharm-el-sheikh">Explore activities</Link>
            <a className="btn btn-wa" href={waLink('Hi Tourivo, I would like to book a tour')}>Book on WhatsApp</a>
          </div>
        </div>

        <div className="container lp-stats">
          <div className="s"><b>{tours.length}</b><span>Activities</span></div>
          <div className="s"><b>{categories.filter((c) => (c.tripCount ?? 0) > 0).length}</b><span>Categories</span></div>
          <div className="s"><b>2</b><span>Destinations</span></div>
          <div className="s"><b>4.9★</b><span>Traveler rating</span></div>
        </div>
      </header>

      {/* ---------- DESTINATIONS ---------- */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-head">
            <div className="eyebrow">Where to next</div>
            <h2>Choose your destination</h2>
            <p>Two Red Sea hubs, one trusted local operator — with Dahab coming soon.</p>
          </div>
          <div className="dest-strip">
            {destinations.map((d) => {
              const img = heroImage(d.slug) || hero;
              const inner = (
                <>
                  {img && <img src={img} alt={d.name} loading="lazy" />}
                  <div className="scrim" />
                  {!d.active && <span className="soon">Coming soon</span>}
                  <div className="c"><h3>{d.name}</h3><span>{d.tagline}</span></div>
                </>
              );
              return d.active
                ? <Link key={d.slug} href={`/en/${d.slug}`} className="d">{inner}</Link>
                : <div key={d.slug} className="d">{inner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* ---------- POPULAR ACTIVITIES ---------- */}
      <section className="lp-section alt">
        <div className="container">
          <div className="lp-head">
            <div className="eyebrow">Most booked</div>
            <h2>Popular activities</h2>
            <p>Our travelers&apos; favorites across the Red Sea.</p>
          </div>
          <div className="grid cards">
            {featured.map((t) => <LandingTourCard key={t.slug} tour={t} tag="Popular" />)}
          </div>
        </div>
      </section>

      {/* ---------- FIND THINGS TO DO (tiles) ---------- */}
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
                <img src={imageUrl(c.bannerImage)} alt={c.name} loading="lazy" />
                <div className="scrim" />
                <div className="lab">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PER-CATEGORY ROWS ---------- */}
      {rows.map((r) => (
        <section className="lp-section" key={r.slug} style={{ paddingTop: '1rem' }}>
          <div className="container">
            <div className="row-head">
              <h2>{r.label}</h2>
              <Link href={r.data.category.url}>View all →</Link>
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
            <div className="eyebrow">Plan & compare</div>
            <h2>Find things to do</h2>
            <p>Starting prices across our most popular categories.</p>
          </div>
          <div className="price-tiles">
            {priceTiles.map((t) => (
              <Link key={t.slug} href={t.url} className="ptile">
                <h4>{t.label}</h4>
                <div className="loc">📍 Sharm El Sheikh</div>
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
            <div className="qimg">{qualityImg && <img src={qualityImg} alt="Tourivo experiences" loading="lazy" />}</div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--teal)', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '.82rem' }}>Why book with us</div>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', margin: '.4rem 0 .6rem' }}>Enjoy our best quality tour &amp; experience</h2>
              <p className="intro">From your hotel pickup to the last sunset, we take care of every detail so you can simply enjoy the Red Sea.</p>
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
              <h2>Ready for your Red Sea adventure?</h2>
              <p>Message us on WhatsApp and we&apos;ll help you plan the perfect trip — pickup, timing and the best activities for you.</p>
              <a className="btn btn-wa" href={waLink('Hi Tourivo, I would like to plan my trip')}>Plan my trip on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
