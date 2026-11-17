# ZenithPhysics: AI-Powered Competitive Exam Problem-Solving Platform

> **"Don't just tell students whether they are right or wrong. Help them understand why, discover what they are missing, and show them how to improve."**

An enterprise-grade, full-stack EdTech SaaS platform engineered for competitive examination aspirants (JEE Main & JEE Advanced), merging a LeetCode-style problem-solving environment with a diagnostic AI mentor powered by Google Gemini, deterministic evaluation, and intelligent prerequisite knowledge gap detection.

---

## 🌟 Key Features

1. **LeetCode-Style Question Workspace:**
   - 3-Panel responsive layout: Problem Statement with KaTeX math rendering, Answer Input & Scratchpad, and Real-time AI Mentor drawer.
   - Support for Single-Correct MCQ, Multiple-Correct MCQ (with JEE partial marking rules), and Numerical Value Inputs with decimal tolerances ($\pm 0.05$).
2. **AI-Powered Personal Mentor (Google Gemini):**
   - **Dual Modes:** *Strict Mentor* (disciplined, socratic, non-revealing) and *Collaborative Mentor* (step-by-step guidance and encouragement).
   - **4-Tier Progressive Hints:** Level 1 (Conceptual direction), Level 2 (Governing physical law), Level 3 (Application strategy), Level 4 (Guided step).
   - **9-Class Mistake Diagnosis:** Automatically detects whether an error stems from Conceptual Misunderstanding, Wrong Formula Selection, Calculation Error, Sign Convention, Unit Conversion, Question Interpretation, Prerequisite Gap, Incomplete Solution, or Time Management.
3. **Prerequisite Concept Graph & Adaptive Recommendations:**
   - Directed knowledge graph mapping concept dependencies (e.g. *Free Body Diagrams $\to$ Friction $\to$ Inclined Planes*).
   - Diagnoses foundational root causes rather than labeling a student weak in an entire chapter.
   - Dynamically recommends calibrated problems to reinforce missing prerequisites.
4. **Student Performance Analytics & Problem-Solving Index (PSI):**
   - Granular tracking of accuracy, time-per-question, chapter-wise mastery, and consistency streaks.
   - Transparent, multi-factor Problem-Solving Index (PSI) score summarizing demonstrated capability.
5. **Competitive Contests & Real-Time Leaderboards:**
   - Server-enforced timed tests with countdown timers, mark-for-review palette, and transparent tie-breaking rankings.
6. **Coaching Institute Management Portal:**
   - Multi-tenant tenant isolation for coaching academies, batch creation, teacher roster management, and weak-student alerts.
7. **Platform Administration & SME Verification:**
   - Content management system for questions, verified LaTeX solutions, hint curation, and audit logging.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React, Recharts, KaTeX |
| **Backend** | Node.js, Express.js, TypeScript, RESTful APIs, Zod Validation, CORS, Helmet |
| **Database & ORM** | PostgreSQL 15+, Prisma ORM |
| **AI Integration** | Google Gemini API (Structured prompt templates with fallback abstraction) |
| **Authentication** | JWT (JSON Web Tokens) with bcrypt password hashing & Role-Based Access Control (RBAC) |
| **DevOps & Tooling** | Git, npm/pnpm, Postman/REST client, ESLint, Prettier |

---

## 📁 Repository Structure

```
c:\capstone/
├── backend/                  # Express + TypeScript REST API Server
│   ├── prisma/               # Prisma Schema & PostgreSQL Migrations
│   │   ├── schema.prisma     # Complete 30+ model relational schema
│   │   └── seed.ts           # Comprehensive seed script with 30+ Physics questions
│   ├── src/
│   │   ├── config/           # Environment and database configuration
│   │   ├── controllers/      # Route controllers (Auth, Questions, AI, Analytics, etc.)
│   │   ├── middlewares/      # Auth, RBAC, error handling, rate limiting
│   │   ├── routes/           # REST API route definitions
│   │   ├── services/         # Business logic (Evaluation, AI Mentor, Mastery, Recommender)
│   │   ├── types/            # TypeScript interfaces and enum declarations
│   │   ├── utils/            # KaTeX helpers, math precision utils, logger
│   │   └── server.ts         # Express app entrypoint
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/                 # Next.js 14 App Router Client
│   ├── src/
│   │   ├── app/              # Next.js App Router pages (Dashboard, Solve, Analytics, Contests)
│   │   ├── components/       # UI components (3-Panel Workspace, KaTeX, Navbar, Charts)
│   │   ├── lib/              # API client, Auth context, utilities
│   │   └── styles/           # Tailwind globals and KaTeX stylesheets
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .env.example
├── API_DOCUMENTATION.md      # Full REST API endpoint contracts
├── DATABASE_SCHEMA.md        # Relational database entities and indexing dictionary
├── PROJECT_ROADMAP.md        # 8-Milestone development roadmap
└── README.md                 # Project architecture overview (this file)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (Node.js v24.11+ installed)
- npm or pnpm
- PostgreSQL database instance (or Supabase / Neon / Docker PostgreSQL)
- Google Gemini API Key (from Google AI Studio)

### 1. Environment Setup

#### Backend (`backend/.env`)
```bash
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/capstone_db?schema=public"
JWT_SECRET="super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
GEMINI_API_KEY="your-google-gemini-api-key"
CORS_ORIGIN="http://localhost:3000"
```

#### Frontend (`frontend/.env.local`)
```bash
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

### 2. Backend Installation & Database Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push # or npx prisma migrate dev
npm run seed       # Seeds JEE Physics syllabus, topics & 30+ questions
npm run dev        # Starts Express server on http://localhost:5000
```

### 3. Frontend Installation & Startup
```bash
cd ../frontend
npm install
npm run dev        # Starts Next.js client on http://localhost:3000
```

---

## 📖 Key Documentation Links

- [Database Schema Specification](file:///c:/capstone/DATABASE_SCHEMA.md) - Detailed table structures, foreign keys, and indexes.
- [REST API Documentation](file:///c:/capstone/API_DOCUMENTATION.md) - All endpoints, schemas, request/response examples.
- [Project Roadmap](file:///c:/capstone/PROJECT_ROADMAP.md) - Milestone 1 to Milestone 8 milestones and acceptance criteria.

---

## 🛡️ License & Academic Integrity
Developed as a production-grade Capstone SaaS project. Designed with strict academic integrity safeguards: deterministic evaluation, server-enforced time limits, and diagnostic hints that promote active reasoning over answer revelation.
