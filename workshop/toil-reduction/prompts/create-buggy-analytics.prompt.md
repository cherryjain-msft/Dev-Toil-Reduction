---
mode: 'agent'
description: 'Exercise 2-B: Create intentionally buggy analytics route for Code Review demo'
tools: ['changes', 'codebase', 'editFiles', 'problems', 'runCommands', 'search', 'terminalLastCommand']
---

# Create Buggy Analytics Route for Code Review

## Context

This is the OctoCAT Supply Chain API (Express.js + SQLite). We need to create a branch with intentionally buggy code so participants can see Copilot Code Review catch the bugs.

## Task

Perform ALL of the following steps in order:

### Step 1: Create a new git branch

```bash
git checkout -b toil-reduction-buggy-review
```

### Step 2: Create `api/src/routes/analytics.ts`

Create this file with the following code **exactly as written** — it contains 8 intentional bugs for Copilot Code Review to find:

```typescript
import express from 'express';
import { getDatabase } from '../db/sqlite';

const router = express.Router();

// Bug 1: SQL injection vulnerability (string concatenation instead of parameterized query)
router.get('/sales', async (req, res, next) => {
  try {
    const db = await getDatabase();
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const results = await db.all(
      `SELECT * FROM orders WHERE order_date BETWEEN '${startDate}' AND '${endDate}'`
    );
    res.json(results);
  } catch (error) {
    next(error);
  }
});

// Bug 2: No error handling (missing try/catch), Bug 3: any type on req/res
router.get('/top-products', async (req: any, res: any) => {
  const db = await getDatabase();
  const limit = req.query.limit || 10;
  const results = await db.all(
    `SELECT p.name, SUM(od.quantity) as total_sold
     FROM order_details od
     JOIN products p ON p.product_id = od.product_id
     GROUP BY p.product_id
     ORDER BY total_sold DESC
     LIMIT ${limit}`
  );
  res.json(results);
});

// Bug 4: Hardcoded secret, Bug 5: No input validation
router.get('/export', async (req, res, next) => {
  try {
    const apiKey = "sk-prod-analytics-key-2024-secret";
    const format = req.query.format;
    const db = await getDatabase();

    if (format == 'csv') {  // Bug 6: loose equality (== instead of ===)
      const orders = await db.all('SELECT * FROM orders');
      let csv = '';
      orders.forEach((order: any) => {  // Bug 7: any type again
        csv += Object.values(order).join(',') + '\n';
      });
      res.set('Content-Type', 'text/csv');
      res.send(csv);
    } else {
      const orders = await db.all('SELECT * FROM orders');
      res.json(orders);
    }
  } catch (error) {
    console.log(error);  // Bug 8: console.log instead of proper error handling
    res.status(500).send('Something went wrong');
  }
});

export default router;
```

**IMPORTANT**: Create the file exactly as above. Do NOT fix any of the bugs — they are intentional for the demo.

### Step 3: Register the route in `api/src/index.ts`

Add the import and route registration for the analytics routes:

```typescript
import analyticsRoutes from './routes/analytics';
```

And in the route registrations section:

```typescript
app.use('/api/analytics', analyticsRoutes);
```

### Step 4: Commit and push

```bash
git add .
git commit -m "feat(api): add analytics endpoints"
git push origin toil-reduction-buggy-review
```

### Step 5: Create a Pull Request

Use the GitHub CLI to create a PR:

```bash
gh pr create --title "feat(api): add analytics endpoints" --body "Adds analytics endpoints for sales data, top products, and data export." --base main
```

If `gh` CLI is not available, instruct the user to create the PR manually on GitHub.

## Verification

- Branch `toil-reduction-buggy-review` exists with the buggy `analytics.ts`
- The route is registered in `index.ts`
- A PR has been created (or instructions given to create one manually)
- The file contains all 8 intentional bugs — do NOT fix them
