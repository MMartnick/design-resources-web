import type { Metadata } from "next";
import { LibraryPageClient } from "@/components/library-page-client";

export const metadata: Metadata = {
  title: "Source Library",
  description: "Browse and filter every curated source in the Designcurrent network.",
};

export default function LibraryPage() {
  return <LibraryPageClient />;
}
