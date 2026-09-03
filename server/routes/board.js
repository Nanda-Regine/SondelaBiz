// ─────────────────────────────────────────────────────────────
//  Board routes — /api/board (I NEED / I OFFER)
//  Owner: Amahle Axola
// ─────────────────────────────────────────────────────────────

const express = require('express')
const db      = require('../db/connection')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

// ── GET /api/board — all active posts ─────────────────────────
router.get('/', async (req, res) => {
  const { type, limit = 20, offset = 0 } = req.query
  let sql = `
    SELECT p.*, b.name AS business_name, b.zone, b.trader_tier, b.category
    FROM board_posts p
    JOIN businesses b ON b.id = p.business_id
    WHERE p.is_active = TRUE AND p.deleted_at IS NULL AND b.deleted_at IS NULL`

  const params = []
  if (type === 'need' || type === 'offer') { sql += ' AND p.type = ?'; params.push(type) }
  sql += ' ORDER BY p.is_urgent DESC, p.created_at DESC LIMIT ? OFFSET ?'
  params.push(Number(limit), Number(offset))

  try {
    const [rows] = await db.execute(sql, params)
    res.json({ posts: rows })
  } catch (err) {
    console.error('GET /board error:', err)
    res.status(500).json({ error: 'Failed to fetch board posts' })
  }
})

// ── POST /api/board — create a new post (auth) ────────────────
router.post('/', requireAuth, async (req, res) => {
  const { type, title, description, budget, isUrgent } = req.body
  if (!type || !title) return res.status(400).json({ error: 'type and title are required' })
  try {
    const [result] = await db.execute(
      `INSERT INTO board_posts (business_id, type, title, description, budget, is_urgent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.business.id, type, title, description || null, budget || null, !!isUrgent]
    )
    res.status(201).json({ id: result.insertId, message: 'Post created' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' })
  }
})

// ── POST /api/board/:id/respond — respond to a post (auth) ────
router.post('/:id/respond', requireAuth, async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'Message is required' })

  try {
    const [posts] = await db.execute(
      'SELECT business_id, title FROM board_posts WHERE id = ? AND is_active = TRUE',
      [req.params.id]
    )
    if (posts.length === 0) return res.status(404).json({ error: 'Post not found' })
    if (posts[0].business_id === req.business.id)
      return res.status(400).json({ error: 'Cannot respond to your own post' })

    await db.execute(
      'INSERT INTO board_responses (post_id, business_id, message) VALUES (?, ?, ?)',
      [req.params.id, req.business.id, message]
    )
    await db.execute(
      'UPDATE board_posts SET response_count = response_count + 1 WHERE id = ?',
      [req.params.id]
    )

    // Auto-create a pending transaction (trade record)
    await db.execute(
      `INSERT INTO transactions (post_id, from_business_id, to_business_id, title, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [req.params.id, req.business.id, posts[0].business_id, posts[0].title]
    )

    res.status(201).json({ message: 'Response sent and trade initiated' })
  } catch (err) {
    console.error('POST /board/:id/respond error:', err)
    res.status(500).json({ error: 'Failed to send response' })
  }
})

// ── GET /api/board/transactions — my trades (auth) ────────────
router.get('/transactions', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT t.*, bf.name AS from_name, bt.name AS to_name
       FROM transactions t
       JOIN businesses bf ON bf.id = t.from_business_id
       JOIN businesses bt ON bt.id = t.to_business_id
       WHERE (t.from_business_id = ? OR t.to_business_id = ?)
         AND t.deleted_at IS NULL
       ORDER BY t.updated_at DESC`,
      [req.business.id, req.business.id]
    )
    res.json({ transactions: rows })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
})

// ── PATCH /api/board/transactions/:id — update trade status ───
router.patch('/transactions/:id', requireAuth, async (req, res) => {
  const { status, amount } = req.body
  const validStatuses = ['pending','negotiating','agreed','complete','cancelled']
  if (!validStatuses.includes(status))
    return res.status(400).json({ error: 'Invalid status' })

  try {
    await db.execute(
      `UPDATE transactions SET status = ?, amount = COALESCE(?, amount)
       WHERE id = ? AND (from_business_id = ? OR to_business_id = ?) AND deleted_at IS NULL`,
      [status, amount || null, req.params.id, req.business.id, req.business.id]
    )

    // When complete → increment completed_deals for both parties
    if (status === 'complete') {
      const [t] = await db.execute(
        'SELECT from_business_id, to_business_id FROM transactions WHERE id = ?',
        [req.params.id]
      )
      if (t.length) {
        await db.execute(
          'UPDATE businesses SET completed_deals = completed_deals + 1 WHERE id IN (?, ?)',
          [t[0].from_business_id, t[0].to_business_id]
        )
      }
    }

    res.json({ message: 'Trade updated' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update trade' })
  }
})

// ── Backward compat: /api/board/deals still works ─────────────
router.get('/deals',         requireAuth, (req, res) => res.redirect(307, '/api/board/transactions'))
router.patch('/deals/:id',   requireAuth, (req, res) => res.redirect(307, `/api/board/transactions/${req.params.id}`))

module.exports = router
