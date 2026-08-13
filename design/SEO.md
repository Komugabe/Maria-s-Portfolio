# Academic SEO & Discoverability — Build Requirements

How this site actually gets found by search committees, collaborators, and Google Scholar, and how it produces good link previews when Maria shares papers on LinkedIn. Researched 2026-08. These are implementable requirements, not theory — hand them to the build session on day one; retrofitting is more expensive than doing it up front.

## The one architectural rule

**Every publication + poster gets its own standalone HTML page at a unique URL.** Google Scholar's inclusion rules require "each article... in a separate HTML or PDF file with a unique URL." A single combined publications list page cannot be indexed per-paper. This drives the Astro `publications` content-collection design (see `TECH-STACK.md §5`). All the citation metadata below is *per-page*.

---

## A. Citation meta tags — the biggest lever (per publication page)

This is the highest-ROI item for a scholar's site — more impactful than schema.org. Google Scholar crawls personal sites via Highwire `citation_*` `<meta>` tags. Add to each publication page's `<head>`:

**Required:**
- `citation_title`
- `citation_author` — **one tag per author**, format `"Lastname, Firstname"` (not the deprecated plural `citation_authors`)
- `citation_publication_date` — `YYYY/MM/DD` or `YYYY`

**Strongly recommended:**
- `citation_journal_title` *or* `citation_conference_title`
- `citation_volume`, `citation_issue`, `citation_firstpage`, `citation_lastpage`
- `citation_issn` / `citation_isbn`
- **`citation_pdf_url`** — required whenever the abstract page and PDF are different URLs (our case: PDFs live in `assets/publications/`). This is what lets Scholar attach the free full-text PDF to *our* copy — valuable when the publisher version is paywalled.

**Gotchas:**
- Use **only** the `citation_*` scheme. Do **not** also add Dublin Core (`DC.*`) tags — Scholar says DC works poorly for journal papers, and mixing schemes causes ambiguity.
- HTML-entity-escape special characters in tag content.
- Keep `citation_*` values consistent with the `ScholarlyArticle` JSON-LD on the same page (same date, same author spelling) — data hygiene.
- For the DESRIST 2025 book chapter, use `citation_isbn` + `citation_inbook_title` semantics rather than journal fields.

Realistic benefit: Scholar documents crawling personal/lab sites this way and typically indexes within several weeks. Each correctly-tagged page becomes its own citation record.

## B. Structured data (JSON-LD) — cheap, correct, slow-burn

Implement because it's cheap and aids entity disambiguation / AI-answer citation over time — but **set expectations honestly**: plain `Person`/`ScholarlyArticle` produce *no visible search badge* on their own, and a Knowledge Panel requires independent entity authority (Wikidata, media coverage) that structured data alone won't trigger for an early-career researcher.

- **About/home page:** `ProfilePage` wrapping a `Person` (this is the one type Google documents rich support for). Include `name`, `alternateName` (the publication name variants), `jobTitle`, `affiliation` (CGU), `alumniOf`, `identifier` = full ORCID URI, and `sameAs` → [Scholar, ORCID, LinkedIn, GitHub]. Set `dateModified`.
- **Each publication page:** `ScholarlyArticle` with `author` (each a `Person`, ideally with ORCID `identifier`), `name`, `datePublished`, `isPartOf` (the venue), `identifier`/`sameAs` = the DOI, `url` = the page.
- `sameAs` is the correct mechanism for cross-linking her scholarly profiles; ORCID is the canonical `identifier`.

## C. OpenGraph / social cards (every page)

For good previews on LinkedIn, X, Slack, iMessage:

```html
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:url" content="https://mariakomugabe.com/…" />
<meta property="og:type" content="website" />        <!-- "profile" on About; "article" on publications/posts -->
<meta property="og:image" content="https://…/og/….png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://…/og/….png" />
```

