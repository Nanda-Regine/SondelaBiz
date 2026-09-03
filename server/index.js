// ─────────────────────────────────────────────────────────────
//  SondelaBiz — Express server entry point
//  Owner: Lekgothe Ngoepe (deploy) + Lindokuhle Ntuli (arch)
//
//  Start:  npm run dev   (nodemon, auto-restart)
//  Prod:   npm start
// ─────────────────────────────────────────────────────────────

require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const app  = express()
const PORT = process.env.PORT || 3000

// ── Middleware ────────────────────────────────────────────────
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Serve static frontend files ───────────────────────────────
// All HTML/CSS/JS lives in /public
app.use(express.static(path.join(__dirname, '..', 'public')))

// ── API routes ────────────────────────────────────────────────
app.use('/api/auth',       require('./routes/auth'))
app.use('/api/businesses', require('./routes/businesses'))
app.use('/api/board',      require('./routes/board'))

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// ── Catch-all: serve index.html for SPA-style navigation ──────
// Any unknown route → serve the frontend (client handles it)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// ── Error handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🟢  SondelaBiz server running`)
  console.log(`    Local:   http://localhost:${PORT}`)
  console.log(`    Env:     ${process.env.NODE_ENV || 'development'}\n`)
})

module.exports = app
