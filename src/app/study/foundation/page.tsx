"use client";

import { StandardPillarView } from "@/components/study/StandardPillarView";

export default function FoundationPage() {
  return (
    <StandardPillarView
      title="Foundation"
      description="Computer Science Foundation and Data Structures & Algorithms."
      roadmap={[
        { phase: "Phase 1", title: "Core Data Structures & Complexity Analysis", done: true },
        { phase: "Phase 2", title: "Operating Systems, Memory & CPU Pipelining", done: false },
        { phase: "Phase 3", title: "Database Systems & Consensus Algorithms", done: false },
      ]}
      currentModule={{
        name: "Module 4: Operating Systems Memory Management & Virtualization",
        status: "In Progress (72% Complete)",
      }}
      topics={[
        { id: 1, text: "Arrays, Linked Lists, Stacks & Queues", done: true },
        { id: 2, text: "Trees, Binary Search Trees & Heaps", done: true },
        { id: 3, text: "Graph Traversal (BFS / DFS) & Shortest Path", done: true },
        { id: 4, text: "Process Scheduling & Thread Synchronization", done: false },
        { id: 5, text: "Virtual Memory, Page Tables & TLB Caching", done: false },
      ]}
      resources={[
        { title: "Introduction to Algorithms (CLRS)", type: "Book", link: "#" },
        { title: "Computer Systems: A Programmer's Perspective", type: "Book", link: "#" },
        { title: "MIT 6.004 Computation Structures", type: "Course", link: "#" },
      ]}
      initialNotes="Focus on space and time complexity, memory allocation boundaries, and lock-free data structures."
      tasks={[
        { id: 1, text: "Solve 5 Medium Graph Problems on LeetCode", done: false },
        { id: 2, text: "Implement LRU Cache using Doubly Linked List + HashMap", done: true },
        { id: 3, text: "Review OS Virtual Memory paging mechanisms", done: false },
      ]}
      history={[
        { date: "Yesterday", topic: "Operating Systems — Page Replacement Algorithms", duration: "2.0 hrs" },
        { date: "Aug 1, 2026", topic: "DSA — Dijkstra's & Bellman-Ford Shortest Path", duration: "1.5 hrs" },
        { date: "Jul 30, 2026", topic: "Computer Architecture — Memory Hierarchy & Cache Lines", duration: "2.5 hrs" },
      ]}
    />
  );
}
