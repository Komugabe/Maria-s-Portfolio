# Site Structure — mariakomugabe.com

Defines the full sitemap and page-by-page content plan, derived from (a) an 11-site structural audit of peers in geospatial data science / spatial epidemiology / global health, and (b) Maria's actual resources in `content/` and `assets/`. Companion to `CLAUDE.md`, `DESIGN.md` (Direction A), `design/DESIGN-lubugo.md` (Direction B) — this document is direction-agnostic and binding for either.

## 1. What the community actually does (audit summary)

Sites audited: Paula Moraga (geohealth, KAUST — has a live "Dengue tracker" in her nav), Peter Macharia (Kenyan spatial epidemiologist — "My journey" story page), Jakub Nowosad (best-practice publications/talks pages), Robin Lovelace (publications as sortable table), Kyle Walker (consulting hybrid), OJ Watson (malaria modeller — the closest early-career template), Anita Graser (blog-first), Marta Blangiardo (minimal senior site), Michelle Stuhlmacher (recently-hired assistant professor), Ujaval Gandhi (geo education), Henry Spatial Analysis (Uganda TB/HIV case studies).

Frequency of sections across the 11 sites: bio+photo homepage 11/11 · software/projects 9/11 · publications list 8/11 · teaching 7/11 · Google Scholar link 7/11 · blog 6/11 · talks page 5/11 · **CV-PDF in nav 2/11 — but 2/2 of the early-career job-market sites** · news feed ~0/11 · personal-story page 1/11 (Macharia).

The proven early-career formula (Watson + Stuhlmacher converge on it): photo + one-line role → icon row (email/Scholar/ORCID/GitHub/LinkedIn) → short bio ending in a mission sentence → interests + education block → 4–6 total pages → **CV PDF in the nav**. Seniors drop the CV and add books/teams/opportunities — the architecture below is built so pages can graduate into that pattern later.

Features stolen deliberately: research as narrative impact stories, not lists (Watson); per-publication link chips `[PDF] [DOI] [Code] [Poster]` (Nowosad); a live dashboard as a nav-level destination, later (Moraga's Dengue tracker; Henry's Uganda TB case studies); a journey narrative + press page (Macharia — whose unlinked flat pub list is also our anti-pattern); last-updated stamp (Stuhlmacher).

Two deviations from community norms, both deliberate (Richard's requirements): a **news/announcements feed** (rare among peers, but Maria has an unusually strong announcement stream — press features, conferral, new papers — and it's the strongest "active scholar" signal for recruiters) and a **blog at launch** (titled **Writings** — renamed from the original "Field Notes" for clarity), designed low-maintenance so it never looks abandoned.

## 2. Sitemap

```
/                       Home
/research/              Research overview (4 themed narratives)
/research/<theme>/      Optional deep-dive pages (phase 2)
/publications/          All publications, posters, dissertation
/teaching/              Courses, evaluations, mentorship
/writings/              Blog index ("Writings")
/writings/<slug>/       Posts
/about/                 Journey narrative, honors & press, gallery, contact
/news/                  Announcement archive (fed from homepage feed)
/cv/                    HTML CV + prominent PDF download
/cv.pdf                 The PDF itself (also linked directly from nav button)
404                     On-theme ("off the map") + nav links
```

Nav (6 items + button): **Home · Research · Publications · Teaching · Writings · About · [CV ↓]**. News archive and /cv/ page are linked contextually, not in the nav.

## 3. Page-by-page content plan (every element sourced from the repo)

### Home
1. **Hero** — identity line + credentials (copy: `DESIGN.md §1`); headshot `assets/photos/web/maria-komugabe-headshot.jpg`; one real map figure cropped from `assets/posters/2024_jhu-malaria-research-poster.pdf` as the hero "plate."
2. **Icon row** — email, Google Scholar, ORCID, GitHub, LinkedIn (URLs in `content/links-and-press.md`; resolve the ORCID discrepancy flagged there before launch).
3. **Recent updates** (5 items, link to /news/): seed from `content/links-and-press.md` + `content/publications.md` — JGIS paper (2026-06-03), Ph.D. conferral/banner bearer (2026-05-16), Influential Women feature, EAJES paper (2026-01), DESRIST chapter.
4. **Selected publications** (3): JGIS 2024 (the R² 0.88 paper), JGIS 2026 (commodity mismatches), DESRIST 2025 — entries per `DESIGN.md §8`.
5. **Research teaser row** — the 4 themes below, one line each.
6. Footer with last-updated stamp.

