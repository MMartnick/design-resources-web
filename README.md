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
| Data | Local seed data (designed for database migration) |

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
│   ├── page.tsx                  # Homepage
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
│   ├── site-header.tsx           # Global header + mobile nav
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
│   ├── theme-provider.tsx        # Dark mode provider
│   ├── theme-toggle.tsx          # Dark/light toggle
│   ├── home-page-client.tsx      # Homepage client component
│   ├── library-page-client.tsx   # Library client component
│   └── saved-page-client.tsx     # Saved page client component
├── data/                         # Seed data
│   ├── sources.ts                # Source manifest (35 sources)
│   └── feed-items.ts             # Mocked feed items (25+ articles)
└── lib/                          # Shared logic
    ├── types.ts                  # TypeScript types
    ├── schemas.ts                # Zod validation schemas
    ├── constants.ts              # Topics, categories, site config
    ├── data.ts                   # Data access layer (queries)
    ├── utils.ts                  # Utility functions (cn, etc.)
    ├── icons.ts                  # Icon mapping
    ├── format.ts                 # Date formatting
    ├── time.ts                   # Time helpers
    ├── hooks/
    │   └── use-saved.ts          # localStorage save/bookmark hook
    └── feed/
        ├── index.ts              # Feed adapter exports
        └── adapters.ts           # Feed ingestion adapters
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

The feed adapter system lives in `src/lib/feed/`:

```
FeedAdapter (interface)
├── RSSAdapter      — handles RSS/Atom feeds
├── CustomAdapter   — handles source-specific APIs
└── ManualAdapter   — handles static/curated content
```

**For MVP**: All adapters return mocked data from `src/data/feed-items.ts`.

**To wire up live feeds**:
1. Implement the `fetch()` method in each adapter
2. Add an RSS parser (e.g., `rss-parser` or custom XML parsing)
3. Call `ingestAll()` or `ingestSource()` on a schedule
4. Store results in a database (Supabase, SQLite/Prisma, etc.)

The adapter registry maps feed types to adapter instances, so adding new adapter types is a one-line registration.

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

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the repo to [vercel.com](https://vercel.com) for automatic deployments.

### Self-hosted

```bash
npm run build
npm start
```

The app runs as a standard Node.js server. All pages are statically generated at build time with ISR support.

## Design Decisions

- **No auth / CMS for MVP** — sources are managed as code, not through an admin UI
- **Client-side saves** — localStorage keeps the MVP simple while providing the save/bookmark UX
- **Server components by default** — only pages with interactive filters/search use client components
- **Static generation** — all topic, category, and source pages are pre-rendered at build time
- **Modular adapters** — the feed system is designed to grow without touching existing code

## Next Steps

### Short term
- [ ] Wire up live RSS adapter with `rss-parser`
- [ ] Add scheduled revalidation for feed items (`revalidate` in route segments)
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
