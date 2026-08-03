"use client";

import { useStudy } from "@/context/StudyContext";
import { Play, BookOpen, Target } from "lucide-react";

export function TodayStudyCard() {
  const { todayFocus, currentSession } = useStudy();

  return (
    <div className="os-card p-4 md:p-5 border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-purple)] animate-pulse" />
            <span className="text-micro font-extrabold text-[var(--accent-purple)] uppercase tracking-wider">
              Today's Study Focus
            </span>
          </div>
          <span className="text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
            {currentSession.pillar}
          </span>
        </div>

        <div className="mt-3">
          <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block">
            Subject & Module
          </span>
          <h2 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)] mt-0.5 leading-snug">
            {currentSession.topic}
          </h2>
          <p className="text-xs font-semibold text-[var(--text-secondary)] mt-1 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[var(--accent-purple)] shrink-0" />
            <span>{currentSession.module}</span>
          </p>
        </div>

        <div className="mt-3 p-2.5 rounded-[8px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <span className="text-[9px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider block mb-0.5">
            Today's Objective
          </span>
          <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <Target className="h-3 w-3 text-emerald-500 shrink-0" />
            <span>Master Page Replacement & Virtual Memory Isolation</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full os-btn py-2.5 bg-[var(--accent-purple)] text-white text-xs font-extrabold flex items-center justify-center gap-2 hover:bg-[var(--accent-purple-hover)] shadow-xs transition-all">
          <Play className="h-4 w-4 fill-current" />
          <span>Continue Learning</span>
        </button>
      </div>
    </div>
  );
}