### Research — 4 themed narratives (Watson model: context → methods → findings → impact, each with a map/photo)
1. **Malaria Mapping & Supply Optimization** (flagship): dissertation + PP1 + pp2 + pp5 + both posters. Figures from `assets/posters/`; photos `2024-11-08_jhu-malaria-symposium-poster-1.jpg`, `2025-05-05_dissertation-proposal-defense.jpg`. Impact line: Random Forest R² 0.88; 260 weeks surveillance data; the "mismatch contradiction" finding; CGU Transdisciplinary Research Grant. **Reserve a card slot for a future live "Malaria Atlas — Uganda" dashboard** (Moraga's Dengue-tracker move — the one feature that would most distinguish her).
2. **GeoAI & Geospatial Deep Learning**: IST 371 course development, generative-GeoAI doctoral supervision (`content/resume.md`), Research Fellow agenda. Photos: `2025-10-24_classroom-presentation-1.jpg`.
3. **Maternal & Public Health Analytics**: DESRIST LBW chapter + pp4 mental-health paper. Figure from `assets/publications/2025_desrist_low-birth-weight-geospatial-tools.pdf`.
4. **Computing Education & the Uganda Partnership**: HMC Clinic–Musizi (Cp1, 11 courses, 3 teams, Capstone 2026), pp3 + pp6 education papers, HMC Clinic project pages (`content/links-and-press.md`). Photos: `2024-04-30_hmc-poster-session.jpg`, `2025-05-06_hmc-ai-track-musizi-poster.jpg`, `2024-01-02_uganda-equator-landmark.jpg`.

### Publications
Single page, grouped exactly as `content/publications.md`: Journal Articles (6) → Conference Proceedings (2) → Presentations (1) → Posters (2) → Dissertation → Public Writing (Nile Post op-ed). Every entry with Nowosad-style chips — `[PDF]` (all 8 papers have local PDFs in `assets/publications/`), `[DOI]`, `[Poster]` where applicable. Komugabe bolded in all four name variants (`CLAUDE.md`). Scholar + ORCID links at top. Build from one structured data file derived from `content/publications.md` (Lovelace's low-maintenance pattern).

### Teaching
Courses by institution (CSUSB, Kisubi, IST 371 development — `content/resume.md`); evaluation stats 4.86/6.00 and 4.97/6.00 with response rate; teaching-philosophy paragraph (student-feedback themes in `resume.md`); mentorship block (doctoral supervision, HMC Clinic teams, Kisubi capstones); Kisubi Award of Appreciation photo `2023_kisubi-award-of-appreciation.png`.

### Writings (blog)
Per `DESIGN.md §9`: index with tags + RSS; process essays 4–6×/year. Launch with 2 seed posts so it never looks empty — candidates: "How we mapped Uganda's malaria commodity mismatches" (from pp2's methods) and a Musizi partnership reflection. Repurpose the Nile Post op-ed as a linked "elsewhere" entry.

### About
Macharia-style **journey narrative** (teacher in Uganda → Kisubi lecturer → CGU Ph.D. → banner bearer — arc already drafted in the conversation summary and `content/about.md`); **Honors & Press** subsection (`content/links-and-press.md`: Influential Women/Columbus Dispatch, HMC Magazine, UPE, commencement); **photo gallery** from `content/photos.md` themes (Milestones, Uganda & community, Conferences); name-pronunciation note; contact.

### News archive
Dated one-liners, grouped by year; grows over time; each item links out (DOI, press, program PDF). Sources: every dated event in `content/links-and-press.md` + future items.

### CV
HTML version generated from `content/resume.md` + PDF export of `Documents/RESUME.docx` at `/cv.pdf`. Nav button points at the PDF (Watson/Stuhlmacher pattern); /cv/ page carries both.

## 4. Content gaps to collect from Maria (blocking or enriching)

- Confirm canonical **ORCID** (two IDs found — flag in `content/links-and-press.md`)
- **GitHub / LinkedIn URLs** (not in any shared doc)
- Preferred **CV PDF** export (or approve generating from RESUME.docx)
- 2–3 **map figures** as standalone images (or approve extracting from her posters/papers)
- **Health Tech Asia 2024** slides/photos, if any (talks content is thin)
- Name **pronunciation** (text or a 3-second audio clip)
- Blessing on the two seed **Writings** topics; any essay drafts she has
- Any **code/data repositories** to justify a future Software section (none shared yet — omit the section until it exists rather than ship it empty)

## 5. Phasing

- **Phase 1 (launch/MVP):** all of §3 except research deep-dive subpages; publications from structured data; 2 seed posts; news seeded with 5 items.
- **Phase 2:** research theme subpages; talks section if material arrives; Software/Data page when repos exist.
- **Phase 3 (the differentiator):** live "Malaria Atlas — Uganda" dashboard as a nav-level item; possible "Opportunities/Team" page as her supervision grows (graduating to the senior-site pattern).
