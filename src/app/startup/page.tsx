"use client";

import { Rocket, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

export default function StartupPage() {
  return (
    <AnimatedContainer className="max-w-5xl mx-auto py-4">
      <PageHeader
        category="Venture"
        title="Startup Workspace"
        subtitle="Naavik product strategy, engineering backlog, & growth roadmap"
        icon={Rocket}
        badge="Naavik OS"
      />

      <EmptyState
        title="No Active Venture Modules"
        description="Your startup workspace is ready for product specifications, sprint backlogs, and roadmap planning."
        icon={Rocket}
        action={
          <button className="os-btn px-4 py-2 bg-[var(--accent-purple)] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--accent-purple-hover)]">
            <Plus className="h-4 w-4" />
            <span>Create Product Goal</span>
          </button>
        }
      />
    </AnimatedContainer>
  );
}
