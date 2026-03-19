import type { Topic, Category, TopicGroup } from "./types";

export const SITE_NAME = "Designcurrent";
export const SITE_TAGLINE =
  "A personal curated library of free resources for game dev, design, motion, publishing, and UX.";
export const SITE_DESCRIPTION =
  "Track new ideas, revisit fundamentals, and keep your best free sources in one place. Built for study, research, and creative practice.";
export const SITE_DISCLAIMER =
  "All external content remains the property of its original publishers. This site provides links, metadata, and limited excerpts for personal discovery purposes only.";
export const SITE_CONTACT_EMAIL = "designcurrent@proton.me";

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
    slug: "typography",
    name: "Typography & Type Design",
    description:
      "The art and craft of selecting, setting, and designing type. Explore how letterforms shape communication — from editorial layouts to brand identities.",
    icon: "Type",
    color: "amber",
  },
  {
    slug: "branding-identity",
    name: "Branding & Visual Identity",
    description:
      "The discipline of building cohesive visual systems — logos, color, identity guidelines, and the strategic thinking behind memorable brands.",
    icon: "Stamp",
    color: "pink",
  },
  {
    slug: "illustration",
    name: "Illustration & Visual Art",
    description:
      "From editorial illustration to concept art and visual storytelling. Creative work, artist profiles, and the ideas behind compelling imagery.",
    icon: "PenTool",
    color: "fuchsia",
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

export const TOPIC_GROUPS: TopicGroup[] = [
  {
    name: "Game Development",
    icon: "Gamepad2",
    slugs: ["game-design", "unity-game-dev"],
  },
  {
    name: "Visual Design",
    icon: "Palette",
    slugs: ["typography", "branding-identity", "illustration"],
  },
  {
    name: "Digital Design",
    icon: "MousePointerClick",
    slugs: ["ui-ux-design"],
  },
  {
    name: "Motion & Video",
    icon: "Film",
    slugs: ["motion-graphics"],
  },
  {
    name: "Publishing",
    icon: "BookOpen",
    slugs: ["publication-design"],
  },
  {
    name: "Tools & Platforms",
    icon: "Layers",
    slugs: ["adobe-creative-cloud"],
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
