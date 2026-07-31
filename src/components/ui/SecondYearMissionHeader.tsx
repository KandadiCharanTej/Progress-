"use client";

import { Calendar, Clock, Target } from "lucide-react";

export function SecondYearMissionHeader() {
  // Dynamic Date Calculation
  const now = new Date();
  const endDate = new Date(2027, 5, 30); // June 30, 2027
  const startDate = new Date(2026, 7, 1); // August 1, 2026

  const totalTime = endDate.getTime() - startDate.getTime();
  const timePassed = Math.max(0, now.getTime() - startDate.getTime());
  const timeRemaining = Math.max(0, endDate.getTime() - now.getTime());

  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
  const overallProgress = Math.min(100, Math.round((timePassed / totalTime) * 100));

  const todayFormatted = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-[16px] p-3.5 md:p-4 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs">
      {/* Top Header Badge & Live Status Indicators */}
      <div className="flex items-center justify-between pb-1.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-purple)] animate-pulse" />
          <span className="text-micro font-extrabold text-[var(--accent-purple)] tracking-wider uppercase">
            Second Year
          </span>
          <span className="text-[11px] font-medium text-[var(--text-muted)]">
            • August 2026 → June 2027
          </span>
        </div>

        {/* Live Indicators */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 border border-[var(--border-color)] text-[11px]">
            <Clock className="h-3 w-3 text-amber-500" />
            <span className="text-[var(--text-muted)]">Days Left:</span>
            <strong className="text-[var(--text-primary)]">{daysRemaining}d</strong>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 border border-[var(--border-color)] text-[11px]">
            <Target className="h-3 w-3 text-[var(--accent-purple)]" />
            <span className="text-[var(--text-muted)]">Progress:</span>
            <strong className="text-[var(--accent-purple)]">{overallProgress}%</strong>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] font-semibold bg-[var(--bg-secondary)] px-2.5 py-0.5 rounded-full border border-[var(--border-color)]">
            <Calendar className="h-3 w-3 text-[var(--accent-purple)]" />
            <span>{todayFormatted}</span>
          </div>
        </div>
      </div>

      {/* Hero Mission Statement */}
      <div className="mt-1">
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">
          “Become an exceptional engineer, build meaningful products, achieve financial independence, and become the best version of myself.”
        </h1>
      </div>
    </div>
  );
}
