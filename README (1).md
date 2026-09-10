# 🎓 EduTech — Modern Full-Stack Educational Management Platform

> **Closing the loop between Schools, Teachers, and Parents.**  
> EduTech is a modern full-stack SaaS platform designed to eliminate core communication disconnects by tracking academic performance and behavioral insights down to the micro-level—enabling timely, data-driven early interventions.

---

## 📸 Overview & Value Proposition

Traditional school management systems suffer from lagging indicators—parents often find out about academic struggles or behavioral patterns only during mid-term report cards or parent-teacher conferences when it's already too late.

**EduTech** changes the dynamic by offering:
- **Micro-Level Tracking:** Daily notes, weekly behavioral logs, and modular assessment scoring.
- **Early Warning Indicators (EWI):** Automated algorithms that trigger visual alerts when performance drops or negative behavior patterns accumulate.
- **Seamless Parent Engagement:** Real-time mobile-first feed, trend analytics, and 1-click intervention requests.
- **Macro-Health Insights:** High-level administrative analytics for school leadership to monitor overall institution health.

---

## ✨ Key Features & User Roles

### 🧑‍🏫 1. Teacher Dashboard
Designed for rapid data entry and actionable student tracking.
* **Dynamic Class Roster:** Instant search, subject/grade multi-filtering, and real-time student health status tags (*On Track*, *Needs Attention*, *Critical Alert*).
* **Micro-Data Entry:** Effortlessly log weekly behavior reports, quick daily check-in notes, and modular test scores.
* **Automated Early Warning Badge:** Automated system flags visual risk alerts as soon as a student's marks drop below customizable thresholds ($<60\%$) or behavioral flags accumulate ($>3$ occurrences per fortnight).

### 👨‍👩‍👧 2. Parent Portal
Optimized for mobile-first, friction-free monitoring and proactive involvement.
* **Real-Time Student Feed:** Timeline-style feed displaying weekly behavior logs, recent test results, and attendance records.
* **Trend Analytics & Visualizations:** Interactive mark progression charts comparing child performance against class/grade averages over time.
* **Direct Action Button:** 1-Click *"Request Teacher Check-In"* or *"Request Early Intervention"* button attached directly to flagged reports.

### 🏫 3. Administrative Overview
Executive control center for principal and administration level insights.
* **Macro School-Health Metrics:** Aggregate grade averages, active user counts (teachers, parents, students), and attendance rates.
* **Intervention Pipeline:** Real-time tracking of *Behavioral/Academic Flags Resolved vs. Open*.
* **Department Analytics:** Cross-subject performance comparison to allocate resources effectively.

---

## 🎨 Design & UI Philosophy

* **Color Palette:** Soft, calm tones designed to reduce stress—Deep Slate (`#1E293B`), Soft Blue (`#3B82F6`), Sage Green (`#10B981`), Amber Warning (`#F59E0B`), and Rose Alert (`#EF4444`).
* **Components:** Intuitive status cards, accessible progress bars, visual tags, and data tables with sortable controls.
* **Responsiveness:** Built with a mobile-first paradigm for busy parents on smartphones and desktop-optimized layouts for teachers managing classroom data.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router, React 18, TypeScript)
- **Styling:** Tailwind CSS + Shadcn UI
- **State & Data Fetching:** TanStack Query (React Query) + Zustand
- **Data Visualization:** Recharts / Chart.js
- **Icons:** Lucide React

### Backend & API
- **Runtime Environment:** Node.js / TypeScript
- **Framework:** Next.js Server Actions & API Routes (or NestJS/Express microservice)
- **Database:** PostgreSQL
- **ORM:** Prisma ORM / Drizzle ORM
- **Authentication:** NextAuth.js / Clerk (Role-Based Access Control: `ADMIN`, `TEACHER`, `PARENT`, `STUDENT`)
- **Real-Time Updates:** WebSockets / Supabase Realtime

---

## 📁 Project Directory Structure

```text
edutech/
├── prisma/
│   ├── schema.prisma           # Database schema definition
│   └── seed.ts                 # Interactive mock data generator
├── public/
│   └── assets/                 # Icons, logos, static images
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Login, register, auth routes
│   │   ├── admin/              # Administrative overview layout & routes
│   │   ├── parent/             # Parent portal layout & feed
│   │   ├── teacher/            # Teacher dashboard & class roster
│   │   └── api/                # REST / RPC API routes
│   ├── components/             # Reusable UI components
│   │   ├── cards/              # Metric cards, status badges
│   │   ├── charts/             # Recharts trend analytics
│   │   ├── forms/              # Data logging forms
│   │   ├── layout/             # Navigation, headers, sidebars
│   │   └── ui/                 # Shadcn UI primitives
│   ├── lib/                    # Configuration, DB client, utilities
│   │   ├── auth.ts             # Auth options & role permissions
│   │   ├── utils.ts            # Helper functions & threshold evaluators
│   │   └── mock-data.ts        # Preview fallback datasets
│   └── types/                  # TypeScript interfaces & types
├── .env.example
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally with full interactive mock data.

### Prerequisites
- **Node.js:** `v18.x` or higher
- **Package Manager:** `pnpm` (recommended), `npm`, or `yarn`
- **Database:** PostgreSQL (optional for initial mock preview)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/edutech.git
   cd edutech
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *Configure your `.env.local` file:*
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/edutech?schema=public"
   NEXTAUTH_SECRET="your-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_ENABLE_MOCK_DATA="true"
   ```

4. **Initialize Database & Seed Mock Data:**
   ```bash
   pnpm prisma db push
   pnpm prisma db seed
   ```

5. **Start Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Interactive Mock Data Preview

EduTech comes pre-configured with a rich set of interactive mock data for immediate previewing without configuring a live database backend.

Toggle mock mode anytime in `.env.local`:
```env
NEXT_PUBLIC_ENABLE_MOCK_DATA="true"
```

### Pre-configured Demo Accounts:
| Role | Email | Password | Target Dashboard |
| :--- | :--- | :--- | :--- |
| **Teacher** | `teacher@edutech.io` | `demo123` | Quick daily logs, student search & early warnings |
| **Parent** | `parent@edutech.io` | `demo123` | Child performance timeline & 1-click check-in |
| **Admin** | `admin@edutech.io` | `demo123` | Institutional health analytics & resolution pipeline |

---

## ⚡ Early Warning Engine Logic

The Early Warning Indicator calculates risk scores based on a weighted formula evaluated in real-time:

$$	ext{Risk Score} = (100 - 	ext{Average Mark}) 	imes 0.6 + (	ext{Behavior Flags} 	imes 15) + (	ext{Absences} 	imes 5)$$

- **`Score < 20` (On Track / Green):** Standard monitoring.
- **`20 <= Score < 40` (Needs Attention / Yellow):** Triggers subtle dashboard highlight; sends weekly digest to parent.
- **`Score >= 40` (Critical Alert / Red):** Immediate visual badge on Teacher Roster, automatic highlight in Parent Feed, and automated ticket in Admin Resolution Pipeline.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open a Pull Request or submit an Issue on GitHub.
