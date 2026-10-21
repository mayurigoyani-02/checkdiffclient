### STEP-BY-STEP GUIDE: Add Playwright + CheckDiff

Do this for **BOTH** agents separately. This makes each agent autonomous.

---

#### **PART C: Root Orchestrator (Optional)**

In project root, create `checkdiff.config.js`:
```js
export default {
  projectType: 'agents',
  agents: {
    website: { path: 'website' },
    api: { path: 'api' }
  }
}
```

And run from root:
```bash
npx checkdiff run --base main --dry
# Shows: website changed or api changed, tests only that agent
```

**You are done.** Now each agent is autonomous:
- `cd website && npx checkdiff run` → tests only website check-ins
- `cd api && npx checkdiff run` → tests only API check-ins

