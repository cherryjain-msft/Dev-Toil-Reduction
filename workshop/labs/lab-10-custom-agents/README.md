# Lab 10 — Custom Agents: "Build Your Own Agent"

| | |
|---|---|
| **Toil** | Repeating specialized workflows manually |
| **Feature** | Custom Copilot Agents (`.agent.md`) |
| **Time** | 15–50 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | VS Code with Copilot Chat |

## Toil Scorecard

| Metric | Without Custom Agents | With Custom Agents |
|--------|----------------------|-------------------|
| Specialized workflow setup | Re-explain every time | Invoke by name |
| Consistency of output | Varies per session | Codified behavior |
| Onboarding to workflows | Manual training | `@agent-name` |
| Context switching between specialists | 4+ tools, re-explain each time | 1 agent call |

---

## What You'll Do

You will explore the existing agents in this repo to understand how they're built, **create a Codebase Navigator agent** that turns hours of code-reading into instant architectural walkthroughs, and then **build a PR Review Pipeline agent** that orchestrates multiple specialist agents via **handoffs** — turning a multi-step review workflow into a single invocation.

---

## Part A — Understand the Agent Anatomy (10 min)

### Step 1: Explore the existing agents

Open each file in `.github/agents/` and note the structure:

| Agent | File | Purpose |
|-------|------|---------|
| API Specialist | `api-specialist.agent.md` | End-to-end REST API design and implementation |
| BDD Specialist | `bdd-specialist.agent.md` | Gherkin feature files + Playwright E2E tests |
| TDD Planner | `tdd-planner.agent.md` | Create TDD test plans, then hand off to Red → Green |
| TDD Red | `tdd-red.agent.md` | Write failing tests (RED phase) |
| TDD Green | `tdd-green.agent.md` | Write minimal code to pass tests (GREEN phase) |
| Doc Generator | `doc-generator.agent.md` | Generate/update architecture docs and diagrams |

### Step 2: Understand the agent file format

Every `.agent.md` file has two parts — **YAML frontmatter** (metadata) and **Markdown body** (system prompt):

```markdown
---
name: 'Agent Name'              ← How to invoke: @agent-name
description: 'What it does'     ← Shown in agent picker UI
tools: ['tool1', 'tool2']       ← Which tools the agent can use
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
## Rules / Stopping Rules       ← What the agent must NOT do
```

> **Agents vs Skills — when do I use which?**
>
> |  | **Skill** (Lab 09) | **Agent** (Lab 10) |
> |---|---|---|
> | **Analogy** | A cookbook | A chef |
> | **What it is** | A passive code-generation blueprint — a set of patterns for Copilot to follow | An autonomous specialist with a workflow, decision-making, and tool access |
> | **Autonomy** | None — produces output only when referenced | Full — reads files, asks clarifying questions, chains to other agents |
> | **Best for** | Repeatable scaffolding (e.g. "add a new CRUD endpoint following our pattern") | Multi-step workflows, analysis, review, or cross-cutting tasks |
> | **Example** | `api-endpoint` skill generates model → repo → routes → tests | `@doc-generator` reads the codebase, decides what matters, and produces diagrams |
> | **Trigger** | Copilot matches the skill's `applyTo` globs or you reference it | You invoke `@agent-name` in chat |

### Step 3: Test an existing agent

In Copilot Chat, invoke the Doc Generator agent:

```
@doc-generator Generate a Mermaid entity-relationship diagram for the 
OctoCAT Supply Chain database. Include all entities, their fields, 
and the relationships between them.
```

Watch how the agent autonomously reads migration SQL, model definitions, and foreign key relationships across multiple files — then synthesizes a complete ERD. A skill can't do this; it has no autonomy to read files or make decisions about what matters.

---

## Part B — Build a Codebase Navigator Agent (15 min)

Understanding unfamiliar code means opening file after file, tracing calls, mapping relationships, and holding it all in your head. You'll build an agent that produces a visual architectural walkthrough in seconds.

### Step 4: Identify the toil

