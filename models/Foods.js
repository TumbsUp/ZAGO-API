const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema(
  {
    id:          { type: String, required: true },
    name:        { type: String, required: true },
    price:       { type: Number, required: true },
    img:         { type: String, required: true }, 
    description: { type: String, required: true },
    category:    { type: [String], required: true }, // Array of categories for the dish
    prepTime:    { type: Number, required: true },
    serves:      { type: Number, required: true },
    ingredients: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
)

module.exports = mongoose.model('Foods', FoodSchema)