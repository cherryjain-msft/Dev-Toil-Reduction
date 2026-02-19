# Exercise 3 — Testing & Quality

| | |
|---|---|
| **Category** | Testing & Quality |
| **Deck Message** | "Write unit test scaffolding" + "Autofix common bugs" |
| **Time** | 30 minutes |
| **Difficulty** | Advanced |
| **Features** | Parallel Delegation, Agent HQ, Security Autofix, CodeQL |

## Toil Scorecard

| Metric | Without Copilot | With Copilot | Your Result |
|--------|----------------|--------------|-------------|
| 3 test suites written | 3–4 hours (sequential) | ~20 min (parallel) | ___ |
| Context switches between tasks | 6–10 | 0 | ___ |
| Time to fix a vulnerability | 30–120 min | 2–5 min | ___ |
| Security review backlog age | Days/weeks | Same day | ___ |

---

## Module A — Batch Test Coverage (5 min) ▸ Parallel Delegation + Agent HQ

> **Pattern**: Fire-and-forget — assign 3 independent test issues to Copilot simultaneously, then move to Module B.

### Step 1: Create 3 GitHub Issues

Go to your GitHub repo → **Issues** → create these 3 issues. Copy the content from the linked files:

| # | Title | Issue Template |
|---|-------|---------------|
| 1 | `Add unit tests for productsRepo.ts` | Copy from [`workshop/issues/issue-06-01-products-repo-tests.md`](../../issues/issue-06-01-products-repo-tests.md) |
| 2 | `Add unit tests for ordersRepo.ts` | Copy from [`workshop/issues/issue-06-02-orders-repo-tests.md`](../../issues/issue-06-02-orders-repo-tests.md) |
| 3 | `Add unit tests for branchesRepo.ts` | Copy from [`workshop/issues/issue-06-03-branches-repo-tests.md`](../../issues/issue-06-03-branches-repo-tests.md) |

### Step 2: Assign all 3 to Copilot

For **each** issue:
1. Click **Assignees** → select **Copilot**
2. Do this quickly for all 3 — the goal is parallel execution

### Step 3: Open Agent HQ

1. Go to your repo on GitHub
2. Click the **Copilot** icon in the top navigation
3. You should see **3 sessions** running in parallel:
   - productsRepo tests
   - ordersRepo tests
   - branchesRepo tests

Note the time: `___:___`

### Step 4: Move to Module B

Don't wait — **proceed immediately.** All 3 Coding Agent sessions run concurrently while you do hands-on security work.

---

## Module B — Security Autofix (15 min) ▸ Security Autofix + CodeQL

> **Pattern**: Inject a vulnerability → CodeQL detects it → Copilot Autofix remediates it — all automated.

### Step 5: Run the vulnerability prompt

1. Open Command Palette → **"Copilot: Run Prompt File"**
2. Select `workshop/toil-reduction/prompts/inject-search-vuln.prompt.md`

This creates a branch `toil-reduction-security-demo` with a `search.ts` route containing **SQL injection vulnerabilities**, pushes it, and creates a PR.

### Step 6: Wait for CodeQL scan

1. Go to the PR → **Checks** tab
2. Wait for **CodeQL analysis** to complete (~2–5 minutes)
3. Security alerts should appear on the PR

> While waiting for CodeQL, check Agent HQ to see progress on your 3 test PRs from Module A.

### Step 7: View security alerts

1. Go to your repo → **Security** tab → **Code scanning alerts**
2. You should see SQL injection alerts for:
   - `search.ts` — string concatenation in `LIKE '%${query}%'`
   - `search.ts` — multiple injections in `/advanced` endpoint

### Step 8: Apply Copilot Autofix

For each alert:
1. Click on the alert
2. Look for the **"Autofix"** button (powered by Copilot)
3. Copilot suggests replacing string concatenation with parameterized queries:

   ```typescript
   // Before (vulnerable):
   `SELECT * FROM products WHERE name LIKE '%${query}%'`
   
   // After (safe):
   'SELECT * FROM products WHERE name LIKE ?', [`%${query}%`]
   ```

4. Click **"Commit fix"** to apply

### Step 9: Verify the fix

After applying autofix:
1. CodeQL re-scans automatically
2. Alerts should resolve
3. PR security check turns green

### Step 10: Clean up security demo

Close the PR without merging:

```bash
git checkout main
git branch -D toil-reduction-security-demo
```

---

## Module C — Review & Merge 3 PRs (10 min) ▸ Parallel Delegation

> **Pattern**: Return to Agent HQ — your 3 test suites should be ready.

### Step 11: Check Agent HQ

Go back to Agent HQ. Each session should now show **PR Ready** status.

### Step 12: Review PR #1 — Products Repo Tests

Open the PR and verify:

| Check | Expected |
|-------|----------|
| File created | `api/src/repositories/productsRepo.test.ts` |
| Structure | Mirrors `suppliersRepo.test.ts` |
| Describe block | `ProductsRepository` |
| Methods tested | `findAll`, `findById`, `create`, `update`, `delete`, `exists`, `findBySupplierId`, `findByName` |
| Test categories | Happy path + empty/not found + error handling |
| Mock setup | `vi.fn()` — no real DB connections |

### Step 13: Review PRs #2 and #3

Repeat for ordersRepo and branchesRepo tests. Each should:
- Follow the same `suppliersRepo.test.ts` pattern
- Test the methods specific to that repository
- Use proper mock setup
- Pass all tests

### Step 14: Merge all 3 PRs

Merge in sequence: PR #1 → PR #2 → PR #3.

### Step 15: Verify everything works together

```bash
git pull origin main
cd api
npm test
```

All tests (original + 3 new test files) should pass together.

Note the time: `___:___`

---

## What Made This Work

- **Independent tasks** — each test file has no dependencies on the others → perfect for parallelization
- **Clear reference pattern** — `suppliersRepo.test.ts` gave Copilot a template to follow
- **Well-structured issues** — specific requirements = consistent output across all 3
- **Agent HQ** — dashboard to monitor all sessions without context switching
- **CodeQL + Autofix** — vulnerability detection → one-click remediation pipeline
- **Existing skill** (`.github/skills/api-endpoint/SKILL.md`) — testing patterns documented

---

## Workshop Complete!

> In 90 minutes you: cleared 2 backlog items (entity + UI feature), codified team standards, caught 8 bugs in seconds, generated 3 test suites in parallel, and fixed a SQL injection vulnerability with one click.

**Next steps:**
1. Fill in the [Scorecard](../scorecard.md) with your results
2. Calculate your team's annual toil cost with the [ROI Calculator](../../toil-framework/roi-calculator.md)
3. Take the agents, instructions, and issue templates back to your own repos

**→ [Back to Workshop Home](../README.md)**
