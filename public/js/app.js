// ─────────────────────────────────────────────────────────────
//  SondelaBiz — shared app utilities
//  Motion One animations + mock data + helpers
// ─────────────────────────────────────────────────────────────

// ── DEMO_MODE: true = use mock data (no server needed) ────────
//  Auto-detected at runtime. Starts true, flipped to false if
//  the Express server responds on /api/health.
window.DEMO_MODE = true

// ── Server auto-detection ─────────────────────────────────────
//  Ping /api/health with a 2-second timeout.
//  Pages await window.serverCheck before loading data so they
//  know whether to use mock data or the real API.
window.serverCheck = fetch('/api/health', {
  signal: AbortSignal.timeout(2000),
  cache:  'no-store',
}).then(r => {
  if (r.ok) {
    window.DEMO_MODE = false
    console.log('[SondelaBiz] ✓ Server online — using real API')
  }
}).catch(() => {
  console.log('[SondelaBiz] ℹ Server not reachable — demo mode')
})

// ── Mock data for hackathon demo ──────────────────────────────
window.MOCK_BUSINESSES = [
  {
    id: 1, name: "Mama Thandiwe's Salon", category: 'salon', zone: 'Unit 4',
    tagline: '10 years of beautiful hair in Mdantsane',
    whatsapp: '27641234567', phone: '064 123 4567', address: 'Unit 4, near Spar',
    trader_tier: 'gold', rating: 4.9, review_count: 62, completed_deals: 74,
    verified: true, is_public: true, pricing_tier: 'featured',
    offers: ['Hair styling', 'Braiding', 'Nails', 'Relaxer', 'Weaves'],
    needs: ['Quality hair extensions', 'Part-time nail technician'],
    icon: '✂️'
  },
  {
    id: 2, name: 'Mthembeni Plumbing', category: 'plumber', zone: 'Unit 2',
    tagline: 'Fast, reliable — any zone, same day',
    whatsapp: '27714567890', phone: '071 456 7890', address: 'Unit 2, township-wide',
    trader_tier: 'silver', rating: 4.7, review_count: 38, completed_deals: 41,
    verified: true, is_public: true, pricing_tier: 'premium',
    offers: ['Leak repairs', 'Pipe installations', 'Toilet & basin', 'Geyser service'],
    needs: ['Pipe fittings supplier', 'Helper/apprentice'],
    icon: '🔧'
  },
  {
    id: 3, name: 'Bright Sparks Electrical', category: 'electrician', zone: 'Unit 5',
    tagline: 'COC certificates, DB boards, fault finding',
    whatsapp: '27827890123', phone: '082 789 0123', address: 'Unit 5',
    trader_tier: 'silver', rating: 4.8, review_count: 29, completed_deals: 35,
    verified: true, is_public: true, pricing_tier: 'free',
    offers: ['COC certificates', 'DB board upgrades', 'Rewiring', 'Fault finding'],
    needs: ['Reliable cable supplier'],
    icon: '⚡'
  },
  {
    id: 4, name: 'KasiGarage — Luvo Motors', category: 'mechanic', zone: 'Unit 3',
    tagline: 'Full mechanical service, no dealership prices',
    whatsapp: '27603216543', phone: '060 321 6543', address: 'Unit 3, behind primary school',
    trader_tier: 'gold', rating: 4.6, review_count: 55, completed_deals: 91,
    verified: true, is_public: true, pricing_tier: 'featured',
    offers: ['Engine repairs', 'Brake pads & discs', 'Clutch kits', 'OBD diagnostics'],
    needs: ['Spare parts supplier'],
    icon: '🚗'
  },
  {
    id: 5, name: "Mama Ntombi's Fresh Produce", category: 'vendor', zone: 'Unit 2 Hi-Way',
    tagline: 'Daily fresh veg, fruits & spices at the Hi-Way',
    whatsapp: '27786543210', phone: '078 654 3210', address: 'Hi-Way market stall 14',
    trader_tier: 'gold', rating: 4.5, review_count: 103, completed_deals: 58,
    verified: false, is_public: true, pricing_tier: 'premium',
    offers: ['Fresh vegetables', 'Seasonal fruits', 'Traditional spices', 'Bulk orders'],
    needs: ['Reliable transport', 'Refrigeration unit'],
    icon: '🌽'
  },
  {
    id: 6, name: 'Xhosa Flavours Catering', category: 'catering', zone: 'Unit 12',
    tagline: 'Traditional Xhosa cuisine for any occasion',
    whatsapp: '27649998877', phone: '064 999 8877', address: 'Unit 12',
    trader_tier: 'silver', rating: 4.7, review_count: 34, completed_deals: 27,
    verified: true, is_public: true, pricing_tier: 'free',
    offers: ['Full event catering', 'Traditional meals', 'Equipment hire', 'Waitstaff'],
    needs: ['Reliable meat supplier', 'Large pots'],
    icon: '🍖'
  },
]

