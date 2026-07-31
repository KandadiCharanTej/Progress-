"use client";

import {
  Settings,
  User,
  Layout,
  Sliders,
  Database,
  Info
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { AnimatedContainer, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedContainer";

export default function SettingsPage() {
  return (
    <AnimatedContainer>
      <PageHeader
        category="System Configuration"
        title="Settings"
        subtitle="Global platform customization, preferences, and system parameters"
        icon={Settings}
        badge="Settings"
      />

      <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StaggerItem>
          <SectionCard
            title="Profile"
            subtitle="Account credentials, user identity, & avatar settings"
            icon={User}
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Appearance"
            subtitle="Layout density, Dark Mode obsidian theme, & purple accent settings"
            icon={Layout}
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Preferences"
            subtitle="Global default views, keybindings, & regional parameters"
            icon={Sliders}
          />
        </StaggerItem>

        <StaggerItem>
          <SectionCard
            title="Data"
            subtitle="Local storage management, JSON exports, & database sync"
            icon={Database}
          />
        </StaggerItem>

        <StaggerItem className="md:col-span-2">
          <SectionCard
            title="About"
            subtitle="Platform OS version 2.0, release notes, license, & architectural specs"
            icon={Info}
          />
        </StaggerItem>
      </StaggerGrid>
    </AnimatedContainer>
  );
}
