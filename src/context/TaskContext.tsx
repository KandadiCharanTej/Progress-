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
}

const STORAGE_KEY = "mission-control-tasks-v2";

const initialTasks: TaskItem[] = [
  {
    id: "1",
    title: "Master Operating Systems Memory & Process Scheduling",
    category: "Study",
    priority: "High",
    time: "2.0 hrs",
    completed: true,
    createdAt: Date.now() - 3600000 * 8,
  },
  {
    id: "2",
    title: "Build Naavik Platform Router & Core Interfaces",
    category: "Startup",
    priority: "High",
    time: "2.5 hrs",
    completed: false,
    createdAt: Date.now() - 3600000 * 7,
  },
  {
    id: "3",
    title: "Review High-Yield Allocation & Capital Runway",
    category: "Money",
    priority: "Medium",
    time: "1.0 hr",
    completed: false,
    createdAt: Date.now() - 3600000 * 6,
  },
  {
    id: "4",
    title: "Solve 3 LeetCode Hard System Design Problems",
    category: "Study",
    priority: "High",
    time: "1.5 hrs",
    completed: false,
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: "5",
    title: "Implement Production Auth & JWT Validation Pipeline",
    category: "Startup",
    priority: "High",
    time: "2.0 hrs",
    completed: false,
    createdAt: Date.now() - 3600000 * 4,
  },
  {
    id: "6",
    title: "Audit Monthly Fixed Expenses & Savings Rate Targets",
    category: "Money",
    priority: "Low",
    time: "0.5 hr",
    completed: false,
    createdAt: Date.now() - 3600000 * 3,
  },
  {
    id: "7",
    title: "Deep Dive into Distributed Consensus Protocols (Raft & Paxos)",
    category: "Study",
    priority: "Medium",
    time: "1.5 hrs",
    completed: false,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: "8",
    title: "Refactor Database Indexing & Query Latency Metrics",
    category: "Startup",
    priority: "Medium",
    time: "1.0 hr",
    completed: false,
    createdAt: Date.now() - 3600000,
  },
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "category">("date");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load tasks from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when tasks change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.error("Failed to save tasks to localStorage:", e);
      }
    }
  }, [tasks, isLoaded]);

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
