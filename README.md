# Designcurrent

**An editorially curated resource homebase for game dev, design, motion, publishing, and UX.**

Track the newest thinking, revisit the fundamentals, and keep your best sources in one place.

---

## Overview

Designcurrent is a hybrid of a curated directory, a latest-content aggregator, and a searchable knowledge homebase. It organizes the best resources across seven creative disciplines into a clean, fast, editorial-quality interface.

This is **not** a bookmark manager. It's a research tool for creative professionals who want high-signal sources without the noise.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui v4 |
| Icons | Lucide React |
| Validation | Zod |
| Theming | next-themes (dark mode) |
| Data | Live RSS feeds at build time + seed fallback |
| Feed Parsing | rss-parser |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Architecture

### Folder Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage (async server component)
│   ├── layout.tsx                # Root layout (header, footer, theme)
│   ├── about/page.tsx            # About page
│   ├── library/page.tsx          # Filterable source library
│   ├── saved/page.tsx            # Client-side saved sources
│   ├── topics/page.tsx           # Topics index
│   ├── categories/page.tsx       # Categories index
│   ├── topic/[slug]/page.tsx     # Dynamic topic pages
│   ├── category/[slug]/page.tsx  # Dynamic category pages
│   └── source/[slug]/page.tsx    # Source detail pages
├── components/                   # Shared UI components
│   ├── ui/                       # shadcn/ui primitives
│   ├── site-header.tsx           # Global header + inline mobile nav
│   ├── site-footer.tsx           # Global footer
│   ├── source-card.tsx           # Source display card
│   ├── feed-item-card.tsx        # Article/feed item card
│   ├── featured-source-card.tsx  # Highlighted source card
│   ├── topic-tile.tsx            # Topic navigation tile
│   ├── evergreen-shelf.tsx       # Evergreen resource shelf
│   ├── filter-chip-bar.tsx       # Filter chip UI
│   ├── search-field.tsx          # Search input
│   ├── section-heading.tsx       # Section heading component
│   ├── empty-state.tsx           # Empty state component
│   ├── save-button.tsx           # Bookmark/save button
│   ├── time-ago.tsx              # Client-side relative time display
│   ├── theme-provider.tsx        # Dark mode provider
│   ├── theme-toggle.tsx          # Dark/light toggle
│   ├── home-page-client.tsx      # Homepage client component
│   ├── library-page-client.tsx   # Library client component
│   └── saved-page-client.tsx     # Saved page client component
├── data/                         # Seed data
│   ├── sources.ts                # Source manifest (35 sources)
│   └── feed-items.ts             # Seed feed items (fallback data)
└── lib/                          # Shared logic
    ├── types.ts                  # TypeScript types
    ├── schemas.ts                # Zod validation schemas
    ├── constants.ts              # Topics, categories, site config
    ├── data.ts                   # Data access layer (async feed queries)
    ├── data-sources.ts           # Source queries (sync, client-safe)
    ├── utils.ts                  # Utility functions (cn, etc.)
    ├── icons.ts                  # Icon mapping
    ├── format.ts                 # Date formatting
    ├── time.ts                   # Time helpers
    ├── hooks/
    │   └── use-saved.ts          # localStorage save/bookmark hook
    └── feed/
        ├── index.ts              # Feed module exports
        ├── adapters.ts           # Feed ingestion adapters
        ├── rss-fetcher.ts        # Live RSS/Atom feed parser
        └── loader.ts             # File-cached build-time loader
