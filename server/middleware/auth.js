const jwt = require('jsonwebtoken')

// Protect routes — attach business info to req.business
function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  const token = header.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.business = { id: payload.id, name: payload.name, tier: payload.tier }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = { requireAuth }
