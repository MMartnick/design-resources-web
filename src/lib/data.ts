/**
 * Data access layer — queries over seed data.
 *
 * When migrating to a real database (Supabase/Prisma), swap these
 * implementations while keeping the same signatures.
 */

import { sources } from "@/data/sources";
import { feedItems } from "@/data/feed-items";
import type {
  Source,
  FeedItem,
  TopicSlug,
  CategorySlug,
} from "@/lib/types";

// ─── Sources ───────────────────────────────────────────────────────────────────

export function getAllSources(): Source[] {
  return sources;
}

export function getSourceBySlug(slug: string): Source | undefined {
  return sources.find((s) => s.slug === slug);
}

export function getSourceById(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

export function getSourcesByTopic(topic: TopicSlug): Source[] {
  return sources.filter((s) => s.topics.includes(topic));
}

export function getSourcesByCategory(category: CategorySlug): Source[] {
  return sources.filter((s) => s.categories.includes(category));
}

export function getFeaturedSources(): Source[] {
  return sources.filter((s) => s.featured);
}

export function getEvergreenSources(): Source[] {
  return sources.filter((s) => s.evergreen);
}

export function getHomepageFeedSources(): Source[] {
  return sources.filter((s) => s.homepageFeedEligible);
}

export function searchSources(query: string): Source[] {
  const q = query.toLowerCase();
  return sources.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.topics.some((t) => t.includes(q)) ||
      s.categories.some((c) => c.includes(q))
  );
}

export function getRelatedSources(source: Source, limit = 5): Source[] {
  return sources
    .filter(
      (s) =>
        s.id !== source.id &&
        s.topics.some((t) => source.topics.includes(t))
    )
    .slice(0, limit);
}

// ─── Feed Items ────────────────────────────────────────────────────────────────

export function getAllFeedItems(): FeedItem[] {
  return [...feedItems].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeedItemsBySource(sourceId: string): FeedItem[] {
  return feedItems
    .filter((fi) => fi.sourceId === sourceId)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getFeedItemsByTopic(topic: TopicSlug): FeedItem[] {
  return feedItems
    .filter((fi) => fi.topics.includes(topic))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getFeedItemsByCategory(category: CategorySlug): FeedItem[] {
  return feedItems
    .filter((fi) => fi.categories.includes(category))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getLatestFeedItems(limit = 12): FeedItem[] {
  return getAllFeedItems().slice(0, limit);
}

export function getFeaturedFeedItems(): FeedItem[] {
  return feedItems
    .filter((fi) => fi.isFeatured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function searchFeedItems(query: string): FeedItem[] {
  const q = query.toLowerCase();
  return feedItems.filter(
    (fi) =>
      fi.title.toLowerCase().includes(q) ||
      fi.summary.toLowerCase().includes(q)
  );
}

// ─── Combined Search ───────────────────────────────────────────────────────────

export function globalSearch(query: string) {
  return {
    sources: searchSources(query),
    feedItems: searchFeedItems(query),
  };
}
