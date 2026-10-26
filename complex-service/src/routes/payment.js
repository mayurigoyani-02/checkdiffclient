
import express from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.js';
export const paymentRouter = express.Router();

const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(['USD','EUR','INR']),
  paymentMethod: z.enum(['card','upi','netbanking']),
  userId: z.string(),
  orderId: z.string().optional(),
  metadata: z.object({}).optional()
});

paymentRouter.post('/create', authMiddleware, (req,res) => {
  const data = paymentSchema.parse(req.body);
  const payment = { id: 'pay_'+Date.now(), ...data, status: 'created', createdAt: new Date() };
  res.status(201).json(payment);
});

paymentRouter.post('/create1', authMiddleware, (req,res) => {
  const { amount, currency } = req.body;
  res.status(201).json({ id: 'pay1_'+Date.now(), amount, currency, status: 'requires_action' });
});

paymentRouter.post('/confirm/:id', (req,res) => {
  res.json({ id: req.params.id, status: 'succeeded' });
});

paymentRouter.get('/:id', (req,res) => {
  res.json({ id: req.params.id, status: 'succeeded', amount: 100 });
});

paymentRouter.post('/refund', authMiddleware, (req,res) => {
  const { paymentId, amount, reason } = req.body;
  res.json({ refundId: 're_'+Date.now(), paymentId, amount, status: 'refunded' });
});

paymentRouter.get('/', authMiddleware, (req,res) => {
  res.json([{ id: 'pay_1', amount: 100 }, { id: 'pay_2', amount: 200 }]);
});
