"use client";

import Link from "next/link";
import { 
  ArrowLeft, ChevronRight, Compass, Edit3, 
  StickyNote, Library, PlayCircle, Code2, Plus
} from "lucide-react";

export default function TopicWorkspace({ params }: { params: { subject: string, topic: string } }) {
  // Decode URL parameters
  const rawSubject = params.subject || "";
  const rawTopic = params.topic || "";
  
  const subjectName = rawSubject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const topicName = rawTopic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] font-sans overflow-hidden">
      
      {/* TOP NAVIGATION */}
      <div className="shrink-0 h-14 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link href={`/study/foundation/computer-science-foundation/${rawSubject}`} className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {subjectName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border-color)]" />
          <span className="text-[12px] font-bold text-[var(--text-primary)]">{topicName}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-[var(--border-color)] rounded-md overflow-hidden bg-[var(--bg-secondary)] mr-2">
            <button className="px-3 py-1.5 text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border-r border-[var(--border-color)]">
              Previous
            </button>
            <button className="px-3 py-1.5 text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Next
            </button>
          </div>
          <button className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-muted)] text-[10px] font-bold text-[var(--text-primary)] rounded-md transition-colors flex items-center gap-1.5">
            <StickyNote className="w-3 h-3" /> Open Notebook
          </button>
          <button className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-muted)] text-[10px] font-bold text-[var(--text-primary)] rounded-md transition-colors flex items-center gap-1.5">
            <Library className="w-3 h-3" /> Open Resources
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="shrink-0 p-6 lg:p-8 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] w-max">
            <span className="text-[10px] font-bold text-[var(--accent-purple)] tracking-widest uppercase">{subjectName} Topic</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {topicName}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl font-medium">
            Master the core concepts, syntax, and applications of {topicName} with examples and practice exercises.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMN 1: CONCEPTS & EXAMPLES (col-span-8) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
            
            {/* About */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <Compass className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">About</h2>
              </div>
              <p className="text-[12px] text-[var(--text-primary)] leading-relaxed font-medium">
                {topicName} is a fundamental concept in {subjectName}. Understanding how it works is crucial for building robust applications and writing clean code.
              </p>
            </div>

            {/* Concepts */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Core Concepts</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-[var(--bg-secondary)] p-4 rounded-lg border border-[var(--border-color)]">
                  <h3 className="text-[13px] font-bold text-[var(--text-primary)] mb-2">Basic Syntax</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Learn how to write and declare {topicName.toLowerCase()} properly within {subjectName}.
                  </p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-4 rounded-lg border border-[var(--border-color)]">
                  <h3 className="text-[13px] font-bold text-[var(--text-primary)] mb-2">Memory Layout</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Understand how {topicName.toLowerCase()} is stored in the system memory.
                  </p>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <Code2 className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Examples</h2>
              </div>
              <div className="bg-[var(--bg-main)] p-4 rounded-lg border border-[var(--border-color)] font-mono text-[11px] text-[var(--text-primary)] overflow-x-auto">
                <span className="text-[var(--text-muted)]">// Example implementation of {topicName}</span><br />
                <span className="text-[var(--accent-purple)]">const</span> {topicName.toLowerCase().replace(/ /g, '')} = <span className="text-[#e5c07b]">new</span> Example();<br />
                {topicName.toLowerCase().replace(/ /g, '')}.execute();
              </div>
            </div>

            {/* Subtopics */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Subtopics</h2>
              </div>
              <ul className="space-y-2">
                {["Advanced Syntax", "Best Practices", "Common Pitfalls"].map((sub, idx) => (
                  <li key={idx} className="text-[12px] text-[var(--text-primary)] font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-purple)]" /> {sub}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* COLUMN 2: PRACTICE, NOTES, RESOURCES (col-span-4) */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
            
            {/* Practice */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <PlayCircle className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Practice</h2>
              </div>
              <div className="flex flex-col items-center justify-center text-center py-4">
                <p className="text-[12px] font-medium text-[var(--text-primary)] mb-2">Test your knowledge.</p>
                <p className="text-[11px] text-[var(--text-secondary)] mb-4">Complete 3 practice exercises on {topicName}.</p>
                <button className="px-4 py-2 bg-[var(--accent-purple)] text-white text-[11px] font-bold rounded-lg flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
                  <PlayCircle className="w-3.5 h-3.5" /> Start Exercises
                </button>
              </div>
            </div>

            {/* Notebook Card */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <StickyNote className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Personal Notes</h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <p className="text-[12px] font-medium text-[var(--text-muted)] mb-4">No notes yet.</p>
                <button className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--text-muted)] text-[10px] font-bold text-[var(--text-primary)] rounded-lg flex items-center gap-1.5 transition-colors">
                  <Plus className="w-3 h-3" /> Add Note
                </button>
              </div>
            </div>

            {/* Resources Card */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <Library className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Resources</h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <p className="text-[12px] font-medium text-[var(--text-muted)] mb-4">No resources added.</p>
                <button className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--text-muted)] text-[10px] font-bold text-[var(--text-primary)] rounded-lg flex items-center gap-1.5 transition-colors">
                  <Plus className="w-3 h-3" /> Add Resource
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
