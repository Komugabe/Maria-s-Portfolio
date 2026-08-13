# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Maria Komugabe — Online Portfolio

## What this project is

An online portfolio website for **Dr. Maria Assumpta Komugabe** — Geospatial Data Scientist, University Lecturer, and Research Fellow (Claremont, CA). She completed her Ph.D. in Information Systems and Technology at Claremont Graduate University (conferred May 16, 2026); her research integrates AI and GIS for climate-driven malaria monitoring and healthcare supply optimization in low-income countries, primarily Uganda. The site is being built by Richard Caballero (a frequent co-author of hers) from resources Maria shared via Google Drive.

The site is **built** — a static [Astro](https://astro.build) app lives in `site/` (design "Lubugo", see below). Source material and planning docs live at the repo root; the app consumes them.

## Build & run

**The app is `site/`. Run all npm/astro commands from there** (they fail at the repo root). Node ≥ 22.12 (`.nvmrc` pins 22).

```sh
cd site
npm install          # first time (or npm ci for a clean, lockfile-exact install)
npm run dev          # local dev server → localhost:4321
npm run build        # production build → site/dist/
npm run preview      # serve the built dist/ locally
npm run astro check  # type-check .astro / content collections
```

There is **no test suite or linter** — `npm run build` (which type-checks content collections and fails on schema violations) is the closest thing to CI. Do not invent test commands.

The build's `bundle-assets` integration (in `astro.config.mjs`) copies `../assets/{photos/web,publications,posters}` into `site/public/` at dev/build time, so the app always reflects the canonical `/assets`. Those copies under `site/public/` are gitignored — `/assets` stays the single source of truth. The build also fetches web fonts from Google (Astro Fonts API), so **the build needs network access.**

The style tiles under `design/` are standalone static HTML — open directly in a browser (e.g. `open design/style-tile-lubugo.html`) to preview the design reference; they need no build step.

## Architecture

- **Framework:** Astro (static output, zero client JS except the small nav-toggle script in `BaseLayout.astro`). No React/Vue — everything is `.astro` components.
- **Content collections** (`site/src/content.config.ts`, files in `site/src/content/`): three glob collections with Zod schemas —
  - `publications/` — **one Markdown file per publication** (a Google Scholar requirement). Its schema fields drive the `citation_*` meta tags and `ScholarlyArticle` JSON-LD emitted by `CitationMeta.astro`. Keep field names stable.
  - `news/` — dated announcements feed → `/news/rss.xml`.
  - `blog/` — the "Writings" blog → `/writings/rss.xml`. (Collection is named `blog` internally; the section is titled "Writings" and served at `/writings/`.)
  - Note: `site/src/content/` (the live collections the app renders) is distinct from the root `content/` (human-authored source copy, below). Editing site pages means editing `site/src/content/`, not root `content/`.
- **Pages** (`site/src/pages/`): file-based routes. Dynamic routes `publications/[...slug].astro` and `writings/[...slug].astro` render one page per collection entry. CV is a download button in the nav, not a page.
- **Styling:** plain CSS, no framework. Design tokens in `site/src/styles/tokens.css` (the Lubugo palette/type/scale), plus `base.css` and `lubugo.css`. Fonts are self-hosted via the Astro Fonts API config, not a CDN link.
- **Deploy:** GitHub Actions (`.github/workflows/deploy.yml`) builds `site/` and publishes to GitHub Pages on push to `main`; custom domain `mariakomugabe.com` via `site/public/CNAME`. `.gitea/workflows/build.yml` builds on a self-hosted Gitea runner (build-only; Gitea has no Pages). The `if: github.server_url == 'https://github.com'` guard keeps the two from colliding. Full deploy notes: `DEPLOY.md`.

## Repository layout

- `site/` — **the Astro application** (see Architecture above). Has its own `package.json`, `README.md`, and `AGENTS.md`/`CLAUDE.md` (a symlink to `AGENTS.md`, currently just Astro-starter boilerplate).
- `design/` — binding design + planning docs: `DESIGN-lubugo.md`, `SITE-STRUCTURE.md` (sitemap/content plan), `SEO.md`, `TECH-STACK.md`, and the style-tile HTML previews.
- `Documents/` — Maria's raw files as downloaded from Google Drive (docx, original photos, publication PDFs). Treat as read-only source material; don't reorganize.
- `content/` — human-authored source copy, distilled from `Documents/`. This is **not** what the site renders (that's `site/src/content/`); it's the canonical prose Richard drew the site content from. Keep it as reference:
  - `about.md` — clean bio, appointments, education, research areas, honors (canonical "About" copy)
  - `resume.md` — full CV converted from RESUME.docx
  - `publications.md` — all 8 publications + 2 posters with verified titles, authors, venues, DOIs, and abstracts, each linked to its PDF in assets
  - `photos.md` — every photo with caption, date, and suggested usage, grouped by theme
  - `links-and-press.md` — researcher profiles, press features, institutional links, academic service
- `assets/publications/` — renamed publication PDFs (`YYYY_venue_slug.pdf`). Note: the DESRIST 2025 chapter was extracted (pp. 137–150) from the full 21 MB Springer proceedings volume, which stays in `Documents/Publications/CP2.pdf`.
- `assets/posters/` — the two research posters.
- `assets/photos/originals/` — full-resolution photos, renamed to `YYYY-MM-DD_description` slugs (EXIF intact).
- `assets/photos/web/` — **use these on the site**: max 1600px, compressed, auto-oriented, EXIF/GPS stripped. Same basenames as originals.
- `_to_delete/` — scratch tarballs and staging from the content-prep pass. Not part of the project; don't build from it or cite it.

## Git & repo state

- The site, `content/`, `design/`, and `assets/{publications,posters,photos/web}` are committed. `.gitignore` excludes the heavy/private source — `assets/photos/originals/` (111 MB, EXIF/GPS), `Documents/` (173 MB raw source), `_to_delete/`, and the build artifacts (`site/node_modules/`, `site/dist/`, and the `site/public/` copies produced by `bundle-assets`).
- These excluded paths are **local-only source material** — they will not be on a fresh clone or in CI. Don't write code or docs that assume `Documents/` or `assets/photos/originals/` exist at runtime; the site only ever ships `assets/photos/web/`.

## Content facts to get right

- Name variants in publications: "Komugabe, M. A.", "Komugabe, M.", "Assumpta-Komugabe, M.", "Komugabe, A." — all the same person.
- Ph.D. conferred May 16, 2026; she was the CIST department banner bearer at commencement.
- Headline research: malaria prediction/monitoring with AI + GIS in Uganda (Random Forest R² 0.88 result is her most-cited finding).
- Second major thread: the Harvey Mudd College Clinic–Musizi University partnership (curriculum development for Uganda's first liberal arts university), 2023–present, three Clinic teams mentored.
- Email: makomugabe@gmail.com. Google Scholar and ORCID links are in `content/links-and-press.md` (note the ORCID discrepancy flagged there).
- Teaching evals (Spring 2026): 4.86/6.00 instruction quality, 4.97/6.00 contribution to learning.

## Design language

**Chosen: Direction B, "Lubugo"** (`design/DESIGN-lubugo.md` + `design/style-tile-lubugo.html`) — Uganda-heritage-led: barkcloth bone/russet palette, concentric-ring motif, basket-chevron dividers, photography as the chroma engine. This is binding; the style tile is the reference implementation. `DESIGN.md` (Direction A, "Field Atlas") is retained for its shared IA and component specs (§3, §7–10), Fraunces/Inter/mono type core, and the "neutral chrome, figures carry color" principle — but its cartographic palette/motifs are superseded by Lubugo. The rejected Direction A style tile (`design/style-tile.html`) is kept only for reference.

## Site structure

**`design/SITE-STRUCTURE.md` is the binding sitemap and page-by-page content plan** (derived from an 11-site audit of peer academics' sites). Nav: Home · Research · Publications · Teaching · Writings · About · [CV ↓] (the doc calls this section "Field Notes"; it was renamed to "Writings" and moved to `/writings/`). Every page section in that doc is mapped to specific files in `content/` and `assets/` — build from those mappings. It also lists open content gaps to ask Maria/Richard about before filling with placeholders.

## Conventions

- All application code lives in `site/`; never put site code inside `Documents/` or `assets/`.
- Photos on the site come from `assets/photos/web/` (via the `bundle-assets` copy); never reference or ship `assets/photos/originals/` (112 MB, contains EXIF/GPS).
- Publication PDFs, posters, and web photos are edited in canonical `/assets`, **not** in `site/public/` — those copies are generated and gitignored, so edits there are silently overwritten on the next build.
- If content and a source document disagree, `Documents/` originals win; update the affected copy (`content/` and/or `site/src/content/`) and note the fix.
- The `publications` collection schema maps 1:1 to Google Scholar citation meta tags — when adding a publication, fill the citation fields (`authors`, `venue`, `year`, `doi`, pages, etc.), not just title/abstract.
