import Link from 'next/link';
import { BRAND } from '../../lib/site';

export default function Header({ destinationSlug }) {
  const base = destinationSlug ? `/en/${destinationSlug}` : '/en';
  return (
    <header className="site-header">
      <div className="container bar">
        <Link href="/en" className="logo">Tour<span>ivo</span></Link>
        <nav className="nav-links">
          <Link href="/en">Destinations</Link>
          {destinationSlug && <Link href={`${base}`}>Activities</Link>}
          {destinationSlug && <Link href={`${base}/about`}>About</Link>}
        </nav>
      </div>
    </header>
  );
}
