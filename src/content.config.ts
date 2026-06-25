import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
  }),
});

const letters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/letters' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { pages, letters };
