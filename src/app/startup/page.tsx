"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";

export default function StartupPage() {
  const [vision, setVision] = useState(
    "Build the premier AI-driven Personal Operating System for ambitious engineers & founders."
  );
  const [currentGoal, setCurrentGoal] = useState(
    "Launch MVP v1.0 & Reach 100 Active Beta Users"
  );

  const [roadmap, setRoadmap] = useState([
    { stage: "Phase 1", item: "Core OS Architecture & Local State Persistence", status: "Done" },
    { stage: "Phase 2", item: "Minimal UI Refactor & Fast Performance Optimization", status: "In Progress" },
    { stage: "Phase 3", item: "AI Coach Integration & Cloud Syncing", status: "Upcoming" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Finalize product specs and minimalist design", done: true },
    { id: 2, text: "Deploy production build to Vercel", done: false },
    { id: 3, text: "Set up user onboarding feedback form", done: false },
  ]);

  const [metrics, setMetrics] = useState([
    { name: "Beta Users", value: "24 / 100" },
    { name: "Sprint Velocity", value: "85%" },
    { name: "Runway", value: "12 Months" },
  ]);

  const [notes, setNotes] = useState(
    "Focus on product clarity, rapid iteration loops, and listening directly to user feedback."
  );

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          Startup Workspace
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Product vision, current goal, roadmap execution, and metrics.
        </p>
      </div>

      {/* 1. Vision */}
      <div className="os-card p-5 space-y-2">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Vision
        </span>
        <p className="text-sm font-semibold text-[var(--text-primary)]">{vision}</p>
      </div>

      {/* 2. Current Goal */}
      <div className="os-card p-5 space-y-2">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Current Goal
        </span>
        <p className="text-sm font-semibold text-[var(--text-primary)]">{currentGoal}</p>
      </div>

      {/* 3. Roadmap */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Roadmap
        </span>
        <div className="space-y-2">
          {roadmap.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] text-xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] mr-2">{item.stage}:</span>
                <span className="text-[var(--text-secondary)]">{item.item}</span>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                item.status === "Done"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : item.status === "In Progress"
                  ? "bg-purple-500/10 text-purple-400"
                  : "bg-zinc-500/10 text-zinc-500"
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tasks */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Tasks
        </span>
        <div className="space-y-2">
          {tasks.map((t) => (
            <div
              key={t.id}
              onClick={() => toggleTask(t.id)}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] cursor-pointer"
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  t.done
                    ? "bg-[var(--accent-purple)] border-[var(--accent-purple)] text-white"
                    : "border-[var(--border-color)] bg-[var(--bg-card)]"
                }`}
              >
                {t.done && <Check className="h-3 w-3" />}
              </div>
              <span className={`text-xs font-medium ${t.done ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Metrics */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Metrics
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="p-3 rounded-lg bg-[var(--bg-secondary)]">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase block">{m.name}</span>
              <span className="text-sm font-bold text-[var(--text-primary)] mt-0.5 block">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Notes */}
      <div className="os-card p-5 space-y-2">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Notes
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full os-input p-3 text-xs font-medium resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}

