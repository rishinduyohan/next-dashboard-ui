# 🏫 SchoolDev - Full-Stack School Management Dashboard

A modern, highly interactive, and responsive **School Management Dashboard** built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. 

SchoolDev provides a centralized platform for administrators, teachers, students, and parents to manage schedules, track academic progress, view financial statistics, and communicate.

---

## ✨ Features & Role-Based Dashboards

SchoolDev simulates a multi-user environment with dedicated dashboards tailored for four distinct roles. Each role has specific permissions and interactive views:

### 1. 🔑 Role Dashboards
*   **🛠️ Admin Dashboard**: The central hub. Displays high-level analytics (attendance charts, student gender demographics, finance statistics), quick stats (User Cards), calendar events, and announcements. Provides controls to view and modify all records.
*   **🧑‍🏫 Teacher Dashboard**: Access to personal schedules, list of assigned classes, lessons, exams, upcoming assignments, and school-wide announcements.
*   **🎓 Student Dashboard**: Personal portal showing daily lessons, calendar, upcoming assignments, exam dates, subject results, attendance percentage, and bulletins.
*   **👪 Parent Dashboard**: Enables tracking of multiple children. Parents can toggle between their children's schedules, homework lists, grades/results, attendance, and announcements.

### 2. 📋 Comprehensive Directory Tables
Interactive, paginated lists with search, filtering, and sorting support:
*   **Teachers, Students, Parents** directories.
*   **Subjects, Classes, Lessons** schedules.
*   **Exams, Assignments, Results** academic tracking.
*   **Attendance** overview records.
*   **Events, Messages, Announcements** communications.

### 3. 📊 Visual Analytics & Rich Charts
*   **Attendance Chart**: Bar charts illustrating daily/weekly attendance comparing present vs. absent.
*   **Count Chart**: Circular radial charts displaying student gender demographics.
*   **Finance Chart**: Area/line charts detailing monthly income versus expenses.
*   **Performance Chart**: Radar/gauge charts mapping student performance levels.

### 4. 📝 Dynamic Forms & CRUD Operations
Supports editing and adding records dynamically through interactive forms (using `react-hook-form`):
*   Add/Edit Teachers, Students, Classes, Subjects, and Exams.
*   Managed via a modular `FormModal` utility, ensuring consistent and elegant UI patterns.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Charts**: [Recharts](https://recharts.org/)
*   **Calendar**: [React Big Calendar](https://github.com/jquense/react-big-calendar) (with `moment` date engine)
*   **Forms**: [React Hook Form](https://react-hook-form.com/)

---

## 🔑 Demo Access & Login Credentials

Authentication is simulated locally via a persistent React Context (`AuthContext`) and saved in browser storage. Select your role on the sign-in screen to auto-fill these demo credentials:

| Role | Email | Password | Dashboard Route |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@schooldev.com` | `admin123` | `/admin` |
| **Teacher** | `teacher@schooldev.com` | `teacher123` | `/teacher` |
| **Student** | `student@schooldev.com` | `student123` | `/student` |
| **Parent** | `parent@schooldev.com` | `parent123` | `/parent` |

---

## 📁 Directory Structure

```text
d:/Next.js/full-stack school dashboard/
├── public/                     # Icons, logos, and static assets
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication routes (login, signup)
│   │   ├── (dashboard)/        # Role-based dashboards (admin, teacher, student, parent)
│   │   │   ├── list/           # Directory table pages (teachers, students, exams, etc.)
│   │   │   └── ...
│   │   ├── components/         # Dashboard-specific layout & chart components
│   │   │   ├── forms/          # Form modal schemas (StudentForm, TeacherForm, etc.)
│   │   │   ├── AttendanceChart.tsx
│   │   │   ├── BigCalendar.tsx
│   │   │   ├── FinanceChart.tsx
│   │   │   └── ...
│   │   ├── globals.css         # Tailwind global styles
│   │   ├── layout.tsx          # Global layout wrapper
│   │   └── page.tsx            # Root router (redirects based on auth status)
│   ├── components/             # Reusable core components
│   ├── context/                # Context API (AuthContext)
│   └── lib/
│       └── data.ts             # Rich mock database containing students, classes, and schedules
├── tailwind.config.ts          # Tailwind CSS custom themes
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project scripts and dependencies
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone or navigate to the repository directory.
2. Install the package dependencies:
   ```bash
   npm install
   ```

### Run the Development Server

Start the local server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to explore the dashboard.

### Build for Production

To build the production-ready bundle:
```bash
npm run build
npm start
```