import Link from "next/link";
import { SITE_NAME, SITE_DISCLAIMER, SITE_CONTACT_EMAIL, TOPICS, CATEGORIES } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-3 inline-block">
              <span className="text-sm font-bold uppercase tracking-widest">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A personal, non-commercial resource library for studying game dev,
              design, motion, publishing, and UX. All links point to the original
              publishers.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Browse
            </h3>
            <ul className="space-y-2">
              {TOPICS.slice(0, 6).map((topic) => (
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

          {/* Links */}
          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Site
            </h3>
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

        <div className="mt-10 border-t border-border pt-8">
          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
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
      </div>
    </footer>
  );
}
