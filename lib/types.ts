// ─────────────────────────────────────────────────────────────
//  SondelaBiz — Core TypeScript types
//  All data shapes live here. If you add a field anywhere,
//  start here first so TypeScript catches mismatches everywhere.
// ─────────────────────────────────────────────────────────────

export type Category =
  | 'salon'
  | 'plumber'
  | 'electrician'
  | 'mechanic'
  | 'vendor'
  | 'rental'
  | 'tutor'
  | 'catering'
  | 'cleaning'
  | 'security'
  | 'other'

export type TraderTier = 'new' | 'bronze' | 'silver' | 'gold'

export type PricingTier = 'free' | 'boost' | 'premium' | 'featured'

// ── Business profile ─────────────────────────────────────────
export interface Business {
  id: string
  name: string
  category: Category
  zone: string                // e.g. "Unit 4", "Unit 2 Hi-Way"
  tagline: string             // one-line pitch
  description: string
  phone: string
  whatsapp: string            // digits only e.g. "27641234567"
  email?: string
  address: string
  rating: number              // 0–5
  reviewCount: number
  traderTier: TraderTier
  pricingTier: PricingTier
  isPublic: boolean           // opted in to public directory
  verified: boolean
  offers: string[]            // "I have / I can do…"
  needs: string[]             // "I need…"
  completedDeals: number
  joinedDate: string          // ISO date string
  images: string[]            // URLs (placeholder or real)
}

// ── Needs & Offers board post ────────────────────────────────
export type PostType = 'need' | 'offer'

export interface BoardPost {
  id: string
  businessId: string
  businessName: string
  category: Category
  zone: string
  type: PostType
  title: string
  description: string
  budget?: string             // optional price hint e.g. "R200–R500"
  postedAt: string            // ISO date string
  responses: number
  urgent: boolean
}

// ── Deal ────────────────────────────────────────────────────
export type DealStatus = 'pending' | 'negotiating' | 'agreed' | 'complete' | 'cancelled'

export interface Deal {
  id: string
  postId: string
  fromBusinessId: string
  toBusinessId: string
  fromBusinessName: string
  toBusinessName: string
  title: string
  value?: string
  status: DealStatus
  createdAt: string
  updatedAt: string
}

// ── Review ───────────────────────────────────────────────────
export interface Review {
  id: string
  businessId: string
  authorBusinessId: string
  authorName: string
  rating: number
  comment: string
  dealId?: string
  createdAt: string
}

// ── Category metadata (for UI display) ───────────────────────
export interface CategoryMeta {
  slug: Category
  label: string
  emoji: string
  description: string
}

export const CATEGORIES: CategoryMeta[] = [
  { slug: 'salon',       label: 'Salons',           emoji: '💇', description: 'Hair, nails, beauty' },
  { slug: 'plumber',     label: 'Plumbers',          emoji: '🔧', description: 'Pipes, leaks, installs' },
  { slug: 'electrician', label: 'Electricians',      emoji: '⚡', description: 'Wiring, faults, COC' },
  { slug: 'mechanic',    label: 'Mechanics',         emoji: '🔩', description: 'Cars, trucks, bakkies' },
  { slug: 'vendor',      label: 'Street Vendors',    emoji: '🛒', description: 'Fresh produce, goods' },
  { slug: 'rental',      label: 'Rental Agents',     emoji: '🏠', description: 'Accommodation, property' },
  { slug: 'tutor',       label: 'Tutors',            emoji: '📚', description: 'School, university, skills' },
  { slug: 'catering',    label: 'Catering',          emoji: '🍽️', description: 'Events, meals, functions' },
  { slug: 'cleaning',    label: 'Cleaning',          emoji: '🧹', description: 'Homes, offices, deep clean' },
  { slug: 'security',    label: 'Security',          emoji: '🛡️', description: 'Guards, access, CCTV' },
]

// ── Trader tier metadata ──────────────────────────────────────
export interface TierMeta {
  tier: TraderTier
  label: string
  minDeals: number
  minRating: number
  color: string
  bgColor: string
}

export const TIER_META: TierMeta[] = [
  { tier: 'new',    label: 'New Trader',    minDeals: 0,  minRating: 0,   color: '#6B7280', bgColor: '#F3F4F6' },
  { tier: 'bronze', label: 'Bronze Trader', minDeals: 5,  minRating: 3.5, color: '#CD7F32', bgColor: '#FEF3C7' },
  { tier: 'silver', label: 'Silver Trader', minDeals: 20, minRating: 4.0, color: '#9CA3AF', bgColor: '#F9FAFB' },
  { tier: 'gold',   label: 'Gold Trader',   minDeals: 50, minRating: 4.5, color: '#F59E0B', bgColor: '#FFFBEB' },
]
