export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  type: string;
  summary: string;
  bullets: string[];
  skills: string[];
  highlight: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  period: string;
  category: string;
  stack: string[];
  impactStatement: string;
  description: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  architectureHighlights: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  items: { name: string; highlight?: boolean; level?: string }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  code: string;
  skills: string[];
  featured?: boolean;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  details: string[];
}

export const PORTFOLIO_CONTENT = {
  personal: {
    name: "Tharunshankar S",
    monogram: "TS",
    headline: "THARUNSHANKAR S",
    title: "Full-Stack Software Engineer",
    roleSubtitle: "TypeScript · Node.js · React · AI-Native Applications",
    rotatingRoles: [
      "Full-Stack Software Engineer",
      "TypeScript · Node.js · React",
      "AI-Native Applications Architect",
      "Distributed Systems & REST APIs",
      "Claude Certified Developer"
    ],
    status: {
      available: true,
      text: "Available for High-Impact Roles",
      relocation: "Open to Relocation",
      location: "Trivandrum, Kerala / Chennai, India"
    },
    contact: {
      email: "tharund2108@gmail.com",
      phone: "+91 6382209718",
      website: "https://tharunprof.dev",
      websiteDisplay: "tharunprof.dev",
      linkedin: "https://www.linkedin.com/in/tharuns21/",
      linkedinDisplay: "linkedin.com/in/tharun",
      github: "https://github.com/thar2130",
      githubDisplay: "github.com/thar2130",
      web3formsKey: "2acc1409-8d1f-4f89-9825-7e069b9655bd"
    },
    resumePath: "/resume.pdf",
    shortBio: "Building high-throughput distributed backends, resilient REST APIs, and immersive React applications with modern AI tooling."
  },

  about: {
    sectionNumber: "01",
    sectionTitle: "PROFILE",
    heading: "Bridging Enterprise Reliability & AI-Accelerated Frontend Engineering",
    paragraph: "Full-stack software engineer (B.E. Computer Science) with 2+ years of professional experience building TypeScript/React web applications and secure, scalable REST APIs and distributed backend services for enterprise and financial systems. Strong in data structures, algorithms and software design, with hands-on experience prototyping quickly, debugging complex data flows, and delivering through Agile teams and regular code reviews. Claude Certified Developer with a strong interest in agentic AI and emerging technologies, comfortable presenting technical ideas to stakeholders and teams.",
    keyPillars: [
      {
        title: "Enterprise Reliability",
        description: "Proven track record engineering high-volume EDI integration pipelines and mission-critical financial backend services with zero fault tolerance."
      },
      {
        title: "AI-Augmented Velocity",
        description: "Harnessing Claude and agentic workflows to accelerate technical spec design, API prototyping, and rigorous automated test coverage."
      },
      {
        title: "Full-Stack Cohesion",
        description: "From deeply optimized PostgreSQL query plans to fluid, micro-interactive React/TypeScript frontends with 60fps cinematic motion."
      }
    ],
    stats: [
      {
        id: "stat-1",
        value: 2,
        suffix: "+",
        label: "Years Experience",
        sublabel: "Enterprise & Financial Systems"
      },
      {
        id: "stat-2",
        value: 50,
        suffix: "+",
        label: "Txns / Minute",
        sublabel: "Real-Time Distributed Fare Processing"
      },
      {
        id: "stat-3",
        value: 1000,
        suffix: "+",
        label: "Simulated Txns / Day",
        sublabel: "Smart Ticketing Cloud Engine"
      },
      {
        id: "stat-4",
        value: 30,
        suffix: "%",
        label: "Less Wait Time",
        sublabel: "Hardware-to-Cloud Latency Cut"
      },
      {
        id: "stat-5",
        value: 20,
        suffix: "%",
        label: "Faster Query Execution",
        sublabel: "Optimized PostgreSQL Schemas"
      }
    ] as StatItem[]
  },

  experience: {
    sectionNumber: "02",
    sectionTitle: "EXPERIENCE",
    heading: "Professional Trajectory",
    subheading: "Engineering enterprise distributed data integrations and resilient modern web applications at scale.",
    items: [
      {
        id: "exp-1",
        role: "Developer II",
        company: "UST",
        location: "Trivandrum, Kerala",
        period: "Aug 2026 – Present",
        current: true,
        type: "Full-Time",
        summary: "Lead engineering on the EDI Development Team, designing resilient backend architectures for mission-critical enterprise and financial data exchanges.",
        highlight: "Architecting cloud-ready REST APIs & modernizing legacy data integration pipelines.",
        bullets: [
          "Design and build backend solutions and REST APIs on the EDI Development Team, delivering reliable, secure, scalable data integration between enterprise and financial systems.",
          "Analyze legacy programs and business workflows to map dependencies, then turn requirements into technical specifications and API designs for migration to modern, cloud-ready architectures.",
          "Use AI-assisted tooling (Claude) to accelerate design, prototyping and iteration while upholding code review and testing standards."
        ],
        skills: ["TypeScript", "Node.js", "REST APIs", "EDI Integration", "Distributed Systems", "Claude AI", "System Migration", "Agile"]
      },
      {
        id: "exp-2",
        role: "Developer I",
        company: "UST",
        location: "Trivandrum, Kerala",
        period: "Sep 2024 – Aug 2026",
        current: false,
        type: "Full-Time",
        summary: "Developed high-performance React and TypeScript applications with robust backend integrations and automated testing.",
        highlight: "Maintained 99.9% uptime on production enterprise frontend suites and streamlined state flow.",
        bullets: [
          "Built and maintained performant React.js and TypeScript web applications integrated with backend REST APIs.",
          "Analyzed and resolved runtime errors and complex data flows across frontend and backend services, improving reliability and observability.",
          "Collaborated with PMs, designers and engineers across design, development, testing, deployment and production support in an Agile environment; took part in regular code reviews."
        ],
        skills: ["React.js", "TypeScript", "REST Integration", "State Management", "Performance Optimization", "Debugging", "Code Review", "Agile / Scrum"]
      }
    ] as ExperienceItem[]
  },

  skills: {
    sectionNumber: "03",
    sectionTitle: "TECH STACK",
    heading: "Skills & Technical Capabilities",
    subheading: "A comprehensive stack spanning low-level algorithms, enterprise backends, modern frontend architecture, and agentic AI.",
    categories: [
      {
        category: "Languages",
        description: "Foundational & strongly-typed programming languages",
        items: [
          { name: "TypeScript", highlight: true, level: "Advanced" },
          { name: "Python", highlight: true, level: "Proficient" },
          { name: "Java", highlight: false, level: "Core" },
          { name: "SQL", highlight: true, level: "Advanced" }
        ]
      },
      {
        category: "Frontend",
        description: "Performant, accessible, and cinematic user interfaces",
        items: [
          { name: "React", highlight: true, level: "Expert" },
          { name: "Reusable Components", highlight: true, level: "Expert" },
          { name: "Responsive Apps", highlight: false, level: "Expert" },
          { name: "Tailwind CSS", highlight: true, level: "Expert" },
          { name: "GSAP & Motion", highlight: true, level: "Advanced" }
        ]
      },
      {
        category: "Backend",
        description: "Scalable REST APIs and distributed enterprise architectures",
        items: [
          { name: "Node.js", highlight: true, level: "Advanced" },
          { name: "REST Design & Docs", highlight: true, level: "Expert" },
          { name: "GraphQL Fundamentals", highlight: false, level: "Core" }
        ]
      },
      {
        category: "Engineering",
        description: "Software engineering standards, testing, and lifecycle",
        items: [
          { name: "DSA & Software Design", highlight: true, level: "Strong" },
          { name: "Design Patterns", highlight: true, level: "Advanced" },
          { name: "Unit & Integration Testing", highlight: false, level: "Advanced" },
          { name: "Debugging & Observability", highlight: true, level: "Advanced" },
          { name: "Code Review Standards", highlight: false, level: "High" },
          { name: "Agile / Scrum", highlight: false, level: "Experienced" }
        ]
      },
      {
        category: "Data & Cloud",
        description: "Relational data stores, cloud platforms, and infrastructure",
        items: [
          { name: "PostgreSQL", highlight: true, level: "Advanced" },
          { name: "DB2", highlight: false, level: "Enterprise" },
          { name: "SQL Server", highlight: false, level: "Enterprise" },
        ]
      },
      {
        category: "AI & Emerging",
        description: "Agentic development and modern LLM application patterns",
        items: [
          { name: "Claude Developer Ecosystem", highlight: true, level: "Certified" },
          { name: "LLM-Powered Apps", highlight: true, level: "Advanced" },
          { name: "Prompt Engineering", highlight: true, level: "Certified" },
          { name: "AI-Assisted Engineering", highlight: true, level: "Advanced" },
          { name: "Rapid Prototyping", highlight: false, level: "High-Velocity" }
        ]
      }
    ] as SkillCategory[],
    marqueeRow1: [
      "TypeScript", "React", "Node.js", "Claude AI", "PostgreSQL", "Next-Gen REST", "Tailwind CSS"
    ],
    marqueeRow2: [
      "Python", "EDI Integration", "GraphQL", "Flask", "State Management", "SQL Tuning"
    ]
  },

  projects: {
    sectionNumber: "04",
    sectionTitle: "SELECTED WORKS",
    heading: "Crafted Systems & Applications",
    subheading: "Architecting real-time telemetry, cryptographic validation, and database performance optimizations.",
    items: [
      {
        id: "tapay-fare-processing",
        title: "Tapay",
        tagline: "Real-Time Distributed Fare Processing Engine",
        period: "Hardware-to-Cloud Prototype",
        category: "Distributed Systems & IoT",
        stack: ["Python", "Arduino", "Twilio", "PySerial", "Cryptography", "REST"],
        impactStatement: "Real-time distributed fare-processing backend handling 50+ transactions/min in prototype testing, cutting average passenger wait time by 30%.",
        description: "Engineered an end-to-end hardware-integrated fare collection platform. Features a low-latency serial data pipeline between physical Arduino sensors and cloud Python services, real-time SMS notifications via Twilio, and a secure payment gateway leveraging strict data-encryption protocols with a 100% success rate in simulated privacy and fraud-prevention tests.",
        metrics: [
          { label: "Throughput", value: "50+ txns/min" },
          { label: "Wait Time", value: "-30% reduction" },
          { label: "Fraud Prevention", value: "100% test success" }
        ],
        accentColor: "#C6FF3D",
        architectureHighlights: [
          "Sub-150ms PySerial polling cycle translating physical contactless triggers to encrypted cloud payload",
          "Automated Twilio webhook dispatcher for instantaneous transaction dispatch receipts",
          "AES-256 payload encryption guarding sensitive passenger transit identifiers against MITM vectors"
        ],
        githubUrl: "https://github.com/tharunshankar",
        demoUrl: "#"
      },
      {
        id: "smart-ticketing-system",
        title: "Smart Ticketing System",
        tagline: "High-Throughput Transit Backend & Database Optimization",
        period: "Enterprise Cloud Backend",
        category: "Cloud Backend & Database Architecture",
        stack: ["Python", "Flask", "PostgreSQL", "REST APIs", "Docker", "Swagger/OpenAPI"],
        impactStatement: "Flask backend processing 1,000+ simulated transactions daily with 10+ documented REST APIs, improving query response times by 20%.",
        description: "Engineered a robust enterprise ticketing backend handling high-concurrency booking, real-time seat reservation locks, and payment reconciliation. Designed 10+ fully documented REST endpoints (OpenAPI standard) and refactored PostgreSQL schemas, indexes, and query execution plans to yield a 20% latency reduction across peak traffic loads.",
        metrics: [
          { label: "Daily Volume", value: "1,000+ txns/day" },
          { label: "API Endpoints", value: "10+ Documented" },
          { label: "Query Speedup", value: "20% faster execution" }
        ],
        accentColor: "#7C5CFF",
        architectureHighlights: [
          "Optimized composite B-tree indexing on transit routes and booking timestamps",
          "Atomic transaction isolation levels preventing race conditions during concurrent seat allocation",
          "Comprehensive Swagger/OpenAPI documentation enabling frictionless client-side integration"
        ],
        githubUrl: "https://github.com/tharunshankar",
        demoUrl: "#"
      }
    ] as ProjectItem[]
  },

  educationAndCerts: {
    sectionNumber: "05",
    sectionTitle: "CREDENTIALS",
    heading: "Academic Foundation & Certifications",
    subheading: "Continuous learning grounded in rigorous computer science principles and cutting-edge AI certifications.",
    education: {
      degree: "Bachelor of Engineering (B.E.)",
      field: "Computer Science and Engineering",
      institution: "Chennai Institute of Technology",
      period: "2020 – 2024",
      location: "Chennai, Tamil Nadu, India",
      details: [
        "Rigorous coursework in Data Structures, Algorithms, Distributed Computing, Database Management Systems, and Object-Oriented Analysis & Design.",
        "Active contributor to technical symposia, hackathons, and software engineering team projects."
      ]
    } as EducationItem,
    certifications: [
      {
        id: "cert-claude",
        title: "Claude Certified Developer",
        issuer: "Anthropic Ecosystem",
        badge: "AI DEVELOPER",
        code: "CLAUDE-CERT-DEV",
        skills: ["Agentic AI", "Prompt Engineering", "LLM System Architecture", "Claude API"],
        featured: true
      },
      {
        id: "cert-genai",
        title: "Generative AI Professional",
        issuer: "Industry Credential",
        badge: "GEN AI",
        code: "GENAI-PROF",
        skills: ["Diffusion Models", "Transformers", "RAG Pipelines", "Embeddings"],
        featured: false
      },
      {
        id: "cert-prompt",
        title: "Prompt Engineering Specialist",
        issuer: "Advanced AI Track",
        badge: "PROMPT SPEC",
        code: "PROMPT-ENG",
        skills: ["Few-Shot Techniques", "Structured Outputs", "Chain-of-Thought", "Tool Calling"],
        featured: false
      },
      {
        id: "cert-sql",
        title: "SQL Masterclass",
        issuer: "Advanced Database Architecture",
        badge: "SQL MASTER",
        code: "SQL-DB-ADV",
        skills: ["Query Optimization", "Window Functions", "Indexing Strategies", "Schema Normalization"],
        featured: false
      },
      {
        id: "cert-python",
        title: "Python for Distributed Systems",
        issuer: "Advanced Engineering",
        badge: "PYTHON CERT",
        code: "PY-SYSTEMS",
        skills: ["AsyncIO", "Concurrency", "REST Services", "Data Serialization"],
        featured: false
      }
    ] as CertificationItem[]
  },

  contact: {
    sectionNumber: "06",
    sectionTitle: "GET IN TOUCH",
    headline: "LET'S BUILD SOMETHING",
    subheadline: "Seeking opportunities to architect resilient enterprise distributed backends and cinematic AI-native user experiences.",
    availabilityNote: "Currently open to full-time roles, strategic engineering contracts, and remote/relocation opportunities globally.",
    email: "tharund2108@gmail.com",
    phone: "+91 6382209718",
    location: "Open to Relocation (Worldwide & India)",
    socials: [
      {
        name: "Website",
        handle: "tharunprof.dev",
        url: "https://tharunprof.dev"
      },
      {
        name: "LinkedIn",
        handle: "in/tharun",
        url: "https://linkedin.com/in/tharun"
      },
      {
        name: "GitHub",
        handle: "thar2130",
        url: "https://github.com/thar2130"
      },
      {
        name: "Email Direct",
        handle: "tharund2108@gmail.com",
        url: "mailto:tharund2108@gmail.com"
      },
      {
        name: "Phone / WhatsApp",
        handle: "+91 6382209718",
        url: "tel:+916382209718"
      }
    ],
    footerMarquee: "THARUNSHANKAR S — FULL-STACK ENGINEER — OPEN FOR OPPORTUNITIES — DISTRIBUTED SYSTEMS & AI-NATIVE APPS — AVAILABLE GLOBALLY —"
  }
};
