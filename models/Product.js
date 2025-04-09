const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  brandname: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  sizes: [{ type: String }],
  color: [{ type: String }]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
