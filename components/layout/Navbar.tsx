'use client'

// ─────────────────────────────────────────────────────────────
//  Navbar — appears on every platform page
//  Owner: Xolani Ncube
//
//  TODO (Xolani):
//  1. Wire up auth — replace `isLoggedIn` mock with real session
//  2. Add mobile hamburger menu
//  3. Add notification badge for new board responses
// ─────────────────────────────────────────────────────────────

import Link from 'next/link'
import { useState } from 'react'

// Simulate a logged-in user for the prototype
// Replace this with real auth (e.g. Supabase session) later
const MOCK_USER = {
  isLoggedIn: false, // toggle to true to see logged-in state
  businessName: "Mama Thandiwe's Salon",
  tier: 'gold' as const,
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isLoggedIn, businessName, tier } = MOCK_USER

  const tierColor: Record<string, string> = {
    new: 'bg-gray-100 text-gray-600',
    bronze: 'bg-amber-100 text-amber-800',
    silver: 'bg-gray-200 text-gray-700',
    gold: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-syne text-xl font-bold text-brand-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800 text-sm text-white">S</span>
          SondelaBiz
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link href="/directory" className="text-sm text-[var(--text-2)] hover:text-brand-800 transition-colors">
            Find Businesses
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/network" className="text-sm text-[var(--text-2)] hover:text-brand-800 transition-colors">
                My Network
              </Link>
              <Link href="/network/board" className="text-sm text-[var(--text-2)] hover:text-brand-800 transition-colors">
                Board
              </Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className={`badge text-xs ${tierColor[tier]}`}>
                {tier === 'gold' ? '⭐' : tier === 'silver' ? '🥈' : tier === 'bronze' ? '🥉' : '🆕'} {tier}
              </span>
              <span className="hidden max-w-[120px] truncate text-sm font-medium text-[var(--text)] sm:block">
                {businessName}
              </span>
            </div>
          ) : (
            <>
              <Link href="/join" className="btn-primary text-sm px-3 py-2">
                Join Free
              </Link>
              <Link href="/network" className="hidden text-sm text-[var(--text-muted)] hover:text-brand-800 transition-colors sm:block">
                Sign in
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
