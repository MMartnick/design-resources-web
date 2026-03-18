import Link from "next/link";
import { Compass } from "lucide-react";
import { SITE_NAME, SITE_DISCLAIMER, SITE_CONTACT_EMAIL, TOPICS, CATEGORIES } from "@/lib/constants";
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
              A personal, non-commercial resource library for studying game dev,
              design, motion, publishing, and UX. All links point to the original
              publishers.
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
                  About &amp; Rights
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-3xl">
          {SITE_DISCLAIMER}
        </p>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} {SITE_NAME}. A personal,
            non-commercial project — not affiliated with any listed source.
          </p>
          <p className="text-xs text-muted-foreground">
            Removal requests:{" "}
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="underline hover:text-foreground transition-colors"
            >
              {SITE_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
