'use client'

// ─────────────────────────────────────────────────────────────
//  B2B Network Dashboard — internal, login required
//  Owner: Amahle Axola
//
//  PROTOTYPE NOTE: auth is simulated via localStorage.
//  Set MOCK_LOGGED_IN = true to see the logged-in view.
//
//  TODO (Amahle):
//  1. Replace mock auth with Supabase session
//  2. Fetch real board posts, deals, and reviews
//  3. Add notification count badges
// ─────────────────────────────────────────────────────────────

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import TrustedTraderBadge from '@/components/ui/TrustedTraderBadge'
import { boardPosts, deals, businesses } from '@/data/mock-businesses'

// Toggle to true to simulate a logged-in business owner
const MOCK_LOGGED_IN = true
const MOCK_BUSINESS = businesses[0] // Mama Thandiwe's Salon

export default function NetworkPage() {
  if (!MOCK_LOGGED_IN) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="font-syne text-2xl font-bold text-[var(--text)]">B2B Network</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            The SondelaBiz network is for registered businesses. Join free or sign in.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/join" className="btn-primary justify-center py-3">Join Free</Link>
            <button className="btn-outline justify-center py-3 text-sm">Sign In with WhatsApp</button>
          </div>
        </main>
      </>
    )
  }

  const business = MOCK_BUSINESS
  const urgentPosts = boardPosts.filter((p) => p.urgent)
  const myDeals = deals.filter((d) => d.fromBusinessId === business.id || d.toBusinessId === business.id)

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* Welcome banner */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-900 px-6 py-5 text-white">
          <div>
            <p className="text-xs text-brand-300">Welcome back</p>
            <h1 className="font-syne text-2xl font-bold">{business.name}</h1>
            <div className="mt-1 flex items-center gap-2">
              <TrustedTraderBadge tier={business.traderTier} size="sm" />
              <span className="text-xs text-brand-300">{business.completedDeals} completed deals</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/network/board" className="btn-amber text-sm px-4 py-2">
              + Post to Board
            </Link>
            <Link href={`/business/${business.id}`} className="btn btn-outline border-brand-600 text-brand-200 hover:bg-brand-800 text-sm px-4 py-2">
              View Public Profile
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Urgent posts */}
            {urgentPosts.length > 0 && (
              <div className="card border-red-200">
                <h2 className="font-syne font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                  <span className="badge-urgent">🔥 Urgent</span>
                  Needs on the board
                </h2>
                <div className="space-y-3">
                  {urgentPosts.map((post) => (
                    <div key={post.id} className="flex items-start justify-between gap-4 rounded-lg bg-red-50 p-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text)] truncate">{post.title}</p>
                        <p className="text-xs text-[var(--text-muted)]">{post.businessName} · {post.zone}</p>
                      </div>
                      <Link href="/network/board" className="btn-primary flex-shrink-0 px-3 py-1.5 text-xs">
                        Respond
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active deals */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-syne font-bold text-[var(--text)]">My Deals</h2>
                <Link href="/network/deals" className="text-xs text-brand-800 hover:underline">View all →</Link>
              </div>
              {myDeals.length > 0 ? (
                <div className="space-y-3">
                  {myDeals.map((deal) => {
                    const statusColor: Record<string, string> = {
                      pending: 'badge-gray',
                      negotiating: 'badge-amber',
                      agreed: 'badge-green',
                      complete: 'badge-green',
                      cancelled: 'badge bg-red-100 text-red-700',
                    }
                    const other = deal.fromBusinessId === business.id ? deal.toBusinessName : deal.fromBusinessName
                    return (
                      <div key={deal.id} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] p-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--text)] truncate">{deal.title}</p>
                          <p className="text-xs text-[var(--text-muted)]">with {other}</p>
                        </div>
                        <div className="flex flex-shrink-0 flex-col items-end gap-1">
                          <span className={statusColor[deal.status]}>{deal.status}</span>
                          {deal.value && <span className="text-xs font-medium text-brand-800">{deal.value}</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">No active deals. Post on the board to get started.</p>
              )}
            </div>

            {/* Recent board activity */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-syne font-bold text-[var(--text)]">Latest on the Board</h2>
                <Link href="/network/board" className="text-xs text-brand-800 hover:underline">See board →</Link>
              </div>
              <div className="space-y-3">
                {boardPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.type === 'need' ? 'bg-amber-light text-amber-800' : 'badge-green'
                    }`}>
                      {post.type === 'need' ? 'Need' : 'Offer'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-[var(--text)] line-clamp-1">{post.title}</p>
                      <p className="text-xs text-[var(--text-muted)]">{post.businessName} · {post.responses} response{post.responses !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Trusted Trader progress */}
            <div className="card">
              <h3 className="font-syne font-bold text-[var(--text)] mb-3">Your Trader Progress</h3>
              <div className="space-y-2">
                {[
                  { tier: 'new', label: 'New', req: '0 deals' },
                  { tier: 'bronze', label: 'Bronze', req: '5 deals' },
                  { tier: 'silver', label: 'Silver', req: '20 deals' },
                  { tier: 'gold', label: 'Gold', req: '50 deals + 4.5★' },
                ].map(({ tier, label, req }) => {
                  const active = business.traderTier === tier
                  return (
                    <div key={tier} className={`flex items-center justify-between rounded-lg p-2 ${active ? 'bg-brand-50 border border-brand-200' : ''}`}>
                      <span className={`text-sm font-medium ${active ? 'text-brand-800' : 'text-[var(--text-muted)]'}`}>
                        {active ? '→ ' : ''}{label}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">{req}</span>
                    </div>
                  )
                })}
              </div>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                You have {business.completedDeals} completed deals and a {business.rating}★ rating.
              </p>
            </div>

            {/* Quick actions */}
            <div className="card">
              <h3 className="font-syne font-bold text-[var(--text)] mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/network/board" className="btn-primary w-full justify-center py-2.5 text-sm">
                  📋 Post a Need or Offer
                </Link>
                <Link href="/directory" className="btn-outline w-full justify-center py-2.5 text-sm">
                  🔍 Find Businesses
                </Link>
                <Link href="/network/deals" className="btn-outline w-full justify-center py-2.5 text-sm">
                  🤝 My Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
