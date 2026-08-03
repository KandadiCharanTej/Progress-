"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Plus,
  Play,
  Pause,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Pin,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Edit3,
  X,
  Maximize2,
  Sliders
} from "lucide-react";
import { StudyProvider } from "@/context/StudyContext";

interface TaskItem {
  id: string;
  text: string;
  priority: "High" | "Medium" | "Low";
  dueTime?: string;
  completed: boolean;
}

interface NoteItem {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
}

interface PlanBlockItem {
  id: string;
  time: string;
  duration: string;
  subject: string;
  module?: string;
  topic?: string;
  priority?: "High" | "Medium" | "Low";
  notes?: string;
  completed?: boolean;
}

interface ActionItem {
  id: string;
  title: string;
  category: "Internship" | "Hackathon" | "Certification" | "Project" | "Open Source" | "DSA Goal" | "Revision" | "Competition";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  href?: string;
  completed?: boolean;
}

interface ActiveStudySession {
  category: string;
  pillar: string;
  module: string;
  topic: string;
  startTime: string;
  seconds: number;
  active: boolean;
  status: "Running" | "Paused" | "Idle";
}

interface FinishedSession {
  category: string;
  pillar: string;
  module: string;
  topic: string;
  finishedAt: string;
}

interface LayoutProportions {
  headerHeight: number; // Vertical height for Header Banner in px (default 44)
  col1Ratio: number; // Horizontal ratio for Column 1 (default 5)
  col2Ratio: number; // Horizontal ratio for Column 2 (default 4)
  col3Ratio: number; // Horizontal ratio for Column 3 (default 3)
  progressHeight: number; // Vertical height for Progress Summary in px (default 84)
  planRatio: number; // Vertical height percentage for Today's Plan in Col 2 (default 52)
  sessionRatio: number; // Vertical height percentage for Current Session in Col 3 (default 36)
}

const DEFAULT_PROPORTIONS: LayoutProportions = {
  headerHeight: 48,
  col1Ratio: 5,
  col2Ratio: 4,
  col3Ratio: 3,
  progressHeight: 84,
  planRatio: 52,
  sessionRatio: 36,
};

// Full Structured Study Taxonomy
const STUDY_TAXONOMY: Record<string, Record<string, Record<string, string[]>>> = {
  Foundation: {
    "Computer Science Foundation": {
      "Operating Systems": ["Processes & Threads", "Memory Management", "File Systems", "Concurrency & Locks"],
      "Computer Networks": ["OSI Model & TCP/IP", "HTTP/1.1 vs HTTP/2 vs HTTP/3", "DNS & TLS/SSL", "WebSockets & WebRTC"],
      "Database Systems": ["Relational Data Modeling", "SQL Indexing & Optimization", "ACID Transactions", "NoSQL & Distributed DBs"]
    },
    "Data Structures & Algorithms": {
      "Arrays & Hashing": ["Two Sum", "Contains Duplicate", "Valid Anagram", "Group Anagrams", "Top K Frequent"],
      "Two Pointers & Sliding Window": ["Valid Palindrome", "3Sum", "Container With Most Water", "Longest Substring Without Repeating"],
      "Trees & Binary Search": ["Invert Binary Tree", "Maximum Depth", "Lowest Common Ancestor", "Search Matrix"],
      "Graphs & BFS/DFS": ["Number of Islands", "Clone Graph", "Course Schedule", "Network Delay Time"],
      "Dynamic Programming": ["Climbing Stairs", "Coin Change", "Longest Increasing Subsequence", "0/1 Knapsack"]
    }
  },
  Engineering: {
    "Software Engineering": {
      "Git & Version Control": ["Branching & Merging", "Rebase vs Merge", "Cherry Pick", "Git Hooks"],
      "Frontend Web Core": ["Semantic HTML5", "Modern CSS Grid & Flexbox", "DOM API & Events", "TypeScript Fundamentals"],
      "React & Next.js": ["Components & Hooks", "State Management", "Next.js App Router", "Server Components & Actions"],
      "Authentication & JWT": ["JWT Basics", "Cookies & Storage", "Sessions", "Authentication Gateways", "OAuth & Refresh Tokens"],
      "System Design & Backend": ["REST vs GraphQL vs gRPC", "Load Balancing & Caching", "Message Queues", "Microservices Architecture"]
    },
    "AI Engineering": {
      "Python & Scientific Stack": ["Python Performance", "NumPy Vectorization", "Pandas Data Pipelines", "Matplotlib & Seaborn"],
      "Deep Learning & PyTorch": ["Tensors & Autograd", "Custom Neural Networks", "Loss Functions & Optimizers", "CNNs & Vision"],
      "Transformers & LLMs": ["Self-Attention Mechanism", "Transformer Architecture", "HuggingFace Ecosystem", "Tokenizer Optimization"],
      "LLM Apps & RAG": ["Prompt Engineering", "Vector Databases", "RAG Pipelines", "LangChain & LlamaIndex"],
      "Model Fine-Tuning": ["LoRA & QLoRA", "Instruction Tuning", "Quantization & GGUF", "Evaluation & Benchmarks"]
    }
  },
  Execution: {
    "Projects & Proof of Work": {
      "Mission Control OS": ["Study Dashboard Optimization", "State Persistence System", "Global Search Bar", "Analytics Engine"],
      "AI Agent System": ["Subagent Dispatcher", "Tool Call Integration", "Context Window Optimization", "Memory Store"]
    },
    "Internships & Careers": {
      "Application Tracker": ["Resume Tailoring", "Cold Outreach Strategy", "Interview Prep", "System Design Interviews"]
    },
    "Open Source": {
      "Community Contributions": ["Issue Triage", "PR Submission", "Code Review", "Documentation Updates"]
    },
    "Competitions": {
      "Hackathons & Contests": ["Idea Validation", "Rapid Prototyping", "Pitch Presentation", "LeetCode Contests"]
    }
  },
  "Professional Growth": {
    "Career Development": {
      "Personal Branding": ["GitHub Portfolio", "Technical Writing", "LinkedIn Optimization", "Public Speaking"],
      "Leadership & Ownership": ["Technical Spec Writing", "Code Reviews", "Mentorship", "Project Management"]
    }
  },
  "Personal Growth": {
    "Focus & Discipline": {
      "Deep Work Systems": ["Pomodoro Strategy", "Distraction Blockers", "Daily Reflection", "Energy Management"],
      "Health & Habits": ["Sleep Hygiene", "Ergonomics & Posture", "Physical Fitness", "Mindfulness"]
    }
  }
};