window.MOCK_BOARD = [
  { id: 1, type: 'need', title: 'Need 50+ braiding clients referred this month', description: 'Running a special — R80 braids all month. Any salon or beautician that sends us clients gets a R15 referral fee.', business_name: "Mama Thandiwe's Salon", zone: 'Unit 4', trader_tier: 'gold', is_urgent: true, response_count: 3 },
  { id: 2, type: 'offer', title: 'Plumbing geyser specials — bulk booking discount', description: 'Booking 3+ geyser services this week. R800 per unit includes parts. Can chain same-day runs.', business_name: 'Mthembeni Plumbing', zone: 'Unit 2', trader_tier: 'silver', is_urgent: false, response_count: 1 },
  { id: 3, type: 'need', title: 'Looking for reliable Friday/Saturday staff', description: 'Catering event at Mdantsane Civic Centre next month. Need 4 waitstaff + 1 chef assistant. Day rate negotiable.', business_name: 'Xhosa Flavours Catering', zone: 'Unit 12', trader_tier: 'silver', is_urgent: true, response_count: 5 },
  { id: 4, type: 'offer', title: 'Wholesale fresh produce — minimum R500 order', description: 'Supplying restaurants, caterers and spaza shops. Potatoes, onions, tomatoes, spinach. Delivery within Mdantsane.', business_name: "Mama Ntombi's Fresh Produce", zone: 'Hi-Way', trader_tier: 'gold', is_urgent: false, response_count: 7 },
]

// ── Category config ───────────────────────────────────────────
window.CATEGORIES = [
  { id: 'salon',       label: 'Hair & Beauty',    icon: '✂️',  color: 'fuchsia' },
  { id: 'plumber',     label: 'Plumbing',          icon: '🔧',  color: 'cobalt' },
  { id: 'electrician', label: 'Electrical',        icon: '⚡',  color: 'volt' },
  { id: 'mechanic',    label: 'Auto & Mechanics',  icon: '🚗',  color: 'cobalt' },
  { id: 'vendor',      label: 'Fresh Produce',     icon: '🌽',  color: 'lime' },
  { id: 'catering',    label: 'Catering',          icon: '🍖',  color: 'crimson' },
  { id: 'retail',      label: 'Retail & Spaza',    icon: '🏪',  color: 'sienna' },
  { id: 'transport',   label: 'Transport',         icon: '🚐',  color: 'fuchsia' },
]

// ── Render helpers ────────────────────────────────────────────
function tierLabel(tier) {
  const map = { new: 'New Trader', bronze: '🥉 Bronze', silver: '🥈 Silver', gold: '🥇 Gold' }
  return map[tier] || 'New Trader'
}

function renderStars(rating) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

