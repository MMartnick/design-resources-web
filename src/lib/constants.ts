import type { Topic, Category } from "./types";

export const SITE_NAME = "Designcurrent";
export const SITE_TAGLINE =
  "An editorially curated resource homebase for game dev, design, motion, publishing, and UX.";
export const SITE_DESCRIPTION =
  "Track the newest thinking, revisit the fundamentals, and keep your best sources in one place.";

export const TOPICS: Topic[] = [
  {
    slug: "game-design",
    name: "Game Design",
    description:
      "The art of designing systems, mechanics, and experiences that make games compelling. From narrative design to level theory, this is where play meets craft.",
    icon: "Gamepad2",
    color: "rose",
  },
  {
    slug: "unity-game-dev",
    name: "Unity Game Development",
    description:
      "Everything you need to build with Unity — from official documentation and the latest engine updates to advanced tutorials and community-driven techniques.",
    icon: "Box",
    color: "violet",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    description:
      "Visual communication at its finest. Typography, branding, layout, illustration, and the creative thinking behind the world's best graphic work.",
    icon: "Palette",
    color: "amber",
  },
  {
    slug: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    description:
      "Master the industry-standard creative toolset. Official tutorials, feature updates, workflow tips, and advanced techniques across Photoshop, Illustrator, InDesign, and more.",
    icon: "Layers",
    color: "blue",
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    description:
      "Where design meets animation. Explore the tools, techniques, and creative inspiration driving modern motion design and visual storytelling.",
    icon: "Film",
    color: "emerald",
  },
  {
    slug: "publication-design",
    name: "Publication Design",
    description:
      "The craft of designing magazines, books, and editorial layouts. Print culture, typography in long-form, and the evolving art of the page.",
    icon: "BookOpen",
    color: "orange",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    description:
      "User interface and experience design at every scale. Research methods, interaction patterns, design systems, and the principles that make digital products intuitive.",
    icon: "MousePointerClick",
    color: "sky",
  },
];

export const CATEGORIES: Category[] = [
  {
    slug: "news",
    name: "News",
    description:
      "The latest developments, announcements, and industry updates across design and development.",
    icon: "Newspaper",
  },
  {
    slug: "tutorials",
    name: "Tutorials",
    description:
      "Step-by-step guides, walkthroughs, and hands-on learning resources to sharpen your skills.",
    icon: "GraduationCap",
  },
  {
    slug: "theory",
    name: "Theory",
    description:
      "Deep dives into principles, frameworks, and foundational thinking that shape great creative work.",
    icon: "Lightbulb",
  },
];

export const TOPIC_MAP = new Map(TOPICS.map((t) => [t.slug, t]));
export const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.slug, c]));
