# Plan: Advanced GitHub Copilot Workshop — Reducing Developer Toil

## TL;DR

Build a full-day (6-8 hour) hands-on workshop repo for enterprise developers, using the Octocat Supply codebase as the base application. The repo will contain **12 modular labs** — each targeting a specific developer toil, solved with a specific Copilot feature. Each lab includes a **Toil Scorecard** measuring time-saved. The labs are modular/standalone so facilitators can pick 8-10 for any given session. The workshop copies the existing Octocat Supply code from the `octocat_supply-legendary-invention` repo and adds a workshop layer: lab instructions, pre-crafted GitHub issues, a toil metrics framework, and facilitator guides.

---

## Phase 1: Repository Structure & Foundation

### Step 1 — Copy Octocat Supply Codebase

Copy from `C:\Cherry\GitHub\Demo\octocat_supply-legendary-invention` into the root of the workshop repo, preserving all existing structure:

- `api/` — Express.js backend (TypeScript, SQLite, Vitest)
- `frontend/` — React 18 frontend (TypeScript, Vite, Tailwind, Playwright)
- `.github/` — Workflows, agents, prompts, skills, chatmodes, instructions
- `.devcontainer/` — Codespaces config
- `.vscode/` — MCP servers, tasks, launch configs
- `demo/` — Existing walkthroughs and patch sets
- `docs/` — Architecture, design mockups
- `Makefile`, `docker-compose.yml`, `start.ps1`, `CONTRIBUTING.md`

### Step 2 — Create Workshop Layer

Add the following directory alongside the existing code:

```
workshop/
├── README.md                          # Workshop overview, agenda, prerequisites
├── FACILITATOR-GUIDE.md               # Setup checklist, timing, talking points
├── toil-framework/
│   ├── developer-toil-inventory.md    # 15 toils defined + impact scores
│   ├── toil-scorecard-template.md     # Per-lab before/after measurement
│   └── roi-calculator.md              # Enterprise ROI framework
├── labs/
│   ├── lab-01-coding-agent/           # → "Zero to PR"
│   ├── lab-02-agent-mode/             # → "Feature Build"
│   ├── lab-03-code-review/            # → "AI First-Pass Review"
│   ├── lab-04-mcp-servers/            # → "Connect Your Tools"
│   ├── lab-05-custom-instructions/    # → "Team Standards as Code"
│   ├── lab-06-parallel-delegation/    # → "Agent HQ: Batch It"
│   ├── lab-07-security-autofix/       # → "Zero-Day to Zero-Effort"
│   ├── lab-08-cicd-generation/        # → "YAML-Free Pipelines"
│   ├── lab-09-debugging/              # → "Root Cause in 60 Seconds"
│   ├── lab-10-documentation/          # → "Self-Documenting Code"
│   ├── lab-11-github-skills/          # → "Teach Copilot Your Patterns"
│   └── lab-12-custom-agents/          # → "Build Your Own Agent"
├── issues/                            # Pre-crafted GitHub issue templates
│   ├── issue-01-add-delivery-vehicle.md
│   ├── issue-02-cart-checkout.md
│   ├── issue-03-missing-repo-tests.md
│   └── ...
└── slides/
    └── deck-outline.md
```

### Step 3 — Update Root README.md

Add a prominent "🎓 Workshop" section at the top linking to `workshop/README.md`, preserving original Octocat Supply readme content.

### Step 4 — Create/Update AGENTS.md

At the repo root — serves dual purpose: (a) teaches Copilot about the workshop repo structure, and (b) is itself a demo artifact for Lab 05.

---

## Phase 2: Toil Framework & Metrics

### Step 5 — Developer Toil Inventory

Create `workshop/toil-framework/developer-toil-inventory.md`:

