import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  icon?: LucideIcon;
  badge?: string;
}

export function PageHeader({
  title,
  subtitle,
  category,
  icon: Icon,
  badge = "Platform OS",
}: PageHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        {category && (
          <div className="mb-0.5 flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[var(--accent-purple)] uppercase">
            <span>{category}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-8.5 w-8.5 items-center justify-center rounded-[12px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)]">
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-[var(--text-secondary)]">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {badge && (
        <div className="mt-1 md:mt-0 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple)]" />
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}
