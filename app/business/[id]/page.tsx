// ─────────────────────────────────────────────────────────────
//  Business detail page — full public profile
//  Owner: Siyamthanda Ndabeni
//
//  TODO (Siyamthanda):
//  1. Add a photo gallery when images are available
//  2. Show reviews pulled from DB
//  3. Add "Report this listing" link
// ─────────────────────────────────────────────────────────────

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TrustedTraderBadge from '@/components/ui/TrustedTraderBadge'
import { businesses, reviews } from '@/data/mock-businesses'
import { CATEGORIES } from '@/lib/types'
import { waLink, formatPhone } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const business = businesses.find((b) => b.id === params.id)
  if (!business) return { title: 'Business not found' }
  return {
    title: business.name,
    description: business.tagline,
  }
}

export default function BusinessPage({ params }: Props) {
  const business = businesses.find((b) => b.id === params.id)
  if (!business) notFound()

  const categoryMeta = CATEGORIES.find((c) => c.slug === business.category)
  const businessReviews = reviews.filter((r) => r.businessId === business.id)
  const waMessage = `Hi ${business.name}, I found you on SondelaBiz and would like to enquire about your services.`
  const fullStars = Math.floor(business.rating)

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-[var(--text-muted)]">
          <Link href="/directory" className="hover:text-brand-800">Directory</Link>
          {' / '}
          <Link href={`/directory?category=${business.category}`} className="hover:text-brand-800">
            {categoryMeta?.label}
          </Link>
          {' / '}
          <span className="text-[var(--text)]">{business.name}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Main content ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header */}
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-3xl">
                  {categoryMeta?.emoji ?? '🏢'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-syne text-2xl font-extrabold text-[var(--text)]">
                      {business.name}
                    </h1>
                    {business.verified && (
                      <span className="badge-green text-xs">✓ Verified</span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    {categoryMeta?.label} · {business.zone}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <TrustedTraderBadge tier={business.traderTier} size="sm" />
                    <span className="text-xs text-[var(--text-muted)]">
                      {'★'.repeat(fullStars)}{'☆'.repeat(5 - fullStars)} {business.rating.toFixed(1)} ({business.reviewCount} reviews)
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {business.completedDeals} deals completed
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--text-2)] leading-relaxed">{business.description}</p>
            </div>

            {/* What they offer */}
            <div className="card">
              <h2 className="font-syne font-bold text-[var(--text)] mb-3">Services & Offers</h2>
              <div className="flex flex-wrap gap-2">
                {business.offers.map((offer) => (
                  <span key={offer} className="badge-green">{offer}</span>
                ))}
              </div>
            </div>

            {/* What they need (B2B — shows to logged-in network members) */}
            {business.needs.length > 0 && (
              <div className="card border-amber/30">
                <h2 className="font-syne font-bold text-[var(--text)] mb-1">Currently Looking For</h2>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  This business posted these on the B2B board. Join the network to respond.
                </p>
                <ul className="space-y-1.5">
                  {business.needs.map((need) => (
                    <li key={need} className="flex items-center gap-2 text-sm text-[var(--text-2)]">
                      <span className="text-amber">→</span> {need}
                    </li>
                  ))}
                </ul>
                <Link href="/join" className="btn-amber mt-4 inline-block text-xs px-3 py-1.5">
                  Join network to respond
                </Link>
              </div>
            )}

            {/* Reviews */}
            <div className="card">
              <h2 className="font-syne font-bold text-[var(--text)] mb-4">
                Reviews ({businessReviews.length})
              </h2>
              {businessReviews.length > 0 ? (
                <div className="space-y-4">
                  {businessReviews.map((r) => (
                    <div key={r.id} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text)]">{r.authorName}</span>
                        <span className="text-xs text-amber">{'★'.repeat(r.rating)}</span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--text-2)]">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">
                  No reviews yet. Be the first to work with {business.name} and leave a review.
                </p>
              )}
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────── */}
          <div className="space-y-4">
            {/* Contact card */}
            <div className="card sticky top-20">
              <h3 className="font-syne font-bold text-[var(--text)] mb-4">Contact</h3>

              <a
                href={waLink(business.whatsapp, waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-sm mb-3"
              >
                💬 WhatsApp {business.name}
              </a>

              {business.phone && (
                <a
                  href={`tel:${business.phone.replace(/\s/g, '')}`}
                  className="btn-outline w-full justify-center text-sm mb-3"
                >
                  📞 {formatPhone(business.phone)}
                </a>
              )}

              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="btn-outline w-full justify-center text-sm"
                >
                  ✉️ Email
                </a>
              )}

              <div className="mt-4 border-t border-[var(--border)] pt-4 space-y-1.5 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🗂️</span>
                  <span>{business.zone}</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-[var(--surface-2)] p-3 text-xs text-[var(--text-muted)]">
                💡 Contact goes directly to this business — no middleman, no fee.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
