import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { JsonLd } from '../../../../components/cards';
import { tours, tourBySlug, destinationBySlug, tourImages, formatPrice } from '../../../../../lib/data';
import { canonical, SITE_URL, waLink } from '../../../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return tours.map((t) => ({ destination: t.destinationSlug, slug: t.slug }));
}

export function generateMetadata({ params }) {
  const t = tourBySlug(params.destination, params.slug);
  if (!t) return {};
  const s = t.seo || {};
  return {
    title: s.title || t.name,
    description: s.metaDescription || (t.description || '').slice(0, 160),
    keywords: s.keywords || undefined,
    alternates: { canonical: canonical(`/en/${t.destinationSlug}/tours/${t.slug}`) },
    openGraph: { title: s.ogTitle || t.name, description: s.ogDescription, images: s.ogImage ? [s.ogImage] : undefined, type: 'website' },
    twitter: { card: 'summary_large_image', images: s.ogImage ? [s.ogImage] : undefined },
  };
}

const money = (v, c = 'USD') => (v == null ? null : `${c === 'USD' ? '$' : ''}${v}`);

export default function TourPage({ params }) {
  const t = tourBySlug(params.destination, params.slug);
  if (!t) notFound();
  const d = destinationBySlug(params.destination);
  const imgs = tourImages(t);
  const price = formatPrice(t);
  const p = t.pricing || {};
  const bookText = `Hi Tourivo, I'd like to book: ${t.name}${t.url ? ` (${SITE_URL}${t.url})` : ''}`;

  const gallery = imgs.slice(0, 5);
  const hiddenCount = (t.galleryMoreCount || 0) + Math.max(0, imgs.length - gallery.length);

  // ---- JSON-LD ----
  const productLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: t.name,
    description: t.description, image: imgs,
    brand: { '@type': 'Brand', name: 'Tourivo' },
    ...(price ? { offers: { '@type': 'Offer', price: price.value, priceCurrency: price.currency, availability: t.isBookable === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', url: canonical(t.url) } } : {}),
    ...(t.rating != null ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: t.rating, reviewCount: t.reviewCount || 1 } } : {}),
  };
  const faqLd = Array.isArray(t.faqs) && t.faqs.length ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  } : null;
  const crumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: d?.name, item: `${SITE_URL}/en/${t.destinationSlug}` },
      { '@type': 'ListItem', position: 2, name: t.name, item: canonical(t.url) },
    ],
  };

  return (
    <>
      <Header destinationSlug={t.destinationSlug} />
      <main className="container">
        <div className="breadcrumb">
          <a href={`/en/${t.destinationSlug}`}>{d?.name}</a> › <span>{t.name}</span>
        </div>

        <div className="tour-head">
          <h1>{t.name}</h1>
          <div className="tour-sub">
            {t.duration && <span>⏱ {t.duration}</span>}
            {t.availability && <span>📅 {t.availability}</span>}
            {t.rating != null && <span className="badge star">★ {t.rating} ({t.reviewCount} reviews)</span>}
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="gallery">
            {gallery.map((src, i) => (
              i === gallery.length - 1 && hiddenCount > 0 ? (
                <div className="more" key={i}><img src={src} alt={`${t.name} ${i + 1}`} /><span>+{hiddenCount}</span></div>
              ) : <img key={i} src={src} alt={`${t.name} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
          </div>
        )}

        <div className="layout">
          <div className="content">
            {t.description && (
              <section><h2>Description</h2><p className="prose">{t.description}</p></section>
            )}

            {t.highlights?.length > 0 && (
              <section><h2>Highlights</h2>
                <ul className="list-dot">{t.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
              </section>
            )}

            {(t.included?.length > 0 || t.excluded?.length > 0) && (
              <section><h2>What&apos;s included</h2>
                {t.included?.length > 0 && <ul className="list-check">{t.included.map((x, i) => <li key={i}>{x}</li>)}</ul>}
                {t.excluded?.length > 0 && <ul className="list-x">{t.excluded.map((x, i) => <li key={i}>{x}</li>)}</ul>}
              </section>
            )}

            {t.itinerary?.length > 0 && (
              <section><h2>Itinerary</h2>
                <ul className="list-dot">{t.itinerary.map((s, i) => <li key={i}><strong>{s.title}</strong>{s.detail ? ` — ${s.detail}` : ''}</li>)}</ul>
              </section>
            )}

            {t.knowBeforeYouGo?.length > 0 && (
              <section><h2>Know before you go</h2>
                <ul className="list-dot">{t.knowBeforeYouGo.map((x, i) => <li key={i}>{x}</li>)}</ul>
              </section>
            )}

            {t.packages?.length > 0 && (
              <section><h2>Select your package</h2>
                {t.packages.map((pk, i) => (
                  <div className="pkg" key={i}>
                    <div className="pkg-top">
                      <div>
                        <strong>{pk.name}</strong>
                        {pk.description && <div className="pkg-sub">{pk.description}</div>}
                        {pk.duration && <div className="pkg-sub">⏱ {pk.duration}</div>}
                      </div>
                      <div className="pkg-price">
                        {pk.adultPrice != null ? `$${pk.adultPrice}` : ''}
                        {(pk.youthPrice != null || pk.infantPrice != null) && (
                          <div className="pkg-sub" style={{ textAlign: 'right' }}>
                            {pk.youthPrice != null ? `Youth $${pk.youthPrice}` : ''}{pk.infantPrice != null ? ` · Infant $${pk.infantPrice}` : ''}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {t.cancellationPolicy && (
              <section><h2>Cancellation policy</h2><p className="muted">{t.cancellationPolicy}</p></section>
            )}

            {t.reviewsSample?.length > 0 && (
              <section><h2>Reviews {t.reviewCount ? `(${t.reviewCount})` : ''}</h2>
                {t.reviewsSample.map((r, i) => (
                  <div className="review" key={i}><div className="who">{r.name}</div><p>{r.text}</p></div>
                ))}
              </section>
            )}

            {t.faqs?.length > 0 && (
              <section><h2>Frequently asked questions</h2>
                {t.faqs.map((f, i) => (
                  <details className="faq" key={i}><summary>{f.question}</summary><p>{f.answer}</p></details>
                ))}
              </section>
            )}
          </div>

          {/* Booking sidebar */}
          <aside>
            <div className="booking">
              {price && <div className="big">{price.from && <small>from </small>}{money(price.value, price.currency)}<small> / person</small></div>}
              <div className="rows">
                {p.adult != null && <div className="r"><span>Adult{p.adultMaxQty ? ` (max ${p.adultMaxQty})` : ''}</span><strong>{money(p.adult)}</strong></div>}
                {p.child != null && <div className="r"><span>Child{p.childAgeRange ? ` (${p.childAgeRange})` : ''}</span><strong>{p.child === 0 ? 'Free' : money(p.child)}</strong></div>}
                {p.infant != null && <div className="r"><span>Infant</span><strong>{p.infant === 0 ? 'Free' : money(p.infant)}</strong></div>}
                {t.duration && <div className="r"><span>Duration</span><strong>{t.duration}</strong></div>}
                {t.availability && <div className="r"><span>Availability</span><strong>{t.availability}</strong></div>}
              </div>
              <a className="btn btn-wa" href={waLink(bookText)} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
              <p className="note">We&apos;ll confirm your pickup time and location via WhatsApp before the tour. Pay online or on arrival — no hidden fees.</p>
            </div>
          </aside>
        </div>

        {t.relatedTours?.length > 0 && (
          <section className="section">
            <div className="section-head"><h2>You may also like</h2></div>
            <div className="grid cards">
              {t.relatedTours.map((r, i) => (
                <a key={i} href={r.url} className="card"><div className="body"><div className="title">{r.name}</div></div></a>
              ))}
            </div>
          </section>
        )}
      </main>
      <JsonLd data={productLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd data={crumbLd} />
      <Footer />
    </>
  );
}
