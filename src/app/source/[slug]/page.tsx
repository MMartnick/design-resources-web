import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeedItemCard } from "@/components/feed-item-card";
import { SourceCard } from "@/components/source-card";
import { SectionHeading } from "@/components/section-heading";
import { SaveButton } from "@/components/save-button";
import {
  getAllSources,
  getSourceBySlug,
  getFeedItemsBySource,
  getRelatedSources,
} from "@/lib/data";
import { TOPIC_MAP, CATEGORY_MAP } from "@/lib/constants";

interface SourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sources = getAllSources();
  return sources.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const source = getSourceBySlug(slug);
  if (!source) return { title: "Source Not Found" };
  return {
    title: source.name,
    description: source.description,
  };
}

const kindLabel: Record<string, string> = {
  official: "Official",
  independent: "Independent",
  publication: "Publication",
  community: "Community",
};

const frequencyLabel: Record<string, string> = {
  high: "Updated frequently",
  medium: "Regular updates",
  low: "Updated occasionally",
};

export default async function SourcePage({ params }: SourcePageProps) {
  const { slug } = await params;
  const source = getSourceBySlug(slug);
  if (!source) notFound();

  const feedItems = getFeedItemsBySource(source.id);
  const relatedSources = getRelatedSources(source, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {source.name}
              </h1>
              <SaveButton sourceId={source.id} className="mt-1" />
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {source.description}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-1">
                Why follow this?
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {source.whyFollow}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {source.topics.map((t) => (
                <Link key={t} href={`/topic/${t}`}>
                  <Badge variant="secondary" className="hover:bg-primary/10 transition-colors">
                    {TOPIC_MAP.get(t)?.name ?? t}
                  </Badge>
                </Link>
              ))}
              {source.categories.map((c) => (
                <Link key={c} href={`/category/${c}`}>
                  <Badge variant="outline" className="hover:bg-primary/10 transition-colors">
                    {CATEGORY_MAP.get(c)?.name ?? c}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Visit button */}
            <div className="mt-6">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2 rounded-xl">
                  <ExternalLink className="h-4 w-4" />
                  Visit Source
                </Button>
              </a>
            </div>
          </div>

          {/* Feed items */}
          {feedItems.length > 0 && (
            <section>
              <SectionHeading
                title="Latest from This Source"
                subtitle="Recent content pulled from the feed."
              />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {feedItems.map((item) => (
                  <FeedItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Meta */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Source Details
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-muted-foreground">Type</dt>
                <dd className="text-sm font-medium">
                  {kindLabel[source.sourceKind]}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Update Frequency
                </dt>
                <dd className="text-sm font-medium">
                  {frequencyLabel[source.updateFrequency]}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Feed</dt>
                <dd className="text-sm font-medium">
                  {source.hasFeed
                    ? `${source.feedType?.toUpperCase()} feed available`
                    : "No live feed"}
                </dd>
              </div>
              {source.evergreen && (
                <div>
                  <dt className="text-xs text-muted-foreground">Type</dt>
                  <dd className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Evergreen resource
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Related */}
          {relatedSources.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Related Sources
              </h3>
              <div className="space-y-3">
                {relatedSources.map((related) => (
                  <Link
                    key={related.id}
                    href={`/source/${related.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-border/50 bg-card p-3 transition-all hover:border-border hover:shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {related.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
