"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Plus, Play, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [todayFocus, setTodayFocus] = useState(
    "Master Next.js App Router Architecture & Systems Design"
  );
  const [isEditingFocus, setIsEditingFocus] = useState(false);

  const [topTasks, setTopTasks] = useState([
    { id: 1, text: "Build minimal Dashboard UI layout", done: true },
    { id: 2, text: "Review Operating Systems memory virtualisation notes", done: false },
    { id: 3, text: "Ship Naavik core API endpoints", done: false },
  ]);

  const [newTaskText, setNewTaskText] = useState("");
  const [notes, setNotes] = useState(
    "Key focus for today: Keep execution simple, avoid over-engineering, focus on deep work blocks."
  );

  const toggleTask = (id: number) => {
    setTopTasks(
      topTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    if (topTasks.length >= 3) {
      setTopTasks([...topTasks.slice(1), { id: Date.now(), text: newTaskText.trim(), done: false }]);
    } else {
      setTopTasks([...topTasks, { id: Date.now(), text: newTaskText.trim(), done: false }]);
    }
    setNewTaskText("");
  };

  const completedCount = topTasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / (topTasks.length || 1)) * 100);

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
      {/* 1. Today's Date */}
      <div>
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          {todayDate}
        </span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-1 tracking-tight">
          Today's Dashboard
        </h1>
      </div>

      {/* 2. Today's Focus */}
      <div className="os-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">
            Today's Focus
          </span>
          <button
            onClick={() => setIsEditingFocus(!isEditingFocus)}
            className="text-xs text-[var(--accent-purple)] hover:underline"
          >
            {isEditingFocus ? "Done" : "Edit"}
          </button>
        </div>
        {isEditingFocus ? (
          <input
            type="text"
            value={todayFocus}
            onChange={(e) => setTodayFocus(e.target.value)}
            className="w-full os-input px-3 py-1.5 text-sm font-medium"
            autoFocus
          />
        ) : (
          <p className="text-base font-semibold text-[var(--text-primary)]">
            {todayFocus || "Click edit to set today's primary focus..."}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3. Top 3 Tasks */}
        <div className="os-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">
              Top 3 Tasks
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {completedCount} / {topTasks.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {topTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex items-start gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] cursor-pointer transition-colors hover:border-[var(--border-color)]"
              >
                <div
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    task.done
                      ? "bg-[var(--accent-purple)] border-[var(--accent-purple)] text-white"
                      : "border-[var(--border-color)] bg-[var(--bg-card)]"
                  }`}
                >
                  {task.done && <Check className="h-3 w-3" />}
                </div>
                <span
                  className={`text-xs font-medium ${
                    task.done
                      ? "line-through text-[var(--text-muted)]"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {task.text}
                </span>
              </div>
            ))}
          </div>

          {topTasks.length < 3 && (
            <form onSubmit={addTask} className="flex gap-2">
              <input
                type="text"
                placeholder="Add task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 os-input px-3 py-1.5 text-xs"
              />
              <button
                type="submit"
                className="os-btn px-3 py-1.5 bg-[var(--accent-purple)] text-white text-xs"
              >
                <Plus className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* 4. Current Study Session & Progress Today */}
        <div className="space-y-6">
          {/* Current Study Session */}
          <div className="os-card p-5 space-y-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
              Current Study Session
            </span>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Engineering Pillar — Systems & Web
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Target: 2.5 hours deep work
                </p>
              </div>
              <Link
                href="/study"
                className="os-btn px-3 py-1.5 bg-[var(--accent-purple)] text-white text-xs flex items-center gap-1.5 hover:bg-[var(--accent-purple-hover)]"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Open</span>
              </Link>
            </div>
          </div>

          {/* Progress Today */}
          <div className="os-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">
                Progress Today
              </span>
              <span className="text-sm font-bold text-[var(--accent-purple)]">
                {progressPercent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent-purple)] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quick Notes */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Quick Notes
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Jot down quick thoughts, scratch notes, or ideas..."
          rows={3}
          className="w-full os-input p-3 text-xs font-medium resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}

