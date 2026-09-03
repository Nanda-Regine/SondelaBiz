// ─────────────────────────────────────────────────────────────
//  BusinessCard — shown in directory listings and featured sections
//  Owner: Siyamthanda Ndabeni
//
//  TODO (Siyamthanda):
//  1. Add real business images when available
//  2. Wire up the "Save" / bookmark feature
//  3. Add skeleton loading state
// ─────────────────────────────────────────────────────────────

import Link from 'next/link'
import TrustedTraderBadge from '@/components/ui/TrustedTraderBadge'
import { waLink } from '@/lib/utils'
import type { Business } from '@/lib/types'
import { CATEGORIES } from '@/lib/types'

interface Props {
  business: Business
  variant?: 'card' | 'row'
}

export default function BusinessCard({ business, variant = 'card' }: Props) {
  const categoryMeta = CATEGORIES.find((c) => c.slug === business.category)
  const waMessage = `Hi ${business.name}, I found you on SondelaBiz and would like to enquire about your services.`

  // Star display
  const fullStars = Math.floor(business.rating)
  const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)

  if (variant === 'row') {
    return (
      <div className="card-hover flex items-center gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl">
          {categoryMeta?.emoji ?? '🏢'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link href={`/business/${business.id}`} className="font-semibold text-[var(--text)] hover:text-brand-800 transition-colors truncate">
              {business.name}
            </Link>
            <TrustedTraderBadge tier={business.traderTier} size="sm" showLabel={false} />
          </div>
          <p className="text-xs text-[var(--text-muted)] truncate">{business.zone} · {categoryMeta?.label}</p>
        </div>
        <a
          href={waLink(business.whatsapp, waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-shrink-0 px-3 py-1.5 text-xs"
        >
          WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="card-hover flex flex-col">
      {/* Header / category emoji */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
          {categoryMeta?.emoji ?? '🏢'}
        </div>
        <TrustedTraderBadge tier={business.traderTier} size="sm" />
      </div>

      {/* Business name & zone */}
      <Link href={`/business/${business.id}`} className="group">
        <h3 className="font-syne font-bold text-[var(--text)] group-hover:text-brand-800 transition-colors leading-tight">
          {business.name}
        </h3>
      </Link>
      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
        {business.zone} · {categoryMeta?.label}
      </p>

      {/* Tagline */}
      <p className="mt-2 text-sm text-[var(--text-2)] line-clamp-2 flex-1">
        {business.tagline}
      </p>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-amber tracking-tighter">{stars}</span>
        <span className="text-xs text-[var(--text-muted)]">
          {business.rating.toFixed(1)} ({business.reviewCount})
        </span>
      </div>

      {/* Offers tags */}
      <div className="mt-3 flex flex-wrap gap-1">
        {business.offers.slice(0, 3).map((offer) => (
          <span key={offer} className="badge-green text-xs">
            {offer}
          </span>
        ))}
        {business.offers.length > 3 && (
          <span className="badge-gray text-xs">+{business.offers.length - 3}</span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2 border-t border-[var(--border)] pt-4">
        <a
          href={waLink(business.whatsapp, waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1 justify-center text-xs py-2"
        >
          💬 WhatsApp
        </a>
        <Link href={`/business/${business.id}`} className="btn-outline flex-1 justify-center text-xs py-2">
          View Profile
        </Link>
      </div>
    </div>
  )
}
