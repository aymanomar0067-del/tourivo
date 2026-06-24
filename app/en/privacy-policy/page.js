import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { canonical } from '../../../lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Tourivo collects, uses and protects your information.',
  alternates: { canonical: canonical('/en/privacy-policy') },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container">
        <article className="article" style={{ padding: '2rem 0' }}>
          <h1>Privacy Policy</h1>
          <p>Tourivo respects your privacy. This page explains what information we collect when you browse the site
            and make a booking enquiry, and how it is used.</p>
          <h2>Information we collect</h2>
          <p>When you make a booking enquiry we collect the details you provide (such as your name, contact number,
            preferred tour, dates and number of travellers) so we can arrange your activity.</p>
          <h2>Payments</h2>
          <p>Online payments are processed by trusted third-party providers (e.g. PayPal). Tourivo does not store your
            full card details. You may also choose to pay on arrival for many activities.</p>
          <h2>Analytics</h2>
          <p>We use standard web analytics to understand how visitors use the site and to improve it.</p>
          <h2>Contact</h2>
          <p>For any privacy request, contact us via WhatsApp or the channels listed in the footer.</p>
          <p className="muted">This is a starter policy carried over from the migrated site — review it with your own
            legal/compliance requirements before launch.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
