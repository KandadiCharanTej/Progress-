"use client";

import { useState } from "react";
import { Flame, BookOpen } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  deepWorkHours: number;
  studyHours: number;
  journal?: string;
  intensity: 0 | 1 | 2 | 3 | 4;
}

export function ContributionGraph() {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);

  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Generate 52 weeks x 7 days = 364 days of contribution data for Second Year
  const generateDays = (): ContributionDay[] => {
    const days: ContributionDay[] = [];
    const startDate = new Date(2026, 7, 1); // August 1, 2026

    for (let i = 0; i < 364; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const isPast = i <= 61; // First 61 days completed
      const count = isPast ? (i % 5) + 1 : 0;
      const deepWorkHours = isPast ? parseFloat(((i % 4) * 1.2 + 2).toFixed(1)) : 0;
      const studyHours = isPast ? parseFloat(((i % 3) * 1.1 + 1.5).toFixed(1)) : 0;
      
      let intensity: 0 | 1 | 2 | 3 | 4 = 0;
      if (count === 1 || count === 2) intensity = 1;
      else if (count === 3) intensity = 2;
      else if (count === 4) intensity = 3;
      else if (count >= 5) intensity = 4;

      days.push({
        date: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        count,
        deepWorkHours,
        studyHours,
        journal: isPast ? `Executed ${count} tasks with ${deepWorkHours}h deep work.` : undefined,
        intensity: isPast ? intensity : 0,
      });
    }

    return days;
  };

  const days = generateDays();

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1:
        return "bg-purple-900/40 border-purple-800/40";
      case 2:
        return "bg-purple-700/60 border-purple-600/50";
      case 3:
        return "bg-purple-500 border-purple-400";
      case 4:
        return "bg-purple-400 border-purple-300 shadow-[0_0_10px_#a855f7]";
      default:
        return "bg-[var(--bg-secondary)] border-[var(--border-color)] opacity-60";
    }
  };

  return (
    <div className="rounded-[16px] p-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] mb-1">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-[var(--accent-purple)]" />
          <span className="text-xs font-extrabold text-[var(--text-primary)]">
            Consistency Engine
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-medium">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-[var(--bg-secondary)] border border-[var(--border-color)]" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-purple-900/50 border border-purple-800/40" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-purple-700/60 border border-purple-600/50" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-purple-500 border border-purple-400" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-purple-400 border border-purple-300" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Month Headers */}
      <div className="flex items-center justify-between text-[10px] font-bold text-[var(--text-muted)] px-5 mb-1">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Contribution Grid */}
      <div className="relative flex items-center gap-2 flex-1 my-1">
        {/* Weekday Labels */}
        <div className="flex flex-col justify-between text-[9px] font-bold text-[var(--text-muted)] h-16 py-0.5">
          <span>M</span>
          <span>W</span>
          <span>F</span>
        </div>

        {/* 52 Columns x 7 Rows Grid */}
        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto no-scrollbar py-0.5 flex-1">
          {days.map((day, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              onClick={() => setSelectedDay(day)}
              className={`h-2.5 w-2.5 rounded-[2px] border transition-all cursor-pointer hover:scale-125 ${getIntensityColor(day.intensity)}`}
            />
          ))}
        </div>
      </div>

      {/* Hover / Active Day Details Bar */}
      <div className="mt-1 pt-1.5 border-t border-[var(--border-color)]">
        {hoveredDay || selectedDay ? (
          <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)] px-2.5 py-1 rounded-[8px] border border-[var(--border-color)]">
            <span>📅 {(hoveredDay || selectedDay)?.date}</span>
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <span>Tasks: <strong className="text-[var(--accent-purple)]">{(hoveredDay || selectedDay)?.count}</strong></span>
              <span>Deep Work: <strong className="text-[var(--text-primary)]">{(hoveredDay || selectedDay)?.deepWorkHours}h</strong></span>
              <span>Study: <strong className="text-[var(--text-primary)]">{(hoveredDay || selectedDay)?.studyHours}h</strong></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-medium">
            <BookOpen className="h-3 w-3 text-[var(--accent-purple)]" />
            <span>Hover over any day square for stats or click to view day journal.</span>
          </div>
        )}
      </div>
    </div>
  );
}
