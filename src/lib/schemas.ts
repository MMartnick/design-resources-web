import { z } from "zod";

export const TopicSlugSchema = z.enum([
  "game-design",
  "unity-game-dev",
  "graphic-design",
  "adobe-creative-cloud",
  "motion-graphics",
  "publication-design",
  "ui-ux-design",
]);

export const CategorySlugSchema = z.enum(["news", "tutorials", "theory"]);

export const SourceKindSchema = z.enum([
  "official",
  "independent",
  "publication",
  "community",
]);

export const UpdateFrequencySchema = z.enum(["high", "medium", "low"]);

export const FeedTypeSchema = z
  .enum(["rss", "atom", "custom", "manual"])
  .nullable();

export const SourceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  whyFollow: z.string(),
  url: z.string().url(),
  topics: z.array(TopicSlugSchema).min(1),
  categories: z.array(CategorySlugSchema).min(1),
  sourceKind: SourceKindSchema,
  updateFrequency: UpdateFrequencySchema,
  featured: z.boolean(),
  homepageFeedEligible: z.boolean(),
  evergreen: z.boolean(),
  hasFeed: z.boolean(),
  feedType: FeedTypeSchema,
  feedUrl: z.string().url().optional(),
  imageUrl: z.string().optional(),
});

export const FeedItemSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  title: z.string(),
  url: z.string().url(),
  summary: z.string(),
  publishedAt: z.string(),
  imageUrl: z.string().optional(),
  topics: z.array(TopicSlugSchema).min(1),
  categories: z.array(CategorySlugSchema).min(1),
  isFeatured: z.boolean(),
});
