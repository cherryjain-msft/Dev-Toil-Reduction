# Lab 03 — Code Review: "AI First-Pass Review"

| | |
|---|---|
| **Toil** | PR review bottleneck — waiting hours/days for human review |
| **Feature** | Copilot Code Review (automatic + on-demand) |
| **Time** | 45–60 minutes |
| **Difficulty** | Beginner |
| **Prerequisites** | GitHub repo with Copilot Code Review enabled in org settings |

## Toil Scorecard

| Metric | Without Copilot | With Copilot |
|--------|----------------|--------------|
| Time to first review | 4–24 hours | < 1 minute |
| Issues caught before human review | 0 | 5–15 per PR |
| Human reviewer load | Full review | Focused review (AI pre-filtered) |
| Security issues missed | Common | Rare |

---

## What You'll Do

You will create a PR with **intentionally buggy code**, request Copilot Code Review, and watch it catch bugs, security vulnerabilities, style violations, and performance issues — all in seconds. Then you'll create a custom Code Review agent to enforce team-specific standards.

---

## Part A — Create a Buggy Branch (10 min)

### Step 1: Create a new branch

```bash
git checkout -b lab-03-buggy-feature
```

### Step 2: Add a buggy route file

Create the file `api/src/routes/analytics.ts` with the following intentionally flawed code.

> **Copy this exactly** — it has 8 intentional bugs for Copilot to find.

```typescript
import express from 'express';
import { getDatabase } from '../db/sqlite';

const router = express.Router();

// Bug 1: SQL injection vulnerability (string concatenation)
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

// Bug 2: No error handling, Bug 3: any type
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

    if (format == 'csv') {  // Bug 6: loose equality
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

### Step 3: Register the route

Open `api/src/index.ts` and add:

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
git commit -m "feat: add analytics endpoints"
git push origin lab-03-buggy-feature
```

---

## Part B — Request Copilot Code Review (10 min)

### Step 5: Create a Pull Request

1. Go to your GitHub repo
2. Click **Compare & pull request** for the `lab-03-buggy-feature` branch
3. **Title:** `feat: add analytics endpoints`
4. **Description:**
   ```
   Adds analytics endpoints for sales data, top products, and data export.
   ```
5. Click **Create pull request**

### Step 6: Request Copilot Review

1. On the PR page, click **Reviewers** in the right sidebar
2. Select **Copilot** as a reviewer
3. Wait ~30 seconds for the review to appear

### Step 7: Read Copilot's review comments

Copilot will leave inline comments on the PR. Look for:

| Bug # | What Copilot Should Flag | Severity |
|-------|--------------------------|----------|
| 1 | SQL injection via string interpolation | 🔴 Critical |
| 2 | Missing try/catch in `/top-products` | 🟡 Medium |
| 3 | Use of `any` type for req/res | 🟡 Medium |
| 4 | Hardcoded API key/secret | 🔴 Critical |
| 5 | No input validation on query params | 🟡 Medium |
| 6 | Loose equality (`==` vs `===`) | 🟢 Low |
| 7 | Another `any` type usage | 🟢 Low |
| 8 | `console.log` instead of proper error middleware | 🟡 Medium |

> **Count how many Copilot catches.** A human reviewer might miss 2–3 of these in a quick review.

---

## Part C — Apply Copilot's Suggested Fixes (15 min)

### Step 8: Apply suggestions

For each Copilot comment that includes a **suggested fix**:
1. Click **Apply suggestion** (or **Commit suggestion**)
2. Copilot will create a commit fixing that specific issue

### Step 9: Re-request review

After applying fixes:
1. Click **Reviewers** → re-request review from **Copilot**
2. Copilot will review the updated code
3. It should now show fewer (or zero) issues

---

## Part D — Create a Code Review Custom Agent (15 min)

Now create a **custom agent** that enforces your team's specific review standards — going beyond what default Copilot Code Review catches.

### Step 10: Create the code review agent

Create the file `.github/agents/code-reviewer.agent.md`:

```markdown
---
name: 'Code Reviewer'
description: 'Enforces team coding standards and best practices for the OctoCAT Supply Chain API. Use for pre-PR code quality checks.'
---

# Code Reviewer Agent

You are a strict code reviewer for the OctoCAT Supply Chain Management System. Review code changes against these team standards:

## Security (Block-level — must fix before merge)

- [ ] No SQL string concatenation — all queries must use parameterized `?` placeholders
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] No `eval()`, `exec()`, or dynamic code execution
- [ ] All user input validated and sanitized before use

## Type Safety (Block-level)

- [ ] No `any` type — use proper TypeScript interfaces
- [ ] All function parameters and return types explicitly typed
- [ ] Import types from `models/` — don't create inline type definitions

## Error Handling (Required)

- [ ] All async route handlers wrapped in try/catch
- [ ] Errors propagated via `next(error)` — never swallowed
- [ ] Use custom error types from `utils/errors.ts` (NotFoundError, ValidationError)
- [ ] No `console.log` for errors — use error middleware

## API Patterns (Required)

- [ ] New routes registered in `index.ts`
- [ ] Swagger JSDoc on all endpoints
- [ ] Correct HTTP status codes (201 create, 204 delete, 404 not found)
- [ ] Repository pattern used — no direct DB calls in routes

## Review Output Format

For each issue found, output:

**[SEVERITY] File:Line — Issue**
- 🔴 BLOCK: Must fix before merge
- 🟡 WARN: Should fix, can merge with comment
- 🟢 NIT: Style suggestion, optional

Example:
> 🔴 BLOCK: `analytics.ts:13` — SQL injection via string interpolation. Use parameterized query: `db.all('SELECT * FROM orders WHERE order_date BETWEEN ? AND ?', [startDate, endDate])`

End with a summary: `X blocking / Y warnings / Z nits`

create a summary in tabular format
```

### Step 11: Test the code review agent

1. Open Copilot Chat → select **Agent** mode
2. Select **@code-reviewer** agent from the participant dropdown
3. Type the following prompt:

```
Review the file api/src/routes/analytics.ts against our team standards.
```

4. The agent will analyze the file and output a structured review with severity levels

### Step 12: Compare reviews

| Aspect | Copilot Code Review (PR) | Custom Agent (Chat) |
|--------|--------------------------|---------------------|
| Where it runs | On PR in GitHub.com | In VS Code chat |
| Standards | General best practices | Your team's specific rules |
| Output | Inline PR comments | Structured checklist |
| Use case | Every PR automatically | Pre-PR self-check |

---

## Part E — Clean Up (5 min)

### Step 13: Close the PR

Since this was a learning exercise with intentional bugs:
1. Close the PR without merging
2. Delete the `lab-03-buggy-feature` branch

```bash
git checkout main
git branch -D lab-03-buggy-feature
```

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Bugs found by Copilot (out of 8) | ___ / 8 |
| Time from PR creation to review comments | ___ seconds |
| Security issues caught | ___ |
| Suggestions auto-applied | ___ |
| Custom agent review accuracy | ___ / 8 |

---

## Key Takeaway

> **Copilot Code Review catches bugs, security issues, and style violations in seconds — not hours.** Combined with a custom review agent that encodes your team's standards, you get two layers of automated quality assurance before any human reviewer spends time.

### What Made This Work

- **Copilot Code Review**: Built-in PR reviewer that catches common bugs and security issues
- **Custom agent** (`.github/agents/code-reviewer.agent.md`): Team-specific standards as a reusable agent
- **Custom instructions** (`.github/copilot-instructions.md`): Repo-wide standards that inform Copilot's review
- **Layered approach**: AI catches the 80%, humans focus on the 20% (architecture, business logic)
