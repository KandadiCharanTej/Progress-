"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface MorningPlanningData {
  todayGoal: string;
  priorities: [string, string, string];
  expectedDeepWork: number;
  notes: string;
  principle: string;
  plannedAt: string;
}

export interface DailyReviewData {
  date: string;
  tasksCompleted: number;
  deepWorkHours: number;
  biggestWin: string;
  biggestChallenge: string;
  learnedToday: string;
  mood: "🔥 High" | "⚡ Productive" | "😐 Neutral" | "😫 Exhausted";
  tomorrowsGoal: string;
  notes: string;
  createdAt: number;
}

export interface WeeklyReviewData {
  id: string;
  weekRange: string;
  studyProgress: number;
  startupProgress: number;
  moneyProgress: number;
  weeklyWins: string;
  weeklyChallenges: string;
  goalsCompleted: number;
  goalsMissed: number;
  deepWorkHours: number;
  studyHours: number;
  lessonsLearned: string;
  nextWeekPriority: string;
  reflectionNotes: string;
  createdAt: number;
}

export interface MonthlyReviewData {
  id: string;
  monthName: string;
  studyProgress: number;
  startupProgress: number;
  moneyProgress: number;
  projectsCompleted: number;
  booksFinished: number;
  coursesCompleted: number;
  certifications: number;
  incomeSummary: string;
  deepWorkHours: number;
  consistencyPercent: number;
  biggestAchievement: string;
  biggestFailure: string;
  lessonsLearned: string;
  nextMonthGoals: string;
  reflection: string;
  createdAt: number;
}

interface ReviewContextType {
  morningPlanning: MorningPlanningData | null;
  saveMorningPlanning: (data: MorningPlanningData) => void;
  isMorningPlanningOpen: boolean;
  setIsMorningPlanningOpen: (open: boolean) => void;

  dailyReviews: DailyReviewData[];
  saveDailyReview: (data: DailyReviewData) => void;

  weeklyReviews: WeeklyReviewData[];
  saveWeeklyReview: (data: WeeklyReviewData) => void;

  monthlyReviews: MonthlyReviewData[];
  saveMonthlyReview: (data: MonthlyReviewData) => void;
}

const MORNING_KEY = "mission_control_morning_v1";
const DAILY_KEY = "mission_control_daily_reviews_v1";
const WEEKLY_KEY = "mission_control_weekly_reviews_v1";
const MONTHLY_KEY = "mission_control_monthly_reviews_v1";

const initialDailyReviews: DailyReviewData[] = [
  {
    date: new Date(2026, 6, 31).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    tasksCompleted: 4,
    deepWorkHours: 5.5,
    biggestWin: "Mastered Operating Systems Virtual Memory & Page Replacement Algorithms",
    biggestChallenge: "Debugging Async Router State in Next.js 16 Turbopack",
    learnedToday: "Linear memory layout reduces TLB cache misses significantly.",
    mood: "🔥 High",
    tomorrowsGoal: "Implement Naavik Core Router & Authentication Pipeline",
    notes: "Great focus day. Completed 2 DSA Hard graph problems.",
    createdAt: Date.now() - 86400000,
  },
];

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [morningPlanning, setMorningPlanning] = useState<MorningPlanningData | null>(null);
  const [isMorningPlanningOpen, setIsMorningPlanningOpen] = useState(false);

  const [dailyReviews, setDailyReviews] = useState<DailyReviewData[]>(initialDailyReviews);
  const [weeklyReviews, setWeeklyReviews] = useState<WeeklyReviewData[]>([]);
  const [monthlyReviews, setMonthlyReviews] = useState<MonthlyReviewData[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedMorning = localStorage.getItem(MORNING_KEY);
      if (storedMorning) setMorningPlanning(JSON.parse(storedMorning));

      const storedDaily = localStorage.getItem(DAILY_KEY);
      if (storedDaily) setDailyReviews(JSON.parse(storedDaily));

      const storedWeekly = localStorage.getItem(WEEKLY_KEY);
      if (storedWeekly) setWeeklyReviews(JSON.parse(storedWeekly));

      const storedMonthly = localStorage.getItem(MONTHLY_KEY);
      if (storedMonthly) setMonthlyReviews(JSON.parse(storedMonthly));
    } catch (e) {
      console.error("Failed to load review data from localStorage:", e);
    }

    // Check if morning planning was already done today
    const todayStr = new Date().toDateString();
    const storedMorningDate = localStorage.getItem("mission_control_morning_date");
    if (storedMorningDate !== todayStr) {
      setIsMorningPlanningOpen(true);
    }

    setIsLoaded(true);
  }, []);

  const saveMorningPlanning = (data: MorningPlanningData) => {
    setMorningPlanning(data);
    localStorage.setItem(MORNING_KEY, JSON.stringify(data));
    localStorage.setItem("mission_control_morning_date", new Date().toDateString());
    setIsMorningPlanningOpen(false);
  };

  const saveDailyReview = (data: DailyReviewData) => {
    setDailyReviews((prev) => [data, ...prev.filter((d) => d.date !== data.date)]);
    if (isLoaded) {
      localStorage.setItem(DAILY_KEY, JSON.stringify([data, ...dailyReviews]));
    }
  };

  const saveWeeklyReview = (data: WeeklyReviewData) => {
    setWeeklyReviews((prev) => [data, ...prev]);
    if (isLoaded) {
      localStorage.setItem(WEEKLY_KEY, JSON.stringify([data, ...weeklyReviews]));
    }
  };

  const saveMonthlyReview = (data: MonthlyReviewData) => {
    setMonthlyReviews((prev) => [data, ...prev]);
    if (isLoaded) {
      localStorage.setItem(MONTHLY_KEY, JSON.stringify([data, ...monthlyReviews]));
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        morningPlanning,
        saveMorningPlanning,
        isMorningPlanningOpen,
        setIsMorningPlanningOpen,
        dailyReviews,
        saveDailyReview,
        weeklyReviews,
        saveWeeklyReview,
        monthlyReviews,
        saveMonthlyReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return context;
}
