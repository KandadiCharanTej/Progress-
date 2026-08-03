"use client";

import { useState } from "react";
import { Sun, Moon, Calendar, Sparkles, X, Check } from "lucide-react";
import { useReview } from "@/context/ReviewContext";

export function MicroReviewSystem() {
  const {
    isMorningPlanningOpen,
    setIsMorningPlanningOpen,
    saveMorningPlanning,
    saveDailyReview,
    saveWeeklyReview,
    saveMonthlyReview,
  } = useReview();

  const [activeTab, setActiveTab] = useState<"morning" | "night" | "weekly" | "monthly" | null>(
    isMorningPlanningOpen ? "morning" : null
  );

  // Micro Form States
  const [morningGoal, setMorningGoal] = useState("");
  const [morningTask1, setMorningTask1] = useState("");
  const [morningTask2, setMorningTask2] = useState("");
  const [morningTask3, setMorningTask3] = useState("");

  const [nightWin, setNightWin] = useState("");
  const [nightTomorrowTask, setNightTomorrowTask] = useState("");

  const [weeklyWin, setWeeklyWin] = useState("");
  const [weeklyProblem, setWeeklyProblem] = useState("");
  const [weeklyFocus, setWeeklyFocus] = useState("");

  const [monthlyAchievement, setMonthlyAchievement] = useState("");
  const [monthlyLesson, setMonthlyLesson] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState("");

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  if (!activeTab && !isMorningPlanningOpen) return null;

  const currentModal = activeTab || (isMorningPlanningOpen ? "morning" : null);
  if (!currentModal) return null;

  const handleMorningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMorningPlanning({
      todayGoal: morningGoal.trim() || "Execute Second Year Core Missions",
      priorities: [
        morningTask1.trim() || "Master Operating Systems Memory Management",
        morningTask2.trim() || "Build Naavik Router Pipeline",
        morningTask3.trim() || "Solve 3 DSA Graph Problems",
      ],
      expectedDeepWork: 5.0,
      notes: "",
      principle: "Consistency beats intensity.",
      plannedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    setSavedStatus("Morning Plan Saved!");
    setTimeout(() => {
      setSavedStatus(null);
      setActiveTab(null);
      setIsMorningPlanningOpen(false);
    }, 1000);
  };

  const handleNightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveDailyReview({
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      tasksCompleted: 4,
      deepWorkHours: 5.5,
      biggestWin: nightWin.trim() || "Executed key tasks & maintained 100% streak",
      biggestChallenge: "Async state synchronization",
      learnedToday: "Linear memory access improves cache locality.",
      mood: "🔥 High",
      tomorrowsGoal: nightTomorrowTask.trim() || "Deploy Naavik Router Architecture",
      notes: "",
      createdAt: Date.now(),
    });
    setSavedStatus("Night Reflection Saved!");
    setTimeout(() => {
      setSavedStatus(null);
      setActiveTab(null);
    }, 1000);
  };

  const handleWeeklySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveWeeklyReview({
      id: Date.now().toString(),
      weekRange: "Jul 26 — Aug 1, 2026",
      studyProgress: 42,
      startupProgress: 28,
      moneyProgress: 50,
      weeklyWins: weeklyWin.trim() || "Delivered Mission Control OS",
      weeklyChallenges: weeklyProblem.trim() || "Balancing startup sprint with DSA practice",
      goalsCompleted: 5,
      goalsMissed: 1,
      deepWorkHours: 28.5,
      studyHours: 35.0,
      lessonsLearned: "Architecture specs streamline execution.",
      nextWeekPriority: weeklyFocus.trim() || "Deploy Naavik Auth Pipeline",
      reflectionNotes: "",
      createdAt: Date.now(),
    });
    setSavedStatus("Weekly Review Saved!");
    setTimeout(() => {
      setSavedStatus(null);
      setActiveTab(null);
    }, 1000);
  };

  const handleMonthlySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMonthlyReview({
      id: Date.now().toString(),
      monthName: "July 2026",
      studyProgress: 42,
      startupProgress: 28,
      moneyProgress: 50,
      projectsCompleted: 2,
      booksFinished: 1,
      coursesCompleted: 1,
      certifications: 1,
      incomeSummary: "$2,500 High-Yield Capital",
      deepWorkHours: 120.0,
      consistencyPercent: 88,
      biggestAchievement: monthlyAchievement.trim() || "Built Mission Control OS",
      biggestFailure: "Distributed consensus latency",
      lessonsLearned: monthlyLesson.trim() || "Daily execution compounds exponentially.",
      nextMonthGoals: monthlyGoal.trim() || "Complete OS Exam & Deploy Naavik",
      reflection: "",
      createdAt: Date.now(),
    });
    setSavedStatus("Monthly Review Saved!");
    setTimeout(() => {
      setSavedStatus(null);
      setActiveTab(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="os-card w-full max-w-md p-4 border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl flex flex-col gap-3">
        {/* Header Tabs */}
        <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("morning")}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-extrabold flex items-center gap-1 transition-all ${
                currentModal === "morning"
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              <span>30s Morning</span>
            </button>

            <button
              onClick={() => setActiveTab("night")}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-extrabold flex items-center gap-1 transition-all ${
                currentModal === "night"
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              <span>30s Night</span>
            </button>

            <button
              onClick={() => setActiveTab("weekly")}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-extrabold flex items-center gap-1 transition-all ${
                currentModal === "weekly"
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>1m Weekly</span>
            </button>

            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-2.5 py-1 rounded-[6px] text-xs font-extrabold flex items-center gap-1 transition-all ${
                currentModal === "monthly"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>1m Monthly</span>
            </button>
          </div>

          <button
            onClick={() => {
              setActiveTab(null);
              setIsMorningPlanningOpen(false);
            }}
            className="h-6 w-6 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 30s MORNING FORM */}
        {currentModal === "morning" && (
          <form onSubmit={handleMorningSubmit} className="flex flex-col gap-2.5">
            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Today's Main Goal
              </label>
              <input
                type="text"
                placeholder="Single core mission today..."
                value={morningGoal}
                onChange={(e) => setMorningGoal(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-bold focus:outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Top 3 Tasks
              </label>
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  placeholder="1. High Priority Task..."
                  value={morningTask1}
                  onChange={(e) => setMorningTask1(e.target.value)}
                  className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="2. Medium Priority Task..."
                  value={morningTask2}
                  onChange={(e) => setMorningTask2(e.target.value)}
                  className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="3. Core Task..."
                  value={morningTask3}
                  onChange={(e) => setMorningTask3(e.target.value)}
                  className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-1 w-full os-btn py-2 bg-[var(--accent-purple)] text-white text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-[var(--accent-purple-hover)]"
            >
              {savedStatus ? <Check className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{savedStatus || "Start My Day (30s)"}</span>
            </button>
          </form>
        )}

        {/* 30s NIGHT FORM */}
        {currentModal === "night" && (
          <form onSubmit={handleNightSubmit} className="flex flex-col gap-2.5">
            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Today's Biggest Win
              </label>
              <input
                type="text"
                placeholder="What went exceptionally well today?"
                value={nightWin}
                onChange={(e) => setNightWin(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-bold focus:outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Tomorrow's First Task
              </label>
              <input
                type="text"
                placeholder="What will you tackle first tomorrow morning?"
                value={nightTomorrowTask}
                onChange={(e) => setNightTomorrowTask(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full os-btn py-2 bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-indigo-700"
            >
              {savedStatus ? <Check className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{savedStatus || "Finish Day (30s)"}</span>
            </button>
          </form>
        )}

        {/* 1m WEEKLY FORM */}
        {currentModal === "weekly" && (
          <form onSubmit={handleWeeklySubmit} className="flex flex-col gap-2.5">
            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Weekly Biggest Win
              </label>
              <input
                type="text"
                placeholder="Top achievement this week..."
                value={weeklyWin}
                onChange={(e) => setWeeklyWin(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-bold focus:outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Weekly Biggest Problem
              </label>
              <input
                type="text"
                placeholder="Main bottleneck this week..."
                value={weeklyProblem}
                onChange={(e) => setWeeklyProblem(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Next Week Focus
              </label>
              <input
                type="text"
                placeholder="Single objective for next week..."
                value={weeklyFocus}
                onChange={(e) => setWeeklyFocus(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full os-btn py-2 bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-purple-700"
            >
              {savedStatus ? <Check className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
              <span>{savedStatus || "Done (1m Weekly)"}</span>
            </button>
          </form>
        )}

        {/* 1m MONTHLY FORM */}
        {currentModal === "monthly" && (
          <form onSubmit={handleMonthlySubmit} className="flex flex-col gap-2.5">
            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Best Achievement This Month
              </label>
              <input
                type="text"
                placeholder="Greatest breakthrough this month..."
                value={monthlyAchievement}
                onChange={(e) => setMonthlyAchievement(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-bold focus:outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Biggest Lesson Learned
              </label>
              <input
                type="text"
                placeholder="Key insight from this month..."
                value={monthlyLesson}
                onChange={(e) => setMonthlyLesson(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-1">
                Next Month Goal
              </label>
              <input
                type="text"
                placeholder="Primary objective for next month..."
                value={monthlyGoal}
                onChange={(e) => setMonthlyGoal(e.target.value)}
                className="w-full os-input px-3 py-1.5 text-xs font-medium focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full os-btn py-2 bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-emerald-700"
            >
              {savedStatus ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              <span>{savedStatus || "Done (1m Monthly)"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
