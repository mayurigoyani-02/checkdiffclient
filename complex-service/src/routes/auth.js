
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
export const authRouter = express.Router();

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

authRouter.post('/login', async (req,res) => {
  const { email, password } = loginSchema.parse(req.body);
  const token = jwt.sign({ email, role: 'user' }, process.env.JWT_SECRET || 'supersecret');
  res.json({ token, user: { email } });
});
authRouter.post('/register', async (req,res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  res.status(201).json({ email, hashed: hashed.slice(0,10) });
});
authRouter.post('/refresh', (req,res) => {
  res.json({ token: 'new-token' });
});
authRouter.get('/me', (req,res) => res.json({ user: 'me' }));
