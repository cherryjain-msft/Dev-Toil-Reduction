# Lab 01 — Coding Agent: "Zero to PR"

| | |
|---|---|
| **Toil** | Translating GitHub issues into working code |
| **Feature** | GitHub Copilot Coding Agent |
| **Time** | 45–60 minutes |
| **Difficulty** | Beginner |
| **Prerequisites** | GitHub repo with Copilot enabled, Coding Agent enabled in org settings |

## Toil Scorecard

| Metric | Without Copilot | With Copilot |
|--------|----------------|--------------|
| Time to first PR | 2–4 hours | ~15 min wait |
| Files touched manually | 7–8 files | 0 files |
| Context switches | 5–10 (docs, ERD, patterns) | 0 |
| Cognitive load | High | Low (review only) |

---

## What You'll Do

You will create a GitHub issue describing a new API entity, assign it to **Copilot Coding Agent**, and watch it autonomously plan, implement, test, and open a PR — all without writing a single line of code yourself.

---

## Part A — Understanding the Pattern (5 min)

Before we start, glance at one existing entity to understand what the Coding Agent will need to produce.

> **Don't code anything.** Just look.

Open these 4 files and skim the structure:

| File | What to notice |
|------|---------------|
| [api/src/models/product.ts](../../../api/src/models/product.ts) | TypeScript interface + Swagger `@swagger` JSDoc |
| [api/src/repositories/productsRepo.ts](../../../api/src/repositories/productsRepo.ts) | Repository class: `findAll`, `findById`, `create`, `update`, `delete`, `exists` |
| [api/src/routes/product.ts](../../../api/src/routes/product.ts) | Express routes with Swagger docs — CRUD endpoints |
| [api/sql/migrations/001_init.sql](../../../api/sql/migrations/001_init.sql) | SQL schema for all tables — see the `products` table |

**Key insight:** Every entity in this app follows the same pattern: **Model → Repository → Routes → Migration → Seed → Tests.** The codebase also has a Copilot Skill at `.github/skills/api-endpoint/SKILL.md` that teaches this pattern to Copilot.

---

## Part B — Create the GitHub Issue (10 min)

### Step 1: Copy the issue text below

Go to your GitHub repo → **Issues** → **New Issue**.

**Title:**
```
Add DeliveryVehicle entity with full CRUD API
```

**Body** (copy the entire block below):

````markdown
## Summary

Add a new `DeliveryVehicle` entity to the OctoCAT Supply Chain API. This entity tracks vehicles used by suppliers for deliveries.

## Requirements

### Data Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `deliveryVehicleId` | integer | PK, auto | Primary key |
| `supplierId` | integer | FK, required | References `suppliers.supplier_id` |
| `vehicleType` | string | required | e.g., "Truck", "Van", "Drone" |
| `licensePlate` | string | required | Unique license plate |
| `capacity` | number | required | Max cargo weight in kg |
| `status` | string | required | "available", "in-transit", "maintenance" |
| `lastInspectionDate` | string | optional | ISO 8601 date |

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/delivery-vehicles` | List all vehicles |
| `GET` | `/api/delivery-vehicles/:id` | Get vehicle by ID |
| `GET` | `/api/delivery-vehicles/supplier/:supplierId` | Get vehicles by supplier |
| `POST` | `/api/delivery-vehicles` | Create a vehicle |
| `PUT` | `/api/delivery-vehicles/:id` | Update a vehicle |
| `DELETE` | `/api/delivery-vehicles/:id` | Delete a vehicle |

### Implementation Checklist

Follow the existing patterns in the codebase:

- [ ] **Model**: `api/src/models/deliveryVehicle.ts` — TypeScript interface + Swagger schema (follow `product.ts` pattern)
- [ ] **Repository**: `api/src/repositories/deliveryVehiclesRepo.ts` — CRUD + `findBySupplierId()` (follow `productsRepo.ts` pattern)
- [ ] **Routes**: `api/src/routes/deliveryVehicle.ts` — Express handlers + full Swagger docs (follow `product.ts` routes)
- [ ] **Register route**: Add to `api/src/index.ts` — `app.use('/api/delivery-vehicles', deliveryVehicleRoutes)`
- [ ] **Migration**: `api/sql/migrations/003_add_delivery_vehicles.sql` — CREATE TABLE with FK to suppliers
- [ ] **Seed data**: `api/sql/seed/005_delivery_vehicles.sql` — 4–5 realistic rows referencing existing supplier IDs (1–4)
- [ ] **Unit tests**: `api/src/repositories/deliveryVehiclesRepo.test.ts` — All CRUD operations with mocks (follow `suppliersRepo.test.ts`)

### Constraints

- `licensePlate` must be UNIQUE
- FK `supplierId` → `suppliers(supplier_id)` with `ON DELETE CASCADE`
- `status` CHECK constraint: must be one of 'available', 'in-transit', 'maintenance'
- Use parameterized SQL (never string concatenation)
- Follow existing error handling patterns (`NotFoundError`, `handleDatabaseError`)

### Acceptance Criteria

- [ ] `npm run build` passes with no errors
- [ ] `npm test` passes including new tests
- [ ] Swagger docs visible at `/api-docs` with DeliveryVehicles tag
- [ ] All CRUD operations work via REST client or curl
````

### Step 2: Submit the issue

Click **Submit new issue**. Note the issue number (e.g., `#1`).

