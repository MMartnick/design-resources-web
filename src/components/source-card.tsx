import Link from "next/link";
import { ExternalLink, Signal, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Source } from "@/lib/types";
import { TOPIC_MAP, CATEGORY_MAP } from "@/lib/constants";
import { SaveButton } from "@/components/save-button";

interface SourceCardProps {
  source: Source;
  className?: string;
}

const frequencyLabel: Record<string, string> = {
  high: "Updated often",
  medium: "Regular updates",
  low: "Updated occasionally",
};

const kindLabel: Record<string, string> = {
  official: "Official",
  independent: "Independent",
  publication: "Publication",
  community: "Community",
};

export function SourceCard({ source, className }: SourceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all",
        "hover:border-border hover:shadow-md hover:shadow-black/[0.03] dark:hover:shadow-white/[0.02]",
        className
      )}
    >
      {/* Top row */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="group/link min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-foreground group-hover/link:text-primary transition-colors line-clamp-2">
            {source.name}
          </h3>
        </a>
        <SaveButton sourceId={source.id} />
      </div>

      {/* Free access badge */}
      <div className="mb-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3" />
          {source.contentAccess}
        </span>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {source.description}
      </p>

      {/* Why follow */}
      <p className="mb-4 text-xs italic leading-relaxed text-muted-foreground/80 line-clamp-2">
        &ldquo;{source.whyFollow}&rdquo;
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {source.topics.map((t) => (
          <Link key={t} href={`/topic/${t}`}>
            <Badge variant="secondary" className="text-[11px] font-medium hover:bg-primary/10 transition-colors">
              {TOPIC_MAP.get(t)?.name ?? t}
            </Badge>
          </Link>
        ))}
        {source.categories.map((c) => (
          <Link key={c} href={`/category/${c}`}>
            <Badge variant="outline" className="text-[11px] font-medium hover:bg-primary/10 transition-colors">
              {CATEGORY_MAP.get(c)?.name ?? c}
            </Badge>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 pt-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Signal className="h-3 w-3" />
            {frequencyLabel[source.updateFrequency]}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
            {kindLabel[source.sourceKind]}
          </span>
        </div>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Visit source <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
