"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="os-btn relative flex h-9 w-9 items-center justify-center rounded-[14px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-purple)] transition-colors focus:outline-none"
      aria-label="Toggle Theme"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-purple-400" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
