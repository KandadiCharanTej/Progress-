"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Pillar {
  id: string;
  name: string;
  category: "FOUNDATION" | "ENGINEERING" | "EXECUTION" | "PROFESSIONAL EXCELLENCE" | "PERSONAL EXCELLENCE";
  progress: number;
  status: "Active" | "Completed" | "Queued";
  href: string;
}

export interface StudyGoal {
  id: string;
  title: string;
  current: number;
  total: number;
  completed: boolean;
}

export interface StudyDeadline {
  id: string;
  title: string;
  category: "Exam" | "Hackathon" | "Certification" | "Assignment";
  date: string;
  daysLeft: number;
}

interface StudyContextType {
  pillars: Pillar[];
  todayFocus: { topic: string; session: string; estimatedTime: string };
  currentSession: { pillar: string; topic: string; module: string };
  weeklyGoals: StudyGoal[];
  deadlines: StudyDeadline[];
  consistency: { days: number; hours: number; deepWork: number; streak: number };
  quickAccess: { title: string; type: string; href: string }[];
  achievements: { title: string; date: string; badge: string }[];
  toggleGoal: (id: string) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
}

const STORAGE_KEY = "study-os-headquarters-v1";

const initialPillars: Pillar[] = [
  // FOUNDATION
  { id: "1", name: "Computer Science Foundation", category: "FOUNDATION", progress: 65, status: "Active", href: "/study/foundation" },
  { id: "2", name: "Data Structures & Algorithms", category: "FOUNDATION", progress: 72, status: "Active", href: "/study/foundation" },
  
  // ENGINEERING
  { id: "3", name: "Software Engineering", category: "ENGINEERING", progress: 54, status: "Active", href: "/study/engineering" },
  { id: "4", name: "AI Engineering", category: "ENGINEERING", progress: 40, status: "Active", href: "/study/engineering" },

  // EXECUTION
  { id: "5", name: "Projects & Proof of Work", category: "EXECUTION", progress: 48, status: "Active", href: "/study/execution" },
  { id: "6", name: "Internships", category: "EXECUTION", progress: 30, status: "Active", href: "/study/execution" },
  { id: "7", name: "Open Source", category: "EXECUTION", progress: 25, status: "Active", href: "/study/execution" },
  { id: "8", name: "Competitions", category: "EXECUTION", progress: 35, status: "Active", href: "/study/execution" },
  { id: "9", name: "Programs & Fellowships", category: "EXECUTION", progress: 20, status: "Queued", href: "/study/execution" },
  { id: "10", name: "Certifications", category: "EXECUTION", progress: 50, status: "Active", href: "/study/execution" },

  // PROFESSIONAL EXCELLENCE
  { id: "11", name: "Professional Growth", category: "PROFESSIONAL EXCELLENCE", progress: 60, status: "Active", href: "/study/professional-excellence" },

  // PERSONAL EXCELLENCE
  { id: "12", name: "Personal Excellence & Lifelong Learning", category: "PERSONAL EXCELLENCE", progress: 80, status: "Active", href: "/study/personal-excellence" },
];

const initialGoals: StudyGoal[] = [];

const initialDeadlines: StudyDeadline[] = [];

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [pillars] = useState<Pillar[]>(initialPillars);
  const [todayFocus] = useState({
    topic: "Software Engineering & System Architecture",
    session: "Process Scheduling, Memory Virtualization & Raft Protocol",
    estimatedTime: "2.5 hrs",
  });
  const [currentSession] = useState({
    pillar: "Software Engineering",
    topic: "Operating Systems Memory Management",
    module: "Module 8: Page Replacement & Virtual Memory",
  });
  const [weeklyGoals, setWeeklyGoals] = useState<StudyGoal[]>(initialGoals);
  const [deadlines] = useState<StudyDeadline[]>(initialDeadlines);
  const [consistency] = useState({ days: 48, hours: 142, deepWork: 98, streak: 14 });
  const [quickAccess] = useState([
    { title: "CS Core Memory Roadmap", type: "Roadmap", href: "/study/foundation" },
    { title: "DSA Graphs & Trees Reference", type: "Notes", href: "/study/foundation" },
    { title: "Naavik Architecture Specs", type: "Project", href: "/study/execution" },
  ]);
  const [achievements] = useState([
    { title: "Completed Computer Architecture Basics", date: "Jul 28, 2026", badge: "Module" },
    { title: "Solved 100 DSA Benchmark Problems", date: "Jul 20, 2026", badge: "Milestone" },
    { title: "Passed System Design Fundamentals", date: "Jul 12, 2026", badge: "Cert" },
  ]);

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWeeklyGoals(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load study context from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(weeklyGoals));
      } catch (e) {
        console.error("Failed to save study context to localStorage:", e);
      }
    }
  }, [weeklyGoals, isLoaded]);

  const toggleGoal = (id: string) => {
    setWeeklyGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              completed: !g.completed,
              current: !g.completed ? g.total : Math.max(0, g.current - 1),
            }
          : g
      )
    );
  };

  return (
    <StudyContext.Provider
      value={{
        pillars,
        todayFocus,
        currentSession,
        weeklyGoals,
        deadlines,
        consistency,
        quickAccess,
        achievements,
        toggleGoal,
        isAiModalOpen,
        setIsAiModalOpen,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error("useStudy must be used within a StudyProvider");
  }
  return context;
}
