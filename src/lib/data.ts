/**
 * Data access layer — queries over source data and live feed items.
 *
 * Source data comes from the seed file (static).
 * Feed item data is loaded at build time from live RSS feeds
 * (with seed-data fallback for sources whose feeds fail).
 */

import { loadFeedItems } from "@/lib/feed/loader";
import { searchSources } from "@/lib/data-sources";
import type { FeedItem, TopicSlug, CategorySlug } from "@/lib/types";

// Re-export all synchronous source functions (client-safe)
export {
  getAllSources,
  getSourceBySlug,
  getSourceById,
  getSourcesByTopic,
  getSourcesByCategory,
  getFeaturedSources,
  getEvergreenSources,
  getHomepageFeedSources,
  getFeedEnabledSources,
  searchSources,
  getRelatedSources,
} from "@/lib/data-sources";

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
