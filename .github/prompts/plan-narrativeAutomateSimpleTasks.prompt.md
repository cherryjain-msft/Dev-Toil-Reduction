# Plan: Workshop Narrative — "Automate Simple Tasks"

> **Companion to**: [plan-reducingDeveloperToilWorkshop.prompt.md](plan-reducingDeveloperToilWorkshop.prompt.md)
> **Source narrative**: "Automate Simple Tasks Pitch Deck" (Revenue Enablement, Oct 2025)

This plan maps the pitch deck's customer-facing narrative to the hands-on workshop labs. Use this as the **storytelling backbone** — the pitch deck sets the "why", the workshop labs deliver the "how".

---

## Narrative Arc (from Pitch Deck)

The deck follows a 5-act structure. Each act maps directly to workshop sections:

```
Act 1: The Problem    → "The Pace of Work Has Outgrown Human Bandwidth"
Act 2: The Pain       → "Developers Are Stuck Doing Toil" + "Small Tasks, Big Cost"
Act 3: The Solution   → "Copilot Automates the Toil"
Act 4: The Proof      → "Teams Already See the Impact" + "Automate Simple Tasks Every Day"
Act 5: The Action     → "Try It in Your Next Sprint"
```

---

## Act 1 — The Problem: Pace vs. Bandwidth

**Deck Message**:
- Pressure to do more with less headcount — efficiency matters
- Businesses expect faster delivery on strategic features, not toil
- AI adoption making it possible to automate simple tasks at scale

**Workshop Connection**:
- **Opening exercise**: Participants fill out the [Toil Scorecard Template](../../workshop/toil-framework/toil-scorecard-template.md) for their own team — identify their top 3 toils, estimate weekly hours lost
- **Reference**: [Developer Toil Inventory](../../workshop/toil-framework/developer-toil-inventory.md) — the 12 toils × SDLC phases table

**Talking Point**: _"How many hours per week does your team spend on work that a machine could do? That's the toil tax."_

---

## Act 2 — The Pain: Toil & Cost

**Deck Message**:
- Routine bug fixes, boilerplate code, repetitive reviews
- Senior devs stuck in "toil work" instead of strategic initiatives
- Critical roadmap items slip while simple tasks clog sprints
- Backlogs slip = features delayed
- Hidden cost of senior engineers on low-value work
- Reduced developer satisfaction and retention

**Workshop Connection — 3 Toil Categories from the Deck**:

| Deck Category | Toil Examples | Workshop Lab |
|---------------|---------------|--------------|
| **Routine bug fixes, boilerplate** | Scaffolding, entity patterns, CRUD boilerplate | Lab 02 (Agent Mode), Lab 11 (Skills) |
| **Repetitive reviews** | PR review bottleneck, standards enforcement | Lab 03 (Code Review), Lab 05 (Custom Instructions) |
| **Senior devs on toil work** | Small issues, backlog clearing, context switching | Lab 01 (Coding Agent), Lab 06 (Parallel Delegation) |

**Talking Point**: _"Every hour a senior engineer spends on a config tweak is an hour NOT spent on your competitive differentiator."_

**Metric to surface**: Use the [ROI Calculator](../../workshop/toil-framework/roi-calculator.md) — plug in team size × avg hourly rate × toil hours/week = annual toil cost.

---

## Act 3 — The Solution: Copilot Automates the Toil

**Deck Message**:
- **Accelerate delivery**: Coding Agent drafts implementations
- **Free up talent**: Code Review Agent + Autofix gets work to ~80% production-ready
- **Boost predictability**: Works directly in PRs/issues/backlogs
- **Happier developers**: Less toil, more meaningful coding

**Workshop Connection — Feature-to-Outcome Map**:

| Deck Outcome | Copilot Feature | Workshop Lab | Demo in OctoCAT Supply |
|-------------|-----------------|--------------|----------------------|
| Accelerate delivery | Coding Agent | Lab 01: "Zero to PR" | Assign "Add DeliveryVehicle entity" issue to Copilot |
| Free up talent | Code Review + Autofix | Lab 03: "AI First-Pass Review" | PR with intentional bugs → Copilot review |
| Boost predictability | Agent HQ + Parallel Agents | Lab 06: "Batch It" | 3 issues assigned simultaneously, monitor in Agent HQ |
| Happier developers | Agent Mode + Custom Instructions | Lab 02 + Lab 05 | Build cart checkout in flow; observe standards compliance |

