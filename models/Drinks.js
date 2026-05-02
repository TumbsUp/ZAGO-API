const mongoose = require('mongoose')

const DrinkSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    price:       { type: String, required: true },
    img:         { type: String, required: true },
    description: { type: String, required: true },
    category:    { type: String, required: true },
    prepTime:    { type: String, required: true },
    serves:      { type: String, required: true },
    ingredients: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Drinks', DrinkSchema)