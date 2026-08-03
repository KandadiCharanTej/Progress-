"use client";

import { useStudy } from "@/context/StudyContext";
import { BookOpen, Clock, ArrowRight, Play } from "lucide-react";

export function TodayStudyFocusCard() {
  const { todayFocus, setIsAiModalOpen } = useStudy();

  return (
    <div className="os-card relative overflow-hidden p-4 md:p-5 bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-card)] to-[var(--bg-secondary)] border-[var(--border-color)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-purple)] animate-pulse" />
          <span className="text-micro font-extrabold text-[var(--accent-purple)] tracking-wider uppercase">
            Today's Study Focus
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-bold bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-color)]">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span>Target: {todayFocus.estimatedTime}</span>
          </div>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="os-btn px-3 py-1 bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] border border-[var(--accent-purple)]/30 text-xs font-bold hover:bg-[var(--accent-purple)] hover:text-white transition-all flex items-center gap-1"
          >
            <span>Ask Study AI</span>
          </button>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="text-lg md:text-xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          {todayFocus.topic}
        </h2>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mt-1 flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-[var(--accent-purple)] shrink-0" />
          <span>Active Session: {todayFocus.session}</span>
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button className="os-btn px-4 py-2 bg-[var(--accent-purple)] text-white text-xs font-extrabold flex items-center gap-2 hover:bg-[var(--accent-purple-hover)] shadow-xs">
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Open Learning Session</span>
        </button>

        <span className="text-[11px] font-semibold text-[var(--text-muted)]">
          Roadmap Phase 2 • 65% Completed
        </span>
      </div>
    </div>
  );
}
