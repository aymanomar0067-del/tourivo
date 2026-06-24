# Deploy Tourivo to Vercel — step by step

You have two easy options. **Option A (GitHub)** is recommended because every future edit auto-deploys. **Option B (CLI)** is fastest for a one-off.

The `tourivo/` folder is the project root — everything Vercel needs is inside it (including the content in `data/`). You do **not** upload `node_modules`; Vercel installs and builds for you.

---

## Option A — GitHub + Vercel dashboard (recommended)

1. **Create a free GitHub account** at github.com if you don't have one.
2. **Create a new repository** (e.g. `tourivo`), empty, private is fine.
3. **Upload the project.** Easiest no-terminal way:
   - On the new repo page click **“uploading an existing file”**.
   - Drag in the **contents of the `tourivo/` folder** (the `app`, `lib`, `data` folders and `package.json`, `next.config.js`, etc.). Do **not** include `node_modules`.
   - Commit.
   *(If you use git on your computer: `cd tourivo && git init && git add . && git commit -m "Tourivo" && git branch -M main && git remote add origin <your repo url> && git push -u origin main`.)*
4. **Go to vercel.com → sign up with GitHub** (free Hobby plan).
5. Click **Add New… → Project**, find your `tourivo` repo, click **Import**.
6. Vercel auto-detects **Next.js** — leave all build settings at their defaults (Build Command `next build`, no changes needed).
7. *(Optional now, recommended)* Under **Environment Variables** add:
   - Name `NEXT_PUBLIC_SITE_URL`  ·  Value `https://YOUR-DOMAIN.com` (or your `*.vercel.app` URL for now).
8. Click **Deploy**. In ~1–2 minutes you'll get a live URL like `https://tourivo-xxxx.vercel.app`.

That's a working website. Every time you push a change to GitHub, Vercel rebuilds automatically.

---

## Option B — Vercel CLI (one command)

On your computer with Node 18+ installed:
```bash
npm i -g vercel
cd tourivo
vercel            # first run: log in + answer the prompts (accept defaults)
vercel --prod     # promote to production
```
Set the domain variable once:
```bash
vercel env add NEXT_PUBLIC_SITE_URL production   # paste https://YOUR-DOMAIN.com
vercel --prod
```

---

## Connect your own domain
1. In the Vercel project → **Settings → Domains → Add**, type your domain (e.g. `tourivo.com`).
2. Vercel shows the DNS records to set. In your domain registrar (or current cPanel DNS), add:
   - An **A record** `@` → the IP Vercel gives, **or** a **CNAME** `www` → `cname.vercel-dns.com` (Vercel tells you exactly which).
3. Wait for DNS to propagate (minutes to a few hours). Vercel issues HTTPS automatically.
4. Update the `NEXT_PUBLIC_SITE_URL` env var to the real domain and redeploy so canonicals/sitemap are correct.

> Since the old site's URLs are preserved (`/en/{destination}/tours/{slug}`), pointing the existing domain here keeps your Google rankings and inbound links working.

---

## After it's live (recommended follow-ups)
- **Submit the sitemap** to Google Search Console: `https://YOUR-DOMAIN.com/sitemap.xml`.
- **Self-host images** for full independence from the old host: run `../migration/download_images.sh`, drop the files into `public/images/`, and update `lib/data.js`.
- **Re-brand**: the site currently shows “Tourivo”. Logos/wording live in `lib/site.js`, `app/components/Header.js` and `Footer.js`.
- **Spot-check** a few pages after deploy: the destination chooser, one category, one tour (gallery + Book on WhatsApp), and `/sitemap.xml`.

## Troubleshooting
- **Build fails on Vercel:** open the build log; it will name the file/line. The most common cause is an accidentally edited file — re-upload from this folder.
- **Images not showing:** they load from the original CDN; if the old host is taken down, self-host them (see above).
- **404 on a tour:** only the 96 migrated tours exist; check the slug against `data/tours.json`.
