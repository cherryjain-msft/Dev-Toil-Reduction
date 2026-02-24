# Lab 10 — Custom Agents: "Build Your Own Agent"

| | |
|---|---|
| **Toil** | Repeating specialized workflows manually |
| **Feature** | Custom Copilot Agents (`.agent.md`) |
| **Time** | 45–60 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | VS Code with Copilot Chat |

## Toil Scorecard

| Metric | Without Custom Agents | With Custom Agents |
|--------|----------------------|-------------------|
| Specialized workflow setup | Re-explain every time | Invoke by name |
| Consistency of output | Varies per session | Codified behavior |
| Onboarding to workflows | Manual training | `@agent-name` |
| Context switching for reviews | 4+ tools | 1 agent call |

---

## What You'll Do

You will explore the 5 existing agents in this repo (including the TDD handoff chain), understand the anatomy of each, and then **build 2 new agents** — an Accessibility Auditor and a PR Review Pipeline that chains agents together via **handoffs**.

---

## Part A — Explore Existing Agents (10 min)

### Step 1: Explore the 5 existing agents

Open each file in `.github/agents/` and note the structure:

| Agent | File | Purpose |
|-------|------|---------|
| API Specialist | `api-specialist.agent.md` | End-to-end REST API design and implementation |
| BDD Specialist | `bdd-specialist.agent.md` | Gherkin feature files + Playwright E2E tests |
| TDD Red | `tdd-red.agent.md` | Write failing tests (RED phase) |
| TDD Green | `tdd-green.agent.md` | Write minimal code to pass tests (GREEN phase) |
| TDD Planner | `tdd-planner.agent.md` | Create TDD test plans without writing code |

### Step 2: Understand the agent anatomy

Every `.agent.md` file has:

```markdown
---
name: 'Agent Name'              ← How to invoke: @agent-name
description: 'What it does'     ← Shown in agent picker UI
tools: ['tool1', 'tool2']       ← Optional: which tools the agent can use
handoffs:                        ← Optional: chain to other agents
  - label: 'Button text'
    agent: other-agent
    prompt: 'What to tell the next agent'
    send: true                   ← Auto-handoff (no user click needed)
---

# System Prompt Content         ← Instructions the agent follows

## Expertise                    ← What the agent knows
## Workflow                     ← Step-by-step process
## Output Format                ← How results are structured
## Best Practices               ← Rules and constraints
```

> **Key concept — Handoffs**: The `handoffs` block lets one agent pass context to another agent when its job is done. This is what makes agents composable — each specialist does one thing well and the orchestrator ties them together. Open `tdd-planner.agent.md` and trace the chain: **TDD Planner → TDD Red → TDD Green**.

### Step 3: Test an existing agent

In Copilot Chat, type:

```
@api-specialist Design a REST API for a "Notification" entity with fields: 
notificationId, userId, message, type (email/sms/push), sentAt, readAt, status.
```

Watch the API Specialist agent:
1. Note assumptions
2. Design the schema
3. Plan the implementation
4. Produce complete code

---

## Part B — Build an Accessibility Auditor Agent (15 min)

### Step 4: Create the accessibility auditor

Create `.github/agents/accessibility-auditor.agent.md`:

````markdown
---
name: 'Accessibility Auditor'
description: 'Audit React components for WCAG 2.1 AA compliance. Use to check accessibility of pages, forms, and interactive components.'
tools: ['codebase', 'search', 'editFiles', 'problems']
---

# Accessibility Auditor Agent

You are a WCAG 2.1 AA accessibility expert for the OctoCAT Supply Chain Management System (React + Tailwind frontend).

## Audit Checklist

When auditing a component, check:

### 1. Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skips)
- [ ] Lists use `<ul>/<ol>/<li>` (not styled divs)
- [ ] Buttons use `<button>`, not `<div onClick>`
- [ ] Links use `<a>` with `href`, not `<span onClick>`
- [ ] Tables use `<table>/<thead>/<tbody>/<tr>/<th>/<td>`
- [ ] Forms use `<form>`, inputs have `<label>`

### 2. ARIA
- [ ] Interactive elements have `aria-label` or visible text
- [ ] Modals have `role="dialog"` and `aria-modal="true"`
- [ ] Loading states use `aria-busy="true"` or `role="status"`
- [ ] Error messages use `role="alert"`
- [ ] Expandable sections use `aria-expanded`

### 3. Keyboard Navigation
- [ ] All interactive elements focusable via Tab
- [ ] Modals trap focus
- [ ] Escape key closes modals
- [ ] Custom widgets have keyboard handlers (Enter, Space, Arrow keys)
- [ ] Focus visible indicator (`:focus-visible` or `focus:ring`)

### 4. Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 (normal) / 3:1 (large)
- [ ] Non-text contrast ratio ≥ 3:1
- [ ] Information not conveyed by color alone
- [ ] Dark mode has sufficient contrast

### 5. Images & Media
- [ ] Images have `alt` text (or `alt=""` for decorative)
- [ ] Icons have `aria-label` or `aria-hidden="true"`
- [ ] SVGs have `role="img"` and `aria-label` or `<title>`

