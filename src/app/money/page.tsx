"use client";

import { Wallet, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

export default function MoneyPage() {
  return (
    <AnimatedContainer className="max-w-5xl mx-auto py-4">
      <PageHeader
        category="Finance"
        title="Financial Engine"
        subtitle="Income streams, capital allocation, savings, & independence goals"
        icon={Wallet}
        badge="Financial OS"
      />

      <EmptyState
        title="No Financial Targets Configured"
        description="Your financial engine is ready for income tracking, expense allocation, and savings goals configuration."
        icon={Wallet}
        action={
          <button className="os-btn px-4 py-2 bg-[var(--accent-purple)] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[var(--accent-purple-hover)]">
            <Plus className="h-4 w-4" />
            <span>Add Financial Target</span>
          </button>
        }
      />
    </AnimatedContainer>
  );
}
