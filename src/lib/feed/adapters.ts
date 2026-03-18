/**
 * Feed Adapter Architecture
 *
 * Each adapter implements the FeedAdapter interface and knows how to
 * fetch + normalise feed items from a specific source type.
 *
 * For MVP, all adapters return mocked data. When wiring up live feeds:
 * 1. Implement the `fetch()` method for each adapter type
 * 2. Register the adapter in the adapter registry
 * 3. Call `ingestAll()` on a schedule (cron / revalidation)
 */

import type { FeedItem, Source } from "@/lib/types";
import { feedItems } from "@/data/feed-items";

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
    // TODO: Wire up live RSS/Atom parsing
    // Example implementation:
    //
    // const response = await fetch(source.feedUrl!, { next: { revalidate: 3600 } });
    // const xml = await response.text();
    // const parsed = parseRSS(xml);
    // return parsed.items.map(item => ({
    //   id: `fi-${source.id}-${hash(item.link)}`,
    //   sourceId: source.id,
    //   title: item.title,
    //   url: item.link,
    //   summary: item.description?.slice(0, 300) ?? '',
    //   publishedAt: item.pubDate ?? new Date().toISOString(),
    //   imageUrl: item.enclosure?.url,
    //   topics: source.topics,
    //   categories: source.categories,
    //   isFeatured: false,
    // }));

    // MVP: return mocked data for this source
    return feedItems.filter((fi) => fi.sourceId === source.id);
  }
}

// ─── Custom Adapter (for non-RSS sources) ──────────────────────────────────────

export class CustomAdapter implements FeedAdapter {
  type = "custom";

  async fetch(source: Source): Promise<FeedItem[]> {
    // TODO: Implement source-specific scrapers/API calls
    // Each source would have a registered handler function
    return feedItems.filter((fi) => fi.sourceId === source.id);
  }
}

// ─── Manual Adapter (for static/evergreen sources) ─────────────────────────────

export class ManualAdapter implements FeedAdapter {
  type = "manual";

  async fetch(source: Source): Promise<FeedItem[]> {
    // Manual sources are updated by hand in the seed data
    return feedItems.filter((fi) => fi.sourceId === source.id);
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
 * In production, this would be called by a cron job or ISR revalidation.
 */
export async function ingestAll(
  sources: Source[]
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
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
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
