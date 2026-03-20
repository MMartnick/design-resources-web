import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Source } from "@/lib/types";
import { TOPIC_MAP } from "@/lib/constants";

interface EvergreenShelfProps {
  sources: Source[];
  className?: string;
}

export function EvergreenShelf({ sources, className }: EvergreenShelfProps) {
  if (sources.length === 0) return null;

  return (
    <section className={cn("", className)}>
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-tight">
          Evergreen Resources
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Foundational free resources that stay valuable regardless of when you find them.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className="group flex items-start justify-between gap-3 border-t border-border py-4 pr-4"
          >
            <div className="min-w-0 flex-1">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-foreground hover:text-primary transition-colors"
              >
                {source.name}
              </a>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                {source.whyFollow}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-x-2">
                {source.topics.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    {TOPIC_MAP.get(t)?.name ?? t}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors mt-0.5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