- **Publications & blog posts additionally:** `og:type="article"`, `article:published_time` (ISO 8601), `article:author`, optional `article:section` (e.g. "Malaria Prediction").
- **OG image: 1200×630** — the one size that works across LinkedIn (1.91:1), Slack, Discord, X. Always ship the width/height tags (LinkedIn pre-sizes from them).
- **Generate OG images at build time.** With only ~10 publications, `astro-og-canvas` (simple templated title/venue/author cards) or Satori/`@vercel/og` (more design control). Script it once — don't hand-design a dozen images. A per-publication card showing title + venue + author is the day-one bar.
- **LinkedIn caches aggressively:** after any og:image change on an already-shared URL, bust the cache via [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). Ship 1200×630 from the start to avoid ever needing to. X's card validator is dead — preview by composing a draft post.

## D. Sitemap, indexing, canonical

- **sitemap.xml** — Astro's sitemap integration auto-generates it; include only clean canonical URLs (no drafts/noindex). One flat sitemap is plenty at this scale.
- **robots.txt** — reference the sitemap (`Sitemap: https://…/sitemap.xml`). Don't blanket-block AI crawlers (GPTBot, ClaudeBot, Google-Extended) unless there's a reason — AI-answer visibility matters.
- **Submit manually** to Google Search Console (auto-discovery doesn't populate the Sitemaps report) and Bing Webmaster Tools (~10 min, feeds Bing/Copilot/DuckDuckGo).
- **Canonical:** each publication page is **self-canonical** (`rel="canonical"` → itself). Our pages are abstract + metadata + link-out to PDF/DOI — legitimately distinct content, not a byte-duplicate of the publisher version. Keep DOI/publisher links clearly outbound so search engines see the relationship, not a competing duplicate. Do **not** point personal-site canonicals at the DOI unless we host a full HTML duplicate of the published text (we don't).

## E. Privacy-friendly analytics

All viable options are cookieless by default → **no consent banner needed** (consent is triggered by cookies/personal data, not aggregate counting).

- **Recommended: GoatCounter** — free hosted tier, single `<script>` tag, zero maintenance, no meaningful pageview cap for this traffic. Ideal for "are search committees visiting?"
- **Cloudflare Web Analytics** — zero-effort if we host on Cloudflare Pages anyway (we do — see `TECH-STACK.md §3`). Strong default for that reason.
- **Plausible** ($9/mo hosted, free self-host) — pick if Richard wants a more polished dashboard.

## F. Prioritized checklist

**Day one (must-have):**
1. One standalone page + unique URL per publication/poster.
2. Full `citation_*` tag block per publication page, incl. `citation_pdf_url`.
3. No `DC.*` tags anywhere.
4. Base OG + Twitter tags site-wide; `article:*` on publications/posts.
5. Build-time 1200×630 OG image per page (scripted).
6. Auto-generated `sitemap.xml` + `robots.txt`; submit to Google Search Console + Bing.
7. Self-canonical publication pages with outbound DOI links.
8. `ProfilePage`/`Person` JSON-LD (home/About) + `ScholarlyArticle` JSON-LD (each publication).
9. ORCID shown as full hyperlinked `https://orcid.org/xxxx-xxxx-xxxx-xxxx` URI.
10. Privacy analytics (GoatCounter or Cloudflare Web Analytics).

**Nice-to-have:**
11. Post-Inspector check after OG image changes.
12. `article:section` topic tags.
13. `Chapter`/`Book` schema for the DESRIST 2025 chapter specifically.
14. Revisit Knowledge-Panel/entity-authority expectations after 6–12 months — slow build, not a launch win.

## Content gaps to resolve before implementing

- Maria's canonical **ORCID URL** (resolve the discrepancy flagged in `content/links-and-press.md`), **LinkedIn URL**, **GitHub URL** — needed for `sameAs` and the ORCID display.
- Exact **DOIs, venues, volume/issue/pages** per publication (should be in `content/publications.md`) to populate `citation_*` accurately.
