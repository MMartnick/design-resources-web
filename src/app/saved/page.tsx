import type { Metadata } from "next";
import { SavedPageClient } from "@/components/saved-page-client";

export const metadata: Metadata = {
  title: "Saved Sources",
  description: "Your personal collection of saved design and development resources.",
};

export default function SavedPage() {
  return <SavedPageClient />;
}
