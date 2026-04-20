# Reducing Developer Toil — GitHub Copilot Workshop

![OctoCAT Supply](./frontend/public/hero.png)

> **Turn hours of repetitive work into minutes of AI-assisted flow.**

A hands-on workshop where enterprise developers tackle real developer toils using the latest GitHub Copilot features — Coding Agent, Agent Mode, Code Review, MCP Servers, Custom Instructions, Skills, Custom Agents, and more.

---

## Prerequisites

### Must-Have **Now**

| Requirement | Check |
|------------|-------|
| **GitHub account** | With **Copilot Enterprise** or **Copilot Business** license |
| **VS Code** | Latest version with [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) + [Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions |
| **Git** | Configured with credentials |

> ✅ **Have the above?** Skip to [Choose Your Path](#choose-your-path).

### Optional — Required Only for Specific Labs

| When needed | Requirement |
|--------|-------------|
| Before Labs 01, 03 | Org policy: Copilot Coding Agent & Code Review enabled |
| Starting Labs 04–05 | GitHub PAT ([create one](https://github.com/settings/tokens)) |
| If doing Lab 07 | GitHub Advanced Security enabled on repo |

---
## Choose Your Path

| Path | Time | For | Recommendation |
|------|------|-----|-----------------|
| [**Codespaces**](#path-codespaces) | 5–10 min | In-person workshops, no setup | ⭐ **Start here** |
| [**Docker Desktop**](#path-docker-desktop) | ~15 min | Already using Docker | ✅ Popular |
| [**Podman**](#path-podman) | ~15 min | Enterprise (Docker restricted) | ✅ Supported |
| [**Manual**](#path-manual) | ~20 min | Node.js v24+ already installed | Advanced |

---

<a id="path-codespaces"></a>
### Option A — GitHub Codespaces

**5–10 min | Zero setup**

1. On your fork: **Code** → **Codespaces** → **Create codespace on main**
2. Wait for setup (auto-installs dependencies and builds)
3. Authenticate (if prompted):
   ```shell
   gh auth login
   copilot login
   ```
4. ➜ **[Jump to Run Your First App](#run-your-first-app)**

<a id="path-docker-desktop"></a>
### Option B — VS Code + Docker Desktop

**~15 min | Has Docker**

1. Install [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
2. Start Docker Desktop
3. Clone and open:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   code .
   ```
4. Click **"Reopen in Container"** when prompted (or `Ctrl+Shift+P` → search "Reopen in Container")
5. Wait for build to finish
6. Authenticate (if prompted):
   ```shell
   gh auth login
   copilot login
   ```
7. ➜ **[Jump to Run Your First App](#run-your-first-app)**

<a id="path-podman"></a>
### Option C — VS Code + Podman

**~15 min | Enterprise/Docker restricted**

1. Install [Podman](https://podman.io/docs/installation) + [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
2. Start Podman:
   - **macOS/Windows:** `podman machine init && podman machine start`
   - **Linux:** `systemctl --user enable --now podman.socket`
3. Configure VS Code: **Settings** → search `dev.containers.dockerPath` → set to `podman`
4. Clone and open:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   code .
   ```
5. Click **"Reopen in Container"** and wait for build
6. Authenticate (if prompted):
   ```shell
   gh auth login
   copilot login
   ```
7. ➜ **[Jump to Run Your First App](#run-your-first-app)**


> **Podman troubleshooting:** If the container fails to start, verify the Podman socket path matches what VS Code expects. On Linux, set `"dev.containers.dockerSocketPath": "/run/user/1000/podman/podman.sock"` (adjust the UID if yours differs). On macOS/Windows, `podman machine start` handles this automatically.

>**Note:** Your organizaiton may require you to download a CA certification into the Podman Vitual Maching, please visit: https://github.com/containers/podman/blob/main/docs/tutorials/podman-install-certificate-authority.md

**↳ Podman on Windows won't start?** First enable Virtual Machine Platform in PowerShell (Admin):
```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# Then restart your machine
```

<a id="path-manual"></a>
### Option D — Manual Setup

If you prefer to install all tools directly on your machine:

**Manual path prerequisites:**

- Node.js **v24+** (includes npm)
- Git
- GNU Make (`make`) available in your shell
- VS Code with GitHub Copilot + Copilot Chat extensions
- GitHub account with Copilot Business or Enterprise

1. Confirm prerequisites are installed (see [Prerequisites](#prerequisites) above)
2. Clone your repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```
3. Install dependencies and build:
   ```bash
   make install
   make build
   ```
   If `make` is not available on your machine, use:
   ```bash
   cd api && npm install && npm run build
   cd ../frontend && npm install && npm run build
   ```
4. Authenticate:
   ```shell
   gh auth login
   copilot login
   ```
5. Continue with [Run Your First App](#run-your-first-app)

---
## Run Your First App

### 1. Create Your Repo

1. **Fastest:** Click **Fork** and fork this repo to your account (default name is fine)
2. **If forking is restricted:** click **"Use this template"** to create a new repo
3. Keep the default repo name or choose your own

> Each of you gets a personal repo for doing Coding Agent labs and GitHub integration exercises.

### 2. Start the Services

Your environment is already set up and dependencies are installed. Open **two terminals**:

**Terminal 1 — API:**
```bash
cd api
npm run dev
```
Look for: `Server is running on port 3000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Look for: `Local: http://localhost:5137/`

### 3. ✅ Success Check

Open these URLs (or click port links in VS Code):

| What | URL | Expect |
|------|-----|--------|
| **API Docs** | http://localhost:3000/api-docs/ | Swagger UI showing endpoints |
| **Frontend** | http://localhost:5137 | React dashboard with products listed |

**Both load with content?** → 🎉 Ready for the labs!

---
## Troubleshooting Setup

| Problem | Quick Fix |
|---------|-----------|
| Port already in use | `npx kill-port 3000 5137` |
| Blank API docs page | Add trailing slash: `http://localhost:3000/api-docs/` |
| Container stuck | VS Code → **Developer: Reload Window** |
| Still stuck | **Dev Containers: Rebuild Container** |
| Can't reach frontend | Check VS Code **Ports** panel for 5137 forwarding |

> More help under [Troubleshooting](#troubleshooting).

---
## Quick Start (5 min)

### 1. Create Your Repo (Fork First)

1. **Recommended (fastest):** Click **Fork** and create a fork under your own account/org.
2. **Fallback:** If your org blocks forks, use **Code → Use this template → Create a new repository**.
3. Keep the default name or pick any name, then create the repo.

> **Why fork first?** It is usually one click faster and still gives each attendee a personal repo with push access for Coding Agent PRs, Code Review, and GitHub Advanced Security labs.

### 2. Set Up Your Environment

Choose one of the options from [Choose Your Path](#choose-your-path) above:
- **Codespaces** — Zero local install (recommended)
- **Docker Desktop** — Standard Docker
- **Podman** — Enterprise/restricted Docker environments
- **Manual Setup** — Direct installation

Once your environment is ready, the dependencies will be automatically installed and the project will be built.

---
## The Application

**OctoCAT Supply** is a supply chain management system built with a modern TypeScript stack. You'll use it throughout every lab.

```
Frontend (React + Vite + Tailwind)  →  API (Express.js + TypeScript)  →  SQLite
```

```mermaid
erDiagram
    Headquarters ||--o{ Branch: has
    Branch ||--o{ Order: placed_at
    Order ||--o{ OrderDetail: contains
    OrderDetail ||--o{ OrderDetailDelivery: fulfilled_by
    OrderDetail }|--|| Product: references
    Delivery ||--o{ OrderDetailDelivery: includes
    Supplier ||--o{ Delivery: provides
```

---

## Labs

> **Pick the toils that hurt your team most, or crush them all.**
>
> Each lab is **standalone** (no dependencies between labs). Times show **core exercises → all exercises**.

### Backlog Cleanup & Boilerplate

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [01](workshop/labs/lab-01-coding-agent/README.md) | **Zero to PR** | Translating issues to code | Coding Agent | 15–50 min |
| [02](workshop/labs/lab-02-agent-mode/README.md) | **Feature Build** | Scaffolding components | Agent Mode | 30–55 min |
| [09](workshop/labs/lab-09-github-skills/README.md) | **Teach Copilot Your Patterns** | Repeating entity patterns | Copilot Skills | 30–55 min |

### Code Hygiene & Standards

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [03](workshop/labs/lab-03-code-review/README.md) | **AI First-Pass Review** | PR review bottleneck | Code Review + Custom Agent | 20–55 min |
| [05](workshop/labs/lab-05-custom-instructions/README.md) | **Team Standards as Code** | Manual standards enforcement | Custom Instructions | 25–55 min |
| [08](workshop/labs/lab-08-documentation/README.md) | **Self-Documenting Code** | Writing documentation | Agent Mode + Doc Agent | 20–55 min |
| [10](workshop/labs/lab-10-custom-agents/README.md) | **Build Your Own Agent** | Specialized workflows | Custom Agents | 15–50 min |

### Testing & Quality

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [06](workshop/labs/lab-06-parallel-delegation/README.md) | **Agent HQ: Batch It** | Sequential small tasks | Parallel Agents + Agent HQ | 15–50 min |
| [07](workshop/labs/lab-07-security-autofix/README.md) | **Zero-Day to Zero-Effort** | Fixing vulnerabilities | Security Autofix + Agent | 20–50 min |

### Tools & Integration

| Lab | Title | Toil Solved | Copilot Feature | Time |
|-----|-------|-------------|----------------|------|
| [04](workshop/labs/lab-04-mcp-servers/README.md) | **Connect Your Tools** | Context switching | MCP Servers | 20–60 min |

---

## Toil Scorecard

Each lab includes a **Toil Scorecard** — estimate your before/after as you go:

| Metric | Without Copilot (est.) | With Copilot (est.) | Savings |
|--------|----------------------|-------------------|---------|
| Time to complete | ___ min | ___ min | ___% |
| Lines coded manually | ___ | ___ | ___% |
| Context switches | ___ | ___ | ___% |
| Errors/rework cycles | ___ | ___ | ___% |

> **At the end of the workshop**, calculate your total: hours saved × 50 weeks × team size = **annual hours reclaimed**.

---

## Agents & Skills Created During Labs

By the end of the workshop, you'll have created these reusable assets:

| Asset | Type | Created In |
|-------|------|-----------|
| Code Reviewer | Agent | Lab 03 |
| Project Status | Agent | Lab 04 |
| Security Reviewer | Agent | Lab 07 |
| Doc Generator | Agent | Lab 08 |
| Codebase Navigator | Agent | Lab 10 |
| PR Review Pipeline | Agent | Lab 10 |
| Frontend Component | Skill | Lab 09 |

---

## Useful Commands

| Task | Command |
|------|--------|
| Install all deps | `cd api && npm install && cd ../frontend && npm install` |
| Dev mode (API) | `cd api && npm run dev` |
| Dev mode (Frontend) | `cd frontend && npm run dev` |
| Run all tests | `cd api && npm test && cd ../frontend && npm test` |
| Build both projects | `cd api && npm run build && cd ../frontend && npm run build` |
| Lint both projects | `cd api && npm run lint && cd ../frontend && npm run lint` |
| Reset database | `cd api && npm run db:migrate && npm run db:seed` |
| Clean artifacts | Delete `node_modules/` and `dist/` in `api/` and `frontend/` |

---

## Reference

| Resource | Description |
|----------|-------------|
| [Architecture](./docs/architecture.md) | Detailed system design |
| [SQLite Integration](./docs/sqlite-integration.md) | Database patterns and config |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 3000 / 5137 in use | `npx kill-port 3000 5137` |
| npm install fails | Delete `node_modules` in `api/` and `frontend/`, re-run install |
| Copilot not responding | Check the Copilot extension is signed in and enabled |
| MCP servers not loading | Restart VS Code, check `.vscode/mcp.json` config |
| Coding Agent not available | Verify org policy enables Coding Agent |
| CodeQL not running | Enable GitHub Advanced Security in repo settings *(only needed for Lab 07)* |
| **Podman: Virtual Machine Platform not enabled** (Windows) | Run in **PowerShell as Administrator**: `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart` then restart your machine |
| **Podman: Machine fails to start** (Windows/macOS) | Verify machine is initialized: `podman machine init` then `podman machine start` |
| **Podman: Socket not found** (Linux) | Enable the Podman socket: `systemctl --user enable --now podman.socket` |
| **Dev Container fails with Podman** | Verify VS Code setting: `"dev.containers.dockerPath": "podman"`. On Linux, also set: `"dev.containers.dockerSocketPath": "/run/user/1000/podman/podman.sock"` (adjust UID: `echo $UID`) |

---

*Built with GitHub Copilot.*
