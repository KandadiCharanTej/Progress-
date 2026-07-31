"use client";

import { GraduationCap, Rocket, Wallet } from "lucide-react";
import { SecondYearMissionHeader } from "@/components/ui/SecondYearMissionHeader";
import { TaskPlanner } from "@/components/ui/TaskPlanner";
import { ContributionGraph } from "@/components/ui/ContributionGraph";
import { QuickTrackerCard } from "@/components/ui/QuickTrackerCard";
import { CompactJourneyCard } from "@/components/ui/CompactJourneyCard";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

export default function DashboardPage() {
  return (
    <AnimatedContainer className="h-full flex flex-col justify-between overflow-hidden">
      {/* TOP SECTION: SECOND YEAR MISSION HEADER */}
      <div className="shrink-0">
        <SecondYearMissionHeader />
      </div>

      {/* CENTER SECTION: TODAY'S TASKS (LEFT) | LIVE TRACKERS & CONSISTENCY GRAPH (RIGHT) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2.5 my-1.5 min-h-0 overflow-hidden">
        {/* Left Column: Today's Tasks Planner */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-0 overflow-hidden">
          <TaskPlanner />
        </div>

        {/* Right Column: Live Trackers & Consistency Graph */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2 min-h-0 overflow-hidden">
          <div className="shrink-0">
            <QuickTrackerCard />
          </div>
          <div className="flex-1 min-h-0">
            <ContributionGraph />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: THREE EQUAL-WIDTH COMPACT JOURNEY CARDS */}
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
            badgeTag="Naavik Venture"
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
