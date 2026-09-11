# Trippin' Bharat — Backend Services & Tourism Intelligence API

RESTful API backend for **Trippin' Bharat (Smart India Hackathon 2026)**, built with **Node.js, Express, and TypeScript**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default variables:
```env
PORT=5000
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

### 3. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints Reference

### Health & Operations
- `GET /api/health` — Provider uptime, database connectivity, and TSP engine status.

### Destinations & Attractions
- `GET /api/destinations` — List all catalogued destinations with summary stats.
- `GET /api/destinations/:slug` — Get comprehensive destination intelligence (overview, places, stays, food).
- `GET /api/destinations/:slug/places` — Get all verified monuments and attractions for a destination.

### Build My Trip & Itinerary
- `POST /api/itinerary/plan` — Generate personalized day-by-day itinerary with timings and budget:
  ```json
  {
    "destinationSlug": "udaipur",
    "durationDays": 3,
    "pace": "balanced",
    "budgetTier": "comfort"
  }
  ```

### Authentication
- `POST /api/auth/login` — Authenticate operations admin or traveler.
- `POST /api/auth/signup` — Register new traveler account.

---

## 📁 Directory Architecture
```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── config/            # Environment and database configuration
│   ├── data/              # In-memory catalog fallback (`catalog.ts`)
│   ├── database/          # MongoDB bootstrap and database seeding
│   ├── middleware/        # Auth, RBAC, and error handling
│   ├── models/            # Mongoose persistence models
│   ├── routes/            # Express router endpoints
│   ├── services/          # Domain services
│   │   └── planner/       # Itinerary engine and route optimization
│   ├── types/            # TypeScript interfaces
│   └── server.ts         # Server bootstrap
├── package.json
└── tsconfig.json
```
