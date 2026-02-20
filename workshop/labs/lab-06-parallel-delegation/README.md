# Lab 06 — Parallel Delegation & Agent HQ: "Batch It"

| | |
|---|---|
| **Toil** | Context switching between multiple small tasks sequentially |
| **Feature** | Copilot Coding Agent (parallel) + Agent HQ |
| **Time** | 45–60 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | GitHub repo with Copilot Coding Agent enabled, org allows multiple sessions |

## Toil Scorecard

| Metric | Without Copilot | With Parallel Agents |
|--------|----------------|---------------------|
| 3 independent tasks | 3–4 hours (sequential) | ~20 min wait (parallel) |
| Context switches | 6–10 | 0 |
| Developer time spent coding | 3+ hours | 0 (review only) |
| Tasks completed per hour | 1 | 3+ |

---

## What You'll Do

You will create **3 GitHub issues simultaneously**, assign all of them to Copilot Coding Agent, monitor them in **Agent HQ**, and review/merge the resulting PRs — all running in parallel.

---

## Part A — Identify the Work (5 min)

### The Problem

Your backlog has a mix of tasks — backend tests, frontend UI fixes, small features. Doing them one at a time means constant context switching. But these tasks are **independent** — perfect for parallel delegation.

| Task | Type | Status |
|------|------|--------|
| Unit tests for `productsRepo.ts` | Backend Testing | → Issue #1 |
| Unit tests for `ordersRepo.ts` | Backend Testing | → Issue #2 |
| Custom 404 "Lost Cat" page | Frontend UI | → Issue #3 |

---

## Part B — Create 3 Issues (10 min)

### Step 1: Create Issue #1 — Products Repo Tests

Go to GitHub → **Issues** → **New Issue**:

**Title:** `Add unit tests for productsRepo.ts`

**Body:**

```markdown
## Summary

Add comprehensive unit tests for `api/src/repositories/productsRepo.ts`.

## Implementation

- Create `api/src/repositories/productsRepo.test.ts`
- Follow the exact pattern in `api/src/repositories/suppliersRepo.test.ts`
- Use mock database with `vi.fn()` — do NOT use real database
- Test all methods: `findAll`, `findById`, `create`, `update`, `delete`, `exists`, `findBySupplierId`, `findByName`

## Test Cases Required

For each method:
1. ✅ Happy path — valid input returns expected output
2. ✅ Empty/not found — returns empty array or null
3. ✅ Error handling — database errors are propagated via `handleDatabaseError`

## Acceptance Criteria

- [ ] `npm test` passes with all new tests
- [ ] No real database connections — all tests use mocks
- [ ] Test file follows `suppliersRepo.test.ts` structure exactly
```

### Step 2: Create Issue #2 — Orders Repo Tests

**Title:** `Add unit tests for ordersRepo.ts`

**Body:**

```markdown
## Summary

Add comprehensive unit tests for `api/src/repositories/ordersRepo.ts`.

## Implementation

- Create `api/src/repositories/ordersRepo.test.ts`
- Follow the exact pattern in `api/src/repositories/suppliersRepo.test.ts`
- Use mock database with `vi.fn()` — do NOT use real database
- Test all methods available in the repository

## Test Cases Required

For each method:
1. ✅ Happy path — valid input returns expected output
2. ✅ Empty/not found — returns empty array or null
3. ✅ Error handling — database errors are propagated via `handleDatabaseError`

## Acceptance Criteria

- [ ] `npm test` passes with all new tests
- [ ] No real database connections — all tests use mocks
- [ ] Test file follows `suppliersRepo.test.ts` structure exactly
```

### Step 3: Create Issue #3 — Custom 404 Page

**Title:** `Add a custom 404 "Lost Cat" page`

**Body:**

```markdown
## Summary

Add a fun, on-brand 404 page so users who navigate to an invalid route see a friendly "Lost Cat" message instead of a blank screen.

## Implementation

- Create `frontend/src/components/NotFound.tsx`
- Add a catch-all `<Route path="*">` in `frontend/src/App.tsx`
- Follow existing component patterns (Tailwind CSS, dark mode support via `useTheme`)

## Design Requirements

- Large centered "404" heading
- Fun subheading like "This cat wandered off..." or "Looks like this page used all 9 lives"
- A cat-themed emoji or ASCII art (🐱 or text art)
- A "Back to Home" button linking to `/`
- Must support dark mode (`dark:` Tailwind classes)
- Responsive layout (looks good on mobile and desktop)

## Acceptance Criteria

- [ ] Navigating to `/some-random-path` shows the 404 page
- [ ] "Back to Home" button navigates to `/`
- [ ] Dark mode works correctly
- [ ] Matches the app's visual style (Tailwind, same color palette)
- [ ] `npm run build` succeeds with no errors
```

