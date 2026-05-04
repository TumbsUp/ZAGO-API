const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  // Token must be sent in the Authorization header as: Bearer <token>
  const authHeader = req.headers['authorization']
  const token      = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded  // attaches { id, email, role } to every protected request
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' })
  }
}

module.exports = auth