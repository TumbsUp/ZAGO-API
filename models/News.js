const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
  {
    id:    { type: String, required: true },
    title: { type: String, required: true },
    description:  { type: String, required: true },
    image:  { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('News', NewsSchema)