"use client";

import Link from "next/link";
import { SourceCard } from "@/components/source-card";
import { EmptyState } from "@/components/empty-state";
import { useSaved } from "@/lib/hooks/use-saved";
import { getSourceById } from "@/lib/data-sources";

export function SavedPageClient() {
  const { savedIds } = useSaved();

  const savedSources = savedIds
    .map((id) => getSourceById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getSourceById>>[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          Saved Sources
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Your personal collection of saved sources, stored locally in your
          browser. Click the bookmark icon on any source card to add it here.
        </p>
      </div>

      {savedSources.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="inbox"
          title="No saved sources yet"
          description="Browse the library and save sources you want to keep close. They'll appear here."
        >
          <Link href="/library">
            <button className="mt-2 border border-foreground px-5 py-2 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors">
              Browse the Library
            </button>
          </Link>
        </EmptyState>
      )}
    </div>
  );
}
