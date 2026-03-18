import type { Metadata } from "next";
import { TopicTile } from "@/components/topic-tile";
import { TOPICS } from "@/lib/constants";
import { getSourcesByTopic } from "@/lib/data";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse curated design and development resources by topic.",
};

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Topics
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Seven core disciplines, each with handpicked sources for news,
          tutorials, and foundational theory. Pick a topic to start exploring.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TOPICS.map((topic) => {
          const count = getSourcesByTopic(topic.slug).length;
          return (
            <TopicTile key={topic.slug} topic={topic} count={count} />
          );
        })}
      </div>
    </div>
  );
}
