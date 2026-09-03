// ─────────────────────────────────────────────────────────────
//  Auth routes — /api/auth
//  Owner: Lindokuhle Ntuli
// ─────────────────────────────────────────────────────────────

const express  = require('express')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const db       = require('../db/connection')

const router = express.Router()

// ── POST /api/auth/register ───────────────────────────────────
router.post('/register',
  body('name').trim().notEmpty().withMessage('Business name required'),
  body('category').notEmpty(),
  body('zone').notEmpty(),
  body('whatsapp').notEmpty(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, category, zone, tagline, description, phone, whatsapp, email, address, password, isPublic } = req.body

    try {
      // Check if whatsapp already registered
      const [existing] = await db.execute(
        'SELECT id FROM businesses WHERE whatsapp = ?', [whatsapp]
      )
      if (existing.length > 0) {
        return res.status(409).json({ error: 'A business with this WhatsApp number already exists' })
      }

      const passwordHash = await bcrypt.hash(password, 12)
      const [result] = await db.execute(
        `INSERT INTO businesses
          (name, category, zone, tagline, description, phone, whatsapp, email, address, password_hash, is_public)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, category, zone, tagline || null, description || null,
         phone || null, whatsapp, email || null, address || null, passwordHash, isPublic !== false]
      )

      const businessId = result.insertId
      const token = jwt.sign(
        { id: businessId, name, tier: 'new' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      )

      res.status(201).json({ token, business: { id: businessId, name, tier: 'new' } })
    } catch (err) {
      console.error('Register error:', err)
      res.status(500).json({ error: 'Registration failed. Please try again.' })
    }
  }
)

// ── POST /api/auth/login ──────────────────────────────────────
router.post('/login',
  body('whatsapp').notEmpty(),
  body('password').notEmpty(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { whatsapp, password } = req.body

    try {
      const [rows] = await db.execute(
        'SELECT id, name, trader_tier, password_hash FROM businesses WHERE whatsapp = ?',
        [whatsapp]
      )

      if (rows.length === 0) {
        return res.status(401).json({ error: 'No account found with this WhatsApp number' })
      }

      const business = rows[0]
      const valid = await bcrypt.compare(password, business.password_hash)
      if (!valid) {
        return res.status(401).json({ error: 'Incorrect password' })
      }

      const token = jwt.sign(
        { id: business.id, name: business.name, tier: business.trader_tier },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      )

      res.json({ token, business: { id: business.id, name: business.name, tier: business.trader_tier } })
    } catch (err) {
      console.error('Login error:', err)
      res.status(500).json({ error: 'Login failed. Please try again.' })
    }
  }
)

module.exports = router
