"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Zap,
  Award,
  Sparkles,
  Settings
} from "lucide-react";

export const STUDY_NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/study",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Foundation",
    href: "/study/foundation",
    icon: BookOpen,
  },
  {
    name: "Engineering",
    href: "/study/engineering",
    icon: Code2,
  },
  {
    name: "Execution",
    href: "/study/execution",
    icon: Zap,
  },
  {
    name: "Professional Growth",
    href: "/study/professional-growth",
    icon: Award,
  },
  {
    name: "Personal Growth",
    href: "/study/personal-growth",
    icon: Sparkles,
  },
  {
    name: "Study Settings",
    href: "/study/settings",
    icon: Settings,
  },
];

export function StudySubNav() {
  const pathname = usePathname();

  return (
    <div className="mb-1 border-b border-[var(--border-color)] bg-[var(--bg-main)] px-4 pt-1 shrink-0">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-px">
        {STUDY_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? "text-[var(--accent-purple)] font-extrabold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)]"
                }`}
              />
              <span>{item.name}</span>

              {/* Active Underline */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full bg-[var(--accent-purple)] shadow-xs" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
