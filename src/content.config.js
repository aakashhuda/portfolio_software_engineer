import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // shown on the card
    date: z.coerce.date(),

    tags: z.array(z.string()).default([]),
    role: z.string().optional(),
    status: z
      .enum(['completed', 'in-progress', 'archived'])
      .default('completed'),
    featured: z.boolean().default(false),

    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),

    // Details-page-only screenshot gallery. Never used on the card.
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
      )
      .default([]),

    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // shown on the blog list page
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
