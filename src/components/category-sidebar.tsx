"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import { TOPICS, CATEGORIES, TOPIC_GROUPS, TOPIC_MAP } from "@/lib/constants";
import { getSourcesByTopic, getSourcesByCategory } from "@/lib/data-sources";

export function CategorySidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 py-6 pr-2 pl-4" aria-label="Topics and categories">
      {/* Topics grouped */}
      <div>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          Topics
        </h3>
        <div className="space-y-4">
          {TOPIC_GROUPS.map((group) => {
            const GroupIcon = getIcon(group.icon);
            return (
              <div key={group.name}>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <GroupIcon className="h-3.5 w-3.5 text-muted-foreground/60" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    {group.name}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {group.slugs.map((slug) => {
                    const topic = TOPIC_MAP.get(slug);
                    if (!topic) return null;
                    const Icon = getIcon(topic.icon);
                    const count = getSourcesByTopic(slug).length;
                    const isActive = pathname === `/topic/${slug}`;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/topic/${slug}`}
                          className={cn(
                            "group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <Icon className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{topic.name}</span>
                          </span>
                          <span className={cn(
                            "ml-2 text-[11px] tabular-nums shrink-0",
                            isActive ? "text-primary/70" : "text-muted-foreground/50"
                          )}>
                            {count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border/40" />

      {/* Content type */}
      <div>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          Content Type
        </h3>
        <ul className="space-y-0.5">
          {CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.icon);
            const count = getSourcesByCategory(cat.slug).length;
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <span className={cn(
                    "ml-2 text-[11px] tabular-nums shrink-0",
                    isActive ? "text-primary/70" : "text-muted-foreground/50"
                  )}>
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quick links */}
      <div className="border-t border-border/40 pt-4">
        <ul className="space-y-0.5">
          {[
            { label: "Full Library", href: "/library" },
            { label: "Saved Sources", href: "/saved" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "block rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