**Talking Point**: _"This isn't about replacing developers — it's about giving them back the time they should be spending on creative, high-impact work."_

---

## Act 4 — The Proof: Impact & Daily Use Cases

### 4a. Customer Results (Deck Slides 7-8)

**Deck Message**:
- GitHub Copilot Report: Developers complete tasks 55% faster
- Duolingo: 25% faster dev speed, 67% faster PR turnaround, 70% more PRs merged
- ZoomInfo: Developer satisfaction score with Copilot: 72%

**Workshop Connection**:
- Reference these stats in the lab intros as motivation
- After each lab, participants record their own before/after in the Toil Scorecard — building their own proof points
- The workshop generates **customer-specific data** they can take back to leadership

### 4b. Daily Automation Categories (Deck Slide 6)

The deck defines 3 categories of daily automatable tasks. Each maps to specific labs:

#### Category 1: Backlog Cleanup & Boilerplate
| Task | Lab |
|------|-----|
| Clear "easy win" issues (UI tweaks, config updates) | Lab 01: Coding Agent |
| Generate boilerplate for API endpoints | Lab 02: Agent Mode |
| CRUD scaffolding for DB entities | Lab 11: Skills (api-endpoint skill) |

#### Category 2: Code Hygiene & Standards
| Task | Lab |
|------|-----|
| Bulk linting, formatting, type error fixes | Lab 05: Custom Instructions |
| Documentation scaffolding (JSDoc, docstrings) | Lab 10: Documentation |
| Apply accessibility & i18n requirements | Lab 12: Custom Agents (Accessibility Auditor) |

#### Category 3: Testing & Quality
| Task | Lab |
|------|-----|
| Write unit test scaffolding | Lab 02: Agent Mode (tests included) |
| Generate mocks/stubs for test environments | Lab 06: Parallel Delegation (batch test writing) |
| Autofix common bugs (null checks, off-by-ones) | Lab 07: Security Autofix + Lab 09: Debugging |

---

## Act 5 — The Action: "Try It in Your Next Sprint"

**Deck Message**:
1. Identify low-complexity stories
2. Enable Copilot agents for drafting + review
3. Run a 2-week "toil reduction" sprint
4. Pilot Copilot for routine work → free your team for innovation

**Workshop Connection — This IS the pilot sprint**:

The workshop is designed to BE the "2-week toil reduction sprint" the deck recommends. After the workshop, participants leave with:

| Deck Step | Workshop Deliverable |
|-----------|---------------------|
| 1. Identify low-complexity stories | Completed Toil Scorecard with their team's top toils identified |
| 2. Enable Copilot agents | Hands-on experience with Coding Agent, Code Review, Agent HQ |
| 3. Run a toil reduction sprint | The workshop itself — 8-10 labs demonstrating real toil elimination |
| 4. Pilot → innovation | ROI Calculator filled in with workshop data → business case for rollout |

**Post-Workshop Handoff**:
- Participants take the filled Toil Scorecard + ROI Calculator back to their teams
- Pre-crafted GitHub Issues from `workshop/issues/` can be imported into their own repos
- AGENTS.md and custom instructions templates can be copied to their projects
- The "Try It" slide becomes the workshop's closing action item

---

## Narrative Flow for Facilitators

### Recommended Workshop Agenda (aligned to deck narrative)

| Time | Deck Act | Workshop Section | Labs |
|------|----------|-----------------|------|
| **0:00-0:30** | Act 1+2: Problem & Pain | Opening: Toil Scorecard exercise + deck slides 1-4 | — |
| **0:30-1:00** | Act 3: Solution intro | Demo: Copilot feature landscape (slides 5-6) | — |
| **1:00-1:45** | Act 4a: Backlog Cleanup | **Hands-on block 1** | Lab 01 (Coding Agent) |
| **1:45-2:00** | — | Break | — |
| **2:00-2:45** | Act 4a: Boilerplate | **Hands-on block 2** | Lab 02 (Agent Mode) |
| **2:45-3:30** | Act 4b: Code Hygiene | **Hands-on block 3** | Lab 03 (Code Review) + Lab 05 (Instructions) |
| **3:30-3:45** | — | Break | — |
| **3:45-4:30** | Act 4b: Scale out | **Hands-on block 4** | Lab 06 (Parallel/Agent HQ) |
| **4:30-5:15** | Act 4c: Testing & Quality | **Hands-on block 5** | Lab 07 (Security) or Lab 09 (Debugging) |
| **5:15-5:45** | Act 4c: Patterns & Agents | **Hands-on block 6** | Lab 11 (Skills) or Lab 12 (Custom Agents) |
| **5:45-6:15** | Act 5: Try It | Closing: ROI Calculator exercise + slides 9-10 | — |
| **6:15-6:30** | — | Q&A (slide 11) | — |

