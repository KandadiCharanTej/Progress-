"use client";

import { CheckCircle2, GraduationCap, Rocket, Wallet, Clock, Zap } from "lucide-react";

interface TodayExecutionCardProps {
  studyGoal?: string;
  startupGoal?: string;
  moneyGoal?: string;
  deepWorkHours?: number;
  targetDeepWorkHours?: number;
  completionPercent?: number;
}

export function TodayExecutionCard({
  studyGoal = "Advanced Operating Systems: Process & Memory Scheduling",
  startupGoal = "Build Naavik Engine Router & Core Interfaces",
  moneyGoal = "High-Yield Savings & Expense Allocation",
  deepWorkHours = 4.5,
  targetDeepWorkHours = 6.0,
  completionPercent = 67,
}: TodayExecutionCardProps) {
  const goals = [
    {
      category: "Study Goal",
      text: studyGoal,
      icon: GraduationCap,
      color: "text-blue-400 border-blue-500/20 bg-blue-500/10",
      completed: true,
    },
    {
      category: "Startup Goal",
      text: startupGoal,
      icon: Rocket,
      color: "text-purple-400 border-purple-500/20 bg-purple-500/10",
      completed: true,
    },
    {
      category: "Money Goal",
      text: moneyGoal,
      icon: Wallet,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      completed: false,
    },
  ];

  return (
    <div className="os-card relative overflow-hidden p-4 flex flex-col justify-between h-full border-[var(--border-color)]">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--accent-purple)]">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] leading-none">
                Today's Execution
              </h3>
              <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                Most important daily priorities
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--accent-purple)]">
              {completionPercent}% Completed
            </span>
          </div>
        </div>

        {/* Top 3 Goals List */}
        <div className="mt-3.5 flex flex-col gap-2">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between rounded-[12px] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-2.5 transition-colors hover:border-[var(--accent-purple)]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border ${goal.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase text-[var(--text-muted)] tracking-wider">
                      {goal.category}
                    </span>
                    <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                      {goal.text}
                    </p>
                  </div>
                </div>

                <div className="ml-2 shrink-0">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      goal.completed ? "text-emerald-500 fill-emerald-500/20" : "text-[var(--text-muted)] opacity-40"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Execution Metrics */}
      <div className="mt-3.5 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[var(--accent-purple)]" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Deep Work Hours:</span>
          <span className="text-xs font-extrabold text-[var(--text-primary)]">
            {deepWorkHours} / {targetDeepWorkHours} Hrs
          </span>
        </div>

        <div className="w-32">
          <div className="h-2 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden border border-[var(--border-color)]">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
