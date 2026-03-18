// ─── Core Types ────────────────────────────────────────────────────────────────

export type TopicSlug =
  | "game-design"
  | "unity-game-dev"
  | "graphic-design"
  | "adobe-creative-cloud"
  | "motion-graphics"
  | "publication-design"
  | "ui-ux-design";

export type CategorySlug = "news" | "tutorials" | "theory";

export type SourceKind =
  | "official"
  | "independent"
  | "publication"
  | "community";

export type UpdateFrequency = "high" | "medium" | "low";

export type FeedType = "rss" | "atom" | "custom" | "manual" | null;

// ─── Topic ─────────────────────────────────────────────────────────────────────

export interface Topic {
  slug: TopicSlug;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color token
}

// ─── Category ──────────────────────────────────────────────────────────────────

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

// ─── Source ────────────────────────────────────────────────────────────────────

export interface Source {
  id: string;
  slug: string;
  name: string;
  description: string;
  whyFollow: string;
  url: string;
  topics: TopicSlug[];
  categories: CategorySlug[];
  sourceKind: SourceKind;
  updateFrequency: UpdateFrequency;
  featured: boolean;
  homepageFeedEligible: boolean;
  evergreen: boolean;
  hasFeed: boolean;
  feedType: FeedType;
  feedUrl?: string;
  imageUrl?: string;
}

// ─── Feed Item ─────────────────────────────────────────────────────────────────

export interface FeedItem {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  summary: string;
  publishedAt: string; // ISO date string
  imageUrl?: string;
  topics: TopicSlug[];
  categories: CategorySlug[];
  isFeatured: boolean;
}
