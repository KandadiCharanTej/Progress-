"use client";

import { Calendar, Target, Flag, Clock } from "lucide-react";

interface MissionCardProps {
  daysRemaining?: number;
  overallProgress?: number;
  currentPhase?: string;
}

export function MissionCard({
  daysRemaining = 304,
  overallProgress = 34,
  currentPhase = "Phase 2: Core Engineering & Build",
}: MissionCardProps) {
  // Current date formatted string
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="os-card relative overflow-hidden p-4 bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--bg-secondary)] border-[var(--border-color)] flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent-purple)] animate-pulse" />
            <span className="text-micro font-extrabold text-[var(--accent-purple)] tracking-widest">
              Second Year Execution
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium bg-[var(--bg-secondary)] px-2.5 py-0.5 rounded-full border border-[var(--border-color)]">
            <Calendar className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
            <span>August 2026 → June 2027</span>
          </div>
        </div>

        {/* Mission Statement Header - Largest Element */}
        <div className="mt-2.5">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Primary Mission
          </span>
          <h2 className="text-lg md:text-xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mt-0.5">
            “Become an exceptional Software Engineer, Build Naavik, Become financially independent.”
          </h2>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[var(--border-color)]">
        {/* Days Remaining */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)]">
            <Clock className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase">Days Left</span>
            <span className="text-sm font-extrabold text-[var(--text-primary)] leading-none">{daysRemaining} Days</span>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)]">
            <Target className="h-3.5 w-3.5" />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--text-muted)] uppercase">
              <span>Progress</span>
              <span className="text-[var(--accent-purple)]">{overallProgress}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden border border-[var(--border-color)]">
              <div
                className="h-full rounded-full bg-[var(--accent-purple)] transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Phase */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)]">
            <Flag className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase">Current Phase</span>
            <span className="text-xs font-bold text-[var(--text-primary)] leading-none truncate block max-w-[130px]" title={currentPhase}>
              {currentPhase}
            </span>
          </div>
        </div>

        {/* Today's Date */}
        <div className="flex items-center gap-2 justify-end">
          <div className="text-right">
            <span className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase">Today</span>
            <span className="text-xs font-bold text-[var(--text-primary)] leading-none">{todayFormatted}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
