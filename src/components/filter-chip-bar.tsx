"use client";

import { cn } from "@/lib/utils";

interface FilterChipBarProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (value: string) => void;
  className?: string;
}

export function FilterChipBar({
  options,
  selected,
  onChange,
  className,
}: FilterChipBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((option) => {
        const isActive = selected.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
