import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Strict objects so a misspelled key fails the build instead of silently
// dropping a section from the page
const bulletSection = z.strictObject({
  heading: z.string(),
  points: z.array(z.string()).min(1),
});

const linkPoint = z.strictObject({
  text: z.string(),
  href: z.url(),
  label: z.string(),
});

// Case studies on /work, one YAML file per case study; the file name is the
// entry id and the section's anchor (/work#travel-chatbot)
const work = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/case-studies" }),
  schema: z.strictObject({
    // Position on /work, ascending
    order: z.number().int(),
    title: z.string(),
    challenge: bulletSection,
    solution: bulletSection,
    roadmap: z
      .strictObject({
        heading: z.string(),
        items: z
          .array(z.strictObject({ title: z.string(), description: z.string() }))
          .min(1),
      })
      .optional(),
    approach: bulletSection.optional(),
    insight: bulletSection.optional(),
    outcome: bulletSection
      .extend({ points: z.array(z.union([z.string(), linkPoint])).min(1) })
      .optional(),
  }),
});

export const collections = { work };
