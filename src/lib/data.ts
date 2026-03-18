/**
 * Data access layer — queries over source data and live feed items.
 *
 * Source data comes from the seed file (static).
 * Feed item data is loaded at build time from live RSS feeds
 * (with seed-data fallback for sources whose feeds fail).
 */

import { sources } from "@/data/sources";
import { loadFeedItems } from "@/lib/feed/loader";
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

// ─── Feed Items (async — loaded from live RSS at build time) ───────────────────

export async function getAllFeedItems(): Promise<FeedItem[]> {
  const feedItems = await loadFeedItems();
  return [...feedItems].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getFeedItemsBySource(sourceId: string): Promise<FeedItem[]> {
  const feedItems = await loadFeedItems();
  return feedItems
    .filter((fi) => fi.sourceId === sourceId)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getFeedItemsByTopic(topic: TopicSlug): Promise<FeedItem[]> {
  const feedItems = await loadFeedItems();
  return feedItems
    .filter((fi) => fi.topics.includes(topic))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getFeedItemsByCategory(category: CategorySlug): Promise<FeedItem[]> {
  const feedItems = await loadFeedItems();
  return feedItems
    .filter((fi) => fi.categories.includes(category))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getLatestFeedItems(limit = 12): Promise<FeedItem[]> {
  const all = await getAllFeedItems();
  return all.slice(0, limit);
}

export async function getFeaturedFeedItems(): Promise<FeedItem[]> {
  const feedItems = await loadFeedItems();
  return feedItems
    .filter((fi) => fi.isFeatured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function searchFeedItems(query: string): Promise<FeedItem[]> {
  const feedItems = await loadFeedItems();
  const q = query.toLowerCase();
  return feedItems.filter(
    (fi) =>
      fi.title.toLowerCase().includes(q) ||
      fi.summary.toLowerCase().includes(q)
  );
}

// ─── Combined Search ───────────────────────────────────────────────────────────

export async function globalSearch(query: string) {
  return {
    sources: searchSources(query),
    feedItems: await searchFeedItems(query),
  };
}
