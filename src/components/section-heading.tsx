import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 pt-8 border-t border-border", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
