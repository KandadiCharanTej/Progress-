"use client";

import { useStudy } from "@/context/StudyContext";
import { Calendar, AlertCircle } from "lucide-react";

export function UpcomingDeadlines() {
  const { deadlines } = useStudy();

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Exam":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case "Hackathon":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "Certification":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="os-card p-4 border-[var(--border-color)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-extrabold text-[var(--text-primary)]">
              Upcoming Deadlines
            </span>
          </div>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            {deadlines.length} Upcoming
          </span>
        </div>

        <div className="mt-2.5 flex flex-col gap-2">
          {deadlines.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between rounded-[8px] p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)]"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[var(--text-primary)] truncate block">
                    {d.title}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">
                    {d.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full border ${getCategoryBadge(d.category)}`}>
                  {d.category}
                </span>
                <span className="text-[10px] font-extrabold text-amber-500">
                  {d.daysLeft}d left
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
