import Link from 'next/link';
import { CONTACT } from '../../lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ color: '#fff' }}>Tour<span style={{ color: 'var(--sun)' }}>ivo</span></div>
          <p className="muted" style={{ color: '#9fb6ba', maxWidth: 360 }}>
            Tours & activities across Egypt&apos;s Red Sea — Sharm El Sheikh, Hurghada & Dahab.
            Book online or on arrival, no hidden fees.
          </p>
          <div className="social">
            <a href={CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : '#'} aria-label="WhatsApp">✆</a>
            <a href={CONTACT.instagram} aria-label="Instagram">◎</a>
            <a href={CONTACT.facebook} aria-label="Facebook">f</a>
            <a href={CONTACT.telegram} aria-label="Telegram">➤</a>
          </div>
        </div>
        <div>
          <h4>Information</h4>
          <ul>
            <li><Link href="/en/privacy-policy">Privacy policy</Link></li>
            <li><Link href="/en/sharm-el-sheikh/about">About us</Link></li>
            <li><Link href="/en">Destinations</Link></li>
          </ul>
        </div>
        <div>
          <h4>Get our app</h4>
          <ul>
            <li><a href={CONTACT.appStore}>App Store</a></li>
            <li><a href={CONTACT.googlePlay}>Google Play</a></li>
            <li><a href={CONTACT.tripadvisor}>Tripadvisor</a></li>
          </ul>
        </div>
      </div>
      <div className="container copyright">© {new Date().getFullYear()} Tourivo. All rights reserved.</div>
    </footer>
  );
}
