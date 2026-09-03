'use client'

// ─────────────────────────────────────────────────────────────
//  Hero — public homepage hero section with live search
//  Owner: Siyamthanda Ndabeni
//
//  TODO (Siyamthanda):
//  1. Wire search input to redirect to /directory?q=...
//  2. Animate counter numbers on mount
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/directory?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/directory')
    }
  }

  return (
    <section className="relative overflow-hidden bg-brand-900 py-16 sm:py-24">
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 50%, #2D8A5A 0%, transparent 60%), radial-gradient(circle at 75% 20%, #E8A020 0%, transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Eyebrow */}
        <span className="inline-block rounded-full border border-brand-600/40 bg-brand-800/50 px-4 py-1 text-xs font-medium text-brand-200 mb-5">
          🌍 Mdantsane's own business network
        </span>

        {/* Headline */}
        <h1 className="font-syne text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          Sondela<span className="text-amber"> ngeBusiness</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-brand-200 sm:text-lg">
          Discover local businesses, post what you need, find who can help —
          all within Mdantsane, and now visible to the world.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-xl gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plumbers, salons, electricians…"
            className="flex-1 rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-300 backdrop-blur focus:outline-none focus:ring-2 focus:ring-amber"
          />
          <button type="submit" className="rounded-xl bg-amber px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition active:scale-95">
            Search
          </button>
        </form>

        {/* Trust stats */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center">
          {[
            { value: '156K+', label: 'Mdantsane residents' },
            { value: '11',    label: 'Businesses listed' },
            { value: '18',    label: 'Zones covered' },
            { value: '0',     label: 'Data required to browse' },
          ].map(({ value, label }) => (
            <div key={label} className="min-w-[80px]">
              <div className="font-syne text-2xl font-bold text-amber">{value}</div>
              <div className="text-xs text-brand-300">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
