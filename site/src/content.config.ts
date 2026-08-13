import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/*
  Content collections (TECH-STACK.md §4). Markdown/MDX lives in src/content/
  and is edited directly (no CMS — content is authored in-repo and edits ship
  via the GitHub Pages build).

  Keep field names stable — they map 1:1 to the citation_* / JSON-LD emitters
  in src/components/.
*/

// Writings (the blog).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(), // build-time card is generated if omitted
  }),
});

// News / announcements feed.
const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    link: z.string().url().optional(), // outbound (press feature, DOI, etc.)
    description: z.string().optional(),
  }),
});

// Publications — ONE PAGE PER ENTRY (Google Scholar requirement, SEO.md §A).
// These fields populate the citation_* meta tags and ScholarlyArticle JSON-LD.
const publications = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()), // "Lastname, Firstname" — one citation_author each
    year: z.number(),
    date: z.coerce.date().optional(), // full date if known → citation_publication_date
    venue: z.string(),
    venueType: z
      .enum(['journal', 'conference', 'chapter', 'presentation', 'poster', 'thesis'])
      .default('journal'),
    volume: z.string().optional(),
    issue: z.string().optional(),
    firstPage: z.string().optional(),
    lastPage: z.string().optional(),
    issn: z.string().optional(),
    isbn: z.string().optional(),
    doi: z.string().optional(), // bare DOI, e.g. "10.1234/abcd"
    pdf: z.string().optional(), // site-absolute path, e.g. "/publications/2024_jgis_...pdf"
    abstract: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// Research threads — one Markdown file per thread (src/content/research/).
// Frontmatter drives the heading/figure/links; the body is the prose.
const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    order: z.number(), // controls position + the 01/02 numeral
    eyebrow: z.string(),
    title: z.string(),
    impact: z.string().optional(), // the highlighted results line
    image: z.string().optional(), // e.g. /photos/name.jpg
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    reserved: z.boolean().default(false), // shows the "Malaria Atlas" placeholder card
    links: z.array(z.object({ text: z.string(), href: z.string() })).default([]),
  }),
});

// Supervised research — a single YAML data file grouped by degree level.
const supervised = defineCollection({
  loader: file('./src/data/supervised.yaml'),
  schema: z.object({
    order: z.number(),
    level: z.string(),
    place: z.string(),
    students: z.array(z.object({ name: z.string(), when: z.string(), topic: z.string() })),
  }),
});

// Prose blocks for individual pages (e.g. the About bio, teaching philosophy).
// One Markdown file each in src/content/pages/; the body is the prose.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({ title: z.string().optional() }),
});

export const collections = { blog, news, publications, research, supervised, pages };
