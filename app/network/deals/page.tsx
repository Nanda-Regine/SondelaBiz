'use client'

// ─────────────────────────────────────────────────────────────
//  Deals & Requests — B2B deal tracker
//  Owner: Amahle Axola
// ─────────────────────────────────────────────────────────────

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { deals, businesses } from '@/data/mock-businesses'
import { relativeTime } from '@/lib/utils'
import type { DealStatus } from '@/lib/types'

const MOCK_BUSINESS_ID = 'b1'

const STATUS_STYLES: Record<DealStatus, string> = {
  pending:     'badge-gray',
  negotiating: 'badge-amber',
  agreed:      'badge-green',
  complete:    'badge bg-green-100 text-green-700',
  cancelled:   'badge bg-red-100 text-red-700',
}

const STATUS_LABELS: Record<DealStatus, string> = {
  pending:     '⏳ Pending',
  negotiating: '🤝 Negotiating',
  agreed:      '✅ Agreed',
  complete:    '🎉 Complete',
  cancelled:   '✕ Cancelled',
}

export default function DealsPage() {
  const myDeals = deals.filter(
    (d) => d.fromBusinessId === MOCK_BUSINESS_ID || d.toBusinessId === MOCK_BUSINESS_ID
  )

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <nav className="text-xs text-[var(--text-muted)] mb-4">
          <Link href="/network" className="hover:text-brand-800">Network</Link> / Deals
        </nav>
        <h1 className="font-syne text-3xl font-extrabold text-[var(--text)]">My Deals</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)] mb-6">
          Track your active requests, negotiations, and completed trades.
        </p>

        {myDeals.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🤝</div>
            <p className="text-[var(--text-muted)]">No deals yet. Respond to a post on the board to start one.</p>
            <Link href="/network/board" className="btn-primary mt-4 inline-flex px-5 py-2.5">
              Go to Board
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myDeals.map((deal) => {
              const isInitiator = deal.fromBusinessId === MOCK_BUSINESS_ID
              const otherName = isInitiator ? deal.toBusinessName : deal.fromBusinessName
              return (
                <div key={deal.id} className="card-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-syne font-bold text-[var(--text)]">{deal.title}</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {isInitiator ? 'You → ' : ''}{otherName}{!isInitiator ? ' → You' : ''}
                      </p>
                    </div>
                    <span className={STATUS_STYLES[deal.status]}>{STATUS_LABELS[deal.status]}</span>
                  </div>
                  {deal.value && (
                    <p className="mt-2 text-sm font-semibold text-brand-800">{deal.value}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>Updated {relativeTime(deal.updatedAt)}</span>
                    {deal.status === 'complete' && (
                      <button className="badge-green cursor-pointer hover:opacity-80">
                        ★ Leave review
                      </button>
                    )}
                    {deal.status === 'negotiating' && (
                      <button className="btn-primary px-3 py-1 text-xs">
                        Continue negotiation
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
