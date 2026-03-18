import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, BookOpen, Shield, Search, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_NAME} — a curated resource homebase for creative professionals.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          A thoughtfully curated homebase for game developers, graphic
          designers, motion artists, publication designers, and UX
          practitioners.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            What is this?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {SITE_NAME} is a research and discovery tool that organizes the best
            sources for learning and staying current across seven creative
            disciplines: Game Design, Unity Game Development, Graphic Design,
            Adobe Creative Cloud, Motion Graphics, Publication Design, and
            UI/UX Design.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Think of it as your personal creative intelligence briefing — a
            single place where the newest thinking, the best tutorials, and the
            most enduring theory resources are always within reach.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            How it works
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every source in our library has been hand-selected. We categorize
            each source by topic and type — News, Tutorials, or Theory — so you
            can filter and find exactly what you need.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The homepage pulls the newest content from feed-enabled sources to
            give you a live pulse on what&apos;s happening. Evergreen resources — the
            kind you revisit year after year — are surfaced separately so they
            don&apos;t get lost in the daily flow.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You can save sources to your personal collection (stored in your
            browser), search across everything, and filter by any combination of
            topic and category.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Content philosophy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {SITE_NAME} does not scrape, republish, or reproduce full articles.
            We link out to original sources — always. What you see here is
            metadata: titles, short excerpts, publish dates, and links.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All content belongs to its respective creators and publications. Our
            role is curation and organization — helping you find the signal in
            the noise.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe in supporting the publications and creators who produce
            the work. When you find something valuable here, click through and
            give them your attention directly.
          </p>
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
              <span>This is not a bookmark manager — it&apos;s an editorial selection.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>This is not a CMS or blog — we don&apos;t publish original content.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>This is not a social platform — there are no accounts, comments, or feeds to scroll endlessly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>This is a serious research tool for serious creative work.</span>
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
