"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Rocket,
  Wallet,
  Settings,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Study", href: "/study", icon: BookOpen },
    { name: "Startup", href: "/startup", icon: Rocket },
    { name: "Money", href: "/money", icon: Wallet },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 hidden md:flex w-44 flex-col justify-between border-r border-[var(--border-color)] bg-[var(--bg-sidebar)] p-2.5 transition-colors">
      <div>
        {/* Header Logo */}
        <div className="flex items-center gap-2 px-1.5 py-1.5 mb-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--text-primary)] text-[var(--bg-main)] font-extrabold text-[10px] shadow-xs">
            OS
          </div>
          <span className="text-xs font-bold text-[var(--text-primary)] tracking-tight">
            Mission Control
          </span>
        </div>

        {/* Core Vertical Navigation Items */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/" || pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                  isActive
                    ? "bg-[var(--bg-secondary)] text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border-color)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Clean User Profile & Active Status Footer */}
      <div className="flex items-center gap-2 px-1.5 py-1.5 border-t border-[var(--border-color)] pt-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-purple)] text-white text-[10px] font-bold shrink-0 shadow-xs">
          N
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="text-[11px] font-bold text-[var(--text-primary)] truncate">Naavik</span>
          <div className="flex items-center gap-1 text-[9px] text-[var(--text-muted)] font-medium mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
            <span>Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