| Step | Manual Effort |
|------|--------------|
| Find the entry point | Search routes, controllers, grep for endpoint |
| Trace the data flow | Route → repository → database → response |
| Understand relationships | Open migration files, find FK constraints |
| Map the file structure | Figure out which files own which responsibility |
| Draw a mental model | Keep the architecture in your head |
| Explain to a teammate | Do it all again, but out loud |

This takes 30–90 minutes per feature. An agent produces a shareable, visual walkthrough instantly.

### Step 5: Create the Codebase Navigator agent

Create `.github/agents/codebase-navigator.agent.md`:

````markdown
---
name: 'Codebase Navigator'
description: 'Traces how features work across the full stack. Produces architectural walkthroughs with Mermaid diagrams, file maps, and data flow explanations.'
tools: ['codebase', 'search', 'problems', 'runSubagent']
---

# Codebase Navigator Agent

You are an architectural guide for the OctoCAT Supply Chain Management System. You help developers understand how features work by tracing code paths across the full stack and producing visual, structured walkthroughs.

## Your Expertise

You specialize in:
- **Architecture Tracing**: Following a request from route → repository → database and back
- **Relationship Mapping**: Understanding entity relationships via FK constraints and JOIN queries
- **Pattern Recognition**: Identifying which architectural patterns are used (repository pattern, middleware chain, etc.)
- **Mermaid Diagrams**: Producing sequence diagrams, flowcharts, and ERDs that render in GitHub Markdown
- **Onboarding Acceleration**: Making complex codebases understandable in minutes, not hours

## Workflow

When asked "How does X work?" or "Explain the Y feature":

### 1. Research the Codebase

MANDATORY: Use tools to read actual source files. Never guess or hallucinate code paths.

- Search for the feature's entry point (route handler, component, etc.)
- Read the route file to understand the HTTP interface
- Read the repository to understand the data access layer
- Read the model to understand the data shape
- Read the migration to understand the database schema
- Read the frontend component (if applicable) to understand the UI layer
- Check for related test files to understand expected behavior

### 2. Produce the Walkthrough

Output a structured architectural guide:

```markdown
# How {Feature} Works

## Quick Summary
{2-3 sentences: what this feature does, who uses it, and why it exists}

## Architecture Diagram

{Mermaid sequence diagram showing the request flow}

## File Map

| Layer | File | Responsibility |
|-------|------|---------------|
| Route | `api/src/routes/{entity}.ts` | HTTP interface — handles requests, returns responses |
| Repository | `api/src/repositories/{entity}sRepo.ts` | Data access — SQL queries, CRUD operations |
| Model | `api/src/models/{entity}.ts` | Data shape — TypeScript interface + Swagger schema |
| Migration | `api/database/migrations/{NNN}.sql` | Schema — table definition, constraints, indexes |
| Seed | `api/database/seed/{NNN}.sql` | Sample data — realistic test records |
| Tests | `api/src/routes/{entity}.test.ts` | Verification — expected behavior and edge cases |
| Frontend | `frontend/src/components/entity/{entity}/` | UI — React component for display and interaction |

## Data Flow

### Create Flow (POST)
1. **Request arrives** at `POST /api/{entities}` → `{entity}.ts` route handler
2. **Validation**: {describe what's validated and how}
3. **Repository call**: `{method}()` executes `INSERT INTO {table} ...`
4. **Response**: Returns `201 Created` with the new entity

### Read Flow (GET)
1. ...

## Entity Relationships

{Mermaid ERD showing this entity's relationships to others}

## Key Patterns Used
- **Repository Pattern**: {how it's used here}
- **Error Handling**: {what errors are caught and how}
- **Swagger Documentation**: {whether/how the API is documented}

## Gotchas & Non-Obvious Behavior
- {Anything surprising — implicit constraints, side effects, ordering dependencies}
```

### 3. Offer Follow-Up Paths

After the walkthrough, suggest what the developer might want to explore next:
- "Want me to trace the **{related feature}** flow?"
- "Want me to generate an **ERD for the entire database**?"
- "Want me to explain how **error handling** works across the stack?"