---

## Part C — Assign to Copilot Coding Agent (5 min)

### Step 3: Assign the issue to Copilot

On the issue page:

1. In the right sidebar, click **Assignees**
2. Select **Copilot** from the list
3. Copilot will begin working within ~30 seconds

> **What happens next:** Copilot Coding Agent reads the issue, analyzes the codebase (including the `api-endpoint` skill and custom instructions), creates a plan, implements all files, runs tests, and opens a PR — all autonomously.

### Step 4: Watch the progress

1. Click on the **Copilot icon** in the issue to see its work session
2. You'll see Copilot:
   - Analyzing the codebase structure
   - Reading existing patterns (models, repos, routes)
   - Creating each file listed in the checklist
   - Running `npm run build` and `npm test`
   - Opening a PR when done

> **Typical wait time:** 5–15 minutes depending on complexity.

---

## Part D — Review the PR (20 min)

### Step 5: Open the PR

When Copilot opens the PR, click through to review it.

**Check each file against the expected pattern:**

| File | What to verify |
|------|---------------|
| `deliveryVehicle.ts` (model) | Has `@swagger` JSDoc, all 7 fields, correct types |
| `deliveryVehiclesRepo.ts` (repo) | Has all CRUD methods + `findBySupplierId`, uses parameterized SQL, factory/singleton pattern |
| `deliveryVehicle.ts` (routes) | Has Swagger docs for all 6 endpoints, proper status codes (201, 204, 404) |
| `index.ts` | Route registered: `app.use('/api/delivery-vehicles', ...)` |
| `003_add_delivery_vehicles.sql` | CREATE TABLE with FK, UNIQUE on `licensePlate`, CHECK on `status` |
| `005_delivery_vehicles.sql` | 4–5 rows with realistic data referencing supplier IDs 1–4 |
| `deliveryVehiclesRepo.test.ts` | Tests for `findAll`, `findById`, `create`, `update`, `delete`, `exists` |

### Step 6: Leave review feedback

Try providing feedback on the PR to see Copilot iterate:

1. Click **Review changes** → leave a comment like:

```
Add a `findByStatus` method to the repository that filters vehicles by status.
Also add a GET endpoint: `/api/delivery-vehicles/status/:status`
```

2. Submit as **Request changes**
3. Watch Copilot read your feedback, implement the changes, and push a new commit

### Step 7: Approve and merge

Once satisfied:
1. Click **Review changes** → **Approve**
2. Click **Merge pull request**

---

## Part E — Verify It Works (10 min)

### Step 8: Pull and run

```bash
git pull origin main
cd api
npm run db:seed:dev
npm run dev
```

### Step 9: Test the new endpoints

Open a new terminal and run:

```bash
# List all vehicles
curl http://localhost:3000/api/delivery-vehicles

# Get vehicle by ID
curl http://localhost:3000/api/delivery-vehicles/1

# Create a new vehicle
curl -X POST http://localhost:3000/api/delivery-vehicles \
  -H "Content-Type: application/json" \
  -d '{"supplierId": 1, "vehicleType": "Drone", "licensePlate": "DRONE-001", "capacity": 5, "status": "available"}'

# Check Swagger docs
# Open http://localhost:3000/api-docs in browser — find "DeliveryVehicles" tag
```

### Step 10: Run the test suite

```bash
npm test
```

All tests (including the new `deliveryVehiclesRepo.test.ts`) should pass.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Total time from issue creation to merged PR | ___ min |
| Lines of code you wrote manually | ___ |
| Number of review iterations | ___ |
| Did Copilot follow the existing patterns? | Yes / Partially / No |
| Did all tests pass on first attempt? | Yes / No |
| Confidence level in the generated code (1-5) | ___ |

---

## Key Takeaway

> **You went from a GitHub issue to a fully tested, reviewed, and merged feature — without writing a single line of code.** The Coding Agent used the repo's existing patterns, the `api-endpoint` skill, and the custom instructions to produce production-quality code.

### What Made This Work

- **Skill** (`.github/skills/api-endpoint/SKILL.md`): Taught Copilot the exact entity pattern
- **Custom instructions** (`.github/copilot-instructions.md`): Set repo-wide standards
- **Path-scoped instructions** (`.github/instructions/api.instructions.md`): API-specific rules
- **Well-structured issue**: Detailed requirements = better output
- **Existing patterns**: Copilot learned from the existing entities in the codebase

---

## Bonus Challenge (Optional, 15 min)

Create a **second issue** for a `Warehouse` entity:

**Title:** `Add Warehouse entity with full CRUD API`

Use the same issue template pattern above but with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `warehouseId` | integer | PK |
| `name` | string | Warehouse name |
| `location` | string | Address |
| `capacity` | number | Max storage in cubic meters |
| `supplierId` | integer | FK to suppliers |
| `active` | boolean | Whether warehouse is operational |

Assign to Copilot and compare the quality with your first experience.
