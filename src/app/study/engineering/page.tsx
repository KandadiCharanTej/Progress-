"use client";

import { Code2, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function EngineeringPage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="Study / Engineering"
        title="ENGINEERING"
        subtitle="Full-stack engineering architecture and artificial intelligence systems"
        icon={Code2}
        badge="2 Pillars"
      />

      <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StaggerItem>
          <SectionCard
            title="Pillar 2 – Software Engineering"
            subtitle="System Design, Clean Code, Web Architecture, APIs & Microservices"
            icon={Code2}
            isClickable
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Pillar 3 – AI Engineering"
            subtitle="Machine Learning, LLM Agents, RAG Pipelines, PyTorch & Neural Networks"
            icon={Sparkles}
            isClickable
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
