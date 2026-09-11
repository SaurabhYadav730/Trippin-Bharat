# Trippin' Bharat (SIH 2026) — Persistent Project Memory & Guidelines (`memory.md`)

This file records all architectural decisions, design rules, and data integrity standards requested by the user. Every agent interacting with this repository MUST adhere strictly to these rules to preserve credits, prevent regressions, and maintain state-of-the-art quality.

---

## 1. Absolute Rule: Verified Authentic Landmark Imagery
- **NEVER guess, randomize, or use unverified Unsplash IDs** for Indian heritage monuments. In the past, generic IDs caused severe errors (e.g., orange juice cocktails for Sajjangarh Palace, modern sports cars for Vintage Car Museum, Kerala boat/fort steps for Jagdish Temple).
- **All Udaipur Monument Images MUST use local, physically verified photographs** stored in `/images/places/`:
  - `jagdish-temple.jpg`: 100% authentic 1651 AD Indo-Aryan Jagdish Temple, Udaipur with its carved stone Shikhara and marble entrance steps.
  - `bagore-ki-haveli.jpg`: 100% authentic Gangaur Ghat entrance arch of Bagore Ki Haveli Museum.
  - `sajjangarh.jpg`: 100% authentic Monsoon Palace perched on the Bansdara mountain summit.
  - `vintage-car-museum.jpg`: 100% authentic classic vintage car collection in Udaipur royal garage.
  - `city-palace.jpg`: 100% authentic 400-year-old Udaipur City Palace complex.
  - `lake-pichola.jpg`: 100% authentic Lake Pichola with island palaces and boat waters.
  - `shilpgram.jpg`: 100% authentic Mandana folk art wall and crafts village in Udaipur.
  - `saheliyon-ki-bari.jpg`: 100% authentic royal marble fountain and lotus pool.
- Any new destination added must follow the same rule: download verified authentic imagery to `/images/places/` and visually inspect before using.

---

## 2. Design Aesthetic: Authentic Heritage Portal (NO "AI" Look)
- **NO Robotic AI Jargon**:
  - Never use "Dedicated Dashboard", "AI Engine", "Synthesized Matrix", or similar phrasing.
  - Use authentic, editorial travel language: "Explore Place & Stories", "View Heritage Guide", "Curated For Your Travel Style", "Verified Heritage Directory".
- **Light & Warm Visual Hierarchy (NO Electric Blue / Dark Tech Theme)**:
  - Clean, light backgrounds (`bg-white`, `bg-slate-50`, `bg-slate-100`).
  - Warm, authoritative color accents: Brand crimson red (`#E5293E` / hover `#D01D32`), charcoal slate (`#0A2540`), warm amber (`#D97706`), and emerald green (`#059669`).
  - Cards must have clean, structured metadata grids for Timings and Entry Fees rather than cramped text, and subtle arrow cues rather than heavy buttons.

---

## 3. Backend Integration Architecture
- All API interactions are cleanly isolated in `src/services/api.ts`.
- All data models are strictly typed in `src/types/destination.ts`.
- The user will develop a backend; the frontend must be plug-and-play ready for REST/GraphQL endpoints simply by setting `VITE_API_URL`.

---

## 4. Quality & Build Verification
- Always execute `npm run build` after editing to ensure TypeScript passes with zero errors under `verbatimModuleSyntax`.
- Ensure fallback handlers (`onError`) point to local verified assets (`/images/places/city-palace.jpg`) so broken external images never appear.
