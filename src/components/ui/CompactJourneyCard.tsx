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
      <div className="rounded-[14px] p-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-between transition-all hover:border-[var(--accent-purple)] shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-colors">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                {title}
              </h3>
              <span className="text-[9px] font-bold text-[var(--text-muted)] bg-[var(--bg-secondary)] px-1.5 py-0.2 rounded border border-[var(--border-color)]">
                {badgeTag}
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-[var(--bg-secondary)] overflow-hidden border border-[var(--border-color)]">
                <div
                  className="h-full rounded-full bg-[var(--accent-purple)]"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-extrabold text-[var(--accent-purple)]">{overallProgress}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-purple)]">
          <span className="hidden sm:inline">Open</span>
          <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-200 text-[var(--accent-purple)]" />
        </div>
      </div>
    </Link>
  );
}
