"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { Lightbulb, Plus, Check } from "lucide-react";

export function QuickCapture() {
  const { addQuickCaptureIdea, quickCapturedIdeas } = useTasks();
  const [ideaText, setIdeaText] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim()) return;

    addQuickCaptureIdea(ideaText);
    setIdeaText("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="os-card p-3 border-[var(--border-color)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-extrabold text-[var(--text-primary)]">
            Quick Capture
          </span>
        </div>
        <span className="text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full border border-[var(--border-color)]">
          {quickCapturedIdeas.length} Saved
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Instantly capture an idea & press Enter..."
          value={ideaText}
          onChange={(e) => setIdeaText(e.target.value)}
          className="flex-1 os-input px-3 py-1.5 text-xs font-medium focus:outline-none placeholder-[var(--text-muted)]"
        />
        <button
          type="submit"
          className="os-btn h-7.5 px-3 bg-[var(--accent-purple)] text-white text-xs font-bold flex items-center gap-1 hover:bg-[var(--accent-purple-hover)] shrink-0"
        >
          {savedSuccess ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          <span>{savedSuccess ? "Saved!" : "Save"}</span>
        </button>
      </form>
    </div>
  );
}
