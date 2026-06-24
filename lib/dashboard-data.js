// Server-side sample data for the dashboard UI shell.
// Real catalog data (categories, activities, reviews) comes from the migration;
// operational data (bookings, users, suppliers, contacts, finance) is SYNTHETIC
// sample data so the interface can be reviewed before a backend is connected.
import { tours, categories, guides, toursByDestination, tourImages } from './data';

// --- tiny seeded RNG for deterministic sample data ---
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

// ---------- Overview ----------
export function overview() {
  const activeCategories = categories.filter((c) => (c.tripCount ?? 0) > 0).length;
  const liveActivities = tours.length;
  const bookings = sampleBookings();
  const upcoming = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending').length;
  const refunds = bookings.filter((b) => b.status === 'Refunded').length;
  return { activeCategories, liveActivities, upcoming, refunds };
}

const TYPE_RULES = [
  ['Boat Trip', /(boat|snorkel|cruise|island|yacht|catamaran|sea|submarine|diving|glass-bottom|speed)/i],
  ['Party', /(party|nightclub|club|lounge|nightlife)/i],
  ['Wellness Spa', /(spa|massage|hammam|sauna|salt-cave|wellness)/i],
  ['Transfer', /(transfer|airport)/i],
  ['Rental', /(rental|router|gopro|scooter|bike-rental)/i],
  ['Excursion', /(excursion|safari|quad|buggy|desert|cairo|luxor|petra|pyramid|museum|monastery|moses|st-catherine|aqua|dolphin|horse)/i],
];
function classify(t) {
  const s = (t.slug || '') + ' ' + (t.name || '');
  for (const [label, re] of TYPE_RULES) if (re.test(s)) return label;
  return 'Excursion';
}
export function activityMix() {
  const m = {};
  tours.forEach((t) => { const k = classify(t); m[k] = (m[k] || 0) + 1; });
  m['Travel Guide'] = guides.filter((g) => g.description).length;
  return Object.entries(m).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count);
}

// ---------- Activities ----------
export function activityRows() {
  return tours.map((t) => ({
    id: t.slug,
    name: t.name,
    image: tourImages(t)[0] || null,
    destination: t.destination,
    type: classify(t),
    price: (t.pricing && (t.pricing.adult ?? t.pricing.startingRate)) ?? null,
    rating: t.rating,
    reviews: t.reviewCount || 0,
    status: t.pricing && (t.pricing.adult ?? t.pricing.startingRate) != null ? 'Published' : 'Draft',
    url: t.url,
  }));
}

// ---------- Categories ----------
export function categoryRows() {
  return categories.map((c) => ({
    id: c.slug,
    name: c.name,
    destination: c.destination,
    trips: c.tripCount ?? (c.tours ? c.tours.length : 0),
    legacyId: c.internalId || '—',
    status: (c.tripCount ?? 0) > 0 ? 'Active' : 'Empty',
    url: c.url,
  }));
}

// ---------- Reviews (real samples from tours) ----------
export function reviewRows() {
  const rows = [];
  tours.forEach((t) => {
    (t.reviewsSample || []).forEach((r, i) => {
      rows.push({
        id: `${t.slug}-${i}`,
        author: r.name,
        activity: t.name,
        rating: t.rating || 5,
        text: r.text,
        status: 'Published',
      });
    });
  });
  return rows;
}

