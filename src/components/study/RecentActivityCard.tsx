"use client";

import { useStudy } from "@/context/StudyContext";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export function RecentActivityCard() {
  const { currentSession } = useStudy();

  return (
    <div className="os-card p-4 border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider">
              Recent Activity
            </span>
          </div>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            Last Active
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {/* Recently Opened Module */}
          <div className="flex items-center justify-between rounded-[8px] p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold text-[var(--text-muted)] uppercase block">
                Recently Opened Module
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)] truncate block">
                {currentSession.module}
              </span>
            </div>
            <span className="text-[10px] font-bold text-blue-400 shrink-0 ml-1">Open</span>
          </div>

          {/* Recently Completed Lesson */}
          <div className="flex items-center justify-between rounded-[8px] p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold text-[var(--text-muted)] uppercase block">
                Recently Completed Lesson
              </span>
              <span className="text-xs font-bold text-[var(--text-primary)] truncate flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="truncate">Raft Consensus State Machine Logs</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button className="w-full os-btn py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all">
          <span>Continue Recent Work</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
