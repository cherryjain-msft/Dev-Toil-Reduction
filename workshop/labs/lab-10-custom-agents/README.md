# Lab 10 — Custom Agents & Chatmodes: "Build Your Own Agent"

| | |
|---|---|
| **Toil** | Repeating specialized workflows manually |
| **Feature** | Custom Copilot Agents (`.agent.md`), Chatmodes (`.chatmode.md`) |
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

You will explore the 5 existing agents and 2 chatmodes in this repo, understand the anatomy of each, and then **build 2 new agents and 1 new chatmode** — giving you a complete toolkit for your team's specialized workflows.

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
---

# System Prompt Content         ← Instructions the agent follows

## Expertise                    ← What the agent knows
## Workflow                     ← Step-by-step process
## Output Format                ← How results are structured
## Best Practices               ← Rules and constraints
```

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

## Part B — Explore Existing Chatmodes (5 min)

### Step 4: Explore the 2 existing chatmodes

Open files in `.github/chatmodes/`:

| Chatmode | File | Purpose |
|----------|------|---------|
| Model Selection | `ModelSelection.chatmode.md` | Compare AI models, recommend best for use case |
| Refine Prompt | `RefinePrompt.chatmode.md` | Transform vague prompts into precise ones |

**Key difference between agents and chatmodes:**

| Aspect | Agent (`.agent.md`) | Chatmode (`.chatmode.md`) |
|--------|--------------------|-----------------------|
| Invoked with | `@agent-name` in chat | Switch mode at top of chat |
| Purpose | Specialized task execution | Modify how the chat behaves |
| Tools | Has own tool set | Uses default tools |
| Scope | Single-task invocation | Entire conversation |
| Best for | "Do this specific thing" | "Think in this way for everything" |

### Step 5: Test a chatmode

1. Open Copilot Chat
2. Click the mode dropdown at the top
3. Select **Refine Prompt**
4. Type a vague prompt: `make the app faster`
5. Watch it refine your prompt into a specific, actionable request

---

## Part C — Build an Accessibility Auditor Agent (15 min)

### Step 6: Create the accessibility auditor

Create `.github/agents/accessibility-auditor.agent.md`:

```markdown
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
```

### Step 7: Test the accessibility auditor

```
@accessibility-auditor Audit the Products page component at 
frontend/src/components/entity/product/Products.tsx.
Report all WCAG 2.1 AA violations.
```

### Step 8: Fix the issues

```
@accessibility-auditor Fix all critical and warning accessibility 
issues you found in Products.tsx.
```

---

## Part D — Build a Performance Reviewer Agent (10 min)

### Step 9: Create the performance reviewer

Create `.github/agents/performance-reviewer.agent.md`:

```markdown
---
name: 'Performance Reviewer'
description: 'Review code for performance issues: N+1 queries, missing indexes, unnecessary re-renders, large bundle imports. Use before deploying or when the app feels slow.'
tools: ['codebase', 'search', 'editFiles', 'runCommands']
---

# Performance Reviewer Agent

You are a performance optimization expert for the OctoCAT Supply Chain Management System.

## API Performance Checks

### Database (SQLite)
- [ ] No N+1 query patterns (loop with individual queries)
- [ ] JOINs used instead of multiple separate queries
- [ ] Indexes exist for columns in WHERE/ORDER BY/JOIN clauses
- [ ] LIMIT used for potentially large result sets
- [ ] No `SELECT *` when only few columns needed

### Routes
- [ ] No unnecessary `await` in loops (use `Promise.all` for parallel)
- [ ] Response data shaped for the consumer (no over-fetching)
- [ ] Pagination implemented for list endpoints

## Frontend Performance Checks

### React
- [ ] No unnecessary re-renders (useMemo/useCallback where appropriate)
- [ ] React Query used with proper cache keys (not useEffect + useState)
- [ ] Lists have `key` prop (not array index for dynamic lists)
- [ ] Large lists use windowing/virtualization
- [ ] Images lazy-loaded for below-fold content

### Bundle
- [ ] No large libraries imported for small features
- [ ] Dynamic imports (`lazy()`) for route-level code splitting
- [ ] No duplicate dependencies in package.json
- [ ] Tree-shakeable imports (`import { x } from` not `import * as`)

## Output Format

