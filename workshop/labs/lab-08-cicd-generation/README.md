# Lab 08 — CI/CD Generation: "YAML-Free Pipelines"

| | |
|---|---|
| **Toil** | Writing and maintaining GitHub Actions YAML manually |
| **Feature** | Agent Mode + GitHub Actions knowledge + CI/CD Agent |
| **Time** | 45–60 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | VS Code with Copilot Agent Mode, GitHub repo with Actions enabled |

## Toil Scorecard

| Metric | Without Copilot | With Copilot |
|--------|----------------|--------------|
| Time to write a new workflow | 1–4 hours | 10–15 min |
| YAML syntax errors | 3–5 per workflow | 0 |
| Time debugging Actions | 30–60 min | 5 min |
| Workflows referencing wrong paths | Common | Rare (reads codebase) |

---

## What You'll Do

You will use **Agent Mode** and a custom **CI/CD Agent** to generate complete GitHub Actions workflows — from E2E test pipelines to deployment workflows — without writing any YAML manually.

---

## Part A — Explore Existing Workflows (5 min)

### Step 1: Review existing workflows

This repo has 7 workflows in `.github/workflows/`. Open and skim:

| Workflow | Purpose |
|----------|---------|
| `ci.yml` | Build + test on push/PR |
| `codeql-advanced.yml` | Security scanning |
| `auto-analyze-failures.yml` | AI-powered failure analysis |
| `test-auto-analysis.yml` | Test failure auto-analysis |
| `build-and-publish.yml` | Docker image build + publish |
| `deploy.yml` | Azure Container App deployment |
| `copilot-setup-steps.yml` | Copilot Coding Agent setup |

These serve as **reference patterns** for Copilot when generating new workflows.

---

## Part B — Create a CI/CD Agent (10 min)

### Step 2: Create the CI/CD agent

Create `.github/agents/cicd-specialist.agent.md`:

```markdown
---
name: 'CI/CD Specialist'
description: 'Generate, debug, and optimize GitHub Actions workflows. Use when creating new pipelines, fixing workflow failures, or adding CI/CD automation.'
tools: ['codebase', 'editFiles', 'runCommands', 'search', 'problems', 'changes']
---

# CI/CD Specialist Agent

You are a GitHub Actions expert for the OctoCAT Supply Chain Management System.

## Repository Context

- **Monorepo** with `api/` (Express.js + TypeScript) and `frontend/` (React + Vite)
- **Package manager**: npm (workspaces not used — each project has own package.json)
- **Test frameworks**: Vitest (api + frontend unit), Playwright (frontend E2E)
- **Build**: `tsc` (api), `vite build` (frontend)
- **Docker**: Multi-stage Dockerfile at `api/Dockerfile`
- **Node version**: 24.x

## Workflow Conventions (from existing workflows)

- Trigger on `push` to `main` and `pull_request` to `main`
- Use `actions/checkout@v4`
- Use `actions/setup-node@v4` with `node-version: '24'`
- Cache npm dependencies: `cache: 'npm'` with `cache-dependency-path`
- Use matrix strategy for multiple Node versions when appropriate
- Upload artifacts with `actions/upload-artifact@v4`
- Add status badges in comments with `thollander/actions-comment-pull-request@v3`

## When Generating Workflows

1. Read existing workflows in `.github/workflows/` for style/conventions
2. Use the same formatting, indentation, and comment style
3. Include proper `permissions` block (least privilege)
4. Add concurrency groups to prevent duplicate runs
5. Use environment variables for configurable values
6. Add workflow status badge in markdown where appropriate

## Testing Commands

```yaml
# API tests
- run: cd api && npm ci && npm test

# Frontend unit tests
- run: cd frontend && npm ci && npm test

# Frontend E2E tests
- run: cd frontend && npx playwright install --with-deps
- run: cd frontend && npm run test:e2e

# Build verification
- run: cd api && npm run build
- run: cd frontend && npm run build
```
```

---

