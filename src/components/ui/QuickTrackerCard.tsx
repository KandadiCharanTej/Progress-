"use client";

import { useTasks } from "@/context/TaskContext";
import { Flame, Target, Clock, Calendar } from "lucide-react";

export function QuickTrackerCard() {
  const { tasks } = useTasks();

  // Dynamic Date Calculation for Days Remaining
  const now = new Date();
  const endDate = new Date(2027, 5, 30); // June 30, 2027
  const timeRemaining = Math.max(0, endDate.getTime() - now.getTime());
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  const completedCount = tasks.filter((t) => t.completed).length;

  const trackers = [
    {
      title: "Streak",
      value: "14 Days",
      icon: Flame,
      iconBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
    {
      title: "Focus",
      value: "System Architecture",
      icon: Target,
      iconBg: "bg-purple-500/10 text-[var(--accent-purple)] border-purple-500/20",
    },
    {
      title: "Deep Work",
      value: `${(completedCount * 1.5).toFixed(1)} hrs`,
      icon: Clock,
      iconBg: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
    },
    {
      title: "Days Left",
      value: `${daysRemaining} Days`,
      icon: Calendar,
      iconBg: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
    },
  ];

  return (
    <div className="os-card p-4 flex flex-col justify-between h-full border-[var(--border-color)]">
      <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-color)]">
        <span className="text-micro font-extrabold text-[var(--accent-purple)] tracking-wider uppercase">
          LIVE TRACKERS
        </span>
        <span className="text-[10px] font-extrabold text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full border border-[var(--border-color)]">
          4 Metrics
        </span>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 justify-around my-1.5">
        {trackers.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between rounded-[10px] bg-[var(--bg-secondary)] px-3 py-2.5 border border-[var(--border-color)] transition-all hover:border-[var(--accent-purple)]"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-[8px] border ${t.iconBg}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[9px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
                    {t.title}
                  </span>
                  <span className="text-xs font-extrabold text-[var(--text-primary)] leading-tight">
                    {t.value}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
