---
title: "Generate architecture diagrams and update documentation"
labels: ["enhancement", "documentation", "copilot-coding-agent"]
assignees: ["copilot"]
---

## Summary

@doc-generator — Generate Mermaid architecture diagrams and update `docs/architecture.md`.

## Diagrams to Add

1. **API Request Lifecycle** (sequenceDiagram) — Client → Express → Route → Repository → SQLite → Response, including error path
2. **Frontend-to-Backend Data Flow** (flowchart) — React component → API client → Express route → Repository → DB, using Products as example
3. **Project Structure Overview** (flowchart) — Monorepo map of `api/`, `frontend/`, `docs/`, `infra/` with key subdirectories
4. **Deployment Architecture** (flowchart) — Docker Compose (local) and Azure Container Apps (production), read from `docker-compose.yml` and `infra/container-apps.bicep`

## Rules

- Preserve existing ERD and Component Architecture diagrams — append new sections
- Add a table of contents linking to all diagram sections
- Each diagram gets a short text description above it
- Read actual source files for accuracy — do not use placeholders

## Acceptance Criteria

- [ ] `docs/architecture.md` contains at least 6 Mermaid diagrams (4 new + 2 existing)
- [ ] All diagrams render correctly on GitHub
- [ ] Diagrams reflect the actual codebase (not generic content)
