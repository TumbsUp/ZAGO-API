const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema(
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
  { timestamps: true } // adds createdAt and updatedAt automatically
)

module.exports = mongoose.model('Foods', FoodSchema)