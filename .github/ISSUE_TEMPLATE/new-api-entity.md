---
name: "New API Entity"
about: "Add a new CRUD entity to the OctoCAT Supply Chain API"
title: "Add [EntityName] entity with full CRUD API"
labels: ["enhancement", "copilot-coding-agent"]
assignees: ["copilot"]
---

## Summary

Add a new `[EntityName]` entity to the OctoCAT Supply Chain API.

<!-- Describe what this entity represents and why it's needed -->

## Requirements

### Data Model

<!-- Define your entity's fields. Follow existing naming conventions (camelCase for TS, snake_case for DB). -->

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `[entityName]Id` | integer | PK, auto | Primary key |
| | | | |
| | | | |

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/[entity-names]` | List all |
| `GET` | `/api/[entity-names]/:id` | Get by ID |
| `POST` | `/api/[entity-names]` | Create |
| `PUT` | `/api/[entity-names]/:id` | Update |
| `DELETE` | `/api/[entity-names]/:id` | Delete |

<!-- Add extra endpoints if needed (e.g., filter by FK) -->

### Implementation Checklist

Follow the existing patterns in the codebase:

- [ ] **Model**: `api/src/models/[entityName].ts` — TypeScript interface + Swagger schema (follow `product.ts` pattern)
- [ ] **Repository**: `api/src/repositories/[entityNames]Repo.ts` — CRUD methods (follow `productsRepo.ts` pattern)
- [ ] **Routes**: `api/src/routes/[entityName].ts` — Express handlers + full Swagger docs (follow `product.ts` routes)
- [ ] **Register route**: Add to `api/src/index.ts` — `app.use('/api/[entity-names]', [entityName]Routes)`
- [ ] **Migration**: `api/database/migrations/[NNN]_add_[entity_names].sql` — CREATE TABLE with constraints
- [ ] **Seed data**: `api/database/seed/[NNN]_[entity_names].sql` — 4–5 realistic rows
- [ ] **Unit tests**: `api/src/repositories/[entityNames]Repo.test.ts` — All CRUD operations with mocks (follow `suppliersRepo.test.ts`)

### Constraints

<!-- List database constraints: UNIQUE, FK references, CHECK constraints, etc. -->

- 
- Use parameterized SQL (never string concatenation)
- Follow existing error handling patterns (`NotFoundError`, `handleDatabaseError`)

### Acceptance Criteria

- [ ] `npm run build` passes with no errors
- [ ] `npm test` passes including new tests
- [ ] Swagger docs visible at `/api-docs` with the new entity tag
- [ ] All CRUD operations work via REST client or curl
