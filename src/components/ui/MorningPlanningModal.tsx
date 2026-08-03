"use client";

import { useState } from "react";
import { useReview, MorningPlanningData } from "@/context/ReviewContext";
import { Sun, CheckCircle2, X, Compass, Zap, Target } from "lucide-react";

export function MorningPlanningModal() {
  const { isMorningPlanningOpen, setIsMorningPlanningOpen, saveMorningPlanning } = useReview();

  const [todayGoal, setTodayGoal] = useState("");
  const [priority1, setPriority1] = useState("");
  const [priority2, setPriority2] = useState("");
  const [priority3, setPriority3] = useState("");
  const [expectedDeepWork, setExpectedDeepWork] = useState(5.0);
  const [notes, setNotes] = useState("");
  const [principle, setPrinciple] = useState("Consistency beats intensity.");

  if (!isMorningPlanningOpen) return null;

  const handleStartDay = (e: React.FormEvent) => {
    e.preventDefault();
    const data: MorningPlanningData = {
      todayGoal: todayGoal.trim() || "Execute Second Year Core Missions",
      priorities: [
        priority1.trim() || "Master OS Memory Management",
        priority2.trim() || "Build Naavik Router Architecture",
        priority3.trim() || "Solve 3 DSA Graph Problems",
      ],
      expectedDeepWork: Number(expectedDeepWork) || 5.0,
      notes: notes.trim(),
      principle: principle.trim() || "Consistency beats intensity.",
      plannedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    saveMorningPlanning(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="os-card w-full max-w-xl p-5 border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-amber-500 text-white shadow-xs">
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[var(--text-primary)] leading-none">
                Morning Planning OS
              </h2>
              <span className="text-[11px] font-bold text-amber-500">
                Design Today Before You Execute
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMorningPlanningOpen(false)}
            className="h-7 w-7 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            title="Skip for now"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleStartDay} className="flex flex-col gap-3.5">
          {/* Today's Main Goal */}
          <div>
            <label className="block text-xs font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
              <span>Today's Main Goal</span>
            </label>
            <input
              type="text"
              placeholder="What is your single most important mission today?"
              value={todayGoal}
              onChange={(e) => setTodayGoal(e.target.value)}
              className="w-full os-input px-3 py-2 text-xs font-medium focus:outline-none"
              autoFocus
            />
          </div>

          {/* Top 3 Priorities */}
          <div>
            <label className="block text-xs font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Top 3 Priorities</span>
            </label>
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                placeholder="1. High Priority Execution Item..."
                value={priority1}
                onChange={(e) => setPriority1(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
              <input
                type="text"
                placeholder="2. Medium Priority Item..."
                value={priority2}
                onChange={(e) => setPriority2(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
              <input
                type="text"
                placeholder="3. Core Focus Item..."
                value={priority3}
                onChange={(e) => setPriority3(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Expected Deep Work & Today's Principle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-[var(--text-primary)] mb-1">
                Expected Deep Work (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="14"
                value={expectedDeepWork}
                onChange={(e) => setExpectedDeepWork(Number(e.target.value))}
                className="w-full os-input px-3 py-2 text-xs font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-1">
                <Compass className="h-3.5 w-3.5 text-amber-500" />
                <span>Today's Principle</span>
              </label>
              <input
                type="text"
                value={principle}
                onChange={(e) => setPrinciple(e.target.value)}
                className="w-full os-input px-3 py-2 text-xs font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-extrabold text-[var(--text-primary)] mb-1">
              Optional Morning Notes
            </label>
            <textarea
              placeholder="Any mindset notes or reminders for today..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full os-input p-3 text-xs font-medium focus:outline-none resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-2 flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={() => setIsMorningPlanningOpen(false)}
              className="os-btn px-4 py-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="os-btn px-5 py-2 bg-[var(--accent-purple)] text-white text-xs font-extrabold flex items-center gap-1.5 hover:bg-[var(--accent-purple-hover)] shadow-xs"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Start My Day</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