## Part C — Generate Workflows with Agent Mode (25 min)

### Step 3: Generate an E2E test workflow

In Agent Mode chat, type:

```
@cicd-specialist Create a GitHub Actions workflow at .github/workflows/e2e-tests.yml that:

1. Triggers on pull_request to main
2. Starts the API server (cd api && npm ci && npm run db:seed:dev && npm run dev &)
3. Waits for the API to be healthy (curl retry on localhost:3000)
4. Starts the frontend (cd frontend && npm ci && npm run dev &)
5. Waits for frontend to be healthy (curl retry on localhost:5173)
6. Installs Playwright browsers
7. Runs Playwright E2E tests
8. Uploads test results and screenshots as artifacts
9. Comments test results on the PR

Follow the conventions in our existing workflows.
```

**Review the generated workflow.** Verify:
- ✅ Correct Node.js setup
- ✅ npm ci with caching
- ✅ Server health checks before running tests
- ✅ Artifact upload for test results
- ✅ PR comment with results

### Step 4: Generate a code quality workflow

```
@cicd-specialist Create a GitHub Actions workflow at .github/workflows/code-quality.yml that:

1. Triggers on pull_request to main
2. Runs ESLint on both api/ and frontend/
3. Runs TypeScript type checking (tsc --noEmit) on both projects
4. Runs unit tests with coverage for api/
5. Uploads coverage report as artifact
6. Fails the PR if coverage is below 50%
7. Posts a coverage summary comment on the PR

Follow the conventions in our existing workflows.
```

### Step 5: Generate a release workflow

```
@cicd-specialist Create a GitHub Actions workflow at .github/workflows/release.yml that:

1. Triggers on push of tags matching 'v*.*.*' (e.g., v1.0.0)
2. Builds the API Docker image using the existing Dockerfile
3. Tags the image with the git tag and 'latest'
4. Pushes to GitHub Container Registry (ghcr.io)
5. Creates a GitHub Release with auto-generated release notes
6. Attaches the Docker image digest to the release

Follow the conventions in our existing workflows.
```

---

## Part D — Debug a Workflow with Agent Mode (10 min)

### Step 6: Introduce a bug and fix it

Open one of the generated workflows and introduce an intentional error (e.g., wrong path, missing step, typo in action name).

Then ask:

```
@cicd-specialist This workflow is failing. Read .github/workflows/e2e-tests.yml 
and find any issues. Fix them.
```

### Step 7: Validate all workflows

```
@cicd-specialist Review all workflows in .github/workflows/ for:
1. Correct syntax (valid YAML)
2. Security issues (hardcoded secrets, missing permissions)
3. Performance (unnecessary steps, missing caching)
4. Consistency (same Node version, same checkout action version)

Report findings.
```

---

## Part E — Push and Verify (5 min)

### Step 8: Commit the new workflows

```bash
git add .github/workflows/e2e-tests.yml .github/workflows/code-quality.yml .github/workflows/release.yml
git commit -m "ci: add E2E test, code quality, and release workflows"
git push origin main
```

### Step 9: Check Actions tab

Go to your repo → **Actions** tab. You should see the new workflows listed.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Workflows generated | ___ / 3 |
| YAML written manually | 0 lines |
| Time to generate all 3 | ___ min |
| Syntax errors in generated workflows | ___ |
| Did agent follow existing conventions? | Yes / Partially / No |

---

## Key Takeaway

> **No more YAML from scratch.** The CI/CD Agent reads your existing workflows for conventions and generates new ones that are consistent, secure, and correct. Debugging workflow failures becomes a conversation, not a Stack Overflow search.

### What Made This Work

- **Custom agent** (`cicd-specialist.agent.md`): Encodes workflow conventions and project structure
- **Existing workflows as patterns**: 7 reference workflows teach Copilot your CI/CD style
- **Codebase awareness**: Agent knows the project structure (api/, frontend/, test commands)
- **Iterative refinement**: Debug and fix without leaving the chat