| # | Toil | SDLC Phase | Frequency | Time/Occurrence | Copilot Feature |
|---|------|-----------|-----------|----------------|----------------|
| 1 | Translating issues to working code | Planning→Coding | Every sprint | 2-8 hours | Coding Agent |
| 2 | Scaffolding components/boilerplate | Coding | 3-5x/week | 30-60 min | Agent Mode |
| 3 | PR review bottleneck | Review | Every PR | 4-24 hours wait | Copilot Code Review |
| 4 | Connecting external tools/context | Coding | Ongoing | 15-30 min/switch | MCP Servers |
| 5 | Enforcing coding standards | Review | Every PR | 15-30 min | Custom Instructions/AGENTS.md |
| 6 | Context switching on small tasks | Coding | 5-10x/day | 15-30 min each | Parallel Agents + Agent HQ |
| 7 | Fixing vulnerability alerts | Security | Weekly | 30-120 min | Copilot Autofix + Coding Agent |
| 8 | Writing CI/CD pipelines | CI/CD | Monthly | 1-4 hours | Agent Mode |
| 9 | Debugging production issues | Operations | Weekly | 30-120 min | Agent Mode + Chat |
| 10 | Writing/updating documentation | Documentation | Every feature | 30-60 min | Agent Mode |
| 11 | Repeating entity patterns | Coding | Weekly | 1-2 hours | Copilot Skills |
| 12 | Building specialized workflows | Coding | Monthly | 2-4 hours | Custom Agents |

### Step 6 — Toil Scorecard Template

Each lab begins with a "Without Copilot" time estimate and ends with "With Copilot" actual time, plus qualitative rating (flow-state, cognitive load, error rate).

### Step 7 — Enterprise ROI Calculator

Formula: toil hours × developer count × hourly rate → annual savings. Ready-to-fill spreadsheet-style template.

---

## Phase 3: Lab Content (12 Labs, Pick 8-10 per Session)

Each lab follows a consistent format:

- **Toil Identified** — what pain this solves, with scorecard
- **Feature Showcase** — which Copilot capability
- **Prerequisites** — prior labs if any, or "standalone"
- **Exercise** — step-by-step hands-on
- **Verification** — expected outcome
- **Scorecard** — measure before/after

---

### Lab 01 — Coding Agent: "Zero to PR"

- **Toil**: Translating GitHub issues into working code
- **Feature**: Coding Agent (assign issue to Copilot)
- **Exercise**: Create issue "Add DeliveryVehicle entity" from template in `workshop/issues/`. Assign to Copilot. Watch it plan, code model/repo/route/migration/tests, and open PR. Review the PR, provide feedback, observe Copilot iterate.
- **Leverages**: Existing entity patterns in `api/src/models/`, `api/src/repositories/`, `api/src/routes/`, `api/database/migrations/`
- **Scorecard**: Manual coding ~2 hours → Coding Agent ~15 min waiting

### Lab 02 — Agent Mode: "Feature Build"

- **Toil**: Scaffolding and boilerplate
- **Feature**: Agent Mode (multi-file editing in VS Code)
- **Exercise**: Use Agent Mode to build a complete shopping cart checkout flow — connecting existing `CartContext` to the `/api/orders` endpoint. Leverage the existing prompt `.github/prompts/demo-cart-page.prompt.md` and design mockups in `docs/design/`.
- **Leverages**: `frontend/src/components/entity/cart/`, `frontend/src/context/CartContext.tsx`, `api/src/routes/orders.ts`
- **Scorecard**: Manual feature build ~4 hours → Agent Mode ~30 min

### Lab 03 — Code Review: "AI First-Pass Review"

- **Toil**: PR review bottleneck
- **Feature**: Copilot Code Review
- **Exercise**: Create a PR with intentional issues (pre-staged buggy branch or use patch set from `demo/resources/`). Request Copilot review. Observe it catch bugs, style issues, security concerns. Apply suggested fixes. Compare with human review time.
- **Leverages**: Existing patch set system in `demo/resources/`, `code-injection.prompt.md`
- **Scorecard**: Human review wait ~4-24 hours → instant AI review

### Lab 04 — MCP Servers: "Connect Your Tools"

- **Toil**: Context switching to external tools
- **Feature**: MCP Server integration
- **Exercise**: Configure and use the pre-existing MCP servers (Playwright, GitHub, Azure) from `.vscode/mcp.json`. Run E2E tests via MCP, query GitHub issues/PRs via MCP, all from Copilot Chat without leaving the editor.
- **Leverages**: `.vscode/mcp.json` already configured with 4 MCP servers
- **Scorecard**: Tool switching ~15 min/context switch → zero switching

### Lab 05 — Custom Instructions: "Team Standards as Code"

