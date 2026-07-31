"use client";

import {
  FolderGit2,
  Briefcase,
  GitPullRequest,
  Trophy,
  Users,
  Award,
  Zap
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function ExecutionPage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="Study / Execution"
        title="EXECUTION"
        subtitle="Practical builds, industry experience, open source, & external benchmarks"
        icon={Zap}
        badge="6 Pillars"
      />

      <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StaggerItem>
          <SectionCard
            title="Pillar 4 – Projects & Proof of Work"
            subtitle="Production builds, web apps, SaaS tools & engineering portfolios"
            icon={FolderGit2}
            isClickable
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Pillar 5 – Internships"
            subtitle="Industry experience, corporate work, & professional team contributions"
            icon={Briefcase}
            isClickable
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Pillar 6 – Open Source"
            subtitle="Public repository contributions, PRs, & community software maintenance"
            icon={GitPullRequest}
            isClickable
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Pillar 7 – Competitions"
            subtitle="Hackathons, competitive programming contests, & coding challenges"
            icon={Trophy}
            isClickable
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Pillar 8 – Programs & Fellowships"
            subtitle="Tech incubators, developer fellowships, & mentorship programs"
            icon={Users}
            isClickable
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Pillar 9 – Certifications"
            subtitle="Cloud certifications, professional credentials, & verified skill badges"
            icon={Award}
            isClickable
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
