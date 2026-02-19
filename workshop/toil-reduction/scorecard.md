# 90-Minute Workshop Scorecard

> Fill this in as you complete each exercise. Use the results to calculate your team's ROI with the [ROI Calculator](../toil-framework/roi-calculator.md).

**Participant**: ___________________________  
**Date**: ___________________________  
**Team/Org**: ___________________________

---

## Exercise 1 — Backlog Cleanup & Boilerplate

_Features used: Coding Agent, Agent Mode_

| Metric | Without Copilot (estimate) | With Copilot (actual) | Time Saved |
|--------|---------------------------|----------------------|------------|
| Time to implement DeliveryVehicle entity | ~3 hours | ___ min | ___ |
| Time to build Supplier Dashboard | ~3 hours | ___ min | ___ |
| Files you wrote manually | ~15 files | ___ files | ___ |
| Lines of code typed manually | ~600 lines | ___ lines | ___ |

**Additional observations:**
- Did Coding Agent follow the `api-endpoint` skill pattern? ☐ Yes ☐ Partially ☐ No
- Did Agent Mode follow `frontend.instructions.md` rules? ☐ Yes ☐ Partially ☐ No
- Did all tests pass on first attempt? ☐ Yes ☐ No
- Confidence in generated code quality (1–5): ___

---

## Exercise 2 — Code Hygiene & Standards

_Features used: Custom Instructions, Code Review, Custom Agents_

| Metric | Without Copilot (estimate) | With Copilot (actual) | Time Saved |
|--------|---------------------------|----------------------|------------|
| Time to set up AGENTS.md + instructions | ~2 hours | ___ min | ___ |
| Time to first PR review | 4–24 hours | ___ seconds | ___ |
| Bugs caught by human review (typical) | 3–5 | N/A | ___ |
| Bugs caught by Copilot Code Review | N/A | ___ / 8 | ___ |

**Bug detection breakdown:**

| Bug | Caught? |
|-----|---------|
| 1. SQL injection (string interpolation) | ☐ |
| 2. Missing try/catch | ☐ |
| 3. `any` type on req/res | ☐ |
| 4. Hardcoded API secret | ☐ |
| 5. No input validation | ☐ |
| 6. Loose equality (`==`) | ☐ |
| 7. `any` type in forEach | ☐ |
| 8. `console.log` for errors | ☐ |

**Additional observations:**
- Did generated code follow `testing.instructions.md` automatically? ☐ Yes ☐ Partially ☐ No
- Custom agent review accuracy: ___ / 8 bugs found
- Which approach was more useful — PR review or agent review? _______________

---

## Exercise 3 — Testing & Quality

_Features used: Parallel Delegation, Agent HQ, Security Autofix_

| Metric | Without Copilot (estimate) | With Copilot (actual) | Time Saved |
|--------|---------------------------|----------------------|------------|
| 3 test suites written sequentially | 3–4 hours | ___ min (parallel) | ___ |
| Context switches between tasks | 6–10 | ___ | ___ |
| Time to fix SQL injection vulnerability | 30–120 min | ___ min | ___ |
| Lines of test code generated | ___ | ___ | N/A |

**Parallel delegation results:**

| Test PR | Passed on First Try? | Lines Generated | Pattern Match? |
|---------|---------------------|-----------------|----------------|
| productsRepo.test.ts | ☐ Yes ☐ No | ___ | ☐ Yes ☐ Partially |
| ordersRepo.test.ts | ☐ Yes ☐ No | ___ | ☐ Yes ☐ Partially |
| branchesRepo.test.ts | ☐ Yes ☐ No | ___ | ☐ Yes ☐ Partially |

**Security autofix results:**
- CodeQL alerts triggered: ___
- Copilot Autofix suggestions received: ___
- Fixes applied via one-click Autofix: ___
- All alerts resolved after fix? ☐ Yes ☐ No

---

## Workshop Totals

| Metric | Total |
|--------|-------|
| **Total time saved** (sum of all "Time Saved" above) | ___ hours |
| **Total files generated** by Copilot | ___ |
| **Total lines of code** you wrote manually | ___ |
| **Total bugs caught** automatically | ___ / 8 |
| **Total PRs created** by Coding Agent | ___ |
| **Total vulnerabilities auto-fixed** | ___ |

---

## ROI Projection

Use your workshop results to estimate annual impact for your team:

| Input | Value |
|-------|-------|
| Team size | ___ developers |
| Avg hourly rate (fully loaded) | $___ /hour |
| Estimated toil hours/week per developer | ___ hours |
| Copilot automation rate (from workshop) | ___% |

### Calculation

```
Weekly savings = Team size × Toil hours/week × Automation rate
Annual savings = Weekly savings × 50 weeks × Hourly rate
Copilot cost   = Team size × $19/month × 12 months
Net savings    = Annual savings − Copilot cost
ROI %          = (Net savings / Copilot cost) × 100
```

| Result | Value |
|--------|-------|
| **Weekly hours recovered** | ___ hours |
| **Annual savings** | $___ |
| **Annual Copilot cost** | $___ |
| **Net annual savings** | $___ |
| **ROI** | ___% |

> For a detailed walkthrough, see the [ROI Calculator](../toil-framework/roi-calculator.md).

---

## Key Takeaways

After completing this workshop, write your top 3 takeaways:

1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________

**What will you automate first on your team?**

_______________________________________________________________

**What toil will you target in your next sprint?**

_______________________________________________________________
