import { ExternalLink } from "lucide-react";
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
        "group flex flex-col border-t-2 border-primary pt-5 pb-6",
        className
      )}
    >
      <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
        Recommended
      </span>

      <a href={source.url} target="_blank" rel="noopener noreferrer">
        <h3 className="mb-2 text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
          {source.name}
        </h3>
      </a>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {source.whyFollow}
      </p>

      <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1">
        {source.topics.map((t) => (
          <span key={t} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {TOPIC_MAP.get(t)?.name ?? t}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
        >
          Visit <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
