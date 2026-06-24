# Tourivo

A Next.js (App Router) tours-and-activities website, rebuilt from the migrated Sharm Gate content. It renders every destination, category, tour, and travel-guide page as a fast static page with full SEO (meta, Open Graph, Twitter, canonical) and schema.org JSON-LD (Product, FAQPage, BreadcrumbList). Bookings go through WhatsApp, matching the original flow.

## What's inside
```
tourivo/
├── app/                      # routes (App Router)
│   ├── page.js               # / → redirects to /en
│   ├── en/page.js            # destination chooser
│   ├── en/[destination]/…    # destination, category, tour, info, about pages
│   ├── en/privacy-policy/
│   ├── sitemap.js, robots.js
│   └── components/           # Header, Footer, cards, JSON-LD
├── lib/                      # data loaders + site config
├── data/                     # the migrated JSON (tours, categories, …) — the content source
├── package.json
└── next.config.js
```

## Admin dashboard
A preview admin dashboard is at **`/dashboard`** (Overview, Categories, Availability, Activities, Bookings, Reviews, Contact Requests, Suppliers, Finance, Users, Settings). It shows the full interface with real catalog data + sample operational data, ready to connect to a backend. See `DASHBOARD.md`. It is currently unsecured — protect it before launch (details in `DASHBOARD.md`).

## Content lives in `data/`
The site reads `data/tours.json`, `categories.json`, `navigation.json`, `travel-guide.json`. To update content, edit those files (same shape as produced by the migration) and redeploy. Later you can swap this for the database in `../migration/tourivo-schema.sql` without changing the page components much.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build
```bash
npm run build && npm start
```

## Configure your domain
Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.com`) so canonicals and the sitemap use your host. See `DEPLOY-VERCEL.md`.

## Images
Images are referenced directly from the original public URLs, so they display immediately. To self-host them, run `../migration/download_images.sh`, upload the files (e.g. to `public/images/`), and point `lib/data.js → imageUrl()` at the new paths.

## Bookings
Each tour has a “Book on WhatsApp” button (number in `lib/site.js`). For real online checkout later, add an API route + payment provider; the static catalog stays the same.
