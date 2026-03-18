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
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isActive = selected.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
              "hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
