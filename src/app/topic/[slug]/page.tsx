import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SourceCard } from "@/components/source-card";
import { FeedItemCard } from "@/components/feed-item-card";
import { EvergreenShelf } from "@/components/evergreen-shelf";
import { SectionHeading } from "@/components/section-heading";
import { EmptyState } from "@/components/empty-state";
import { TOPICS, CATEGORIES, TOPIC_MAP } from "@/lib/constants";
import {
  getSourcesByTopic,
  getFeedItemsByTopic,
} from "@/lib/data";
import { getIcon } from "@/lib/icons";
import type { TopicSlug } from "@/lib/types";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPIC_MAP.get(slug as TopicSlug);
  if (!topic) return { title: "Topic Not Found" };
  return {
    title: topic.name,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = TOPIC_MAP.get(slug as TopicSlug);
  if (!topic) notFound();

  const sources = getSourcesByTopic(topic.slug);
  const feedItems = await getFeedItemsByTopic(topic.slug);
  const evergreenSources = sources.filter((s) => s.evergreen);
  const featuredSources = sources.filter((s) => s.featured);
  const Icon = getIcon(topic.icon);

  const newsFeedItems = feedItems.filter((fi) =>
    fi.categories.includes("news")
  );
  const tutFeedItems = feedItems.filter((fi) =>
    fi.categories.includes("tutorials")
  );
  const theoryFeedItems = feedItems.filter((fi) =>
    fi.categories.includes("theory")
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {topic.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {topic.description}
        </p>
      </div>

      {/* Top Recommended Sources */}
      {featuredSources.length > 0 && (
        <section className="mb-12">
          <SectionHeading
            title="Recommended Sources"
            subtitle="The essential resources for this topic."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredSources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Feed Items */}
      {feedItems.length > 0 && (
        <section className="mb-12">
          <SectionHeading
            title="Latest Articles"
            subtitle="Recent content from sources in this topic."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {feedItems.slice(0, 6).map((item) => (
              <FeedItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Category Sections */}
      {newsFeedItems.length > 0 && (
        <section className="mb-12">
          <SectionHeading title="News" subtitle="The latest from this topic." />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {newsFeedItems.slice(0, 3).map((item) => (
              <FeedItemCard key={item.id} item={item} compact />
            ))}
          </div>
        </section>
      )}

      {tutFeedItems.length > 0 && (
        <section className="mb-12">
          <SectionHeading
            title="Tutorials"
            subtitle="Learn by doing — guides and walkthroughs."
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {tutFeedItems.slice(0, 3).map((item) => (
              <FeedItemCard key={item.id} item={item} compact />
            ))}
          </div>
        </section>
      )}

      {theoryFeedItems.length > 0 && (
        <section className="mb-12">
          <SectionHeading
            title="Theory"
            subtitle="Foundational thinking and deeper analysis."
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {theoryFeedItems.slice(0, 3).map((item) => (
              <FeedItemCard key={item.id} item={item} compact />
            ))}
          </div>
        </section>
      )}

      {/* Evergreen */}
      {evergreenSources.length > 0 && (
        <EvergreenShelf sources={evergreenSources} className="mb-12" />
      )}

      {/* All Sources */}
      <section>
        <SectionHeading
          title="All Sources"
          subtitle={`Every source tagged with ${topic.name}.`}
        >
          <Link href="/library">
            <Button variant="ghost" size="sm" className="gap-1 text-sm">
              Full library <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </SectionHeading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </section>
    </div>
  );
}
