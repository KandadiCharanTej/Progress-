"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, Edit3, Compass, ListOrdered, BookOpen, 
  StickyNote, Library, ChevronDown, ChevronUp, Play, Search
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

function CollapsibleCategory({ category }: { category: { id: number, title: string, subjects: string[] } }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col border-b border-[var(--border-color)] pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
      <div 
        className="flex items-center gap-2 py-1.5 cursor-pointer group transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[11px] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">{category.title}</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 ml-auto text-[var(--text-muted)]" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 ml-auto text-[var(--text-muted)] opacity-30 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      
      {isOpen && (
        <div className="flex flex-wrap gap-2 mt-2 ml-2">
          {category.subjects.map(subject => (
            <Link 
              key={subject} 
              href={`/study/foundation/computer-science-foundation/${subject.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] text-[var(--text-primary)] text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center"
            >
              {subject}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// MAIN PAGE
// -------------------------------------------------------------

export default function ComputerScienceFoundation() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const studySteps = [
    { num: "①", name: "C++", why: "Primary language for problem solving.", prereq: "None." },
    { num: "②", name: "OOP", why: "Teaches software design.", prereq: "C++." },
    { num: "③", name: "SQL", why: "Query relational data.", prereq: "Basic Logic." },
    { num: "④", name: "DBMS", why: "How data is organized safely.", prereq: "SQL." },
    { num: "⑤", name: "Computer Organization", why: "How hardware executes code.", prereq: "Basic Programming." },
    { num: "⑥", name: "Operating Systems", why: "Software managing hardware.", prereq: "Architecture." },
    { num: "⑦", name: "Computer Networks", why: "Communication over the internet.", prereq: "OS." },
    { num: "⑧", name: "Python", why: "Automation and AI.", prereq: "General Programming." },
    { num: "⑨", name: "Mathematical Foundations", why: "Strengthen algorithmic thinking.", prereq: "Basic Math." }
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] font-sans overflow-hidden">
      
      {/* TOP BAR (Matches Dashboard Header) */}
      <div className="shrink-0 h-14 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-[14px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Computer Science Foundation
          </h1>
          <span className="text-[12px] text-[var(--text-secondary)] font-medium">Pillar 1.1</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-[11px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
            Goal: <span className="text-[var(--text-secondary)]">Build core CS knowledge</span>
          </div>
          <button className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-muted)] text-[10px] font-bold text-[var(--text-primary)] rounded-md transition-colors flex items-center gap-1.5">
            Reset Layout
          </button>
        </div>
      </div>

      {/* MAIN GRID (3 Columns to match Dashboard) */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
        <div className="h-full max-w-screen-2xl mx-auto grid grid-cols-12 gap-5">
          
          {/* ---------------- COLUMN 1 (Left) ---------------- */}
          <div className="col-span-12 lg:col-span-4 flex flex-col h-full gap-5 overflow-hidden">
            
            {/* ABOUT (Styled like Progress Summary) */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 shrink-0">
              <SectionHeader title="About Pillar 1.1" />
              <div className="flex flex-col gap-2">
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Mission</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">Build a strong Computer Science foundation before moving to advanced subjects.</div>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Goal</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">Understand how software runs, how computers work, and how systems are built.</div>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Why This Matters</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">A strong foundation makes learning new technologies much easier.</div>
                </div>
                <div className="bg-[var(--bg-secondary)] rounded p-2.5 border border-[var(--border-color)]">
                  <div className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-0.5">Expected Outcome</div>
                  <div className="text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">Gain the knowledge needed for projects, internships, placements, and advanced Computer Science.</div>
                </div>
              </div>
            </div>

            {/* STUDY ORDER (Styled like Today's Tasks) */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-1 flex flex-col min-h-0">
              <SectionHeader title="Study Order" />
              
              <div className="flex-1 overflow-y-auto no-scrollbar relative pl-2 pr-2">
                {studySteps.map((step, idx) => (
                  <div key={step.name} className="flex flex-col relative">
                    <div 
                      className={`flex items-center gap-2 py-2 cursor-pointer group transition-colors border-b border-[var(--border-color)] ${expandedStep === idx ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                      onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                    >
                      <span className="text-[11px] font-bold text-[var(--accent-purple)]">{step.num}</span>
                      <span className="text-[11px] font-bold text-[var(--text-primary)]">{step.name}</span>
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* ---------------- COLUMN 2 (Middle) ---------------- */}
          <div className="col-span-12 lg:col-span-5 flex flex-col h-full gap-5 overflow-hidden">
            
            {/* SUBJECTS (Styled like Today's Plan) */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-[1.5] flex flex-col min-h-0">
              <SectionHeader 
                title="Subjects" 
                rightElement={
                  <button className="px-2.5 py-1 bg-[var(--accent-purple)] text-white text-[9px] font-bold rounded flex items-center gap-1">
                    <Plus className="w-2.5 h-2.5" /> Filter
                  </button>
                }
              />
              
              <div className="relative mb-4">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input 
                  type="text" 
                  placeholder="Search any subject..." 
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[10px] font-bold rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[var(--accent-purple)] transition-colors placeholder:text-[var(--text-muted)] placeholder:font-medium"
                />
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2 pl-2">
                
                {[
                  { 
                    id: 1, 
                    title: "1. Programming Languages", 
                    subjects: ["C++", "SQL", "Python"] 
                  },
                  { 
                    id: 2, 
                    title: "2. Core Computer Science", 
                    subjects: ["Object-Oriented Programming", "Database Management Systems", "Computer Organization & Architecture", "Operating Systems", "Computer Networks", "Software Engineering Fundamentals"] 
                  },
                  { 
                    id: 3, 
                    title: "3. Mathematical Foundations", 
                    subjects: [] 
                  },
                  { 
                    id: 4, 
                    title: "4. Continuous Practice", 
                    subjects: [] 
                  }
                ].map(category => (
                  <CollapsibleCategory key={category.id} category={category} />
                ))}

              </div>
            </div>

            {/* NOTES (Styled like Quick Notes) */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-1 flex flex-col min-h-0">
              <SectionHeader 
                title="Notes" 
                rightElement={
                  <button className="px-2.5 py-1 bg-[var(--accent-purple)] text-white text-[9px] font-bold rounded flex items-center gap-1">
                    <Plus className="w-2.5 h-2.5" /> New Note
                  </button>
                }
              />
              <div className="flex-1 flex items-center justify-center text-center">
                <p className="text-[12px] font-bold text-[var(--text-muted)]">No notes yet.</p>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-[10px] font-bold text-[var(--text-muted)]">
                <span>0 Total Notes</span>
                <span className="text-[var(--accent-purple)] cursor-pointer">View All Notes</span>
              </div>
            </div>

          </div>


          {/* ---------------- COLUMN 3 (Right) ---------------- */}
          <div className="col-span-12 lg:col-span-3 flex flex-col h-full gap-5 overflow-hidden">
            
            {/* RESOURCES (Styled like Action Center) */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex-1 flex flex-col min-h-0">
              <SectionHeader 
                title="Resources" 
                rightElement={
                  <span className="text-[var(--accent-purple)] text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </span>
                }
              />
              
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                <Library className="w-6 h-6 text-[var(--text-muted)] opacity-30" />
                <p className="text-[12px] font-bold text-[var(--text-primary)]">No resources added.</p>
                <p className="text-[10px] text-[var(--text-secondary)]">Books, videos, & PDFs will appear here.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}