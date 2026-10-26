
import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
export const adminRouter = express.Router();

adminRouter.use(authMiddleware, adminMiddleware);

adminRouter.get('/users', (req,res) => res.json([{ id: '1', email: 'admin@test.com' }]));
adminRouter.get('/stats', (req,res) => res.json({ users: 100, revenue: 50000 }));
adminRouter.post('/products/:id/feature', (req,res) => res.json({ id: req.params.id, featured: true }));
adminRouter.delete('/users/:id', (req,res) => res.status(204).send());
