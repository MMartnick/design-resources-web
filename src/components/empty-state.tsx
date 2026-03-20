import { cn } from "@/lib/utils";
import { Search, Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: "search" | "inbox";
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
  className,
  children,
}: EmptyStateProps) {
  const Icon = icon === "search" ? Search : Inbox;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <Icon className="mb-4 h-6 w-6 text-muted-foreground" />
      <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
