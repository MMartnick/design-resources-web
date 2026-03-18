import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Shield, Search, Compass, Mail, Scale, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME, SITE_DISCLAIMER, SITE_CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About & Rights",
  description: `About ${SITE_NAME} — a personal, non-commercial resource library. Content policy, rights, and removal requests.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          A personal, non-commercial resource library for studying game
          development, graphic design, motion graphics, publication design,
          and UX.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            What is this?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {SITE_NAME} is a <strong>personal research tool</strong> — a
            reading list of free resources I find useful for creative study and
            professional development. It is not a business, publication, or
            media company. It generates no revenue and carries no advertising.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Think of it as a personal bookmark collection that happens to be
            public — a single place where the best free tutorials, articles,
            documentation, and theory resources are organized by topic and type.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            How it works
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every source in the library has been personally selected. Sources
            are categorized by topic and type — News, Tutorials, or Theory —
            so I can quickly find what I need.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The homepage pulls the newest headlines from feed-enabled sources as
            a personal reading dashboard. Evergreen resources — the kind worth
            revisiting year after year — are surfaced separately.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You can save sources to a personal collection (stored in your
            browser — no accounts, no tracking), search across everything, and
            filter by topic or category.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Content policy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {SITE_NAME} does <strong>not</strong> scrape, republish, or
            reproduce articles, images, or any substantial content from
            third-party publishers. What appears here is strictly:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span><strong>Titles and links</strong> pointing to the original publisher</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span><strong>Very short excerpts</strong> (one or two sentences) for discovery</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span><strong>Publish dates</strong> from the source&apos;s public RSS/Atom feed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span><strong>No images</strong> — we do not extract, cache, or display publisher images</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All external content remains the property of its original creators
            and publishers. This site only links to and describes free,
            publicly available resources and does not host, reproduce, or
            redistribute copyrighted material.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Only <strong>free resources</strong> are listed. No paywalled
            articles, paid courses, or subscription-only content appears on
            this site.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Rights &amp; attribution
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This site is <strong>not affiliated with, endorsed by, or sponsored
            by</strong> any of the sources listed. All trademarks, service
            marks, and company names belong to their respective owners.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Source descriptions and &ldquo;why follow&rdquo; notes are my own
            short-form commentary and are not quoted or derived from the
            publishers&apos; marketing copy.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Removal &amp; correction requests
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you are a publisher or rights holder and would like your content
            removed or corrected, I will honor your request promptly. Please
            email:
          </p>
          <div className="rounded-xl border border-border bg-muted/50 p-4 mb-4">
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              {SITE_CONTACT_EMAIL}
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              Please include the URL of the content in question and the action
              you&apos;d like taken (removal, correction, or updated attribution).
              I aim to respond within 48 hours.
            </p>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            What this is not
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>This is not a <strong>business</strong> — it makes no money and has no advertisers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>This is not a <strong>content aggregator</strong> — it links out; it doesn&apos;t republish.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>This is not a <strong>social platform</strong> — no accounts, comments, or tracking.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>This is a <strong>personal study tool</strong> that I&apos;ve made publicly available.</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-10 flex gap-3">
        <Link href="/">
          <Button variant="outline" className="rounded-xl gap-2">
            <Compass className="h-4 w-4" /> Go to Homepage
          </Button>
        </Link>
        <Link href="/library">
          <Button className="rounded-xl gap-2">
            <BookOpen className="h-4 w-4" /> Browse Library
          </Button>
        </Link>
      </div>
    </div>
  );
}
