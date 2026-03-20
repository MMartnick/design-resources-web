import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Source } from "@/lib/types";
import { TOPIC_MAP } from "@/lib/constants";
import { SaveButton } from "@/components/save-button";

interface SourceCardProps {
  source: Source;
  className?: string;
}

export function SourceCard({ source, className }: SourceCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col border-t border-border pt-5 pb-6",
        className
      )}
    >
      {/* Title row */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="group/link min-w-0 flex-1">
          <h3 className="text-base font-bold leading-tight text-foreground group-hover/link:text-primary transition-colors">
            {source.name}
          </h3>
        </a>
        <SaveButton sourceId={source.id} />
      </div>

      {/* Description */}
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {source.description}
      </p>

      {/* Topics */}
      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
        {source.topics.map((t) => (
          <Link key={t} href={`/topic/${t}`} className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
            {TOPIC_MAP.get(t)?.name ?? t}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground/60">
          {source.contentAccess}
        </span>
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
