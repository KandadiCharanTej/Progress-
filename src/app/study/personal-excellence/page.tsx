"use client";

import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function PersonalExcellencePage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="Study / Mindset"
        title="PERSONAL EXCELLENCE"
        subtitle="Mindset elevation, lifelong learning habits, productivity, & personal mastery"
        icon={Sparkles}
        badge="Pillar 11"
      />

      <StaggerGrid className="grid grid-cols-1 gap-4">
        <StaggerItem>
          <SectionCard
            title="Pillar 11 – Personal Excellence & Lifelong Learning"
            subtitle="Reading lists, mental models, communication, leadership, discipline, & character development"
            icon={Sparkles}
            isClickable
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
