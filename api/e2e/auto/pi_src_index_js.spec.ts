import { test, expect } from '@playwright/test';
// Auto-generated for pi/src/index.js at http://localhost:4000
test.describe('Profile: pi/src/index.js', () => {

test('Verify GET /health after main-entry - impacts ALL endpoints @health @auto', async ({ request }) => {
  const response = await request.get('http://localhost:4000/health', {
    
  });
  expect(response.status()).toBeLessThan(500);
});


test('Verify POST /api/auth/login after main-entry - impacts ALL endpoints @auth @auto', async ({ request }) => {
  const response = await request.post('http://localhost:4000/api/auth/login', {
    data: {
  "email": "test@example.com",
  "password": "Test@123"
}
  });
  expect(response.status()).toBeLessThan(500);
});


test('Verify POST /api/payment/create1 after main-entry - impacts ALL endpoints @payment @auto', async ({ request }) => {
  const response = await request.post('http://localhost:4000/api/payment/create1', {
    data: {
  "amount": 100,
  "currency": "USD",
  "paymentMethod": "card",
  "userId": "test-123"
}
  });
  expect(response.status()).toBeLessThan(500);
});


test('Verify GET /api/productss after main-entry - impacts ALL endpoints @api @auto', async ({ request }) => {
  const response = await request.get('http://localhost:4000/api/productss', {
    
  });
  expect(response.status()).toBeLessThan(500);
});


test('Verify GET /api/products1/:id after main-entry - impacts ALL endpoints @api @auto', async ({ request }) => {
  const response = await request.get('http://localhost:4000/api/products1/:id', {
    
  });
  expect(response.status()).toBeLessThan(500);
});

});
