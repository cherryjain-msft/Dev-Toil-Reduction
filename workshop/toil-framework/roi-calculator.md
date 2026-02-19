# ROI Calculator — Copilot for Developer Toil Reduction

> Quantify the return on investment for GitHub Copilot adoption using workshop measurements.

---

## Step 1: Gather Your Numbers

Fill in from your workshop [Toil Scorecard](toil-scorecard-template.md):

| Input | Your Value |
|-------|:---:|
| **A.** Average time saved per task with Copilot (min) | ___ |
| **B.** Similar tasks per developer per week | ___ |
| **C.** Number of developers on team | ___ |
| **D.** Working weeks per year | 50 |
| **E.** Fully-loaded cost per developer per hour ($) | ___ |
| **F.** Copilot license cost per developer per year ($) | ___ |

---

## Step 2: Calculate Weekly Savings

```
Weekly time saved per developer  =  A × B  =  ___ min  =  ___ hours
Weekly time saved for team       =  (A × B × C) / 60  =  ___ hours
```

---

## Step 3: Calculate Annual Savings

```
Annual hours saved per dev       =  (A × B × D) / 60       =  ___ hours
Annual hours saved for team      =  (A × B × C × D) / 60   =  ___ hours
Annual dollar savings for team   =  Annual hours × E        =  $___
```

---

## Step 4: Calculate ROI

```
Total Copilot cost (annual)      =  C × F                   =  $___
Net savings                      =  Annual dollar savings − Total cost  =  $___
ROI percentage                   =  (Net savings / Total cost) × 100    =  ___%
Payback period                   =  Total cost / (Annual savings / 12)  =  ___ months
```

---

## Step 5: Category Breakdown

Break down savings by toil category for a more detailed picture:

### Backlog Cleanup & Boilerplate (Labs 01, 02, 06, 10, 11)

| Activity | Tasks/week | Min saved/task | Weekly hours saved |
|----------|:---:|:---:|:---:|
| Entity scaffolding | | | |
| UI component creation | | | |
| Test writing | | | |
| Documentation | | | |
| **Subtotal** | | | **___** |

### Code Hygiene & Standards (Labs 03, 05, 07, 08, 12)

| Activity | Tasks/week | Min saved/task | Weekly hours saved |
|----------|:---:|:---:|:---:|
| PR reviews | | | |
| Standards enforcement | | | |
| Security reviews | | | |
| CI/CD pipeline work | | | |
| **Subtotal** | | | **___** |

### Firefighting & Debugging (Labs 04, 09)

| Activity | Tasks/week | Min saved/task | Weekly hours saved |
|----------|:---:|:---:|:---:|
| Debugging failures | | | |
| CI investigation | | | |
| Vulnerability fixes | | | |
| Context switching | | | |
| **Subtotal** | | | **___** |

---

## Quick Reference: Example Calculation

> Team of 10 developers, saving an average of 30 min per task, 8 tasks per week, $75/hour fully-loaded cost, $19/month Copilot license.

```
Weekly hours saved per dev   =  (30 × 8) / 60        =    4 hours
Annual hours saved per dev   =  4 × 50               =  200 hours
Annual hours saved (team)    =  200 × 10              =  2,000 hours

Annual dollar savings        =  2,000 × $75           =  $150,000
Annual Copilot cost          =  10 × $19 × 12         =  $2,280
Net savings                  =  $150,000 − $2,280     =  $147,720
ROI                          =  ($147,720 / $2,280)   =  6,479%
Payback period               =  $2,280 / ($150,000/12)=  0.18 months (< 1 week)
```

---

## Presenting to Leadership

### One-Slide Summary

| Metric | Value |
|--------|-------|
| Team size | ___ developers |
| Annual hours reclaimed | ___ hours |
| Dollar value of reclaimed time | $___ |
| Copilot investment | $___ |
| Net ROI | ___% |
| Payback period | ___ months |

### Talking Points

1. **"We measured it."** — These numbers come from timed lab exercises, not estimates
2. **"It compounds."** — Skills, agents, and instructions improve over time as we refine them
3. **"It's reusable."** — Every agent, skill, and instruction file we create benefits the whole team
4. **"It reduces risk."** — Automated security review + autofix means faster vulnerability remediation
5. **"It scales."** — Parallel Coding Agent means one developer can produce 3× the output without context switching
