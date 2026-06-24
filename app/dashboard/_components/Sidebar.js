'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/dashboard', label: 'Overview', ico: '▦' },
  { href: '/dashboard/categories', label: 'Categories', ico: '🗂' },
  { href: '/dashboard/availability', label: 'Availability', ico: '📅' },
  { href: '/dashboard/activities', label: 'Activities', ico: '🎫' },
  { href: '/dashboard/bookings', label: 'Bookings', ico: '🧾' },
  { href: '/dashboard/reviews', label: 'Reviews', ico: '★' },
  { href: '/dashboard/contact-requests', label: 'Contact Requests', ico: '✉' },
  { sep: 'Operations' },
  { href: '/dashboard/suppliers', label: 'Suppliers', ico: '🚚' },
  { href: '/dashboard/finance', label: 'Finance', ico: '💰' },
  { sep: 'Admin' },
  { href: '/dashboard/users', label: 'Users', ico: '👤' },
  { href: '/dashboard/settings', label: 'Settings', ico: '⚙' },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="dash-side">
      <div className="brand">Tour<span>ivo</span></div>
      {NAV.map((n, i) =>
        n.sep ? (
          <div className="sep" key={i}>{n.sep}</div>
        ) : (
          <Link key={n.href} href={n.href} className={path === n.href ? 'active' : ''}>
            <span className="ico">{n.ico}</span> {n.label}
          </Link>
        )
      )}
      <Link href="/en" className="logout">↩ Back to site</Link>
    </aside>
  );
}
