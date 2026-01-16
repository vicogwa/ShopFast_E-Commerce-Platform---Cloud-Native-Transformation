import { createClient } from 'redis';
import config from '../config.js';

const redisClient = createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('❌ Redis: Too many retries');
        return new Error('Too many retries');
      }
      const delay = Math.min(retries * 50, 500);
      return delay;
    }
  },
  password: config.REDIS_PASSWORD || undefined
});

redisClient.connect().then(() => {
  console.log('✅ Connected to Redis');
}).catch((err) => {
  console.error('❌ Redis connection error:', err.message);
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err.message);
});

export default redisClient;
