// ─────────────────────────────────────────────────────────────
//  Businesses routes — /api/businesses
//  Owner: Siyamthanda Ndabeni (public routes)
//         Amahle Axola (protected routes)
// ─────────────────────────────────────────────────────────────

const express = require('express')
const db      = require('../db/connection')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

// ── GET /api/businesses — public directory ────────────────────
router.get('/', async (req, res) => {
  const { q, category, zone, limit = 20, offset = 0 } = req.query

  let sql = `
    SELECT b.id, b.name, b.category, b.zone, b.tagline,
           b.rating, b.review_count, b.trader_tier, b.pricing_tier,
           b.verified, b.is_public, b.whatsapp, b.phone, b.email, b.address,
           b.completed_deals, b.created_at
    FROM businesses b
    WHERE b.is_public = TRUE AND b.deleted_at IS NULL`

  const params = []
  if (category) { sql += ' AND b.category = ?'; params.push(category) }
  if (zone)     { sql += ' AND b.zone = ?';     params.push(zone) }
  if (q) {
    sql += ' AND MATCH(b.name, b.tagline, b.description) AGAINST(? IN BOOLEAN MODE)'
    params.push(`${q}*`)
  }

  sql += ' ORDER BY b.pricing_tier = "featured" DESC, b.trader_tier DESC, b.rating DESC'
  sql += ' LIMIT ? OFFSET ?'
  params.push(Number(limit), Number(offset))

  try {
    const [rows] = await db.execute(sql, params)

    // Attach offers for each business (from `offers` table)
    if (rows.length > 0) {
      const ids = rows.map(r => r.id)
      const placeholders = ids.map(() => '?').join(',')
      const [offerRows] = await db.execute(
        `SELECT business_id, offer_text FROM offers WHERE business_id IN (${placeholders})`,
        ids
      )
      const offerMap = {}
      offerRows.forEach(o => {
        if (!offerMap[o.business_id]) offerMap[o.business_id] = []
        offerMap[o.business_id].push(o.offer_text)
      })
      rows.forEach(r => { r.offers = offerMap[r.id] || [] })
    }

    res.json({ businesses: rows, total: rows.length })
  } catch (err) {
    console.error('GET /businesses error:', err)
    res.status(500).json({ error: 'Failed to fetch businesses' })
  }
})

// ── GET /api/businesses/:id — public profile ──────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT b.*,
              GROUP_CONCAT(DISTINCT o.offer_text ORDER BY o.id SEPARATOR '||') AS offers_raw,
              GROUP_CONCAT(DISTINCT rq.title     ORDER BY rq.id SEPARATOR '||') AS needs_raw
       FROM businesses b
       LEFT JOIN offers   o  ON o.business_id  = b.id
       LEFT JOIN requests rq ON rq.business_id = b.id
       WHERE b.id = ? AND b.is_public = TRUE AND b.deleted_at IS NULL
       GROUP BY b.id`,
      [req.params.id]
    )
    if (rows.length === 0) return res.status(404).json({ error: 'Business not found' })

    const biz = rows[0]
    delete biz.password_hash
    biz.offers = biz.offers_raw ? biz.offers_raw.split('||') : []
    biz.needs  = biz.needs_raw  ? biz.needs_raw.split('||')  : []
    delete biz.offers_raw
    delete biz.needs_raw

    // Reviews
    const [reviews] = await db.execute(
      `SELECT r.*, b.name AS author_name
       FROM reviews r
       JOIN businesses b ON b.id = r.author_business_id
       WHERE r.business_id = ?
       ORDER BY r.created_at DESC LIMIT 10`,
      [req.params.id]
    )
    biz.reviews = reviews

    res.json(biz)
  } catch (err) {
    console.error('GET /businesses/:id error:', err)
    res.status(500).json({ error: 'Failed to fetch business' })
  }
})

// ── GET /api/businesses/me/profile — my profile (auth) ────────
router.get('/me/profile', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT b.*,
              GROUP_CONCAT(DISTINCT o.offer_text SEPARATOR '||')  AS offers_raw,
              GROUP_CONCAT(DISTINCT rq.title     SEPARATOR '||')  AS needs_raw
       FROM businesses b
       LEFT JOIN offers   o  ON o.business_id  = b.id
       LEFT JOIN requests rq ON rq.business_id = b.id
       WHERE b.id = ? AND b.deleted_at IS NULL GROUP BY b.id`,
      [req.business.id]
    )
    if (rows.length === 0) return res.status(404).json({ error: 'Business not found' })
    const biz = rows[0]
    delete biz.password_hash
    biz.offers = biz.offers_raw ? biz.offers_raw.split('||') : []
    biz.needs  = biz.needs_raw  ? biz.needs_raw.split('||')  : []
    delete biz.offers_raw
    delete biz.needs_raw
    res.json(biz)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

// ── POST /api/businesses/review/:id — leave a review ──────────
router.post('/review/:id', requireAuth, async (req, res) => {
  const { rating, comment, transactionId } = req.body
  if (!rating || rating < 1 || rating > 5)
    return res.status(400).json({ error: 'Rating must be 1–5' })
  if (req.params.id == req.business.id)
    return res.status(400).json({ error: 'You cannot review your own business' })
  try {
    await db.execute(
      `INSERT INTO reviews (business_id, author_business_id, transaction_id, rating, comment)
       VALUES (?, ?, ?, ?, ?)`,
      [req.params.id, req.business.id, transactionId || null, rating, comment || null]
    )
    res.status(201).json({ message: 'Review submitted' })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ error: 'You already reviewed this business for this trade' })
    res.status(500).json({ error: 'Failed to submit review' })
  }
})

module.exports = router
