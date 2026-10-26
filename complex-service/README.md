
# Complex Service for CheckDiff Testing

Run:
```
npm install
npm run dev # port 4000
```

Endpoints: 25+ endpoints across 6 routers

Test CheckDiff scenarios:

1. INFRA change (impacts ALL):
   Edit src/middleware/rateLimiter.js -> change limit from 100 to 50
   Edit src/app.js -> add new middleware
   Expected: CheckDiff says 'impacts ALL endpoints' -> runs all tests

2. ROUTE change (impacts specific):
   Edit src/routes/products.js -> add new route POST /api/products/bulk
   Expected: only product tests

3. CODE change (service):
   Edit src/services/paymentService.js -> add validation
   Expected: only payment endpoints

4. CONFIG change:
   Edit .env -> change STRIPE_KEY
   Expected: flags as config change

5. AUTH change:
   Edit src/middleware/auth.js
   Expected: all protected endpoints

Use:
node C:\Hackathon\CheckDiff\dist\cli.js run --base main --port 4000 --autoRun --report --verbose
