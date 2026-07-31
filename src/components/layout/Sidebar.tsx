"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Rocket,
  Wallet,
  Settings,
  Zap,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Study",
    href: "/study",
    icon: GraduationCap,
  },
  {
    name: "Startup",
    href: "/startup",
    icon: Rocket,
  },
  {
    name: "Money",
    href: "/money",
    icon: Wallet,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-50 flex h-9 w-9 items-center justify-center rounded-[12px] border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] md:hidden shadow-md"
        aria-label="Toggle Mobile Navigation"
      >
        {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Floating Minimal Sidebar Container */}
      <aside
        className={`fixed top-3 bottom-3 left-3 z-40 flex flex-col os-sidebar transition-all duration-300 ease-in-out md:translate-x-0 ${
          collapsed ? "w-16" : "w-60"
        } ${mobileOpen ? "translate-x-0 w-60" : "-translate-x-[calc(100%+20px)]"}`}
      >
        {/* Brand Header & Collapse Toggle */}
        <div className="flex h-14 items-center justify-between border-b border-[var(--border-color)] px-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 group overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[var(--accent-purple)] text-white shadow-xs">
              <Zap className="h-4 w-4 fill-white/20" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                <span className="text-xs font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
                  Mission Control
                </span>
                <span className="block text-[9px] font-semibold tracking-widest text-[var(--accent-purple)] uppercase">
                  Execution OS
                </span>
              </motion.div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex h-6 w-6 items-center justify-center rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-purple)] transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 no-scrollbar">
          {!collapsed && (
            <div className="mb-2 px-2.5 text-micro font-bold text-[var(--text-muted)]">
              Navigation
            </div>
          )}

          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.name : undefined}
                  className={`group relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--bg-secondary)] text-[var(--accent-purple)] font-bold shadow-xs"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {/* Left Purple Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[var(--accent-purple)]" />
                  )}

                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                      isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                    }`}
                  />

                  {!collapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Status */}
        <div className="border-t border-[var(--border-color)] p-3">
          <div className="flex items-center justify-between rounded-[10px] bg-[var(--bg-secondary)] px-3 py-1.5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-purple)] animate-pulse" />
              {!collapsed && (
                <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
                  OS v2.5
                </span>
              )}
            </div>
            {!collapsed && (
              <span className="rounded bg-[var(--bg-card)] border border-[var(--border-color)] px-1.5 py-0.2 text-[9px] font-mono font-semibold text-[var(--text-muted)]">
                Ready
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
