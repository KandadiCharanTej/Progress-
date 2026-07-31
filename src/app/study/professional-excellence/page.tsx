"use client";

import { Award } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function ProfessionalExcellencePage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="Study / Professional"
        title="PROFESSIONAL EXCELLENCE"
        subtitle="Career readiness, professional growth, resume, & network authority"
        icon={Award}
        badge="Pillar 10"
      />

      <StaggerGrid className="grid grid-cols-1 gap-4">
        <StaggerItem>
          <SectionCard
            title="Pillar 10 – Professional Growth"
            subtitle="Resume, Portfolio, LinkedIn, GitHub, Interview Prep, Career Applications, & Industry Authority"
            icon={Award}
            isClickable
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