- **Toil**: Enforcing coding standards manually
- **Feature**: AGENTS.md, copilot-instructions.md, path-scoped instructions
- **Exercise**: Explore the existing instruction hierarchy: `.github/copilot-instructions.md` (repo-wide) → `.github/instructions/api.instructions.md` (API-specific) → `.github/instructions/frontend.instructions.md` (frontend-specific). Modify instructions, generate code, observe compliance. Create a new instruction file for a team convention.
- **Leverages**: Full existing instruction hierarchy in `.github/instructions/`
- **Scorecard**: Manual code review for standards ~20 min/PR → automated

### Lab 06 — Parallel Delegation & Agent HQ: "Batch It"

- **Toil**: Context switching between small tasks
- **Feature**: Multi-session agents, Agent HQ
- **Exercise**: Create 3 GitHub issues simultaneously (e.g., add missing tests for 3 different repos). Assign all to Copilot Coding Agent. Monitor progress in Agent HQ. Review and merge resulting PRs.
- **Leverages**: Multiple untested repositories in `api/src/repositories/` (only `suppliersRepo` has tests)
- **Scorecard**: Sequential work ~3 hours → parallel delegation ~20 min total wait

### Lab 07 — Security Autofix: "Zero-Day to Zero-Effort"

- **Toil**: Fixing vulnerability alerts
- **Feature**: Copilot Autofix, Coding Agent, CodeQL
- **Exercise**: Use the existing patch sets from `demo/resources/dependabot/` and `demo/resources/secret-scanning/` to inject vulnerabilities. Observe CodeQL detect them. Use Copilot Autofix to remediate. Assign Dependabot alert fix to Coding Agent.
- **Leverages**: `.github/workflows/codeql-advanced.yml`, `demo/resources/secret-scanning/`, `demo/resources/dependabot/`, `code-injection.prompt.md`
- **Scorecard**: Manual security fix ~1-2 hours → autofix ~5 min

### Lab 08 — CI/CD Generation: "YAML-Free Pipelines"

- **Toil**: Writing and maintaining CI/CD YAML
- **Feature**: Agent Mode + GitHub Actions knowledge
- **Exercise**: Use Agent Mode to generate a new workflow (e.g., "E2E test pipeline that runs Playwright tests, uploads artifacts, and comments results on PR"). Validate against existing workflows in `.github/workflows/` for conventions. Deploy and verify.
- **Leverages**: 7 existing workflows as reference patterns
- **Scorecard**: Manual YAML authoring ~2 hours → Agent Mode ~15 min

### Lab 09 — Debugging: "Root Cause in 60 Seconds"

- **Toil**: Debugging and root-cause analysis
- **Feature**: Agent Mode + Terminal integration + self-healing DevOps
- **Exercise**: Trigger a build failure (introduce a subtle bug or use test-auto-analysis workflow). Watch the `auto-analyze-failures.yml` workflow analyze the failure with AI, create an issue, and assign to Coding Agent. Alternatively, use Agent Mode locally to debug a failing test by asking "Why is this test failing?"
- **Leverages**: `auto-analyze-failures.yml`, `test-auto-analysis.yml`, `models/failed-run-analyze.prompt.yml`
- **Scorecard**: Manual debugging ~30-120 min → AI root-cause ~2-5 min

### Lab 10 — Documentation: "Self-Documenting Code"

- **Toil**: Writing and maintaining documentation
- **Feature**: Agent Mode
- **Exercise**: Use Agent Mode to generate API documentation from the Swagger spec and route files. Generate component documentation for React components. Update `docs/architecture.md` from the actual code. Create a Getting Started guide from the Makefile commands.
- **Leverages**: `api/api-swagger.json`, `docs/architecture.md`, `Makefile`
- **Scorecard**: Manual docs ~1-2 hours → Agent Mode ~10 min

### Lab 11 — GitHub Copilot Skills: "Teach Copilot Your Patterns"

