import { test, expect } from '@playwright/test';
// Auto-generated for api/checkdiff-report.html at http://localhost:4000
test.describe('Profile: api/checkdiff-report.html', () => {

test('Verify GET /health after unknown @health @auto', async ({ request }) => {
  const response = await request.get('http://localhost:4000/health', {
    
  });
  expect(response.status()).toBeLessThan(500);
});


test('Verify POST /api/auth/login after unknown @auth @auto', async ({ request }) => {
  const response = await request.post('http://localhost:4000/api/auth/login', {
    data: {
  "email": "test@example.com",
  "password": "Test@123"
}
  });
  expect(response.status()).toBeLessThan(500);
});


test('Verify POST /api/payment/create1 after unknown @payment @auto', async ({ request }) => {
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


test('Verify GET /api/productss after unknown @api @auto', async ({ request }) => {
  const response = await request.get('http://localhost:4000/api/productss', {
    
  });
  expect(response.status()).toBeLessThan(500);
});


test('Verify GET /api/products1/:id after unknown @api @auto', async ({ request }) => {
  const response = await request.get('http://localhost:4000/api/products1/:id', {
    
  });
  expect(response.status()).toBeLessThan(500);
});

});
