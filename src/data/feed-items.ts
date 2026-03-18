import type { FeedItem } from "@/lib/types";

/** Mocked feed items for MVP. Replace with live adapter ingestion later. */
export const feedItems: FeedItem[] = [
  // ── Game Design ──────────────────────────────────────
  {
    id: "fi-001",
    sourceId: "src-game-developer",
    title: "Postmortem: What Worked and What Didn't in Hades II's Early Access",
    url: "https://www.gamedeveloper.com/design/hades-ii-postmortem",
    summary:
      "Supergiant Games shares candid insights on the design decisions, player feedback loops, and systemic complexity behind Hades II's ambitious early access launch.",
    publishedAt: "2026-03-17T14:00:00Z",
    topics: ["game-design"],
    categories: ["theory"],
    isFeatured: true,
  },
  {
    id: "fi-002",
    sourceId: "src-game-developer",
    title: "The Rise of Analog-Inspired Mechanics in Digital Games",
    url: "https://www.gamedeveloper.com/design/analog-mechanics",
    summary:
      "How board game and tabletop design principles are reshaping digital game design — from deckbuilders to dice-based systems.",
    publishedAt: "2026-03-15T10:00:00Z",
    topics: ["game-design"],
    categories: ["theory"],
    isFeatured: false,
  },
  {
    id: "fi-003",
    sourceId: "src-gdc-news",
    title: "GDC 2026 Announces Game Design Workshop Track",
    url: "https://gdconf.com/news/gdc-2026-design-workshop",
    summary:
      "The 2026 Game Developers Conference reveals an expanded design workshop track focused on systems design, accessibility, and narrative tooling.",
    publishedAt: "2026-03-16T09:00:00Z",
    topics: ["game-design"],
    categories: ["news"],
    isFeatured: true,
  },
  {
    id: "fi-004",
    sourceId: "src-game-developer",
    title: "Five Lessons from Teaching Game Design to Non-Designers",
    url: "https://www.gamedeveloper.com/design/teaching-game-design",
    summary:
      "A veteran educator shares frameworks that make game design concepts click for engineers, artists, and writers new to design thinking.",
    publishedAt: "2026-03-13T12:00:00Z",
    topics: ["game-design"],
    categories: ["theory"],
    isFeatured: false,
  },

  // ── Unity Game Dev ───────────────────────────────────
  {
    id: "fi-010",
    sourceId: "src-unity-blog",
    title: "Unity 6.1 Is Here: Performance, Multiplayer, and New Rendering Features",
    url: "https://blog.unity.com/engine-platform/unity-6-1-release",
    summary:
      "A comprehensive look at the major features shipping in Unity 6.1, including GPU Resident Drawer improvements, enhanced Netcode, and HDRP updates.",
    publishedAt: "2026-03-18T08:00:00Z",
    topics: ["unity-game-dev"],
    categories: ["news"],
    isFeatured: true,
  },
  {
    id: "fi-011",
    sourceId: "src-unity-blog",
    title: "Optimizing Draw Calls in Unity 6 with GPU Instancing",
    url: "https://blog.unity.com/engine-platform/gpu-instancing-guide",
    summary:
      "A practical deep-dive into reducing draw calls using GPU instancing in Unity 6, with benchmarks and real-world project examples.",
    publishedAt: "2026-03-14T11:00:00Z",
    topics: ["unity-game-dev"],
    categories: ["tutorials"],
    isFeatured: false,
  },
  {
    id: "fi-012",
    sourceId: "src-unity-blog",
    title: "How Studio XYZ Shipped a 100-Player Game with Netcode for GameObjects",
    url: "https://blog.unity.com/games/studio-xyz-netcode",
    summary:
      "A case study on how an indie team built and shipped a competitive multiplayer game using Unity's Netcode for GameObjects framework.",
    publishedAt: "2026-03-11T09:00:00Z",
    topics: ["unity-game-dev"],
    categories: ["news", "tutorials"],
    isFeatured: false,
  },

  // ── Graphic Design / Adobe ───────────────────────────
  {
    id: "fi-020",
    sourceId: "src-its-nice-that",
    title: "Pentagram Redesigns the Victoria & Albert Museum Identity",
    url: "https://www.itsnicethat.com/articles/pentagram-va-rebrand",
    summary:
      "A detailed look at Pentagram's sweeping rebrand of the V&A — from typography choices to the modular identity system built for digital and physical spaces.",
    publishedAt: "2026-03-17T16:00:00Z",
    topics: ["graphic-design"],
    categories: ["news"],
    isFeatured: true,
  },
  {
    id: "fi-021",
    sourceId: "src-creative-review",
    title: "The New Visual Language of Climate Communication",
    url: "https://www.creativereview.co.uk/climate-visual-language",
    summary:
      "How designers are moving beyond doom-and-gloom imagery to create hopeful, actionable visual communication about climate change.",
    publishedAt: "2026-03-16T13:00:00Z",
    topics: ["graphic-design"],
    categories: ["theory"],
    isFeatured: true,
  },
  {
    id: "fi-022",
    sourceId: "src-print-magazine",
    title: "Why Variable Fonts Are Finally Having Their Moment",
    url: "https://www.printmag.com/typography/variable-fonts-moment",
    summary:
      "Variable fonts went from technical curiosity to design essential. PRINT explores the typographers, tools, and trends driving adoption.",
    publishedAt: "2026-03-15T08:00:00Z",
    topics: ["graphic-design", "publication-design"],
    categories: ["news", "theory"],
    isFeatured: false,
  },
  {
    id: "fi-023",
    sourceId: "src-adobe-blog",
    title: "Adobe MAX 2026: Creative Cloud Updates You Need to Know",
    url: "https://blog.adobe.com/en/publish/2026/03/14/max-2026-cc-updates",
    summary:
      "A roundup of the biggest Creative Cloud announcements from Adobe MAX 2026, including Firefly 3.0, Photoshop generative tools, and Illustrator AI features.",
    publishedAt: "2026-03-14T15:00:00Z",
    topics: ["adobe-creative-cloud", "graphic-design"],
    categories: ["news"],
    isFeatured: true,
  },
  {
    id: "fi-024",
    sourceId: "src-adobe-blog",
    title: "What's New in Illustrator: March 2026 Update",
    url: "https://blog.adobe.com/en/publish/2026/03/12/illustrator-march-2026",
    summary:
      "Adobe Illustrator gets vector smoothing improvements, new AI-powered pattern generation, and enhanced SVG export options in the March update.",
    publishedAt: "2026-03-12T10:00:00Z",
    topics: ["adobe-creative-cloud"],
    categories: ["news"],
    isFeatured: false,
  },

  // ── Motion Graphics ──────────────────────────────────
  {
    id: "fi-030",
    sourceId: "src-motionographer",
    title: "Behind the Titles: The Animated Open for a New Streaming Series",
    url: "https://motionographer.com/2026/03/17/streaming-titles/",
    summary:
      "A breakdown of the creative process behind a striking animated title sequence — from storyboard to final composite in After Effects and Cinema 4D.",
    publishedAt: "2026-03-17T11:00:00Z",
    topics: ["motion-graphics"],
    categories: ["news"],
    isFeatured: true,
  },
  {
    id: "fi-031",
    sourceId: "src-motionographer",
    title: "Open Call: Motionographer Awards 2026 Submissions",
    url: "https://motionographer.com/2026/03/15/awards-2026/",
    summary:
      "The annual Motionographer Awards are open for submissions. Categories include commercial, broadcast, experimental, and student work.",
    publishedAt: "2026-03-15T09:00:00Z",
    topics: ["motion-graphics"],
    categories: ["news"],
    isFeatured: false,
  },
  {
    id: "fi-032",
    sourceId: "src-school-of-motion-blog",
    title: "After Effects vs. Motion: Which Should You Learn in 2026?",
    url: "https://www.schoolofmotion.com/blog/after-effects-vs-motion-2026",
    summary:
      "An honest comparison of Adobe After Effects and Apple Motion for different types of motion design work, with learning path recommendations.",
    publishedAt: "2026-03-14T14:00:00Z",
    topics: ["motion-graphics"],
    categories: ["tutorials", "theory"],
    isFeatured: false,
  },

  // ── Publication Design ───────────────────────────────
  {
    id: "fi-040",
    sourceId: "src-print-magazine",
    title: "The Independent Magazine Boom Is Not Slowing Down",
    url: "https://www.printmag.com/magazine-design/indie-mag-boom-2026",
    summary:
      "Despite digital dominance, independent print magazines are thriving. PRINT explores the economics, aesthetics, and community behind the movement.",
    publishedAt: "2026-03-16T10:00:00Z",
    topics: ["publication-design"],
    categories: ["news", "theory"],
    isFeatured: true,
  },
  {
    id: "fi-041",
    sourceId: "src-its-nice-that",
    title: "Inside the Design of a New Literary Quarterly",
    url: "https://www.itsnicethat.com/articles/literary-quarterly-design",
    summary:
      "A behind-the-scenes look at the typographic and layout decisions behind a beautifully designed new literary magazine launch.",
    publishedAt: "2026-03-13T15:00:00Z",
    topics: ["publication-design", "graphic-design"],
    categories: ["news"],
    isFeatured: false,
  },

  // ── UI/UX Design ─────────────────────────────────────
  {
    id: "fi-050",
    sourceId: "src-smashing-magazine",
    title: "Modern CSS Layout Patterns for Complex Dashboards",
    url: "https://www.smashingmagazine.com/2026/03/css-layout-dashboards/",
    summary:
      "A practical guide to building responsive, accessible dashboard layouts using CSS Grid, Container Queries, and modern CSS features.",
    publishedAt: "2026-03-18T07:00:00Z",
    topics: ["ui-ux-design"],
    categories: ["tutorials"],
    isFeatured: true,
  },
  {
    id: "fi-051",
    sourceId: "src-ux-collective",
    title: "Design Systems Are Infrastructure, Not Style Guides",
    url: "https://uxdesign.cc/design-systems-infrastructure",
    summary:
      "Why the best design systems function as shared infrastructure — and what happens when teams treat them as aesthetic exercises instead.",
    publishedAt: "2026-03-17T12:00:00Z",
    topics: ["ui-ux-design"],
    categories: ["theory"],
    isFeatured: true,
  },
  {
    id: "fi-052",
    sourceId: "src-google-design",
    title: "How Google Maps Redesigned Its Accessibility Layer",
    url: "https://design.google/library/maps-accessibility-redesign",
    summary:
      "The Google Maps design team shares how they rebuilt accessibility features from the ground up, including screen reader navigation and cognitive load reduction.",
    publishedAt: "2026-03-16T14:00:00Z",
    topics: ["ui-ux-design"],
    categories: ["theory", "news"],
    isFeatured: true,
  },
  {
    id: "fi-053",
    sourceId: "src-smashing-magazine",
    title: "The State of Web Accessibility in 2026",
    url: "https://www.smashingmagazine.com/2026/03/state-web-accessibility-2026/",
    summary:
      "A comprehensive look at where the web stands on accessibility — WCAG 3.0 updates, automated testing advances, and the gap between standards and reality.",
    publishedAt: "2026-03-14T08:00:00Z",
    topics: ["ui-ux-design"],
    categories: ["news", "theory"],
    isFeatured: false,
  },
  {
    id: "fi-054",
    sourceId: "src-ux-collective",
    title: "The Problem with 'User-Centered' Design Thinking",
    url: "https://uxdesign.cc/problem-user-centered-design",
    summary:
      "A thoughtful critique of user-centered design orthodoxy and an argument for expanding the frame to include systems, ecology, and community.",
    publishedAt: "2026-03-12T11:00:00Z",
    topics: ["ui-ux-design"],
    categories: ["theory"],
    isFeatured: false,
  },
  {
    id: "fi-055",
    sourceId: "src-google-design",
    title: "Material Design 3 Expressive: A New Direction for Android UI",
    url: "https://design.google/library/material-expressive",
    summary:
      "Google announces Material Expressive, a new layer within Material Design 3 that brings more personality and emotional range to Android interfaces.",
    publishedAt: "2026-03-10T10:00:00Z",
    topics: ["ui-ux-design"],
    categories: ["news"],
    isFeatured: false,
  },
];
