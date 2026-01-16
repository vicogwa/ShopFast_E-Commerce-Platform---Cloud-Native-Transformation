const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/database.cjs');
const redisClient = require('./config/redis.cjs');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check database
    await pool.query('SELECT 1');
    
    // Check Redis
    redisClient.ping((err, result) => {
      if (err) {
        return res.status(500).json({ 
          status: 'error', 
          message: 'Redis not available' 
        });
      }
      
      res.status(200).json({ 
        status: 'ok', 
        database: 'connected',
        redis: 'connected',
        timestamp: new Date().toISOString()
      });
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database not available',
      error: error.message 
    });
  }
});

// API routes
app.use('/api/users', require('./routes/userRoute.cjs'));
app.use('/api/products', require('./routes/productRoute.cjs'));
app.use('/api/orders', require('./routes/orderRoute.cjs'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});
