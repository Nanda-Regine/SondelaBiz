import Link from 'next/link'
import { CATEGORIES } from '@/lib/types'

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h2 className="font-syne text-2xl font-bold text-[var(--text)]">Browse by Category</h2>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        From salons to plumbers — find exactly who you need in Mdantsane.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/directory?category=${cat.slug}`}
            className="group flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center transition hover:border-brand-400 hover:shadow-sm active:scale-95"
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className="text-sm font-medium text-[var(--text)] group-hover:text-brand-800 transition-colors">
              {cat.label}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{cat.description}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
