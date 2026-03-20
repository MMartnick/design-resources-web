import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TimeAgo } from "@/components/time-ago";
import { cn } from "@/lib/utils";
import type { FeedItem } from "@/lib/types";
import { getSourceById } from "@/lib/data-sources";
import { TOPIC_MAP } from "@/lib/constants";

interface FeedItemCardProps {
  item: FeedItem;
  className?: string;
  compact?: boolean;
}

export function FeedItemCard({ item, className, compact }: FeedItemCardProps) {
  const source = getSourceById(item.sourceId);

  return (
    <article
      className={cn(
        "group flex flex-col border-t border-border pt-4 pb-5",
        className
      )}
    >
      {/* Source + time */}
      <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        {source && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground/70 hover:text-primary transition-colors"
          >
            {source.name}
          </a>
        )}
        <span className="text-muted-foreground/40">/</span>
        <TimeAgo date={item.publishedAt} />
      </div>

      {/* Title */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/title"
      >
        <h3
          className={cn(
            "font-bold leading-snug text-foreground group-hover/title:text-primary transition-colors",
            compact ? "text-sm line-clamp-2 mb-1" : "text-[15px] line-clamp-3 mb-2"
          )}
        >
          {item.title}
        </h3>
      </a>

      {/* Excerpt */}
      {!compact && item.summary && (
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {item.summary}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex gap-3">
          {item.topics.slice(0, 2).map((t) => (
            <Link key={t} href={`/topic/${t}`} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
              {TOPIC_MAP.get(t)?.name ?? t}
            </Link>
          ))}
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
        >
          Read <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
