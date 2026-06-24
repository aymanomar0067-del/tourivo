import Link from 'next/link';
import { CONTACT, waLink } from '../../lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ color: '#fff' }}>Tour<span style={{ color: 'var(--sun)' }}>ivo</span></div>
          <p className="addr">Egypt&apos;s Red Sea — Sharm El Sheikh &amp; Hurghada.<br />Tours, excursions &amp; activities, booked with a trusted local team.</p>
          <div className="social">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} aria-label="WhatsApp">✆</a>
            <a href={CONTACT.instagram} aria-label="Instagram">◎</a>
            <a href={CONTACT.facebook} aria-label="Facebook">f</a>
            <a href={CONTACT.telegram} aria-label="Telegram">➤</a>
          </div>
        </div>

        <div>
          <h4>Pages</h4>
          <ul>
            <li><Link href="/en/sharm-el-sheikh/about">About Us</Link></li>
            <li><Link href="/en/sharm-el-sheikh">Sharm El Sheikh</Link></li>
            <li><Link href="/en/hurghada">Hurghada</Link></li>
            <li><Link href="/en">Destinations</Link></li>
          </ul>
        </div>

        <div>
          <h4>Important Links</h4>
          <ul>
            <li><Link href="/en/privacy-policy">Privacy Policy</Link></li>
            <li><a href={waLink('Hi Tourivo, I have a question')}>Contact Us</a></li>
            <li><a href={CONTACT.tripadvisor}>Tripadvisor</a></li>
            <li><a href={CONTACT.appStore}>Get the App</a></li>
          </ul>
        </div>

        <div>
          <h4>Our Newsletter</h4>
          <p className="addr" style={{ margin: '0 0 .2rem' }}>Get special offers and travel tips straight to your inbox.</p>
          <div className="nl-row">
            <input className="nl-input" type="email" placeholder="Your email" aria-label="Email" />
            <a className="nl-btn" href={waLink('Hi Tourivo, I would like to receive your offers')}>Sign Up</a>
          </div>
        </div>
      </div>
      <div className="container copyright">© {new Date().getFullYear()} Tourivo. All rights reserved.</div>
    </footer>
  );
}
