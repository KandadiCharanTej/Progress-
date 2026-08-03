"use client";

import { StandardPillarView } from "@/components/study/StandardPillarView";

export default function PersonalGrowthPage() {
  return (
    <StandardPillarView
      title="Personal Growth"
      description="Personal Excellence, Lifelong Learning, Mindset, & Health."
      roadmap={[
        { phase: "Phase 1", title: "Sleep Hygiene, Daily Exercise & Hydration", done: true },
        { phase: "Phase 2", title: "Mental Models, Book Digests & Fast Reading", done: false },
        { phase: "Phase 3", title: "Deep Focus Workflows & Peak Energy Management", done: false },
      ]}
      currentModule={{
        name: "Module 3: Mental Models for Systems Thinking & Decision Making",
        status: "In Progress (80% Complete)",
      }}
      topics={[
        { id: 1, text: "7+ Hours Sleep & Consistent Wake Schedule", done: true },
        { id: 2, text: "Daily Physical Workout & Cardio Routine", done: true },
        { id: 3, text: "Feynman Technique for Deep Concept Mastery", done: true },
        { id: 4, text: "Read 2 Books per Month & Take Notes", done: false },
        { id: 5, text: "15-Minute Daily Reflection & Mindset Journal", done: false },
      ]}
      resources={[
        { title: "Atomic Habits — James Clear", type: "Book", link: "#" },
        { title: "Huberman Lab Physical Health Protocols", type: "Guide", link: "#" },
        { title: "Feynman Technique Study Framework", type: "Method", link: "#" },
      ]}
      initialNotes="Maintain high physical energy and zero-distraction focus blocks. Discipline compounds exponentially."
      tasks={[
        { id: 1, text: "Complete 30-min morning workout session", done: true },
        { id: 2, text: "Read Chapter 4 of Atomic Habits & summarize", done: false },
        { id: 3, text: "Perform 15-min digital detox before sleep", done: false },
      ]}
      history={[
        { date: "Today", topic: "Mental Models — First Principles & Inversion", duration: "1.0 hr" },
        { date: "Aug 1, 2026", topic: "Physical Health — High Intensity Interval Training", duration: "1.0 hr" },
        { date: "Jul 30, 2026", topic: "Habit Loop Automation & Evening Routines", duration: "1.5 hrs" },
      ]}
    />
  );
}
