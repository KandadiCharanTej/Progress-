"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Topbar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
    if (pathname.startsWith("/study")) return "Study";
    if (pathname.startsWith("/startup")) return "Startup";
    if (pathname.startsWith("/money")) return "Money";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/review")) return "Review";
    return "Mission Control";
  };

  return (
    <header className="sticky top-0 z-30 flex h-12 w-full shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-main)] px-6">
      <h2 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
        {getPageTitle()}
      </h2>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}

