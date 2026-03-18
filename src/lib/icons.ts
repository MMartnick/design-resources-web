import {
  Gamepad2,
  Box,
  Palette,
  Layers,
  Film,
  BookOpen,
  MousePointerClick,
  Newspaper,
  GraduationCap,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Gamepad2,
  Box,
  Palette,
  Layers,
  Film,
  BookOpen,
  MousePointerClick,
  Newspaper,
  GraduationCap,
  Lightbulb,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Box;
}
