'use client'

// ─────────────────────────────────────────────────────────────
//  Public Directory — all opted-in businesses, searchable
//  Owner: Siyamthanda Ndabeni
//
//  TODO (Siyamthanda):
//  1. Add zone filter (Unit 1–18 dropdown)
//  2. Add sort: rating, newest, alphabetical
//  3. Infinite scroll / pagination when data grows
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BusinessCard from '@/components/public/BusinessCard'
import { businesses } from '@/data/mock-businesses'
import { CATEGORIES } from '@/lib/types'
import { filterBusinesses } from '@/lib/utils'

export default function DirectoryPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('')

  const results = useMemo(
    () => filterBusinesses(businesses, { query, category: activeCategory || undefined, publicOnly: true }),
    [query, activeCategory]
  )

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-syne text-3xl font-extrabold text-[var(--text)]">Business Directory</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Mdantsane businesses open to working with you — no login needed.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-4 flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, service, or zone…"
            className="input max-w-md"
          />
          {query && (
            <button onClick={() => setQuery('')} className="btn-outline px-3 text-xs">
              Clear
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('')}
            className={`badge text-sm px-3 py-1 cursor-pointer transition ${
              activeCategory === '' ? 'bg-brand-800 text-white' : 'badge-gray hover:bg-brand-50 hover:text-brand-800'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug === activeCategory ? '' : cat.slug)}
              className={`badge text-sm px-3 py-1 cursor-pointer transition ${
                activeCategory === cat.slug
                  ? 'bg-brand-800 text-white'
                  : 'badge-gray hover:bg-brand-50 hover:text-brand-800'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="mb-4 text-xs text-[var(--text-muted)]">
          {results.length} business{results.length !== 1 ? 'es' : ''} found
          {activeCategory && ` in ${CATEGORIES.find((c) => c.slug === activeCategory)?.label}`}
          {query && ` matching "${query}"`}
        </p>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-4xl">🔍</div>
            <p className="mt-3 text-[var(--text-muted)]">No businesses found. Try a different search.</p>
            <button onClick={() => { setQuery(''); setActiveCategory('') }} className="btn-outline mt-4 text-sm">
              Reset filters
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
