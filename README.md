# 🇮🇳 Yātra — India's Intelligent Travel & Tourism Ecosystem
### Smart India Hackathon (SIH 2026)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Overview

**Yātra** is a production-grade digital operating system built for modern Indian tourism. It integrates a cinematic, authentic **Traveler Discovery & Itinerary Engine** with an enterprise-grade **Tourism Operations Admin Studio** and a robust **Express + TypeScript REST Backend**.

Unlike generic itinerary apps or booking scrapers, Yātra is grounded in:
1. **ASI-Verified Heritage Integrity**: 100% verified historical facts, monument schedules, and local landmark imagery.
2. **Pace & Budget Optimization**: Multi-constraint Traveling Salesperson Problem (TSP) heuristic routing that factors in opening hours, crowd-free timing slots, and regional meal pairings.
3. **Decoupled Architecture**: Clear physical separation between client-side interfaces (`frontend/`) and server-side intelligence (`backend/`).

---

## 🏛️ System Architecture

```
                               ┌─────────────────────────────┐
                               │       Yātra Ecosystem       │
                               └──────────────┬──────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
     ┌─────────────────────────────┐                     ┌─────────────────────────────┐
     │      frontend/ (Client)     │                     │      backend/ (Server)      │
     │  React 19 • Vite • Tailwind │                     │  Node.js • Express • TS     │
     └──────────────┬──────────────┘                     └──────────────┬──────────────┘
                    │                                                   │
         ┌──────────┴──────────┐                             ┌──────────┴──────────┐
         ▼                     ▼                             ▼                     ▼
┌─────────────────┐   ┌─────────────────┐           ┌─────────────────┐   ┌─────────────────┐
│   src/main/     │   │   src/admin/    │           │  /api/itinerary │   │ /api/destinations
│ Traveler Portal │   │  Operations OS  │           │   (Optimizer)   │   │  & Attractions  │
└─────────────────┘   └─────────────────┘           └─────────────────┘   └─────────────────┘
```

---

## 📂 Directory Structure

The repository maintains strict separation of concerns:

```
SIH 2026/
├── frontend/                     # Client application
│   ├── src/
│   │   ├── admin/                # Tourism Operations Admin Studio (76+ tools)
│   │   │   ├── components/       # Shell, modules, common UI components
│   │   │   ├── pages/            # Admin dashboards, GIS, quality, audit logs
│   │   │   ├── services/         # Admin data storage, RBAC, verification
│   │   │   └── types/            # Admin domain TypeScript types
│   │   ├── main/                 # Public Traveler Experience Platform
│   │   │   ├── components/       # Hero, Navigation, Itinerary Teaser, Footer
│   │   │   ├── context/          # Auth & user session context
│   │   │   ├── data/             # Regional heritage destination datasets
│   │   │   ├── hooks/            # Custom reusable hooks
│   │   │   ├── pages/            # Landing, Destination, BuildTrip, Auth
│   │   │   ├── services/         # Client API service layer (plugs to backend)
│   │   │   └── types/            # Destination & traveler interfaces
│   │   ├── App.tsx               # Primary application router
│   │   ├── index.css             # Global tokens, typography & animations
│   │   └── main.tsx              # Application bootstrap
│   ├── public/                   # Static assets & authentic verified photographs
│   ├── .env.example              # Frontend environment config
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                      # Server REST API
│   ├── src/
│   │   ├── controllers/          # Endpoint controllers (destinations, itinerary, health)
│   │   ├── config/               # Environment and database configuration
│   │   ├── data/                 # In-memory catalog fallback for itinerary APIs
│   │   ├── database/             # MongoDB bootstrap and database seeding
│   │   ├── middleware/           # Authentication, RBAC, and error middleware
│   │   ├── models/               # Mongoose persistence models
│   │   ├── routes/               # Express router endpoints
│   │   ├── services/             # Domain services
│   │   │   └── planner/          # Itinerary planning and route optimization
│   │   ├── types/                # Server domain types
│   │   └── server.ts             # Express server setup & middleware
│   ├── .env.example              # Backend environment config
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── .editorconfig                 # Code formatting standards
├── .gitignore                    # Universal Git ignore rules
├── LICENSE                       # MIT License
├── package.json                  # Root monorepo scripts
└── README.md                     # Project documentation
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/yatra-sih-2026.git
cd yatra-sih-2026
```

### 2. Install All Dependencies
From the root directory:
```bash
npm run install:all
```

### 3. Run Development Servers
You can start the frontend and backend independently or concurrently:

```bash
# Terminal 1 — Frontend (Runs on http://localhost:5174)
npm run dev:frontend

# Terminal 2 — Backend (Runs on http://localhost:5000)
npm run dev:backend
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Application Modules & URLs

| Portal | Local URL | Description |
| :--- | :--- | :--- |
| **Traveler Landing Page** | `http://localhost:5174/` | Cinematic Indian heritage discovery, search, and destination showcase |
| **Destination Guide** | `http://localhost:5174/destination?slug=udaipur` | Authentic stories, verified ASI monuments, stays, and food recommendations |
| **Build My Trip Planner** | `http://localhost:5174/build-trip` | Interactive day-by-day itinerary generator with live time-slot scheduling |
| **Admin Studio** | `http://localhost:5174/admin` | Enterprise operations platform (GIS studio, quality engine, verification queue) |
| **Backend API Health** | `http://localhost:5000/api/health` | Live system uptime and provider telemetry heartbeat |

---

## 📡 Backend API Endpoints

- `GET /api/health` — Provider heartbeat, database status, and TSP engine metrics.
- `GET /api/destinations` — List all catalogued destinations with summary metrics.
- `GET /api/destinations/:slug` — Full destination dossier (overview, monuments, stays, dining).
- `GET /api/destinations/:slug/places` — Verified attraction catalog for destination.
- `POST /api/itinerary/plan` — Build My Trip optimization engine with pace, budget, and time-window scheduling.
- `POST /api/auth/login` — Authentication endpoint for operators and travelers.
- `POST /api/auth/signup` — Traveler registration.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, tsx, CORS, Dotenv
- **Algorithms**: Multi-constraint Time-Window Scheduling, TSP Nearest-Neighbor Heuristics
- **Data Integrity**: Archaeological Survey of India (ASI) verified monument guidelines

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