## Output Format

```
🔍 ACCESSIBILITY AUDIT

📄 Component: ComponentName
📍 File: path/to/file.tsx

━━ VIOLATIONS ━━━━━━━━━━━━━━

🔴 CRITICAL (must fix):
  Line {n}: {element} missing {attribute}
  Fix: Add {attribute}="{value}"

🟡 WARNING (should fix):
  Line {n}: {description}
  Suggestion: {fix}

🟢 PASSING:
  ✓ Heading hierarchy correct
  ✓ Buttons use semantic elements
  ✓ Focus indicators present

━━ SUMMARY ━━━━━━━━━━━━━━━━
Score: X/Y checks passed
Level: WCAG 2.1 AA {Compliant / Needs Work / Non-Compliant}
```

## Auto-Fix Capability

When asked to fix issues, apply minimal changes:
- Add missing `aria-label` attributes
- Replace `<div onClick>` with `<button>`
- Add `role` attributes to dynamic regions
- Add keyboard event handlers alongside click handlers
- Add `alt` text to images
````

### Step 5: Test the accessibility auditor

```
@accessibility-auditor Audit the Products page component at 
frontend/src/components/entity/product/Products.tsx.
Report all WCAG 2.1 AA violations.
```

### Step 6: Fix the issues

```
@accessibility-auditor Fix all critical and warning accessibility 
issues you found in Products.tsx.
```

---

## Part C — Build a PR Review Pipeline Agent (15 min)

### Why handoffs, not skills?

In Lab 09 you created **skills** — reusable pattern blueprints that Copilot follows when generating code. Skills are great for _"how to create X"_ recipes. But what about multi-step **workflows** where different specialists need to run _in sequence_? That's what **agent handoffs** solve — they let one agent's output flow into the next, creating a pipeline. The TDD chain you examined in Part A (Planner → Red → Green) is a handoff pipeline. Now you'll build your own.

### Step 7: Create the PR review pipeline agent

This agent orchestrates a **multi-agent review pipeline**. When you ask it to review changes, it:
1. Analyzes the changeset and produces a summary
2. Hands off to the **Code Reviewer** (Lab 03) for quality review
3. Hands off to the **Security Reviewer** (Lab 07) for vulnerability scanning
4. Hands off to the **Doc Generator** (Lab 08) for documentation updates

> **Prerequisite**: You should have created the Code Reviewer (Lab 03) and Security Reviewer (Lab 07) agents. The Doc Generator already exists in the repo. If you skipped those labs, create placeholder agents with just a `name` and `description` so the handoff targets exist.

Create `.github/agents/pr-review-pipeline.agent.md`:

````markdown
---
name: 'PR Review Pipeline'
description: 'Orchestrates a multi-agent review pipeline. Analyzes a changeset, then hands off to Code Reviewer, Security Reviewer, and Doc Generator agents in sequence.'
tools: ['codebase', 'search', 'githubRepo', 'problems', 'runSubagent']
handoffs:
  - label: Code Quality Review
    agent: code-reviewer
    prompt: 'Review this changeset for code quality, patterns, and maintainability issues'
    send: true
  - label: Security Scan
    agent: security-reviewer
    prompt: 'Scan this changeset for security vulnerabilities, injection risks, and credential exposure'
  - label: Update Documentation
    agent: doc-generator
    prompt: 'Check if this changeset requires documentation updates and generate them'
  - label: Full Pipeline (all reviewers)
    agent: code-reviewer
    prompt: 'Review this changeset for quality, then hand off to security-reviewer for vulnerability scan, then to doc-generator for documentation updates'
    send: true
---

# PR Review Pipeline Agent

You are a PR review orchestrator for the OctoCAT Supply Chain Management System. You analyze changesets and coordinate specialized reviewer agents.

## Your Role

You are the **first stop** in a review pipeline. You do NOT perform detailed code review, security audit, or documentation generation yourself — you summarize and delegate to specialists.

## Workflow

### 1. Identify the Changeset
- If the user specifies files, read them
- If the user says "review recent changes", use `githubRepo` to identify modified files
- If no specific target, ask the user which files or feature to review

### 2. Produce a Changeset Summary

Analyze the files and output:

```
📋 CHANGESET SUMMARY

📁 Files Changed: {count}
   {list of files with change type: added / modified / deleted}

🏗️ Layers Affected:
   [ ] Database (migrations, seeds)
   [ ] API (models, repositories, routes)
   [ ] Frontend (components, hooks, types)
   [ ] Infrastructure (Docker, CI/CD, config)
   [ ] Documentation

📝 What Changed:
   {2-3 sentence summary of the feature or fix}

⚠️  Risk Areas:
   {Areas that need careful review — new SQL, auth changes, public endpoints, etc.}
```

### 3. Recommend Review Path

Based on the changeset, recommend which reviewers to engage:
- **Code Reviewer** — always recommended for non-trivial changes
- **Security Reviewer** — recommended when changes touch auth, SQL, user input, or API endpoints
- **Doc Generator** — recommended when changes add new endpoints, features, or modify architecture

Present the handoff options and let the user choose, or use "Full Pipeline" to run all three.

