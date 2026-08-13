# Design Language — mariakomugabe.com

Research-backed design spec for Maria's portfolio site. Companion to `CLAUDE.md` (project brief) and `content/` (all copy/source material). A visual preview of this spec is in `design/style-tile.html`.

## 1. Concept: "Field Atlas"

The site is designed like a plate from a beautifully printed regional atlas of the East African highlands — warm paper, ink, terrain tints, and survey-instrument details (coordinates, neatlines, scale bars). The chrome stays quiet and earthy so Maria's actual maps and figures are always the most colorful thing on the page.

Why this direction: it's unmistakably cartographic (recognizable to the NACIS/FOSS4G/GIS community), warm and personal (the palette *is* the Ugandan landscape — laterite-red roads, crane-gold, highland green — without ever using flag stripes), and restrained enough to read as a serious academic site to hiring committees. Two alternate directions are summarized in §10.

**Identity line (hero, first person):** something in the register of:
> "I use AI and spatial data science to map malaria and move medicine where it's needed."

followed immediately by credentials: *Ph.D. Information Systems & Technology (CGU '26) · Lecturer, CSU San Bernardino · Research Fellow, CGU CIST.*

## 2. Audiences and what each must find in 5 seconds

1. **Faculty search committees / recruiters** — headshot, identity line, CV one click away (PDF + web), publications with open PDFs, active news feed.
2. **The geo community** — actual maps above the fold, tool-stack honesty (ArcGIS Pro, Python, R), a named blog, GitHub/ORCID/Scholar icon row.
3. **Collaborators / press / NGO partners** — plain-language research summaries, announcements, contact.

## 3. Information architecture

Six top-level items (community norm is 4–7, flat):

```
Home        hero (identity line + headshot + a real map) → Recent updates (4–6 news
            items) → Selected publications (3–5) → icon row (email · Scholar · ORCID ·
            GitHub · LinkedIn · CV PDF)
Research    2–4 themed areas (Malaria Mapping & Supply Optimization · GeoAI & Methods ·
            Maternal & Public Health Analytics · Computing Education / Musizi
            partnership). Ongoing vs. completed clearly distinguished. Impact-first
            framing, field photos, collaborators named.
Publications full list from content/publications.md — see §8 spec
Teaching    courses, evaluation highlights (4.86/6.00, 4.97/6.00), philosophy
            paragraph, IST 371 course-design story
Field Notes the blog (see §9)
About       journey narrative (Uganda → US arc), honors & press, photo gallery,
            contact; name-pronunciation note for "Komugabe"
```

News lives as a homepage feed + full `/news` archive (linked from the feed, not the nav). News ≠ blog: news items are 1–2 dated sentences with links; blog posts are essays.

## 4. Color system

All values anchored in citable cartographic sources (ColorBrewer, CARTOColors "Fall"/"Earth", Wikipedia topo conventions) — mention the provenance in a site colophon; in this community, palette pedigree is a credential.

### Chrome (CSS custom properties)

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FAF6EB` | page background (warm paper, not white) |
| `--paper-raised` | `#F4EDDA` | cards, wells, code blocks |
| `--ink` | `#2E4034` | body text, headings (deep highland green, ~11:1 on paper) |
| `--ink-soft` | `#5C6B5E` | secondary text, captions |
| `--terracotta` | `#CA562C` | **the one true accent** — active nav, buttons, key highlights (large elements only) |
| `--terracotta-text` | `#A84424` | accent used as text/links on paper (4.5:1-safe) |
| `--ochre` | `#E3B23C` | secondary accent — tags, highlights, crane-crest gold (never as text) |
| `--ochre-text` | `#8A6A1C` | ochre for text uses |
| `--sage` | `#778868` | borders, muted fills, legend swatches |
| `--sand` | `#EDBB8A` | subtle fills, hover washes |
| `--crane-grey` | `#9CA69C` | hairlines, disabled states (grey crowned crane) |
| `--victoria` | `#2887A1` | hyperlinks (Lake Victoria blue); hover `#0978AB` |
| `--contour` | `#C9B99B` | contour-line texture strokes (5–8% opacity use) |
| `--crimson` | `#A62A22` | rare micro-accent (north-arrow tip, focus ring) — the crane's wattle |

### Data ramps (figures/charts only — never UI)

- Risk/incidence: ColorBrewer **YlOrRd** `#FFFFB2 #FED976 #FEB24C #FD8D3C #F03B20 #BD0026` (the vernacular of malaria surveillance maps)
- Trend/diverging: CARTO **Fall** `#3d5941 #778868 #b5b991 #f6edbd #edbb8a #de8a5a #ca562c`
- Sequential alt: ColorBrewer **YlGnBu**; categorical: CARTO **Safe** (colorblind-safe)

**Rules:** saturated red belongs to epidemiology, never to large UI surfaces. No rainbow/jet, no RdYlGn. The Uganda nod is landscape + crane (terracotta/ochre/grey/crimson at instrument scale) — never flag stripes or the flag trio at equal weight.

## 5. Typography

Google Fonts, three roles + one flourish:

- **Fraunces** (variable) — display/headings. Warm old-style; reads "19th-century atlas plate" at display sizes, scholarly at text sizes. Weights 400–700, optical sizing on.
- **Inter** — body and UI. Clean workhorse; 16–18px body, 1.6–1.7 line height, ~68ch measure.
- **JetBrains Mono** — every number, coordinate, date, tag, and code snippet. Tabular figures.
- **EB Garamond Italic** — pull-quotes and figure captions only (the cartographic "water label" convention: italic serif = hydrography).

Cartographic label conventions as site-wide rules:

- Section eyebrows: letterspaced uppercase (map convention: spaced caps = region names), in mono with a coordinate or plate number, e.g. `PLATE 03 — 0.3476° N, 32.5825° E`.
- Sans for UI/nav (cultural features), serif for content headings (natural features), italic serif for captions (water).

## 6. Motif kit (max 3 per view, all at "survey instrument" scale)

1. **Neatline** — thin double-rule border framing the page or major cards (atlas-plate convention).
2. **Contour linework** — inline SVG topo texture in `--contour` at 5–8% opacity; hero + footer only. Animate draw-on-load only behind `prefers-reduced-motion`.
3. **Coordinates as typographic detail** — mono eyebrows, footer location stamp (`Claremont, CA — 34.0967° N, 117.7198° W` / `Kampala — 0.3476° N, 32.5825° E`).
4. **Scale-bar dividers** — alternating filled/empty bar segments as section rules; also works as the CV timeline (`2015 ——— 2026`).
5. **Legend-style UI** — skills/tools/tags as swatch+label legend rows; category filters as legend chips (always swatch *and* label, never hue alone).
6. **Plate cards** — projects/publications as numbered atlas plates: plate no. top-right, title, then marginalia-style metadata (role · data · year · venue).
7. **Inset locator maps** — tiny Uganda/California outline thumbnails on project cards marking the study area.
8. **Graticule ticks** — edge tick marks on section boundaries; "+" crosses at grid intersections, sparingly.
9. **North arrow / declination mark** — personal logo mark and back-to-top button; crimson tip.
10. **Hypsometric band** — the green→tan→cream terrain ramp as a thin hero underline or footer horizon.

## 7. Components

- **Header:** wordmark ("Maria Komugabe, Ph.D." in Fraunces) + 6-item nav + CV button (terracotta, PDF). Sticky, paper background, hairline bottom border.
- **Hero:** identity line (Fraunces, ~clamp 2.2–3.5rem) over faint contour texture; headshot (`assets/photos/web/maria-komugabe-headshot.jpg`); one of her actual Uganda choropleths as the hero figure, matted on a neatlined card with an italic-serif caption and mono source line.
- **News feed:** dated mono stamps (`2026-06-03`) + 1–2 sentence entries with links. Seed at launch: Ph.D. conferral/banner bearer, JGIS 2026 paper, Influential Women feature, DESRIST chapter, Capstone 2026 presentation.
- **Publication entry:** see §8.
- **Photo gallery:** masonry of `assets/photos/web/*` grouped per `content/photos.md` themes; captions from the manifest.
- **Footer:** icon row, location stamps, a small self-referential **map legend explaining the site's own color coding** (delightful to geo reviewers), colophon line citing palette/type provenance, and the north-arrow mark.

## 8. Publications display spec

Drive from structured data (BibTeX or a YAML/JSON derived from `content/publications.md` — one source of truth).

Each entry: title (serif) · authors with **Komugabe bolded** in all her name variants · venue + year (mono) · one plain-language sentence (drawn from the abstracts already in `content/publications.md`) · button row `[PDF] [DOI] [Code]` — every paper already has a local PDF in `assets/publications/`, so every entry gets an open-access path. Flag honors/status inline. Group thematically (Malaria & Health Geospatial / Education & Computing / Public Health) with a short context paragraph per group, plus a "selected" flag for the 3–5 homepage picks. Add small map-figure thumbnails where available — in this field, outputs are visual.

## 9. Blog: "Field Notes"

Named blogs are a geo-community institution ("Adventures in Mapping", "Free and Open Source GIS Ramblings", "Cartonerd"). **"Field Notes"** is modest, on-theme, and true to her work's field component (Richard/Maria may rename — keep it humble and personable).

Content pattern that earns community membership: *process essays* — "How we mapped ACT/RDT mismatches from 260 weeks of surveillance data", "What Ugandan classrooms taught me about teaching Python" — 4–6 posts/year is plenty. Listing page with tags; posts support embedded figures/maps; RSS on. News announcements stay out of the blog.

## 10. Accessibility & dark mode

- WCAG 2.2 AA minimum: 4.5:1 body text, 3:1 large text and UI graphics. The pairs above are pre-checked: use `--terracotta-text`/`--ochre-text` for any accent-colored text; `--ochre`/`--sand` never carry text.
- Never run text over contour texture above ~8% opacity; text sits on solid paper panels.
- Colorblind-safe: CARTO Safe for categorical UI; YlOrRd/YlGnBu are CVD-tolerable; legend chips always swatch+label.
- Motion (contour draw, map pans) behind `prefers-reduced-motion`; no autoplay.
- **Default light.** Academic figures are white-background; if dark mode is offered later, use warm-dark `#14161A` ground and mat all figures on paper cards ("plates pinned to a dark board"). Don't ship dark mode at launch — it's polish, not core.

## 11. Alternate directions (researched, not chosen)

- **"Quadrangle"** — USGS survey-sheet heritage: paper `#F5F4F2`, warm-black ink `#26221B`, sepia contour brown `#8C6239`, hydro-blue links `#0978AB`; Gelasio (the US Topo serif, Georgia-metric) + Public Sans + IBM Plex Mono. Safest/most austere; swap-in path if Field Atlas feels too warm.
- **"Surveillance Grid"** — dark epi-dashboard: warm-dark `#14161A`, paper-white text, YlOrRd micro-ramp accents, Space Grotesk + Inter. Reads "startup dashboard"; use only as a future dark mode or for an interactive-demo subsection.

## 12. Benchmarks (what "fitting in" means)

Structure models: **Jakub Nowosad / Robin Lovelace** (academic skeleton: Posts · Publications · Software · Talks), **Paula Moraga** (geohealth: software + live demo "Dengue tracker" in nav — the model for a future named artifact of Maria's), **Peter Macharia** (African global-health researcher; "My journey" narrative page — emulate, but add the maps his site lacks), **OJ Watson** (lean early-career malaria site with CV-PDF in nav). Visual/portfolio models: **Andy Woodruff / Topi Tjukanov** (map-thumbnail grids, neutral chrome), **Joshua Stevens** (5-item nav, logo wall, evocative subtitles), **Anita Graser** (research theme as nav item + named blog). Full research citations live in the agents' reports; key sources: ColorBrewer, CARTOColors, Wikipedia topo conventions, BellTopo Sans / USGS type history (Guidero ICC 2013), Axis Maps labeling guide, The Academic Designer 2025 site-contest criteria, al-folio/Hugo Academic/Quarto conventions.

## 13. Implementation notes for Claude Code

- **Framework decided: Astro** (Quarto rejected — it can't pair with a git-based CMS for Maria's self-publishing, and fights bespoke design). Stack, CMS choice, and hosting are settled in `design/TECH-STACK.md`; discoverability/SEO build requirements in `design/SEO.md`. Content-collection-driven publications/news/blog from the existing markdown. Keep site code in `site/`.
- Serve images only from `assets/photos/web/`; hero figures can be exported from her poster/paper PDFs (crop maps from `assets/posters/*.pdf` at 150dpi).
- Fonts via Google Fonts (`Fraunces:opsz,wght@9..144,400..700`, `Inter`, `JetBrains Mono`, `EB Garamond:ital@1`) with `font-display: swap`.
- Build the tokens in §4 as CSS custom properties from day one; the style tile (`design/style-tile.html`) is the visual reference implementation.
