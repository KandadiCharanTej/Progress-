"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, ChevronDown, ChevronUp, StickyNote, Library, 
  ArrowRight, Search, Target, Rocket
} from "lucide-react";

// -------------------------------------------------------------
// UI COMPONENTS
// -------------------------------------------------------------

function SectionHeader({ title, rightElement }: { title: string, rightElement?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">{title}</h2>
      {rightElement}
    </div>
  );
}

// -------------------------------------------------------------
// MAIN PAGE
// -------------------------------------------------------------

export default function DataStructuresAlgorithms() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const learningJourney = [
    { num: "①", title: "Problem Solving Fundamentals", why: "Build the mindset needed before diving into complex DSA.", prereq: "Basic Programming.", next: "Complete Core DSA Roadmap" },
    { num: "②", title: "Complete Core DSA Roadmap", why: "Master the foundational data structures and algorithms.", prereq: "Fundamentals.", next: "Advanced DSA" },
    { num: "③", title: "Advanced DSA", why: "Master complex algorithms for hard problems.", prereq: "Core DSA Roadmap.", next: "Interview Preparation" },
    { num: "④", title: "Interview Preparation", why: "Get ready for FAANG and top tech interviews.", prereq: "Core + Advanced DSA.", next: "Competitive Programming" },
    { num: "⑤", title: "Competitive Programming", why: "Test your skills under strict time constraints.", prereq: "Interview Preparation.", next: "Continuous Practice" }
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] font-sans overflow-hidden">
      
      {/* HEADER (Top Bar) */}
      <div className="shrink-0 h-14 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-[14px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Data Structures & Algorithms
          </h1>
          <span className="text-[12px] text-[var(--text-secondary)] font-medium">Pillar 1.2</span>
        </div>
      </div>

      {/* HEADER (Description) */}
      <div className="shrink-0 p-6 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] w-max">
            <span className="text-[10px] font-bold text-[var(--accent-purple)] tracking-widest uppercase">🥇 Pillar 1.2</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl font-medium">
            Master problem solving through Data Structures, Algorithms, and algorithmic thinking. Learn how to design efficient solutions and solve coding problems confidently.
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
        <div className="h-full max-w-screen-2xl mx-auto grid grid-cols-12 gap-5">
          
          {/* ---------------- COLUMN 1 (Left) ---------------- */}
          <div className="col-span-12 lg:col-span-4 flex flex-col h-full gap-5 overflow-hidden">
            
            {/* ABOUT */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 shrink-0">
              <SectionHeader title="About" />
              <div className="flex flex-col gap-2">
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Mission</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">Build strong problem-solving and algorithmic thinking.</div>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Goal</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">Learn how to choose the right data structure and algorithm for every problem.</div>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Why This Matters</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">Efficient problem solving is one of the most important skills for software engineers.</div>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Expected Outcome</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">Solve coding problems confidently and build a strong foundation for technical interviews and advanced computer science.</div>
                </div>
              </div>
            </div>

            {/* LEARNING JOURNEY */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-1 flex flex-col min-h-0">
              <SectionHeader title="Learning Journey" />
              
              <div className="flex-1 overflow-y-auto no-scrollbar relative pl-2 pr-2">
                {learningJourney.map((step, idx) => (
                  <div key={step.title} className="flex flex-col relative">
                    <div 
                      className={`flex items-center gap-2 py-2 cursor-pointer group transition-colors border-b border-[var(--border-color)] ${expandedStep === idx ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                      onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                    >
                      <span className="text-[11px] font-bold text-[var(--accent-purple)]">{step.num}</span>
                      <span className="text-[11px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">{step.title}</span>
                      {expandedStep === idx ? (
                        <ChevronUp className="w-3.5 h-3.5 ml-auto text-[var(--text-muted)]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 ml-auto text-[var(--text-muted)] opacity-30 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>

                    {expandedStep === idx && (
                      <div className="bg-[var(--bg-secondary)] rounded-md p-2.5 my-2 space-y-2 border border-[var(--border-color)]">
                        <div>
                          <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Why learn this?</p>
                          <p className="text-[10px] text-[var(--text-secondary)]">{step.why}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Prerequisites</p>
                          <p className="text-[10px] text-[var(--text-secondary)]">{step.prereq}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">What comes next?</p>
                          <p className="text-[10px] text-[var(--text-secondary)]">{step.next}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex items-center justify-center gap-2 py-3 border-b border-[var(--border-color)]">
                   <span className="text-[11px] font-bold text-[var(--text-primary)]">↕ Continuous Practice</span>
                </div>
              </div>
            </div>

          </div>


          {/* ---------------- COLUMN 2 (Middle) ---------------- */}
          <div className="col-span-12 lg:col-span-5 flex flex-col h-full gap-5 overflow-hidden">
            
            {/* LEARNING PHASES */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-[1.5] flex flex-col min-h-0">
              <SectionHeader title="Learning Phases" />
              
              <div className="relative mb-4">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input 
                  type="text" 
                  placeholder="Search any subject..." 
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[10px] font-bold rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[var(--accent-purple)] transition-colors placeholder:text-[var(--text-muted)] placeholder:font-medium"
                />
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6 pt-2">
                
                {/* PHASE 1 */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-purple)]" />
                  
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-[10px] font-bold text-[var(--accent-purple)] uppercase tracking-widest">Phase 1</h2>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-color)]">First ~200 Days</span>
                  </div>
                  
                  <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-1">Core DSA Roadmap</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] font-medium mb-4">Follow one complete structured roadmap from beginning to end.</p>
                  
                  <div className="mb-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3">
                    <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1.5">Primary Roadmap</p>
                    <p className="text-[12px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Target className="w-4 h-4 text-[var(--accent-purple)]" /> Striver A2Z DSA
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Fundamentals", "Data Structures", "Algorithms", "Problem Solving", "Dynamic Programming", "Graphs", "Interview Problems"].map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[10px] font-medium rounded-md">
                          {topic}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href="/study/foundation/data-structures-algorithms/core-dsa-roadmap"
                    className="mt-auto self-start px-4 py-2 bg-[var(--accent-purple)] hover:opacity-90 text-white text-[11px] font-bold rounded-lg transition-opacity flex items-center gap-2 shadow-sm"
                  >
                    Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* PHASE 2 */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--text-muted)]" />
                  
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Phase 2</h2>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-color)]">After Phase 1</span>
                  </div>
                  
                  <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-1">Advanced DSA</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] font-medium mb-5">Go beyond the roadmap by mastering advanced topics and becoming interview-ready.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Advanced Graph Algorithms", "Advanced Dynamic Programming", "Advanced Trees", "Advanced String Algorithms", "Advanced Data Structures", "Mathematical Algorithms", "Competitive Programming", "Company Interview Preparation", "Hard Problem Solving"].map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[10px] font-medium rounded-md">
                          {topic}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href="/study/foundation/data-structures-algorithms/advanced-dsa"
                    className="mt-auto self-start px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--text-muted)] text-[var(--text-primary)] text-[11px] font-bold rounded-lg transition-colors flex items-center gap-2"
                  >
                    Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>


          {/* ---------------- COLUMN 3 (Right) ---------------- */}
          <div className="col-span-12 lg:col-span-3 flex flex-col h-full gap-5 overflow-hidden">
            
            {/* NOTES */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-1 flex flex-col min-h-0">
              <SectionHeader 
                title="Notes" 
                rightElement={
                  <button className="px-2.5 py-1 bg-[var(--accent-purple)] text-white text-[9px] font-bold rounded flex items-center gap-1">
                    <Plus className="w-2.5 h-2.5" /> Add Note
                  </button>
                }
              />
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                <StickyNote className="w-6 h-6 text-[var(--text-muted)] opacity-30" />
                <p className="text-[12px] font-bold text-[var(--text-muted)]">No notes yet.</p>
              </div>
            </div>

            {/* RESOURCES */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-1 flex flex-col min-h-0">
              <SectionHeader 
                title="Resources" 
                rightElement={
                  <button className="px-2.5 py-1 bg-[var(--accent-purple)] text-white text-[9px] font-bold rounded flex items-center gap-1">
                    <Plus className="w-2.5 h-2.5" /> Add Resource
                  </button>
                }
              />
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                <Library className="w-6 h-6 text-[var(--text-muted)] opacity-30" />
                <p className="text-[12px] font-bold text-[var(--text-primary)]">No resources added.</p>
                <p className="text-[10px] text-[var(--text-secondary)]">Books, Articles, YouTube, Documentation, Problem Sheets, etc.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
