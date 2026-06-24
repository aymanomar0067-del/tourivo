import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { activeDestinations, destinationBySlug } from '../../../../lib/data';
import { canonical } from '../../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return activeDestinations.map((d) => ({ destination: d.slug }));
}

export function generateMetadata({ params }) {
  const d = destinationBySlug(params.destination);
  return {
    title: `About Tourivo — ${d?.name || ''}`.trim(),
    description: 'Tourivo is a trusted local tour operator on Egypt\'s Red Sea, creating unforgettable experiences in Sharm El Sheikh, Hurghada and Dahab.',
    alternates: { canonical: canonical(`/en/${params.destination}/about`) },
  };
}

export default function AboutPage({ params }) {
  const d = destinationBySlug(params.destination);
  if (!d) notFound();
  return (
    <>
      <Header destinationSlug={d.slug} />
      <main className="container">
        <article className="article" style={{ padding: '2rem 0' }}>
          <h1>About Tourivo</h1>
          <p>Founded with a passion for showcasing the beauty of Egypt&apos;s Red Sea, Tourivo has grown into one of
            the most trusted travel partners in the region. Our mission is simple: to create unforgettable experiences
            that connect travelers with the magic of Egypt&apos;s underwater paradise, rich history, and vibrant culture.</p>
          <h2>Why book with us</h2>
          <ul className="list-check">
            <li>Expert local guides who know every reef, trail and hidden gem</li>
            <li>Best-price guarantee with no hidden fees — pay online or on arrival</li>
            <li>24/7 support before, during and after your trip</li>
            <li>Free cancellation on most activities</li>
          </ul>
          <p className="muted">Currently serving {d.name} and Hurghada, with Dahab coming soon.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
