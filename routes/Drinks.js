const express = require('express')
const router  = express.Router()
const Drinks = require('../models/Drinks')
const auth = require('../middleware/auth')

// GET ALL — /api/drinks
router.get('/', async (req, res) => {
  try {
    const items = await Drinks.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET ONE — /api/drinks/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Drinks.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE — /api/drinks
router.post('/', auth,  async (req, res) => {
  try {
    const item = new Drinks(req.body)
    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE — /api/drinks/:id
router.put('/:id', auth,  async (req, res) => {
  try {
    const updated = await Drinks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // 'new' returns the updated doc
    )
    if (!updated) return res.status(404).json({ error: 'Item not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE — /api/drinks/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Drinks.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Item not found' })
    res.json({ message: 'Item deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router