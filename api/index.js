// api/index.js

const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

// Load env vars and connect DB
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');

// Routes (no `/api` prefix!)
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Vercel needs a default export of the handler
module.exports = serverless(app);
