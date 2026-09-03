import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

// ── Fonts ──────────────────────────────────────────────────────
// Syne: used for brand headings and display text
// DM Sans: clean, legible body text optimised for screens
const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// ── Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'SondelaBiz — Mdantsane Business Network',
    template: '%s | SondelaBiz',
  },
  description:
    'Connect, discover, and trade with businesses in Mdantsane. The B2B network and public discovery platform built for the township economy.',
  keywords: ['Mdantsane', 'business', 'township', 'B2B', 'Eastern Cape', 'South Africa', 'SME'],
  openGraph: {
    title: 'SondelaBiz',
    description: 'The Mdantsane business network',
    type: 'website',
  },
}

// ── Root Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
