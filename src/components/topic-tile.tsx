import Link from "next/link";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import type { Topic } from "@/lib/types";

interface TopicTileProps {
  topic: Topic;
  count?: number;
  className?: string;
}

export function TopicTile({ topic, count, className }: TopicTileProps) {
  const Icon = getIcon(topic.icon);

  return (
    <Link
      href={`/topic/${topic.slug}`}
      className={cn(
        "group flex flex-col items-start rounded-2xl border border-border/60 bg-card p-5 transition-all",
        "hover:border-primary/30 hover:shadow-md hover:shadow-black/[0.03] dark:hover:shadow-white/[0.02]",
        className
      )}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <h3 className="mb-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
        {topic.name}
      </h3>
      {count !== undefined && (
        <p className="text-xs text-muted-foreground">{count} sources</p>
      )}
    </Link>
  );
}
