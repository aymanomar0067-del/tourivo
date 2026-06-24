# Tourivo Dashboard (preview UI)

Admin dashboard at **`/dashboard`**, rebuilt from your existing Sharm Gate control center. This is the **interface, with sample data** — so you can review every screen before we connect a live backend. The **Companies** section was intentionally left out per your request.

## Sections
| Page | Route | Data source |
|---|---|---|
| Overview (Control Center) | `/dashboard` | Real stats + activity mix from your catalog |
| Categories | `/dashboard/categories` | **Real** (36 migrated categories) |
| Availability | `/dashboard/availability` | Sample calendar + capacity per activity |
| Activities | `/dashboard/activities` | **Real** (96 migrated tours) |
| Bookings | `/dashboard/bookings` | Sample bookings (EGP) |
| Reviews | `/dashboard/reviews` | **Real** (371 review samples from the catalog) |
| Contact Requests | `/dashboard/contact-requests` | Sample enquiries |
| Suppliers | `/dashboard/suppliers` | Sample partners |
| Finance | `/dashboard/finance` | Sample revenue / refunds / payouts |
| Users | `/dashboard/users` | Sample accounts |
| Settings | `/dashboard/settings` | Editable form (business, pricing, payments, policy) |

Every table supports search, column sorting, dropdown filters and paging. Action buttons (Edit/Delete/New/Export) are present but not yet wired.

## What "sample data" means
- **Catalog data is real** — categories, activities and reviews come from your migrated content.
- **Operational data is synthetic** — bookings, users, suppliers, contact requests and finance are realistic placeholders generated locally. No real customer data is included.

## Making it live (next step, when you're ready)
A working dashboard needs three things added to the app:
1. **Auth** — an admin login (e.g. NextAuth, Clerk, or Firebase Auth).
2. **A database** — your existing **Firebase/Firestore**, or a new Postgres/Supabase using `../migration/tourivo-schema.sql`.
3. **Server actions / API routes** — replace the sample-data functions in `lib/dashboard-data.js` with real reads/writes, and make the table action buttons call them.

Because the UI already separates data (in `lib/dashboard-data.js`) from presentation (the pages), wiring a backend means swapping that one module's functions — the screens stay the same.

## Security note
The dashboard is currently **open** (no login) and marked `noindex`. Do **not** treat it as private until auth is added. If you deploy now, consider protecting `/dashboard` with a Vercel password (Project → Settings → Deployment Protection) until real auth is in place.
