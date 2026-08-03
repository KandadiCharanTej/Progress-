"use client";

import { StandardPillarView } from "@/components/study/StandardPillarView";

export default function ProfessionalGrowthPage() {
  return (
    <StandardPillarView
      title="Professional Growth"
      description="Career advancement, interview preparation, portfolio branding, and industry networking."
      roadmap={[
        { phase: "Phase 1", title: "Technical Resume & Portfolio Website", done: true },
        { phase: "Phase 2", title: "Mock Technical & System Design Interviews", done: false },
        { phase: "Phase 3", title: "Senior Engineering Network & Leadership", done: false },
      ]}
      currentModule={{
        name: "Module 2: Technical Portfolio Case Studies & Project Demonstrations",
        status: "In Progress (60% Complete)",
      }}
      topics={[
        { id: 1, text: "Resume Optimization — Action Verbs & Quantified Metrics", done: true },
        { id: 2, text: "LinkedIn & GitHub Profile Branding", done: true },
        { id: 3, text: "Mock System Design Interviews (URL Shortener, Rate Limiter)", done: false },
        { id: 4, text: "Behavioral STAR Framework Questions Prep", done: false },
        { id: 5, text: "Networking with Senior Engineers & Engineering Managers", done: false },
      ]}
      resources={[
        { title: "Cracking the Coding Interview", type: "Book", link: "#" },
        { title: "System Design Primer Repository", type: "Guide", link: "#" },
        { title: "Tech Resume & Portfolio Template", type: "Docs", link: "#" },
      ]}
      initialNotes="Focus on clear, concise communication during technical discussions. Quantify achievements with concrete numbers."
      tasks={[
        { id: 1, text: "Update GitHub profile README with active projects", done: true },
        { id: 2, text: "Practice 2 mock system design interview scenarios", done: false },
        { id: 3, text: "Reach out to 3 senior software engineers on LinkedIn", done: false },
      ]}
      history={[
        { date: "Yesterday", topic: "System Design — Rate Limiter & Load Balancer", duration: "1.5 hrs" },
        { date: "Jul 31, 2026", topic: "STAR Method Behavioral Interview Preparation", duration: "1.0 hr" },
        { date: "Jul 28, 2026", topic: "Technical Resume & Case Studies Review", duration: "2.0 hrs" },
      ]}
    />
  );
}
