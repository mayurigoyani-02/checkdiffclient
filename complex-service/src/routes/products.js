
import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
export const productRouter = express.Router();

let products = [{ id: '1', name: 'Laptop', price: 999 }, { id: '2', name: 'Phone', price: 599 }];

productRouter.get('/', (req,res) => {
  const { search, minPrice, maxPrice, sort } = req.query;
  let result = [...products];
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (minPrice) result = result.filter(p => p.price >= parseFloat(minPrice));
  res.json(result);
});
productRouter.get('/:id', (req,res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});
productRouter.post('/', authMiddleware, (req,res) => {
  const { name, price, category } = req.body;
  const newProduct = { id: Date.now().toString(), name, price, category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
productRouter.put('/:id', authMiddleware, (req,res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});
productRouter.delete('/:id', authMiddleware, (req,res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});
