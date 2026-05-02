const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    img1: { type: String, required: true },
    img2: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('News', NewsSchema)