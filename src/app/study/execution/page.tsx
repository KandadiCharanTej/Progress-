"use client";

import { StandardPillarView } from "@/components/study/StandardPillarView";

export default function ExecutionPage() {
  return (
    <StandardPillarView
      title="Execution"
      description="Projects, Internships, Open Source, Competitions, Programs, & Certifications."
      roadmap={[
        { phase: "Phase 1", title: "Build & Deploy Production Proof of Work", done: true },
        { phase: "Phase 2", title: "Open Source Contributions & Fellowships", done: false },
        { phase: "Phase 3", title: "Global Competitions & AWS Certification", done: false },
      ]}
      currentModule={{
        name: "Module 3: Naavik Personal Operating System Production Build",
        status: "In Progress (48% Complete)",
      }}
      topics={[
        { id: 1, text: "Build & Deploy Full-Stack Next.js Project", done: true },
        { id: 2, text: "Open Source — Submit PR to GitHub Repository", done: false },
        { id: 3, text: "Prepare & Submit Software Engineering Internship Applications", done: false },
        { id: 4, text: "Participate in AI Engineering Global Hackathon", done: false },
        { id: 5, text: "Complete AWS Solutions Architect Certification Prep", done: false },
      ]}
      resources={[
        { title: "GitHub Portfolio Repository", type: "Code", link: "#" },
        { title: "Vercel / AWS Cloud Deployment Console", type: "Cloud", link: "#" },
        { title: "AWS Certified Solutions Architect Study Guide", type: "Cert", link: "#" },
      ]}
      initialNotes="Shipping code regularly is the ultimate proof of work. Focus on production deployment and clear README documentation."
      tasks={[
        { id: 1, text: "Push latest codebase to Vercel production deployment", done: true },
        { id: 2, text: "Prepare resume for summer internship applications", done: false },
        { id: 3, text: "Register for upcoming AI Engineering Hackathon", done: false },
      ]}
      history={[
        { date: "Yesterday", topic: "Next.js Production Build & Optimization", duration: "3.0 hrs" },
        { date: "Aug 1, 2026", topic: "AWS Cloud Infrastructure Setup & IAM Rules", duration: "1.5 hrs" },
        { date: "Jul 29, 2026", topic: "Open Source PR Review & Issue Fixes", duration: "2.0 hrs" },
      ]}
    />
  );
}
