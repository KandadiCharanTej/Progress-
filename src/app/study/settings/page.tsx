"use client";

import { Settings, Sliders, Database, Bell } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function StudySettingsPage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="Study / Configuration"
        title="Study Settings"
        subtitle="Preferences, curriculum defaults, and Study Hub configuration"
        icon={Settings}
        badge="Settings"
      />

      <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StaggerItem>
          <SectionCard
            title="Curriculum Preferences"
            subtitle="Default learning paths, difficulty levels, and target hours"
            icon={Sliders}
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Study Reminders & Notifications"
            subtitle="Daily study alerts, review schedules, & streak alerts"
            icon={Bell}
          />
        </StaggerItem>

        <StaggerItem className="md:col-span-2">
          <SectionCard
            title="Study Data & Export"
            subtitle="Backup study history, export notes structure, & data sync"
            icon={Database}
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
