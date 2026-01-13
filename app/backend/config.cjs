const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  // Database Configuration
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || 'ecommerce',
  DB_USER: process.env.DB_USER || 'shopfast',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  // Redis Configuration
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  // PayPal Configuration
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  // AWS Configuration
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
