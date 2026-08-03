"use client";

import { useStudy } from "@/context/StudyContext";
import { Flame, Clock, BookOpen, Zap } from "lucide-react";

export function StudyConsistencyCard() {
  const { consistency } = useStudy();

  const metrics = [
    { title: "Study Days", value: `${consistency.days} Days`, icon: BookOpen, color: "text-blue-500" },
    { title: "Study Hours", value: `${consistency.hours} hrs`, icon: Clock, color: "text-purple-500" },
    { title: "Deep Work", value: `${consistency.deepWork} hrs`, icon: Zap, color: "text-emerald-500" },
    { title: "Current Streak", value: `${consistency.streak} Days 🔥`, icon: Flame, color: "text-amber-500" },
  ];

  return (
    <div className="os-card p-4 border-[var(--border-color)] flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] mb-2">
        <span className="text-micro font-extrabold text-[var(--accent-purple)] tracking-wider uppercase">
          Study Consistency
        </span>
        <span className="text-[10px] font-bold text-[var(--text-muted)]">Live Metrics</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 rounded-[10px] bg-[var(--bg-secondary)] p-2.5 border border-[var(--border-color)]"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[var(--bg-card)] border border-[var(--border-color)]">
                <Icon className={`h-3.5 w-3.5 ${m.color}`} />
              </div>
              <div>
                <span className="block text-[9px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
                  {m.title}
                </span>
                <span className="text-xs font-extrabold text-[var(--text-primary)] leading-tight">
                  {m.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
