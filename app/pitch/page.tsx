'use client'

// ─────────────────────────────────────────────────────────────
//  MVP 1 — Interactive Project Brief / Pitch Page
//  Owner: Lekgothe Ngoepe
//
//  This is the visual presentation of the SondelaBiz concept.
//  Share this link with hackathon judges, mentors, investors.
//
//  Route: /pitch
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import Link from 'next/link'

const TEAM = [
  { name: 'Lindokuhle Ntuli',    role: 'Founder & Architect',     emoji: '🏗️', focus: 'Grew up in Mdantsane · knows the zones, the people, the economy' },
  { name: 'Xolani Ncube',        role: 'UI Lead',                  emoji: '🎨', focus: 'Design system, components, Navbar & shared UI' },
  { name: 'Siyamthanda Ndabeni', role: 'Public Pages',             emoji: '🌐', focus: 'Directory, Hero, Business Detail, public experience' },
  { name: 'Amahle Axola',        role: 'B2B Network',              emoji: '🤝', focus: 'Dashboard, Needs/Offers Board, Deals tracker' },
  { name: 'Lekgothe Ngoepe',     role: 'Pitch & Deploy',           emoji: '🚀', focus: 'This page, Vercel deploy, README & presentation' },
]

const COMPETITORS = [
  { name: 'KasiConnect',    what: 'Township buyer/seller directory',    diff: 'Static only, no matching, no public visibility layer' },
  { name: 'Spaza Market',   what: 'Super-app: delivery, payments, loans', diff: 'Bigger scope — we go hyper-local with deep community trust' },
  { name: 'SiYaDiGiTiZa',  what: 'Govt-backed SME directory',          diff: 'Compliance-focused, not built for daily active use' },
  { name: 'Yep! / Bark',    what: 'General SA directories',             diff: 'Not township-localised, no Mdantsane trust mechanism' },
  { name: 'Takealot',       what: 'National e-commerce',                diff: '~R400/mo to list — too costly for informal SMEs' },
]

const SDGS = [
  { num: 1,  icon: '🏘️', title: 'No Poverty',              desc: 'More income opportunities for informal traders' },
  { num: 8,  icon: '💼', title: 'Decent Work',              desc: 'Formalises the local informal economy' },
  { num: 9,  icon: '📡', title: 'Industry & Innovation',    desc: 'Low-data digital infrastructure in underserved market' },
  { num: 10, icon: '⚖️', title: 'Reduced Inequalities',    desc: 'Same digital visibility tools as affluent areas' },
  { num: 11, icon: '🌆', title: 'Sustainable Cities',      desc: 'Keeps spend circulating within the community' },
  { num: 17, icon: '🤝', title: 'Partnerships',            desc: 'Built on ISPs, spaza shops, community networks' },
]

const PRICING = [
  { tier: 'Free (Basic)',       price: 'R0',              highlight: false, desc: 'Profile, directory listing, post needs & offers — the on-ramp, not a limited trial' },
  { tier: 'Boost',              price: 'R10–R30',         highlight: false, desc: 'Temporary top placement. Same logic as a data voucher — spend a little when it matters.' },
  { tier: 'Premium Profile',    price: 'R49–R99/mo',      highlight: true,  desc: 'Higher placement, more photos, verified badge, contact analytics.' },
  { tier: 'Featured Business',  price: 'R150–R250/mo',    highlight: false, desc: 'Top of category, homepage feature, priority outside-buyer visibility.' },
]

