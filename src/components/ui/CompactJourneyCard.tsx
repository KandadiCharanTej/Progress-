"use client";

import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CompactJourneyCardProps {
  title: string;
  overallProgress: number;
  href: string;
  icon: LucideIcon;
  badgeTag: string;
}

export function CompactJourneyCard({
  title,
  overallProgress,
  href,
  icon: Icon,
  badgeTag,
}: CompactJourneyCardProps) {
  return (
    <Link href={href} className="group block w-full">
      <div className="os-card p-3 flex items-center justify-between transition-all hover:border-[var(--accent-purple)]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-colors">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                {title}
              </h3>
              <span className="text-[9px] font-extrabold text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                {badgeTag}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2.5">
              <div className="h-1.5 w-24 sm:w-28 rounded-full bg-[var(--bg-secondary)] overflow-hidden border border-[var(--border-color)]">
                <div
                  className="h-full rounded-full bg-[var(--accent-purple)]"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-extrabold text-[var(--accent-purple)]">{overallProgress}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--text-secondary)] group-hover:text-[var(--accent-purple)] transition-colors">
          <span className="hidden sm:inline">Open Dashboard</span>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200 text-[var(--accent-purple)]" />
        </div>
      </div>
    </Link>
  );
}
