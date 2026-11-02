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
    description: z.string(),
    // Paragraphs shown after the page's generated content (contact links, article list).
    outro: z.array(z.string()).default([]),
  }),
});

// Articles, published under /ecrits/ (the folder keeps its first name).
const idees = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/idees' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, idees };
