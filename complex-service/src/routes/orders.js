
import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
export const orderRouter = express.Router();

let orders = [{ id: 'ord_1', userId: 'u1', total: 999, status: 'pending' }];

orderRouter.post('/', authMiddleware, (req,res) => {
  const { items, shippingAddress } = req.body;
  const order = { id: 'ord_'+Date.now(), items, shippingAddress, status: 'pending', total: 1000 };
  orders.push(order);
  res.status(201).json(order);
});
orderRouter.get('/', authMiddleware, (req,res) => res.json(orders));
orderRouter.get('/:id', authMiddleware, (req,res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});
orderRouter.patch('/:id/status', authMiddleware, (req,res) => {
  const { status } = req.body;
  res.json({ id: req.params.id, status });
});
orderRouter.post('/:id/cancel', authMiddleware, (req,res) => {
  res.json({ id: req.params.id, status: 'cancelled' });
});
