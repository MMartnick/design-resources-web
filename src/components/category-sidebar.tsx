"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATEGORIES, TOPIC_GROUPS, TOPIC_MAP } from "@/lib/constants";
import { getSourcesByTopic, getSourcesByCategory } from "@/lib/data-sources";

export function CategorySidebar() {
  const pathname = usePathname();

  return (
    <nav className="py-6 px-5" aria-label="Topics and categories">
      {/* Topics grouped */}
      {TOPIC_GROUPS.map((group, gi) => (
        <div key={group.name} className={cn(gi > 0 && "mt-6")}>
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {group.name}
          </h3>
          <ul className="space-y-0.5">
            {group.slugs.map((slug) => {
              const topic = TOPIC_MAP.get(slug);
              if (!topic) return null;
              const count = getSourcesByTopic(slug).length;
              const isActive = pathname === `/topic/${slug}`;
              return (
                <li key={slug}>
                  <Link
                    href={`/topic/${slug}`}
                    className={cn(
                      "flex items-center justify-between py-1.5 text-[13px] transition-colors border-l-2",
                      isActive
                        ? "border-primary text-foreground font-semibold pl-3"
                        : "border-transparent text-muted-foreground hover:text-foreground pl-3"
                    )}
                  >
                    <span className="truncate">{topic.name}</span>
                    <span className={cn(
                      "ml-2 text-[11px] tabular-nums shrink-0 font-normal",
                      isActive ? "text-foreground/60" : "text-muted-foreground/50"
                    )}>
                      {count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Divider */}
      <div className="my-6 border-t border-border" />

      {/* Content type */}
      <div>
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          By Type
        </h3>
        <ul className="space-y-0.5">
          {CATEGORIES.map((cat) => {
            const count = getSourcesByCategory(cat.slug).length;
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={cn(
                    "flex items-center justify-between py-1.5 text-[13px] transition-colors border-l-2",
                    isActive
                      ? "border-primary text-foreground font-semibold pl-3"
                      : "border-transparent text-muted-foreground hover:text-foreground pl-3"
                  )}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className={cn(
                    "ml-2 text-[11px] tabular-nums shrink-0 font-normal",
                    isActive ? "text-foreground/60" : "text-muted-foreground/50"
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
      <div className="mt-6 pt-6 border-t border-border">
        <ul className="space-y-0.5">
          {[
            { label: "Full Library", href: "/library" },
            { label: "Saved Sources", href: "/saved" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "block py-1.5 text-[13px] transition-colors",
                  pathname === link.href
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
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
