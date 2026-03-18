/**
 * Build-time RSS feed fetcher.
 *
 * Fetches and parses RSS/Atom feeds from all feed-enabled sources,
 * normalises entries into FeedItem objects, and merges them with
 * any manually curated items.
 *
 * Called at build time only (inside generateStaticParams / page server
 * components). No runtime server is required.
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
  // Parse common custom fields
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: false }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: false }],
      ["enclosure", "enclosure", { keepArray: false }],
    ],
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

/** Try to extract an image URL from an RSS item */
function extractImageUrl(item: Record<string, unknown>): string | undefined {
  // media:content (may be { url } or { $: { url } })
  const mc = item.mediaContent as Record<string, unknown> | undefined;
  if (typeof mc?.url === "string") return mc.url;
  const mc$ = mc?.$ as Record<string, string> | undefined;
  if (mc$?.url) return mc$.url;

  // media:thumbnail
  const mt = item.mediaThumbnail as Record<string, unknown> | undefined;
  if (typeof mt?.url === "string") return mt.url;
  const mt$ = mt?.$ as Record<string, string> | undefined;
  if (mt$?.url) return mt$.url;

  // enclosure
  const enc = item.enclosure as Record<string, string> | undefined;
  if (enc?.url && enc?.type?.startsWith("image")) return enc.url;

  return undefined;
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
        const summary = truncate(stripHtml(rawSummary), 300);
        const publishedAt =
          entry.isoDate ??
          entry.pubDate ??
          new Date().toISOString();
        const imageUrl = extractImageUrl(entry as unknown as Record<string, unknown>);

        return {
          id: `fi-${source.id}-${simpleHash(link || title)}`,
          sourceId: source.id,
          title,
          url: link,
          summary,
          publishedAt:
            new Date(publishedAt).toISOString(), // normalise
          imageUrl,
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
