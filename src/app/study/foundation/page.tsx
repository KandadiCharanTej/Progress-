import Link from "next/link";
import { ArrowRight, BookOpen, Code, Terminal, Brain, Database, Network, Server, Settings, Variable, Blocks, Braces, Binary, Network as GraphIcon, ArrowUpRight, Cpu } from "lucide-react";

export default function FoundationPage() {
  return (
    <div className="h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] overflow-hidden">
      
      {/* HEADER - Fixed Height */}
      <div className="shrink-0 p-6 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] w-max">
            <span className="text-sm">🥇</span>
            <span className="text-xs font-bold text-[var(--text-primary)] tracking-widest uppercase">The Starting Point</span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Foundation
          </h1>
          
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-4xl font-medium">
            Build a strong foundation in Computer Science and Data Structures & Algorithms. These two pillars will help you understand how computers work, write better code, solve problems efficiently, and prepare for internships, placements, competitive programming, and your software engineering career.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT - Horizontal Grid matching Dashboard */}
      <div className="flex-1 min-h-0 p-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* COLUMN 1: OVERVIEW (col-span-3) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
            <div className="shrink-0 p-4 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
              <h2 className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase">Foundation Overview</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[var(--accent-purple)] flex items-center gap-1.5 uppercase tracking-wider">
                  <span>🎯</span> Purpose
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                  Build the core knowledge every software engineer needs. Learn not just how to write code, but also how computers work, how software is built, and how to solve problems step by step.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[var(--accent-purple)] flex items-center gap-1.5 uppercase tracking-wider">
                  <span>💡</span> Why This Matters
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                  Programming languages and technologies keep changing, but the fundamentals of Computer Science and Data Structures & Algorithms stay the same. A strong foundation makes learning new technologies much easier and helps you throughout your career.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[var(--accent-purple)] flex items-center gap-1.5 uppercase tracking-wider">
                  <span>📚</span> What You Will Learn
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium mb-2">
                  By completing this foundation, you will understand:
                </p>
                <ul className="space-y-1">
                  {[
                    "How programs work",
                    "How memory and computers work",
                    "Object-Oriented Programming (OOP)",
                    "Operating Systems",
                    "Databases (DBMS)",
                    "Computer Networks",
                    "Problem Solving",
                    "Data Structures",
                    "Algorithms",
                    "Time & Space Complexity"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[10px] font-medium text-[var(--text-primary)]">
                      <div className="w-1 h-1 rounded-full bg-[var(--accent-purple)] shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[var(--accent-purple)] flex items-center gap-1.5 uppercase tracking-wider">
                  <span>🚀</span> Outcome
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium mb-2">
                  After completing this foundation, you will have the knowledge needed to:
                </p>
                <ul className="space-y-1">
                  {[
                    "Build better software",
                    "Solve coding problems with confidence",
                    "Prepare for technical interviews",
                    "Perform well in internships and placements",
                    "Learn advanced software engineering and AI topics more easily"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[10px] font-medium text-[var(--text-primary)]">
                      <div className="w-1 h-1 rounded-full bg-[var(--accent-purple)] shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* COLUMN 2: PILLAR 1.1 (col-span-4 or 4.5) */}
          <div className="col-span-1 lg:col-span-4 lg:col-start-4 lg:-mr-4 flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--accent-purple)] transition-colors group">
            
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-6 min-h-0">
              
              <div className="shrink-0 space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-sm">
                  <Terminal className="w-4 h-4 text-[var(--text-primary)]" />
                </div>
                
                <div>
                  <h3 className="text-[9px] font-bold text-[var(--accent-purple)] tracking-widest uppercase mb-1">
                    🥇 Pillar 1.1
                  </h3>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
                    Computer Science Foundation
                  </h2>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                    Learn the core Computer Science subjects that every software engineer should know. Understand how software, hardware, operating systems, databases, and networks work together.
                  </p>
                </div>
              </div>

              <div className="flex-1 bg-[var(--bg-main)] rounded-xl p-4 border border-[var(--border-color)] overflow-y-auto no-scrollbar min-h-[250px]">
                <h4 className="text-[9px] font-bold text-[var(--text-muted)] tracking-widest uppercase mb-3 border-b border-[var(--border-color)] pb-2 sticky top-0 bg-[var(--bg-main)]">
                  Curriculum Includes
                </h4>
                
                <div className="flex flex-col gap-2">
                  {[
                    { icon: Code, name: "Programming Fundamentals" },
                    { icon: Blocks, name: "Object-Oriented Programming (OOP)" },
                    { icon: Cpu, name: "Computer Organization & Architecture" },
                    { icon: Settings, name: "Operating Systems" },
                    { icon: Database, name: "Database Management Systems (DBMS)" },
                    { icon: Network, name: "Computer Networks" },
                    { icon: Braces, name: "Software Engineering Basics" },
                    { icon: Server, name: "System Design Basics" },
                    { icon: Binary, name: "Mathematics for Computer Science" },
                  ].map((topic) => (
                    <div key={topic.name} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
                        <topic.icon className="w-2.5 h-2.5 text-[var(--text-secondary)]" />
                      </div>
                      <span className="text-[10px] font-medium text-[var(--text-primary)]">{topic.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 mt-auto pt-4 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Progress</span>
                    <span className="text-[9px] font-bold text-[var(--text-primary)]">45%</span>
                  </div>
                  <div className="w-full h-1 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-color)]">
                    <div className="h-full bg-[var(--accent-purple)] w-[45%] rounded-full" />
                  </div>
                </div>

                <Link 
                  href="/study/foundation/computer-science-foundation"
                  className="inline-flex items-center justify-between w-full p-3 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 group/btn"
                >
                  <span className="text-xs font-bold">Continue Learning</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>

          {/* COLUMN 3: PILLAR 1.2 (col-span-4 or 5) */}
          <div className="col-span-1 lg:col-span-5 lg:ml-4 flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--accent-purple)] transition-colors group">
            
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-6 min-h-0">
              
              <div className="shrink-0 space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-sm">
                  <Brain className="w-4 h-4 text-[var(--text-primary)]" />
                </div>
                
                <div>
                  <h3 className="text-[9px] font-bold text-[var(--accent-purple)] tracking-widest uppercase mb-1">
                    🥇 Pillar 1.2
                  </h3>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
                    Data Structures & Algorithms
                  </h2>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                    Learn how to solve problems efficiently using the right data structures and algorithms. This pillar prepares you for coding interviews, competitive programming, and writing optimized code.
                  </p>
                </div>
              </div>

              <div className="flex-1 bg-[var(--bg-main)] rounded-xl p-4 border border-[var(--border-color)] overflow-y-auto no-scrollbar min-h-[250px]">
                <h4 className="text-[9px] font-bold text-[var(--text-muted)] tracking-widest uppercase mb-3 border-b border-[var(--border-color)] pb-2 sticky top-0 bg-[var(--bg-main)]">
                  Curriculum Includes
                </h4>
                
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                  {[
                    "Time & Space Complexity",
                    "Arrays",
                    "Strings",
                    "Linked Lists",
                    "Stacks",
                    "Queues",
                    "Recursion",
                    "Searching",
                    "Sorting",
                    "Binary Search",
                    "Hashing",
                    "Trees",
                    "Binary Search Trees",
                    "Heaps",
                    "Graphs",
                    "Greedy Algorithms",
                    "Backtracking",
                    "Dynamic Programming",
                    "Sliding Window",
                    "Two Pointers",
                    "Bit Manipulation",
                    "Tries",
                    "Segment Trees",
                    "Disjoint Set Union (DSU)",
                    "Advanced Algorithms"
                  ].map((topic) => (
                    <div key={topic} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-[var(--text-muted)] shrink-0" />
                      <span className="text-[9px] font-medium text-[var(--text-secondary)] leading-tight">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 mt-auto pt-4 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Progress</span>
                    <span className="text-[9px] font-bold text-[var(--text-primary)]">0%</span>
                  </div>
                  <div className="w-full h-1 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-color)]">
                    <div className="h-full bg-[var(--text-muted)] opacity-20 w-full rounded-full" />
                  </div>
                </div>

                <Link 
                  href="/study/foundation/data-structures-algorithms"
                  className="inline-flex items-center justify-between w-full p-3 rounded-lg bg-[var(--bg-main)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 group/btn"
                >
                  <span className="text-xs font-bold">Start Learning</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
