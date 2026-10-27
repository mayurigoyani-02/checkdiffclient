
import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
export const productRouter = express.Router();

let products = [{ id: '1', name: 'Laptop', price: 999 }, { id: '2', name: 'Phone', price: 599 }];

productRouter.get('/', (req,res) => {
  const { search, minPrice, maxPrice, sort } = req.query;
  let result = [...products];
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (minPrice) result = result.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= parseFloat(maxPrice));
  if (sort === 'price_asc') result.sort((a,b) => a.price - b.price);
  else if (sort === 'price_desc') result.sort((a,b) => b.price - a.price);
  res.json(result);
});
productRouter.get('/:id', (req,res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});
productRouter.post('/', authMiddleware, (req,res) => {
  const { name, price, category } = req.body;
  if (price == null || isNaN(Number(price)) || Number(price) <= 0) return res.status(400).json({ error: 'Invalid price' });
  const newProduct = { id: Date.now().toString(), name, price: Number(price), category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
productRouter.put('/:id', authMiddleware, (req,res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (req.body.price != null && (isNaN(Number(req.body.price)) || Number(req.body.price) <= 0)) return res.status(400).json({ error: 'Invalid price' });
  if (req.body.price != null) req.body.price = Number(req.body.price);
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});
productRouter.delete('/:id', authMiddleware, (req,res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});
