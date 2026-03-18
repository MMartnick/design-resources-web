"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSaved } from "@/lib/hooks/use-saved";

interface SaveButtonProps {
  sourceId: string;
  className?: string;
}

export function SaveButton({ sourceId, className }: SaveButtonProps) {
  const { isSaved, toggle } = useSaved(sourceId);

  return (
    <button
      onClick={toggle}
      aria-label={isSaved ? "Remove from saved" : "Save source"}
      className={cn(
        "shrink-0 rounded-lg p-1.5 transition-colors",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSaved
          ? "text-primary"
          : "text-muted-foreground/50 hover:text-muted-foreground",
        className
      )}
    >
      <Bookmark
        className={cn("h-4 w-4", isSaved && "fill-current")}
      />
    </button>
  );
}
