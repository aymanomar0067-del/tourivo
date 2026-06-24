import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { guides, destinationBySlug, imageUrl } from '../../../../../lib/data';
import { canonical } from '../../../../../lib/site';

const destSlugOf = (g) => (g.url || '').split('/')[2];

export const dynamicParams = false;

export function generateStaticParams() {
  // Only build guide pages that actually have body content (skip legacy 404 slugs).
  return guides.filter((g) => g.description).map((g) => ({ destination: destSlugOf(g), slug: g.slug }));
}

export function generateMetadata({ params }) {
  const g = guides.find((x) => x.slug === params.slug && destSlugOf(x) === params.destination);
  if (!g) return {};
  const s = g.seo || {};
  return {
    title: s.title || g.name,
    description: s.metaDescription || (g.description || '').slice(0, 160),
    alternates: { canonical: canonical(`/en/${params.destination}/info/${g.slug}`) },
    openGraph: { title: g.name, images: s.ogImage ? [s.ogImage] : undefined },
  };
}

export default function GuidePage({ params }) {
  const g = guides.find((x) => x.slug === params.slug && destSlugOf(x) === params.destination);
  if (!g || !g.description) notFound();
  const d = destinationBySlug(params.destination);
  const hero = imageUrl((g.images || [])[0]);

  return (
    <>
      <Header destinationSlug={params.destination} />
      <main className="container">
        <div className="breadcrumb"><a href={`/en/${params.destination}`}>{d?.name}</a> › Travel guide › {g.name}</div>
        <article className="article">
          <span className="pill">{g.type || 'Guide'}</span>
          <h1 style={{ marginTop: '.5rem' }}>{g.name}</h1>
          {hero && <img src={hero} alt={g.name} style={{ borderRadius: 14, margin: '1rem 0' }} />}
          <div className="prose">{g.description}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
