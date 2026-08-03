"use client";

import { StandardPillarView } from "@/components/study/StandardPillarView";

export default function EngineeringPage() {
  return (
    <StandardPillarView
      title="Engineering"
      description="Software Engineering and AI Engineering."
      roadmap={[
        { phase: "Phase 1", title: "Full-Stack Web Architecture & Clean API Design", done: true },
        { phase: "Phase 2", title: "Distributed Systems, Microservices & Message Queues", done: false },
        { phase: "Phase 3", title: "AI Systems, Vector Databases & RAG Pipelines", done: false },
      ]}
      currentModule={{
        name: "Module 6: Authentication, OAuth2 & API Gateways",
        status: "In Progress (65% Complete)",
      }}
      topics={[
        { id: 1, text: "REST API & GraphQL Interface Contracts", done: true },
        { id: 2, text: "Next.js App Router & Server Components", done: true },
        { id: 3, text: "JWT, Session Management & OAuth Security", done: false },
        { id: 4, text: "Vector Embeddings & Semantic Search Pipelines", done: false },
        { id: 5, text: "LLM Agent Orchestration & Tool Calling", done: false },
      ]}
      resources={[
        { title: "Designing Data-Intensive Applications", type: "Book", link: "#" },
        { title: "Next.js Architecture Guide", type: "Docs", link: "#" },
        { title: "Building LLM Applications for Production", type: "Guide", link: "#" },
      ]}
      initialNotes="Focus on clean interfaces, memory optimization, API resilience, and low-latency response times."
      tasks={[
        { id: 1, text: "Complete Next.js Middleware Auth Pipeline", done: true },
        { id: 2, text: "Benchmark Vector Search Latency with Pinecone", done: false },
        { id: 3, text: "Write Unit Tests for API Gateway Router", done: false },
      ]}
      history={[
        { date: "Today", topic: "Next.js App Router Architecture & Systems Design", duration: "2.5 hrs" },
        { date: "Aug 2, 2026", topic: "AI Systems — RAG Retrieval & Prompt Engineering", duration: "2.0 hrs" },
        { date: "Jul 31, 2026", topic: "Microservices — Rate Limiting & Circuit Breakers", duration: "1.5 hrs" },
      ]}
    />
  );
}
