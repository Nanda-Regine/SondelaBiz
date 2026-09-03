// ─────────────────────────────────────────────────────────────
//  TrustedTraderBadge — displays a business's tier visually
//
//  The Trusted Trader system builds trust between strangers.
//  Tiers: New → Bronze → Silver → Gold
//
//  Usage:
//    <TrustedTraderBadge tier="gold" />
//    <TrustedTraderBadge tier="silver" size="sm" />
// ─────────────────────────────────────────────────────────────

import type { TraderTier } from '@/lib/types'

interface Props {
  tier: TraderTier
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const TIER_CONFIG = {
  new: {
    icon: '🆕',
    label: 'New Trader',
    color: 'text-gray-500',
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    description: 'Getting started',
  },
  bronze: {
    icon: '🥉',
    label: 'Bronze Trader',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    description: '5+ completed deals',
  },
  silver: {
    icon: '🥈',
    label: 'Silver Trader',
    color: 'text-gray-600',
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    description: '20+ completed deals',
  },
  gold: {
    icon: '⭐',
    label: 'Gold Trader',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    description: '50+ deals, 4.5★+',
  },
}

const SIZE_CLASSES = {
  sm: { container: 'px-2 py-0.5 text-xs gap-1', icon: 'text-xs' },
  md: { container: 'px-3 py-1 text-sm gap-1.5', icon: 'text-sm' },
  lg: { container: 'px-4 py-1.5 text-base gap-2', icon: 'text-base' },
}

export default function TrustedTraderBadge({
  tier,
  size = 'md',
  showLabel = true,
}: Props) {
  const config = TIER_CONFIG[tier]
  const sizeClass = SIZE_CLASSES[size]

  return (
    <span
      title={`${config.label} — ${config.description}`}
      className={`
        inline-flex items-center rounded-full border font-medium
        ${config.bg} ${config.border} ${config.color}
        ${sizeClass.container}
      `}
    >
      <span className={sizeClass.icon}>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  )
}
