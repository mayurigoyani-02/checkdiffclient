
Verify it works first:
```bash
# Terminal 1 - API
cd api && npm install && npm run dev
# -> http://localhost:4000/health



#### **PART B: Setup for API Agent**

```bash
cd ../api  # from website to api

```
cd agents/api
npm install -D @playwright/test
npx playwright install

**Step 1: Install CheckDiff**
```bash
npm install -D checkdiff-e2e
# OR if using local package from before:
npm install -D /path/to/checkdiff-e2e - C:\Hackathon\CheckDiff\agents\api> npm install -D ../../
```


**Step 4: Test White-Box Mode**
```bash
# Make fake API change
echo "// payment fix" >> src/index.js

npx checkdiff-e2e run --base main --dry
# Expected: Impact @all or @api

npx checkdiff run --base main

git checkout -- src/index.js
```

