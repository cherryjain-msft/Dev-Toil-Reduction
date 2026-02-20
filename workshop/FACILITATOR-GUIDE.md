# Facilitator Guide

> Setup checklist, timing, talking points, and troubleshooting for workshop delivery.

---

## Pre-Workshop Checklist (1 week before)

### Organization/Repo Setup

- [ ] Fork or template the workshop repo into the target org
- [ ] Enable **Copilot Coding Agent** in org Copilot policies
- [ ] Enable **Copilot Code Review** in org Copilot policies
- [ ] Enable **GitHub Advanced Security** on the repo (for Lab 07)
- [ ] Enable **CodeQL** default setup on the repo (for Lab 07)
- [ ] Verify `.vscode/mcp.json` servers are accessible:
  - GitHub MCP (Docker) — requires Docker Desktop
  - Playwright MCP — requires npx
  - GitHub Remote MCP — requires GitHub auth
  - Azure MCP — optional, only if Azure resources exist
- [ ] Create a clean branch `main` with all workshop content

### Participant Access

- [ ] Each participant has a GitHub account with Copilot license (Enterprise or Business)
- [ ] Each participant has write access to the repo (or their own fork)
- [ ] VS Code installed with:
  - GitHub Copilot extension (latest)
  - GitHub Copilot Chat extension (latest)
- [ ] Node.js v24+ installed
- [ ] Docker Desktop installed and running (for MCP labs)
- [ ] Git configured with GitHub credentials

### Environment Verification

Run on a clean machine to verify setup works:

```bash
git clone <repo-url>
cd <repo>
make install    # Should succeed with no errors
make dev        # API on :3000, Frontend on :5173
make test       # All existing tests pass
```

---

## Day-Of Setup (30 min before)

1. Open the repo in VS Code — verify Copilot icon shows "Ready"
2. Run `make dev` to confirm everything starts
3. Open http://localhost:3000/api-docs — Swagger loads
4. Open http://localhost:5173 — React app loads
5. Test one Copilot Chat prompt to verify connectivity
6. Pre-open the workshop README in a browser tab for participants

---

## Delivery Formats

### Half-Day (4 hours) — Best for: Intro to AI-Assisted Dev

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:15 | **Welcome & Toil Scorecard** | Hand out scorecard template, explain metrics |
| 0:15–1:00 | **Lab 01: Coding Agent** | Everyone does this — foundational |
| 1:00–1:50 | **Lab 02: Agent Mode** | Builds on Lab 01 concepts |
| 1:50–2:00 | **Break** | |
| 2:00–2:50 | **Lab 05: Custom Instructions** | Team standards focus |
| 2:50–3:40 | **Lab 06: Parallel Delegation** | Scale what they learned in Lab 01 |
| 3:40–4:00 | **ROI Scorecard Review & Q&A** | Calculate team-level savings |

### Full-Day (7 hours) — Best for: Comprehensive Workshop

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:15 | **Welcome & Toil Scorecard** | Set baseline expectations |
| 0:15–1:00 | **Lab 01: Coding Agent** | Core workflow |
| 1:00–1:50 | **Lab 02: Agent Mode** | Multi-file editing |
| 1:50–2:05 | **Break** | |
| 2:05–2:55 | **Lab 03: Code Review** | Quality gates |
| 2:55–3:45 | **Lab 05: Custom Instructions** | Standards as code |
| 3:45–4:30 | **Lunch** | |
| 4:30–5:20 | **Lab 06: Parallel Delegation** | Scaling with Agent HQ |
| 5:20–6:10 | **Lab 07: Security Autofix** | Security automation |
| 6:10–6:20 | **Break** | |
| 6:20–7:10 | **Lab 09 or 10** | Participant choice |
| 7:10–7:30 | **ROI Scorecard & Takeaways** | Action items for teams |

### Security Team Focus (4 hours)

Labs: 01, 03, 05, 07

### Platform/DevOps Focus (4 hours)

Labs: 04, 05, 06, 07, 10

### Quality Engineering Focus (4 hours)

Labs: 01, 03, 06, 07, 10

---

## Talking Points per Lab

### Lab 01 — Coding Agent: "Zero to PR"

**Key message:** "Write a clear issue, get a complete PR — Copilot handles model, repo, routes, migration, seed, and tests."

- Show the entity pattern first (Supplier = 7 files) so participants understand the scope
- Emphasize: the issue quality determines the PR quality
- Point out: Copilot reads `.github/copilot-instructions.md` and path-scoped instructions
- Demo: Show the skill file at `.github/skills/api-endpoint/` that Copilot uses

