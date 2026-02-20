# Reducing Developer Toil — Advanced GitHub Copilot Workshop

> **Turn hours of repetitive work into minutes of AI-assisted flow.**

A hands-on workshop where enterprise developers tackle real developer toils using the latest GitHub Copilot features — Coding Agent, Agent Mode, Code Review, MCP Servers, Custom Instructions, Skills, Custom Agents, and more.

---

## Prerequisites

| Requirement | Details |
|------------|---------|
| GitHub account | With **Copilot Enterprise** or **Copilot Business** license |
| VS Code | Latest version with [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions |
| Node.js | v24+ (`node --version`) |
| npm | v10+ (`npm --version`) |
| Docker Desktop | Required for GitHub MCP server (Lab 04) |
| Git | Configured with your GitHub credentials |

### Org Settings Required

| Feature | Setting Location |
|---------|-----------------|
| Copilot Coding Agent | Org → Copilot → Policies → Coding Agent: **Enabled** |
| Copilot Code Review | Org → Copilot → Policies → Code Review: **Enabled** |
| GitHub Advanced Security | Repo → Settings → Security → Code scanning: **Enabled** |

---

## Setup (5 min)

```bash
# Clone the workshop repo
git clone <your-repo-url>
cd <repo-name>

# Install dependencies
make install

# Start the application
make dev
```

<details>
<summary><strong>Without Make (Windows / no Make installed)</strong></summary>

```powershell
# Install dependencies
cd api; npm install; cd ..
cd frontend; npm install; cd ..

# Start API (Terminal 1)
cd api
npm run dev

# Start Frontend (Terminal 2)
cd frontend
npm run dev
```

</details>

Verify:
- API: http://localhost:3000/api-docs (Swagger UI)
- Frontend: http://localhost:5173 (React app)

---

## Labs — Pick 5–6 for a Half-Day, All 10 for Full-Day

Each lab is **standalone** (no dependencies between labs). Times show **core exercises → all exercises**.

### Backlog Cleanup & Boilerplate

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [01](labs/lab-01-coding-agent/README.md) | **Zero to PR** | Translating issues to code | Coding Agent | 15–50 min |
| [02](labs/lab-02-agent-mode/README.md) | **Feature Build** | Scaffolding components | Agent Mode | 30–55 min |
| [09](labs/lab-09-github-skills/README.md) | **Teach Copilot Your Patterns** | Repeating entity patterns | Copilot Skills | 30–55 min |

### Code Hygiene & Standards

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [03](labs/lab-03-code-review/README.md) | **AI First-Pass Review** | PR review bottleneck | Code Review + Custom Agent | 20–55 min |
| [05](labs/lab-05-custom-instructions/README.md) | **Team Standards as Code** | Manual standards enforcement | Custom Instructions | 25–55 min |
| [08](labs/lab-08-documentation/README.md) | **Self-Documenting Code** | Writing documentation | Agent Mode + Doc Agent | 20–55 min |
| [10](labs/lab-10-custom-agents/README.md) | **Build Your Own Agent** | Specialized workflows | Custom Agents + Chatmodes | 15–50 min |

### Testing & Quality

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [06](labs/lab-06-parallel-delegation/README.md) | **Agent HQ: Batch It** | Sequential small tasks | Parallel Agents + Agent HQ | 15–50 min |
| [07](labs/lab-07-security-autofix/README.md) | **Zero-Day to Zero-Effort** | Fixing vulnerabilities | Security Autofix + Agent | 20–50 min |

### Tools & Integration

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [04](labs/lab-04-mcp-servers/README.md) | **Connect Your Tools** | Context switching | MCP Servers | 20–60 min |

---

## Suggested Agendas

### Half-Day (4 hours) — Productivity Focus

| Time | Activity |
|------|----------|
| 0:00 | Welcome + Toil Scorecard intro (15 min) |
| 0:15 | **Lab 01** — Coding Agent: Zero to PR (45 min) |
| 1:00 | **Lab 02** — Agent Mode: Feature Build (50 min) |
| 1:50 | Break (10 min) |
| 2:00 | **Lab 05** — Custom Instructions (50 min) |
| 2:50 | **Lab 06** — Parallel Delegation (50 min) |
| 3:40 | ROI Scorecard review + Q&A (20 min) |

### Full-Day (7 hours) — Comprehensive

| Time | Activity |
|------|----------|
| 0:00 | Welcome + Toil Scorecard intro (15 min) |
| 0:15 | **Lab 01** — Coding Agent (45 min) |
| 1:00 | **Lab 02** — Agent Mode (50 min) |
| 1:50 | Break (15 min) |
| 2:05 | **Lab 03** — Code Review (50 min) |
| 2:55 | **Lab 05** — Custom Instructions (50 min) |
| 3:45 | Lunch (45 min) |
| 4:30 | **Lab 06** — Parallel Delegation (50 min) |
| 5:20 | **Lab 07** — Security Autofix (50 min) |
| 6:10 | Break (10 min) |
| 6:20 | **Lab 09** or **Lab 10** — Skills or Custom Agents (50 min) |
| 7:10 | ROI Scorecard review + Take-home actions (20 min) |

### Security Focus

Labs 01, 03, 05, 07

### Platform Team Focus

Labs 04, 05, 06, 07, 10

---

## Toil Scorecard

Each lab includes a **Toil Scorecard** — fill it in as you go:

| Metric | Without Copilot | With Copilot | Savings |
|--------|----------------|--------------|---------|
| Time to complete | ___ min | ___ min | ___% |
| Lines coded manually | ___ | ___ | ___% |
| Context switches | ___ | ___ | ___% |
| Errors/rework cycles | ___ | ___ | ___% |

**At the end of the workshop**, calculate your total:
- Total hours saved across all labs
- Extrapolate: hours saved × 50 weeks × team size = **annual hours reclaimed**

---

## Agents & Skills Created During Labs

By the end of the workshop, you'll have created these reusable assets:

| Asset | Type | Created In |
|-------|------|-----------|
| Code Reviewer | Agent | Lab 03 |
| Project Status | Agent | Lab 04 |
| Security Reviewer | Agent | Lab 07 |
| Doc Generator | Agent | Lab 08 |
| Accessibility Auditor | Agent | Lab 10 |
| Performance Reviewer | Agent | Lab 10 |
| Frontend Component | Skill | Lab 09 |
| Code Quality Coach | Chatmode | Lab 10 |

---

## Useful Commands

| Task | Make | Without Make |
|------|------|-------------|
| Install all deps | `make install` | `cd api && npm install && cd ../frontend && npm install` |
| Dev mode (API + UI) | `make dev` | Run `npm run dev` in both `api/` and `frontend/` |
| Run all tests | `make test` | `cd api && npm test && cd ../frontend && npm test` |
| Build both projects | `make build` | `cd api && npm run build && cd ../frontend && npm run build` |
| Lint both projects | `make lint` | `cd api && npm run lint && cd ../frontend && npm run lint` |
| Clean artifacts | `make clean` | Delete `node_modules/` and `dist/` in `api/` and `frontend/` |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npx kill-port 3000` |
| Port 5173 in use | `npx kill-port 5173` |
| npm install fails | Delete `node_modules` in api/ and frontend/, re-run `make install` |
| Copilot not responding | Check Copilot extension is signed in and enabled |
| MCP servers not loading | Restart VS Code, check Docker is running |
| Coding Agent not available | Verify org policy enables Coding Agent |
| CodeQL not running | Enable GitHub Advanced Security in repo settings |