## Rules

- **Always** read actual source files — never describe code you haven't read
- **Always** include at least one Mermaid diagram (sequence, flowchart, or ERD)
- **Always** link to the real file paths in the codebase
- **Always** describe the data flow step-by-step, not just list the files
- **Never** modify any code — you are read-only
- **Never** guess at behavior — if you're unsure, say so and suggest which file to check
- **Adjust depth** based on the question — "How does X work?" gets the full walkthrough; "Where is X defined?" gets a focused answer

## Project-Specific Context

This is a TypeScript monorepo with:
- **API** (`api/`): Express.js with SQLite, repository pattern, Swagger docs
- **Frontend** (`frontend/`): React + Vite + Tailwind, React Query for data fetching
- **Database**: SQLite with migration files in `api/database/migrations/`
- **Architecture docs**: `docs/architecture.md`, `docs/sqlite-integration.md`
- **Naming**: Models are PascalCase, tables are snake_case, routes are kebab-case
````

### Step 6: Test the Codebase Navigator (the wow moment)

In Copilot Chat, invoke your new agent with a real question about the codebase:

```
@codebase-navigator How does the order flow work end-to-end? 
Trace it from the API endpoint through to the database, 
including how order details and products are connected.
```

**Watch the agent** search for routes, repositories, and models, read each file, trace the data flow, map entity relationships, and produce a Mermaid sequence diagram with a structured walkthrough — all in seconds.

> **The wow:** This walkthrough would take 30–90 minutes to compile manually. The agent produces it instantly, with visual diagrams, and it's shareable with the whole team.

### Step 7: Test with different question types

Try these prompts to see how the agent adapts:

**Focused question:**
```
@codebase-navigator Where is the supplier status field defined and 
which files would I need to change to add a new status value?
```

**Cross-cutting concern:**
```
@codebase-navigator How does error handling work in this API? 
Show the flow from a route throwing an error to the HTTP response.
```

**Onboarding question:**
```
@codebase-navigator I'm new to this codebase. Give me a quick tour 
of how the API is structured — what pattern does it use and where 
does each piece live?
```

**Compare each response:** Does the agent adjust depth based on the question? Does it always include diagrams? Does it read actual source files rather than guessing?

---

## Part C — Build a PR Review Pipeline Agent with Handoffs (20 min)

### Why handoffs?

Skills (Lab 09) are great for _"how to create X"_ recipes. But multi-step **workflows** where specialists run _in sequence_ need **agent handoffs** — one agent's output flows into the next. Now you'll build a **fan-out** pipeline where an orchestrator delegates to multiple independent specialists.

### Step 8: Understand handoffs

Handoffs let one agent pass context to another. Open `tdd-planner.agent.md` and look at the `handoffs:` block:

```yaml
handoffs:
  - label: Write Red Tests
    agent: tdd-red
    prompt: 'Implement the failing tests for this plan'
    send: true          # ← auto-handoff: no user click needed
```

Then open `tdd-red.agent.md`:

```yaml
handoffs:
  - label: Write Green Implementation
    agent: tdd-green
    prompt: 'Implement the code to make these tests pass'
    send: true          # ← auto-handoff again
```

This creates a **linear pipeline**: Planner → Red → Green, where each agent automatically sends its output to the next.

There are two handoff patterns:

| Pattern | How It Works | Example |
|---------|-------------|---------|
| **Linear (A → B → C)** | Each agent auto-sends to the next via `send: true` | TDD: Planner → Red → Green |
| **Fan-out (A → B, A → C, A → D)** | Orchestrator delegates to independent specialists | Review: Orchestrator → Code + Security + Docs |

You'll build a **fan-out orchestrator** for PR reviews.

### Step 9: Create the PR Review Pipeline agent

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

### Step 10: Compare handoff styles

Compare the two handoff patterns in this repo:

