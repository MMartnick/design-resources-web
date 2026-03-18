import { formatDistanceToNow } from "@/lib/format";

/**
 * Format an ISO date string to a relative time string (e.g. "2 days ago").
 * Falls back to a formatted date if the date is too old.
 */
export function timeAgo(dateString: string): string {
  return formatDistanceToNow(dateString);
}
