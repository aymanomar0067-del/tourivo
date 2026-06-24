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

// --- Homepage helpers -------------------------------------------------------
export function startingPrice(t) {
  const p = t.pricing || {};
  return p.adult ?? p.startingRate ?? null;
}

// Top tours by review volume (optionally limited to a destination)
export function featuredTours(n = 6, destinationSlug = null) {
  let list = destinationSlug ? toursByDestination(destinationSlug) : tours;
  list = list.filter((t) => tourImages(t)[0] && startingPrice(t) != null);
  return [...list].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, n);
}

// Resolve a category's lightweight tour-card list to full tour objects (for images)
export function categoryWithTours(destinationSlug, slug, limit = 4) {
  const c = categoryBySlug(destinationSlug, slug);
  if (!c) return null;
  const resolved = (c.tours || [])
    .map((card) => tourByUrl(card.url) || null)
    .filter(Boolean)
    .filter((t) => tourImages(t)[0]);
  return { category: c, tours: resolved.slice(0, limit) };
}

// Category tiles with banner images for the "Find things to do" grid
export function categoryTiles(destinationSlug, slugs) {
  return slugs
    .map((s) => categoryBySlug(destinationSlug, s))
    .filter((c) => c && imageUrl(c.bannerImage));
}

// Real customer reviews for the testimonials section
export function homeReviews(n = 6) {
  const out = [];
  for (const t of tours) {
    for (const r of t.reviewsSample || []) {
      if (r.name && r.text && r.text.length > 40) out.push({ name: r.name, text: r.text, tour: t.name, rating: t.rating || 5 });
    }
  }
  // spread picks across the catalog for variety
  const step = Math.max(1, Math.floor(out.length / n));
  const picked = [];
  for (let i = 0; i < out.length && picked.length < n; i += step) picked.push(out[i]);
  return picked;
}

// Lowest "from" price within a category (for the price-tiles section)
export function categoryStartingFrom(destinationSlug, slug) {
  const c = categoryBySlug(destinationSlug, slug);
  if (!c) return null;
  const prices = (c.tours || []).map((t) => t.startingPrice).filter((p) => p != null);
  return prices.length ? Math.min(...prices) : null;
}

export function heroImage(destinationSlug = 'sharm-el-sheikh') {
  const order = ['cruises-boat-tours-sharm-el-sheikh', 'snorkeling-sharm-el-sheikh', 'best-tours-and-excursions', 'boat-trips'];
  for (const s of order) {
    const c = categoryBySlug(destinationSlug, s);
    if (c && imageUrl(c.bannerImage)) return imageUrl(c.bannerImage);
  }
  const t = toursByDestination(destinationSlug).find((x) => tourImages(x)[0]);
  return t ? tourImages(t)[0] : null;
}