function DailyStudyWorkspaceContent() {
  const todayDateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Card Proportions & Heights State (Horizontal + Vertical Resizing)
  const [layoutProps, setLayoutProps] = useState<LayoutProportions>(DEFAULT_PROPORTIONS);

  useEffect(() => {
    try {
      const savedProps = localStorage.getItem("naavik_study_card_proportions");
      if (savedProps) setLayoutProps(JSON.parse(savedProps));
    } catch (e) {
      console.error("Failed to load layout card proportions", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("naavik_study_card_proportions", JSON.stringify(layoutProps));
  }, [layoutProps]);

  const resetLayout = () => {
    setLayoutProps(DEFAULT_PROPORTIONS);
    showToast("Layout reset to default.");
  };

  // Horizontal Resize Handlers (Width)
  const handleCol1WidthResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startCol1 = layoutProps.col1Ratio;
    const startCol2 = layoutProps.col2Ratio;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const ratioDelta = (deltaX / 1200) * 12;
      const newCol1 = Math.max(2.5, Math.min(7, startCol1 + ratioDelta));
      const newCol2 = Math.max(2.5, Math.min(6, startCol2 - ratioDelta));
      setLayoutProps((prev) => ({ ...prev, col1Ratio: newCol1, col2Ratio: newCol2 }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleCol2WidthResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startCol2 = layoutProps.col2Ratio;
    const startCol3 = layoutProps.col3Ratio;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const ratioDelta = (deltaX / 1200) * 12;
      const newCol2 = Math.max(2.5, Math.min(6, startCol2 + ratioDelta));
      const newCol3 = Math.max(2, Math.min(5, startCol3 - ratioDelta));
      setLayoutProps((prev) => ({ ...prev, col2Ratio: newCol2, col3Ratio: newCol3 }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Header Height Resize Handler
  const handleHeaderResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = layoutProps.headerHeight || 44;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newH = Math.max(34, Math.min(120, startH + deltaY));
      setLayoutProps((prev) => ({ ...prev, headerHeight: newH }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Vertical Resize Handlers (Height)
  const handleProgressResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = layoutProps.progressHeight;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newH = Math.max(60, Math.min(180, startH + deltaY));
      setLayoutProps((prev) => ({ ...prev, progressHeight: newH }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePlanResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startRatio = layoutProps.planRatio;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const deltaPercent = (deltaY / 600) * 100;
      const newRatio = Math.max(25, Math.min(75, startRatio + deltaPercent));
      setLayoutProps((prev) => ({ ...prev, planRatio: newRatio }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleSessionResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startRatio = layoutProps.sessionRatio;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const deltaPercent = (deltaY / 600) * 100;
      const newRatio = Math.max(20, Math.min(65, startRatio + deltaPercent));
      setLayoutProps((prev) => ({ ...prev, sessionRatio: newRatio }));
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Corner Resize Handlers (Width + Height)
  const handleCornerCol1Resize = (e: React.PointerEvent) => {
    e.preventDefault();
    handleCol1WidthResize(e);
    handleProgressResize(e);
  };

  const handleCornerCol2Resize = (e: React.PointerEvent) => {
    e.preventDefault();
    handleCol2WidthResize(e);
    handlePlanResize(e);
  };

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Modals / View All Toggles
  const [showAllTasksModal, setShowAllTasksModal] = useState(false);
  const [showAllNotesModal, setShowAllNotesModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showAddPlanBlockModal, setShowAddPlanBlockModal] = useState(false);

  // Guided 4-Step Session Modal state
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionStep, setSessionStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Active Session & Last Finished Session state
  const [activeSession, setActiveSession] = useState<ActiveStudySession | null>(null);
  const [lastFinishedSession, setLastFinishedSession] = useState<FinishedSession | null>(null);

  // TODAY'S & WEEKLY GOALS
  const [dailyGoalTarget, setDailyGoalTarget] = useState(6);
  const [weeklyGoalTarget, setWeeklyGoalTarget] = useState(35);
  const [dailyGoalTopic, setDailyGoalTopic] = useState("");
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [streakDays, setStreakDays] = useState(0);

  // TODAY'S TASKS state & persistence
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [taskSearch, setTaskSearch] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  // COMPLETED SESSIONS & TIME LOGGED
  const [completedSessionsCount, setCompletedSessionsCount] = useState(0);
  const [todaySecondsLogged, setTodaySecondsLogged] = useState(0);
  const [weeklySecondsLogged, setWeeklySecondsLogged] = useState(0);

  // QUICK NOTES state & persistence
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [noteSearch, setNoteSearch] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  // TODAY'S PLAN state & persistence (Study Blocks)
  const [planBlocks, setPlanBlocks] = useState<PlanBlockItem[]>([]);
  const [newBlockTime, setNewBlockTime] = useState("");
  const [newBlockDuration, setNewBlockDuration] = useState("2h");
  const [newBlockSubject, setNewBlockSubject] = useState("");
  const [newBlockModule, setNewBlockModule] = useState("");
  const [newBlockTopic, setNewBlockTopic] = useState("");
  const [newBlockPriority, setNewBlockPriority] = useState<"High" | "Medium" | "Low">("Medium");

  // ACTION CENTER state & persistence
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [isAddingAction, setIsAddingAction] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState("");
  const [newActionCategory, setNewActionCategory] = useState<ActionItem["category"]>("Internship");
  const [newActionPriority, setNewActionPriority] = useState<"High" | "Medium" | "Low">("High");
  const [newActionDate, setNewActionDate] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedGoalTopic = localStorage.getItem("naavik_daily_goal_topic");
      if (savedGoalTopic) setDailyGoalTopic(savedGoalTopic);

      const savedGoalTarget = localStorage.getItem("naavik_daily_goal_target");
      if (savedGoalTarget) setDailyGoalTarget(parseFloat(savedGoalTarget));

      const savedWeeklyGoalTarget = localStorage.getItem("naavik_weekly_goal_target");
      if (savedWeeklyGoalTarget) setWeeklyGoalTarget(parseFloat(savedWeeklyGoalTarget));

      const savedStreakDays = localStorage.getItem("naavik_study_streak_days");
      if (savedStreakDays) setStreakDays(parseInt(savedStreakDays, 10));

      const savedWeeklyLogged = localStorage.getItem("naavik_weekly_logged_seconds");
      if (savedWeeklyLogged) setWeeklySecondsLogged(parseInt(savedWeeklyLogged, 10));

      const savedTasks = localStorage.getItem("naavik_study_tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks([]);
      }

      const savedNotes = localStorage.getItem("naavik_study_notes");
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedPlan = localStorage.getItem("naavik_study_plan_blocks");
      if (savedPlan) setPlanBlocks(JSON.parse(savedPlan));

      const savedAction = localStorage.getItem("naavik_action_items");
      if (savedAction) setActionItems(JSON.parse(savedAction));

      const savedLogged = localStorage.getItem("naavik_logged_seconds");
      if (savedLogged) setTodaySecondsLogged(parseInt(savedLogged, 10));

      const savedSessions = localStorage.getItem("naavik_completed_sessions");
      if (savedSessions) setCompletedSessionsCount(parseInt(savedSessions, 10));

      const savedActiveSession = localStorage.getItem("naavik_active_study_session");
      if (savedActiveSession) setActiveSession(JSON.parse(savedActiveSession));

      const savedFinishedSession = localStorage.getItem("naavik_last_finished_session");
      if (savedFinishedSession) setLastFinishedSession(JSON.parse(savedFinishedSession));
    } catch (e) {
      console.error("Failed to load local study workspace state", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => { localStorage.setItem("naavik_daily_goal_topic", dailyGoalTopic); }, [dailyGoalTopic]);
  useEffect(() => { localStorage.setItem("naavik_daily_goal_target", dailyGoalTarget.toString()); }, [dailyGoalTarget]);
  useEffect(() => { localStorage.setItem("naavik_weekly_goal_target", weeklyGoalTarget.toString()); }, [weeklyGoalTarget]);
  useEffect(() => { localStorage.setItem("naavik_study_streak_days", streakDays.toString()); }, [streakDays]);
  useEffect(() => { localStorage.setItem("naavik_weekly_logged_seconds", weeklySecondsLogged.toString()); }, [weeklySecondsLogged]);
  useEffect(() => { localStorage.setItem("naavik_study_tasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("naavik_study_notes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem("naavik_study_plan_blocks", JSON.stringify(planBlocks)); }, [planBlocks]);
  useEffect(() => { localStorage.setItem("naavik_action_items", JSON.stringify(actionItems)); }, [actionItems]);
  useEffect(() => { localStorage.setItem("naavik_logged_seconds", todaySecondsLogged.toString()); }, [todaySecondsLogged]);
  useEffect(() => { localStorage.setItem("naavik_completed_sessions", completedSessionsCount.toString()); }, [completedSessionsCount]);
  useEffect(() => {
    if (activeSession) {
      localStorage.setItem("naavik_active_study_session", JSON.stringify(activeSession));
    } else {
      localStorage.removeItem("naavik_active_study_session");
    }
  }, [activeSession]);
  useEffect(() => {
    if (lastFinishedSession) {
      localStorage.setItem("naavik_last_finished_session", JSON.stringify(lastFinishedSession));
    }
  }, [lastFinishedSession]);

  // Session timer tick
  useEffect(() => {
    let interval: any = null;
    if (activeSession && activeSession.active) {
      interval = setInterval(() => {
        setActiveSession((prev) => (prev ? { ...prev, seconds: prev.seconds + 1 } : null));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  // Guided Modal Navigation
  const openStartSessionModal = () => {
    setSessionStep(1);
    setSelectedCategory(null);
    setSelectedPillar(null);
    setSelectedModule(null);
    setSelectedTopic(null);
    setShowSessionModal(true);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedPillar(null);
    setSelectedModule(null);
    setSelectedTopic(null);
    setSessionStep(2);
  };

  const handleSelectPillar = (pillar: string) => {
    setSelectedPillar(pillar);
    setSelectedModule(null);
    setSelectedTopic(null);
    setSessionStep(3);
  };

  const handleSelectModule = (mod: string) => {
    setSelectedModule(mod);
    setSelectedTopic(null);
    setSessionStep(4);
  };

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
  };

  const startGuidedSession = () => {
    if (!selectedCategory || !selectedPillar || !selectedModule || !selectedTopic) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newSession: ActiveStudySession = {
      category: selectedCategory,
      pillar: selectedPillar,
      module: selectedModule,
      topic: selectedTopic,
      startTime: nowStr,
      seconds: 0,
      active: true,
      status: "Running"
    };
    setActiveSession(newSession);
    setShowSessionModal(false);
    showToast(`Session Started: ${selectedTopic}`);
  };

  const togglePauseResumeSession = () => {
    if (!activeSession) return;
    const isNowActive = !activeSession.active;
    setActiveSession({
      ...activeSession,
      active: isNowActive,
      status: isNowActive ? "Running" : "Paused"
    });
  };

  const finishSession = () => {
    if (!activeSession || activeSession.seconds === 0) return;
    const elapsed = activeSession.seconds;
    setTodaySecondsLogged((prev) => prev + elapsed);
    setCompletedSessionsCount((prev) => prev + 1);
    
    const finished: FinishedSession = {
      category: activeSession.category,
      pillar: activeSession.pillar,
      module: activeSession.module,
      topic: activeSession.topic,
      finishedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setLastFinishedSession(finished);
    setActiveSession(null);
    showToast(`Session Finished! +${Math.round(elapsed / 60)} mins logged.`);
  };

  const resumePreviousSession = () => {
    if (!lastFinishedSession) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const resumed: ActiveStudySession = {
      category: lastFinishedSession.category,
      pillar: lastFinishedSession.pillar,
      module: lastFinishedSession.module,
      topic: lastFinishedSession.topic,
      startTime: nowStr,
      seconds: 0,
      active: true,
      status: "Running"
    };
    setActiveSession(resumed);
    showToast(`Resumed: ${lastFinishedSession.topic}`);
  };

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Task actions
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: TaskItem = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      priority: newTaskPriority,
      dueTime: newTaskDue.trim() || undefined,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setNewTaskDue("");
    setIsAddingTask(false);
    showToast("Task added.");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const duplicateTask = (t: TaskItem) => {
    const dup: TaskItem = { ...t, id: Date.now().toString(), text: `${t.text} (Copy)` };
    setTasks([...tasks, dup]);
    showToast("Task duplicated.");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const moveTask = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === tasks.length - 1) return;
    const updated = [...tasks];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setTasks(updated);
  };

  // Note actions
  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      pinned: false,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setShowAddNoteModal(false);
    showToast("Note saved.");
  };

  const togglePinNote = (id: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // Study Block Plan actions
  const addPlanBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockTime.trim() || !newBlockSubject.trim()) return;
    const newBlock: PlanBlockItem = {
      id: Date.now().toString(),
      time: newBlockTime.trim(),
      duration: newBlockDuration.trim() || "2h",
      subject: newBlockSubject.trim(),
      module: newBlockModule.trim() || undefined,
      topic: newBlockTopic.trim() || undefined,
      priority: newBlockPriority,
      completed: false
    };
    const updated = [...planBlocks, newBlock].sort((a, b) => a.time.localeCompare(b.time));
    setPlanBlocks(updated);
    setNewBlockTime("");
    setNewBlockSubject("");
    setNewBlockModule("");
    setNewBlockTopic("");
    setShowAddPlanBlockModal(false);
    showToast("Study block added.");
  };

  const togglePlanBlockComplete = (id: string) => {
    setPlanBlocks(planBlocks.map((b) => (b.id === id ? { ...b, completed: !b.completed } : b)));
  };

  const deletePlanBlock = (id: string) => {
    setPlanBlocks(planBlocks.filter((b) => b.id !== id));
  };

  // Action Center actions
  const addActionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim() || !newActionDate.trim()) return;
    const newAction: ActionItem = {
      id: Date.now().toString(),
      title: newActionTitle.trim(),
      category: newActionCategory,
      priority: newActionPriority,
      dueDate: newActionDate.trim(),
      completed: false,
    };
    setActionItems([...actionItems, newAction]);
    setNewActionTitle("");
    setNewActionDate("");
    setIsAddingAction(false);
    showToast("Action item added.");
  };

  const toggleActionComplete = (id: string) => {
    setActionItems(actionItems.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)));
  };

  const deleteActionItem = (id: string) => {
    setActionItems(actionItems.filter((a) => a.id !== id));
  };

  // Calculations
  const currentSessionSecs = activeSession ? activeSession.seconds : 0;
  const totalSeconds = todaySecondsLogged + currentSessionSecs;
  const todayHoursNumber = parseFloat((totalSeconds / 3600).toFixed(1));
  const totalWeeklySeconds = weeklySecondsLogged + totalSeconds;
  const weeklyHoursNumber = parseFloat((totalWeeklySeconds / 3600).toFixed(1));
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  // Filtered Lists & Caps
  const filteredTasks = tasks.filter((t) => t.text.toLowerCase().includes(taskSearch.toLowerCase()));
  const filteredNotes = notes
    .filter((n) => n.title.toLowerCase().includes(noteSearch.toLowerCase()) || n.content.toLowerCase().includes(noteSearch.toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  const visibleNotes = filteredNotes.slice(0, 3);

  // Sorted Action Center Items
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  const sortedActionItems = [...actionItems].sort(
    (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
  );

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2 gap-1.5 max-w-[1600px] mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 right-6 z-50 px-3 py-1.5 rounded-lg bg-[var(--accent-purple)] text-white text-xs font-semibold shadow-lg">
          {toastMessage}
        </div>
      )}

      {/* ------------------ TODAY HEADER & ENHANCED DAILY GOAL ------------------ */}
      <div
        style={{ minHeight: `${layoutProps.headerHeight || 48}px` }}
        className="os-card px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 relative group/header transition-[min-height] duration-75"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wide">
            Daily Study Workspace
          </h1>
          <span className="text-xs font-mono font-semibold text-[var(--text-muted)] border-l border-[var(--border-color)] pl-2.5">
            {todayDateStr}
          </span>
        </div>

        {/* Today's Goal Progress Bar & Interactive Goal Editor */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              {isEditingGoal ? (
                <div className="flex items-center gap-2 w-full bg-[var(--bg-secondary)] p-1 rounded border border-[var(--accent-purple)]">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Daily:</span>
                    <input
                      type="number"
                      min={1}
                      max={24}
                      value={dailyGoalTarget}
                      onChange={(e) => setDailyGoalTarget(Number(e.target.value))}
                      className="os-input w-11 px-1 py-0.2 text-xs font-mono font-bold"
                    />
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold">h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Weekly:</span>
                    <input
                      type="number"
                      min={1}
                      max={168}
                      value={weeklyGoalTarget}
                      onChange={(e) => setWeeklyGoalTarget(Number(e.target.value))}
                      className="os-input w-11 px-1 py-0.2 text-xs font-mono font-bold"
                    />
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold">h</span>
                  </div>
                  <div className="flex items-center gap-1 flex-1">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Target:</span>
                    <input
                      type="text"
                      placeholder="Topic..."
                      value={dailyGoalTopic}
                      onChange={(e) => setDailyGoalTopic(e.target.value)}
                      className="os-input flex-1 px-1 py-0.2 text-xs font-semibold"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setIsEditingGoal(false);
                      showToast("Goals updated!");
                    }}
                    className="os-btn px-2.5 py-0.5 bg-[var(--accent-purple)] text-white text-[10px] font-bold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
                    Today's Goal: <strong className="text-[var(--text-primary)] font-mono text-xs font-extrabold">{todayHoursNumber} / {dailyGoalTarget} hrs</strong>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--accent-purple)] font-extrabold text-xs truncate max-w-[240px]">
                      Target: {dailyGoalTopic || "Set Target"}
                    </span>
                    <button
                      onClick={() => setIsEditingGoal(true)}
                      className="text-[var(--text-muted)] hover:text-[var(--accent-purple)] p-0.5"
                      title="Click to edit Daily & Weekly Targets and Topic"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden border border-[var(--border-color)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent-purple)] to-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (todayHoursNumber / dailyGoalTarget) * 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-[var(--border-color)] pl-3 shrink-0">
            <button
              onClick={resetLayout}
              className="os-btn px-2 py-1 bg-[var(--bg-secondary)] hover:bg-[var(--accent-purple)] hover:text-white text-[10px] font-semibold flex items-center gap-1"
              title="Reset all cards to default proportions"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Layout</span>
            </button>
          </div>
        </div>

        {/* Bottom Handle (Vertical Height Resize) */}
        <div
          onPointerDown={handleHeaderResize}
          className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
          title="Drag bottom edge to resize header height"
        />
      </div>

      {/* ------------------ PREVIOUS 3-COLUMN WORKSPACE GRID (RESTORED EXACTLY) ------------------ */}
      <div
        className="grid gap-2 flex-1 overflow-hidden transition-all duration-100"
        style={{
          display: "grid",
          gridTemplateColumns: `${layoutProps.col1Ratio}fr ${layoutProps.col2Ratio}fr ${layoutProps.col3Ratio}fr`,
        }}
      >
        {/* ================= COLUMN 1: PROGRESS SUMMARY + TODAY'S TASKS ================= */}
        <div className="flex flex-col gap-2 h-full overflow-hidden min-w-0">
          
          {/* PROGRESS SUMMARY (Exact Previous Card Design) */}
          <div
            style={{ height: `${layoutProps.progressHeight}px` }}
            className="os-card p-2 flex flex-col justify-between shrink-0 border-[var(--accent-purple)]/20 shadow-xs relative group/progress transition-[height] duration-75"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-1 shrink-0">
              <span className="text-[10.5px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
                Progress Summary
              </span>
              <span className="text-[8.5px] font-mono text-[var(--accent-purple)] font-semibold">
                Real-Time
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1 pt-1 items-center flex-1">
              <div className="p-1 rounded bg-[var(--bg-secondary)] text-center border border-[var(--border-color)]">
                <span className="text-[7.5px] font-semibold text-[var(--text-muted)] uppercase block">Today's Study</span>
                <span className="text-xs font-bold text-[var(--text-primary)] block font-mono mt-0.5">{todayHoursNumber}/{dailyGoalTarget}h</span>
              </div>
              <div className="p-1 rounded bg-[var(--bg-secondary)] text-center border border-[var(--border-color)]">
                <span className="text-[7.5px] font-semibold text-[var(--text-muted)] uppercase block">Weekly Goal</span>
                <span className="text-xs font-bold text-[var(--text-primary)] block font-mono mt-0.5">{weeklyHoursNumber}/{weeklyGoalTarget}h</span>
              </div>
              <div className="p-1 rounded bg-[var(--bg-secondary)] text-center border border-[var(--border-color)]">
                <span className="text-[7.5px] font-semibold text-[var(--text-muted)] uppercase block">Completion</span>
                <span className="text-xs font-bold text-emerald-500 block font-mono mt-0.5">{completionPercentage}%</span>
              </div>
              <div className="p-1 rounded bg-[var(--bg-secondary)] text-center border border-[var(--border-color)]">
                <span className="text-[7.5px] font-semibold text-[var(--text-muted)] uppercase block">Streak</span>
                <span className="text-xs font-bold text-[var(--accent-purple)] block mt-0.5">{streakDays} {streakDays === 1 ? "Day" : "Days"}</span>
              </div>
              <div className="p-1 rounded bg-[var(--bg-secondary)] text-center border border-[var(--border-color)]">
                <span className="text-[7.5px] font-semibold text-[var(--text-muted)] uppercase block">Sessions</span>
                <span className="text-xs font-bold text-[var(--text-primary)] block font-mono mt-0.5">{completedSessionsCount}</span>
              </div>
            </div>

            {/* Right Handle (Horizontal Width) */}
            <div
              onPointerDown={handleCol1WidthResize}
              className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
              title="Drag right edge to resize column width"
            />

            {/* Bottom Handle (Vertical Height) */}
            <div
              onPointerDown={handleProgressResize}
              className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
              title="Drag bottom edge to resize height"
            />

            {/* Corner Handle (Width + Height) */}
            <div
              onPointerDown={handleCornerCol1Resize}
              className="absolute right-0 bottom-0 w-3 h-3 cursor-nwse-resize hover:bg-[var(--accent-purple)] transition-colors z-30 rounded-tl"
              title="Drag corner to resize width & height"
            />
          </div>

          {/* TODAY'S TASKS (Exact Previous Design, Flex-1) */}
          <div className="os-card p-2.5 flex flex-col justify-between overflow-hidden flex-1 min-h-[140px] relative group/tasks">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-1.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
                  Today's Tasks
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                  {completedTasksCount}/{tasks.length}
                </span>
              </div>
              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="os-btn px-2 py-0.5 bg-[var(--accent-purple)] text-white text-[10px] font-semibold flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Add Task Form */}
            {isAddingTask && (
              <form onSubmit={addTask} className="p-2 rounded bg-[var(--bg-secondary)] my-1 space-y-1 shrink-0">
                <input
                  type="text"
                  placeholder="Task description..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="os-input px-2 py-0.5 text-xs w-full"
                  autoFocus
                />
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <select
                      value={newTaskPriority}
                      onChange={(e: any) => setNewTaskPriority(e.target.value)}
                      className="os-input px-1 py-0.5 text-[9px]"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Med</option>
                      <option value="Low">Low</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Due (2h)"
                      value={newTaskDue}
                      onChange={(e) => setNewTaskDue(e.target.value)}
                      className="os-input px-1 py-0.5 text-[9px] w-20"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingTask(false)}
                      className="os-btn px-1.5 py-0.5 text-[9px] text-[var(--text-secondary)]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="os-btn px-2 py-0.5 bg-[var(--accent-purple)] text-white text-[9px] font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Task List */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-1 space-y-1.5">
              {filteredTasks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-3">
                  <CheckCircle2 className="h-6 w-6 text-[var(--text-muted)] mb-1 opacity-40" />
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">No tasks planned.</span>
                </div>
              ) : (
                filteredTasks.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`group flex items-center justify-between p-1.5 rounded border transition-colors text-xs ${
                      t.completed
                        ? "bg-[var(--bg-secondary)] border-transparent opacity-60"
                        : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-purple)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        onClick={() => toggleTask(t.id)}
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border cursor-pointer ${
                          t.completed ? "bg-[var(--accent-purple)] border-[var(--accent-purple)] text-white" : "border-[var(--border-color)] bg-[var(--bg-card)]"
                        }`}
                      >
                        {t.completed && <Check className="h-2.5 w-2.5" />}
                      </div>
                      <span
                        onClick={() => toggleTask(t.id)}
                        className={`truncate font-medium cursor-pointer select-none ${t.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}
                      >
                        {t.text}
                      </span>
                      {t.dueTime && <span className="text-[9px] font-mono text-[var(--text-muted)] shrink-0">{t.dueTime}</span>}
                      {t.priority === "High" && <span className="text-[8px] font-bold text-red-500 uppercase px-1 py-0.2 rounded bg-red-500/10 border border-red-500/20 shrink-0">High</span>}
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0">
                      <button onClick={() => duplicateTask(t)} className="p-0.5 hover:text-[var(--accent-purple)] text-[var(--text-muted)]" title="Duplicate"><Copy className="h-3 w-3" /></button>
                      <button onClick={() => moveTask(idx, "up")} disabled={idx === 0} className="p-0.5 hover:text-[var(--accent-purple)] disabled:opacity-20 text-[var(--text-muted)]"><ArrowUp className="h-3 w-3" /></button>
                      <button onClick={() => moveTask(idx, "down")} disabled={idx === filteredTasks.length - 1} className="p-0.5 hover:text-[var(--accent-purple)] disabled:opacity-20 text-[var(--text-muted)]"><ArrowDown className="h-3 w-3" /></button>
                      <button onClick={() => deleteTask(t.id)} className="p-0.5 hover:text-red-500 text-[var(--text-muted)]"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[var(--border-color)] pt-1 flex items-center justify-between shrink-0 text-[10px]">
              <span className="text-[var(--text-muted)] font-semibold">{tasks.length} Total Tasks ({completedTasksCount} Done)</span>
              <button onClick={() => setShowAllTasksModal(true)} className="text-[var(--accent-purple)] font-semibold hover:underline">View Full Manager</button>
            </div>

            {/* Right Handle (Horizontal Width) */}
            <div
              onPointerDown={handleCol1WidthResize}
              className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
              title="Drag right edge to resize column width"
            />
          </div>
        </div>

        {/* ================= COLUMN 2: TODAY'S PLAN + QUICK NOTES ================= */}
        <div className="flex flex-col gap-2 h-full overflow-hidden min-w-0">
          
          {/* TODAY'S PLAN (Exact Previous Design) */}
          <div
            style={{ height: `${layoutProps.planRatio}%` }}
            className="os-card p-2.5 flex flex-col justify-between overflow-hidden shrink-0 min-h-[140px] relative group/plan transition-[height] duration-75"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-1.5 shrink-0">
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
                Today's Plan
              </span>
              <button
                onClick={() => setShowAddPlanBlockModal(true)}
                className="os-btn px-2 py-0.5 bg-[var(--accent-purple)] text-white text-[10px] font-semibold flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Add Block</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-1 space-y-1.5">
              {planBlocks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-3">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">No study blocks scheduled.</span>
                </div>
              ) : (
                planBlocks.map((b) => (
                  <div
                    key={b.id}
                    className={`group flex items-center justify-between p-1.5 rounded text-xs border transition-colors ${
                      b.completed ? "bg-[var(--bg-secondary)] border-transparent opacity-60" : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-purple)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                      <span className="font-mono text-[11px] font-bold text-[var(--accent-purple)] shrink-0 w-11">{b.time}</span>
                      <div className="border-l border-[var(--border-color)] pl-2 truncate min-w-0">
                        <span className={`font-semibold truncate block ${b.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>{b.subject}</span>
                        {b.module && <span className="text-[9px] text-[var(--text-muted)] block truncate">{b.module} {b.topic ? `• ${b.topic}` : ''}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <span className="font-mono text-[9px] text-[var(--text-muted)] font-semibold">{b.duration}</span>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => togglePlanBlockComplete(b.id)} className={`p-0.5 ${b.completed ? "text-emerald-500" : "text-[var(--text-muted)] hover:text-emerald-500"}`}><Check className="h-3 w-3" /></button>
                        <button onClick={() => deletePlanBlock(b.id)} className="p-0.5 text-[var(--text-muted)] hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right Handle (Horizontal Width) */}
            <div
              onPointerDown={handleCol2WidthResize}
              className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
              title="Drag right edge to resize column width"
            />

            {/* Bottom Handle (Vertical Height) */}
            <div
              onPointerDown={handlePlanResize}
              className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
              title="Drag bottom edge to resize height ratio"
            />

            {/* Corner Handle (Width + Height) */}
            <div
              onPointerDown={handleCornerCol2Resize}
              className="absolute right-0 bottom-0 w-3 h-3 cursor-nwse-resize hover:bg-[var(--accent-purple)] transition-colors z-30 rounded-tl"
              title="Drag corner to resize width & height"
            />
          </div>

          {/* QUICK NOTES (Exact Previous Design, Flex-1) */}
          <div className="os-card p-2.5 flex flex-col justify-between overflow-hidden flex-1 min-h-[120px] relative group/notes">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-1.5 shrink-0">
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
                Quick Notes
              </span>
              <button
                onClick={() => setShowAddNoteModal(true)}
                className="os-btn px-2 py-0.5 bg-[var(--accent-purple)] text-white text-[10px] font-semibold flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>New Note</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-1 space-y-1">
              {visibleNotes.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-3">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">No notes yet.</span>
                </div>
              ) : (
                visibleNotes.map((n) => (
                  <div
                    key={n.id}
                    className={`p-1.5 rounded border text-xs space-y-0.5 transition-colors ${
                      n.pinned ? "bg-[var(--bg-secondary)] border-[var(--accent-purple)]/40" : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-purple)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[var(--text-primary)] truncate">{n.title}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[8px] font-mono text-[var(--text-muted)]">{n.createdAt}</span>
                        <button onClick={() => togglePinNote(n.id)} className={`p-0.5 ${n.pinned ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)]"}`}><Pin className="h-3 w-3" /></button>
                        <button onClick={() => deleteNote(n.id)} className="p-0.5 text-[var(--text-muted)] hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                    {n.content && <p className="text-[10px] text-[var(--text-secondary)] line-clamp-1 leading-tight">{n.content}</p>}
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[var(--border-color)] pt-1 flex items-center justify-between shrink-0 text-[10px]">
              <span className="text-[var(--text-muted)]">{notes.length} Total Notes</span>
              <button onClick={() => setShowAllNotesModal(true)} className="text-[var(--accent-purple)] font-semibold hover:underline">View All Notes</button>
            </div>

            {/* Right Handle (Horizontal Width) */}
            <div
              onPointerDown={handleCol2WidthResize}
              className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
              title="Drag right edge to resize column width"
            />
          </div>
        </div>

        {/* ================= COLUMN 3: CURRENT SESSION + ACTION CENTER ================= */}
        <div className="flex flex-col gap-2 h-full overflow-hidden min-w-0">
          
          {/* CURRENT SESSION (Exact Previous Design) */}
          <div
            style={{ height: `${layoutProps.sessionRatio}%` }}
            className="os-card p-2.5 flex flex-col justify-between shrink-0 overflow-hidden min-h-[130px] relative group/session transition-[height] duration-75"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-1">
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
                Current Session
              </span>
              {activeSession && (
                <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] uppercase">
                  {activeSession.pillar}
                </span>
              )}
            </div>

            {activeSession ? (
              <div className="space-y-1 text-center py-1">
                <h3 className="text-xs font-bold text-[var(--accent-purple)] truncate">Module: {activeSession.module}</h3>
                <p className="text-[11px] font-semibold text-[var(--text-primary)] truncate">Topic: {activeSession.topic}</p>
                <div className="text-xl font-mono font-bold text-[var(--text-primary)] pt-0.5">{formatTimer(activeSession.seconds)}</div>
                <span className="text-[9px] text-[var(--text-muted)] block font-mono">Started at {activeSession.startTime}</span>

                <div className="flex items-center gap-1 mt-1">
                  <button onClick={togglePauseResumeSession} className={`os-btn px-2 py-1 text-xs font-semibold flex items-center justify-center gap-1 flex-1 ${activeSession.active ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple-hover)]"}`}>
                    {activeSession.active ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    <span>{activeSession.active ? "Pause" : "Resume"}</span>
                  </button>
                  <button onClick={finishSession} className="os-btn px-2.5 py-1 bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold">Finish</button>
                </div>
              </div>
            ) : lastFinishedSession ? (
              <div className="text-center py-1 space-y-1">
                <span className="text-[9px] font-bold text-[var(--accent-purple)] uppercase tracking-wider block">Continue Learning</span>
                <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{lastFinishedSession.module}</h4>
                <p className="text-[10px] text-[var(--text-secondary)] truncate">{lastFinishedSession.topic}</p>

                <div className="flex items-center gap-1 pt-1">
                  <button onClick={resumePreviousSession} className="os-btn px-2 py-1 bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold flex items-center justify-center gap-1 flex-1">
                    <RotateCcw className="h-3 w-3" />
                    <span>Resume Session</span>
                  </button>
                  <button onClick={openStartSessionModal} className="os-btn px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-purple)] hover:text-white text-xs font-semibold">New Session</button>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 space-y-1.5">
                <span className="text-xs font-semibold text-[var(--text-secondary)] block">No active study session.</span>
                <button onClick={openStartSessionModal} className="os-btn px-3 py-1 bg-[var(--accent-purple)] text-white text-xs font-semibold flex items-center justify-center gap-1 mx-auto">
                  <Play className="h-3.5 w-3.5" />
                  <span>Start Session</span>
                </button>
              </div>
            )}

            {/* Bottom Handle (Vertical Height) */}
            <div
              onPointerDown={handleSessionResize}
              className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-[var(--accent-purple)]/40 transition-colors z-20"
              title="Drag bottom edge to resize height ratio"
            />
          </div>

          {/* ACTION CENTER (Exact Previous Design, Flex-1) */}
          <div className="os-card p-2.5 flex flex-col justify-between overflow-hidden flex-1 min-h-[140px] relative group/action">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-1 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
                  Action Center
                </span>
                <span className="text-[8px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {sortedActionItems.length}
                </span>
              </div>
              <button onClick={() => setIsAddingAction(!isAddingAction)} className="text-[10px] text-[var(--accent-purple)] font-semibold hover:underline flex items-center gap-0.5">
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Add Action Form */}
            {isAddingAction && (
              <form onSubmit={addActionItem} className="p-1.5 rounded bg-[var(--bg-secondary)] my-1 space-y-1 shrink-0">
                <input type="text" placeholder="Action reminder (e.g. Internship)" value={newActionTitle} onChange={(e) => setNewActionTitle(e.target.value)} className="os-input px-2 py-0.5 text-[11px] w-full" autoFocus />
                <div className="flex gap-1">
                  <select value={newActionCategory} onChange={(e: any) => setNewActionCategory(e.target.value)} className="os-input px-1 py-0.5 text-[9px] w-24">
                    <option value="Internship">Internship</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Certification">Cert Exam</option>
                    <option value="Project">Project</option>
                    <option value="Open Source">Open Source</option>
                    <option value="DSA Goal">DSA Goal</option>
                    <option value="Revision">Revision</option>
                    <option value="Competition">Competition</option>
                  </select>
                  <select value={newActionPriority} onChange={(e: any) => setNewActionPriority(e.target.value)} className="os-input px-1 py-0.5 text-[9px]">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <input type="text" placeholder="Aug 15" value={newActionDate} onChange={(e) => setNewActionDate(e.target.value)} className="os-input px-1 py-0.5 text-[9px] flex-1" />
                </div>
                <div className="flex items-center justify-end gap-1">
                  <button type="button" onClick={() => setIsAddingAction(false)} className="os-btn px-2 py-0.5 text-[9px] text-[var(--text-secondary)]">Cancel</button>
                  <button type="submit" className="os-btn px-2 py-0.5 bg-[var(--accent-purple)] text-white text-[9px] font-semibold">Save</button>
                </div>
              </form>
            )}

            {/* Action Items List */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-1 space-y-1.5">
              {sortedActionItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-2">
                  <AlertTriangle className="h-6 w-6 text-[var(--text-muted)] opacity-40 mb-1" />
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">No action items.</span>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Reminders for internships & certs appear here.</p>
                </div>
              ) : (
                sortedActionItems.map((a) => (
                  <div
                    key={a.id}
                    className={`group flex items-center justify-between p-1.5 rounded text-[11px] border transition-colors ${
                      a.completed ? "bg-[var(--bg-secondary)] border-transparent opacity-60" : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-purple)]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
                      <div onClick={() => toggleActionComplete(a.id)} className={`flex h-3 w-3 shrink-0 items-center justify-center rounded border cursor-pointer ${a.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-[var(--border-color)] bg-[var(--bg-card)]"}`}>
                        {a.completed && <Check className="h-2 w-2" />}
                      </div>
                      <span className={`text-[8px] font-bold uppercase px-1 py-0.2 rounded shrink-0 ${a.priority === "High" ? "bg-red-500/10 text-red-500 border border-red-500/20" : a.priority === "Medium" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)]"}`}>
                        {a.priority}
                      </span>
                      <span onClick={() => toggleActionComplete(a.id)} className={`font-semibold truncate cursor-pointer select-none ${a.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>
                        {a.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <span className="font-mono text-[9px] text-[var(--text-muted)] font-semibold">{a.dueDate}</span>
                      <button onClick={() => deleteActionItem(a.id)} className="p-0.5 text-[var(--text-muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Dismiss">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ MODAL: ADD STUDY BLOCK PLAN ------------------ */}
      {showAddPlanBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form onSubmit={addPlanBlock} className="os-card p-4 max-w-md w-full space-y-3 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">+ Add Study Block</h3>
              <button type="button" onClick={() => setShowAddPlanBlockModal(false)}>
                <X className="h-4 w-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-[var(--text-muted)] uppercase block mb-0.5">Start Time</label>
                  <input type="text" placeholder="09:00" value={newBlockTime} onChange={(e) => setNewBlockTime(e.target.value)} className="os-input w-full px-2 py-1 text-xs" autoFocus required />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-[var(--text-muted)] uppercase block mb-0.5">Duration</label>
                  <input type="text" placeholder="2h" value={newBlockDuration} onChange={(e) => setNewBlockDuration(e.target.value)} className="os-input w-full px-2 py-1 text-xs" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-[var(--text-muted)] uppercase block mb-0.5">Subject / Pillar</label>
                <input type="text" placeholder="Software Engineering" value={newBlockSubject} onChange={(e) => setNewBlockSubject(e.target.value)} className="os-input w-full px-2 py-1 text-xs" required />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-[var(--border-color)] pt-2.5">
              <button type="button" onClick={() => setShowAddPlanBlockModal(false)} className="os-btn px-3 py-1 text-xs text-[var(--text-secondary)]">Cancel</button>
              <button type="submit" className="os-btn px-4 py-1 bg-[var(--accent-purple)] text-white text-xs font-semibold">Save Block</button>
            </div>
          </form>
        </div>
      )}

      {/* ------------------ MODAL: ADD QUICK NOTE ------------------ */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form onSubmit={addNote} className="os-card p-4 max-w-md w-full space-y-2.5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
              <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">+ New Quick Note</h3>
              <button type="button" onClick={() => setShowAddNoteModal(false)}>
                <X className="h-4 w-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
              </button>
            </div>
            <div className="space-y-2">
              <input type="text" placeholder="Note title..." value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} className="os-input w-full px-2.5 py-1 text-xs font-semibold" autoFocus required />
              <textarea placeholder="Quick thoughts..." value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} rows={4} className="os-input w-full px-2.5 py-1 text-xs resize-none" />
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-[var(--border-color)] pt-2">
              <button type="button" onClick={() => setShowAddNoteModal(false)} className="os-btn px-3 py-1 text-xs text-[var(--text-secondary)]">Cancel</button>
              <button type="submit" className="os-btn px-4 py-1 bg-[var(--accent-purple)] text-white text-xs font-semibold">Save Note</button>
            </div>
          </form>
        </div>
      )}

      {/* ------------------ GUIDED 4-STEP STUDY SESSION MODAL ------------------ */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="os-card p-4 max-w-md w-full flex flex-col justify-between shadow-2xl border-[var(--accent-purple)]/30 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">Start Study Session</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] font-bold">Step {sessionStep} of 4</span>
              </div>
              <button onClick={() => setShowSessionModal(false)}>
                <X className="h-4 w-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
              </button>
            </div>

            <div className="my-3 space-y-2 min-h-[200px] flex flex-col justify-center">
              {sessionStep === 1 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[var(--text-secondary)] block text-center mb-1">Step 1: Select Category</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {Object.keys(STUDY_TAXONOMY).map((cat) => (
                      <button key={cat} onClick={() => handleSelectCategory(cat)} className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--accent-purple)] hover:text-white text-xs font-bold text-left transition-colors flex items-center justify-between">
                        <span>{cat}</span>
                        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sessionStep === 2 && selectedCategory && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <button onClick={() => setSessionStep(1)} className="text-[10px] text-[var(--accent-purple)] font-semibold flex items-center gap-0.5 hover:underline">
                      <ChevronLeft className="h-3 w-3" />
                      <span>Back to Categories</span>
                    </button>
                    <span className="text-[10px] font-semibold text-[var(--text-muted)]">Category: {selectedCategory}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {Object.keys(STUDY_TAXONOMY[selectedCategory] || {}).map((pillar) => (
                      <button key={pillar} onClick={() => handleSelectPillar(pillar)} className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--accent-purple)] hover:text-white text-xs font-bold text-left transition-colors flex items-center justify-between">
                        <span>{pillar}</span>
                        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sessionStep === 3 && selectedCategory && selectedPillar && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <button onClick={() => setSessionStep(2)} className="text-[10px] text-[var(--accent-purple)] font-semibold flex items-center gap-0.5 hover:underline">
                      <ChevronLeft className="h-3 w-3" />
                      <span>Back to Pillars</span>
                    </button>
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] truncate max-w-[180px]">{selectedPillar}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 max-h-[210px] overflow-y-auto pr-1 no-scrollbar">
                    {Object.keys(STUDY_TAXONOMY[selectedCategory]?.[selectedPillar] || {}).map((mod) => (
                      <button key={mod} onClick={() => handleSelectModule(mod)} className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--accent-purple)] hover:text-white text-xs font-bold text-left transition-colors flex items-center justify-between">
                        <span>{mod}</span>
                        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sessionStep === 4 && selectedCategory && selectedPillar && selectedModule && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <button onClick={() => setSessionStep(3)} className="text-[10px] text-[var(--accent-purple)] font-semibold flex items-center gap-0.5 hover:underline">
                      <ChevronLeft className="h-3 w-3" />
                      <span>Back to Modules</span>
                    </button>
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] truncate max-w-[180px]">Module: {selectedModule}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 max-h-[200px] overflow-y-auto pr-1 no-scrollbar">
                    {(STUDY_TAXONOMY[selectedCategory]?.[selectedPillar]?.[selectedModule] || []).map((topic) => (
                      <button key={topic} onClick={() => handleSelectTopic(topic)} className={`p-2 rounded-lg text-xs font-semibold text-left transition-colors flex items-center justify-between ${selectedTopic === topic ? "bg-[var(--accent-purple)] text-white font-bold" : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)]"}`}>
                        <span>{topic}</span>
                        {selectedTopic === topic && <Check className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--border-color)] pt-2.5 flex items-center justify-between gap-2">
              <button onClick={() => setShowSessionModal(false)} className="os-btn px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">Cancel</button>
              {sessionStep === 4 && selectedTopic && (
                <button onClick={startGuidedSession} className="os-btn px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md animate-pulse">
                  <Play className="h-3.5 w-3.5" />
                  <span>Start Session</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------ MODALS: VIEW ALL TASKS / NOTES ------------------ */}
      {showAllTasksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="os-card p-4 max-w-lg w-full max-h-[80vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">All Today's Tasks ({tasks.length})</h3>
              <button onClick={() => setShowAllTasksModal(false)}><X className="h-4 w-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]" /></button>
            </div>
            <div className="flex-1 overflow-y-auto my-3 space-y-1.5 max-h-[50vh] pr-1">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-2 rounded bg-[var(--bg-secondary)] text-xs">
                  <div className="flex items-center gap-2">
                    <Check className={`h-3 w-3 ${t.completed ? "text-emerald-500" : "text-gray-400"}`} />
                    <span className={t.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}>{t.text}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">{t.priority}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAllTasksModal(false)} className="os-btn w-full py-1.5 bg-[var(--bg-secondary)] text-xs font-semibold">Close</button>
          </div>
        </div>
      )}

      {showAllNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="os-card p-4 max-w-lg w-full max-h-[80vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">All Quick Notes ({notes.length})</h3>
              <button onClick={() => setShowAllNotesModal(false)}><X className="h-4 w-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]" /></button>
            </div>
            <div className="flex-1 overflow-y-auto my-3 space-y-2 max-h-[50vh] pr-1">
              {notes.map((n) => (
                <div key={n.id} className="p-2 rounded bg-[var(--bg-secondary)] text-xs space-y-1">
                  <span className="font-bold text-[var(--text-primary)] block">{n.title}</span>
                  <p className="text-[11px] text-[var(--text-secondary)]">{n.content}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowAllNotesModal(false)} className="os-btn w-full py-1.5 bg-[var(--bg-secondary)] text-xs font-semibold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudyDashboardPage() {
  return (
    <StudyProvider>
      <DailyStudyWorkspaceContent />
    </StudyProvider>
  );
}
