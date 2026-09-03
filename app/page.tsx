// ─────────────────────────────────────────────────────────────
//  Homepage — public platform entry (MVP 2)
//  Owner: Siyamthanda Ndabeni
// ─────────────────────────────────────────────────────────────

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/public/Hero'
import CategoryGrid from '@/components/public/CategoryGrid'
import BusinessCard from '@/components/public/BusinessCard'
import { businesses } from '@/data/mock-businesses'
import Link from 'next/link'

export default function HomePage() {
  // Featured = public businesses sorted by tier (gold first), top 4
  const tierOrder = { gold: 0, silver: 1, bronze: 2, new: 3 }
  const featured = businesses
    .filter((b) => b.isPublic)
    .sort((a, b) => tierOrder[a.traderTier] - tierOrder[b.traderTier])
    .slice(0, 4)

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <Hero />

        {/* ── Categories ────────────────────────────────────── */}
        <CategoryGrid />

        {/* ── Featured businesses ───────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-syne text-2xl font-bold text-[var(--text)]">Featured Businesses</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Gold Trusted Traders — verified, high-rated, community-trusted.</p>
            </div>
            <Link href="/directory" className="text-sm font-medium text-brand-800 hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        </section>

        {/* ── For businesses — B2B CTA ──────────────────────── */}
        <section className="bg-brand-900 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="font-syne text-3xl font-bold text-white">
              Are you a business in Mdantsane?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-brand-200">
              Join the network. Get found by buyers outside the township, connect with local suppliers, and build your Trusted Trader reputation — for free.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/join" className="btn-amber px-6 py-3 text-base font-semibold">
                Join Free — No Credit Card
              </Link>
              <Link href="/network" className="btn btn-outline border-brand-600 text-brand-200 hover:bg-brand-800 px-6 py-3 text-base">
                Sign In
              </Link>
            </div>

            {/* Pricing preview */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 text-left">
              {[
                { tier: 'Free', price: 'R0', desc: 'Profile + directory listing + post needs & offers' },
                { tier: 'Boost', price: 'From R10', desc: 'Top placement for a few days' },
                { tier: 'Premium', price: 'R49–R99/mo', desc: 'Higher placement + analytics' },
                { tier: 'Featured', price: 'R150–R250/mo', desc: 'Homepage feature + priority visibility' },
              ].map(({ tier, price, desc }) => (
                <div key={tier} className="w-full max-w-[200px] rounded-xl border border-brand-700 bg-brand-800/50 p-4 text-center">
                  <div className="font-syne text-lg font-bold text-amber">{price}</div>
                  <div className="mt-0.5 text-sm font-semibold text-white">{tier}</div>
                  <div className="mt-1 text-xs text-brand-300 leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-syne text-2xl font-bold text-[var(--text)]">How SondelaBiz works</h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* External flow */}
            <div className="card border-brand-200">
              <h3 className="font-syne font-bold text-brand-800">For buyers outside Mdantsane</h3>
              <ol className="mt-4 space-y-3 text-sm text-[var(--text-2)]">
                {[
                  'Find SondelaBiz via WhatsApp, Google, or a friend',
                  'Browse by category — no login needed',
                  'Find your plumber / salon / mechanic',
                  'Hit Contact → straight to WhatsApp or call',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-800">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Internal flow */}
            <div className="card border-amber/30">
              <h3 className="font-syne font-bold" style={{ color: 'var(--amber)' }}>For businesses inside the network</h3>
              <ol className="mt-4 space-y-3 text-sm text-[var(--text-2)]">
                {[
                  'Register free — set up your business profile',
                  'Post what you need or what you offer',
                  'Connect with other Mdantsane businesses',
                  'Complete deals, earn reviews, climb the Trusted Trader tiers',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-light text-xs font-bold text-amber-700">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Pitch link ────────────────────────────────────── */}
        <div className="pb-12 text-center">
          <Link href="/pitch" className="text-sm text-[var(--text-muted)] hover:text-brand-800 transition-colors">
            Read our full story →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
