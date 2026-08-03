"use client";

import { useTasks } from "@/context/TaskContext";
import { Calendar, Clock, Target, Compass } from "lucide-react";

export function SecondYearMissionHeader() {
  const { todayPrinciple } = useTasks();

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
    <div className="os-card relative overflow-hidden p-3.5 md:p-4 bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--bg-secondary)] border-[var(--border-color)]">
      {/* Top Purple Accent Glow Strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-[var(--accent-purple)] to-indigo-500" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-purple)] animate-pulse" />
          <span className="text-micro font-extrabold text-[var(--accent-purple)] tracking-wider uppercase">
            Second Year Execution
          </span>
          <span className="hidden sm:inline-block text-[11px] text-[var(--text-muted)] font-bold">
            (August 2026 → June 2027)
          </span>
        </div>

        {/* Today's Principle Pill & Live Indicators */}
        <div className="flex items-center gap-2">
          {/* Today's Principle */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-0.5 border border-amber-500/20 text-[11px] font-bold">
            <Compass className="h-3.5 w-3.5" />
            <span>Principle: "{todayPrinciple}"</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 border border-[var(--border-color)] text-[11px]">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[var(--text-muted)] font-medium">Days Left:</span>
            <strong className="text-[var(--text-primary)] font-extrabold">{daysRemaining}d</strong>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 border border-[var(--border-color)] text-[11px]">
            <Target className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
            <span className="text-[var(--text-muted)] font-medium">Progress:</span>
            <strong className="text-[var(--accent-purple)] font-extrabold">{overallProgress}%</strong>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] font-extrabold bg-[var(--bg-secondary)] px-2.5 py-0.5 rounded-full border border-[var(--border-color)]">
            <Calendar className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
            <span>{todayFormatted}</span>
          </div>
        </div>
      </div>

      {/* Large Hero Mission Quote */}
      <div className="mt-2">
        <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug">
          “Become an exceptional engineer, build meaningful products, achieve financial independence, and become the best version of myself.”
        </h1>
      </div>
    </div>
  );
}
