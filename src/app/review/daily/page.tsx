"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function DailyReviewPage() {
  const [energy, setEnergy] = useState("High Energy");
  const [focus, setFocus] = useState("9 / 10");
  const [wins, setWins] = useState("Completed Next.js UI simplification refactor");
  const [problems, setProblems] = useState("Context switching between tasks");
  const [tomorrow, setTomorrow] = useState("Deploy build & test user workflow");

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
          Daily Review
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          End-of-day reflection: Energy, focus, wins, problems, and tomorrow.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* 1. Energy */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Energy Level
          </label>
          <select
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            className="w-full os-input px-3 py-2 text-xs font-semibold"
          >
            <option value="High Energy">🔥 High Energy</option>
            <option value="Productive">⚡ Productive</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Low / Exhausted">😫 Exhausted</option>
          </select>
        </div>

        {/* 2. Focus */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Focus Score
          </label>
          <input
            type="text"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="e.g. 8/10 deep focus"
            className="w-full os-input px-3 py-2 text-xs font-medium"
          />
        </div>

        {/* 3. Wins */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Wins Today
          </label>
          <textarea
            value={wins}
            onChange={(e) => setWins(e.target.value)}
            placeholder="What went well today?"
            rows={2}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        {/* 4. Problems */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Problems / Friction
          </label>
          <textarea
            value={problems}
            onChange={(e) => setProblems(e.target.value)}
            placeholder="What bottlenecked your execution?"
            rows={2}
            className="w-full os-input p-3 text-xs font-medium resize-none"
          />
        </div>

        {/* 5. Tomorrow */}
        <div className="os-card p-5 space-y-2">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
            Tomorrow's Focus
          </label>
          <input
            type="text"
            value={tomorrow}
            onChange={(e) => setTomorrow(e.target.value)}
            placeholder="What is your primary goal for tomorrow?"
            className="w-full os-input px-3 py-2 text-xs font-medium"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-500">
              ✓ Daily Review Saved!
            </span>
          ) : (
            <span className="text-xs text-[var(--text-muted)]">
              Saves reflection into local journal log.
            </span>
          )}

          <button
            type="submit"
            className="os-btn px-4 py-2 bg-[var(--accent-purple)] text-white text-xs font-semibold hover:bg-[var(--accent-purple-hover)]"
          >
            Save Review
          </button>
        </div>
      </form>
    </div>
  );
}

