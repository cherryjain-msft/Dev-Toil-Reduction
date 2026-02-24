# Lab 05 — Custom Instructions: "Team Standards as Code"

| | |
|---|---|
| **Toil** | Manually enforcing coding standards in every PR |
| **Feature** | Custom Instructions (copilot-instructions.md, path-scoped instructions, AGENTS.md) |
| **Time** | 45–60 minutes |
| **Difficulty** | Beginner |
| **Prerequisites** | VS Code with Copilot Chat, app running locally |

## Toil Scorecard

| Metric | Without Copilot | With Custom Instructions |
|--------|----------------|--------------------------|
| Standards violations per PR | 3–8 | 0–1 |
| Time reviewing for style/patterns | 15–30 min/PR | 0 |
| Onboarding new devs to conventions | Days | Instant (Copilot knows) |
| Consistency across team | Low (human memory) | High (codified rules) |

---

## What You'll Do

You will explore the existing instruction hierarchy that teaches Copilot your team's standards, create new instructions, and observe how generated code automatically complies — no manual enforcement needed.

---

## Part A — Explore the Instruction Hierarchy (10 min)

This repo already has a 3-level instruction system. Open each file:

### Step 1: Repo-wide instructions

Open `.github/copilot-instructions.md` — these apply to **every file in the repo**.

**Key rules it sets:**
- Prefer incremental diffs
- Security and correctness first
- No `any` types
- Flag duplicate logic
- Use existing custom error types

### Step 2: Path-scoped instructions

Open these files — they apply only to files matching their `applyTo` glob:

| File | Applies To | Key Rules |
|------|-----------|-----------|
| `.github/instructions/api.instructions.md` | `api/src/**/*.ts` | Thin controllers, parameterized SQL, Swagger, proper status codes |
| `.github/instructions/database.instructions.md` | `database/migrations/**` | Immutable migrations, `IF NOT EXISTS`, FK constraints |
| `.github/instructions/frontend.instructions.md` | `frontend/src/**` | Accessibility first, React Query, Tailwind only, no custom CSS |

### Step 3: See the hierarchy in action

In Agent Mode chat, type:

```
Generate a new Express route handler at api/src/routes/reports.ts 
that returns monthly sales totals. Include a GET endpoint.
```

**Observe:** The generated code should automatically:
- ✅ Use parameterized SQL (from `api.instructions.md`)
- ✅ Include Swagger JSDoc (from `api.instructions.md`)
- ✅ Use proper error handling with `next(error)` (from `copilot-instructions.md`)
- ✅ No `any` types (from `copilot-instructions.md`)

---

## Part B — Create a New Path-Scoped Instruction (15 min)

### Step 4: Create a testing instruction file

Create `.github/instructions/testing.instructions.md`:

```markdown
---
description: "Standards for writing unit tests in the API layer."
applyTo: "api/src/**/*.test.ts"
---

## Test File Standards

### Structure

- Use `describe` blocks named after the class/module under test
- Use `it` blocks with descriptive names: `it('should return empty array when no records exist')`
- Group tests by method: `describe('findAll', () => { ... })`
- Include these test categories for every repository method:
  1. **Happy path** — correct input produces correct output
  2. **Empty/not found** — missing data handled gracefully
  3. **Error case** — database errors propagated correctly

### Setup & Teardown

- Create mock database using `vi.fn()` pattern from `suppliersRepo.test.ts`
- Reset mocks in `beforeEach`
- Each test must be independent — no shared state between tests

### Assertions

- Use `expect(result).toEqual()` for object comparisons
- Use `expect(mockDb.all).toHaveBeenCalledWith()` to verify SQL queries
- Always verify the exact SQL string and parameters passed to the mock

### Naming Convention

- Test file: `{entity}sRepo.test.ts` (plural, matching repository file)
- Describe block: `EntityNamesRepository`
- It block: starts with `should` — e.g., `should return all entities`

### What NOT To Do

- ❌ Don't use real database connections in unit tests
- ❌ Don't skip error case tests
- ❌ Don't use `any` in test code — type your mocks
- ❌ Don't test implementation details — test behavior
```

### Step 5: Test the new instruction

In Agent Mode chat, type:

```
Generate unit tests for api/src/repositories/ordersRepo.ts 
following the project's testing patterns.
```

**Observe:** The generated tests should follow your new testing instructions:
- ✅ `describe` blocks named after `OrdersRepository`
- ✅ `it('should ...')` naming convention
- ✅ Mock DB with `vi.fn()`
- ✅ Happy path + empty/not found + error cases
- ✅ No `any` types

---

## Part C — Create a Custom Convention Instruction (15 min)

### Step 6: Create a commit message instruction

Create `.github/instructions/git-conventions.instructions.md`:

````markdown
---
description: "Git commit message and branch naming conventions for this project."
applyTo: "**"
---

## Commit Message Format

Use Conventional Commits:

```
<type>(<scope>): <description>

[optional body]
```

### Types
- `feat` — new feature
- `fix` — bug fix
- `test` — adding/updating tests
- `docs` — documentation only
- `refactor` — code change that doesn't fix a bug or add a feature
- `chore` — build, CI, deps, or tooling changes

### Scopes
- `api` — backend changes
- `frontend` — frontend changes
- `db` — database migrations/seeds
- `ci` — GitHub Actions workflows
- `docs` — documentation

### Examples
- `feat(api): add delivery vehicle CRUD endpoints`
- `fix(frontend): correct cart total calculation with discounts`
- `test(api): add unit tests for ordersRepo`

## Branch Naming

Format: `<type>/<short-description>`

Examples:
- `feat/delivery-vehicles`
- `fix/cart-total-discount`
- `test/orders-repo-coverage`
````

### Step 7: Test the git convention instruction

In Agent Mode chat, after making some changes, type:

```
Suggest a commit message for my current changes.
```

The suggestion should follow your Conventional Commits format.

---

## Part D — Verify Instructions Work Together (5 min)

### Step 8: Generate code that triggers multiple instructions

In Agent Mode, type:

```
Add a "categories" feature to the API:
1. Create a Category model with fields: categoryId, name, description
2. Create the repository
3. Create the routes with Swagger docs
4. Create unit tests
5. Create a database migration
```

**Verify the generated code follows ALL instruction layers:**
- ✅ Repo-wide: No `any`, proper error handling, minimal diffs
- ✅ API-scoped: Parameterized SQL, Swagger, thin controllers, repository pattern
- ✅ Testing-scoped: `describe`/`it` structure, mock DB, happy + error paths

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Instruction files explored | ___ / 3 |
| New instruction files created | ___ |
| Did generated code follow instructions? | Yes / Partially / No |
| Standards violations in generated code | ___ |

---

## Key Takeaway

> **Custom instructions turn tribal knowledge into codified rules.** Instead of repeating "follow our conventions" in PR reviews, you write the conventions once in instruction files — Copilot enforces them in every generated line. New team members get instant alignment.

### What Made This Work

- **Instruction hierarchy**: Repo-wide → path-scoped → file-specific
- **`applyTo` globs**: Instructions activate only for matching files
- **Existing patterns**: Instructions reference real examples in the codebase
- **Composability**: Multiple instructions combine for comprehensive coverage
