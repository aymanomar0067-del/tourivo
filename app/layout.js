import './globals.css';
import { SITE_URL, BRAND } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND.name} — ${BRAND.tagline}`, template: `%s | ${BRAND.name}` },
  description: BRAND.description,
  robots: { index: true, follow: true },
  openGraph: { siteName: BRAND.name, type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
