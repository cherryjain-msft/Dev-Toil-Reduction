---
title: "Add unit tests for branchesRepo.ts"
labels: ["enhancement", "testing", "copilot-coding-agent"]
assignees: ["copilot"]
---

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
