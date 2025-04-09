// api/index.js

const express = require('express')
const serverless = require('serverless-http')
const dotenv = require('dotenv')
const connectDB = require('../config/db')


dotenv.config()
connectDB()

const app = express()
app.use(express.json())

// Import your routes
const authRoutes = require('../routes/authRoutes')
const productRoutes = require('../routes/productRoutes')

// Mount routes (NO "/api" prefix here, Vercel adds it automatically)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)

// Export handler for Vercel
module.exports = serverless(app)
