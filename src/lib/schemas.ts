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

export const ContentAccessLabelSchema = z.enum([
  "Free",
  "Free Articles",
  "Free Docs",
  "Free Videos",
  "Free Tutorials",
  "Free Reports",
]);

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
  enabled: z.boolean(),
  feedEnabled: z.boolean(),
  excerptEnabled: z.boolean(),
  contentAccess: ContentAccessLabelSchema,
  curatorNote: z.string().optional(),
});

export const FeedItemSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  title: z.string(),
  url: z.string().url(),
  summary: z.string(),
  publishedAt: z.string(),
  topics: z.array(TopicSlugSchema).min(1),
  categories: z.array(CategorySlugSchema).min(1),
  isFeatured: z.boolean(),
});
