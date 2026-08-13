# Deployment & Editing Runbook

The site is a **static Astro build** deployed to **GitHub Pages** via GitHub Actions,
for free. There is no CMS: content is edited as Markdown in the repo (locally or through
GitHub's web editor). Everything in **§1 is configured in the repo**; **§2–§4 are account
actions** for the repo/Pages owner.

## 0. Architecture

- **Framework:** Astro 7 (`site/`), all pages prerendered to static HTML.
- **Host:** GitHub Pages (free). Deployed by `.github/workflows/deploy.yml` on every push
  to `main`.
- **Build:** the workflow builds `site/`; the bundle-assets integration copies
  `assets/{photos/web,publications,posters}` into the output at build time.
- **Domain:** `mariakomugabe.com` (see `site/public/CNAME`); `site` in
  `astro.config.mjs` is set to that origin, so canonical URLs / sitemap / OG tags assume it.

## 1. Already configured

- `.github/workflows/deploy.yml` — build + deploy to Pages (Node 22).
- `site/public/CNAME` — custom domain.
- Static build verified: `cd site && npm run build` → flat static `dist/` (23 pages).

## 2. Push to GitHub

The repo is **`github.com/Komugabe/Maria-s-Portfolio`** (owned by Maria; Richard is a collaborator).
**On a free plan, GitHub Pages requires a _public_ repo** (private needs GitHub Pro). Internal home-lab
notes are kept out of the repo (`docs/INFRA-LOCAL.md` is gitignored); `Documents/` and
`assets/photos/originals/` (EXIF/GPS) are gitignored too — the repo only contains web-facing content.

```bash
# GitHub as a second remote alongside Gitea (origin). From the repo root:
git remote add github https://github.com/Komugabe/Maria-s-Portfolio.git
git push -u github main
```
Push to whichever remote you need — Gitea (`origin`) for local staging, GitHub (`github`) for the live deploy.

## 3. Enable GitHub Pages  *(owner)*

Repo → **Settings → Pages → Build and deployment → Source: “GitHub Actions.”**
The next push to `main` runs the workflow and publishes the site.

## 4. Custom domain + DNS  *(owner)*

1. Settings → Pages → **Custom domain** → `mariakomugabe.com` (the `CNAME` file already sets this).
2. At the domain registrar, point DNS at GitHub Pages:
   - **Apex `mariakomugabe.com`** → four `A` records:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and the matching `AAAA` records if you want IPv6).
   - **`www`** → `CNAME` to `Komugabe.github.io`.
3. Enable **“Enforce HTTPS”** once the certificate provisions.

> The build assumes the custom-domain root. If you ever deploy to a project-repo URL
> (`<user>.github.io/<repo>/`) *without* a custom domain, set `base: '/<repo>/'` in
> `astro.config.mjs` or assets will 404.

## 5. How Maria edits content (no CMS)

Maria manages all content herself through the GitHub web editor — see the complete, non-technical
**[GUIDE-FOR-MARIA.md](GUIDE-FOR-MARIA.md)**. In short: content lives in Markdown / YAML / data files
under `site/src/` (blog, news, publications, research, the About/CV/Teaching data files) plus photos in
`assets/photos/web/`. Every commit to `main` auto-rebuilds and republishes in ~1–2 minutes, and she
never needs to edit a `.astro` file.

## Appendix — Gitea CI + local staging (private)

The project is also mirrored to a self-hosted Gitea instance with a local staging server for
previewing. Because that involves private home-lab details, its runbook lives in
**`docs/INFRA-LOCAL.md`** — gitignored, so it's kept out of this public repo.

## 6. Known follow-ups (not blocking)

- **Content gaps:** confirm canonical ORCID; add GitHub/LinkedIn to `sameAs`
  (`site/src/pages/index.astro`); confirm the flagged data items (see project notes).
- **CV PDF:** the CV is HTML-only at `/cv/`; drop a real `/cv.pdf` into `site/public/`
  and link it when ready.
- **OG images:** one default card today; per-page build-time cards are a planned
  enhancement (`design/SEO.md §C`).
