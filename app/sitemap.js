import { activeDestinations, categories, tours, guides } from '../lib/data';
import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const now = new Date();
  const urls = [`${SITE_URL}/en`];
  activeDestinations.forEach((d) => {
    urls.push(`${SITE_URL}/en/${d.slug}`);
    urls.push(`${SITE_URL}/en/${d.slug}/about`);
  });
  categories.forEach((c) => urls.push(`${SITE_URL}/en/${c.destinationSlug}/category/${c.slug}`));
  tours.forEach((t) => urls.push(`${SITE_URL}${t.url}`));
  guides.filter((g) => g.description).forEach((g) => urls.push(`${SITE_URL}${g.url}`));
  urls.push(`${SITE_URL}/en/privacy-policy`);
  return urls.map((u) => ({ url: u, lastModified: now, changeFrequency: 'weekly', priority: u.includes('/tours/') ? 0.8 : 0.6 }));
}
