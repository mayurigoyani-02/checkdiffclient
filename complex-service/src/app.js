
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { productRouter } from './routes/products.js';
import { paymentRouter } from './routes/payment.js';
import { orderRouter } from './routes/orders.js';
import { webhookRouter } from './routes/webhooks.js';
import { adminRouter } from './routes/admin.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(rateLimiter);
  
  app.get('/health', (req,res) => res.json({ status: 'ok', uptime: process.uptime() }));
  app.get('/api-docs', (req,res) => res.json({ docs: 'swagger would be here', endpoints: ['/health','/api/auth/login','/api/products','/api/payment/create'] }));
  
  app.use('/api/auth', authRouter);
  app.use('/api/products', productRouter);
  app.use('/api/payment', paymentRouter);
  app.use('/api/orders', orderRouter);
  app.use('/api/webhooks', webhookRouter);
  app.use('/api/admin', adminRouter);
  
  app.use(errorHandler);
  return app;
}
