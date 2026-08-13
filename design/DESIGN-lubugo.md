# Design Direction B — "Lubugo" (Beaten Bark, Measured Land)

Uganda-rooted alternate to the "Field Atlas" direction in `DESIGN.md`. Same information architecture, components, and accessibility rules as DESIGN.md §3, §7–10 — this document replaces only the **visual language** (§1, §4–6). Visual preview: `design/style-tile-lubugo.html`.

## 1. Concept

The site is **barkcloth as an academic surface**: a warm, felted, matte ground carrying precise cartographic ink. Two strands of DNA, both authentically Maria's:

1. **Lubugo** — Buganda barkcloth, a UNESCO-recognized craft made by beating mutuba-tree bark into a russet cloth. It contributes the material palette (bone cream, bark ink, lubugo russet) and a barely-there fibrous texture. Historically, white/cream barkcloth was reserved for royalty — so the site's cream ground is itself a quiet heritage reference.
2. **Ring geometry** — the concentric rings of the Kasubi Tombs dome, the spiral construction of Ugandan coiled baskets, and GIS buffer/contour analysis share one geometry. The site's single motif is an abstracted concentric-ring mark — heritage geometry that *is* her professional geometry, so the metaphor is earned, not decorative.

The grey crowned crane contributes only its discipline — grey + gold + one red move — and one line of narrative: the crane's raised leg symbolizes forward movement.

Design models (researched): Sungi Mlengeya's minimalism (vast cream negative space, unmistakably East African), Zeitz MOCAA (one abstracted material geometry, systematized), Nataal/Afriart (neutral chrome, photography carries all chroma), Flutterwave (one owned motif as pattern + icon), Singita (texture as material, not pattern).

## 2. Color system — a 60/25/10/4/1 proportion rule

| Token | Hex | % of viewport | Role |
|---|---|---|---|
| `--bone` | `#F5EFE4` | ~60 | ground (royal-barkcloth cream; never #FFF) |
| `--bone-raised` | `#EDE4D3` | — | cards, wells |
| `--bark-ink` | `#2B211C` | ~25 | text (muzuukizi black-brown; never #000) |
| `--ink-soft` | `#6B5D52` | — | secondary text |
| `--lubugo` | `#A85C38` | ~10 | primary accent — links, active nav, section numerals, buttons; hover `#8B4A2F` |
| `--lubugo-deep` | `#5C3A2E` | — | dark surfaces, footer band |
| `--matoke` | `#5C7A3B` | ~4 | secondary — tags, success, data-viz #2 |
| `--crane-gold` | `#D9A441` | ~1 | one highlight per view, small (CTA, star, active tick) |
| `--lake` | `#4A6B72` | as needed | cool foil for maps/figures; alt link color |
| `--crane-grey` | `#8C8F8A` | — | hairlines, disabled |
| `--wattle` | `#C0392B` | rare | micro-accent only (focus ring, north-arrow tip) |

Data-viz palette = lubugo / matoke / lake / crane-gold, so even charts carry the identity. Epi figures keep ColorBrewer YlOrRd (per DESIGN.md — red belongs to epidemiology). Contrast: `#2B211C` on `#F5EFE4` ≈ 12:1 (AAA); `--lubugo` as text on bone passes 4.5:1 at `#8B4A2F` — use the hover value for small text.

**Deliberately excluded from chrome:** flag red/yellow/black (reads governmental); saturated wax-print hues (those live in her photographs); kente/mudcloth/Adinkra patterns (Ghana/Mali — wrong countries, the #1 authenticity fail).

Dark mode (later, optional): bark ground `#241B16`, bone text, russet brightened to `#C1764E`; figures matted on bone cards.

## 3. Typography

- **Fraunces** (variable) — display/headings in bark ink. Its warm, slightly wonky old-style echoes hand-made materiality without ethnic costume. (Shared with Direction A — deliberate: content migrates between directions freely.)
- **Ojuju** (Chisaokwu Joboson, Nigeria — Google Fonts) — **one place only**: oversized section numerals (01 02 03) and/or Maria's name in the footer. An African-designed afro-grotesque as seasoning, never as base. If it ever feels loud, drop to Fraunces numerals.
- **Inter** — body/UI, 17–18px, 1.6+ leading, ≤68ch measure.
- **IBM Plex Mono** — coordinates, dates, figure labels, code. The recurring device: `0.3476° N, 32.5825° E`.

## 4. Texture & motif kit (max one heritage motif per viewport)

1. **Barkcloth grain** — SVG turbulence/noise at 3–6% opacity over bone; ~10% over the lubugo-deep footer band. Felt, not seen. Never a photographic barkcloth tile at full strength; never under body text above ~5%.
2. **Concentric-ring mark** — thin, slightly irregular rings with an offset center: logo/avatar backdrop, section divider, loading state — and echoed in real buffer-analysis maps. The Zeitz move: one geometry, systematized.
3. **Stepped-chevron rule** — a single row of basket-weave triangles as a 3px section divider. The only "pattern," one row tall, never tiled 2-D.
4. **Contour lines** — Kigezi terraces ↔ elevation contours: faint russet linework in hero only, ≤8% opacity.
5. **Coordinates** — mono eyebrows and footer stamps (Kampala + Claremont). Note 32° East is literally the name of Kampala's arts trust — coordinates are already Ugandan creative identity.

## 5. Photography treatment (the chroma engine)

Her gomesi/kitenge portraits and field photos supply ALL saturation: display them large and true-color on the calm bone ground (Nataal/Afriart model). Secondary/filler imagery duotoned bark-ink + bone so it never competes. No safari-orange grading, no NGO desaturation — dignified, well-lit, contemporary. Captions in mono; craft references cited once, properly: *"Ground texture derived from lubugo barkcloth, a UNESCO-recognized Buganda craft."* Quiet scholarship reads as authenticity.

## 6. Respect boundaries (researched)

Safe: barkcloth color/texture, abstracted ring geometry, basketry chevron, crane color logic, coordinates, landscape palette. 
Off-limits: Buganda royal regalia and clan totems, Kasubi silhouette as logo, flag stripes, crane illustration as logo (tour-operator cliché), sacred-site photos as decoration, "tribal" display faces (Lithos/Neuland/Papyrus).

## 7. Choosing between A and B

- **Field Atlas (A)** leads with her *profession* (cartography) and whispers Uganda. Safest with US search committees; fits the geo-community look most closely.
- **Lubugo (B)** leads with her *heritage* (material culture) and whispers cartography. Warmer, more personal, more distinctive — closer to how contemporary African institutions (Zeitz, Nataal, Afriart) present themselves.
- They intentionally share Fraunces/Inter/Plex Mono, the same IA, and "neutral chrome + figures carry color," so a hybrid is cheap: e.g., A's layout and motifs on B's lubugo palette. Show Maria both style tiles and let her react.
