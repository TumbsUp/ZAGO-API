const express = require('express')
const router  = express.Router()
const News    = require('../models/News')
const auth = require('../middleware/auth')

// GET ALL — /api/news
router.get('/', async (req, res) => {
  try {
    const items = await News.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET ONE — /api/news/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await News.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE — /api/news
router.post('/', auth, async (req, res) => {
  try {
    const item = new News(req.body)
    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE — /api/news/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(
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
    const deleted = await News.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Item not found' })
    res.json({ message: 'Item deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router