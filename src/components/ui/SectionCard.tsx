"use client";

import { LucideIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  href?: string;
  badge?: string;
  children?: ReactNode;
  isClickable?: boolean;
  minHeight?: string;
  className?: string;
}

export function SectionCard({
  title,
  subtitle,
  icon: Icon,
  href,
  badge,
  children,
  isClickable = false,
  minHeight = "",
  className = "",
}: SectionCardProps) {
  const content = (
    <div
      className={`os-card group relative flex flex-col justify-between p-4 md:p-4.5 ${minHeight} ${className}`}
    >
      {/* Header section */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)] group-hover:border-[var(--accent-purple)] transition-colors">
                <Icon className="h-4.5 w-4.5" />
              </div>
            )}
            <div>
              <h3 className="text-card-title text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors leading-snug">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-0.5 text-small text-[var(--text-secondary)] leading-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {badge ? (
            <span className="rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-muted)] whitespace-nowrap">
              {badge}
            </span>
          ) : (
            (href || isClickable) && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] group-hover:border-[var(--accent-purple)] group-hover:text-[var(--accent-purple)] transition-colors">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            )
          )}
        </div>
      </div>

      {/* Render children only if provided, no placeholder boxes */}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return content;
}
