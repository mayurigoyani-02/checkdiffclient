### STEP-BY-STEP GUIDE: Add Playwright + CheckDiff
Do this for **EACH** service separately (website, api, complex-service). This makes each service autonomous.

**Prerequisites:** Node.js 18+, Git, Playwright browsers.

#### Prerequisites: Build CheckDiff (if using local)
If installing from local `C:\Hackathon\CheckDiff` (not npm registry):
```bash
cd C:\Hackathon\CheckDiff
npm install
npm run build # generates dist/cli.js required for bin:"checkdiff"
```

#### PART A: Setup for Website Agent (Next.js)
```bash
cd C:\Hackathon\CheckDiffClient\website
npm install -D @playwright/test
npx playwright install
```

**Step 1: Install CheckDiff** — pick ONE:
```bash
# 1) From npm (when published)
npm install -D checkdiff-e2e

# 2) From GitHub (recommended for this hackathon)
npm install -D github:mayurigoyani-02/checkdiff

# 3) From local path (offline dev)
npm install -D file:../../CheckDiff
# or absolute:
npm install -D C:\Hackathon\CheckDiff
```

**Step 2: Create `checkdiff.config.js` in `website/`:**
```js
export default {
  agentName: 'website',
  projectType: 'nextjs',
  mapping: {
    'pages/checkout/**': ['@checkout','@critical','@website'],
    'pages/cart/**': ['@cart','@checkout'],
    'pages/auth/**': ['@auth','@website'],
    'components/**': ['@website'],
    '**/*.css': ['@visual']
  },
  e2e: {
    framework: 'playwright',
    testDir: './e2e',
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:4000'
  },
  strategy: 'impact'
}
```

**Step 3/4:** (create `e2e/*.spec.ts` + `npx checkdiff run --base main --dry` as already in website/README.md)

#### PART B: Setup for API Agent (Express)
```bash
cd C:\Hackathon\CheckDiffClient\api
npm install -D @playwright/test
npx playwright install
npm install -D checkdiff-e2e # or github/local alternative as above
```
Same config pattern with `projectType: 'express'`, `baseUrl: 'http://localhost:4000'` etc.

Verify:
```bash
npx checkdiff --help # or npx checkdiff-e2e --help
npx checkdiff run --base main --dry
```

#### PART C: Setup for Complex-Service Agent (Express — 25+ endpoints)

`complex-service` is a larger Express service (6 routers, auth/rate-limit middleware, OpenAPI at `/api-docs`) used to validate CheckDiff's impact analysis (infra vs route vs service vs config vs auth changes).

```bash
cd C:\Hackathon\CheckDiffClient\complex-service
npm install
npm install -D @playwright/test
npx playwright install
```

**Step 1: Install CheckDiff** — pick ONE (same options as above):
```bash
npm install -D checkdiff-e2e
# or: npm install -D github:mayurigoyani-02/checkdiff
# or: npm install -D file:../../CheckDiff  (or C:\Hackathon\CheckDiff)
```

> If using the local file path, build CheckDiff first: `cd C:\Hackathon\CheckDiff && npm install && npm run build`.

**Step 2: CheckDiff config** — `complex-service/checkdiff.config.js` already exists:
```js
module.exports = {
  api: { port: 4000, baseUrl: 'http://localhost:4000', swaggerPath: '/api-docs', healthPath: '/health' },
  website: { port: 3001 },
  infraPatterns: ['src/index.js','src/app.js','src/middleware/rateLimiter.js','src/config/*'],
  configPatterns: ['.env','*.config.js']
};
```
Key idea: `infraPatterns` = changes that impact **ALL** endpoints (app bootstrap, rate limiter, config), `configPatterns` = config-only changes. Everything else is mapped to specific routers/services via OpenAPI + code graph.

For a mapping-based (white-box tag) variant, you can also use an ESM config:
```js
export default {
  agentName: 'complex-service',
  projectType: 'express',
  mapping: {
    'src/middleware/auth.js': ['@auth', '@critical'],
    'src/middleware/rateLimiter.js': ['@infra', '@critical'],
    'src/app.js': ['@infra', '@critical'],
    'src/index.js': ['@infra', '@critical'],
    'src/routes/products.js': ['@products'],
    'src/routes/payment.js': ['@payment', '@critical'],
    'src/routes/orders.js': ['@orders'],
    'src/routes/auth.js': ['@auth'],
    'src/routes/admin.js': ['@admin'],
    'src/routes/webhooks.js': ['@webhooks'],
    'src/services/orderService.js': ['@orders'],
    'src/services/paymentService.js': ['@payment'],
    'src/config/**': ['@config'],
    '**/*.env*': ['@config']
  },
  e2e: {
    framework: 'playwright',
    testDir: './e2e',
    baseUrl: 'http://localhost:4000'
  },
  strategy: 'impact'
}
```

**Step 3: Start the service**
```bash
npm run dev   # http://localhost:4000  (/health, /api-docs)
# or: npm start
```

**Step 4: Test impact — 5 scenarios** (from `complex-service/README.md`):
```bash
# Dry-run shows what WOULD be tested; remove --dry to actually run

# 1. INFRA change -> impacts ALL (expect: @critical / all tests)
echo "// infra tweak" >> src/middleware/rateLimiter.js
node C:\Hackathon\CheckDiff\dist\cli.js run --base main --port 4000 --autoRun --report --verbose --dry
git checkout -- src/middleware/rateLimiter.js

# 2. ROUTE change -> only product tests
echo "// bulk route" >> src/routes/products.js
npx checkdiff run --base main --dry   # expect: @products
git checkout -- src/routes/products.js

# 3. SERVICE change -> only payment endpoints
echo "// validation" >> src/services/paymentService.js
npx checkdiff run --base main --dry   # expect: @payment

# 4. CONFIG change -> flagged as config
echo "# STRIPE_KEY=sk_test_xxx" >> .env
npx checkdiff run --base main --dry   # expect: @config
git checkout -- .env  # or rm .env if newly created

# 5. AUTH change -> all protected endpoints
echo "// auth tweak" >> src/middleware/auth.js
npx checkdiff run --base main --dry   # expect: @auth

# Full run (no --dry) once service is up:
node C:\Hackathon\CheckDiff\dist\cli.js run --base main --port 4000 --autoRun --report --verbose
```

Notes:
- `complex-service` uses `"type": "module"` (ESM) — use `import` syntax in src; the existing `checkdiff.config.js` uses `module.exports` and is loaded via CheckDiff's config loader that supports both.
- Port `4000` is shared with `api` — run only one at a time, or set `PORT=4001` for complex-service and update `baseUrl`/`--port` accordingly.
- E2E tests: place under `complex-service/e2e/*.spec.ts` with tag annotations (e.g. `test('create product @products', ...)`) to match the mapping above.

#### PART D: Root Orchestrator (Optional)
In `C:\Hackathon\CheckDiffClient\checkdiff.config.js`:
```js
export default {
  projectType: 'agents',
  agents: {
    website: { path: 'website' },
    api: { path: 'api' },
    'complex-service': { path: 'complex-service' }
  }
}
```
Run from root: `npx checkdiff run --base main --dry`