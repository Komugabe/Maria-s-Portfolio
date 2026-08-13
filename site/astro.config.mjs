// @ts-check
import { cpSync, existsSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import yaml from '@rollup/plugin-yaml';

// Copy web-optimized assets from the repo's single source of truth (../assets)
// into public/ at build/dev time. The copies are gitignored — /assets stays
// canonical (CLAUDE.md), and the site bundle never ships originals/ (EXIF/GPS).
function bundleAssets() {
  const copies = [
    ['../assets/photos/web', './public/photos'],
    ['../assets/publications', './public/publications'],
    ['../assets/posters', './public/posters'],
  ];
  return {
    name: 'bundle-assets',
    hooks: {
      'astro:config:setup': ({ config, logger }) => {
        for (const [from, to] of copies) {
          const src = new URL(`${from}/`, config.root);
          if (!existsSync(src)) {
            logger.warn(`asset source missing, skipped: ${from}`);
            continue;
          }
          cpSync(src, new URL(`${to}/`, config.root), { recursive: true });
        }
        logger.info('bundled assets/{photos/web,publications,posters} → public/');
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  // Canonical production origin — drives sitemap and canonical/OG absolute URLs.
  // The site is served at this custom domain's root (see public/CNAME); deploying to a
  // project-repo subpath instead would require setting `base`.
  site: 'https://mariakomugabe.com',
  integrations: [bundleAssets(), sitemap(), mdx()],

  // Keep quotes/dashes exactly as written (straight quotes), so Markdown-authored
  // prose matches the rest of the site and edits are WYSIWYG for content authors.
  markdown: { smartypants: false },

  // Let pages import content lists from friendly YAML files in src/data/.
  vite: { plugins: [yaml()] },

  // Self-hosted web fonts (Astro Fonts API — fetched from Google at build time,
  // served from our own origin: no runtime CDN request, auto size-adjust fallbacks).
  // Lubugo type stack: DESIGN-lubugo.md §3.
  fonts: [
    {
      // Display / headings. Variable (weight + optical size).
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      // Body / UI. Italic included for real emphasis in prose.
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      // Coordinates, dates, figure labels, code.
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 500],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      // Section numerals / footer name ONLY (afro-grotesque seasoning). Variable.
      provider: fontProviders.google(),
      name: 'Ojuju',
      cssVariable: '--font-ojuju',
      weights: ['600 800'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],
});
