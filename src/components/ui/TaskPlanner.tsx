"use client";

import { useState } from "react";
import { useTasks, TaskItem } from "@/context/TaskContext";
import {
  Plus,
  Check,
  Trash2,
  Edit2,
  Clock,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TaskPlanner() {
  const {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useTasks();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<"Study" | "Startup" | "Money">("Study");
  const [newTaskPriority, setNewTaskPriority] = useState<"High" | "Medium" | "Low">("High");
  const [newTaskTime, setNewTaskTime] = useState("1.0 hr");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask(newTaskTitle, newTaskCategory, newTaskPriority, newTaskTime);
    setNewTaskTitle("");
  };

  const duplicateTask = (task: TaskItem) => {
    addTask(`${task.title} (Copy)`, task.category, task.priority, task.time);
  };

  const startEdit = (task: TaskItem) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = (id: string, category: "Study" | "Startup" | "Money", priority: "High" | "Medium" | "Low", time: string) => {
    if (editTitle.trim()) {
      editTask(id, editTitle.trim(), category, priority, time);
    }
    setEditingTaskId(null);
  };

  // Filter & Search Logic
  let filtered = tasks.filter((t) => {
    if (filterCategory !== "All" && t.category !== filterCategory) return false;
    if (searchQuery.trim() && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort Logic
  filtered.sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return b.createdAt - a.createdAt;
  });

  const activeTasks = filtered.filter((t) => !t.completed);
  const completedTasks = filtered.filter((t) => t.completed);

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Study":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Startup":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "Money":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";
      case "Medium":
        return "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "Low":
        return "text-zinc-600 dark:text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="os-card p-4 flex flex-col justify-between h-full border-[var(--border-color)]">
      {/* Header & Controls */}
      <div className="shrink-0 bg-[var(--bg-card)]">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--accent-purple)] text-white shadow-xs">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-[var(--text-primary)] leading-none">
                  Today's Tasks
                </h2>
                <span className="text-[10px] font-extrabold text-[var(--accent-purple)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-full border border-[var(--border-color)]">
                  {completedCount}/{tasks.length} ({completionPercent}%)
                </span>
              </div>
              <p className="text-[11px] font-medium text-[var(--text-secondary)] mt-0.5">
                Execute core daily missions across Study, Startup, and Money.
              </p>
            </div>
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-3.5 w-3.5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="os-input pl-8.5 pr-2.5 py-1 text-xs w-32 sm:w-40 focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="os-input px-2.5 py-1 text-xs focus:outline-none font-semibold"
            >
              <option value="date">Sort: Date</option>
              <option value="priority">Sort: Priority</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>
        </div>

        {/* Filter Category Pills & Completed Toggle */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {["All", "Study", "Startup", "Money"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 text-[11px] font-bold rounded-[8px] border transition-all ${
                  filterCategory === cat
                    ? "bg-[var(--accent-purple)] text-white border-[var(--accent-purple)] shadow-xs"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-purple)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-1 text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>{showCompleted ? "Hide Done" : "Show Done"}</span>
            {showCompleted ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Command Add Task Bar */}
        <form onSubmit={handleAddTask} className="mt-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Add task for today and press Enter..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 os-input px-3.5 py-2 text-xs font-medium focus:outline-none placeholder-[var(--text-muted)]"
          />

          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value as any)}
            className="os-input px-2.5 py-2 text-xs font-semibold focus:outline-none"
          >
            <option value="Study">Study</option>
            <option value="Startup">Startup</option>
            <option value="Money">Money</option>
          </select>

          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as any)}
            className="os-input px-2.5 py-2 text-xs font-semibold focus:outline-none"
          >
            <option value="High">High</option>
            <option value="Medium">Med</option>
            <option value="Low">Low</option>
          </select>

          <button
            type="submit"
            className="os-btn h-9 px-4 bg-[var(--accent-purple)] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--accent-purple-hover)] shrink-0 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </form>
      </div>

      {/* Task List Viewport (Linear-style border-driven row design) */}
      <div className="mt-3 flex-1 overflow-y-auto max-h-[300px] pr-1 flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="flex h-28 items-center justify-center rounded-[12px] border border-dashed border-[var(--border-color)] text-xs text-[var(--text-muted)] font-medium">
              No tasks found. Type above to add your first task!
            </div>
          ) : (
            <>
              {/* Active Tasks */}
              {activeTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="group flex items-center justify-between rounded-[10px] px-3.5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-l-4 hover:border-l-[var(--accent-purple)] hover:bg-[var(--bg-secondary)] transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-colors text-transparent cursor-pointer"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </button>

                    {editingTaskId === task.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(task.id, task.category, task.priority, task.time);
                          }}
                          className="flex-1 os-input px-2.5 py-1 text-xs focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(task.id, task.category, task.priority, task.time)}
                          className="text-[10px] bg-[var(--accent-purple)] text-white px-2.5 py-1 rounded font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() => startEdit(task)}
                        className="text-xs font-bold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--accent-purple)] transition-colors"
                        title="Click to edit"
                      >
                        {task.title}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${getCategoryBadge(task.category)}`}>
                      {task.category}
                    </span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-semibold">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{task.time}</span>
                    </div>

                    <button
                      onClick={() => duplicateTask(task)}
                      className="h-6.5 w-6.5 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Duplicate task"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => startEdit(task)}
                      className="h-6.5 w-6.5 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Edit task"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="h-6.5 w-6.5 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Completed Tasks (Collapsible) */}
              {showCompleted && completedTasks.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[var(--border-color)]">
                  <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase mb-2 block tracking-wider">
                    Completed ({completedTasks.length})
                  </span>
                  {completedTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.65 }}
                      exit={{ opacity: 0 }}
                      className="group flex items-center justify-between rounded-[10px] px-3.5 py-2 mb-1 bg-[var(--bg-secondary)]/50 border border-[var(--border-color)] opacity-65"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-500 text-white cursor-pointer"
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </button>
                        <span className="text-xs font-semibold line-through text-[var(--text-muted)] truncate">
                          {task.title}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="h-6 w-6 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
