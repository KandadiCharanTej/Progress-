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
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Startup":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Money":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "Medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "Low":
        return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-[16px] p-3.5 md:p-4 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs flex flex-col justify-between h-full">
      {/* Sticky Header & Top Controls */}
      <div className="shrink-0 bg-[var(--bg-card)]">
        <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[var(--accent-purple)] text-white shadow-xs">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-extrabold text-[var(--text-primary)] leading-none">
                Today's Tasks
              </h2>
              <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                {completedCount} of {tasks.length} completed ({completionPercent}%)
              </span>
            </div>
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 h-3 w-3 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="os-input pl-7 pr-2 py-1 text-xs w-28 sm:w-36 focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="os-input px-2 py-1 text-xs focus:outline-none"
            >
              <option value="date">Sort: Date</option>
              <option value="priority">Sort: Priority</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>
        </div>

        {/* Filter Category Pills & Completed Toggle */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {["All", "Study", "Startup", "Money"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-[6px] border transition-colors ${
                  filterCategory === cat
                    ? "bg-[var(--accent-purple)] text-white border-[var(--accent-purple)]"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-purple)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <span>{showCompleted ? "Hide Done" : "Show Done"}</span>
            {showCompleted ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {/* Sticky Add New Task Form */}
        <form onSubmit={handleAddTask} className="mt-2.5 flex items-center gap-2">
          <input
            type="text"
            placeholder="Add task for today and press Enter..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 os-input px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--accent-purple)]"
          />

          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value as any)}
            className="os-input px-2 py-1.5 text-xs focus:outline-none"
          >
            <option value="Study">Study</option>
            <option value="Startup">Startup</option>
            <option value="Money">Money</option>
          </select>

          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as any)}
            className="os-input px-2 py-1.5 text-xs focus:outline-none"
          >
            <option value="High">High</option>
            <option value="Medium">Med</option>
            <option value="Low">Low</option>
          </select>

          <button
            type="submit"
            className="os-btn h-8 px-3.5 bg-[var(--accent-purple)] text-white text-xs font-bold flex items-center gap-1 hover:bg-[var(--accent-purple-hover)] shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Task</span>
          </button>
        </form>
      </div>

      {/* Scrollable Task Viewport (Supports 10-15 visible tasks internally - max 360px) */}
      <div className="mt-2.5 flex-1 overflow-y-auto max-h-[350px] pr-1 flex flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center rounded-[12px] border border-dashed border-[var(--border-color)] text-xs text-[var(--text-muted)] font-medium p-4 text-center">
              <Zap className="h-5 w-5 text-[var(--accent-purple)] mb-1 opacity-50" />
              <span>No tasks found for this view. Type above to create a task!</span>
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
                  className="group flex items-center justify-between rounded-[10px] p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-colors text-transparent"
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </button>

                    {editingTaskId === task.id ? (
                      <div className="flex items-center gap-1 flex-1">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(task.id, task.category, task.priority, task.time);
                          }}
                          className="flex-1 os-input px-2 py-0.5 text-xs focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(task.id, task.category, task.priority, task.time)}
                          className="text-[10px] bg-[var(--accent-purple)] text-white px-2 py-0.5 rounded font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() => startEdit(task)}
                        className="text-xs md:text-sm font-semibold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--accent-purple)] transition-colors"
                        title="Click to edit"
                      >
                        {task.title}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className={`px-2 py-0.2 text-[9px] font-bold rounded border ${getCategoryBadge(task.category)}`}>
                      {task.category}
                    </span>
                    <span className={`px-2 py-0.2 text-[9px] font-bold rounded border ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] font-medium">
                      <Clock className="h-3 w-3" />
                      <span>{task.time}</span>
                    </div>

                    <button
                      onClick={() => duplicateTask(task)}
                      className="h-5 w-5 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Duplicate task"
                    >
                      <Copy className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => startEdit(task)}
                      className="h-5 w-5 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Edit task"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="h-5 w-5 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete task"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Completed Tasks (Collapsible) */}
              {showCompleted && completedTasks.length > 0 && (
                <div className="mt-1.5 pt-1.5 border-t border-[var(--border-color)]">
                  <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase mb-1 block">
                    Completed ({completedTasks.length})
                  </span>
                  {completedTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      className="group flex items-center justify-between rounded-[8px] p-2 mb-1 bg-[var(--bg-secondary)]/40 border border-[var(--border-color)] opacity-60"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-500 text-white"
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </button>
                        <span className="text-xs font-semibold line-through text-[var(--text-muted)] truncate">
                          {task.title}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="h-5 w-5 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
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
