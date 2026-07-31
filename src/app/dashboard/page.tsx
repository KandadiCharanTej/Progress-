"use client";

import { GraduationCap, Rocket, Wallet } from "lucide-react";
import { SecondYearMissionHeader } from "@/components/ui/SecondYearMissionHeader";
import { TaskPlanner } from "@/components/ui/TaskPlanner";
import { ContributionGraph } from "@/components/ui/ContributionGraph";
import { TodayStatusCard } from "@/components/ui/TodayStatusCard";
import { CompactJourneyCard } from "@/components/ui/CompactJourneyCard";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

export default function DashboardPage() {
  return (
    <AnimatedContainer className="h-full flex flex-col justify-between overflow-hidden">
      {/* HERO TOP SECTION: MISSION STATEMENT */}
      <div className="shrink-0">
        <SecondYearMissionHeader />
      </div>

      {/* CENTER SECTION: TODAY'S TASKS (LEFT 70%) | UNIFIED TODAY'S STATUS & CONSISTENCY ENGINE (RIGHT 30%) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2.5 my-1.5 min-h-0 overflow-hidden">
        {/* Left Column (70% Width): Today's Tasks Planner (10-15 visible tasks) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-0 overflow-hidden">
          <TaskPlanner />
        </div>

        {/* Right Column (30% Width): Unified Today's Status & Consistency Graph */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2 min-h-0 overflow-hidden">
          <div className="shrink-0">
            <TodayStatusCard />
          </div>
          <div className="flex-1 min-h-0">
            <ContributionGraph />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: THREE COMPACT NAVIGATION SHORTCUTS */}
      <div className="shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <CompactJourneyCard
            title="Study"
            overallProgress={42}
            href="/study"
            icon={GraduationCap}
            badgeTag="Academy"
          />
          <CompactJourneyCard
            title="Startup"
            overallProgress={28}
            href="/startup"
            icon={Rocket}
            badgeTag="Venture"
          />
          <CompactJourneyCard
            title="Money"
            overallProgress={50}
            href="/money"
            icon={Wallet}
            badgeTag="Finance"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
}