| | TDD Chain | PR Review Pipeline |
|---|---|---|
| **Pattern** | Linear pipeline (A → B → C) | Fan-out (A → B, A → C, A → D) |
| **Auto-handoff** | Each step auto-sends to next (`send: true`) | First review auto-sends; others are manual |
| **Agent role** | Each agent does real work (plans, writes tests, writes code) | Orchestrator only summarizes; specialists do the work |
| **When to use** | Sequential steps where output feeds input | Independent reviews that can run in any order |

Open `tdd-planner.agent.md` side-by-side with your new `pr-review-pipeline.agent.md` and note how the `handoffs:` YAML differs.

### Step 11: Test the PR Review Pipeline (the wow moment)

Try this prompt:

```
@pr-review-pipeline Review the files in api/src/routes/product.ts 
and api/src/repositories/productsRepo.ts. 
I recently added input validation to these endpoints.
```

Watch the pipeline:
1. Orchestrator reads files and produces a **changeset summary**
2. Identifies risk areas (input validation → security relevant)
3. **Auto-hands off** to Code Reviewer via `send: true`
4. Click **"Security Scan"** or **"Update Documentation"** for additional reviews

> **Try the full pipeline!** Use this prompt and click "Full Pipeline (all reviewers)":
> ```
> @pr-review-pipeline Review all changes in api/src/routes/ 
> for the new delivery tracking feature.
> ```

### Step 12: Reflect — When to use what

Now that you've built agents, skills, and instructions across this workshop:

| Layer | What It Does | Toil It Eliminates | Example |
|-------|-------------|-------------------|---------|
| **Instructions** | Passive rules applied to matching files | Manual standards enforcement | "Use parameterized SQL in all routes" |
| **Skills** | Reusable code-generation blueprints | Repeating entity patterns | "Create an API endpoint following our patterns" |
| **Agents** | Autonomous specialists with workflows | Expert knowledge silos | "Trace how orders work end-to-end" |
| **Agent Handoffs** | Orchestrate multiple agents in sequence | Multi-step coordination | "Run code review → security scan → doc update" |

**Decision tree:**
- **Enforce a rule** automatically? → **Instruction**
- **Generate code** following a pattern? → **Skill**
- **Specialist workflow** with judgment? → **Agent**
- **Chain specialists** together? → **Agent with handoffs**

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Existing agents explored | ___ / 6 |
| Codebase Navigator created and tested | Yes / No |
| PR Review Pipeline created and tested | Yes / No |
| Handoff chain tested (how many agents in pipeline) | ___ |
| Time to build both agents | ___ min |

---

## Key Takeaway

> **Custom agents turn specialized expertise into on-demand, reusable tools.** The Codebase Navigator compresses 30–90 minutes of code-reading into an instant architectural walkthrough. The PR Review Pipeline chains three specialists into a single workflow. Every expert workflow your team repeats is a candidate for an agent.

### What Made This Work

- **YAML frontmatter** (name, tools, handoffs) + **Markdown system prompt** (expertise, workflow, rules)
- **Bounded responsibility** — each agent does one thing well
- **Handoffs** — `send: true` for auto-pipelines, manual for user-controlled delegation
- **Linear vs fan-out** — TDD uses A → B → C; PR Review uses A → B, A → C, A → D
- **Tool access** — agents that read code and search the codebase produce dramatically better results

---

## Agent Summary — All Created in This Workshop

| Type | Name | Lab | File |
|------|------|-----|------|
| Agent | Code Reviewer | Lab 03 | `.github/agents/code-reviewer.agent.md` |
| Agent | Project Status | Lab 04 | `.github/agents/project-status.agent.md` |
| Agent | Security Reviewer | Lab 07 | `.github/agents/security-reviewer.agent.md` |
| Agent | Doc Generator | Lab 08 | `.github/agents/doc-generator.agent.md` |
| Agent | Codebase Navigator | Lab 10 | `.github/agents/codebase-navigator.agent.md` |
| Agent | PR Review Pipeline | Lab 10 | `.github/agents/pr-review-pipeline.agent.md` |
| Skill | Frontend Component | Lab 09 | `.github/skills/frontend-component/SKILL.md` |