### Lab 02 — Agent Mode: "Feature Build"

**Key message:** "Prompt files are reusable recipes — save them, share them, iterate on them."

- Contrast with Lab 01: Coding Agent = async/issue-driven, Agent Mode = interactive/iterative
- Highlight the `@workspace` and `#file` references in the prompt file
- Show how Agent Mode proposes file changes with diffs you can accept/reject

### Lab 03 — Code Review: "AI First-Pass Review"

**Key message:** "Copilot catches the obvious bugs so human reviewers focus on architecture and design."

- The 8 bugs in `analytics.ts` are realistic — SQL injection, hardcoded secrets, missing error handling
- Point out: custom review agents encode team standards (your rules, not generic rules)
- Ask participants: "How many bugs did Copilot catch vs. how many you would catch in a quick review?"

### Lab 04 — MCP Servers: "Connect Your Tools"

**Key message:** "MCP breaks Copilot out of the IDE — it can query GitHub, run browsers, call APIs."

- Docker must be running for GitHub MCP
- This lab has the most potential for "wow" moments (visual testing, cross-repo queries)
- The project-status agent combines multiple MCP sources — show data composition

### Lab 05 — Custom Instructions: "Team Standards as Code"

**Key message:** "Instructions are version-controlled, code-reviewed team standards — not tribal knowledge."

- Walk through the 3-level hierarchy: repo-wide → path-scoped → AGENTS.md
- Show how `applyTo` globs target specific file types
- Emphasize: these ship with the repo, new team members get them automatically

### Lab 06 — Parallel Delegation: "Batch It"

**Key message:** "One developer, three agents, three PRs — simultaneously."

- Requires Coding Agent enabled (same as Lab 01)
- Agent HQ is the monitoring dashboard — show it
- Each issue is independent — that's the key to parallelization
- Compare: 3 sequential PRs (3× time) vs. 3 parallel PRs (1× time)

### Lab 07 — Security Autofix: "Zero-Day to Zero-Effort"

**Key message:** "CodeQL finds it, Copilot fixes it — no security expertise required."

- Requires GitHub Advanced Security + CodeQL enabled
- The SQL injection in `search.ts` is intentionally obvious — production bugs are subtler
- The security-reviewer agent is preventive (before merge), CodeQL is detective (after push)
- Ask: "What's your current vulnerability remediation time? Days? Weeks?"

### Lab 08 — Documentation: "Self-Documenting Code"

**Key message:** "Documentation generated from code is always accurate — and always up to date."

- The doc-generator agent reads source code, not comments
- The prompt file (`update-all-docs.prompt.md`) is reusable — run it on every release
- Compare: manual docs (hours, often stale) vs. generated docs (minutes, always current)

### Lab 09 — Copilot Skills: "Teach Copilot Your Patterns"

**Key message:** "Skills are reference architectures for Copilot — show it your patterns, get consistent output."

- Walk through the existing `api-endpoint` skill structure (SKILL.md + reference files)
- The new `frontend-component` skill mirrors your team's React patterns
- Show the with-skill vs. without-skill comparison — consistency is the win

### Lab 10 — Custom Agents & Chatmodes: "Build Your Own Agent"

**Key message:** "Agents encode expertise. Chatmodes personalize interaction. Together they multiply your team."

- Start with the 5 existing agents — participants see real examples
- The accessibility auditor has WCAG 2.1 AA checklist — domain expertise in a file
- Chatmodes are different: always-on personality vs. on-demand agent invocation
- End with the summary table — 6 agents + 1 chatmode + 1 skill created across the workshop

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Copilot Chat shows "Connecting..." | Restart VS Code, check internet, verify license |
| Coding Agent doesn't pick up issue | Check org policy, verify `assignees: copilot` in issue |
| Agent Mode doesn't edit files | Accept the workspace trust prompt, re-open chat |
| MCP server fails to connect | Restart VS Code, verify Docker running, check `mcp.json` |
| CodeQL scan not running | Enable default setup in repo Settings → Security → Code scanning |
| `make dev` fails | Check Node.js version (v24+), run `make clean && make install` |
| Tests fail after lab changes | Expected if bugs were injected — `git stash` to revert |
| Port already in use | `npx kill-port 3000 5173` |

---

## Post-Workshop

1. **Collect scorecards** — aggregate time savings across all participants
2. **Share the repo** — participants keep it as a reference
3. **Follow-up email** with:
   - Link to GitHub Copilot docs
   - Summary of agents/skills they created
   - ROI calculation template for their actual projects
4. **Optional**: Schedule a 30-min follow-up in 2 weeks to review adoption
