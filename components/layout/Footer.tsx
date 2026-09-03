import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-syne text-lg font-bold text-brand-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-800 text-xs text-white">S</span>
              SondelaBiz
            </div>
            <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
              The B2B network and public discovery platform for Mdantsane township businesses.
            </p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              Based in Mdantsane, Eastern Cape 🇿🇦
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Discover</h4>
            <ul className="space-y-2 text-sm text-[var(--text-2)]">
              <li><Link href="/directory" className="hover:text-brand-800 transition-colors">Business Directory</Link></li>
              <li><Link href="/directory?category=plumber" className="hover:text-brand-800 transition-colors">Plumbers</Link></li>
              <li><Link href="/directory?category=electrician" className="hover:text-brand-800 transition-colors">Electricians</Link></li>
              <li><Link href="/directory?category=salon" className="hover:text-brand-800 transition-colors">Salons</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">For Businesses</h4>
            <ul className="space-y-2 text-sm text-[var(--text-2)]">
              <li><Link href="/join" className="hover:text-brand-800 transition-colors">Join Free</Link></li>
              <li><Link href="/network" className="hover:text-brand-800 transition-colors">B2B Network</Link></li>
              <li><Link href="/network/board" className="hover:text-brand-800 transition-colors">Needs & Offers</Link></li>
              <li><Link href="/pitch" className="hover:text-brand-800 transition-colors">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Trusted Trader</h4>
            <ul className="space-y-1.5 text-sm text-[var(--text-2)]">
              <li className="flex items-center gap-2"><span className="text-gray-400">●</span> New Trader</li>
              <li className="flex items-center gap-2"><span className="text-tier-bronze">●</span> Bronze (5+ deals)</li>
              <li className="flex items-center gap-2"><span className="text-tier-silver">●</span> Silver (20+ deals)</li>
              <li className="flex items-center gap-2"><span className="text-tier-gold">●</span> Gold (50+ deals)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 SondelaBiz. Built with ❤️ in Mdantsane.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Low-data friendly · WhatsApp-first · Mobile web
          </p>
        </div>
      </div>
    </footer>
  )
}
