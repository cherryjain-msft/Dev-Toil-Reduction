# Lab 08 — Documentation: "Self-Documenting Code"

| | |
|---|---|
| **Toil** | Writing and maintaining documentation manually |
| **Feature** | Agent Mode + Documentation Prompt |
| **Time** | 45–60 minutes |
| **Difficulty** | Beginner |
| **Prerequisites** | VS Code with Copilot Agent Mode, app running locally |

## Toil Scorecard

| Metric | Without Copilot | With Copilot |
|--------|----------------|--------------|
| Time to document 1 API endpoint | 15–30 min | 2 min |
| Time to write Getting Started guide | 1–2 hours | 10 min |
| Architecture doc from code | 2–4 hours | 15 min |
| Docs stay in sync with code | Rarely | Regenerate anytime |

---

## What You'll Do

You will use a **Documentation Agent** and a pre-built prompt to auto-generate API docs, component docs, architecture docs, and a Getting Started guide — all from the actual code, keeping docs perfectly in sync.

---

## Part A — Explore the Documentation Agent (5 min)

### Step 1: Review the existing doc generator agent

This repo already includes a documentation agent. Open `.github/agents/doc-generator.agent.md` and review it.

**Key things it defines:**
- **Name:** `Doc Generator`
- **Tools:** `codebase`, `editFiles`, `search`, `runCommands`, `problems`
- **Principles:** Source of truth is the code, concise & scannable, examples mandatory
- **Templates:** Standardized formats for API endpoints and React components
- **Diagram standards:** Mermaid syntax with consistent naming and subgraph groupings

You'll use this agent in the following steps to generate documentation from the actual codebase.

---

## Part B — Generate API Documentation (15 min)

### Step 2: Generate full API docs

In Agent Mode chat, type:

```
@doc-generator Generate comprehensive API documentation at docs/api-reference.md.

Read every route file in api/src/routes/ and document all endpoints.
For each endpoint include: method, path, description, parameters, 
request body example, response example, and a curl command.

Group endpoints by entity (Products, Suppliers, Orders, etc.).
Start with a summary table of all endpoints.
```

### Step 3: Review the generated docs

Open `docs/api-reference.md` and verify:
- ✅ All 8 route files documented
- ✅ Summary table at the top
- ✅ Each endpoint has curl examples
- ✅ Request/response JSON examples look realistic

### Step 4: Cross-check with Swagger

Open `http://localhost:3000/api-docs` and compare with the generated docs. They should match.

---

## Part C — Generate Component Documentation (15 min)

### Step 5: Document frontend components

```
@doc-generator Generate React component documentation at docs/components.md.

Read all components in frontend/src/components/ and document each one.
Include: purpose, file location, props, dependencies (contexts, hooks), 
and whether tests exist.

Group by category: Layout (Navigation, Footer), Pages (Welcome, Products, Cart, About), 
Entity (product forms, cart items), Auth (Login).
Start with a component tree diagram.
```

### Step 6: Verify component docs

Open `docs/components.md` and check:
- ✅ All components listed
- ✅ Props tables are accurate
- ✅ Context dependencies noted (CartContext, AuthContext, ThemeContext)
- ✅ Test files referenced where they exist

---

## Part D — Generate Architecture Doc (10 min)

### Step 7: Update architecture documentation

```
@doc-generator Update docs/architecture.md with the current state of the codebase.

Read the actual project structure, package.json files, tsconfig files, 
and index.ts files. Generate:

1. High-level architecture diagram (as text/ASCII art)
2. Technology stack table (package, version, purpose)
3. Project structure with file counts per directory
4. Data flow: Frontend → API → Database
5. Key design patterns used (repository, factory, context)
6. Environment variables and configuration
```

### Step 8: Generate a Getting Started guide

```
@doc-generator Generate a Getting Started guide at docs/getting-started.md.

Read the Makefile and package.json files.
Include:

1. Prerequisites (Node.js version, npm — with exact versions from package.json)
2. Clone and install steps (exact commands)
3. Database setup (what make db-seed does)
4. Running in development mode (what make dev does)
5. Running tests (all three: unit api, unit frontend, E2E)
6. Building for production
7. Common problems and solutions
8. Available make commands (read from Makefile)
```

---

## Part E — Create a Doc Prompt File (10 min)

### Step 9: Create a reusable prompt for future doc updates

Create `workshop/labs/lab-08-documentation/update-all-docs.prompt.md`:

```markdown
---
mode: 'agent'
description: 'Regenerate all project documentation from source code'
tools: ['codebase', 'editFiles', 'search', 'runCommands']
---

# Update All Documentation

Read the current source code and update ALL documentation files to match 
the current state of the codebase.

## Files to Update

1. **docs/api-reference.md** — Regenerate from `api/src/routes/*.ts`
2. **docs/components.md** — Regenerate from `frontend/src/components/**/*.tsx`
3. **docs/architecture.md** — Update tech stack, structure, patterns
4. **docs/getting-started.md** — Update commands, versions, prerequisites

## Rules

- Read actual source files — never assume or guess
- Preserve existing content structure but update all details
- Add new sections for anything added since last update
- Remove sections for code that no longer exists
- Include accurate version numbers from package.json
- All curl examples must use real endpoints and realistic data
```

### Step 10: Test the prompt

Run the prompt file:
1. Command Palette → **Copilot: Run Prompt File**
2. Select `update-all-docs.prompt.md`
3. Watch Agent Mode regenerate all docs

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Doc files generated | ___ / 4 |
| Lines of documentation generated | ___ |
| Lines you wrote manually | 0 |
| Time to generate all docs | ___ min |
| Accuracy (spot-checked against code) | High / Medium / Low |
| Reusable prompt created? | Yes / No |

---

## Key Takeaway

> **Documentation is no longer a chore — it's a command.** The Doc Generator agent reads actual source code and produces accurate, consistent documentation. When code changes, re-run the prompt and docs update automatically. No more stale README files.

### What Made This Work

- **Custom agent** (`doc-generator.agent.md`): Documentation templates and principles
- **Codebase tool access**: Agent reads actual source files, not guesses
- **Reusable prompt**: `update-all-docs.prompt.md` makes doc updates a one-click operation
- **Multiple doc types**: API reference, components, architecture, getting started — all from one agent