## Rules
- **Never** perform detailed code review yourself — that's the Code Reviewer's job
- **Never** audit for security vulnerabilities — that's the Security Reviewer's job
- **Never** write documentation — that's the Doc Generator's job
- **Always** provide context in your handoff so the next agent knows what to focus on
- Keep your summary concise — the specialists will do the deep work

## Handoff Context Template

When handing off, include this context for the receiving agent:

```
Changeset: {files list}
Summary: {what changed}
Risk areas: {what to focus on}
Original request: {what the user asked for}
```
````

### Step 8: Compare handoff styles

Before testing, compare the two handoff patterns in this repo:

| | TDD Chain | PR Review Pipeline |
|---|---|---|
| **Pattern** | Linear pipeline (A → B → C) | Fan-out (A → B, A → C, A → D) |
| **Auto-handoff** | Each step auto-sends to next (`send: true`) | First review auto-sends; others are manual |
| **Agent role** | Each agent does real work (plans, writes tests, writes code) | Orchestrator only summarizes; specialists do the work |
| **When to use** | Sequential steps where output feeds input | Independent reviews that can run in any order |

Open `tdd-planner.agent.md` side-by-side with your new `pr-review-pipeline.agent.md` and note how the `handoffs:` YAML differs.

### Step 9: Test the PR review pipeline (the wow moment)

Try this prompt:

```
@pr-review-pipeline Review the files in api/src/routes/product.ts 
and api/src/repositories/productsRepo.ts. 
I recently added input validation to these endpoints.
```

Watch the pipeline:
1. The orchestrator reads the files and produces a concise **changeset summary**
2. It identifies risk areas (input validation → security relevant)
3. It recommends the Code Reviewer + Security Reviewer
4. It **auto-hands off** to the Code Reviewer via `send: true`
5. After code review, you can click **"Security Scan"** to hand off to the Security Reviewer
6. Finally, click **"Update Documentation"** if the Swagger docs need updating

> **Try the full pipeline!** Use this prompt and click "Full Pipeline (all reviewers)":
> ```
> @pr-review-pipeline Review all changes in api/src/routes/ 
> for the new delivery tracking feature.
> ```

### Step 10: Reflect — Agents vs Skills vs Instructions

Now that you've built agents (Labs 03–10), skills (Lab 09), and instructions (Lab 05), compare when to use each:

| Layer | What It Does | Example | When to Use |
|-------|-------------|---------|-------------|
| **Instructions** | Passive rules applied to matching files | "Use parameterized SQL in all routes" | Enforce standards automatically |
| **Skills** | Reusable code-generation blueprints | "Create an API endpoint following our patterns" | Consistent code generation |
| **Agents** | Autonomous specialists with workflows | "Audit this component for WCAG compliance" | Complex multi-step workflows |
| **Agent Handoffs** | Orchestrate multiple agents in sequence | "Run code review → security scan → doc update" | Multi-specialist pipelines |

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Existing agents explored | ___ / 5 |
| New agents created | ___ / 2 |
| Agent audit accuracy (accessibility) | High / Medium / Low |
| Handoff chain tested | ___ agents in pipeline |

---

## Key Takeaway

> **Custom agents turn specialized expertise into on-demand tools. Agent handoffs make them composable.** The accessibility auditor codifies a WCAG checklist so any dev can run an expert audit. The PR review pipeline chains three specialist agents into a single workflow — each does one thing well, and the orchestrator ties them together. Codify it once, invoke by name, get consistent results every time.

### What Made This Work

- **Agent anatomy**: YAML frontmatter (name, description, tools, handoffs) + system prompt (expertise, workflow, output format)
- **Checklists**: Structured audit criteria ensure comprehensive, repeatable coverage
- **Handoffs**: The `handoffs:` block lets agents compose — an orchestrator delegates to specialists without embedding their logic
- **`send: true` vs manual**: Auto-handoffs create seamless pipelines; manual handoffs give users control over which specialists to engage
- **Output format templates**: Consistent, scannable results every time
- **Tool access**: Agents that can read code, run commands, and edit files are dramatically more powerful than chat-only
- **Agents vs Skills**: Skills are code-generation blueprints; agents are autonomous workflow specialists. Handoffs are the unique power of agents that skills cannot provide

---

## Agent Summary — All Created in This Workshop

| Type | Name | Lab | File |
|------|------|-----|------|
| Agent | Code Reviewer | Lab 03 | `.github/agents/code-reviewer.agent.md` |
| Agent | Project Status | Lab 04 | `.github/agents/project-status.agent.md` |
| Agent | Security Reviewer | Lab 07 | `.github/agents/security-reviewer.agent.md` |
| Agent | Doc Generator | Lab 08 | `.github/agents/doc-generator.agent.md` |
| Agent | Accessibility Auditor | Lab 10 | `.github/agents/accessibility-auditor.agent.md` |
| Agent | PR Review Pipeline | Lab 10 | `.github/agents/pr-review-pipeline.agent.md` |
| Skill | Frontend Component | Lab 09 | `.github/skills/frontend-component/SKILL.md` |
