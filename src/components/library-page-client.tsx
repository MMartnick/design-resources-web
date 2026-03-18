"use client";

import { useState, useMemo } from "react";
import { FilterChipBar } from "@/components/filter-chip-bar";
import { SearchField } from "@/components/search-field";
import { SourceCard } from "@/components/source-card";
import { EmptyState } from "@/components/empty-state";
import { SectionHeading } from "@/components/section-heading";
import { TOPICS, CATEGORIES } from "@/lib/constants";
import { getAllSources } from "@/lib/data";
import type { Source, SourceKind } from "@/lib/types";

type SortOption = "recommended" | "newest" | "alphabetical";

const SOURCE_KIND_OPTIONS = [
  { label: "Official", value: "official" },
  { label: "Independent", value: "independent" },
  { label: "Publication", value: "publication" },
  { label: "Community", value: "community" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Newest content", value: "newest" },
  { label: "Alphabetical", value: "alphabetical" },
];

export function LibraryPageClient() {
  const [search, setSearch] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedKinds, setSelectedKinds] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("recommended");

  const allSources = useMemo(() => getAllSources(), []);

  const filteredSources = useMemo(() => {
    let result = allSources;

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    // topic filter
    if (selectedTopics.length > 0) {
      result = result.filter((s) =>
        s.topics.some((t) => selectedTopics.includes(t))
      );
    }

    // category filter
    if (selectedCategories.length > 0) {
      result = result.filter((s) =>
        s.categories.some((c) => selectedCategories.includes(c))
      );
    }

    // kind filter
    if (selectedKinds.length > 0) {
      result = result.filter((s) => selectedKinds.includes(s.sourceKind));
    }

    // sort
    switch (sort) {
      case "alphabetical":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result = [...result].sort((a, b) => {
          const freq = { high: 3, medium: 2, low: 1 };
          return freq[b.updateFrequency] - freq[a.updateFrequency];
        });
        break;
      case "recommended":
      default:
        result = [...result].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
        break;
    }

    return result;
  }, [allSources, search, selectedTopics, selectedCategories, selectedKinds, sort]);

  const toggle = (value: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Source Library
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Every source in our network, filterable by topic, category, and type.
          Find exactly what you need.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-lg">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Filter sources…"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Topics
          </p>
          <FilterChipBar
            options={TOPICS.map((t) => ({ label: t.name, value: t.slug }))}
            selected={selectedTopics}
            onChange={(v) => toggle(v, setSelectedTopics)}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <FilterChipBar
            options={CATEGORIES.map((c) => ({ label: c.name, value: c.slug }))}
            selected={selectedCategories}
            onChange={(v) => toggle(v, setSelectedCategories)}
          />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Source Type
          </p>
          <FilterChipBar
            options={SOURCE_KIND_OPTIONS}
            selected={selectedKinds}
            onChange={(v) => toggle(v, setSelectedKinds)}
          />
        </div>
      </div>

      {/* Sort + count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredSources.length} source{filteredSources.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sort:</span>
          <div className="flex gap-1">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  sort === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredSources.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No sources match your filters"
          description="Try broadening your search or adjusting the filters above."
        />
      )}
    </div>
  );
}
