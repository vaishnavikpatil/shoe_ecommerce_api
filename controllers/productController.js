const Product = require('../models/Product')
const { validateProduct } = require('../utils/validators')

// Add a new product
const addProduct = async (req, res) => {
  const error = validateProduct(req.body)
  if (error) return res.status(400).json({ message: 'Validation failed', data: error })

  const {
    name, description, brandname, price, images, sizes, color,
    category, stock, ratings, discount, isFeatured, isActive,
    isPopular, isNew, createdBy
  } = req.body

  const product = await Product.create({
    name, description, brandname, price, images, sizes, color,
    category, stock, ratings, discount, isFeatured, isActive,
    isPopular, isNew, createdBy
  })

  res.status(201).json({
    message: 'Product added successfully',
    data: { productId: product._id }
  })
}

// Get all products
const getProductList = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({
    message: 'Product list retrieved successfully',
    data: products
  })
}

// Get product details
const getProductDetails = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) return res.status(404).json({ message: 'Product not found', data: {} })

  res.status(200).json({
    message: 'Product details retrieved successfully',
    data: product
  })
}

// Filter & sort products
const filterProduct = async (req, res) => {
  const query = {}

  if (req.query.brandname) query.brandname = req.query.brandname
  if (req.query.size) query.sizes = req.query.size
  if (req.query.color) query.color = req.query.color
  if (req.query.category) query.category = req.query.category
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {}
    if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice)
    if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice)
  }
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' }
  }

  const sort = {}
  if (req.query.sortBy) {
    if (req.query.sortBy === 'priceAsc') sort.price = 1
    else if (req.query.sortBy === 'priceDesc') sort.price = -1
  }

  try {
    const products = await Product.find(query).sort(sort)
    res.status(200).json({
      message: 'Filtered and sorted products retrieved successfully',
      data: products
    })
  } catch (error) {
    console.error("Error filtering products:", error)
    res.status(500).json({
      message: 'Error retrieving filtered products',
      data: error.message
    })
  }
}

// Get popular products
const getPopularProducts = async (req, res) => {
  const products = await Product.find({ isPopular: true })
  res.status(200).json({
    message: 'Popular products retrieved successfully',
    data: products
  })
}

// Get new arrival products
const getNewArrivals = async (req, res) => {
  const products = await Product.find({ isNew: true })
  res.status(200).json({
    message: 'New arrival products retrieved successfully',
    data: products
  })
}

module.exports = {
  addProduct,
  getProductList,
  getProductDetails,
  filterProduct,
  getPopularProducts,
  getNewArrivals
}
