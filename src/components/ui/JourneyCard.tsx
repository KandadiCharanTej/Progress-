"use client";

import { LucideIcon, ArrowRight, Target, Zap } from "lucide-react";
import Link from "next/link";

interface JourneyCardProps {
  title: string;
  overallProgress: number;
  todayProgress: number;
  currentGoal: string;
  currentFocus: string;
  href: string;
  icon: LucideIcon;
  badgeTag: string;
}

export function JourneyCard({
  title,
  overallProgress,
  todayProgress,
  currentGoal,
  currentFocus,
  href,
  icon: Icon,
  badgeTag,
}: JourneyCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="os-card relative flex flex-col justify-between p-3.5 h-full transition-all duration-200 hover:border-[var(--accent-purple)]">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-colors">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                {title}
              </h3>
            </div>
            <span className="rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px] font-bold text-[var(--text-secondary)]">
              {badgeTag}
            </span>
          </div>

          {/* Progress Indicators */}
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="rounded-[8px] bg-[var(--bg-secondary)] p-1.5 border border-[var(--border-color)]">
              <div className="flex items-center justify-between text-[9px] font-bold text-[var(--text-muted)] uppercase">
                <span>Overall</span>
                <span className="text-[var(--accent-purple)]">{overallProgress}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--bg-card)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--accent-purple)] transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <div className="rounded-[8px] bg-[var(--bg-secondary)] p-1.5 border border-[var(--border-color)]">
              <div className="flex items-center justify-between text-[9px] font-bold text-[var(--text-muted)] uppercase">
                <span>Today</span>
                <span className="text-emerald-400">{todayProgress}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--bg-card)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${todayProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Current Goal & Focus */}
          <div className="mt-2.5 flex flex-col gap-1 text-left">
            <div className="flex items-center gap-1.5">
              <Target className="h-3 w-3 shrink-0 text-[var(--accent-purple)]" />
              <span className="text-[11px] font-bold text-[var(--text-primary)] truncate" title={currentGoal}>
                {currentGoal}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 shrink-0 text-[var(--text-muted)]" />
              <span className="text-[10px] text-[var(--text-secondary)] truncate" title={currentFocus}>
                {currentFocus}
              </span>
            </div>
          </div>
        </div>

        {/* Link Footer */}
        <div className="mt-2.5 flex items-center justify-between border-t border-[var(--border-color)] pt-2 text-[11px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-purple)]">
          <span>Open Journey Hub</span>
          <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-200 text-[var(--accent-purple)]" />
        </div>
      </div>
    </Link>
  );
}
