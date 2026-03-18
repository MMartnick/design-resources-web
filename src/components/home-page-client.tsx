"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterChipBar } from "@/components/filter-chip-bar";
import { SearchField } from "@/components/search-field";
import { FeedItemCard } from "@/components/feed-item-card";
import { FeaturedSourceCard } from "@/components/featured-source-card";
import { TopicTile } from "@/components/topic-tile";
import { EvergreenShelf } from "@/components/evergreen-shelf";
import { SectionHeading } from "@/components/section-heading";
import { EmptyState } from "@/components/empty-state";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  TOPICS,
  CATEGORIES,
} from "@/lib/constants";
import type { Source, FeedItem, TopicSlug, CategorySlug } from "@/lib/types";

interface HomePageClientProps {
  latestFeedItems: FeedItem[];
  allFeedItems: FeedItem[];
  featuredSources: Source[];
  evergreenSources: Source[];
  allSources: Source[];
}

export function HomePageClient({
  latestFeedItems,
  allFeedItems,
  featuredSources,
  evergreenSources,
  allSources,
}: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter feed items
  const filteredFeedItems = useMemo(() => {
    let items = latestFeedItems;

    if (selectedTopics.length > 0) {
      items = items.filter((item) =>
        item.topics.some((t) => selectedTopics.includes(t))
      );
    }
    if (selectedCategories.length > 0) {
      items = items.filter((item) =>
        item.categories.some((c) => selectedCategories.includes(c))
      );
    }

    return items;
  }, [latestFeedItems, selectedTopics, selectedCategories]);

  // Client-side search over pre-fetched data
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const matchedSources = allSources.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.topics.some((t) => t.includes(q)) ||
        s.categories.some((c) => c.includes(q))
    );
    const matchedFeedItems = allFeedItems.filter(
      (fi) =>
        fi.title.toLowerCase().includes(q) ||
        fi.summary.toLowerCase().includes(q)
    );
    return { sources: matchedSources, feedItems: matchedFeedItems };
  }, [searchQuery, allSources, allFeedItems]);

  const topicOptions = TOPICS.map((t) => ({ label: t.name, value: t.slug }));
  const categoryOptions = CATEGORIES.map((c) => ({
    label: c.name,
    value: c.slug,
  }));

  const handleTopicToggle = (value: string) => {
    setSelectedTopics((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleCategoryToggle = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const topicSourceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    TOPICS.forEach((t) => {
      counts.set(
        t.slug,
        allSources.filter((s) => s.topics.includes(t.slug)).length
      );
    });
    return counts;
  }, [allSources]);

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {SITE_NAME}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl leading-relaxed">
              {SITE_TAGLINE}
            </p>
            <p className="mt-2 text-base text-muted-foreground/80">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-xl">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search sources, articles, and topics…"
            />
          </div>
        </div>
      </section>

      {/* ═══ SEARCH RESULTS (when searching) ═══ */}
      {searchResults && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Results for "${searchQuery}"`}
            subtitle={`${searchResults.sources.length} sources · ${searchResults.feedItems.length} articles`}
          />

          {searchResults.sources.length === 0 &&
          searchResults.feedItems.length === 0 ? (
            <EmptyState
              icon="search"
              title="No results found"
              description="Try a different search term or browse by topic below."
            />
          ) : (
            <div className="space-y-8">
              {searchResults.sources.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Sources
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {searchResults.sources.slice(0, 6).map((source) => (
                      <FeaturedSourceCard key={source.id} source={source} />
                    ))}
                  </div>
                </div>
              )}
              {searchResults.feedItems.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Articles
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {searchResults.feedItems.slice(0, 6).map((item) => (
                      <FeedItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ═══ MAIN CONTENT (hidden when searching) ═══ */}
      {!searchResults && (
        <>
          {/* Latest Feed */}
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionHeading
              title="Latest Across the Network"
              subtitle="Freshly published from our curated source network."
            >
              <Link href="/library">
                <Button variant="ghost" size="sm" className="gap-1 text-sm">
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </SectionHeading>

            {/* Filters */}
            <div className="space-y-3 mb-6">
              <FilterChipBar
                options={topicOptions}
                selected={selectedTopics}
                onChange={handleTopicToggle}
              />
              <FilterChipBar
                options={categoryOptions}
                selected={selectedCategories}
                onChange={handleCategoryToggle}
              />
            </div>

            {filteredFeedItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredFeedItems.slice(0, 12).map((item) => (
                  <FeedItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="search"
                title="No articles match your filters"
                description="Try adjusting your topic or category filters to see more content."
              />
            )}
          </section>

          {/* Featured Sources */}
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionHeading
              title="Featured Sources"
              subtitle="Handpicked resources we consider essential for every creative professional."
            >
              <Link href="/library">
                <Button variant="ghost" size="sm" className="gap-1 text-sm">
                  Full library <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </SectionHeading>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredSources.slice(0, 6).map((source) => (
                <FeaturedSourceCard key={source.id} source={source} />
              ))}
            </div>
          </section>

          {/* Browse by Topic */}
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionHeading
              title="Browse by Topic"
              subtitle="Explore curated sources organized by discipline."
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {TOPICS.map((topic) => (
                <TopicTile
                  key={topic.slug}
                  topic={topic}
                  count={topicSourceCounts.get(topic.slug)}
                />
              ))}
            </div>
          </section>

          {/* Evergreen Shelf */}
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <EvergreenShelf sources={evergreenSources} />
          </section>

          {/* Newsletter placeholder */}
          <section className="border-t border-border/30 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-lg text-center">
                <h2 className="text-xl font-bold tracking-tight">
                  Stay in the current
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  A periodic digest of the best new resources, articles, and
                  thinking from across our network. No spam, just signal.
                </p>
                <div className="mt-6 flex gap-2 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    disabled
                  />
                  <Button disabled className="rounded-xl px-6 shrink-0">
                    Subscribe
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground/60">
                  Coming soon — newsletter functionality is in development.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
