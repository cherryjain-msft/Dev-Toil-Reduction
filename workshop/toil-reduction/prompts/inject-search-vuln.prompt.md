---
mode: 'agent'
description: 'Exercise 3-B: Inject SQL injection vulnerability for Security Autofix demo'
tools: ['changes', 'codebase', 'editFiles', 'problems', 'runCommands', 'search', 'terminalLastCommand']
---

# Inject Search Vulnerability for Security Autofix Demo

## Context

This is the OctoCAT Supply Chain API (Express.js + SQLite). We need to create a branch with a SQL injection vulnerability so participants can see CodeQL detect it and Copilot Autofix remediate it.

## Task

Perform ALL of the following steps in order:

### Step 1: Create a new git branch

```bash
git checkout -b toil-reduction-security-demo
```

### Step 2: Create `api/src/routes/search.ts`

Create this file with SQL injection vulnerabilities — these are **intentional** for the CodeQL demo:

```typescript
import express from 'express';
import { getDatabase } from '../db/sqlite';

const router = express.Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search products by name
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search term
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/', async (req, res, next) => {
  try {
    const db = await getDatabase();
    const query = req.query.q as string;
    // VULNERABILITY: SQL injection via string concatenation
    const results = await db.all(
      `SELECT * FROM products WHERE name LIKE '%${query}%'`
    );
    res.json(results);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/search/advanced:
 *   get:
 *     summary: Advanced search with multiple filters
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: supplier
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filtered search results
 */
router.get('/advanced', async (req, res, next) => {
  try {
    const db = await getDatabase();
    const { name, minPrice, maxPrice, supplier } = req.query;
    // VULNERABILITY: Multiple SQL injections via string concatenation
    let sql = 'SELECT * FROM products WHERE 1=1';
    if (name) sql += ` AND name LIKE '%${name}%'`;
    if (minPrice) sql += ` AND price >= ${minPrice}`;
    if (maxPrice) sql += ` AND price <= ${maxPrice}`;
    if (supplier) sql += ` AND supplier_id = ${supplier}`;
    const results = await db.all(sql);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

export default router;
```

**IMPORTANT**: Create the file exactly as above. Do NOT fix the SQL injection vulnerabilities — they are intentional for the CodeQL + Autofix demo.

### Step 3: Register the route in `api/src/index.ts`

Add the import and route registration for search routes:

```typescript
import searchRoutes from './routes/search';
```

And in the route registrations section:

```typescript
app.use('/api/search', searchRoutes);
```

### Step 4: Commit and push

```bash
git add .
git commit -m "feat(api): add product search endpoints"
git push origin toil-reduction-security-demo
```

### Step 5: Create a Pull Request

Use the GitHub CLI to create a PR:

```bash
gh pr create --title "feat(api): add product search endpoints" --body "Adds search endpoints for products with name and multi-field filtering." --base main
```

If `gh` CLI is not available, instruct the user to create the PR manually on GitHub.

## Verification

- Branch `toil-reduction-security-demo` exists with the vulnerable `search.ts`
- The route is registered in `index.ts`
- A PR has been created (or instructions given to create one manually)
- The file contains SQL injection vulnerabilities — do NOT fix them
- CodeQL workflow should trigger on the PR and detect the injections
