"use client";

import { useState } from "react";

export default function MonthlyReviewPage() {
  const [bigWins, setBigWins] = useState(
    "Delivered Personal Operating System architecture & built core startup backend"
  );
  const [lessons, setLessons] = useState(
    "Simplification and continuous small steps beat complex systems every single time."
  );
  const [nextMonth, setNextMonth] = useState(
    "Launch startup beta, complete operating systems module, and maintain 80%+ consistency"
  );

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          Monthly Review
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          High-level monthly reflection: Big wins, core lessons, and next month's goals.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* 1. Big Wins */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Big Wins
          </label>
          <textarea
            value={bigWins}
            onChange={(e) => setBigWins(e.target.value)}
            placeholder="Major breakthroughs and achievements this month..."
            rows={3}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        {/* 2. Lessons */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Core Lessons
          </label>
          <textarea
            value={lessons}
            onChange={(e) => setLessons(e.target.value)}
            placeholder="What were the biggest insights learned this month?"
            rows={3}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        {/* 3. Next Month */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Next Month's Primary Goals
          </label>
          <textarea
            value={nextMonth}
            onChange={(e) => setNextMonth(e.target.value)}
            placeholder="What are your top priorities for next month?"
            rows={3}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-500">
              ✓ Monthly Review Saved!
            </span>
          ) : (
            <span className="text-xs text-[var(--text-muted)]">
              Saves review into monthly archive.
            </span>
          )}

          <button
            type="submit"
            className="os-btn px-4 py-2 bg-[var(--accent-purple)] text-white text-xs font-semibold hover:bg-[var(--accent-purple-hover)]"
          >
            Save Monthly Review
          </button>
        </div>
      </form>
    </div>
  );
}

