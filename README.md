# SondelaBiz 🔗

> **B2B Network + Public Business Directory for Mdantsane Township, East London, SA**
> 
> Hackathon MVP — 24 hours · Team of 5

---

## 🗂 What's in this repo

| Path | What it is | Who owns it |
|------|-----------|-------------|
| `public/index.html` | Platform homepage (hero, categories, featured businesses) | Xolani + Siyamthanda |
| `public/directory.html` | Public business directory with filters + profile modal | Siyamthanda |
| `public/board.html` | I Need / I Offer B2B board | Amahle |
| `public/network.html` | B2B dashboard (login required) | Amahle |
| `public/join.html` | 2-step registration + login | Lindokuhle |
| `public/pitch.html` | Hackathon pitch / judge-facing brief | Lekgothe |
| `public/css/main.css` | Design system (glassmorphism, all 7 Mdantsane colours) | Xolani |
| `public/js/app.js` | Shared utilities, animations, mock data | Lindokuhle |
| `public/js/api.js` | API client (switches between mock/live) | Lindokuhle |
| `server/index.js` | Express app entry point | Lindokuhle |
| `server/routes/auth.js` | POST /api/auth/register + login | Lindokuhle |
| `server/routes/businesses.js` | Public directory + profile API | Siyamthanda |
| `server/routes/board.js` | Board posts + transactions API | Amahle |
| `server/db/schema.sql` | MySQL schema (7 tables) | Lindokuhle |
| `server/db/seed.js` | 6 demo Mdantsane businesses | Lindokuhle |
| `server/middleware/auth.js` | JWT requireAuth middleware | Lindokuhle |

---

## 🛠 Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML · CSS · Vanilla JavaScript |
| Animations | [Motion One](https://motion.dev) (same physics as Framer Motion) via CDN |
| Backend | Node.js · Express.js |
| Auth | JWT (`jsonwebtoken`) + bcrypt passwords |
| Database | MySQL (`mysql2/promise` pool) |
| Fonts | Unbounded (headings) + Plus Jakarta Sans (body) via Google Fonts |

---

## 🚀 Getting started (local development)

### Prerequisites
- Node.js ≥ 18
- MySQL running locally

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Then edit .env with your MySQL credentials and a JWT secret
```

### 3. Create the database
```bash
mysql -u root -p < server/db/schema.sql
```

### 4. Seed with demo data
```bash
npm run seed
```
This creates 6 Mdantsane demo businesses. Demo password: `sondela123`

### 5. Start the development server
```bash
npm run dev
```
Open http://localhost:3000 — the frontend loads automatically.

---

## 🗄 Database schema

```
users           — login accounts (linked to businesses)
businesses      — core business profiles + auth (password_hash)
categories      — category lookup (salon, plumber, electrician…)
offers          — services each business provides
requests        — things each business needs to source
board_posts     — I NEED / I OFFER unified board feed
board_responses — responses to board posts
transactions    — trade records (pending → complete)
reviews         — ratings that auto-update tier via MySQL trigger
```

**Trusted Trader tiers** (auto-calculated by MySQL trigger on each review):

| Tier | Trades | Rating |
|------|--------|--------|
| 🆕 New | any | any |
| 🥉 Bronze | 5+ | ≥ 3.5★ |
| 🥈 Silver | 20+ | ≥ 4.0★ |
| 🥇 Gold | 50+ | ≥ 4.5★ |

---

## 🎯 24-Hour Hackathon Build Plan

### Phase 1 — Foundation (Hours 0–4)
- [ ] Lindokuhle: `npm install`, set up `.env`, run schema + seed
- [ ] Lindokuhle: confirm `npm run dev` works at localhost:3000
- [ ] All: clone repo, `npm install`, confirm the pages load in browser

### Phase 2 — Public pages (Hours 4–10)
- [ ] **Siyamthanda**: `directory.html` — wire search/filter to mock data; test category filter
- [ ] **Xolani**: `index.html` hero + category grid; polish CSS in `main.css`
- [ ] **Lindokuhle**: test API endpoints with Postman or Thunder Client

### Phase 3 — B2B Network (Hours 10–16)
- [ ] **Amahle**: `board.html` — make new post modal work end-to-end
- [ ] **Amahle**: `network.html` — make trade status update work
- [ ] **Lindokuhle**: `join.html` — wire register/login to real API (`api.js` DEMO_MODE = false)

### Phase 4 — Polish + Demo (Hours 16–22)
- [ ] **All**: go through every page, catch broken links
- [ ] **Xolani**: add CSS polish — hover states, mobile layout
- [ ] **Lekgothe**: polish `pitch.html` with real team data + screenshots

### Phase 5 — Deploy + Present (Hours 22–24)
- [ ] **Lekgothe**: deploy to Railway or Render (for the Express server)
- [ ] **Lekgothe**: update frontend API base URL if needed
- [ ] **All**: run the demo script (see below)

---

## 🎤 Demo Script for Judges

### External buyer flow (Part A — no login)
1. Go to **Directory** → search "plumber"
2. Click Mthembeni Plumbing → see rating (4.7★), Silver tier badge, 41 completed trades
3. Click **WhatsApp** button → opens `wa.me` link (zero friction)

### B2B network flow (Part B — logged in)
1. **Register** as a new salon owner → 2-step form → dashboard
2. Go to **Board** → click "New Post" → "I NEED: 50 bottles of shampoo, Budget R1,500"
3. Log out → log in as another business (any demo account + `sondela123`)
4. See the need post → click **Respond** → send message → "Trade initiated!"
5. Back in first account → **My Trades** → click **Confirm** → trade shows "complete"
6. Trust score updates: +1 completed trade

---

## 👥 Team

| Name | Role |
|------|------|
| **Lindokuhle Ntuli** | Team Lead · Backend · Database · Types |
| **Xolani** | UI Lead · Navbar · Design system |
| **Siyamthanda Ndabeni** | Public pages (directory, homepage) |
| **Amahle Axola** | B2B network (board, dashboard, trades) |
| **Lekgothe Ngoepe** | Pitch page · Deployment |

---

## 🔧 Git workflow for the team

```bash
# Each person works on their own branch
git checkout -b feature/your-name-task-name

# Commit often
git add .
git commit -m "feat: add category filter to directory page"

# Push and open a PR
git push origin feature/your-name-task-name
```

**NEVER commit directly to `main`.** Always open a PR and ask one teammate to review.

---

## ⚠️ Rules (non-negotiable)

1. **NEVER** touch or modify `.env` or `.env.local`
2. **NEVER** commit passwords, tokens, or secrets
3. **NEVER** hard-delete database records — use soft-delete (`deleted_at = NOW()`)
4. All timestamps stored as UTC in the database

---

## 📦 API Reference (quick)

```
POST /api/auth/register    — register new business
POST /api/auth/login       — login → returns JWT token

GET  /api/businesses       — public directory (filters: q, category, zone)
GET  /api/businesses/:id   — single business profile + reviews

GET  /api/board            — board posts (filter: type=need|offer)
POST /api/board            — create post [auth required]
POST /api/board/:id/respond — respond to post [auth]

GET  /api/board/transactions  — my trades [auth]
PATCH /api/board/transactions/:id — update trade status [auth]
```

> **DEMO_MODE** (in `public/js/app.js`): set to `true` (default) to use mock data without a server.
> Set to `false` once your MySQL server is running and seeded.
