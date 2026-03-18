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

/** Badge indicating what kind of free access a source provides */
export type ContentAccessLabel =
  | "Free"
  | "Free Articles"
  | "Free Docs"
  | "Free Videos"
  | "Free Tutorials"
  | "Free Reports";

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
  /** Curator's personal note on why this source matters */
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
  /** Per-source visibility controls */
  enabled: boolean;
  feedEnabled: boolean;
  excerptEnabled: boolean;
  /** Free-access label shown on the source card */
  contentAccess: ContentAccessLabel;
}

// ─── Feed Item ─────────────────────────────────────────────────────────────────

export interface FeedItem {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  /** Very short excerpt — discovery purposes only */
  summary: string;
  publishedAt: string; // ISO date string
  topics: TopicSlug[];
  categories: CategorySlug[];
  isFeatured: boolean;
}
