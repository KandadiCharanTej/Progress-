"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PillarOverviewGrid() {
  const mainPillars = [
    { name: "Foundation", href: "/study/foundation", status: "Active" },
    { name: "Engineering", href: "/study/engineering", status: "Active" },
    { name: "Execution", href: "/study/execution", status: "Active" },
    { name: "Professional Growth", href: "/study/professional-growth", status: "Ready" },
    { name: "Personal Growth", href: "/study/personal-growth", status: "Ready" },
  ];

  return (
    <div className="os-card p-3 flex flex-col justify-between h-full">
      <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block border-b border-[var(--border-color)] pb-1 mb-1">
        Study Pillars
      </span>

      <div className="flex-1 flex flex-col justify-around py-0.5 space-y-1">
        {mainPillars.map((pillar) => (
          <div
            key={pillar.name}
            className="flex items-center justify-between py-1 px-2 rounded bg-[var(--bg-secondary)] text-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="font-semibold text-[var(--text-primary)] truncate">
                {pillar.name}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)] hidden sm:inline-block">
                {pillar.status}
              </span>
            </div>

            <Link
              href={pillar.href}
              className="os-btn px-2 py-0.5 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--accent-purple)] hover:text-white text-[11px] font-medium flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}