- **Toil**: Repeating entity/pattern creation
- **Feature**: Copilot Skills
- **Exercise**: Explore the existing `api-endpoint` skill in `.github/skills/api-endpoint/`. Understand the SKILL.md structure and references. Create a new skill (e.g., "frontend-component" that scaffolds a React component with tests, context, and Tailwind styling following the project's patterns). Test the skill by invoking it.
- **Leverages**: `.github/skills/api-endpoint/SKILL.md` as the template, existing component patterns
- **Scorecard**: Repetitive scaffolding ~1 hour → skill invocation ~5 min

### Lab 12 — Custom Agents: "Build Your Own Agent"

- **Toil**: Building specialized, repeatable workflows
- **Feature**: Custom Copilot Agents (`.agent.md` files), Chatmodes
- **Exercise**: Explore the 5 existing agents (TDD Red/Green/Planner, API Specialist, BDD Specialist) and 2 chatmodes. Create a new custom agent (e.g., "Accessibility Auditor" that checks components against WCAG guidelines, or "Performance Reviewer" that identifies N+1 queries and missing indexes). Create a new chatmode for a specific workflow.
- **Leverages**: `.github/agents/` (5 existing agents), `.github/chatmodes/` (2 existing)
- **Scorecard**: Manual workflow setup ~2 hours → agent invocation ~5 min

---

## Phase 4: Pre-crafted GitHub Issues

### Step 8 — Issue Templates

Create in `workshop/issues/` — realistic, well-described issues that Copilot can work on autonomously:

- `issue-01-add-delivery-vehicle-entity.md` (Lab 01)
- `issue-02-cart-checkout-flow.md` (Lab 02)
- `issue-03-missing-repository-tests.md` (Lab 06 — 3 variants)
- `issue-04-fix-sql-injection.md` (Lab 07)
- `issue-05-add-e2e-workflow.md` (Lab 08)
- `issue-06-api-documentation.md` (Lab 10)

---

## Phase 5: Facilitator & Participant Materials

### Step 9 — Workshop README.md

At `workshop/README.md`:

- Workshop title, tagline, and objectives
- Prerequisites (GitHub account with Copilot Enterprise/Business, VS Code with Copilot extension, Node.js 24+)
- Agenda options (half-day 5 labs, full-day 8-10 labs, extended 12 labs)
- Setup instructions (clone, `make install`, `make dev`)
- Lab index with difficulty ratings and time estimates

### Step 10 — Facilitator Guide

At `workshop/FACILITATOR-GUIDE.md`:

- Pre-workshop setup checklist (enable features, configure org settings, prepare Codespaces)
- Talking points per lab (what to demo vs. what participants do)
- Timing guide (5-min intro + 15-20 min hands-on + 5-min debrief per lab)
- Troubleshooting common issues
- Suggested lab selections by audience:
  - **Security-focused**: Labs 01, 03, 05, 07, 08, 09
  - **Productivity-focused**: Labs 01, 02, 04, 06, 11, 12
  - **Platform-team-focused**: Labs 04, 05, 06, 07, 08, 12

### Step 11 — Update Root README.md

Add a prominent "🎓 Workshop" section linking to `workshop/README.md`.

---

## Phase 6: Presentation Support

### Step 12 — Deck Outline

At `workshop/slides/deck-outline.md`:

- "What is Developer Toil?" (definition, the 15 toils, cost model)
- "The GitHub Copilot Platform" (feature map to SDLC phases)
- "Today's Workshop" (lab overview, success metrics)
- Per-lab 1-slide summary (toil → feature → outcome)
- Closing: "Your Toil Reduction Roadmap" (take-home scorecard, next steps)

---

## Verification

- Clone the repo → `make install` → `make dev` should start the app (verify existing Octocat Supply still works)
- Each lab README can be followed independently without prior lab completion
- Pre-crafted issues can be imported into any GitHub repo via the issue templates
- Toil scorecards can be filled in during each lab
- Facilitator guide covers at least 3 audience variants (security, productivity, platform)

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Lab count | 12 labs, modular | Facilitators pick 8-10 per session based on audience |
| Repo structure | Copy code + workshop layer | Octocat Supply at root for natural dev experience; workshop content in `workshop/` |
| Metrics | Toil Scorecard per lab | Quantitative before/after generates demonstrable ROI data |
| Demo assets | Reuse existing | Leverage 5 agents, 9 prompts, 1 skill, patch sets, MCP config already in repo |
| Audience | Enterprise developers | Emphasize governance, Agent HQ, Code Review, ROI calculator |
| Lab format | Standalone modules | No dependencies between labs; any subset works |
