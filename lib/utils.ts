import type { TraderTier, Business } from './types'

// cn() — merge Tailwind classes safely
// Usage: cn('px-4', condition && 'bg-green-500', className)
export function cn(...inputs: (string | boolean | null | undefined)[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim()
}

// Format WhatsApp link
// Usage: waLink('27641234567', 'Hi, I saw your profile on SondelaBiz...')
export function waLink(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, '')}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

// Format phone for display: 0641234567 → 064 123 4567
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  return phone
}

// Derive trader tier from completed deals + rating
export function deriveTier(completedDeals: number, rating: number): TraderTier {
  if (completedDeals >= 50 && rating >= 4.5) return 'gold'
  if (completedDeals >= 20 && rating >= 4.0) return 'silver'
  if (completedDeals >= 5  && rating >= 3.5) return 'bronze'
  return 'new'
}

// Relative time: "3 days ago", "just now"
export function relativeTime(isoDate: string): string {
  const now = Date.now()
  const then = new Date(isoDate).getTime()
  const diff = Math.floor((now - then) / 1000)

  if (diff < 60)    return 'just now'
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`
  return new Date(isoDate).toLocaleDateString('en-ZA')
}

// Star rating display
export function stars(rating: number): string {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5 ? 1 : 0
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half)
}

// Filter businesses (client-side search for prototype)
export function filterBusinesses(
  businesses: Business[],
  opts: {
    query?: string
    category?: string
    publicOnly?: boolean
  }
): Business[] {
  return businesses.filter((b) => {
    if (opts.publicOnly && !b.isPublic) return false
    if (opts.category && b.category !== opts.category) return false
    if (opts.query) {
      const q = opts.query.toLowerCase()
      return (
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.zone.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.offers.some((o) => o.toLowerCase().includes(q))
      )
    }
    return true
  })
}
