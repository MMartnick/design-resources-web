import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { getSourcesByCategory, getFeedItemsByCategory } from "@/lib/data";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse resources by category — News, Tutorials, or Theory.",
};

export default async function CategoriesPage() {
  // Pre-fetch all category article counts
  const categoriesWithCounts = await Promise.all(
    CATEGORIES.map(async (category) => {
      const Icon = getIcon(category.icon);
      const sourceCount = getSourcesByCategory(category.slug).length;
      const articles = await getFeedItemsByCategory(category.slug);
      return { category, Icon, sourceCount, articleCount: articles.length };
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Categories
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Every source and article falls into one or more categories. Use these
          to find exactly the type of content you need — whether you want the
          latest news, hands-on learning, or deeper thinking.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {categoriesWithCounts.map(({ category, Icon, sourceCount, articleCount }) => {

          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-white/[0.03]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
                <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h2 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">
                {category.name}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <div className="mt-auto flex gap-4 text-xs text-muted-foreground">
                <span>{sourceCount} sources</span>
                <span>{articleCount} articles</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
