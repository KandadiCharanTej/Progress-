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
      color: "text-amber-500",
    },
    {
      title: "Focus",
      value: "System Architecture",
      icon: Target,
      color: "text-[var(--accent-purple)]",
    },
    {
      title: "Deep Work",
      value: `${(completedCount * 1.5).toFixed(1)} hrs`,
      icon: Clock,
      color: "text-blue-400",
    },
    {
      title: "Days Left",
      value: `${daysRemaining} Days`,
      icon: Calendar,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="os-card p-3 flex flex-col justify-between h-full border-[var(--border-color)]">
      <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border-color)]">
        <span className="text-micro font-extrabold text-[var(--accent-purple)]">
          Live Trackers
        </span>
        <span className="text-[10px] font-bold text-[var(--text-muted)]">4 Metrics</span>
      </div>

      <div className="flex flex-col gap-2 flex-1 justify-around my-0.5">
        {trackers.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between rounded-[8px] bg-[var(--bg-secondary)] px-2.5 py-1.5 border border-[var(--border-color)]"
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-3.5 w-3.5 ${t.color}`} />
                <div>
                  <span className="block text-[9px] font-extrabold text-[var(--text-muted)] uppercase">
                    {t.title}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-primary)] leading-tight">
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
