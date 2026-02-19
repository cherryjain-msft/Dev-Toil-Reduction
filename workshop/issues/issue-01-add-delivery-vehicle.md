---
title: "Add DeliveryVehicle entity with full CRUD API"
labels: ["enhancement", "good first issue", "copilot-coding-agent"]
assignees: ["copilot"]
---

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
