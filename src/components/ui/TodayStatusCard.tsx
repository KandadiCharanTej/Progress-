"use client";

import { useTasks } from "@/context/TaskContext";
import { Flame, Target, Clock, Calendar } from "lucide-react";

export function TodayStatusCard() {
  const { tasks } = useTasks();

  // Dynamic Date Calculation for Days Remaining
  const now = new Date();
  const endDate = new Date(2027, 5, 30); // June 30, 2027
  const timeRemaining = Math.max(0, endDate.getTime() - now.getTime());
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  const completedCount = tasks.filter((t) => t.completed).length;
  const deepWorkHours = (completedCount * 1.25).toFixed(1);

  return (
    <div className="rounded-[16px] p-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--accent-purple)]" />
          <span className="text-xs font-extrabold text-[var(--text-primary)]">
            Today's Status
          </span>
        </div>
        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
          Live Tracker
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Streak */}
        <div className="flex items-center gap-2 rounded-[10px] bg-[var(--bg-secondary)] px-2.5 py-1.5 border border-[var(--border-color)]">
          <Flame className="h-4 w-4 text-amber-500 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[9px] font-extrabold text-[var(--text-muted)] uppercase">
              Streak
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">
              14 Days 🔥
            </span>
          </div>
        </div>

        {/* Focus */}
        <div className="flex items-center gap-2 rounded-[10px] bg-[var(--bg-secondary)] px-2.5 py-1.5 border border-[var(--border-color)]">
          <Target className="h-4 w-4 text-[var(--accent-purple)] shrink-0" />
          <div className="min-w-0">
            <span className="block text-[9px] font-extrabold text-[var(--text-muted)] uppercase">
              Focus
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">
              Software Eng.
            </span>
          </div>
        </div>

        {/* Deep Work */}
        <div className="flex items-center gap-2 rounded-[10px] bg-[var(--bg-secondary)] px-2.5 py-1.5 border border-[var(--border-color)]">
          <Clock className="h-4 w-4 text-blue-400 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[9px] font-extrabold text-[var(--text-muted)] uppercase">
              Deep Work
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">
              {deepWorkHours}h Completed
            </span>
          </div>
        </div>

        {/* Days Left */}
        <div className="flex items-center gap-2 rounded-[10px] bg-[var(--bg-secondary)] px-2.5 py-1.5 border border-[var(--border-color)]">
          <Calendar className="h-4 w-4 text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[9px] font-extrabold text-[var(--text-muted)] uppercase">
              Days Left
            </span>
            <span className="text-xs font-bold text-[var(--text-primary)] truncate">
              {daysRemaining} Days Left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
