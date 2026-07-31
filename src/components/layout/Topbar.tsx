"use client";

import { usePathname } from "next/navigation";
import { Search, Command, User } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Topbar() {
  const pathname = usePathname();

  // Dynamic section title based on route
  const getPageTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return "Mission Control";
    if (pathname.startsWith("/study")) return "Study Hub";
    if (pathname.startsWith("/startup")) return "Startup Workspace";
    if (pathname.startsWith("/money")) return "Financial Engine";
    if (pathname.startsWith("/settings")) return "Platform Settings";
    return "Mission Control";
  };

  return (
    <header className="sticky top-0 z-30 flex h-13 w-full shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-main)] px-5">
      {/* Left breadcrumb / page title */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
          <span>Mission Control</span>
          <span>/</span>
        </div>
        <h2 className="text-sm md:text-base font-bold text-[var(--text-primary)] tracking-tight">
          {getPageTitle()}
        </h2>
      </div>

      {/* Right controls: Search, Theme Toggle, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Command Search Bar Placeholder */}
        <div className="relative hidden sm:flex items-center">
          <div className="flex h-8 w-52 items-center justify-between rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-purple)]">
            <div className="flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <span>Search platform...</span>
            </div>
            <kbd className="flex h-4 items-center gap-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)] px-1 font-mono text-[9px] text-[var(--text-muted)]">
              <Command className="h-2 w-2" /> K
            </kbd>
          </div>
        </div>

        {/* Theme Toggle Button (Sun/Moon) */}
        <ThemeToggle />

        {/* User Profile Avatar Placeholder */}
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold shadow-xs">
          <User className="h-4 w-4 text-[var(--text-secondary)]" />
        </div>
      </div>
    </header>
  );
}
