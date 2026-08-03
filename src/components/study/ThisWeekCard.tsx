"use client";

import { useStudy } from "@/context/StudyContext";
import { Calendar, Target, AlertCircle } from "lucide-react";

export function ThisWeekCard() {
  const { weeklyGoals, deadlines } = useStudy();

  const mainGoal = weeklyGoals[0] || { title: "Finish Operating Systems Module", current: 4, total: 5 };
  const completedCount = weeklyGoals.filter((g) => g.completed).length;
  const remainingCount = weeklyGoals.length - completedCount;

  const topDeadline = deadlines[0] || { title: "Operating Systems Midterm Exam", date: "Aug 8, 2026", daysLeft: 7 };

  return (
    <div className="os-card p-4 border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
            <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider">
              This Week
            </span>
          </div>
          <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Active Week
          </span>
        </div>

        {/* Weekly Goal */}
        <div className="mt-3">
          <span className="text-[9px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
            Weekly Objective
          </span>
          <h4 className="text-xs font-extrabold text-[var(--text-primary)] leading-tight flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[var(--accent-purple)] shrink-0" />
            <span>{mainGoal.title}</span>
          </h4>

          <div className="mt-2 flex items-center gap-3 text-[11px] font-bold text-[var(--text-secondary)]">
            <span className="text-emerald-500">Completed: {completedCount}</span>
            <span className="text-amber-500">Remaining: {remainingCount}</span>
          </div>
        </div>

        {/* Upcoming Deadline */}
        <div className="mt-3 p-2.5 rounded-[8px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <span className="text-[9px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
            Next Critical Deadline
          </span>
          <div className="flex items-center justify-between text-xs font-extrabold text-[var(--text-primary)]">
            <span className="flex items-center gap-1 truncate">
              <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
              <span className="truncate">{topDeadline.title}</span>
            </span>
            <span className="text-[10px] font-extrabold text-red-500 shrink-0 ml-1">
              {topDeadline.daysLeft}d left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
