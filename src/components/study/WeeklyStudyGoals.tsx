"use client";

import { useStudy } from "@/context/StudyContext";
import { Check, Target } from "lucide-react";

export function WeeklyStudyGoals() {
  const { weeklyGoals, toggleGoal } = useStudy();

  return (
    <div className="os-card p-4 border-[var(--border-color)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
            <span className="text-xs font-extrabold text-[var(--text-primary)]">
              Weekly Study Goals
            </span>
          </div>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            {weeklyGoals.filter((g) => g.completed).length}/{weeklyGoals.length} Done
          </span>
        </div>

        <div className="mt-2.5 flex flex-col gap-2">
          {weeklyGoals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`flex items-center justify-between rounded-[8px] p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] cursor-pointer hover:border-[var(--accent-purple)] transition-all ${
                goal.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <button
                  className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    goal.completed
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-[var(--border-color)] text-transparent"
                  }`}
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                </button>
                <span
                  className={`text-xs font-bold truncate ${
                    goal.completed
                      ? "line-through text-[var(--text-muted)]"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {goal.title}
                </span>
              </div>

              <span className="text-[10px] font-extrabold text-[var(--accent-purple)] shrink-0 ml-2">
                {goal.current}/{goal.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
