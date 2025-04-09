const Product = require('../models/Product')
const { validateProduct } = require('../utils/validators')

const addProduct = async (req, res) => {
  const error = validateProduct(req.body)
  if (error) return res.status(400).json({ error })

  const { name, description, brandname, price, images, sizes, color } = req.body

  const product = await Product.create({ name, description, brandname, price, images, sizes, color })

  res.status(201).json({
    message: 'Product added successfully',
    productId: product._id
  })
}

const getProductList = async (req, res) => {
  const products = await Product.find({}, 'name brandname price')
  const formatted = products.map(p => ({
    productId: p._id,
    name: p.name,
    brandname: p.brandname,
    price: p.price
  }))
  res.status(200).json(formatted)
}

const getProductDetails = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) return res.status(404).json({ error: 'Product not found' })

  res.status(200).json({
    productId: product._id,
    name: product.name,
    description: product.description,
    brandname: product.brandname,
    price: product.price,
    images: product.images,
    sizes: product.sizes,
    color: product.color
  })
}

const filterProduct = async (req, res) => {
  const query = {}

  if (req.query.brandname) query.brandname = req.query.brandname
  if (req.query.size) query.sizes = req.query.size
  if (req.query.color) query.color = req.query.color
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {}
    if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice)
    if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice)
  }

  const products = await Product.find(query, 'name brandname price')
  const formatted = products.map(p => ({
    productId: p._id,
    name: p.name,
    brandname: p.brandname,
    price: p.price
  }))
  res.status(200).json(formatted)
}

module.exports = { addProduct, getProductList, getProductDetails, filterProduct }
