"use client";

import { useState } from "react";

export default function WeeklyReviewPage() {
  const [achievements, setAchievements] = useState(
    "Refactored UI to minimal operating system & shipped feature components"
  );
  const [failures, setFailures] = useState("Underestimated task complexity on Tuesday");
  const [hours, setHours] = useState("32.5");
  const [improvements, setImprovements] = useState(
    "Set strict single-focus work blocks and eliminate multitasking"
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
          Weekly Review
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Macro reflection: Achievements, failures, hours logged, and improvements.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* 1. Achievements */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Achievements
          </label>
          <textarea
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="Key accomplishments this week..."
            rows={2}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        {/* 2. Failures */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Failures / Missteps
          </label>
          <textarea
            value={failures}
            onChange={(e) => setFailures(e.target.value)}
            placeholder="What went wrong or missed expectations?"
            rows={2}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        {/* 3. Hours */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Total Hours Logged
          </label>
          <input
            type="number"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Total deep work & study hours"
            className="w-full os-input px-3 py-2 text-xs font-semibold"
          />
        </div>

        {/* 4. Improvements */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Improvements for Next Week
          </label>
          <textarea
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="What will you optimize for next week?"
            rows={2}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-500">
              ✓ Weekly Review Saved!
            </span>
          ) : (
            <span className="text-xs text-[var(--text-muted)]">
              Saves review into weekly archive.
            </span>
          )}

          <button
            type="submit"
            className="os-btn px-4 py-2 bg-[var(--accent-purple)] text-white text-xs font-semibold hover:bg-[var(--accent-purple-hover)]"
          >
            Save Weekly Review
          </button>
        </div>
      </form>
    </div>
  );
}

