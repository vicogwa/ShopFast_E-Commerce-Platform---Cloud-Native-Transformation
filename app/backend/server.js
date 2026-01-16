import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config.js';
import pool from './config/db.js';
import redisClient from './config/redis.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Database connected at:', res.rows[0].now);
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    
    let redisStatus = 'disconnected';
    try {
      if (redisClient.isOpen) {
        await redisClient.ping();
        redisStatus = 'connected';
      }
    } catch (redisError) {
      console.error('Redis health check failed:', redisError.message);
    }
    
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      redis: redisStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Simple test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'ShopFast API is running!',
    version: '1.0.0',
    status: 'healthy'
  });
});

// PayPal config endpoint
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
