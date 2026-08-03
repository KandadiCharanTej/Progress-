"use client";

import { useStudy } from "@/context/StudyContext";
import { RotateCcw, ArrowRight } from "lucide-react";

export function ResumeSessionCard() {
  const { currentSession } = useStudy();

  return (
    <div className="os-card p-4 border-[var(--border-color)] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <RotateCcw className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
            Current Learning Session
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            {currentSession.pillar}
          </span>
          <span className="text-xs font-extrabold text-[var(--text-primary)] truncate">
            {currentSession.topic}
          </span>
        </div>

        <p className="text-xs font-semibold text-[var(--text-secondary)] mt-1 truncate">
          {currentSession.module}
        </p>
      </div>

      <div className="mt-3">
        <button className="w-full os-btn py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] text-xs font-extrabold flex items-center justify-center gap-2 transition-all">
          <span>Continue Learning</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
