const express = require('express')
const router = express.Router()
const { addProduct, getProductList, getProductDetails, filterProduct } = require('../controllers/productController')
const verifyToken = require('../middleware/verifyToken')

router.post('/add', verifyToken, addProduct)
router.get('/list', getProductList)
router.get('/details/:id', getProductDetails)
router.get('/filter', filterProduct)

module.exports = router
