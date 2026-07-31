"use client";

import { GraduationCap, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

export default function StudyDashboardPage() {
  return (
    <AnimatedContainer className="max-w-5xl mx-auto py-4">
      <PageHeader
        category="Academy"
        title="Study Hub"
        subtitle="Computer Science, Engineering, Foundation, & Professional Growth"
        icon={GraduationCap}
        badge="Study OS"
      />

      <EmptyState
        title="No Active Study Modules"
        description="Your study hub is ready for curriculum configuration. Add topics, courses, or reading goals to begin tracking."
        icon={GraduationCap}
        action={
          <button className="os-btn px-4 py-2 bg-[var(--accent-purple)] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--accent-purple-hover)]">
            <Plus className="h-4 w-4" />
            <span>Create Study Module</span>
          </button>
        }
      />
    </AnimatedContainer>
  );
}
