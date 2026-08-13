# Maria Komugabe — Online Portfolio

Portfolio site for **Dr. Maria Assumpta Komugabe** — Geospatial Data Scientist, Lecturer, and
Research Fellow. Built with [Astro](https://astro.build) (static HTML, no CMS) and deployed to
GitHub Pages. Live at **[mariakomugabe.com](https://mariakomugabe.com)**.

> 📘 **Maria — start here:** [**GUIDE-FOR-MARIA.md**](GUIDE-FOR-MARIA.md) is a complete, non-technical
> guide to updating every part of the site yourself — blog posts, photos, research, bio, CV, and more —
> right in your web browser.

## How updates work

Every change is a commit to `main`. Editing a file on GitHub (the pencil ✏️ button) automatically
rebuilds and republishes the site in ~1–2 minutes. If a change has a typo, the build stops with a red
✗ and the live site simply keeps the previous version — you can't take it down. Watch the **Actions**
tab for the green ✓.

## Where content lives

All under `site/src/` — you never need to edit a `.astro` file:

| Content | Location |
|---|---|
| Blog posts ("Writings") | `site/src/content/blog/*.md` |
| News items | `site/src/content/news/*.md` |
| Publications | `site/src/content/publications/*.md` |
| Research threads | `site/src/content/research/*.md` |
| About bio / Teaching philosophy (prose) | `site/src/content/pages/*.md` |
| Lists (supervised, courses, honors, appointments…) | `site/src/data/*.yaml` |
| Photos | `assets/photos/web/` (reference as `/photos/NAME.jpg`) |

Full details and step-by-step instructions are in [GUIDE-FOR-MARIA.md](GUIDE-FOR-MARIA.md).

## Local development (for maintainers)

```bash
cd site
npm install
npm run dev       # http://localhost:4321
npm run build     # production build → site/dist/ (also validates content)
npm run preview   # serve the built dist/
```

Node ≥ 22 (`.nvmrc` pins 22). Architecture notes are in `CLAUDE.md`; deployment in `DEPLOY.md`.
