import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Topic } from "@/lib/types";

interface TopicTileProps {
  topic: Topic;
  count?: number;
  className?: string;
}

export function TopicTile({ topic, count, className }: TopicTileProps) {
  return (
    <Link
      href={`/topic/${topic.slug}`}
      className={cn(
        "group flex flex-col border-t-2 border-foreground p-4 transition-colors hover:border-primary",
        className
      )}
    >
      <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
        {topic.name}
      </h3>
      {count !== undefined && (
        <p className="text-xs text-muted-foreground">{count} sources</p>
      )}
    </Link>
  );
}
