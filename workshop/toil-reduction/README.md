# 90-Minute Toil Reduction Workshop

> **Narrative**: "Automate Simple Tasks" Pitch Deck  
> **Level**: Medium–Advanced (assumes Copilot familiarity)  
> **Duration**: 90 minutes (3 × 30-min exercises)  
> **App**: OctoCAT Supply Chain Management System

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Copilot** | Copilot Business or Enterprise with Coding Agent enabled |
| **VS Code** | Latest stable + GitHub Copilot extension |
| **Node.js** | v24+ |
| **Repo** | This repo forked/cloned, `make install` completed |
| **App running** | `make dev` — API at `http://localhost:3000`, Frontend at `http://localhost:5173` |
| **GitHub Advanced Security** | CodeQL configured (for Exercise 3) |

```bash
# Quick setup
make install
make dev
```

---

## Workshop Structure

Three exercises, one per **pitch deck category**. Each exercise contains 2–3 **modules** showcasing different Copilot features.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    90-MINUTE TOIL REDUCTION                         │
├──────────────────┬──────────────────┬───────────────────────────────┤
│  Exercise 1      │  Exercise 2      │  Exercise 3                   │
│  BACKLOG CLEANUP │  CODE HYGIENE    │  TESTING & QUALITY            │
│  30 min          │  30 min          │  30 min                       │
├──────────────────┼──────────────────┼───────────────────────────────┤
│  A: Coding Agent │  A: Custom       │  A: Parallel Delegation       │
│     (fire off)   │     Instructions │     (fire off 3 issues)       │
│  B: Agent Mode   │  B: Code Review  │  B: Security Autofix          │
│     (hands-on)   │     (hands-on)   │     (hands-on)                │
│  C: Review PR    │  C: Custom Agent │  C: Review & Merge 3 PRs      │
│     (merge)      │     (scan)       │     (merge)                   │
└──────────────────┴──────────────────┴───────────────────────────────┘
```

### Overlap Strategy

Exercises 1 and 3 use a **fire-and-forget** pattern:
- **Module A**: Kick off Coding Agent tasks (takes 5–15 min to complete)
- **Module B**: Do hands-on work while Coding Agent runs in the background
- **Module C**: Return to review and merge the Coding Agent PRs

This lets participants maximize the 30-minute window without idle waiting.

---

## Agenda

| Time | Exercise | Category | Modules | Features |
|------|----------|----------|---------|----------|
| **0:00–0:30** | [Exercise 1: Backlog Cleanup](exercises/01-backlog-cleanup.md) | Backlog Cleanup & Boilerplate | A → B → C | Coding Agent, Agent Mode |
| **0:30–1:00** | [Exercise 2: Code Hygiene](exercises/02-code-hygiene.md) | Code Hygiene & Standards | A → B → C | Custom Instructions, Code Review, Custom Agents |
| **1:00–1:30** | [Exercise 3: Testing & Quality](exercises/03-testing-quality.md) | Testing & Quality | A → B → C | Parallel Delegation, Agent HQ, Security Autofix |

---

## Narrative Mapping (Pitch Deck → Workshop)

| Deck Category | Deck Claim | Exercise | Module | Proof Point |
|---------------|-----------|----------|--------|-------------|
| Backlog Cleanup | "Clear easy-win issues" | Ex 1 | A: Coding Agent | Issue → merged PR, zero lines written |
| Backlog Cleanup | "Generate boilerplate for endpoints" | Ex 1 | B: Agent Mode | Multi-component feature from single prompt |
| Code Hygiene | "Bulk linting, formatting fixes" | Ex 2 | A: Custom Instructions | Standards auto-enforced in generated code |
| Code Hygiene | "Repetitive reviews" | Ex 2 | B: Code Review | 8 bugs caught in seconds, not hours |
| Code Hygiene | "Standards enforcement" | Ex 2 | C: Custom Agent | Team-specific review checklist as agent |
| Testing & Quality | "Write unit test scaffolding" | Ex 3 | A: Parallel Delegation | 3 test suites generated simultaneously |
| Testing & Quality | "Autofix common bugs" | Ex 3 | B: Security Autofix | SQL injection → parameterized query, one click |

---

## Files & Resources

### This Workshop

| File | Purpose |
|------|---------|
| [exercises/01-backlog-cleanup.md](exercises/01-backlog-cleanup.md) | Exercise 1 instruction card |
| [exercises/02-code-hygiene.md](exercises/02-code-hygiene.md) | Exercise 2 instruction card |
| [exercises/03-testing-quality.md](exercises/03-testing-quality.md) | Exercise 3 instruction card |
| [prompts/build-supplier-dashboard.prompt.md](prompts/build-supplier-dashboard.prompt.md) | Pre-canned prompt: Supplier Dashboard (Ex 1-B) |
| [prompts/setup-team-standards.prompt.md](prompts/setup-team-standards.prompt.md) | Pre-canned prompt: AGENTS.md + instructions (Ex 2-A) |
| [prompts/create-buggy-analytics.prompt.md](prompts/create-buggy-analytics.prompt.md) | Pre-canned prompt: 8-bug analytics route (Ex 2-B) |
| [prompts/inject-search-vuln.prompt.md](prompts/inject-search-vuln.prompt.md) | Pre-canned prompt: SQL injection demo (Ex 3-B) |
| [agents/code-reviewer.agent.md](agents/code-reviewer.agent.md) | Pre-built agent: Team code reviewer (Ex 2-C) |
| [scorecard.md](scorecard.md) | Per-category metrics card + ROI projection |

### Existing Resources (Reused)

| Resource | Used In |
|----------|---------|
| [workshop/issues/issue-01-add-delivery-vehicle.md](../issues/issue-01-add-delivery-vehicle.md) | Ex 1-A: Issue text for Coding Agent |
| [workshop/issues/issue-06-01-products-repo-tests.md](../issues/issue-06-01-products-repo-tests.md) | Ex 3-A: Test issue 1 of 3 |
| [workshop/issues/issue-06-02-orders-repo-tests.md](../issues/issue-06-02-orders-repo-tests.md) | Ex 3-A: Test issue 2 of 3 |
| [workshop/issues/issue-06-03-branches-repo-tests.md](../issues/issue-06-03-branches-repo-tests.md) | Ex 3-A: Test issue 3 of 3 |
| [.github/skills/api-endpoint/SKILL.md](../../.github/skills/api-endpoint/SKILL.md) | Coding Agent reads this automatically |
| [.github/instructions/](../../.github/instructions/) | Custom instructions hierarchy |
| [workshop/toil-framework/roi-calculator.md](../toil-framework/roi-calculator.md) | Post-workshop ROI calculation |

---

## Quick Reference: Copilot Features Covered

| # | Feature | Where |
|---|---------|-------|
| 1 | **Coding Agent** | Ex 1-A, Ex 1-C |
| 2 | **Agent Mode** | Ex 1-B |
| 3 | **Custom Instructions** | Ex 2-A |
| 4 | **Code Review** | Ex 2-B |
| 5 | **Custom Agents** | Ex 2-C |
| 6 | **Parallel Delegation** | Ex 3-A, Ex 3-C |
| 7 | **Agent HQ** | Ex 3-A, Ex 3-C |
| 8 | **Security Autofix** | Ex 3-B |

---

## After the Workshop

1. Fill in the [Scorecard](scorecard.md) with your results
2. Calculate your team's toil cost with the [ROI Calculator](../toil-framework/roi-calculator.md)
3. Copy the `agents/` and instruction files to your own repos
4. Import the issue templates from `workshop/issues/` into your team's backlog
5. Identify your top 3 toils using the [Developer Toil Inventory](../toil-framework/developer-toil-inventory.md)
