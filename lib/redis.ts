import { REDIS_URL } from '@/config';
import Redis from 'ioredis';

const globalForRedis = global as unknown as {
  redis: Redis | undefined;
};

const createRedisClient = () => {
  const client = new Redis(REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50 * 2000);
      return delay;
    },
    reconnectOnError: (err) => {
      const targetErrors = ['READONLY', 'ECONNRESET', 'ETIMEDOUT'];
      return targetErrors.some((target) => err.message.includes(target));
    },
  });

  client.on('connect', () => {
    console.log('Redis connected successfully');
  });

  client.on('error', (err) => {
    console.error('Redis connection error', err);
  });

  client.on('reconnecting', () => {
    console.log('Redis reconnecting...');
  });

  return client;
};

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}

// graceful shutdown

if (typeof window === 'undefined') {
  process.on('SIGTERM', async () => {
    await redis.quit();
    console.log('Redis connection closed');
  });
}

export default redis;
