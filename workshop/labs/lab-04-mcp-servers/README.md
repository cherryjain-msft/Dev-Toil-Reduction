# Lab 04 — MCP Servers: "Connect Your Tools"

| | |
|---|---|
| **Toil** | Context switching between tools (browser, terminal, docs, GitHub) |
| **Feature** | MCP (Model Context Protocol) Servers in Copilot |
| **Time** | 45–60 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | VS Code with Copilot, Docker Desktop running (for GitHub MCP), app running locally |

## Toil Scorecard

| Metric | Without Copilot | With Copilot MCP |
|--------|----------------|------------------|
| Context switches per hour | 10–15 | 0 |
| Time lost per tool switch | 2–5 min | 0 |
| Tools open simultaneously | 4–6 windows | 1 (VS Code) |
| Info lookup time | 3–10 min | 10–30 sec (ask in chat) |

---

## What You'll Do

You will configure and use **MCP Servers** to connect GitHub, Playwright testing, and Azure tools directly into Copilot Chat — so you can query issues, run E2E tests, and manage cloud resources without leaving VS Code.

---

## Part A — Understand the MCP Config (5 min)

### Step 1: Open the MCP configuration

Open `.vscode/mcp.json` in your editor. This repo already has 4 MCP servers configured:

| Server | What It Provides | How It Runs |
|--------|-----------------|-------------|
| `playwright` | Browser automation, E2E testing | `npx @playwright/mcp@latest` |
| `github` | GitHub API (issues, PRs, repos) | Docker container |
| `github-remote` | Extended GitHub API (actions, security, copilot) | HTTP endpoint |
| `Azure MCP Server` | Azure resource management | `npx @azure/mcp@latest` |

### Step 2: Verify MCP servers are loaded

1. Open Copilot Chat (Ctrl+Shift+I)
2. Switch to **Agent** mode
3. Click the **tools icon** (🔧) at the bottom of the chat input
4. You should see MCP tools listed (e.g., `playwright`, `github`, etc.)

> **If MCP tools are not showing:** Click the refresh icon next to the tools list, or restart VS Code.

---

## Part B — GitHub MCP Server (15 min)

### Step 3: Start Docker Desktop

Ensure Docker Desktop is running (the GitHub MCP server runs as a Docker container).

### Step 4: Query GitHub Issues from Chat

In Agent Mode chat, type:

```
Using the GitHub MCP server, list the open issues in this repository. 
Show them in a table with: Issue #, Title, Labels, Assignee.
```

Copilot will use the GitHub MCP to fetch live issue data without you opening a browser.

### Step 5: Create an issue from Chat

```
Using the GitHub MCP server, create a new issue:
Title: "Add unit tests for ordersRepo.ts"
Body: "The orders repository at api/src/repositories/ordersRepo.ts has no unit tests. Add comprehensive tests following the pattern in suppliersRepo.test.ts."
Labels: ["enhancement", "testing"]
```

Verify the issue was created by checking your GitHub repo.

### Step 6: Query Pull Requests

```
Using the GitHub MCP server, list the most recent 5 pull requests 
(open or closed). Show: PR #, Title, Status, Author.
```

---

## Part C — Playwright MCP Server (20 min)

### Step 7: Start the app

Make sure the app is running:

```bash
make dev
```

### Step 8: Run a visual check

In Agent Mode chat, type:

```
Using the Playwright MCP server:
1. Navigate to http://localhost:5173
2. Take a screenshot of the homepage
3. Tell me what you see — list all navigation links and main content areas
```

Copilot will launch a browser, navigate to the app, and describe what it sees.

### Step 9: Test a user flow

```
Using the Playwright MCP server, test this user flow:
1. Navigate to http://localhost:5173
2. Click on "Products" in the navigation
3. Wait for products to load
4. Take a screenshot
5. Click "Add to Cart" on the first product
6. Take a screenshot
7. Report: Did the add-to-cart show a success indicator?
```

### Step 10: Find a visual bug

```
Using the Playwright MCP server:
1. Navigate to http://localhost:5173/products
2. Take a screenshot in a narrow viewport (width: 375px, mobile)
3. Is the page responsive? Are there any layout issues on mobile?
```

---

## Part D — GitHub Remote MCP (Extended API) (10 min)

### Step 11: Query GitHub Actions

The `github-remote` MCP server provides access to advanced GitHub features. Try:

```
Using the GitHub tools, list the most recent workflow runs 
for this repository. Show: Workflow Name, Status, Conclusion, Created date.
```

### Step 12: Check code security

```
Using the GitHub tools, check if there are any Dependabot alerts 
or code scanning alerts for this repository. Summarize findings.
```

### Step 13: Query repository details

```
Using the GitHub tools, get the repository details: 
description, default branch, visibility, language breakdown, 
and number of open issues vs closed issues.
```

---

## Part E — Create an MCP-Powered Agent (10 min)

### Step 14: Create a project status agent

Create `.github/agents/project-status.agent.md`:

```markdown
---
name: 'Project Status'
description: 'Get a live project status report using MCP servers to query GitHub and the running application.'
tools: ['github', 'github-remote', 'playwright']
---

# Project Status Agent

You are a project status reporter for the OctoCAT Supply Chain Management System.

When asked for a status report, gather data from multiple sources and compile a report:

## Data Sources

1. **GitHub Issues** (via github MCP): Count open issues by label, list blockers
2. **Pull Requests** (via github MCP): Open PRs, review status, staleness
3. **CI/CD** (via github-remote MCP): Recent workflow runs, pass/fail rate
4. **Security** (via github-remote MCP): Open Dependabot alerts, code scanning alerts
5. **App Health** (via Playwright MCP): Navigate to the running app, verify it loads

## Report Format

```markdown
# 📊 Project Status Report — {date}

## Summary
- **Open Issues:** X (Y blockers, Z enhancements)
- **Open PRs:** X (Y awaiting review, Z with changes requested)
- **CI Status:** Last run {pass/fail} on {date}
- **Security:** X alerts (Y critical)
- **App Status:** {Running/Down} at {url}

## Issues Breakdown
| Priority | Count | Oldest |
|----------|-------|--------|

## PR Pipeline
| PR | Author | Status | Age |
|----|--------|--------|-----|

## Action Items
1. ...
2. ...
```
```

### Step 15: Use the project status agent

In Copilot Chat, type:

```
@project-status Give me a full project status report. 
The app should be running at http://localhost:5173.
```

Watch it query multiple MCP servers and compile a comprehensive report.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| MCP servers used successfully | ___ / 4 |
| GitHub queries without leaving VS Code | ___ |
| Playwright tests run from chat | ___ |
| Context switches to browser | ___ |
| Custom agent created? | Yes / No |

---

## Key Takeaway

> **MCP servers eliminate context switching.** Instead of jumping between GitHub.com, a browser, terminal, and Azure portal, you query all of them from a single Copilot Chat conversation. The custom Project Status agent shows how to compose multiple MCP sources into a reusable workflow.

### What Made This Work

- **Pre-configured MCP** (`.vscode/mcp.json`): All 4 servers ready to use
- **Agent mode + tools**: Copilot can call MCP servers as tools
- **Custom agent**: Composing multiple MCP sources into a repeatable report
- **Zero setup for users**: MCP servers are defined in the repo, not per-developer
