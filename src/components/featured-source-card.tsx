import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
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
      <div className="mb-3 flex items-center gap-2">
        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Featured
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
          Visit <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
