
import express from 'express';
export const webhookRouter = express.Router();

webhookRouter.post('/stripe', (req,res) => {
  const { type, data } = req.body;
  console.log('Stripe webhook', type);
  res.json({ received: true });
});
webhookRouter.post('/payment-success', (req,res) => {
  res.json({ processed: true });
});
webhookRouter.post('/inventory', (req,res) => {
  res.json({ synced: true });
});