---

## Part C — Assign All 3 to Copilot (5 min)

### Step 4: Assign issues to Copilot

For **each** of the 3 issues:
1. Open the issue
2. Click **Assignees** in the right sidebar
3. Select **Copilot**

> Do this quickly for all 3 — the goal is to have all 3 running simultaneously.

### Step 5: Open Agent HQ

1. Go to your GitHub repo page
2. Click the **Copilot** icon in the top navigation
3. You'll see **Agent HQ** — a dashboard showing all active Copilot sessions

You should see 3 sessions running in parallel:
- Session for productsRepo tests
- Session for ordersRepo tests
- Session for 404 page

---

## Part D — Monitor in Agent HQ (10 min)

### Step 6: Watch the progress

In Agent HQ, each session shows:
- **Status**: Planning → Implementing → Testing → PR Ready
- **Files being modified**: The test file being created
- **Build status**: Whether `npm test` passes

### Step 7: Compare approaches

While waiting, note how each session independently works on **completely different parts** of the codebase:

| Session | What It Does |
|---------|-------------|
| productsRepo tests | Reads `suppliersRepo.test.ts` as pattern → creates test file → runs `npm test` |
| ordersRepo tests | Same pattern, different repo → creates test file → runs `npm test` |
| 404 page | Reads existing components for style → creates `NotFound.tsx` → updates `App.tsx` routes → runs `npm run build` |

**All 3 happen simultaneously** — backend and frontend, tests and features, all at once.

---

## Part E — Review and Merge (20 min)

### Step 8: Review PR #1 — Products Repo Tests

When the first PR appears:
1. Open it and review the test file
2. Verify it mirrors `suppliersRepo.test.ts` structure:
   - `describe('ProductsRepository')` 
   - Tests for each method
   - Mock DB setup
   - Happy path + edge cases
3. Check that tests actually test the right methods (`findBySupplierId`, `findByName` are Products-specific)

### Step 9: Review PR #2 — Orders Repo Tests

Same review as PR #1 — verify it follows `suppliersRepo.test.ts` structure for orders-specific methods.

### Step 10: Review PR #3 — 404 Page 🐱

This one is the fun one:
1. Open the PR and check `NotFound.tsx`
2. Verify it has a cat-themed message and a "Back to Home" button
3. Check that `App.tsx` has a `<Route path="*">` catch-all
4. Pull the branch and navigate to `http://localhost:5173/does-not-exist` — enjoy the 404 page!

### Step 11: Merge all 3 PRs

Once reviewed:
1. Merge PR #1
2. Merge PR #2
3. Merge PR #3

### Step 12: Verify everything works together

```bash
git pull origin main
make test
make build
```

- All tests (original + 2 new test files) should pass
- Frontend builds with the new 404 page
- Navigate to `http://localhost:5173/xyz` to see the 404 page live

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Issues created | ___ / 3 |
| Parallel sessions running | ___ / 3 |
| Time from assignment to all 3 PRs | ___ min |
| PRs that passed on first try | ___ / 3 |
| Total lines of code generated (tests + UI) | ___ |
| Lines you wrote manually | 0 |

---

## Key Takeaway

> **Parallel delegation turns sequential hours into parallel minutes.** Three independent tasks that would take 3+ hours back-to-back completed simultaneously while you did other work. Agent HQ gives you a control panel to monitor all sessions.

### What Made This Work

- **Mixed task types**: Backend tests + frontend UI — Copilot handles both in parallel
- **Independent tasks**: No dependencies between the 3 issues
- **Clear reference patterns**: `suppliersRepo.test.ts` for tests, existing components for UI
- **Well-structured issues**: Specific requirements = consistent output across all 3
- **Agent HQ**: Dashboard to monitor all sessions without context switching

---

## Bonus Challenge (Optional, 15 min)

Create issues for additional untested repositories (`branchesRepo`, `headquartersRepo`, `deliveriesRepo`) and assign all to Copilot simultaneously. Can you get 5+ parallel sessions running?
