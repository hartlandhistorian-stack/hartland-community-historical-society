# Hartland Community Historical Society

A digital archive of Hartland, New Brunswick — founded by **Doris E. Kennedy** and supported by community volunteers and local businesses.

The Society's collection is anchored on Doris's lifelong work: photographs gathered from neighbours, families, and her own albums, each one annotated with names, dates, and stories.

The site presents the collection in three ways:
1. **By category** (River Life, Bridges, Churches, Fires, Floods, Mills, Schools, …)
2. **By wall poster** — each printed poster in the Hartland Community Library has a QR code that opens its page here, showing the photographs in the exact L→R, T→B order of the wall
3. **By search** across the full collection — by person, year, place, or subject

The site is a **Next.js 15** app backed by **JSON files**. No database. No CMS. No login. A non-technical volunteer can add a photograph by saving a JPG into the right folder and copying an existing JSON file as a template.

---

## What's in here

| Folder | What lives there |
|---|---|
| `content/photos/<id>.json` | One JSON file per photograph (336 of them at launch) |
| `content/posters/<slug>.json` | One JSON file per wall poster (14 at launch) |
| `content/categories/<slug>.json` | One JSON file per category (14 at launch) |
| `public/images/photos/<slug>/<file>.jpg` | The actual photograph image files (~675 MB) |
| `public/images/posters/<slug>.png` | Preview images of the printed wall posters |
| `public/identifications/<slug>.txt` | Doris's full text identifications for each poster |
| `public/posters/<slug>.pdf` | Source PDFs of the printed wall posters (where available) |
| `src/lib/` | Content loaders, search, QR helpers (the engine room) |
| `src/components/` | UI components — header, footer, photo cards, etc. |
| `src/app/` | Pages (Home, Collection, Categories, Posters, Photo detail, About, Contact, Contribute) |
| `scripts/generate-qr-codes.ts` | Bulk-generate QR PNG/SVG for every poster |

---

## Running the site locally

The project assumes Node.js 20 or newer.

```bash
# 1. install dependencies (one time)
npm install

# 2. create your env file (the defaults are fine for local dev)
cp .env.example .env.local

# 3. run the dev server
npm run dev
```

Open http://localhost:3013 in your browser.

---

## Adding a photograph (no coding required)

1. **Scan the photograph** at a reasonable resolution (1200 px on the long edge is plenty).
2. **Save it as a JPG** into the appropriate folder under `/public/images/photos/`. For example, a new church photograph goes into `/public/images/photos/churches-of-hartland/`.
3. **Open an existing JSON file** from `/content/photos/` (e.g. `photo-churches-of-hartland-01.json`) and **save it as a new file with a different name** in the same folder.
4. **Edit the new JSON file**, filling in:
   - `id` — a unique identifier, e.g. `photo-churches-of-hartland-21`
   - `slug` — the URL part, e.g. `churches-of-hartland-st-johns-anglican-1955`
   - `title` — the short caption visitors will see
   - `image` — the path to your JPG, e.g. `/images/photos/churches-of-hartland/st-johns-anglican-1955.jpg`
   - `description` — Doris's identification, or yours
   - `date`, `location`, `people`, `category_ids`, `poster_ids` — as applicable
   - `alt` — a short description of what's in the photograph, for screen readers
5. **Refresh the page in your browser** — the new photograph will appear in its category and (if you set `poster_ids`) on its poster page.

That's it. No deploys, no rebuilds during local dev. For production, see the deployment section below.

---

## Editing a caption or correcting a name

1. Find the photograph on the site and note its slug (in the URL after `/photos/`).
2. Open the matching JSON file in `/content/photos/`.
3. Edit the `description`, `people`, `date`, or whatever needs fixing.
4. Save the file. The change appears on next page load.

---

## The content model in plain English

Each **photograph** has:
- A short **title** (the caption you see under the picture)
- A long **description** (Doris's full identification, or a brief note if she didn't write one)
- A **date** (and a flag if it's only approximate)
- A **location** (text — the latitude and longitude default to Hartland)
- A list of **people** in the photograph
- A list of **categories** it belongs to
- A list of **posters** it appears on
- Source, credit, and rights information

Each **category** is a theme (River Life, Schools, Mills, …) with a description and an optional cover photograph.

Each **poster** mirrors a printed poster in the library. It has its photographs arranged in **row, column, and display order** — the exact order they appear on the wall. A visitor who scans the QR code on the printed poster sees the same images in the same order on their phone.

---

## QR codes

Each poster page automatically generates a QR code that points back to itself. You can:

- **View it inline** on the poster's page in the browser
- **Download SVG or PNG** from links on that page
- **Bulk generate all posters at once** with `npm run qr` — outputs to `/public/qr/<slug>.svg` and `.png`

The QR target URL is configurable via `NEXT_PUBLIC_SITE_URL` in `.env.local`. For local testing, set it to `http://localhost:3013`. For production, set it to your live domain (e.g. `https://hartlandhistorical.ca`).

---

## Tech stack — what's powering this

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS** (with a custom archival palette — river blue, spruce green, cream, weathered wood, muted brick)
- **qrcode** for QR generation
- **No database** — content is plain JSON files. Easier for volunteers, easier to back up.

The whole site builds statically (`next build`) and can be hosted anywhere that serves static files plus a small Node runtime for the QR API route.

---

## Deploying

The simplest path is to run `next build` and then `next start` on a small server, or to deploy to a Next.js-aware host (Vercel, Netlify, Railway, Cloudflare Pages with Workers).

For a fully static deploy (cheaper, faster), you can run `next build && next export`, but the QR API route under `/api/qr/[slug]` won't work — instead, run `npm run qr` ahead of time to produce static QR files in `/public/qr/`, and link to those.

Set `NEXT_PUBLIC_SITE_URL` to your real domain before building so that QR codes encode the correct URL.

---

## About the Society

The Hartland Community Historical Society was **founded by Doris E. Kennedy** and is supported by community volunteers and local businesses. It does not yet have a physical museum; it has photographs, identifications, walls of posters in the Hartland Community Library, and — now — this website.

Photographs and identifications are © Doris E. Kennedy unless otherwise noted, used by permission.

For corrections, identifications, contributions, business sponsorship, or any other inquiry:
**[nursekennedy@hotmail.com](mailto:nursekennedy@hotmail.com)**
