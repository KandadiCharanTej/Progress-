"use client";

import { useState } from "react";
import { Check, Play } from "lucide-react";

export default function GrowthPillarPage() {
  const [goal, setGoal] = useState("Read 2 Books per Month & Build Mental Models Library");
  const [progress, setProgress] = useState(60);
  const [sessionActive, setSessionActive] = useState(false);
  const [notes, setNotes] = useState(
    "Focus on clear technical writing, high-level articulation, and deep reading habits."
  );

  const [topics, setTopics] = useState([
    { id: 1, text: "Read 'Atomic Habits' & Implement Habit Loop System", done: true },
    { id: 2, text: "Write 1 Technical Blog Post on Systems Architecture", done: false },
    { id: 3, text: "Practice Public Speaking & Technical Presentation", done: false },
  ]);

  const [resources] = useState([
    { title: "Atomic Habits — James Clear", type: "Book", link: "#" },
    { title: "Feynman Technique for Deep Learning", type: "Article", link: "#" },
  ]);

  const toggleTopic = (id: number) => {
    setTopics(topics.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          Growth & Mindset
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Personal development, mental models, reading, and continuous skill acquisition.
        </p>
      </div>

      <div className="os-card p-4 flex items-center justify-between">
        <div className="flex-1 mr-6">
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-[var(--text-muted)] uppercase">Progress</span>
            <span className="font-bold text-[var(--accent-purple)]">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden">
            <div className="h-full bg-[var(--accent-purple)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button
          onClick={() => setSessionActive(!sessionActive)}
          className={`os-btn px-4 py-2 text-xs font-semibold flex items-center gap-1.5 ${
            sessionActive
              ? "bg-emerald-600 text-white"
              : "bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple-hover)]"
          }`}
        >
          <Play className="h-3.5 w-3.5" />
          <span>{sessionActive ? "Session Active" : "Start Session"}</span>
        </button>
      </div>

      <div className="os-card p-5 space-y-2">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Current Goal
        </span>
        <p className="text-sm font-semibold text-[var(--text-primary)]">{goal}</p>
      </div>

      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Topics Checklist
        </span>
        <div className="space-y-2">
          {topics.map((t) => (
            <div
              key={t.id}
              onClick={() => toggleTopic(t.id)}
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

      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Resources
        </span>
        <div className="space-y-2">
          {resources.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] text-xs">
              <span className="font-semibold text-[var(--text-primary)]">{r.title}</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                {r.type}
              </span>
            </div>
          ))}
        </div>
      </div>

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

