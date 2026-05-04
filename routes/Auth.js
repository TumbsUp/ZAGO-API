const express  = require('express')
const router   = express.Router()
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const User     = require('../models/Users')

// ── REGISTER — POST /auth/register ───────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if email is already taken
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ error: 'Este correo ya está registrado.' })
    }

    // Hash the password — 10 salt rounds is the recommended default
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'Usuario creado exitosamente.' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── LOGIN — POST /auth/login ─────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos.' })
    }

    // Compare submitted password against stored hash
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos.' })
    }

    // Generate token — expires in 15 minutes
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )

    res.json({
      token,
      user: {
        email: user.email,
        role:  user.role,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router