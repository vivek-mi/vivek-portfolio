const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');

const app = express();

// Behind Vercel's proxy: needed so rate limiting sees the real client IP
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS (only matters in local dev, where the site and API are on different ports; on Vercel they share a domain)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Parse JSON
app.use(express.json({ limit: '10kb' }));

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not connected',
    timestamp: new Date().toISOString(),
  });
});

// Centralised error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Serverless instances are reused between requests, so connect once and share the promise
let connecting;
function connectDb() {
  if (!process.env.MONGODB_URI || mongoose.connection.readyState === 1) return Promise.resolve();
  connecting ??= mongoose
    .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
    .catch((err) => {
      connecting = undefined;
      throw err;
    });
  return connecting;
}

module.exports = { app, connectDb };
