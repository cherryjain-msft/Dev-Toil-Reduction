# Developer Toil Inventory

> Use this framework to identify, categorize, and prioritize developer toil in your organization.

---

## What is Developer Toil?

**Toil** is work that is:
- **Manual** — requires a human to do it
- **Repetitive** — done more than once
- **Automatable** — could be handled by a tool or AI
- **Tactical** — no lasting value (doesn't improve the system)
- **Scaling linearly** — grows proportionally with codebase/team size

Toil is not "bad work" — it's necessary work that **shouldn't require a human**.

---

## Three Categories of Developer Toil

### 1. Backlog Cleanup & Boilerplate

Work that converts requirements into repetitive code patterns.

| Toil | Example | Copilot Feature | Workshop Lab |
|------|---------|----------------|:---:|
| Scaffolding CRUD entities | Model + repo + routes + migration + tests | Coding Agent | 01 |
| Building UI components | React components with state, routing, styling | Agent Mode | 02 |
| Writing unit tests | Test files for every repo/service method | Coding Agent (parallel) | 06 |
| Generating documentation | API docs, component docs, architecture docs | Agent Mode + Doc Agent | 10 |
| Repeating entity patterns | Same file structure for every new entity | Skills | 11 |

**Estimated toil:** 2–4 hours per entity, 10–20 entities per quarter = **20–80 hours/quarter per dev**

---

### 2. Code Hygiene & Standards Enforcement

Work that ensures code quality, consistency, and compliance.

| Toil | Example | Copilot Feature | Workshop Lab |
|------|---------|----------------|:---:|
| PR reviews (obvious issues) | Catching typos, missing null checks, style issues | Code Review | 03 |
| Enforcing conventions | Import order, naming, file structure | Custom Instructions | 05 |
| Security review | OWASP Top 10, SQL injection, XSS | Security Autofix + Agent | 07 |
| CI/CD maintenance | Updating workflows, adding new pipelines | CI/CD Agent | 08 |
| Updating dependencies | Compatibility checks after upgrades | Custom Agents | 12 |

**Estimated toil:** 3–6 hours/week across reviews, standards, security = **150–300 hours/year per dev**

---

### 3. Firefighting & Debugging

Work that identifies and resolves failures, outages, and regressions.

| Toil | Example | Copilot Feature | Workshop Lab |
|------|---------|----------------|:---:|
| Debugging test failures | Reading stack traces, tracing root cause | Debug Agent | 09 |
| Debugging runtime errors | Reproducing, isolating, fixing production bugs | Debug Agent | 09 |
| Investigating CI failures | Reading CI logs, identifying flaky tests | MCP Servers + Debug Agent | 04, 09 |
| Vulnerability remediation | Fixing CodeQL/Dependabot alerts | Security Autofix | 07 |
| Auto-triaging failures | Auto-analyzing and creating fix PRs | Self-Healing DevOps | 09 |

**Estimated toil:** 4–8 hours/week debugging = **200–400 hours/year per dev**

---

## Toil Audit Worksheet

Use this to inventory your team's actual toil. Rate each item 1–5.

| Activity | Frequency (1=rare, 5=daily) | Time per occurrence (min) | Automatable? (1=no, 5=fully) | Priority Score |
|----------|:---:|:---:|:---:|:---:|
| Scaffolding new entities | | | | |
| Writing boilerplate tests | | | | |
| Building standard UI pages | | | | |
| Reviewing PRs for obvious bugs | | | | |
| Enforcing code conventions | | | | |
| Writing/updating documentation | | | | |
| Setting up CI/CD pipelines | | | | |
| Debugging test failures | | | | |
| Debugging production issues | | | | |
| Fixing security vulnerabilities | | | | |
| Updating dependency versions | | | | |
| Creating GitHub issues from bugs | | | | |
| Context switching between tools | | | | |
| _(add your own)_ | | | | |
| _(add your own)_ | | | | |

**Priority Score** = Frequency × Time × Automatable

Sort by Priority Score descending — start automating from the top.

---

## Mapping Toil to Copilot Features

```
                    ┌─────────────────────┐
                    │   Developer Toil    │
                    └────────┬────────────┘
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                  ▼
   ┌───────────────┐ ┌──────────────┐ ┌────────────────┐
   │  Backlog &    │ │ Code Hygiene │ │ Firefighting & │
   │  Boilerplate  │ │ & Standards  │ │   Debugging    │
   └───────┬───────┘ └──────┬───────┘ └────────┬───────┘
           │                │                   │
     ┌─────┴─────┐   ┌─────┴─────┐      ┌─────┴─────┐
     │ Coding    │   │ Code      │      │ Debug     │
     │ Agent     │   │ Review    │      │ Agent     │
     │ Agent Mode│   │ Custom    │      │ MCP       │
     │ Skills    │   │ Instruct. │      │ Security  │
     │ Parallel  │   │ Agents    │      │ Autofix   │
     │ Prompts   │   │ CI/CD     │      │ Self-Heal │
     └───────────┘   └───────────┘      └───────────┘
```

---

## Next Steps

1. **Complete the audit worksheet** with your team
2. **Pick the top 3 toils** by priority score
3. **Map each to a Copilot feature** using the tables above
4. **Do the corresponding lab** to learn the feature
5. **Measure before/after** using the [Toil Scorecard](toil-scorecard-template.md)
6. **Calculate ROI** using the [ROI Calculator](roi-calculator.md)
