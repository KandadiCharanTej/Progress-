"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "os-btn inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-[12px]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple-hover)] shadow-xs hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    secondary:
      "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-purple)] hover:bg-[var(--bg-card)]",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
    icon:
      "h-8.5 w-8.5 p-0 bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--accent-purple)]",
  };

  return (
    <button
      className={cn(
        baseStyles,
        size !== "lg" && variant === "icon" ? "h-8.5 w-8.5 p-0" : sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
