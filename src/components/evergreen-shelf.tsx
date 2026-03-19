import { ArrowUpRight, BookMarked } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
      <div className="mb-6 flex items-center gap-2">
        <BookMarked className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-bold tracking-tight">
          Evergreen Free Theory Shelf
        </h2>
      </div>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Foundational free resources that stay valuable regardless of when you find them. All content hosted by the original publishers.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className="group flex items-start gap-3 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-border hover:shadow-sm"
          >
            <BookMarked className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600/60 dark:text-emerald-400/60" />
            <div className="min-w-0 flex-1">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
              >
                {source.name}
              </a>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                {source.whyFollow}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {source.topics.slice(0, 2).map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px] px-1.5 py-0">
                    {TOPIC_MAP.get(t)?.name ?? t}
                  </Badge>
                ))}
              </div>
            </div>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
