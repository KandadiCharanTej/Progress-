"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ChevronRight, BookOpen, Compass, ListOrdered, 
  StickyNote, Library, Plus, ChevronDown, ChevronUp 
} from "lucide-react";

export default function SubjectWorkspace({ params }: { params: { subject: string } }) {
  // Decode URL parameter to get a displayable subject name
  const rawSubject = params.subject || "";
  const subjectName = rawSubject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  // Mock Roadmap data
  const roadmapSteps = [
    { num: "1", title: "Fundamentals", desc: "Start with the basics." },
    { num: "2", title: "Core Concepts", desc: "Learn the essential building blocks." },
    { num: "3", title: "Advanced Topics", desc: "Master the advanced features." }
  ];

  // Mock Topics Data (Syllabus)
  const syllabusSections = [
    {
      id: 0,
      title: "Fundamentals",
      topics: ["Variables", "Data Types", "Operators", "Input / Output"]
    },
    {
      id: 1,
      title: "Control Flow",
      topics: ["Control Statements", "Functions", "Scope"]
    },
    {
      id: 2,
      title: "Data Structures",
      topics: ["Arrays", "Pointers", "Memory Management"]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] font-sans overflow-hidden">
      
      {/* TOP NAVIGATION */}
      <div className="shrink-0 h-14 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link href="/study/foundation/computer-science-foundation" className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Pillar
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--border-color)]" />
          <span className="text-[12px] font-bold text-[var(--text-primary)]">{subjectName}</span>
        </div>
        
        <div className="flex items-center gap-3">
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
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] w-max">
            <span className="text-xs">📘</span>
            <span className="text-[10px] font-bold text-[var(--text-primary)] tracking-widest uppercase">Subject Workspace</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {subjectName}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl font-medium">
            Learn the core concepts, syntax, and applications of {subjectName} through interactive roadmaps and detailed topics.
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMN 1: ABOUT & ROADMAP (col-span-4) */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar">
            
            {/* About */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <Compass className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">About</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-[var(--accent-purple)] uppercase tracking-wider mb-1">What is this subject?</h4>
                  <p className="text-[11px] text-[var(--text-primary)] font-medium leading-relaxed">A core component of the Computer Science Foundation.</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[var(--accent-purple)] uppercase tracking-wider mb-1">Why should you learn it?</h4>
                  <p className="text-[11px] text-[var(--text-primary)] font-medium leading-relaxed">It builds the essential logic required for advanced programming.</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[var(--accent-purple)] uppercase tracking-wider mb-1">Where is it used?</h4>
                  <p className="text-[11px] text-[var(--text-primary)] font-medium leading-relaxed">Backend development, system design, and competitive programming.</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[var(--accent-purple)] uppercase tracking-wider mb-1">Learning Outcome</h4>
                  <p className="text-[11px] text-[var(--text-primary)] font-medium leading-relaxed">Master the fundamentals of {subjectName}.</p>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex-1">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <ListOrdered className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Roadmap</h2>
              </div>
              
              <div className="flex flex-col relative pl-4 mt-4">
                {roadmapSteps.map((step, idx) => (
                  <div key={step.title} className="flex flex-col relative mb-4 last:mb-0">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 shrink-0 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full flex items-center justify-center text-[10px] font-bold text-[var(--accent-purple)] relative z-10 mt-0.5">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="text-[12px] font-bold text-[var(--text-primary)] mb-1">{step.title}</h3>
                        <p className="text-[11px] text-[var(--text-secondary)]">{step.desc}</p>
                      </div>
                    </div>
                    {idx < roadmapSteps.length - 1 && (
                      <div className="absolute left-[9px] top-6 bottom-[-20px] w-[2px] bg-[var(--border-color)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: TOPICS (col-span-5) */}
          <div className="col-span-1 lg:col-span-5 h-full overflow-y-auto no-scrollbar">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 min-h-full">
              <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[var(--border-color)]">
                <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Syllabus Topics</h2>
              </div>

              <div className="space-y-3">
                {syllabusSections.map((section, idx) => {
                  const isOpen = expandedSection === idx;
                  return (
                    <div key={section.id} className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center gap-3 p-3 cursor-pointer group"
                        onClick={() => setExpandedSection(isOpen ? null : idx)}
                      >
                        <span className="text-[12px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">{section.title}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 ml-auto text-[var(--text-muted)]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-auto text-[var(--text-muted)] opacity-50 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      
                      {isOpen && (
                        <div className="flex flex-col border-t border-[var(--border-color)] bg-[var(--bg-card)] p-2">
                          {section.topics.map((topic, tIdx) => (
                            <Link 
                              key={tIdx}
                              href={`/study/foundation/computer-science-foundation/${rawSubject}/${topic.toLowerCase().replace(/ \/ /g, '-').replace(/ /g, '-')}`}
                              className="px-3 py-2 text-[11px] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-purple)] rounded-md transition-colors flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-color)]" />
                              {topic}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMN 3: NOTEBOOK & RESOURCES (col-span-3) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar">
            
            {/* Notebook Card */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--border-color)]">
                <StickyNote className="w-4 h-4 text-[var(--text-muted)]" />
                <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Notebook</h2>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <p className="text-[12px] font-medium text-[var(--text-muted)] mb-4">No notes yet.</p>
                <button className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--text-muted)] text-[10px] font-bold text-[var(--text-primary)] rounded-lg flex items-center gap-1.5 transition-colors">
                  <Plus className="w-3 h-3" /> Add Note
                </button>
              </div>
            </div>

            {/* Resources Card */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col flex-1">
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