export default function PitchPage() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = ['Problem', 'Solution', 'Model', 'Market', 'Impact', 'Team']

  return (
    <div className="min-h-screen bg-brand-900 text-white font-sans">

      {/* ── Sticky mini nav ──────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-brand-800 bg-brand-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="font-syne text-lg font-bold text-white">
            ← <span className="text-amber">Sondela</span>Biz
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            {sections.map((s, i) => (
              <a
                key={s}
                href={`#section-${i}`}
                onClick={() => setActiveSection(i)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  activeSection === i ? 'bg-amber text-brand-900 font-semibold' : 'text-brand-300 hover:text-white'
                }`}
              >
                {s}
              </a>
            ))}
          </div>
          <Link href="/" className="btn-amber px-4 py-1.5 text-xs">
            View Platform →
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,160,32,0.15) 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-brand-700 bg-brand-800/50 px-4 py-1.5 text-xs text-brand-300 mb-6">
            24-Hour Hackathon Prototype · September 2026
          </span>
          <h1 className="font-syne text-5xl font-extrabold leading-tight sm:text-7xl">
            Sondela<span className="text-amber">Biz</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-200">
            The B2B network and public discovery platform built exclusively for Mdantsane's 156,000-person township economy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="rounded-full bg-brand-800 px-4 py-2 text-sm text-brand-200">
              📍 Mdantsane, Eastern Cape
            </div>
            <div className="rounded-full bg-brand-800 px-4 py-2 text-sm text-brand-200">
              📱 WhatsApp-first, low-data
            </div>
            <div className="rounded-full bg-brand-800 px-4 py-2 text-sm text-brand-200">
              🆓 Free to join
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────── */}
      <section id="section-0" className="border-t border-brand-800 bg-brand-950 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">The Problem</span>
          <h2 className="font-syne mt-2 text-3xl font-bold sm:text-4xl">
            Mdantsane's businesses are invisible to each other — and to the world.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: '👥', title: 'Trapped networks', desc: 'SME owners only trade with the same small handful of suppliers and buyers they already personally know.' },
              { icon: '🔍', title: 'Undiscoverable', desc: 'Buyers outside Mdantsane have no easy way to find local businesses. If you don\'t know someone who knows them — you can\'t find them.' },
              { icon: '🤷', title: 'No trust mechanism', desc: 'Existing tools are too broad, require heavy data/login, and build zero trust between strangers in the same community.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-brand-800 bg-brand-900 p-5">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-syne font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm text-brand-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────────── */}
      <section id="section-1" className="border-t border-brand-800 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">The Solution</span>
          <h2 className="font-syne mt-2 text-3xl font-bold sm:text-4xl">Two platforms. One community.</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Part A */}
            <div className="rounded-2xl border border-brand-700 bg-brand-800/40 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">A</span>
                <span className="font-syne font-bold text-white">B2B Network</span>
                <span className="badge bg-brand-700 text-brand-200 text-xs">Login required</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  ['Business Profile', 'What you offer, contact info, category'],
                  ['Find & Connect', 'Search/browse other Mdantsane businesses by category'],
                  ['Post Needs & Offers', '"I need X" / "I have X" board'],
                  ['Deals & Requests', 'Send a request, negotiate, close a deal'],
                  ['Reviews & Ratings', 'Build trust so strangers feel safe trading'],
                  ['Trusted Trader', 'New → Bronze → Silver → Gold tiers'],
                ].map(([feat, desc]) => (
                  <li key={feat} className="flex gap-2.5 text-sm">
                    <span className="mt-0.5 flex-shrink-0 text-amber">✓</span>
                    <div>
                      <span className="font-medium text-white">{feat}</span>
                      <span className="text-brand-300"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Part B */}
            <div className="rounded-2xl border border-amber/30 bg-amber/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber text-sm font-bold text-brand-900">B</span>
                <span className="font-syne font-bold text-white">Public Discovery</span>
                <span className="badge bg-amber/20 text-amber text-xs">No login</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  ['Opt-in toggle', 'Business chooses "make my profile publicly visible"'],
                  ['Shareable link', 'WhatsApp/Google/social — browse by category'],
                  ['Contact button', 'Outside buyer clicks → direct WhatsApp/call/email'],
                  ['Zero friction', 'No account, no app download, no data barrier'],
                  ['New market proof', 'A plumber in Mdantsane found by a client in Sandton'],
                ].map(([feat, desc]) => (
                  <li key={feat} className="flex gap-2.5 text-sm">
                    <span className="mt-0.5 flex-shrink-0 text-amber">✓</span>
                    <div>
                      <span className="font-medium text-white">{feat}</span>
                      <span className="text-brand-300"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trusted Trader */}
          <div className="mt-8 rounded-2xl border border-brand-800 bg-brand-950 p-6">
            <h3 className="font-syne font-bold text-white mb-4">
              ⭐ The Trusted Trader System — trust built through proof, not promises
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { tier: '🆕 New',    req: '0 deals',              color: 'border-gray-700 text-gray-400' },
                { tier: '🥉 Bronze', req: '5+ deals, 3.5★+',     color: 'border-amber-800 text-amber-500' },
                { tier: '🥈 Silver', req: '20+ deals, 4.0★+',    color: 'border-gray-500 text-gray-400' },
                { tier: '⭐ Gold',   req: '50+ deals, 4.5★+',    color: 'border-yellow-600 text-yellow-400' },
              ].map(({ tier, req, color }) => (
                <div key={tier} className={`rounded-xl border p-3 text-center ${color}`}>
                  <div className="font-syne font-bold text-white">{tier}</div>
                  <div className="mt-1 text-xs opacity-70">{req}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-brand-400">
              Referral reward: bring another business → earn a free month of Premium. Growth from the community, not ads.
            </p>
          </div>
        </div>
      </section>

      {/* ── Business Model ───────────────────────────────────── */}
      <section id="section-2" className="border-t border-brand-800 bg-brand-950 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">Business Model</span>
          <h2 className="font-syne mt-2 text-3xl font-bold">Priced like a data voucher, not a subscription trap.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING.map(({ tier, price, desc, highlight }) => (
              <div key={tier} className={`rounded-2xl border p-5 ${
                highlight ? 'border-amber bg-amber/10' : 'border-brand-800 bg-brand-900'
              }`}>
                <div className={`font-syne text-2xl font-extrabold ${highlight ? 'text-amber' : 'text-white'}`}>
                  {price}
                </div>
                <div className="mt-1 font-semibold text-white text-sm">{tier}</div>
                <p className="mt-2 text-xs text-brand-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-400">
            Free tier is the real on-ramp — not a crippled trial. Density first, conversion follows naturally.
          </p>
        </div>
      </section>

      {/* ── Why Mdantsane ────────────────────────────────────── */}
      <section id="section-3" className="border-t border-brand-800 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">Target Market</span>
          <h2 className="font-syne mt-2 text-3xl font-bold">Why Mdantsane? The numbers already work.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { value: '156,000+', label: 'Residents across 18 zones' },
              { value: '43,700',   label: 'Households — dense, self-contained' },
              { value: 'R3–R10',   label: 'Unlimited WiFi/day (Ilitha Telecoms)' },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-brand-800 bg-brand-900/60 p-5 text-center">
                <div className="font-syne text-3xl font-extrabold text-amber">{value}</div>
                <div className="mt-1 text-sm text-brand-300">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-brand-800 bg-brand-950 p-5">
            <h3 className="font-syne font-bold text-white mb-3">Priority target industries</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { icon: '💇', label: 'Salons',          reason: 'High repeat volume, reputation-driven' },
                { icon: '🛒', label: 'Street Vendors',  reason: 'Core informal economy, undigitised' },
                { icon: '🔧', label: 'Plumbers',        reason: '"Post a Need" — urgent, on-demand' },
                { icon: '🏠', label: 'Rental Agents',   reason: 'High-value, trust critical' },
                { icon: '⚡', label: 'Electricians',    reason: 'Safety-critical — reviews matter most' },
                { icon: '🔩', label: 'Mechanics',       reason: 'Recurring need, word-of-mouth driven' },
              ].map(({ icon, label, reason }) => (
                <div key={label} className="flex gap-2 text-sm">
                  <span>{icon}</span>
                  <div>
                    <div className="font-medium text-white">{label}</div>
                    <div className="text-xs text-brand-400">{reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitors */}
          <h3 className="font-syne font-bold text-white mt-8 mb-4">How we compare</h3>
          <div className="overflow-x-auto rounded-2xl border border-brand-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-800 bg-brand-950">
                  <th className="px-4 py-3 text-left text-xs text-brand-400 font-medium">Competitor</th>
                  <th className="px-4 py-3 text-left text-xs text-brand-400 font-medium">What they do</th>
                  <th className="px-4 py-3 text-left text-xs text-brand-400 font-medium">How we differ</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((c, i) => (
                  <tr key={c.name} className={`border-b border-brand-800 ${i % 2 === 0 ? 'bg-brand-900' : 'bg-brand-950'}`}>
                    <td className="px-4 py-3 font-medium text-white">{c.name}</td>
                    <td className="px-4 py-3 text-brand-300">{c.what}</td>
                    <td className="px-4 py-3 text-amber">{c.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SDG Impact ───────────────────────────────────────── */}
      <section id="section-4" className="border-t border-brand-800 bg-brand-950 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">Social Impact</span>
          <h2 className="font-syne mt-2 text-3xl font-bold">Built on 6 United Nations SDGs.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SDGS.map(({ num, icon, title, desc }) => (
              <div key={num} className="flex gap-4 rounded-2xl border border-brand-800 bg-brand-900 p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-800 text-xl">
                  {icon}
                </div>
                <div>
                  <div className="text-xs text-amber font-medium mb-0.5">SDG {num}</div>
                  <div className="font-syne font-bold text-white text-sm">{title}</div>
                  <div className="mt-1 text-xs text-brand-300">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section id="section-5" className="border-t border-brand-800 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber">The Team</span>
          <h2 className="font-syne mt-2 text-3xl font-bold">Built by 5 people in 24 hours.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map(({ name, role, emoji, focus }) => (
              <div key={name} className="rounded-2xl border border-brand-800 bg-brand-900 p-5">
                <div className="text-3xl mb-3">{emoji}</div>
                <div className="font-syne font-bold text-white">{name}</div>
                <div className="text-xs text-amber mt-0.5 font-medium">{role}</div>
                <p className="mt-2 text-xs text-brand-300 leading-relaxed">{focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-brand-800 bg-brand-950 px-4 py-20 text-center sm:px-6">
        <h2 className="font-syne text-4xl font-extrabold text-white">
          Ready to <span className="text-amber">Sondela</span>?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-300">
          Explore the live platform, browse Mdantsane businesses, and see the B2B network in action.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-amber px-8 py-3 text-base font-semibold">
            View Live Platform →
          </Link>
          <Link href="/directory" className="btn btn-outline border-brand-700 text-brand-300 hover:bg-brand-800 px-8 py-3 text-base">
            Browse Directory
          </Link>
        </div>
        <p className="mt-6 text-xs text-brand-600">
          Built at the 24-Hour Hackathon · Mdantsane, Eastern Cape · September 2026
        </p>
      </section>
    </div>
  )
}
