# Lab 07 — Security Autofix: "Zero-Day to Zero-Effort"

| | |
|---|---|
| **Toil** | Fixing vulnerability alerts, Dependabot PRs, secret leaks |
| **Feature** | Copilot Autofix, Security Autofix, Coding Agent for security |
| **Time** | 45–60 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | GitHub Advanced Security enabled, CodeQL configured, Copilot Coding Agent enabled |

## Toil Scorecard

| Metric | Without Copilot | With Copilot Autofix |
|--------|----------------|---------------------|
| Time to fix a vulnerability | 30–120 min | 2–5 min |
| Time to fix a Dependabot alert | 15–60 min | Auto-PR in minutes |
| Secret leak response time | Hours (manual) | Instant alert + auto-PR |
| Security review backlog age | Days/weeks | Same day |

---

## What You'll Do

You will intentionally inject security vulnerabilities into the codebase, watch GitHub detect them (CodeQL, Secret Scanning, Dependabot), and then use **Copilot Autofix** and **Coding Agent** to remediate them — all without writing security patches manually.

---

## Part A — Inject a Code Vulnerability (10 min)

### Step 1: Create a branch

```bash
git checkout -b lab-07-security-demo
```

### Step 2: Add a route with SQL injection

Create `api/src/routes/search.ts`:

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
 */
router.get('/advanced', async (req, res, next) => {
  try {
    const db = await getDatabase();
    const { name, minPrice, maxPrice, supplier } = req.query;
    // VULNERABILITY: Multiple SQL injections
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

### Step 3: Register and push

Add to `api/src/index.ts`:

```typescript
import searchRoutes from './routes/search';
app.use('/api/search', searchRoutes);
```

```bash
git add .
git commit -m "feat(api): add product search endpoints"
git push origin lab-07-security-demo
```

### Step 4: Create a Pull Request

Create a PR for `lab-07-security-demo` → `main`.

---

## Part B — Watch CodeQL Detect Vulnerabilities (10 min)

### Step 5: Wait for CodeQL scan

After pushing, the CodeQL workflow (`.github/workflows/codeql-advanced.yml`) will automatically scan the code.

1. Go to the PR → **Checks** tab
2. Wait for the CodeQL analysis to complete (~2–5 minutes)
3. You should see security alerts flagged on the PR

### Step 6: View the security alerts

1. Go to your repo → **Security** tab → **Code scanning alerts**
2. You should see alerts for:
   - SQL injection in `search.ts` line with string concatenation
   - SQL injection in `search.ts` advanced endpoint

### Step 7: See Copilot Autofix suggestions

On each CodeQL alert, look for the **"Autofix" button** powered by Copilot:

1. Click on an alert
2. Copilot shows a **suggested fix** — replacing string concatenation with parameterized queries
3. Click **"Generate fix"** if not already shown

---

## Part C — Apply Copilot Autofix (10 min)

### Step 8: Apply the autofix

For each alert:
1. Review Copilot's suggested fix
2. The fix should change:
   ```typescript
   // Before (vulnerable):
   `SELECT * FROM products WHERE name LIKE '%${query}%'`
   
   // After (safe):
   'SELECT * FROM products WHERE name LIKE ?', [`%${query}%`]
   ```
3. Click **"Commit fix"** to apply

### Step 9: Verify the fix

After committing the autofix:
1. CodeQL will re-scan automatically
2. The alerts should now be resolved
3. Check the PR — the security check should turn green

---

## Part D — Create a Security Review Agent (15 min)

### Step 10: Create the security agent

Create `.github/agents/security-reviewer.agent.md`:

```markdown
---
name: 'Security Reviewer'
description: 'Scans code for OWASP Top 10 vulnerabilities and security anti-patterns. Use before pushing code that handles user input, database queries, or authentication.'
---

# Security Reviewer Agent

You are a security-focused code reviewer for the OctoCAT Supply Chain Management System. Scan code for OWASP Top 10 vulnerabilities and project-specific security patterns.

## Check Categories

### 1. Injection (OWASP A03)
- [ ] All SQL queries use parameterized `?` placeholders
- [ ] No string concatenation in SQL queries
- [ ] No `eval()` or `exec()` usage
- [ ] User input sanitized before use in queries

### 2. Broken Authentication (OWASP A07)
- [ ] No hardcoded credentials or API keys
- [ ] No secrets in source code
- [ ] Authentication tokens not logged

### 3. Sensitive Data Exposure (OWASP A02)
- [ ] No PII or secrets in error messages
- [ ] Response data filtered (no internal IDs leaked unnecessarily)
- [ ] `console.log` does not output sensitive data

### 4. Security Misconfiguration (OWASP A05)
- [ ] CORS configured correctly (not `*` in production)
- [ ] Error responses don't expose stack traces
- [ ] Default credentials not present

### 5. Project-Specific Checks
- [ ] All database access goes through repository pattern (not direct DB calls in routes)
- [ ] Error handling uses `handleDatabaseError()` — errors are never silently swallowed
- [ ] Route parameters parsed with `parseInt()` — not used raw

## Output Format

```
🔍 SECURITY SCAN RESULTS

📄 File: {filename}
━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 CRITICAL: {description}
   Line {n}: {code snippet}
   Fix: {parameterized query example}

🟡 WARNING: {description}
   Line {n}: {code snippet}
   Recommendation: {suggestion}

🟢 PASSED: {check description}

━━━━━━━━━━━━━━━━━━━━━━━━━
Summary: X critical / Y warnings / Z passed
Risk Level: HIGH | MEDIUM | LOW
```
```

### Step 11: Test the security agent

In Agent Mode chat, type:

```
@security-reviewer Scan the file api/src/routes/search.ts for security vulnerabilities.
```

Also try scanning a file that should be clean:

```
@security-reviewer Scan api/src/routes/supplier.ts — is it safe?
```

### Step 12: Scan the entire API

```
@security-reviewer Scan all route files in api/src/routes/ for security issues. 
Give me a summary report.
```

> **Note:** Copilot should also find the existing `findByName` SQL injection vulnerability in `productsRepo.ts` (string concatenation: `LIKE '%${name}%'`).

---

## Part E — Clean Up (5 min)

### Step 13: Clean up the demo branch

```bash
git checkout main
git branch -D lab-07-security-demo
```

If the PR is still open, close it on GitHub.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Vulnerabilities injected | ___ |
| CodeQL alerts triggered | ___ |
| Copilot Autofix suggestions received | ___ |
| Fixes applied via Autofix | ___ |
| Security agent scan accuracy | ___ / ___ |
| Time from vulnerability to fix | ___ min |

---

## Key Takeaway

> **Security toil drops to near-zero.** CodeQL detects vulnerabilities automatically, Copilot Autofix generates the fix, and a custom Security Reviewer agent gives you on-demand scanning before code even reaches a PR. The existing SQL injection in `productsRepo.ts` proves this works on real codebases — not just demo bugs.

### What Made This Work

- **CodeQL** (`.github/workflows/codeql-advanced.yml`): Automatic vulnerability detection on every push
- **Copilot Autofix**: One-click remediation for detected vulnerabilities
- **Custom agent** (`security-reviewer.agent.md`): On-demand OWASP scanning from chat
- **Custom instructions**: Repo-wide rule "parameterized SQL only" prevents future issues
