export type Resource = {
  name: string;
  type: string;
};

export type TopicGroup = {
  name: string;
  topics: string[];
};

export type Course = {
  id: string;
  name: string;
  overview: string;
  mission: string;
  learningFlow: string[];
  topicGroups: TopicGroup[];
  resources: Resource[];
  learningStrategy: string[];
  practiceStrategy: string[];
  completionCriteria: string[];
  commonMistakes: string[];
  finalOutcome: string;
  progress: number;
  completion: string;
  estTime: string;
};

export type Subject = {
  id: string;
  name: string;
  progress: number;
  completion: string;
  courses: Course[];
};

export const curriculumData: Subject[] = [
  {
    id: "prog_lang",
    name: "Programming Languages",
    progress: 45,
    completion: "In Progress",
    courses: [
      {
        id: "cpp",
        name: "C++",
        progress: 45,
        completion: "In Progress",
        estTime: "4 Weeks",
        overview: "C++ is a high-performance language that forces you to understand memory management, pointers, and how computers actually execute code.",
        mission: "Master C++ for logic, memory, and data structures. It will make learning any other language trivial.",
        learningFlow: ["Syntax", "Variables", "Conditions", "Loops", "Functions", "Arrays", "Pointers", "OOP", "Modern C++", "STL"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["Syntax & Variables", "Operators & I/O", "Conditionals & Loops", "Functions & Scope", "Arrays & Strings", "References"]
          },
          {
            name: "Intermediate",
            topics: ["Pointers & Memory Layout", "Dynamic Memory Allocation", "File Handling", "Exception Handling", "Namespaces"]
          },
          {
            name: "Advanced",
            topics: ["Classes, Objects, Encapsulation", "Inheritance, Polymorphism", "Templates & Lambdas", "Smart Pointers", "Containers & Algorithms"]
          }
        ],
        resources: [
          { name: "LearnCpp", type: "Primary" },
          { name: "CppReference", type: "Documentation" },
          { name: "Cherno C++", type: "YouTube" }
        ],
        learningStrategy: [
          "Understand the underlying memory model.",
          "Write small CLI programs to test concepts immediately.",
          "Do not move forward if you don't understand pointers."
        ],
        practiceStrategy: [
          "Build small command-line utilities.",
          "Re-implement standard library functions (like strlen).",
          "Solve easy logic problems without looking up syntax."
        ],
        completionCriteria: [
          "Can write C++ fluently without syntax errors.",
          "Understand exactly what happens in memory when you declare a variable.",
          "Can use standard library containers (vector, map) confidently."
        ],
        commonMistakes: [
          "Memorizing syntax without understanding memory.",
          "Skipping pointers.",
          "Relying too heavily on C-style arrays instead of vectors."
        ],
        finalOutcome: "You will have a rock-solid foundation in programming logic and memory management, ready for Data Structures and Algorithms."
      },
      {
        id: "sql",
        name: "SQL",
        progress: 0,
        completion: "Not Started",
        estTime: "2 Weeks",
        overview: "SQL is the standard language for dealing with Relational Databases. It is declarative, meaning you describe what you want, not how to get it.",
        mission: "Master querying and manipulating relational data, as it forms the backbone of almost all software applications.",
        learningFlow: ["Select", "Filter", "Joins", "Aggregations", "Subqueries", "Window Functions", "Table Design"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["SELECT, WHERE, LIMIT", "AND, OR, NOT", "ORDER BY, DISTINCT", "UPDATE, DELETE, INSERT"]
          },
          {
            name: "Intermediate",
            topics: ["INNER JOIN, LEFT JOIN", "GROUP BY, HAVING", "COUNT, SUM, AVG", "Foreign Keys"]
          },
          {
            name: "Advanced",
            topics: ["Subqueries", "Window Functions (OVER, PARTITION BY)", "CTEs", "Indexes"]
          }
        ],
        resources: [
          { name: "SQLBolt", type: "Primary" },
          { name: "PostgreSQL Docs", type: "Documentation" }
        ],
        learningStrategy: [
          "Visualize the tables before writing the query.",
          "Understand the order of execution (FROM -> WHERE -> GROUP BY -> SELECT).",
          "Practice writing queries daily."
        ],
        practiceStrategy: [
          "Solve interactive SQL challenges.",
          "Design simple database schemas for hypothetical apps.",
          "Analyze real datasets."
        ],
        completionCriteria: [
          "Can write complex JOINs effortlessly.",
          "Understand aggregations and grouping.",
          "Can design a basic normalized database schema."
        ],
        commonMistakes: [
          "Forgetting the order of SQL execution.",
          "Misunderstanding the difference between WHERE and HAVING.",
          "Creating Cartesian products by missing JOIN conditions."
        ],
        finalOutcome: "You will be able to extract and manipulate data from any relational database confidently."
      },
      {
        id: "python",
        name: "Python",
        progress: 0,
        completion: "Not Started",
        estTime: "3 Weeks",
        overview: "Python is a high-level, interpreted language known for its readability. It is the dominant language in AI, data science, and automation.",
        mission: "Learn Python to rapidly prototype ideas, automate tasks, and prepare for Machine Learning and AI.",
        learningFlow: ["Syntax", "Data Structures", "Functions", "OOP", "Modules", "File I/O", "APIs"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["Variables, Data Types", "Lists, Dictionaries, Sets, Tuples", "Control Flow (If, For, While)", "Functions & Scope"]
          },
          {
            name: "Intermediate",
            topics: ["Classes & OOP", "Exception Handling", "List Comprehensions", "File I/O", "Modules & PIP"]
          },
          {
            name: "Advanced",
            topics: ["Decorators", "Generators", "Asyncio", "Consuming APIs (Requests)", "Data Analysis Basics (NumPy/Pandas)"]
          }
        ],
        resources: [
          { name: "Real Python", type: "Primary" },
          { name: "Python Docs", type: "Documentation" }
        ],
        learningStrategy: [
          "Focus on Pythonic idioms (how to write Python elegantly).",
          "Don't worry about memory management; focus on logic.",
          "Build small projects quickly to see results."
        ],
        practiceStrategy: [
          "Automate a daily task (e.g., file sorting, web scraping).",
          "Build a CLI tool that consumes a public API.",
          "Solve logic puzzles using Python."
        ],
        completionCriteria: [
          "Can write clean, Pythonic code.",
          "Understand lists, dictionaries, and when to use them.",
          "Can interact with external APIs and parse JSON."
        ],
        commonMistakes: [
          "Writing C++ style code in Python.",
          "Ignoring Virtual Environments (venv).",
          "Overusing classes when simple functions suffice."
        ],
        finalOutcome: "You will have a powerful tool for rapid development, automation, and a gateway into AI."
      }
    ]
  },
  {
    id: "core_cs",
    name: "Core Computer Science",
    progress: 0,
    completion: "Not Started",
    courses: [
      {
        id: "oop",
        name: "Object Oriented Programming",
        progress: 0,
        completion: "Not Started",
        estTime: "3 Weeks",
        overview: "OOP is a programming paradigm based on the concept of 'objects', which can contain data and code.",
        mission: "Understand how to structure large software projects using objects, inheritance, and encapsulation.",
        learningFlow: ["Classes", "Objects", "Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "SOLID"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["Classes & Objects", "Constructors", "Attributes & Methods"]
          },
          {
            name: "Intermediate",
            topics: ["Encapsulation", "Inheritance", "Polymorphism", "Interfaces & Abstract Classes"]
          },
          {
            name: "Advanced",
            topics: ["SOLID Principles", "Design Patterns Basics", "Composition vs Inheritance"]
          }
        ],
        resources: [
          { name: "Head First Design Patterns", type: "Book" },
          { name: "Refactoring.guru", type: "Primary" }
        ],
        learningStrategy: [
          "Focus on why OOP exists (to manage complexity).",
          "Draw UML diagrams to visualize relationships.",
          "Favor composition over inheritance."
        ],
        practiceStrategy: [
          "Design a complete system on paper (e.g., a Parking Lot or Library).",
          "Implement the system in C++ or Python.",
          "Refactor procedural code into OOP code."
        ],
        completionCriteria: [
          "Understand the 4 pillars of OOP.",
          "Can design a system using classes and interfaces.",
          "Understand SOLID principles."
        ],
        commonMistakes: [
          "Creating massive 'God' classes.",
          "Deep inheritance hierarchies.",
          "Ignoring interfaces."
        ],
        finalOutcome: "You will be able to design maintainable, modular software architectures."
      },
      {
        id: "dbms",
        name: "Database Management Systems",
        progress: 0,
        completion: "Not Started",
        estTime: "4 Weeks",
        overview: "DBMS explores how data is persistently stored, managed, and retrieved efficiently.",
        mission: "Understand the internals of databases, transactions, and how to design scalable schemas.",
        learningFlow: ["Relational Model", "ER Diagrams", "Normalization", "Transactions", "Concurrency", "Indexing"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["Relational Model", "ER Modeling", "Schema Design"]
          },
          {
            name: "Intermediate",
            topics: ["Normalization (1NF, 2NF, 3NF, BCNF)", "Transactions", "ACID Properties"]
          },
          {
            name: "Advanced",
            topics: ["Concurrency Control", "Locking Mechanisms", "Indexing (B-Trees)", "Query Optimization"]
          }
        ],
        resources: [
          { name: "CMU Database Systems", type: "Primary" },
          { name: "Database System Concepts", type: "Book" }
        ],
        learningStrategy: [
          "Understand the trade-offs between different database designs.",
          "Focus heavily on ACID and how databases ensure data integrity.",
          "Learn how B-Trees make lookups fast."
        ],
        practiceStrategy: [
          "Design schemas for complex applications (e.g., Uber, Twitter).",
          "Normalize denormalized data.",
          "Analyze query execution plans."
        ],
        completionCriteria: [
          "Can design normalized database schemas.",
          "Understand ACID and transactions.",
          "Understand how indexes work under the hood."
        ],
        commonMistakes: [
          "Over-normalizing to the point of performance degradation.",
          "Not understanding the performance cost of JOINs without indexes.",
          "Ignoring concurrency issues."
        ],
        finalOutcome: "You will be able to architect robust data models and understand how databases handle scale."
      },
      {
        id: "os",
        name: "Operating Systems",
        progress: 0,
        completion: "Not Started",
        estTime: "4 Weeks",
        overview: "OS explores the software that manages computer hardware and provides common services for computer programs.",
        mission: "Understand how software interacts with hardware, how processes run, and how memory is managed.",
        learningFlow: ["Processes", "Threads", "Scheduling", "Memory Mgmt", "Virtual Memory", "Concurrency", "File Systems"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["OS Concepts", "Processes vs Threads", "Process States"]
          },
          {
            name: "Intermediate",
            topics: ["CPU Scheduling", "Context Switching", "Memory Management", "Paging & Segmentation"]
          },
          {
            name: "Advanced",
            topics: ["Virtual Memory", "Concurrency & Synchronization", "Deadlocks", "File Systems"]
          }
        ],
        resources: [
          { name: "OSTEP (Operating Systems: Three Easy Pieces)", type: "Primary" },
          { name: "MIT 6.S081", type: "YouTube" }
        ],
        learningStrategy: [
          "Focus on the abstractions the OS provides (process, virtual memory, files).",
          "Understand concurrency deeply, as it applies to all modern software.",
          "Read OSTEP thoroughly."
        ],
        practiceStrategy: [
          "Write multithreaded programs and handle race conditions.",
          "Implement simple scheduling algorithms.",
          "Explore Linux system calls (fork, exec, wait)."
        ],
        completionCriteria: [
          "Understand the difference between a process and a thread.",
          "Understand virtual memory and paging.",
          "Can write safe concurrent code using mutexes."
        ],
        commonMistakes: [
          "Treating the OS as a black box.",
          "Misunderstanding race conditions.",
          "Confusing virtual memory with RAM."
        ],
        finalOutcome: "You will understand exactly what happens when you run an executable program."
      },
      {
        id: "networks",
        name: "Computer Networks",
        progress: 0,
        completion: "Not Started",
        estTime: "3 Weeks",
        overview: "Computer Networks explores how computers communicate over the internet and local networks.",
        mission: "Understand the layers of the internet, how data travels, and how to build networked applications.",
        learningFlow: ["OSI Model", "Application Layer", "Transport Layer", "Network Layer", "Link Layer", "Security"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["OSI & TCP/IP Models", "Application Layer (HTTP, DNS)", "Client-Server Model"]
          },
          {
            name: "Intermediate",
            topics: ["Transport Layer (TCP vs UDP)", "Sockets", "Network Layer (IP, Routing)"]
          },
          {
            name: "Advanced",
            topics: ["Link Layer (MAC, Ethernet)", "Network Security (SSL/TLS)", "WebSockets"]
          }
        ],
        resources: [
          { name: "Computer Networking: A Top-Down Approach", type: "Book" },
          { name: "Stanford CS144", type: "Primary" }
        ],
        learningStrategy: [
          "Use the Top-Down approach (start at HTTP, work down to physical).",
          "Use tools like Wireshark to inspect actual packets.",
          "Understand the differences between TCP and UDP."
        ],
        practiceStrategy: [
          "Build a simple HTTP server from scratch.",
          "Build a chat application using Sockets.",
          "Inspect network traffic with Wireshark."
        ],
        completionCriteria: [
          "Understand the lifecycle of a web request.",
          "Understand TCP reliability and congestion control.",
          "Can explain DNS and HTTP."
        ],
        commonMistakes: [
          "Getting lost in the lower layers (physical) too early.",
          "Not understanding how IP addresses and MAC addresses interact.",
          "Ignoring security (TLS)."
        ],
        finalOutcome: "You will understand the backbone of the internet and how web applications communicate."
      },
      {
        id: "se_fundamentals",
        name: "Software Engineering Fundamentals",
        progress: 0,
        completion: "Not Started",
        estTime: "2 Weeks",
        overview: "Software Engineering is the application of engineering approaches to the development of software.",
        mission: "Learn the processes, tools, and methodologies used to build software in a professional team environment.",
        learningFlow: ["Git", "SDLC", "Agile", "Testing", "CI/CD", "Architecture"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["Version Control (Git)", "Software Development Life Cycle (SDLC)", "Agile & Scrum"]
          },
          {
            name: "Intermediate",
            topics: ["Testing (Unit, Integration, E2E)", "Code Review Processes", "Clean Code Principles"]
          },
          {
            name: "Advanced",
            topics: ["Continuous Integration / Deployment (CI/CD)", "Software Architecture Basics", "System Design Basics"]
          }
        ],
        resources: [
          { name: "Clean Code", type: "Book" },
          { name: "Missing Semester of Your CS Education", type: "Primary" }
        ],
        learningStrategy: [
          "Focus on collaboration tools and methodologies.",
          "Understand why tests are crucial for long-term velocity.",
          "Treat code readability as a primary feature."
        ],
        practiceStrategy: [
          "Use Git branching and pull requests for your personal projects.",
          "Write unit tests for a previous project.",
          "Set up a simple CI/CD pipeline using GitHub Actions."
        ],
        completionCriteria: [
          "Can confidently use Git (branch, merge, rebase, resolve conflicts).",
          "Understand Agile methodologies.",
          "Know how to write testable code."
        ],
        commonMistakes: [
          "Committing to main branch directly.",
          "Writing code without tests.",
          "Writing clever, unreadable code."
        ],
        finalOutcome: "You will be prepared to work in a professional software engineering team."
      }
    ]
  },
  {
    id: "math",
    name: "Mathematical Foundations",
    progress: 0,
    completion: "Not Started",
    courses: [
      {
        id: "discrete_math",
        name: "Discrete Mathematics & Logic",
        progress: 0,
        completion: "Not Started",
        estTime: "4 Weeks",
        overview: "Discrete Math is the mathematics of computer science. It deals with distinct, separated values rather than continuous ones.",
        mission: "Develop the logical thinking and proof techniques required to analyze algorithms and solve complex problems.",
        learningFlow: ["Logic", "Sets", "Relations", "Functions", "Combinatorics", "Graph Theory", "Probability"],
        topicGroups: [
          {
            name: "Fundamentals",
            topics: ["Propositional Logic", "Boolean Algebra", "Set Theory"]
          },
          {
            name: "Intermediate",
            topics: ["Relations & Functions", "Proof Techniques (Induction, Contradiction)", "Combinatorics (Counting)"]
          },
          {
            name: "Advanced",
            topics: ["Graph Theory Basics", "Discrete Probability", "Statistics Basics"]
          }
        ],
        resources: [
          { name: "MIT 6.042J (Math for CS)", type: "Primary" },
          { name: "Discrete Mathematics and Its Applications", type: "Book" }
        ],
        learningStrategy: [
          "Focus on proofs, not computation.",
          "Understand the connection between Boolean Algebra and programming logic.",
          "Practice daily to build mathematical intuition."
        ],
        practiceStrategy: [
          "Solve logic puzzles.",
          "Write formal proofs for simple theorems.",
          "Apply graph theory to coding problems."
        ],
        completionCriteria: [
          "Can write a proof by induction.",
          "Understand Set Theory and Logic.",
          "Understand basic Graph Theory."
        ],
        commonMistakes: [
          "Memorizing formulas instead of understanding proofs.",
          "Skipping the foundational logic sections.",
          "Not practicing enough problems."
        ],
        finalOutcome: "You will possess the rigorous analytical thinking required to master Data Structures and Algorithms."
      }
    ]
  }
];