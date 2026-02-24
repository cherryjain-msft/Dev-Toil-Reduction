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

You will explore the 5 existing agents in this repo (including the TDD handoff chain), understand the anatomy of each, **deep-dive into the TDD agent pipeline** to see how handoffs power a Red-Green-Refactor workflow, and then **build a PR Review Pipeline agent** that chains agents together via **handoffs**.

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

## Part B — Deep-Dive: The TDD Agent Pipeline (15 min)

In Part A you saw that three agents form a TDD chain: **TDD Planner → TDD Red → TDD Green**. Now you'll run the full pipeline end-to-end and see how **handoffs** let each specialist do one job well while context flows automatically from one agent to the next.

### Step 4: Understand the TDD agent roles

Open the three agent files side-by-side and note how each is deliberately constrained:

| Agent | File | What It Does | What It **Never** Does |
|-------|------|-------------|------------------------|
| TDD Planner | `.github/agents/tdd-planner.agent.md` | Produces plan with test specs, acceptance criteria, edge cases | Write any code or tests |
| TDD Red | `.github/agents/tdd-red.agent.md` | Writes **failing** tests based on the plan | Write implementation code |
| TDD Green | `.github/agents/tdd-green.agent.md` | Writes **minimal** implementation to make tests pass | Add un-tested features or refactor |

Each agent has `<stopping_rules>` that prevent it from doing the next agent's job. This enforces discipline — the same discipline a human TDD practitioner follows, but codified.

### Step 5: Trace the handoff chain

Open `tdd-planner.agent.md` and look at the `handoffs:` block:

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

This creates a **linear pipeline**: Planner → Red → Green, where each agent automatically sends its output to the next. The user kicks off the pipeline once and the chain runs.

### Step 6: Run the TDD pipeline

In Copilot Chat, invoke the planner with a small feature:

```
@tdd-planner Plan a "getProductsBySupplier" method for the ProductsRepository.
It should accept a supplierId and return all products for that supplier.
Include edge cases: invalid supplierId, supplier with no products.
```

Watch the pipeline unfold:
1. **TDD Planner** researches the codebase, then produces a plan with test specs — no code
2. It **auto-hands off** to **TDD Red** via `send: true`
3. **TDD Red** writes failing tests that import the not-yet-existing method
4. It runs the tests to confirm they fail (RED state)
5. It **auto-hands off** to **TDD Green** via `send: true`
6. **TDD Green** writes the minimal implementation to make all tests pass
7. It runs the tests to confirm they pass (GREEN state)

### Step 7: Inspect the results

After the pipeline completes, review what was created:
- A **plan document** in `docs/tdd-plans/` with acceptance criteria and test specs
- A **test file** with well-structured, convention-matching tests
- A **minimal implementation** that follows existing repository patterns

Notice how each agent stayed in its lane — the planner didn't write code, the red agent didn't write implementation, and the green agent didn't add un-tested features.

---

## Part C — Build a PR Review Pipeline Agent (15 min)

### Why handoffs, not skills?

In Lab 09 you created **skills** — reusable pattern blueprints that Copilot follows when generating code. Skills are great for _"how to create X"_ recipes. But what about multi-step **workflows** where different specialists need to run _in sequence_? That's what **agent handoffs** solve — they let one agent's output flow into the next, creating a pipeline. The TDD chain you just ran in Part B (Planner → Red → Green) is a linear handoff pipeline. Now you'll build a **fan-out** pipeline where an orchestrator delegates to multiple independent specialists.

### Step 8: Create the PR review pipeline agent

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

### Step 9: Compare handoff styles

Before testing, compare the two handoff patterns in this repo:

| | TDD Chain | PR Review Pipeline |
|---|---|---|
| **Pattern** | Linear pipeline (A → B → C) | Fan-out (A → B, A → C, A → D) |
| **Auto-handoff** | Each step auto-sends to next (`send: true`) | First review auto-sends; others are manual |
| **Agent role** | Each agent does real work (plans, writes tests, writes code) | Orchestrator only summarizes; specialists do the work |
| **When to use** | Sequential steps where output feeds input | Independent reviews that can run in any order |

Open `tdd-planner.agent.md` side-by-side with your new `pr-review-pipeline.agent.md` and note how the `handoffs:` YAML differs. You already saw the linear TDD chain in Part B — now compare it with the fan-out pattern here.

### Step 10: Test the PR review pipeline (the wow moment)

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

### Step 11: Reflect — Agents vs Skills vs Instructions

Now that you've built agents (Labs 03–10), skills (Lab 09), and instructions (Lab 05), compare when to use each:

| Layer | What It Does | Example | When to Use |
|-------|-------------|---------|-------------|
| **Instructions** | Passive rules applied to matching files | "Use parameterized SQL in all routes" | Enforce standards automatically |
| **Skills** | Reusable code-generation blueprints | "Create an API endpoint following our patterns" | Consistent code generation |
| **Agents** | Autonomous specialists with workflows | "Plan tests, write failing tests, then implement" | Complex multi-step workflows |
| **Agent Handoffs** | Orchestrate multiple agents in sequence | "Run code review → security scan → doc update" | Multi-specialist pipelines |

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Existing agents explored | ___ / 5 |
| TDD pipeline completed end-to-end | Yes / No |
| New agents created (PR Review Pipeline) | ___ / 1 |
| Handoff chain tested | ___ agents in pipeline |

---

## Key Takeaway

> **Custom agents turn specialized expertise into on-demand tools. Agent handoffs make them composable.** The TDD pipeline codifies the Red-Green-Refactor discipline into three constrained agents that automatically hand off to each other — enforcing a workflow that even experienced developers sometimes skip. The PR review pipeline chains three specialist agents into a single workflow — each does one thing well, and the orchestrator ties them together. Codify it once, invoke by name, get consistent results every time.

### What Made This Work

- **Agent anatomy**: YAML frontmatter (name, description, tools, handoffs) + system prompt (expertise, workflow, output format)
- **Stopping rules**: Each TDD agent has explicit constraints preventing it from doing the next agent's job — this enforces discipline
- **Handoffs**: The `handoffs:` block lets agents compose — an orchestrator delegates to specialists without embedding their logic
- **`send: true` vs manual**: Auto-handoffs create seamless pipelines (TDD chain); manual handoffs give users control (PR review fan-out)
- **Linear vs fan-out**: TDD uses a linear pipeline (A → B → C); PR review uses fan-out (A → B, A → C, A → D)
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
| Agent | PR Review Pipeline | Lab 10 | `.github/agents/pr-review-pipeline.agent.md` |
| Skill | Frontend Component | Lab 09 | `.github/skills/frontend-component/SKILL.md` |
