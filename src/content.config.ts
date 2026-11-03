// Content collections. Drop Markdown files in:
//   src/content/pages/<lang>/<page>.md   one file per fixed page (accueil, parcours, ...)
//   src/content/idees/<lang>/<slug>.md   one file per article
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    // Paragraphs shown after the page's generated content (contact links, article list).
    outro: z.array(z.string()).default([]),
    // Home page only: the sentence that introduces the five notes and the one-line door to Parcours.
    fight: z.string().optional(),
    parcours: z.object({ before: z.string(), link: z.string(), after: z.string() }).optional(),
  }),
});

// Notes and articles, published under /idees/<slug>/. The same file name in fr/ and en/ is the same text
// in two languages (the permalink can differ per language; `slug` is reserved by Astro's loader); a note (kind: note) is one of the position notes
// listed on the Idées hub in `order`; an article is dated and listed by date.
const idees = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/idees' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    kind: z.enum(['note', 'article']).default('article'),
    tag: z.string().optional(),
    permalink: z.string().optional(),
    anchor: z.string().optional(),
    order: z.number().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, idees };
