# SondelaBiz 🟢

> **The B2B network and public discovery platform for Mdantsane township businesses.**  
> Built at the 24-Hour Hackathon · September 2026

**Live platform:** [sondelabiz.vercel.app](https://sondelabiz.vercel.app) *(after deploy)*  
**Pitch page:** [sondelabiz.vercel.app/pitch](https://sondelabiz.vercel.app/pitch)  
**GitHub:** [github.com/Nanda-Regine/SondelaBiz](https://github.com/Nanda-Regine/SondelaBiz)

---

## The Team

| Name | Role | Files to own |
|---|---|---|
| **Lindokuhle Ntuli** | Founder & Architect | `lib/types.ts`, `data/mock-businesses.ts`, overall structure |
| **Xolani Ncube** | UI Lead | `app/globals.css`, `components/layout/`, `components/ui/` |
| **Siyamthanda Ndabeni** | Public Pages | `components/public/`, `app/directory/`, `app/business/[id]/` |
| **Amahle Axola** | B2B Network | `app/network/`, board & deals pages |
| **Lekgothe Ngoepe** | Pitch & Deploy | `app/pitch/`, Vercel deploy, this README |

---

## The Stack

| Tech | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework — routing, SSR, layouts |
| **TypeScript** | Type safety — catch bugs before they happen |
| **Tailwind CSS** | Styling — all utility classes, brand tokens in `tailwind.config.ts` |
| **Mock data** (`data/mock-businesses.ts`) | Prototype data — replace with Supabase later |

---

## Getting Started (do this first, all 5 of you)

```bash
# 1. Clone the repo
git clone https://github.com/Nanda-Regine/SondelaBiz.git
cd SondelaBiz

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the SondelaBiz homepage.  
Open [http://localhost:3000/pitch](http://localhost:3000/pitch) — the interactive pitch page.

---

## Project Structure

```
SondelaBiz/
│
├── app/                        ← Next.js App Router pages
│   ├── layout.tsx              ← Root layout (fonts, metadata)
│   ├── page.tsx                ← Platform homepage (MVP 2)
│   ├── globals.css             ← Design system CSS variables
│   ├── pitch/page.tsx          ← Project brief visual (MVP 1) 🎯
│   ├── directory/page.tsx      ← Public business directory
│   ├── business/[id]/page.tsx  ← Business detail page
│   ├── network/page.tsx        ← B2B dashboard
│   ├── network/board/page.tsx  ← Needs & Offers board
│   ├── network/deals/page.tsx  ← Deal tracker
│   └── join/page.tsx           ← Registration
│
├── components/
│   ├── layout/                 ← Navbar, Footer
│   ├── ui/                     ← Reusable: Badge, TrustedTraderBadge
│   └── public/                 ← Hero, CategoryGrid, BusinessCard
│
├── lib/
│   ├── types.ts               ← All TypeScript interfaces & enums
│   └── utils.ts               ← Helper functions (search, WhatsApp links, etc.)
│
└── data/
    └── mock-businesses.ts     ← Prototype data (11 businesses, 5 board posts, 2 deals)
```

---

## The Two MVPs

### MVP 1 — Interactive Project Brief (`/pitch`)
A full-screen visual presentation of the SondelaBiz concept: problem, solution, business model, competitors, SDG impact, and the team. Share this link with judges and mentors.

### MVP 2 — Platform Prototype (`/`)
The actual SondelaBiz platform:
- **Public directory** — browse businesses, search, filter by category
- **Business detail pages** — full profile + WhatsApp contact button
- **B2B network dashboard** — simulated logged-in experience
- **Needs & Offers board** — post and browse B2B requests
- **Deal tracker** — track negotiations
- **Join / Register** — 2-step form

---

## Design System

All brand colours and design tokens are in `app/globals.css` and `tailwind.config.ts`.

| Token | Value | Use for |
|---|---|---|
| `brand-800` (`#1A5C38`) | Deep SA Green | Primary buttons, links, headings |
| `amber` (`#E8A020`) | Ubuntu Amber | Accents, CTAs, star ratings |
| `tier-gold` (`#F59E0B`) | Gold | Gold Trusted Trader badges |
| `tier-silver` (`#9CA3AF`) | Silver | Silver Trusted Trader badges |
| `tier-bronze` (`#CD7F32`) | Bronze | Bronze Trusted Trader badges |

**Fonts:**
- `font-syne` — bold display, brand headings (Syne 800)
- `font-sans` — body text (DM Sans 400/500/600)

---

## 24-Hour Build Plan

### Phase 0 — Kickoff (Hour 0–1) · All 5 together
- [ ] Clone repo, `npm install`, verify `localhost:3000` works
- [ ] Each person reads their section below
- [ ] Agree on the demo user flow for presentation

### Phase 1 — Foundation (Hour 1–4) · Split work
| Person | Task |
|---|---|
| Lindokuhle | Review & extend `data/mock-businesses.ts` — add real businesses you know |
| Xolani | Polish `globals.css` and `Navbar.tsx` — get the brand feeling right |
| Siyamthanda | Review `components/public/Hero.tsx` — tweak copy, test search |
| Amahle | Walk through `app/network/page.tsx` and the board page |
| Lekgothe | Read the pitch page (`/pitch`), update team section if needed |

### Phase 2 — Core Build (Hour 4–10) · Parallel tracks
- **Siyamthanda:** Make the directory page beautiful. Add more businesses. Make search snappy.
- **Amahle:** Get the board working. Make "Respond" actually open a reply form.
- **Xolani:** Help anyone who's stuck. Polish mobile views.
- **Lindokuhle:** Add 10 more real Mdantsane businesses to `mock-businesses.ts`.
- **Lekgothe:** Polish the `/pitch` page. Update stats. Prepare the demo script.

### Phase 3 — Features (Hour 10–16)
- WhatsApp links working on all contact buttons ✓ (already done)
- Trusted Trader badges showing correctly ✓ (already done)
- Make the Join form (Step 1 + Step 2) feel smooth
- Add a basic "Leave a Review" form to business detail pages

### Phase 4 — Polish (Hour 16–20)
- Test on your phone's browser (not just desktop)
- Fix any text that overflows on small screens
- Check every link navigates correctly

### Phase 5 — Deploy (Hour 20–22) · Lekgothe leads
- See deployment section below

### Phase 6 — Demo Prep (Hour 22–24) · Lindokuhle leads
- Practice the external user flow (find a plumber as a Sandton buyer)
- Practice the internal flow (post a need, get a response)
- Prepare a 3-min pitch using the `/pitch` page as your visual

---

## Deployment (Vercel)

Lekgothe owns this step. Run these once:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login (use the project's credentials)
vercel login

# Deploy (first time)
vercel --prod
```

Or connect the GitHub repo to Vercel at [vercel.com/new](https://vercel.com/new) and it auto-deploys on every push to `main`.

---

## Git Workflow — Team of 5 Guide

**Never work directly on `main`.** Create a branch for your work:

```bash
# Create your branch (use your first name)
git checkout -b xolani/navbar-improvements

# Stage and commit your work
git add .
git commit -m "feat: polish Navbar with mobile menu"

# Push to GitHub
git push origin xolani/navbar-improvements
```

Then create a Pull Request on GitHub and ask one teammate to review before merging.

**Branch naming:**
- `lindokuhle/more-businesses`
- `xolani/ui-polish`
- `siyamthanda/directory-search`
- `amahle/board-respond`
- `lekgothe/deploy`

---

## Adding More Businesses (Lindokuhle's job)

Open `data/mock-businesses.ts` and add to the `businesses` array. Copy one of the existing objects and change the fields. The `id` must be unique (`b12`, `b13`, etc.).

Real businesses from Mdantsane that fit? Add them (with their permission).

---

## Connecting a Real Backend (Phase 2 — after hackathon)

The prototype uses mock data. To go live:

1. **Auth:** Replace `MOCK_LOGGED_IN` booleans with [Supabase Auth](https://supabase.com/docs/guides/auth)
2. **Database:** Replace `data/mock-businesses.ts` with Supabase queries
3. **WhatsApp integration:** [Twilio WhatsApp API](https://www.twilio.com/docs/whatsapp) or [360dialog](https://www.360dialog.com/)
4. **Payments:** [PayFast](https://www.payfast.co.za/) for Boost/Premium payments

---

## Advice for the 24 Hours

1. **Scope ruthlessly.** The skeleton is already built. Your job is to make it feel real with real content and real polish — not to rebuild it.
2. **Add real Mdantsane data.** 20 real businesses (even if mock) is 10× more convincing than 5.
3. **Test on your phone.** Judges will open it on mobile. Broken mobile = broken first impression.
4. **WhatsApp works without a backend.** The `wa.me` link is your killer feature — it *already works*.
5. **The pitch page IS your pitch.** Make it beautiful. Update the stats. Get the copy right.
6. **Sleep at least 4 hours.** 3am code is 9am bugs.
7. **Commit often.** Every 2 hours, push your branch. You don't want to lose work.
8. **Demo the story, not the code.** Show the external flow first (buyer outside Mdantsane finds a plumber). That's the "new markets" proof point. That's what wins.

---

## The Demo Flow (for judges)

> **"Imagine you're in Sandton. You need a plumber urgently and someone sends you a SondelaBiz link."**

1. Open `/directory` — filter by Plumbers  
2. Find **Mthembeni Plumbing** — see the Gold badge, the 4.7★ rating  
3. Click **View Profile** — see the description, offers, reviews  
4. Click **WhatsApp** — message goes directly to the plumber  
5. *"That plumber is in Mdantsane. He couldn't be found before. He has a new market now."*

> **"Now you're a salon owner in Unit 4. You need hair extension suppliers."**

6. Open `/network` (dashboard)  
7. See **Needs & Offers** board  
8. Post a need: "Looking for bulk hair extension supplier"  
9. Another business responds → deal is tracked → review follows → tier climbs

---

*Built with ❤️ in Mdantsane.*  
*Sondela ngeBusiness.*
