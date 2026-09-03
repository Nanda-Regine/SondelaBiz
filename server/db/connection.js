// ─────────────────────────────────────────────────────────────
//  MySQL connection pool
//  All DB queries go through this pool — never create new
//  connections directly; pooling handles concurrency safely.
// ─────────────────────────────────────────────────────────────

require('dotenv').config()
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'sondela_biz',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  charset:            'utf8mb4',
})

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅  MySQL connected to:', process.env.DB_NAME || 'sondela_biz')
    conn.release()
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message)
    console.error('    Check your .env file and that MySQL is running.')
  })

module.exports = pool
