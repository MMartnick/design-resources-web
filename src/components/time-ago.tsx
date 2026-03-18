"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "@/lib/format";

interface TimeAgoProps {
  date: string;
  className?: string;
}

/**
 * Client-only relative time display.
 * Renders a static placeholder on the server / first paint,
 * then updates to the correct relative time on the client
 * to avoid hydration mismatches.
 */
export function TimeAgo({ date, className }: TimeAgoProps) {
  const [display, setDisplay] = useState<string>("");

  useEffect(() => {
    setDisplay(formatDistanceToNow(date));
    // Refresh every minute
    const interval = setInterval(() => {
      setDisplay(formatDistanceToNow(date));
    }, 60_000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <time dateTime={date} className={className} suppressHydrationWarning>
      {display || formatDate(date)}
    </time>
  );
}

/** Short fallback format for server/initial render */
function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
