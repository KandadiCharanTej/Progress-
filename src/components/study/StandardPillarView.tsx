"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

export interface StandardPillarProps {
  title: string;
  description: string;
  roadmap: { phase: string; title: string; done: boolean }[];
  currentModule: { name: string; status: string };
  topics: { id: number; text: string; done: boolean }[];
  resources: { title: string; type: string; link: string }[];
  initialNotes: string;
  tasks: { id: number; text: string; done: boolean }[];
  history: { date: string; topic: string; duration: string }[];
}

export function StandardPillarView(props: StandardPillarProps) {
  const [topics, setTopics] = useState(props.topics);
  const [tasks, setTasks] = useState(props.tasks);
  const [notes, setNotes] = useState(props.initialNotes);

  const toggleTopic = (id: number) => {
    setTopics(topics.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-6">
      {/* 1. Title & 2. Description */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {props.title}
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          {props.description}
        </p>
      </div>

      {/* 3. Roadmap */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block border-b border-[var(--border-color)] pb-2">
          Roadmap
        </span>
        <div className="space-y-2">
          {props.roadmap.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  {item.phase}
                </span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {item.title}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold ${
                  item.done ? "text-emerald-500" : "text-[var(--text-muted)]"
                }`}
              >
                {item.done ? "Completed" : "In Progress"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Current Module */}
      <div className="os-card p-5 space-y-2">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Current Module
        </span>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              {props.currentModule.name}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Status: {props.currentModule.status}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Topics Checklist */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block border-b border-[var(--border-color)] pb-2">
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
              <span
                className={`text-xs font-medium ${
                  t.done ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"
                }`}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Resources */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block border-b border-[var(--border-color)] pb-2">
          Resources
        </span>
        <div className="space-y-2">
          {props.resources.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] text-xs">
              <span className="font-semibold text-[var(--text-primary)]">{r.title}</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                {r.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Notes */}
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

      {/* 8. Tasks */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block border-b border-[var(--border-color)] pb-2">
          Tasks
        </span>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] cursor-pointer"
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  task.done
                    ? "bg-[var(--accent-purple)] border-[var(--accent-purple)] text-white"
                    : "border-[var(--border-color)] bg-[var(--bg-card)]"
                }`}
              >
                {task.done && <Check className="h-3 w-3" />}
              </div>
              <span
                className={`text-xs font-medium ${
                  task.done ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"
                }`}
              >
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Study History */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block border-b border-[var(--border-color)] pb-2">
          Study History
        </span>
        <div className="space-y-2">
          {props.history.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-secondary)] text-xs">
              <div>
                <span className="font-semibold text-[var(--text-primary)] block">{h.topic}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{h.date}</span>
              </div>
              <span className="font-mono text-xs font-bold text-[var(--accent-purple)]">
                {h.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
