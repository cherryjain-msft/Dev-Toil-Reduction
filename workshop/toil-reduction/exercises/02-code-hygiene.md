# Exercise 2 — Code Hygiene & Standards

| | |
|---|---|
| **Category** | Code Hygiene & Standards |
| **Deck Message** | "Bulk linting, formatting fixes" + "Repetitive reviews" + "Standards enforcement" |
| **Time** | 30 minutes |
| **Difficulty** | Medium–Advanced |
| **Features** | Custom Instructions, AGENTS.md, Code Review, Custom Agents |

## Toil Scorecard

| Metric | Without Copilot | With Copilot | Your Result |
|--------|----------------|--------------|-------------|
| Standards violations per PR | 3–8 | 0–1 | ___ |
| Time to first PR review | 4–24 hours | < 1 minute | ___ |
| Bugs caught before human review | 0 | 5–15 per PR | ___ |
| Onboarding new devs to conventions | Days | Instant | ___ |

---

## Module A — Standards as Code (10 min) ▸ Custom Instructions + AGENTS.md

> **Pattern**: Codify your team's standards so Copilot enforces them automatically in every generation.

### Step 1: Explore the existing instruction hierarchy

Open these 3 files and skim them — they're already teaching Copilot your standards:

| File | Scope | Key Rules |
|------|-------|-----------|
| `.github/copilot-instructions.md` | Every file | No `any`, security first, proper errors |
| `.github/instructions/api.instructions.md` | `api/src/**/*.ts` | Parameterized SQL, Swagger, thin controllers |
| `.github/instructions/frontend.instructions.md` | `frontend/src/**` | Tailwind only, React Query, accessibility |

### Step 2: Run the setup prompt

1. Open Command Palette → **"Copilot: Run Prompt File"**
2. Select `workshop/toil-reduction/prompts/setup-team-standards.prompt.md`

This creates 3 new files:
- `AGENTS.md` at repo root — repo-level map for Copilot
- `.github/instructions/testing.instructions.md` — test file standards
- `.github/instructions/git-conventions.instructions.md` — commit/branch naming

### Step 3: Verify standards enforcement

In Agent Mode, type:

```
Generate unit tests for api/src/repositories/ordersRepo.ts 
following the project's testing patterns.
```

**Check that the generated tests automatically follow your new `testing.instructions.md`:**
- ✅ `describe` blocks named after the class
- ✅ `it('should ...')` naming convention
- ✅ Mock DB with `vi.fn()`
- ✅ Happy path + empty/not found + error cases
- ✅ No `any` types

> Discard the generated tests (we'll create them properly in Exercise 3). The point is to see standards auto-enforced.

---

## Module B — AI First-Pass Review (15 min) ▸ Code Review

> **Pattern**: Inject intentionally buggy code → Copilot Code Review catches it in seconds.

### Step 4: Run the buggy code prompt

1. Open Command Palette → **"Copilot: Run Prompt File"**
2. Select `workshop/toil-reduction/prompts/create-buggy-analytics.prompt.md`

This creates a branch `toil-reduction-buggy-review` with an `analytics.ts` route containing **8 intentional bugs**, pushes it, and creates a PR.

### Step 5: Request Copilot Code Review

1. Go to the PR on GitHub
2. Click **Reviewers** → select **Copilot**
3. Wait ~30 seconds for the review

### Step 6: Score Copilot's review

Count how many of these 8 bugs Copilot catches:

| # | Bug | Severity | Caught? |
|---|-----|----------|---------|
| 1 | SQL injection via `'${startDate}'` string interpolation | 🔴 Critical | ☐ |
| 2 | Missing try/catch in `/top-products` handler | 🟡 Medium | ☐ |
| 3 | `any` type on `req` and `res` parameters | 🟡 Medium | ☐ |
| 4 | Hardcoded API key `"sk-prod-analytics-key-2024-secret"` | 🔴 Critical | ☐ |
| 5 | No input validation on query parameters | 🟡 Medium | ☐ |
| 6 | Loose equality `==` instead of `===` | 🟢 Low | ☐ |
| 7 | Another `any` type in `forEach` callback | 🟢 Low | ☐ |
| 8 | `console.log(error)` instead of `next(error)` | 🟡 Medium | ☐ |

**Total caught: ___ / 8**

### Step 7: Apply suggested fixes

For each Copilot comment with a **suggested fix**:
1. Click **Apply suggestion** (or **Commit suggestion**)
2. Each creates a commit fixing that issue

### Step 8: Re-request review

After applying fixes, re-request review from Copilot. It should now show fewer (or zero) issues.

---

## Module C — Custom Review Agent (5 min) ▸ Custom Agents

> **Pattern**: Create a team-specific review agent that goes beyond default Copilot Code Review.

### Step 9: Copy the pre-built agent

Copy the agent file to your `.github/agents/` directory:

```bash
cp workshop/toil-reduction/agents/code-reviewer.agent.md .github/agents/code-reviewer.agent.md
```

### Step 10: Invoke the agent

In Copilot Chat (Agent mode), type:

```
@code-reviewer Review the file api/src/routes/analytics.ts against our team standards.
```

The agent outputs a structured review with severity levels:
- 🔴 **BLOCK**: Must fix before merge
- 🟡 **WARN**: Should fix
- 🟢 **NIT**: Optional

### Step 11: Compare the two review approaches

| Aspect | Copilot Code Review (PR) | Custom Agent (Chat) |
|--------|--------------------------|---------------------|
| Where | On PR in GitHub.com | In VS Code chat |
| Standards | General best practices | Your team's specific rules |
| Output | Inline PR comments | Structured severity checklist |
| Use case | Every PR automatically | Pre-PR self-check |

### Step 12: Clean up

Close the PR without merging (it was intentionally buggy):

```bash
git checkout main
git branch -D toil-reduction-buggy-review
```

---

## What Made This Work

- **Instruction hierarchy** (`copilot-instructions.md` → path-scoped → file-specific) — layered standards
- **AGENTS.md** — repo-level context map for Copilot
- **Code Review** — catches 5–8 bugs in seconds vs. hours of human review
- **Custom agent** (`code-reviewer.agent.md`) — encodes team-specific standards as reusable agent
- **Layered approach** — AI catches the 80%, humans focus on the 20% (architecture, business logic)

---

## Transition

> Your standards are now codified and auto-enforced. Code Review catches bugs in seconds. **Next**: Exercise 3 scales out quality — parallel test generation and automated security remediation.

**→ Continue to [Exercise 3: Testing & Quality](03-testing-quality.md)**