// ---------- Bookings (synthetic sample) ----------
const FIRST = ['Omar', 'Sara', 'Liam', 'Elena', 'Yusuf', 'Marta', 'Tom', 'Aisha', 'Pavel', 'Nina', 'Hans', 'Giulia', 'Ahmed', 'Sophie', 'Mehmet', 'Olga'];
const LAST = ['Hassan', 'Rossi', 'Smith', 'Petrova', 'Khan', 'Müller', 'Dubois', 'Yılmaz', 'Novak', 'Ali', 'Brown', 'Conti'];
const STATUS = ['Confirmed', 'Confirmed', 'Pending', 'Completed', 'Completed', 'Cancelled', 'Refunded'];
export function sampleBookings() {
  const r = rng(42);
  const rows = [];
  for (let i = 0; i < 48; i++) {
    const t = pick(r, tours);
    const pax = 1 + Math.floor(r() * 5);
    const unit = (t.pricing && (t.pricing.adult ?? t.pricing.startingRate)) || 30;
    const usd = unit * pax;
    const day = 1 + Math.floor(r() * 28);
    const status = pick(r, STATUS);
    rows.push({
      id: 'BK-' + (1000 + i),
      customer: `${pick(r, FIRST)} ${pick(r, LAST)}`,
      activity: t.name,
      date: `2026-07-${String(day).padStart(2, '0')}`,
      pax,
      amountEGP: Math.round(usd * 49),
      amountUSD: usd,
      status,
    });
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

// ---------- Contact requests (synthetic) ----------
const MSGS = [
  'Do you offer hotel pickup from Naama Bay?',
  'Is the Ras Mohamed trip suitable for kids?',
  'Can I pay on arrival in cash?',
  'What time does the desert safari start?',
  'Are vegetarian meals available on the boat?',
  'Do you have availability next weekend?',
  'Can we get a private transfer to the airport?',
  'Is snorkeling gear included?',
];
export function contactRows() {
  const r = rng(7);
  const rows = [];
  for (let i = 0; i < 16; i++) {
    rows.push({
      id: 'CR-' + (200 + i),
      name: `${pick(r, FIRST)} ${pick(r, LAST)}`,
      channel: pick(r, ['WhatsApp', 'Email', 'Web form']),
      message: pick(r, MSGS),
      date: `2026-06-${String(1 + Math.floor(r() * 24)).padStart(2, '0')}`,
      status: pick(r, ['New', 'New', 'Replied', 'Closed']),
    });
  }
  return rows;
}

// ---------- Users (synthetic) ----------
export function userRows() {
  const r = rng(99);
  const roles = ['Admin', 'Manager', 'Staff', 'Customer', 'Customer', 'Customer'];
  const rows = [];
  for (let i = 0; i < 14; i++) {
    const name = `${pick(r, FIRST)} ${pick(r, LAST)}`;
    rows.push({
      id: 'U-' + (10 + i),
      name,
      email: name.toLowerCase().replace(/[^a-z]/g, '.') + '@example.com',
      role: i === 0 ? 'Admin' : pick(r, roles),
      joined: `2026-0${1 + Math.floor(r() * 5)}-${String(1 + Math.floor(r() * 27)).padStart(2, '0')}`,
      status: pick(r, ['Active', 'Active', 'Active', 'Invited']),
    });
  }
  return rows;
}

// ---------- Suppliers (synthetic) ----------
export function supplierRows() {
  const r = rng(303);
  const types = ['Boat operator', 'Transfer company', 'Spa partner', 'Desert camp', 'Dive center'];
  const rows = [];
  const names = ['Red Sea Marine', 'Sinai Transfers', 'Oasis Spa Group', 'Desert Falcons', 'Blue Hole Divers', 'Coral Bay Boats', 'Pharaoh Tours', 'Bedouin Camps Co.'];
  names.forEach((n, i) => {
    rows.push({
      id: 'SUP-' + (1 + i),
      name: n,
      type: pick(r, types),
      contact: '+20 10 ' + (10000000 + Math.floor(r() * 8999999)),
      activities: 1 + Math.floor(r() * 12),
      status: pick(r, ['Active', 'Active', 'On hold']),
    });
  });
  return rows;
}

// ---------- Finance (synthetic) ----------
export function finance() {
  const bookings = sampleBookings();
  const paid = bookings.filter((b) => b.status === 'Completed' || b.status === 'Confirmed');
  const revenueEGP = paid.reduce((s, b) => s + b.amountEGP, 0);
  const refundsEGP = bookings.filter((b) => b.status === 'Refunded').reduce((s, b) => s + b.amountEGP, 0);
  const pendingEGP = bookings.filter((b) => b.status === 'Pending').reduce((s, b) => s + b.amountEGP, 0);
  const txns = paid.slice(0, 12).map((b) => ({
    id: 'TX-' + b.id.replace('BK-', ''),
    booking: b.id,
    method: ['Visa', 'PayPal', 'Cash'][b.amountUSD % 3],
    amountEGP: b.amountEGP,
    date: b.date,
    status: 'Settled',
  }));
  return { revenueEGP, refundsEGP, pendingEGP, payoutEGP: Math.round(revenueEGP * 0.85), txns };
}

export const egp = (n) => 'E£' + Number(n).toLocaleString('en-US');
