import Link from "next/link";
import { Compass } from "lucide-react";
import { SITE_NAME, TOPICS, CATEGORIES } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Compass className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold tracking-tight">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A curated resource homebase for creative professionals and
              lifelong learners.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Topics</h3>
            <ul className="space-y-2">
              {TOPICS.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/topic/${topic.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Site</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/library"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Full Library
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Saved Sources
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {SITE_NAME}. A research and
            discovery tool — all content belongs to its respective sources.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS &amp; shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