```
⚡ PERFORMANCE REVIEW

📊 Impact: HIGH | MEDIUM | LOW

🔴 N+1 QUERY: {file:line}
   {code snippet showing the loop}
   Fix: Batch query with IN clause or JOIN

🟡 MISSING INDEX: Table `{table}`, Column `{column}`
   Queries filtering on this column: {count}
   Fix: CREATE INDEX idx_{table}_{column} ON {table}({column})

🟢 OPTIMIZED: {what's already good}

━━ SUMMARY ━━━━━━━━━━━━━━━━
Critical: X issues
Warnings: Y issues
Estimated impact: {description}
```
```

### Step 10: Test the performance reviewer

```
@performance-reviewer Review all repository files in api/src/repositories/ 
for performance issues. Check for N+1 queries, missing indexes, and 
inefficient SQL patterns.
```

---

## Part E — Build a Code Quality Chatmode (10 min)

### Step 11: Create a chatmode

Create `.github/chatmodes/CodeQualityCoach.chatmode.md`:

```markdown
---
description: "Guides you to write higher-quality code. Every response evaluates code quality and suggests improvements — without changing functionality."
---

# Code Quality Coach Mode

In this mode, you act as a senior developer doing a pair programming session focused on code quality.

## Behavior

For every question or code shared:

1. **Assess** the code quality on 5 dimensions (1-5 scale):
   - Readability: Is it clear what the code does?
   - Maintainability: Can it be changed safely?
   - Testability: Can it be unit tested easily?
   - Security: Are there vulnerabilities?
   - Performance: Are there inefficiencies?

2. **Show the scores** as a quick visual:
   ```
   📊 Quality Score
   Readability:    ████░ 4/5
   Maintainability: ███░░ 3/5
   Testability:    ████░ 4/5
   Security:       ██░░░ 2/5
   Performance:    ████░ 4/5
   Overall:        ███▒░ 3.4/5
   ```

3. **Suggest** the top 3 improvements ranked by impact

4. **Show before/after** code for the top suggestion

## Rules

- Never change functionality — quality improvements only
- Explain the "why" for every suggestion
- Reference SOLID principles, Clean Code, or OWASP when applicable
- Be encouraging — acknowledge what's already good
- When code is already high quality, say so and suggest only minor nits
```

### Step 12: Test the chatmode

1. Switch chat mode to **Code Quality Coach**
2. Paste or reference a code file:

```
Review this file: api/src/repositories/productsRepo.ts

What's its quality score and what should I improve?
```

Watch the chatmode score the code and suggest specific improvements.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Existing agents explored | ___ / 5 |
| Existing chatmodes explored | ___ / 2 |
| New agents created | ___ / 2 |
| New chatmode created | ___ / 1 |
| Agent audit accuracy (accessibility) | High / Medium / Low |
| Chatmode quality scoring useful? | Yes / No |

---

## Key Takeaway

> **Custom agents and chatmodes turn specialized expertise into on-demand tools.** Instead of memorizing WCAG checklists, N+1 query patterns, or code quality rubrics, you codify them once in an agent and invoke them by name. Any team member can access expert-level reviews instantly.

### What Made This Work

- **Agent anatomy**: YAML frontmatter (name, description, tools) + system prompt (expertise, workflow, output format)
- **Chatmode anatomy**: YAML frontmatter (description) + behavioral instructions (how to respond)
- **Checklists**: Structured audit criteria ensure comprehensive coverage
- **Output format templates**: Consistent, scannable results every time
- **Tool access**: Agents that can read code, run commands, and edit files are more powerful than chat-only

---

## Agent & Chatmode Summary — All Created in This Workshop

| Type | Name | Lab | File |
|------|------|-----|------|
| Agent | Code Reviewer | Lab 03 | `.github/agents/code-reviewer.agent.md` |
| Agent | Project Status | Lab 04 | `.github/agents/project-status.agent.md` |
| Agent | Security Reviewer | Lab 07 | `.github/agents/security-reviewer.agent.md` |
| Agent | Doc Generator | Lab 08 | `.github/agents/doc-generator.agent.md` |
| Agent | Accessibility Auditor | Lab 10 | `.github/agents/accessibility-auditor.agent.md` |
| Agent | Performance Reviewer | Lab 10 | `.github/agents/performance-reviewer.agent.md` |
| Chatmode | Code Quality Coach | Lab 10 | `.github/chatmodes/CodeQualityCoach.chatmode.md` |
| Skill | Frontend Component | Lab 09 | `.github/skills/frontend-component/SKILL.md` |
