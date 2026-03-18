/**
 * Build-time RSS feed fetcher.
 *
 * Fetches and parses RSS/Atom feeds from all feed-enabled sources,
 * normalises entries into FeedItem objects, and merges them with
 * any manually curated items.
 *
 * Called at build time only (inside generateStaticParams / page server
 * components). No runtime server is required.
 *
 * Content policy: we keep only metadata (title, link, date) and a very
 * short excerpt for discovery. Full content lives on the publisher's site.
 * No images are extracted or stored.
 */

import RSSParser from "rss-parser";
import type { FeedItem, Source, TopicSlug, CategorySlug } from "@/lib/types";

// ─── Parser Setup ──────────────────────────────────────────────────────────────

const parser = new RSSParser({
  timeout: 15_000, // 15 s per feed
  headers: {
    "User-Agent": "Designcurrent/1.0 (+https://github.com/mmartnick/design-resources-web)",
    Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
  },
});

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Deterministic short hash for feed-item IDs */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash + ch) | 0;
  }
  return Math.abs(hash).toString(36);
}

/** Strip HTML tags from a string */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncate to a max length at a word boundary */
function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  const truncated = str.slice(0, max);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? truncated.slice(0, lastSpace) : truncated) + "…";
}

// ─── Public API ────────────────────────────────────────────────────────────────

export interface FetchResult {
  source: Source;
  items: FeedItem[];
  error?: string;
}

/**
 * Fetch a single source's RSS/Atom feed and return normalised FeedItems.
 * Returns an empty array (never throws) on failure.
 */
export async function fetchSourceFeed(
  source: Source,
  maxItems = 10,
): Promise<FetchResult> {
  if (!source.hasFeed || !source.feedUrl) {
    return { source, items: [], error: "No feed URL" };
  }

  try {
    const feed = await parser.parseURL(source.feedUrl);
    const items: FeedItem[] = (feed.items ?? [])
      .slice(0, maxItems)
      .map((entry) => {
        const link = entry.link ?? "";
        const title = entry.title ?? "(untitled)";
        const rawSummary =
          entry.contentSnippet ??
          entry.summary ??
          (typeof entry.content === "string" ? stripHtml(entry.content) : "");
        // Short excerpt only — full content lives on the publisher's site.
        // If the source disables excerpts, store an empty summary.
        const summary = source.excerptEnabled
          ? truncate(stripHtml(rawSummary), 160)
          : "";
        const publishedAt =
          entry.isoDate ??
          entry.pubDate ??
          new Date().toISOString();

        return {
          id: `fi-${source.id}-${simpleHash(link || title)}`,
          sourceId: source.id,
          title,
          url: link,
          summary,
          publishedAt:
            new Date(publishedAt).toISOString(), // normalise
          topics: source.topics as TopicSlug[],
          categories: source.categories as CategorySlug[],
          isFeatured: false,
        } satisfies FeedItem;
      })
      // Filter out items with no link
      .filter((item) => item.url.length > 0);

    return { source, items };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : String(err);
    console.warn(
      `[Feed] Failed to fetch ${source.name} (${source.feedUrl}): ${message}`,
    );
    return { source, items: [], error: message };
  }
}

/**
 * Fetch feeds from all provided sources in parallel (with concurrency limit).
 */
export async function fetchAllFeeds(
  sources: Source[],
  {
    maxItemsPerSource = 8,
    concurrency = 6,
  } = {},
): Promise<{ items: FeedItem[]; results: FetchResult[] }> {
  const feedSources = sources.filter((s) => s.hasFeed && s.feedUrl);

  // Process in batches to avoid overwhelming networks
  const allResults: FetchResult[] = [];
  for (let i = 0; i < feedSources.length; i += concurrency) {
    const batch = feedSources.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map((s) => fetchSourceFeed(s, maxItemsPerSource)),
    );
    allResults.push(...batchResults);
  }

  // Merge and sort
  const allItems = allResults
    .flatMap((r) => r.items)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  return { items: allItems, results: allResults };
}
