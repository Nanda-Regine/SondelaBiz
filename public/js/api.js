// ─────────────────────────────────────────────────────────────
//  SondelaBiz — API client
//  All calls go through here. Falls back to DEMO_MODE if server
//  is unavailable (e.g., during hackathon demo without MySQL).
// ─────────────────────────────────────────────────────────────

const BASE = '/api'

// ── Auth helpers ──────────────────────────────────────────────
function getToken() { return localStorage.getItem('sb_token') }
function setToken(t) { t ? localStorage.setItem('sb_token', t) : localStorage.removeItem('sb_token') }
function getMe()    { try { return JSON.parse(localStorage.getItem('sb_me') || 'null') } catch { return null } }
function setMe(u)   { u ? localStorage.setItem('sb_me', JSON.stringify(u)) : localStorage.removeItem('sb_me') }
function isLoggedIn() { return !!getToken() }

function authHeaders() {
  const t = getToken()
  return t ? { 'Authorization': `Bearer ${t}`, 'Content-Type': 'application/json' }
           : { 'Content-Type': 'application/json' }
}

// ── Core fetch wrapper ─────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: authHeaders(),
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status })
  return data
}

// ── Auth ──────────────────────────────────────────────────────
const Auth = {
  async login(whatsapp, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ whatsapp, password }),
    })
    setToken(data.token)
    setMe(data.business)
    return data
  },
  async register(payload) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    setToken(data.token)
    setMe(data.business)
    return data
  },
  logout() {
    setToken(null)
    setMe(null)
    window.location.href = '/'
  },
}

// ── Businesses ────────────────────────────────────────────────
const Businesses = {
  list(params = {}) {
    const qs = new URLSearchParams(params).toString()
    return apiFetch(`/businesses${qs ? '?' + qs : ''}`)
  },
  get(id) { return apiFetch(`/businesses/${id}`) },
  me()    { return apiFetch('/businesses/me/profile') },
  review(id, payload) {
    return apiFetch(`/businesses/review/${id}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}

// ── Board ─────────────────────────────────────────────────────
const Board = {
  list(params = {}) {
    const qs = new URLSearchParams(params).toString()
    return apiFetch(`/board${qs ? '?' + qs : ''}`)
  },
  create(payload) {
    return apiFetch('/board', { method: 'POST', body: JSON.stringify(payload) })
  },
  respond(postId, message) {
    return apiFetch(`/board/${postId}/respond`, { method: 'POST', body: JSON.stringify({ message }) })
  },
  myPosts()       { return apiFetch('/board/my-posts') },
  deletePost(id)  { return apiFetch(`/board/${id}`, { method: 'DELETE' }) },
  transactions()  { return apiFetch('/board/transactions') },
  updateTransaction(id, status, amount) {
    return apiFetch(`/board/transactions/${id}`, { method: 'PATCH', body: JSON.stringify({ status, amount }) })
  },
  // backward compat aliases
  deals()         { return this.transactions() },
  updateDeal(id, status) { return this.updateTransaction(id, status) },
}

// ── Businesses — add profile update ───────────────────────────
Object.assign(Businesses, {
  updateProfile(payload) {
    return apiFetch('/businesses/me/profile', { method: 'PUT', body: JSON.stringify(payload) })
  },
})

export { Auth, Businesses, Board, isLoggedIn, getMe, getToken, setToken, setMe }
