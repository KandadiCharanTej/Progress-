"use client";

import { useTasks } from "@/context/TaskContext";
import { Target, Trophy, Plus } from "lucide-react";

export function ExecutionHighlights() {
  const { weeklyGoal, yesterdaysWin, incrementWeeklyGoal } = useTasks();

  const goalPercent = Math.round((weeklyGoal.current / weeklyGoal.total) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {/* Weekly Goal Card */}
      <div className="os-card p-3 border-[var(--border-color)] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
              <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
                Weekly Goal
              </span>
            </div>
            <button
              onClick={incrementWeeklyGoal}
              className="text-[10px] font-extrabold text-[var(--accent-purple)] hover:underline flex items-center gap-0.5"
              title="Increment progress"
            >
              <Plus className="h-3 w-3" />
              <span>Log</span>
            </button>
          </div>
          <h4 className="text-xs font-extrabold text-[var(--text-primary)] leading-tight">
            {weeklyGoal.title}
          </h4>
        </div>

        <div className="mt-2.5">
          <div className="flex items-center justify-between text-[10px] font-extrabold text-[var(--text-secondary)] mb-1">
            <span>Progress</span>
            <span className="text-[var(--accent-purple)]">{weeklyGoal.current} / {weeklyGoal.total} ({goalPercent}%)</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden border border-[var(--border-color)]">
            <div
              className="h-full rounded-full bg-[var(--accent-purple)] transition-all duration-300"
              style={{ width: `${goalPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Yesterday's Win Card */}
      <div className="os-card p-3 border-[var(--border-color)] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
              Yesterday's Win
            </span>
          </div>
          <h4 className="text-xs font-extrabold text-[var(--text-primary)] leading-tight">
            {yesterdaysWin}
          </h4>
        </div>
        <div className="mt-2 text-[10px] font-semibold text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
          <span>✓ Verified Achievement</span>
        </div>
      </div>
    </div>
  );
}
