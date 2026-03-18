/**
 * Feed Adapter Architecture
 *
 * Each adapter implements the FeedAdapter interface and knows how to
 * fetch + normalise feed items from a specific source type.
 *
 * The RSSAdapter performs live RSS/Atom parsing at build time.
 * The ManualAdapter returns curated seed data for sources without feeds.
 */

import type { FeedItem, Source } from "@/lib/types";
import { feedItems as seedFeedItems } from "@/data/feed-items";
import { fetchSourceFeed } from "./rss-fetcher";

// ─── Adapter Interface ─────────────────────────────────────────────────────────

export interface FeedAdapter {
  /** Identifier for this adapter type */
  type: string;

  /** Fetch and normalise items from the source */
  fetch(source: Source): Promise<FeedItem[]>;
}

// ─── RSS / Atom Adapter ────────────────────────────────────────────────────────

export class RSSAdapter implements FeedAdapter {
  type = "rss";

  async fetch(source: Source): Promise<FeedItem[]> {
    if (!source.feedUrl) {
      // Fall back to seed data if no feed URL is configured
      return seedFeedItems.filter((fi) => fi.sourceId === source.id);
    }

    const result = await fetchSourceFeed(source, 8);

    if (result.items.length > 0) {
      return result.items;
    }

    // Fall back to seed data if the live fetch returned nothing
    console.warn(
      `[RSSAdapter] No live items for ${source.name}, using seed data`,
    );
    return seedFeedItems.filter((fi) => fi.sourceId === source.id);
  }
}

// ─── Custom Adapter (for non-RSS sources) ──────────────────────────────────────

export class CustomAdapter implements FeedAdapter {
  type = "custom";

  async fetch(source: Source): Promise<FeedItem[]> {
    // Custom sources: try RSS first if a feedUrl exists, else use seed data
    if (source.feedUrl) {
      const result = await fetchSourceFeed(source, 8);
      if (result.items.length > 0) return result.items;
    }
    return seedFeedItems.filter((fi) => fi.sourceId === source.id);
  }
}

// ─── Manual Adapter (for static/evergreen sources) ─────────────────────────────

export class ManualAdapter implements FeedAdapter {
  type = "manual";

  async fetch(source: Source): Promise<FeedItem[]> {
    // Manual sources are always curated seed data
    return seedFeedItems.filter((fi) => fi.sourceId === source.id);
  }
}

// ─── Adapter Registry ──────────────────────────────────────────────────────────

const adapterRegistry = new Map<string, FeedAdapter>();
adapterRegistry.set("rss", new RSSAdapter());
adapterRegistry.set("atom", new RSSAdapter()); // Atom uses same parser
adapterRegistry.set("custom", new CustomAdapter());
adapterRegistry.set("manual", new ManualAdapter());

export function getAdapter(source: Source): FeedAdapter | null {
  if (!source.hasFeed || !source.feedType) return null;
  return adapterRegistry.get(source.feedType) ?? null;
}

// ─── Ingestion Orchestrator ────────────────────────────────────────────────────

/**
 * Fetch fresh items from all feed-enabled sources.
 * Called at build time to populate the static site with live content.
 */
export async function ingestAll(
  sources: Source[],
): Promise<FeedItem[]> {
  const results: FeedItem[] = [];

  for (const source of sources) {
    const adapter = getAdapter(source);
    if (!adapter) continue;

    try {
      const items = await adapter.fetch(source);
      results.push(...items);
    } catch (error) {
      console.error(`[Feed] Failed to ingest ${source.name}:`, error);
    }
  }

  return results.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Fetch items for a single source.
 */
export async function ingestSource(source: Source): Promise<FeedItem[]> {
  const adapter = getAdapter(source);
  if (!adapter) return [];

  try {
    return await adapter.fetch(source);
  } catch (error) {
    console.error(`[Feed] Failed to ingest ${source.name}:`, error);
    return [];
  }
}
