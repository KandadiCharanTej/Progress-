"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface TaskItem {
  id: string;
  title: string;
  category: "Study" | "Startup" | "Money";
  priority: "High" | "Medium" | "Low";
  time: string;
  completed: boolean;
  createdAt: number;
}

export interface QuickIdea {
  id: string;
  text: string;
  createdAt: number;
}

interface TaskContextType {
  tasks: TaskItem[];
  addTask: (title: string, category: "Study" | "Startup" | "Money", priority: "High" | "Medium" | "Low", time?: string) => void;
  editTask: (id: string, title: string, category: "Study" | "Startup" | "Money", priority: "High" | "Medium" | "Low", time?: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompleted: () => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: "date" | "priority" | "category";
  setSortBy: (sort: "date" | "priority" | "category") => void;

  // New Execution Features
  todayPrinciple: string;
  weeklyGoal: { title: string; current: number; total: number };
  yesterdaysWin: string;
  quickCapturedIdeas: QuickIdea[];
  addQuickCaptureIdea: (text: string) => void;
  incrementWeeklyGoal: () => void;
}

const STORAGE_KEY = "mission-control-tasks-v3";
const IDEAS_STORAGE_KEY = "mission-control-ideas-v1";

const initialTasks: TaskItem[] = [];

const principles = [
  "Consistency beats intensity.",
  "Build before consuming.",
  "Done is better than perfect.",
  "Stay focused on the core mission.",
  "Action cures anxiety.",
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "category">("date");
  const [isLoaded, setIsLoaded] = useState(false);

  // New Execution States
  const [todayPrinciple] = useState<string>(principles[0]);
  const [weeklyGoal, setWeeklyGoal] = useState({ title: "Finish Operating Systems Module", current: 3, total: 5 });
  const [yesterdaysWin] = useState<string>("Completed Database Module");
  const [quickCapturedIdeas, setQuickCapturedIdeas] = useState<QuickIdea[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      const storedIdeas = localStorage.getItem(IDEAS_STORAGE_KEY);
      if (storedIdeas) {
        setQuickCapturedIdeas(JSON.parse(storedIdeas));
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        localStorage.setItem(IDEAS_STORAGE_KEY, JSON.stringify(quickCapturedIdeas));
      } catch (e) {
        console.error("Failed to save state to localStorage:", e);
      }
    }
  }, [tasks, quickCapturedIdeas, isLoaded]);

  const addTask = (
    title: string,
    category: "Study" | "Startup" | "Money" = "Study",
    priority: "High" | "Medium" | "Low" = "High",
    time: string = "1.0 hr"
  ) => {
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      priority,
      time: time.trim() || "1.0 hr",
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const editTask = (
    id: string,
    title: string,
    category: "Study" | "Startup" | "Money",
    priority: "High" | "Medium" | "Low",
    time: string = "1.0 hr"
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title, category, priority, time } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const addQuickCaptureIdea = (text: string) => {
    if (!text.trim()) return;
    const newIdea: QuickIdea = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: Date.now(),
    };
    setQuickCapturedIdeas((prev) => [newIdea, ...prev]);
  };

  const incrementWeeklyGoal = () => {
    setWeeklyGoal((prev) => ({
      ...prev,
      current: Math.min(prev.total, prev.current + 1),
    }));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
        clearCompleted,
        filterCategory,
        setFilterCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        todayPrinciple,
        weeklyGoal,
        yesterdaysWin,
        quickCapturedIdeas,
        addQuickCaptureIdea,
        incrementWeeklyGoal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
