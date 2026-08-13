# Tech Stack & Publishing Workflow — Decision

Supersedes the loose "Astro or Quarto" note in `DESIGN.md`. This is the binding decision for scaffolding. Researched 2026-08 against current (2025–2026) tooling; re-verify the moving-target items flagged at the bottom before build.

> **Update (2026-08) — hosting & CMS revised.** Richard chose **GitHub Pages** (free, all-in-GitHub, repo owned by Maria) over Cloudflare, and to **drop the CMS** rather than run Keystatic. Rationale: simplest and cheapest; Maria edits Markdown via GitHub's web editor; GitHub Pages is static-only, which rules out a self-hosted CMS server anyway. **The live setup is: Astro (static) → GitHub Actions → GitHub Pages**, no adapter, no Keystatic. The framework decision (Astro) stands. Deploy/edit steps live in `DEPLOY.md`. The Cloudflare/Keystatic analysis below is retained as the record of the original evaluation.

## TL;DR

**Astro + Keystatic + Cloudflare Pages.** All three legs decided (CMS chosen 2026-08 — see §2).

## 1. Framework — Astro (Quarto rejected)

Quarto is a fine tool for computational/scientific documents and even has good native blog + per-category RSS. It is rejected here for two reasons specific to this project:

1. **The hard constraint kills it.** Maria must publish blog/news posts without Richard in the loop. **No mainstream git-based CMS integrates with Quarto.** Quarto's only authoring path for her is editing raw `.qmd`/`.md` files in the GitHub web editor — real friction for routine posting, not viable as the primary workflow.
2. **Design fights it.** The chosen visual direction (Field Atlas / Lubugo — bespoke, agency-style layouts) is exactly what Quarto is *not* built for; it skins Bootstrap-based *documents*, not arbitrary page compositions.

Astro wins on the things that matter here: type-safe **Content Collections** (perfect for blog + news + publications as separate schemas), first-class RSS via `@astrojs/rss`, full component/CSS control for bespoke design, and it's the *reference* framework for the git-CMS pattern below. Hugo/Eleventy are competent but offer nothing Astro doesn't for this use case; Next.js is overkill.

- Current: Astro 6.x (Node 22+). Stable and fast.

## 2. CMS — DECIDED: Keystatic (2026-08)

**Chosen: Keystatic** (GitHub mode + Keystatic Cloud free tier) — lowest-friction handoff, purpose-built for Astro, Maria never sees Markdown/config. Sveltia was the runner-up (self-owned OAuth, no vendor dependency) if the Keystatic Cloud auth dependency ever becomes a problem — it's a drop-in-adjacent fallback. The comparison that drove the decision is retained below.

All three finalists work with Astro, store content as Markdown/YAML in the git repo (no lock-in, no external content DB), and give Maria a browser-based editing UI she can use from an iPad. They differ on the **auth dependency** and **editing UX**:

| Option | Editing UX | How Maria logs in | The tradeoff |
|---|---|---|---|
| **Keystatic** *(recommended)* | Clean generated forms | Keystatic Cloud (free ≤3 users) handles GitHub auth; she just logs in | Depends on a third-party hosted auth service (fallback: self-configure a GitHub OAuth App) |
| **Sveltia CMS** | Form-based, good UX, touch-friendly | Own OAuth client deployed as a Cloudflare Worker — nothing rented from a vendor | Pre-1.0 (v1.0 GA slated early 2026 — **confirm it shipped**); ~30 min extra one-time setup |
| **TinaCMS** | Best-in-class: click-to-edit *live on the page* | TinaCloud (free ≤2 users) | Most setup work (wire fields into every component); nicest features ($49/mo) and 2-user cap are real ceilings |

**The fork in the road:** do you value *lowest-friction handoff* (→ **Keystatic**, purpose-built for Astro, Richard sets it up once and never touches it) or *fully self-owned, no vendor dependency* (→ **Sveltia**, everything lives in your own Cloudflare account)?

**Recommendation: Keystatic.** It's built by the Astro-adjacent Thinkmill team specifically for Astro, its generated forms mean Maria never sees raw Markdown/frontmatter, and Keystatic Cloud's free tier removes the OAuth-App-configuration burden entirely. **Sveltia is the strong second pick if avoiding any third-party auth dependency is a priority** — pick it if that instinct is strong, just confirm 1.0 has shipped first. TinaCMS only wins if true live-visual-editing is a must-have for Maria, and it costs the most effort to get there.

> **Plain GitHub web editor** is not the primary workflow for either, but it remains the always-available fallback for quick typo fixes on any of these.

## 3. Hosting — Cloudflare Pages

| | GitHub Pages | Netlify | **Cloudflare Pages** |
|---|---|---|---|
| Free tier | Static only, no functions | 300 build min/mo | 500 build min/mo, **unlimited bandwidth** |
| CMS OAuth worker | Must live *elsewhere* | Functions (but Identity deprecated) | **Same platform** as the site |
| Preview deploys | No | Yes | Yes |

**Cloudflare Pages** because it's the most self-contained pairing: a git-based CMS's OAuth needs a small serverless worker, and Cloudflare lets that worker live alongside the site (and pairs naturally with Cloudflare Web Analytics — see `SEO.md §E`). Netlify's historical advantage was its Identity/Git-Gateway auth shortcut — now deprecated, so that edge is gone. GitHub Pages has no functions, forcing the OAuth worker onto a second platform anyway.

> Note: Cloudflare is folding Pages into "Workers with static assets." Existing Pages projects keep working with no forced-migration deadline; new projects may be steered toward the Workers branding. Non-blocking, but expect the docs to point at Workers.

## 4. Recommended stack (build this)

**Astro + Keystatic (Keystatic Cloud) + Cloudflare Pages.**

Astro Content Collections: `blog`, `news`, `publications` (+ static pages). `@astrojs/rss` generates separate `blog` and `news` feeds. Keystatic schema mirrors the collections so Maria edits via forms. Cloudflare Pages builds on push; Keystatic Cloud handles her login.

**Setup effort:** low–medium, a few hours for Richard, one-time.

## 5. Architecture constraint from SEO (bake in now, don't retrofit)

The publications collection **must render one standalone page per publication** (unique URL each), not a single combined list — Google Scholar requires a separate URL per paper to index it. Model the `publications` collection so each of the 8 papers + 2 posters is its own entry → its own route from day one. See `SEO.md §B`. This is the single most expensive thing to retrofit, so it drives the content-collection design.

## 6. Re-verify before building (moving targets as of 2026-08)

- Sveltia CMS v1.0 GA — has it actually shipped?
- Keystatic Cloud free-tier terms (≤3 users) unchanged?
- TinaCloud free tier still 2 users / paid still $49/mo?
- Cloudflare Pages vs Workers-static-assets — which does current docs steer new projects to?
