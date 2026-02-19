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

The API has **7 repositories** but only **1 has unit tests** (`suppliersRepo.test.ts`). Each untested repo is an independent task — perfect for parallel delegation.

| Repository | Has Tests? | Status |
|-----------|-----------|--------|
| `suppliersRepo.ts` | ✅ Yes | Reference pattern |
| `productsRepo.ts` | ❌ No | → Issue #1 |
| `ordersRepo.ts` | ❌ No | → Issue #2 |
| `branchesRepo.ts` | ❌ No | → Issue #3 |
| `headquartersRepo.ts` | ❌ No | Optional bonus |
| `deliveriesRepo.ts` | ❌ No | Optional bonus |
| `orderDetailsRepo.ts` | ❌ No | Optional bonus |

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

### Step 3: Create Issue #3 — Branches Repo Tests

**Title:** `Add unit tests for branchesRepo.ts`

**Body:**

```markdown
## Summary

Add comprehensive unit tests for `api/src/repositories/branchesRepo.ts`.

## Implementation

- Create `api/src/repositories/branchesRepo.test.ts`
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
- Session for branchesRepo tests

---

## Part D — Monitor in Agent HQ (10 min)

### Step 6: Watch the progress

In Agent HQ, each session shows:
- **Status**: Planning → Implementing → Testing → PR Ready
- **Files being modified**: The test file being created
- **Build status**: Whether `npm test` passes

### Step 7: Compare approaches

While waiting, note how each session independently:
1. Reads `suppliersRepo.test.ts` as the reference pattern
2. Reads the target repository file
3. Creates a test file with the same structure
4. Runs `npm test` to verify
5. Opens a PR

**All 3 happen simultaneously** — this is the power of parallel delegation.

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

### Step 9: Review PR #2 and #3

Repeat for Orders and Branches. Each should:
- Follow the same pattern
- Test the methods specific to that repository
- Use proper mock setup
- Pass all tests

### Step 10: Merge all 3 PRs

Once reviewed:
1. Merge PR #1
2. Merge PR #2
3. Merge PR #3

### Step 11: Verify everything works together

```bash
git pull origin main
cd api
npm test
```

All tests (original + 3 new test files) should pass together.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Issues created | ___ / 3 |
| Parallel sessions running | ___ / 3 |
| Time from assignment to all 3 PRs | ___ min |
| PRs that passed tests on first try | ___ / 3 |
| Total lines of test code generated | ___ |
| Lines you wrote manually | 0 |

---

## Key Takeaway

> **Parallel delegation turns sequential hours into parallel minutes.** Three independent tasks that would take 3+ hours back-to-back completed simultaneously while you did other work. Agent HQ gives you a control panel to monitor all sessions.

### What Made This Work

- **Independent tasks**: Each test file has no dependencies on the others
- **Clear reference pattern**: `suppliersRepo.test.ts` gave Copilot a template to follow
- **Well-structured issues**: Specific requirements = consistent output across all 3
- **Existing Skill** (`.github/skills/api-endpoint/SKILL.md`): Testing patterns documented
- **Agent HQ**: Dashboard to monitor all sessions without context switching

---

## Bonus Challenge (Optional, 15 min)

Create issues for the remaining 3 untested repositories (`headquartersRepo`, `deliveriesRepo`, `orderDetailsRepo`) and assign all to Copilot simultaneously. Can you get 6 parallel sessions running?
