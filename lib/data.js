import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'data');
const read = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));

export const navigation = read('navigation.json');
export const tours = read('tours.json');
export const categories = read('categories.json');
export const guides = read('travel-guide.json');
export const destinationsDoc = read('destinations.json');

// --- Destinations -----------------------------------------------------------
export const destinations = navigation.destinations; // [{slug,name,tagline,active,...}]
export const activeDestinations = destinations.filter((d) => d.active);

export function destinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug) || null;
}

// --- Tours ------------------------------------------------------------------
export function toursByDestination(slug) {
  return tours.filter((t) => t.destinationSlug === slug);
}
export function tourBySlug(destinationSlug, slug) {
  return tours.find((t) => t.destinationSlug === destinationSlug && t.slug === slug) || null;
}
export function tourByUrl(url) {
  return tours.find((t) => t.url === url) || null;
}

// --- Categories -------------------------------------------------------------
export function categoriesByDestination(slug) {
  return categories.filter((c) => c.destinationSlug === slug);
}
export function categoryBySlug(destinationSlug, slug) {
  return categories.find((c) => c.destinationSlug === destinationSlug && c.slug === slug) || null;
}

// --- Travel guide -----------------------------------------------------------
export function guidesByDestination(slug) {
  return guides.filter((g) => g.destinationSlug === slug || g.destination === destinationNameFor(slug));
}
export function publishedGuides(slug) {
  return guidesByDestination(slug).filter((g) => g.description);
}
export function guideBySlug(destinationSlug, slug) {
  return guides.find((g) => g.slug === slug && (g.destinationSlug === destinationSlug || true)) || null;
}

function destinationNameFor(slug) {
  const d = destinationBySlug(slug);
  return d ? d.name : slug;
}

// --- Helpers ----------------------------------------------------------------
export function imageUrl(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  return img.sourceUrl || img.displayUrl || null;
}

export function tourImages(t) {
  return (t.images || []).map(imageUrl).filter(Boolean);
}

export function formatPrice(t) {
  const p = t.pricing || {};
  const val = p.adult ?? p.startingRate;
  if (val == null) return null;
  return { value: val, currency: p.currency || 'USD', from: p.adult == null };
}
