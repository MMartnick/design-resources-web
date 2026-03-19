import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
        "group relative flex flex-col rounded-xl border border-border/50 bg-card p-4 transition-all",
        "hover:border-border hover:shadow-md hover:shadow-black/[0.03] dark:hover:shadow-white/[0.02]",
        compact && "p-3",
        className
      )}
    >
      {/* Source attribution + time */}
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        {source && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            {source.name}
          </a>
        )}
        <span className="text-border">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <TimeAgo date={item.publishedAt} />
        </span>
      </div>

      {/* Title — links to original publisher */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/title"
      >
        <h3
          className={cn(
            "font-semibold leading-snug text-foreground group-hover/title:text-primary transition-colors",
            compact ? "text-sm line-clamp-2 mb-1" : "text-[15px] line-clamp-3 mb-2"
          )}
        >
          {item.title}
        </h3>
      </a>

      {/* Short excerpt (discovery only) */}
      {!compact && item.summary && (
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {item.summary}
        </p>
      )}

      {/* Tags + outbound link */}
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {item.topics.slice(0, 2).map((t) => (
            <Link key={t} href={`/topic/${t}`}>
              <Badge
                variant="secondary"
                className="text-[10px] font-medium px-2 py-0 hover:bg-primary/10 transition-colors"
              >
                {TOPIC_MAP.get(t)?.name ?? t}
              </Badge>
            </Link>
          ))}
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-opacity"
        >
          Read at source <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}
