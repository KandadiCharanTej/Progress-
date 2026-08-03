"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function MoneyPage() {
  const [income, setIncome] = useState("$5,200 / month");
  const [expenses, setExpenses] = useState("$1,800 / month");
  const [savings, setSavings] = useState("$3,400 / month (65% Rate)");
  const [netWorth, setNetWorth] = useState("$42,500");

  const [goals, setGoals] = useState([
    { id: 1, text: "Build 6-Month Emergency Buffer Fund ($15,000)", done: true },
    { id: 2, text: "Allocate High-Yield Investment Portfolio ($25,000)", done: false },
    { id: 3, text: "Reach $50,000 Total Net Worth Milestone", done: false },
  ]);

  const toggleGoal = (id: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          Financial Management
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Income, expenses, savings allocation, goals, and net worth overview.
        </p>
      </div>

      {/* Overview Grid: Net Worth, Income, Expenses, Savings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* 5. Net Worth */}
        <div className="os-card p-4 space-y-1">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            Net Worth
          </span>
          <h2 className="text-lg font-bold text-[var(--accent-purple)]">{netWorth}</h2>
        </div>

        {/* 1. Income */}
        <div className="os-card p-4 space-y-1">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            Income
          </span>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">{income}</h3>
        </div>

        {/* 2. Expenses */}
        <div className="os-card p-4 space-y-1">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            Expenses
          </span>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">{expenses}</h3>
        </div>

        {/* 3. Savings */}
        <div className="os-card p-4 space-y-1">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            Savings
          </span>
          <h3 className="text-sm font-bold text-emerald-500">{savings}</h3>
        </div>
      </div>

      {/* 4. Financial Goals */}
      <div className="os-card p-5 space-y-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase block">
          Financial Goals
        </span>
        <div className="space-y-2">
          {goals.map((g) => (
            <div
              key={g.id}
              onClick={() => toggleGoal(g.id)}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--bg-secondary)] cursor-pointer"
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  g.done
                    ? "bg-[var(--accent-purple)] border-[var(--accent-purple)] text-white"
                    : "border-[var(--border-color)] bg-[var(--bg-card)]"
                }`}
              >
                {g.done && <Check className="h-3 w-3" />}
              </div>
              <span
                className={`text-xs font-medium ${
                  g.done
                    ? "line-through text-[var(--text-muted)]"
                    : "text-[var(--text-primary)]"
                }`}
              >
                {g.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

