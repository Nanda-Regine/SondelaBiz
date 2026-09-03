'use client'

// ─────────────────────────────────────────────────────────────
//  Join / Register page
//  Owner: Lekgothe Ngoepe
//
//  TODO (Lekgothe):
//  1. Wire form to Supabase auth (supabase.auth.signUp)
//  2. Send confirmation email / WhatsApp OTP
//  3. Redirect to profile setup on success
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { CATEGORIES } from '@/lib/types'

export default function JoinPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    businessName: '',
    category: '',
    zone: '',
    phone: '',
    whatsapp: '',
    email: '',
    description: '',
    isPublic: true,
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = e.target
    const value = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : target.value
    setForm((prev) => ({ ...prev, [target.name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: replace this with real Supabase call
    console.log('Form submitted:', form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="font-syne text-3xl font-extrabold text-[var(--text)]">Welcome to SondelaBiz!</h1>
          <p className="mt-3 text-[var(--text-2)]">
            <strong>{form.businessName}</strong> is now registered. Your profile will appear in the directory once verified.
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            We'll reach out on WhatsApp ({form.whatsapp}) to confirm.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/network" className="btn-primary justify-center py-3 text-base">
              Go to My Network →
            </Link>
            <Link href="/directory" className="btn-outline justify-center py-3 text-sm">
              Browse the Directory
            </Link>
          </div>
        </main>
      </>
    )
  }

  const zones = ['Unit 1', 'Unit 2 (Hi-Way)', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Unit 7', 'Unit 8',
    'Unit 9', 'Unit 10', 'Unit 11', 'Unit 12', 'Unit 13', 'Unit 14', 'Unit 15', 'Unit 16', 'Unit 17', 'Unit 18']

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <div className="mb-6">
          <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-brand-800">← Back</Link>
          <h1 className="font-syne mt-3 text-3xl font-extrabold text-[var(--text)]">
            Join SondelaBiz — Free
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Set up your business profile in 2 minutes.
          </p>

          {/* Step indicator */}
          <div className="mt-4 flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-brand-800' : 'bg-[var(--border)]'}`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Step {step} of 2</p>
        </div>

        <form onSubmit={step === 2 ? handleSubmit : undefined} className="space-y-4 card">

          {step === 1 && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text)]">Business name *</label>
                <input name="businessName" value={form.businessName} onChange={handleChange} required
                  placeholder="e.g. Mama Thandiwe's Salon" className="input" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text)]">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} required className="input">
                  <option value="">Select a category…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.emoji} {c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text)]">Zone *</label>
                <select name="zone" value={form.zone} onChange={handleChange} required className="input">
                  <option value="">Select your zone…</option>
                  {zones.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!form.businessName || !form.category || !form.zone}
                className="btn-primary w-full justify-center py-3 disabled:opacity-50"
              >
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text)]">WhatsApp number *</label>
                <input name="whatsapp" value={form.whatsapp} onChange={handleChange} required
                  placeholder="e.g. 064 123 4567" type="tel" className="input" />
                <p className="mt-1 text-xs text-[var(--text-muted)]">We'll verify your business via WhatsApp.</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text)]">Email (optional)</label>
                <input name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" type="email" className="input" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text)]">Brief description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  placeholder="What does your business do? Who do you serve?"
                  className="input resize-none" />
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-[var(--surface-2)] p-3">
                <input
                  type="checkbox"
                  name="isPublic"
                  id="isPublic"
                  checked={form.isPublic as unknown as boolean}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-[var(--border)] accent-brand-800"
                />
                <div>
                  <label htmlFor="isPublic" className="text-sm font-medium text-[var(--text)] cursor-pointer">
                    List me in the public directory
                  </label>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Buyers outside Mdantsane will be able to find and contact you directly.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 justify-center py-3">
                  ← Back
                </button>
                <button type="submit" className="btn-primary flex-1 justify-center py-3">
                  Join SondelaBiz 🎉
                </button>
              </div>
            </>
          )}
        </form>

        <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
          Already have an account?{' '}
          <Link href="/network" className="text-brand-800 hover:underline">Sign in</Link>
        </p>
      </main>
    </>
  )
}