### Half-Day variant (pick 4-5 labs)

| Time | Focus | Labs |
|------|-------|------|
| **0:00-0:30** | Problem + Solution (deck slides 1-6) | — |
| **0:30-1:15** | Backlog Cleanup | Lab 01 (Coding Agent) |
| **1:15-2:00** | Boilerplate Elimination | Lab 02 (Agent Mode) |
| **2:00-2:15** | Break | — |
| **2:15-3:00** | Code Hygiene | Lab 03 (Code Review) |
| **3:00-3:45** | Scale Out | Lab 06 (Parallel/Agent HQ) |
| **3:45-4:00** | Closing: ROI + Action Items | — |

---

## Metrics Bridge: Deck Claims → Workshop Proof

The deck makes specific claims. The workshop should validate them in real-time:

| Deck Claim | How Workshop Validates |
|-----------|----------------------|
| "55% faster task completion" | Each lab's Toil Scorecard captures before/after time |
| "67% faster PR turnaround" (Duolingo) | Lab 03: Copilot review is instant vs. typical human review wait |
| "70% more PRs merged" | Lab 06: 3 PRs created in parallel during Agent HQ lab |
| "Developer satisfaction 72%" (ZoomInfo) | Post-workshop survey: "How did this feel vs. manual work?" |
| "~80% production-ready" (Coding Agent) | Lab 01: Review PR quality — what needed human refinement? |

---

## Key Principle: Show, Don't Tell

The pitch deck **tells** the story. The workshop **shows** it. Every deck claim should have a lab that proves it with the customer's own hands.

```
Deck slide 5: "Coding Agent drafts implementations"
  → Lab 01: They assign an issue and watch it happen

Deck slide 6: "Clear easy win issues"
  → Lab 06: They assign 3 issues in parallel via Agent HQ

Deck slide 6: "Bulk linting, formatting fixes"
  → Lab 05: AGENTS.md enforces standards automatically

Deck slide 6: "Write unit test scaffolding"
  → Lab 02: Agent Mode generates tests as part of feature build

Deck slide 9: "Developers stay in flow where they already code"
  → Lab 04: MCP Servers keep everything in the editor
```

---

## Files to Create/Update

This narrative plan requires updates to the main workshop plan:

1. **workshop/README.md** — Add "Narrative Arc" section linking deck flow to lab sequence
2. **workshop/FACILITATOR-GUIDE.md** — Include the agenda tables from this plan (full-day + half-day)
3. **workshop/toil-framework/toil-scorecard-template.md** — Ensure it captures the 3 deck categories (Backlog Cleanup, Code Hygiene, Testing & Quality)
4. **workshop/slides/deck-outline.md** — Replace with direct mapping to the "Automate Simple Tasks" deck (slides 1-12 → workshop sections)
5. **Each lab README** — Add a "Narrative Context" section at the top referencing which deck slide/act this lab supports

---

## Connection to Main Workshop Plan

This narrative plan does NOT replace [plan-reducingDeveloperToilWorkshop.prompt.md](plan-reducingDeveloperToilWorkshop.prompt.md). It adds a **storytelling layer**:

- **Main plan** = _what_ to build (repo structure, lab content, metrics framework)
- **This plan** = _how to present it_ (narrative arc, facilitator flow, deck-to-lab mapping)

The main plan's 12 labs remain unchanged. This plan provides:
- Sequencing guidance (which labs to run in which order for narrative impact)
- Talking points per act
- Metrics bridge (deck claims → workshop validation)
- Agenda templates (full-day and half-day)
