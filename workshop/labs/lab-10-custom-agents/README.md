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

You will explore the 5 existing agents in this repo, understand the anatomy of each, and then **build 2 new agents** — giving you a complete toolkit for your team's specialized workflows.

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

## Part C — Build a Full-Stack Feature Agent (15 min)

### Step 7: Create the full-stack feature agent

This is the big one. A single prompt will generate an **entire feature** — migration, model, repository, routes, Swagger docs, React component, and tests — all following the repo's existing patterns.

Create `.github/agents/full-stack-feature.agent.md`:

````markdown
---
name: 'Full-Stack Feature'
description: 'Generate an entire feature end-to-end from a single description. Creates SQL migration, TypeScript model, repository, Express routes, Swagger docs, React components, and test stubs — all following existing repo patterns.'
tools: ['codebase', 'search', 'editFiles', 'runCommands', 'problems']
---

# Full-Stack Feature Agent

You are an expert full-stack developer for the OctoCAT Supply Chain Management System. Given a feature description, you generate every layer of the stack in one shot.

## Architecture You Follow

```
SQL Migration → TypeScript Model → Repository → Express Routes → Swagger Docs
                                                                      ↕
React Component ← API Client Hook ← Types ← Swagger Spec
```

## Existing Patterns to Match

**Before generating anything**, read these reference files to match the repo's style:
- Model: `api/src/models/product.ts`
- Repository: `api/src/repositories/productsRepo.ts`
- Routes: `api/src/routes/product.ts`
- Migration: `database/migrations/001_init.sql`
- React component: `frontend/src/components/entity/product/Products.tsx`
- API client: `frontend/src/api/`

## Generation Workflow

When the user describes a feature, follow this exact sequence:

### 1. Clarify & Plan
- State assumptions about the entity and its relationships
- List the files you will create or modify
- Get confirmation before proceeding

### 2. Database Layer
- Create `database/migrations/NNN_{entity}.sql` with CREATE TABLE, indexes, constraints
- Add seed data in `database/seed/NNN_{entity}.sql` (5-10 realistic rows)

### 3. API Layer
- Create `api/src/models/{entity}.ts` — TypeScript interface matching the schema
- Create `api/src/repositories/{entity}Repo.ts` — CRUD methods using parameterized SQL
- Create `api/src/routes/{entity}.ts` — Express routes (GET all, GET by ID, POST, PUT, DELETE)
- Register routes in `api/src/index.ts`
- Add Swagger documentation to `api/api-swagger.json`

### 4. Frontend Layer
- Create `frontend/src/components/entity/{entity}/{Entity}s.tsx` — list view with table
- Create `frontend/src/components/entity/{entity}/{Entity}Detail.tsx` — detail/edit view
- Add API client functions in `frontend/src/api/`
- Add navigation link in `frontend/src/components/Navigation.tsx`

### 5. Tests
- Create `api/src/routes/{entity}.test.ts` — route tests with happy path + error cases

## Rules
- Always use **parameterized SQL** (never string concatenation)
- Always use the existing **custom error classes** (NotFoundError, ValidationError, ConflictError)
- Always match **existing code style** — read reference files first
- Always include **proper HTTP status codes** (201 for create, 404 for not found, 422 for validation)
- Keep React components consistent with **existing Tailwind patterns**
- Use **React Query** for data fetching (match existing hooks pattern)

## Output Format

```
🚀 FULL-STACK FEATURE: {Entity Name}

📋 PLAN
  Entity: {name}
  Fields: {field list}
  Relationships: {FK references}
  Files to create: {count}

📁 FILES GENERATED
  ✅ database/migrations/NNN_{entity}.sql
  ✅ database/seed/NNN_{entity}.sql
  ✅ api/src/models/{entity}.ts
  ✅ api/src/repositories/{entity}Repo.ts
  ✅ api/src/routes/{entity}.ts
  ✅ api/src/routes/{entity}.test.ts
  ✅ frontend/src/components/entity/{entity}/{Entity}s.tsx
  ✅ frontend/src/components/entity/{entity}/{Entity}Detail.tsx
  ✅ api/api-swagger.json (updated)
  ✅ api/src/index.ts (updated)

🧪 NEXT STEPS
  1. Run: npm run build --workspace=api
  2. Run: npm test --workspace=api
  3. Verify at: http://localhost:3001/api/{entity}
```
````

### Step 8: Test the full-stack feature agent (the wow moment)

This is where it gets impressive. Try this single prompt:

```
@full-stack-feature Add a "Warehouse" entity to the supply chain system.
Fields: warehouseId (PK), name, location, capacity (integer), 
managerId (text), isActive (boolean), createdAt, updatedAt.
It should belong to a Branch (foreign key to branches table).
```

Watch the agent generate **8+ files** from a single sentence:
- SQL migration with table, indexes, and foreign key
- Seed data with realistic warehouse entries
- TypeScript model interface
- Repository with full CRUD
- Express routes with error handling
- Route tests
- React list and detail components
- Swagger documentation

> **Try another one!** Ask for a "Shipment" or "Inventory" entity and see the same pattern repeated consistently.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Existing agents explored | ___ / 5 |
| New agents created | ___ / 2 |
| Agent audit accuracy (accessibility) | High / Medium / Low |
| Files generated by full-stack agent | ___ files |

---

## Key Takeaway

> **Custom agents turn specialized expertise into on-demand tools.** The accessibility auditor codifies a WCAG checklist so any dev can run an expert audit. The full-stack feature agent turns a one-sentence description into 8+ production-ready files. Codify it once, invoke by name, get consistent results every time.

### What Made This Work

- **Agent anatomy**: YAML frontmatter (name, description, tools) + system prompt (expertise, workflow, output format)
- **Checklists**: Structured audit criteria ensure comprehensive, repeatable coverage
- **"Read first" pattern**: The full-stack agent reads existing code to match your style — no generic boilerplate
- **Output format templates**: Consistent, scannable results every time
- **Tool access**: Agents that can read code, run commands, and edit files are dramatically more powerful than chat-only

---

## Agent Summary — All Created in This Workshop

| Type | Name | Lab | File |
|------|------|-----|------|
| Agent | Code Reviewer | Lab 03 | `.github/agents/code-reviewer.agent.md` |
| Agent | Project Status | Lab 04 | `.github/agents/project-status.agent.md` |
| Agent | Security Reviewer | Lab 07 | `.github/agents/security-reviewer.agent.md` |
| Agent | Doc Generator | Lab 08 | `.github/agents/doc-generator.agent.md` |
| Agent | Accessibility Auditor | Lab 10 | `.github/agents/accessibility-auditor.agent.md` |
| Agent | Full-Stack Feature | Lab 10 | `.github/agents/full-stack-feature.agent.md` |
| Skill | Frontend Component | Lab 09 | `.github/skills/frontend-component/SKILL.md` |
