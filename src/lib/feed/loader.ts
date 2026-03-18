/**
 * Build-time feed data loader.
 *
 * Uses a file-based cache so feeds are fetched ONCE across all build
 * workers, then every subsequent call reads from the cache file.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getFeedEnabledSources, getAllSources } from "@/lib/data-sources";
import { feedItems as seedFeedItems } from "@/data/feed-items";
import { fetchAllFeeds } from "@/lib/feed/rss-fetcher";
import type { FeedItem } from "@/lib/types";

const CACHE_DIR = join(process.cwd(), ".next", "cache", "feed");
const CACHE_FILE = join(CACHE_DIR, "feed-items.json");
const LOCK_FILE = join(CACHE_DIR, "feed.lock");

/** How long the cached data is valid (5 minutes) */
const CACHE_TTL_MS = 5 * 60 * 1000;

/** In-memory cache so a single worker never reads the file twice */
let memoryCache: FeedItem[] | null = null;

/**
 * Fetch live feeds, merge with seed fallback, deduplicate, and return.
 */
async function fetchAndMerge(): Promise<FeedItem[]> {
  const feedSources = getFeedEnabledSources();

  const { items: liveItems, results } = await fetchAllFeeds(feedSources, {
    maxItemsPerSource: 8,
    concurrency: 6,
  });

  // Log results
  const succeeded = results.filter((r) => r.items.length > 0);
  const failed = results.filter((r) => r.items.length === 0 && r.error);
  console.log(
    `[Feed] Fetched ${liveItems.length} live items from ${succeeded.length}/${results.length} sources`,
  );
  if (failed.length > 0) {
    console.warn(
      `[Feed] Failed sources: ${failed.map((r) => r.source.name).join(", ")}`,
    );
  }

  // Collect source IDs that returned live data
  const liveSourceIds = new Set(
    results
      .filter((r) => r.items.length > 0)
      .map((r) => r.source.id),
  );

  // For sources that failed, fall back to seed data
  const fallbackItems = seedFeedItems.filter(
    (fi) => !liveSourceIds.has(fi.sourceId),
  );

  // Merge live + fallback, deduplicate by URL, sort by date
  const seen = new Set<string>();
  const merged: FeedItem[] = [];

  for (const item of [...liveItems, ...fallbackItems]) {
    const key = item.url || item.id;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  }

  merged.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  console.log(`[Feed] Total feed items (live + fallback): ${merged.length}`);
  return merged;
}

/**
 * Cached feed loader — shared across all build workers via filesystem.
 *
 * 1. If an in-memory copy exists, return it immediately.
 * 2. If the cache file exists and is fresh, read it.
 * 3. Otherwise, acquire a simple lock, fetch, write cache, release lock.
 */
export async function loadFeedItems(): Promise<FeedItem[]> {
  // 1. In-memory fast path
  if (memoryCache) return memoryCache;

  // 2. File cache fast path
  try {
    if (existsSync(CACHE_FILE)) {
      const stat = new Date(
        readFileSync(CACHE_FILE + ".ts", "utf8").trim(),
      ).getTime();
      if (Date.now() - stat < CACHE_TTL_MS) {
        const data = JSON.parse(
          readFileSync(CACHE_FILE, "utf8"),
        ) as FeedItem[];
        memoryCache = data;
        return data;
      }
    }
  } catch {
    // Corrupt cache — will re-fetch below
  }

  // 3. Fetch with simple lock to avoid parallel fetches across workers
  mkdirSync(CACHE_DIR, { recursive: true });

  // Simple spinlock — if another worker is fetching, wait for them
  const maxWait = 120_000; // 2 minutes max
  const started = Date.now();
  while (existsSync(LOCK_FILE) && Date.now() - started < maxWait) {
    await new Promise((r) => setTimeout(r, 500));
    // Check if the other worker finished while we waited
    try {
      if (existsSync(CACHE_FILE)) {
        const data = JSON.parse(
          readFileSync(CACHE_FILE, "utf8"),
        ) as FeedItem[];
        memoryCache = data;
        return data;
      }
    } catch {
      // Keep waiting
    }
  }

  // Write lock
  try {
    writeFileSync(LOCK_FILE, String(process.pid));
  } catch {
    // If we can't write lock, proceed anyway
  }

  try {
    // Double-check cache wasn't written while we acquired lock
    if (existsSync(CACHE_FILE)) {
      try {
        const data = JSON.parse(
          readFileSync(CACHE_FILE, "utf8"),
        ) as FeedItem[];
        memoryCache = data;
        return data;
      } catch {
        // Corrupt — re-fetch
      }
    }

    const items = await fetchAndMerge();

    // Write cache + timestamp
    writeFileSync(CACHE_FILE, JSON.stringify(items));
    writeFileSync(CACHE_FILE + ".ts", new Date().toISOString());

    memoryCache = items;
    return items;
  } finally {
    // Release lock
    try {
      const { unlinkSync } = await import("fs");
      unlinkSync(LOCK_FILE);
    } catch {
      // Lock file already cleaned up
    }
  }
}
