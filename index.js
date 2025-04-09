const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