```

### Data Model

**Source** — A curated resource (e.g., "Game Developer", "NN/g"). Each source has:
- Topics (1+): game-design, unity-game-dev, graphic-design, adobe-creative-cloud, motion-graphics, publication-design, ui-ux-design
- Categories (1+): news, tutorials, theory
- Source kind: official, independent, publication, community
- Metadata: update frequency, featured flag, evergreen flag, feed eligibility

**FeedItem** — A piece of content from a source (article, post, video). Contains:
- Title, summary, publish date, URL
- Associated topics and categories (inherited from source or overridden)
- Featured flag

### How Sources Are Modeled

Sources live in `src/data/sources.ts` as a typed TypeScript array. Each source object is strongly typed with the `Source` interface from `src/lib/types.ts` and validated by the Zod schema in `src/lib/schemas.ts`.

The data access layer (`src/lib/data.ts`) provides query functions over the seed data. These functions maintain the same signatures a database-backed implementation would use, making migration straightforward.

### Feed Ingestion Architecture

The feed system lives in `src/lib/feed/` and fetches **live RSS/Atom feeds at build time**:

```
rss-fetcher.ts   — Parses RSS/Atom via rss-parser with 15s timeout, image extraction, HTML stripping
loader.ts        — File-cached loader: fetches once, shares data across all 23+ build workers
adapters.ts      — Adapter pattern (RSSAdapter, CustomAdapter, ManualAdapter)
```

**How it works**:
1. At build time, `loader.ts` fetches all feed-enabled sources in parallel (6 concurrent)
2. Results are written to `.next/cache/feed/feed-items.json` — subsequent workers read from cache
3. Failed sources fall back to seed data from `src/data/feed-items.ts`
4. All feed items are deduplicated by URL and sorted by publish date

**Current status**: 13/15 feed-enabled sources return live data. ~100 live items per build.

### Homepage Feed Strategy

The homepage pulls latest items from a curated subset of feed-eligible sources (controlled by the `homepageFeedEligible` flag). High-frequency news sources like Game Developer, Unity Blog, and Smashing Magazine appear in the live feed.

Evergreen resources (NN/g, Laws of UX, GDC Vault, etc.) are surfaced in a dedicated "Evergreen Theory Shelf" instead of the live feed, preventing them from being buried by daily content.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, live feed, filters, featured sources, topic tiles, evergreen shelf |
| `/library` | Full source library with multi-dimensional filtering and sorting |
| `/topics` | Topic index page |
| `/topic/[slug]` | Topic detail with sources, feed items, and category sections |
| `/categories` | Category index page |
| `/category/[slug]` | Category detail cutting across all topics |
| `/source/[slug]` | Source detail with description, metadata, feed items, related sources |
| `/about` | About page explaining the site |
| `/saved` | Client-side saved sources (localStorage) |

## Adding Sources

1. Add a new entry to `src/data/sources.ts` following the `Source` type
2. Assign appropriate `topics`, `categories`, and flags
3. If the source has a feed, set `hasFeed: true`, `feedType`, and optionally `feedUrl`
4. Add mocked feed items to `src/data/feed-items.ts` (or wire up the live adapter)
5. Rebuild — the source will automatically appear in all relevant pages

## Deployment

### GitHub Pages (current)

The site is deployed as a static export to GitHub Pages via GitHub Actions.

Live at: **https://mmartnick.github.io/design-resources-web/**

```bash
# Build static export
npm run build
# Output is in the `out/` directory
```

The GitHub Actions workflow (`.github/workflows/nextjs.yml`) builds and deploys on every push to `main`.

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the repo to [vercel.com](https://vercel.com) for automatic deployments.

## Design Decisions

- **No auth / CMS for MVP** — sources are managed as code, not through an admin UI
- **Client-side saves** — localStorage keeps the MVP simple while providing the save/bookmark UX
- **Server components by default** — only pages with interactive filters/search use client components
- **Static generation** — all topic, category, and source pages are pre-rendered at build time
- **Modular adapters** — the feed system is designed to grow without touching existing code

## Next Steps

### Short term
- [x] ~~Wire up live RSS adapter with `rss-parser`~~ ✅
- [x] ~~File-based build cache for cross-worker feed deduplication~~ ✅
- [ ] Add scheduled rebuilds via GitHub Actions cron (daily/hourly)
- [ ] Add more sources to each topic area
- [ ] Implement server-side search with a lightweight search index

### Medium term
- [ ] Migrate data layer to Supabase or SQLite/Prisma
- [ ] Add API routes for feed ingestion (cron-triggered)
- [ ] Add pagination / infinite scroll for large result sets
- [ ] Add newsletter signup with a mail provider
- [ ] Add source suggestion form

### Long term
- [ ] Full-text search with relevance scoring
- [ ] User accounts with cloud-synced saved sources
- [ ] Editorial notes / curator annotations on sources
- [ ] Weekly digest email generation
- [ ] Analytics dashboard for source engagement

---

Built with Next.js, Tailwind CSS, shadcn/ui, and Lucide icons.
