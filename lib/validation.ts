import { z } from "zod";

/**
 * Form schemas, shared between the client component and the API route.
 *
 * The same object validates on both sides on purpose: client-side validation is
 * a convenience for the visitor and nothing more, and re-validating on the
 * server with a *different* schema is how the two quietly diverge.
 */

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  services: z.array(z.string().max(120)).max(10).default([]),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  sourcePage: z.string().max(200).optional().or(z.literal("")),
  /*
    Honeypot. A real visitor never sees this field, so anything in it is a bot.
    Named `website` because that is what the crawlers autofill most readily.
  */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(200),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const postSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(3, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and hyphens only"),
  excerpt: z.string().trim().max(400).default(""),
  content: z.string().default(""),
  category: z.string().trim().max(80).default("Insights"),
  author: z.string().trim().max(120).default("ADAS Globus"),
  cover_url: z.string().trim().url().max(500).nullable().or(z.literal("")),
  cover_alt: z.string().trim().max(200).nullable().or(z.literal("")),
  meta_title: z.string().trim().max(200).nullable().or(z.literal("")),
  meta_description: z.string().trim().max(320).nullable().or(z.literal("")),
  is_featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});