function renderBizCard(biz) {
  const tier = biz.trader_tier || 'new'
  return `
    <article class="biz-card" onclick="window.location.href='directory.html?id=${biz.id}'">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <div class="biz-card-icon">${biz.icon || categoryIcon(biz.category)}</div>
        <div>
          <div class="biz-card-name">${biz.name}</div>
          <div class="biz-card-meta">${biz.zone}</div>
        </div>
      </div>
      <div class="biz-card-tagline">${biz.tagline}</div>
      ${biz.offers?.length ? `<div class="biz-card-tags">${biz.offers.slice(0,3).map(o => `<span class="badge badge-muted">${o}</span>`).join('')}</div>` : ''}
      <div class="biz-card-footer">
        <span class="badge tier-${tier}">${tierLabel(tier)}</span>
        <div class="rating" style="margin-left:auto">
          <span class="rating-stars">${renderStars(biz.rating)}</span>
          <span>${biz.rating.toFixed(1)} (${biz.review_count})</span>
        </div>
      </div>
      <a href="https://wa.me/${biz.whatsapp}" target="_blank" rel="noopener"
         class="btn btn-wa btn-sm" style="margin-top:0.25rem"
         onclick="event.stopPropagation()">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </article>`
}

function categoryIcon(cat) {
  const map = { salon: '✂️', plumber: '🔧', electrician: '⚡', mechanic: '🚗', vendor: '🌽', catering: '🍖', retail: '🏪', transport: '🚐' }
  return map[cat] || '🏢'
}

window.renderBizCard = renderBizCard
window.tierLabel = tierLabel
window.renderStars = renderStars
window.categoryIcon = categoryIcon

// ── Toast ─────────────────────────────────────────────────────
function toast(msg, duration = 3000) {
  let el = document.getElementById('toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'toast'
    document.body.appendChild(el)
  }
  el.textContent = msg
  el.classList.add('show')
  setTimeout(() => el.classList.remove('show'), duration)
}
window.toast = toast

// ── Scroll-reveal animation setup ─────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.parentElement?.querySelectorAll('[data-anim]')
        let delay = 0
        if (siblings) {
          Array.from(siblings).forEach((el, idx) => {
            if (el === entry.target) delay = idx * 80
          })
        }
        setTimeout(() => entry.target.classList.add('visible'), delay)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el))
}

// ── Navbar scroll effect ───────────────────────────────────────
function initNavbar() {
  const nav = document.querySelector('.navbar')
  if (!nav) return
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20)
  }, { passive: true })
}

// ── Active nav link ───────────────────────────────────────────
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || ''
    if (href === page || (page === 'index.html' && href === '/') || href.includes(page.replace('.html', ''))) {
      a.classList.add('active')
    }
  })
}

// ── Auth nav state ─────────────────────────────────────────────
function initAuthNav() {
  const loggedIn = !!localStorage.getItem('sb_token')
  const loginBtn = document.getElementById('nav-login')
  const dashBtn  = document.getElementById('nav-dashboard')
  if (loginBtn)  loginBtn.style.display  = loggedIn ? 'none' : ''
  if (dashBtn)   dashBtn.style.display   = loggedIn ? '' : 'none'
}

// ── Motion One card entrance (if Motion is loaded) ────────────
function animateCards(selector = '.biz-card') {
  if (!window.Motion) return
  const { animate, stagger } = window.Motion
  const cards = document.querySelectorAll(selector)
  if (!cards.length) return
  animate(cards, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: stagger(0.06), easing: 'ease-out' })
}
window.animateCards = animateCards

// ── Ticker counter ────────────────────────────────────────────
function animateCounter(el, end, duration = 1500) {
  const start = 0
  const startTime = performance.now()
  function update(t) {
    const elapsed = t - startTime
    const progress = Math.min(elapsed / duration, 1)
    const value = Math.round(start + (end - start) * easeOut(progress))
    el.textContent = value.toLocaleString()
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
function easeOut(t) { return 1 - Math.pow(1 - t, 3) }
window.animateCounter = animateCounter

// ── Init all ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initActiveNav()
  initAuthNav()
  // Delay scroll-reveal until page paints
  requestAnimationFrame(initScrollReveal)
})
