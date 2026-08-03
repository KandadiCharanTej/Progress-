"use client";

import { useStudy } from "@/context/StudyContext";
import { Bookmark, Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";

export function QuickAccessAndAchievements() {
  const { quickAccess, achievements } = useStudy();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Quick Access */}
      <div className="os-card p-4 border-[var(--border-color)]">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] mb-2.5">
          <div className="flex items-center gap-2">
            <Bookmark className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs font-extrabold text-[var(--text-primary)]">
              Quick Access & Pinned Resources
            </span>
          </div>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            {quickAccess.length} Items
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {quickAccess.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center justify-between rounded-[8px] p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                  {item.type}
                </span>
                <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors truncate">
                  {item.title}
                </span>
              </div>
              <ExternalLink className="h-3 w-3 text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] shrink-0 ml-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="os-card p-4 border-[var(--border-color)]">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] mb-2.5">
          <div className="flex items-center gap-2">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-extrabold text-[var(--text-primary)]">
              Recent Achievements
            </span>
          </div>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            Milestones
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-[8px] p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)]"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {item.badge}
                </span>
                <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[var(--text-muted)] shrink-0 ml-1">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
