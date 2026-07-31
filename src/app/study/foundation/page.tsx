"use client";

import { Cpu, Binary } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function FoundationPage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="Study / Foundation"
        title="FOUNDATION"
        subtitle="Core theoretical knowledge and fundamental Computer Science pillars"
        icon={Cpu}
        badge="2 Pillars"
      />

      <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StaggerItem>
          <SectionCard
            title="Pillar 1.1 – Computer Science Foundation"
            subtitle="Systems, Operating Systems, Computer Architecture, Networks & Databases"
            icon={Cpu}
            isClickable
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Pillar 1.2 – Data Structures & Algorithms"
            subtitle="Core Data Structures, Advanced Algorithms, Complexity & Problem Solving"
            icon={Binary}
            isClickable
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
