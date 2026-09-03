import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── SondelaBiz brand palette ──────────────────────────────
        brand: {
          950:  '#052E16',
          900:  '#0D3320',
          800:  '#1A5C38',   // ← primary brand green
          600:  '#2D8A5A',
          400:  '#6DB893',
          200:  '#A7D9BE',
          50:   '#E8F5EE',
        },
        amber: {
          DEFAULT: '#E8A020',  // ← ubuntu amber
          light:   '#FEF3C7',
        },
        // Trusted Trader tier colours
        tier: {
          bronze: '#CD7F32',
          silver: '#9CA3AF',
          gold:   '#F59E0B',
        },
      },
      fontFamily: {
        syne:  ['var(--font-syne)',    'system-ui', 'sans-serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)',    'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
