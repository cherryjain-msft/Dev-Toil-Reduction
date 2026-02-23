---
title: "Generate architecture diagrams and update documentation"
labels: ["enhancement", "documentation", "copilot-coding-agent"]
assignees: ["copilot"]
---

## Summary

Generate detailed Mermaid architecture diagrams and update `docs/architecture.md` with comprehensive visual documentation covering the API request lifecycle, deployment topology, and data flow through the system.

## Implementation

- Update `docs/architecture.md` with the new diagrams below
- Read actual source files (`api/src/routes/*.ts`, `api/src/repositories/*.ts`, `api/src/index.ts`, `frontend/src/App.tsx`, `frontend/src/api/*.ts`) to ensure accuracy
- All diagrams must use Mermaid syntax so they render natively on GitHub
- Preserve existing content (ERD and Component Architecture diagrams) — append the new sections

## Diagrams Required

### 1. API Request Lifecycle (Sequence Diagram)

Show the full request flow: Client → Express Router → Route Handler → Repository → SQLite → Response. Include error handling path.

### 2. Frontend-to-Backend Data Flow (Flowchart)

Show how a user action in a React component triggers an API call, flows through the backend, and returns data to the UI. Use the Products entity as the example.

### 3. Project Structure Overview (Flowchart)

Visual map of the monorepo structure showing `api/`, `frontend/`, `docs/`, `infra/` and their key subdirectories with brief descriptions of what each contains.

### 4. Deployment Architecture (Flowchart)

Show the containerized deployment: Docker Compose locally, Azure Container Apps in production. Read `docker-compose.yml` and `infra/container-apps.bicep` for accuracy.

## Quality Requirements

- Diagrams must render correctly in GitHub Markdown (use ```mermaid code blocks)
- Use consistent styling and colors across diagrams
- Add a table of contents at the top of the updated architecture doc listing all diagrams
- Each diagram must have a brief text description explaining what it shows

## Acceptance Criteria

- [ ] `docs/architecture.md` contains at least 6 Mermaid diagrams (4 new + 2 existing)
- [ ] All diagrams render correctly on GitHub (valid Mermaid syntax)
- [ ] Diagrams reflect the actual codebase structure (not generic/placeholder content)
- [ ] Existing ERD and Component Architecture diagrams are preserved
- [ ] A table of contents links to each diagram section
