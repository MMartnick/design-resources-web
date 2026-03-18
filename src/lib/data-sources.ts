/**
 * Source data access layer — synchronous, client-safe.
 *
 * This module contains only static source queries (no feed/fs imports)
 * so it can be safely imported from "use client" components.
 *
 * All queries filter by `source.enabled` so disabled sources never surface.
 */

import { sources as rawSources } from "@/data/sources";
import type { Source, TopicSlug, CategorySlug } from "@/lib/types";

/** Only enabled sources are visible site-wide. */
const sources = rawSources.filter((s) => s.enabled);

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

/** Sources whose feeds should be fetched at build time. */
export function getFeedEnabledSources(): Source[] {
  return sources.filter((s) => s.feedEnabled && s.hasFeed && s.feedUrl);
}

export function searchSources(query: string): Source[] {
  const q = query.toLowerCase();
  return sources.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.topics.some((t) => t.includes(q)) ||
      s.categories.some((c) => c.includes(q)),
  );
}

export function getRelatedSources(source: Source, limit = 5): Source[] {
  return sources
    .filter(
      (s) =>
        s.id !== source.id &&
        s.topics.some((t) => source.topics.includes(t)),
    )
    .slice(0, limit);
}
