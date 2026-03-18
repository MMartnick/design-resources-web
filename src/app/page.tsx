import { HomePageClient } from "@/components/home-page-client";
import {
  getLatestFeedItems,
  getFeaturedSources,
  getEvergreenSources,
  getAllSources,
  getAllFeedItems,
} from "@/lib/data";

export default async function HomePage() {
  // Fetch all data at build time (server side)
  const [latestFeedItems, allFeedItems, featuredSources, evergreenSources, allSources] =
    await Promise.all([
      getLatestFeedItems(20),
      getAllFeedItems(),
      Promise.resolve(getFeaturedSources()),
      Promise.resolve(getEvergreenSources()),
      Promise.resolve(getAllSources()),
    ]);

  return (
    <HomePageClient
      latestFeedItems={latestFeedItems}
      allFeedItems={allFeedItems}
      featuredSources={featuredSources}
      evergreenSources={evergreenSources}
      allSources={allSources}
    />
  );
}
