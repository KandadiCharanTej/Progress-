"use client";

import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  metric: string;
  subtext?: string;
  icon: LucideIcon;
  badgeTag?: string;
  progressPercent?: number;
  className?: string;
}

export function MetricCard({
  title,
  metric = "—",
  subtext,
  icon: Icon,
  badgeTag,
  progressPercent,
  className = "",
}: MetricCardProps) {
  return (
    <div className={`os-card flex flex-col justify-between p-3.5 md:p-4 ${className}`}>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-micro font-semibold text-[var(--accent-purple)]">
            {badgeTag || "Metric"}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)]">
            <Icon className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="mt-2.5">
          <div className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] leading-none">
            {metric}
          </div>
          <div className="mt-1 text-xs font-semibold text-[var(--text-primary)]">
            {title}
          </div>
          {subtext && (
            <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
              {subtext}
            </p>
          )}
        </div>
      </div>

      {progressPercent !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-medium text-[var(--text-muted)] mb-1">
            <span>Velocity</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent-purple)] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
