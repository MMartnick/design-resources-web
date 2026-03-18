import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SourceCard } from "@/components/source-card";
import { FeedItemCard } from "@/components/feed-item-card";
import { SectionHeading } from "@/components/section-heading";
import { CATEGORIES, CATEGORY_MAP, TOPICS } from "@/lib/constants";
import { getSourcesByCategory, getFeedItemsByCategory } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import type { CategorySlug } from "@/lib/types";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_MAP.get(slug as CategorySlug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORY_MAP.get(slug as CategorySlug);
  if (!category) notFound();

  const sources = getSourcesByCategory(category.slug);
  const feedItems = getFeedItemsByCategory(category.slug);
  const Icon = getIcon(category.icon);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </div>

      {/* Latest Feed Items */}
      {feedItems.length > 0 && (
        <section className="mb-12">
          <SectionHeading
            title="Latest Articles"
            subtitle={`Recent ${category.name.toLowerCase()} from across all topics.`}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {feedItems.slice(0, 9).map((item) => (
              <FeedItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Sources */}
      <section>
        <SectionHeading
          title={`${category.name} Sources`}
          subtitle={`All sources that publish ${category.name.toLowerCase()} content.`}
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
