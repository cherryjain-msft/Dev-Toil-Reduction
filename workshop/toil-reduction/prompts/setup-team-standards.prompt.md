---
mode: 'agent'
description: 'Exercise 2-A: Set up AGENTS.md, testing instructions, and git conventions'
tools: ['changes', 'codebase', 'editFiles', 'problems', 'runCommands', 'search', 'usages']
---

# Set Up Team Standards

## Context

This repo already has a 3-level instruction hierarchy:
1. `.github/copilot-instructions.md` — repo-wide rules
2. `.github/instructions/api.instructions.md` — API-scoped rules
3. `.github/instructions/frontend.instructions.md` — frontend-scoped rules
4. `.github/instructions/database.instructions.md` — database-scoped rules

We need to add 3 more files to complete the standards framework.

## Task

Create the following 3 files exactly as specified below. Do NOT modify any existing files.

### 1. Create `AGENTS.md` at the repository root

```markdown
# AGENTS.md — OctoCAT Supply Chain Workshop

## Repository Structure

This is a TypeScript monorepo with two main applications and a workshop layer:

### Applications
- `api/` — Express.js REST API with SQLite (port 3000)
- `frontend/` — React 18 + Vite + Tailwind UI (port 5173)

### Workshop
- `workshop/` — Hands-on labs for GitHub Copilot features
- `workshop/labs/` — Individual lab directories with README instructions
- `workshop/issues/` — Pre-crafted GitHub issue templates

### Copilot Configuration
- `.github/copilot-instructions.md` — Repo-wide AI standards
- `.github/instructions/` — Path-scoped instructions (api, frontend, database, testing)
- `.github/agents/` — Custom Copilot agents (API Specialist, TDD, Code Reviewer)
- `.github/skills/` — Copilot Skills (api-endpoint pattern)
- `.github/chatmodes/` — Custom chat modes (Model Selection, Prompt Refiner)
- `.github/prompts/` — Reusable prompt files

### Key Patterns
- **Entity pattern**: Model → Repository → Route → Migration → Seed → Tests
- **Error handling**: Custom errors (NotFoundError, ValidationError) → error middleware
- **Data access**: Repository pattern with factory/singleton
- **SQL**: Always parameterized — never string concatenation
- **Testing**: Vitest with mock DB, `@testing-library/react` for components

### Commands
- `make install` — Install all dependencies
- `make dev` — Start both API and frontend in development mode
- `make test` — Run all tests
- `make build` — Build both projects
```

### 2. Create `.github/instructions/testing.instructions.md`

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

- Do not use real database connections in unit tests
- Do not skip error case tests
- Do not use `any` in test code — type your mocks
- Do not test implementation details — test behavior
```

### 3. Create `.github/instructions/git-conventions.instructions.md`

```markdown
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
```

## Verification

After creating all 3 files:
1. Confirm `AGENTS.md` exists at the repo root
2. Confirm `.github/instructions/testing.instructions.md` exists
3. Confirm `.github/instructions/git-conventions.instructions.md` exists
4. Do NOT modify any existing instruction files
