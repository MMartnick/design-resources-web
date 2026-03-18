import Link from "next/link";
import { ArrowUpRight, ExternalLink, CheckCircle2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Source } from "@/lib/types";
import { TOPIC_MAP } from "@/lib/constants";

interface FeaturedSourceCardProps {
  source: Source;
  className?: string;
}

export function FeaturedSourceCard({ source, className }: FeaturedSourceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-white/[0.03]",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5" />
          Recommended
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3" />
          {source.contentAccess}
        </span>
      </div>

      <Link href={`/source/${source.slug}`}>
        <h3 className="mb-2 text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
          {source.name}
        </h3>
      </Link>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {source.whyFollow}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {source.topics.map((t) => (
          <Badge key={t} variant="secondary" className="text-[11px]">
            {TOPIC_MAP.get(t)?.name ?? t}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3">
        <Link
          href={`/source/${source.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Learn more
        </Link>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Visit source <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
