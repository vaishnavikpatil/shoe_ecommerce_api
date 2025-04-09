// api/index.js

const express = require('express')
const serverless = require('serverless-http')
const dotenv = require('dotenv')
const connectDB = require('../config/db')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

const authRoutes = require('../routes/authRoutes')
const productRoutes = require('../routes/productRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// Export the app wrapped in serverless-http
module.exports = serverless(app)
