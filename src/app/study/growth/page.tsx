"use client";

import {
  MessageSquare,
  Users,
  Share2,
  Sparkles,
  PenTool,
  BookOpenCheck,
  Zap,
  ShieldAlert
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function GrowthPage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="Study / Growth"
        title="Growth"
        subtitle="Personal development, soft skills, branding, & mindset elevation"
        icon={Sparkles}
        badge="8 Growth Pillars"
      />

      <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Communication */}
        <StaggerItem>
          <SectionCard
            title="Communication"
            subtitle="Public speaking, technical writing, & concise articulation"
            icon={MessageSquare}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>

        {/* Leadership */}
        <StaggerItem>
          <SectionCard
            title="Leadership"
            subtitle="Team guidance, strategic vision, & execution ownership"
            icon={Users}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>

        {/* Networking */}
        <StaggerItem>
          <SectionCard
            title="Networking"
            subtitle="Professional connections, mentorship, & community"
            icon={Share2}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>

        {/* Personal Branding */}
        <StaggerItem>
          <SectionCard
            title="Personal Branding"
            subtitle="Online presence, industry reputation, & domain authority"
            icon={Sparkles}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>

        {/* Content Creation */}
        <StaggerItem>
          <SectionCard
            title="Content Creation"
            subtitle="Technical blogs, tutorials, videos, & open knowledge"
            icon={PenTool}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>

        {/* Reading */}
        <StaggerItem>
          <SectionCard
            title="Reading"
            subtitle="Books, whitepapers, literature notes, & mental models"
            icon={BookOpenCheck}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>

        {/* Productivity */}
        <StaggerItem>
          <SectionCard
            title="Productivity"
            subtitle="Focus workflows, time blocking, & energy optimization"
            icon={Zap}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>

        {/* Character */}
        <StaggerItem>
          <SectionCard
            title="Character"
            subtitle="Discipline, resilience, integrity, & core values"
            icon={ShieldAlert}
            isClickable
            minHeight="min-h-[200px]"
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
