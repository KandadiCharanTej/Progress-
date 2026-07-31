import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-[18px] border border-dashed border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)] mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-xs text-[var(--text-secondary)] leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
