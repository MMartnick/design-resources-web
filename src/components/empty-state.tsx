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
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
