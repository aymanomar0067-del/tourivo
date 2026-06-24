import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { CardFromListing, JsonLd } from '../../../../components/cards';
import { categories, categoryBySlug, destinationBySlug, imageUrl } from '../../../../../lib/data';
import { canonical, SITE_URL, BRAND } from '../../../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ destination: c.destinationSlug, slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = categoryBySlug(params.destination, params.slug);
  if (!c) return {};
  const s = c.seo || {};
  return {
    title: s.title || c.headline || c.name,
    description: s.metaDescription || c.description,
    keywords: s.keywords || undefined,
    alternates: { canonical: canonical(`/en/${c.destinationSlug}/category/${c.slug}`) },
    openGraph: { title: s.ogTitle || c.name, images: s.ogImage ? [s.ogImage] : undefined },
  };
}

export default function CategoryPage({ params }) {
  const c = categoryBySlug(params.destination, params.slug);
  if (!c) notFound();
  const d = destinationBySlug(params.destination);
  const banner = imageUrl(c.bannerImage);
  const list = c.tours || [];

  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: d?.name, item: `${SITE_URL}/en/${c.destinationSlug}` },
      { '@type': 'ListItem', position: 2, name: c.name, item: canonical(`/en/${c.destinationSlug}/category/${c.slug}`) },
    ],
  };

  return (
    <>
      <Header destinationSlug={c.destinationSlug} />
      <section className="hero" style={{ minHeight: 300 }}>
        {banner && <img className="bg" src={banner} alt={c.name} />}
        <div className="scrim" />
        <div className="container inner">
          <div className="breadcrumb" style={{ color: '#dfeaec' }}>
            <a href={`/en/${c.destinationSlug}`}>{d?.name}</a> › {c.name}
          </div>
          <h1>{c.headline || c.name}</h1>
        </div>
      </section>

      <main className="container">
        {c.description && (
          <section className="section" style={{ paddingBottom: '1rem' }}>
            <p className="muted" style={{ maxWidth: 820, fontSize: '1.05rem' }}>{c.description}</p>
          </section>
        )}
        <section className="section" style={{ paddingTop: '.5rem' }}>
          <div className="section-head"><h2>{list.length} {list.length === 1 ? 'tour' : 'tours'}</h2></div>
          <div className="grid cards">
            {list.map((item, i) => <CardFromListing key={i} item={item} />)}
          </div>
          {list.length === 0 && <p className="muted">No activities available at the moment.</p>}
        </section>

        {Array.isArray(c.faqs) && c.faqs.length > 0 && (
          <section className="section">
            <div className="section-head"><h2>Frequently asked questions</h2></div>
            {c.faqs.map((f, i) => (
              <details className="faq" key={i}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </section>
        )}
      </main>
      <JsonLd data={breadcrumb} />
      <Footer />
    </>
  );
}
