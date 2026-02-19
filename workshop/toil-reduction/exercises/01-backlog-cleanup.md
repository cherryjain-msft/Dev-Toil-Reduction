# Exercise 1 — Backlog Cleanup & Boilerplate

| | |
|---|---|
| **Category** | Backlog Cleanup & Boilerplate |
| **Deck Message** | "Clear easy-win issues" + "Generate boilerplate for endpoints" |
| **Time** | 30 minutes |
| **Difficulty** | Medium |
| **Features** | Coding Agent, Agent Mode |

## Toil Scorecard

| Metric | Without Copilot | With Copilot | Your Result |
|--------|----------------|--------------|-------------|
| Time to implement new entity | 2–4 hours | ~15 min | ___ |
| Time to build UI feature | 3–4 hours | ~15 min | ___ |
| Files created manually | 15–20 | 0 | ___ |
| Context switches | 10+ | 0 | ___ |

---

## Module A — Zero to PR (5 min) ▸ Coding Agent

> **Pattern**: Fire-and-forget — kick off Coding Agent, then move to Module B while it works.

### Step 1: Create the GitHub Issue

Go to your GitHub repo → **Issues** → **New Issue**.

Copy the issue content from [`workshop/issues/issue-01-add-delivery-vehicle.md`](../../issues/issue-01-add-delivery-vehicle.md):

- **Title**: `Add DeliveryVehicle entity with full CRUD API`
- **Body**: Copy the full issue body from the file above (includes data model, 6 endpoints, 7-item implementation checklist, constraints, and acceptance criteria)

### Step 2: Assign to Copilot

1. Click **Assignees** in the right sidebar
2. Select **Copilot**
3. Note the time: `___:___`

> Copilot Coding Agent starts analyzing the codebase, reads the `api-endpoint` skill and custom instructions, plans the implementation, creates all files, runs tests, and opens a PR — all autonomously.

### Step 3: Move to Module B

Don't wait — **proceed to Module B immediately.** The Coding Agent typically takes 5–15 minutes. You'll come back to review the PR in Module C.

---

## Module B — Feature Build (15 min) ▸ Agent Mode

> **Pattern**: Hands-on — run a pre-canned prompt and watch Agent Mode scaffold a multi-component feature.

### Step 4: Open Agent Mode

1. Open **Copilot Chat** in VS Code (`Ctrl+Shift+I`)
2. Switch to **Agent** mode (dropdown at the top of chat)

### Step 5: Run the prompt

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type **"Copilot: Run Prompt File"**
3. Select `workshop/toil-reduction/prompts/build-supplier-dashboard.prompt.md`

Watch Copilot:
- Read existing components (`Products.tsx`, `Navigation.tsx`, `App.tsx`)
- Create a `SupplierDashboard.tsx` page with summary cards
- Create a `SupplierCard.tsx` component with status badges
- Add routing and navigation
- Create unit tests
- Build and verify

### Step 6: Accept changes

As Agent Mode shows each file edit:
- Click **Accept** to apply each change
- If a change looks wrong, click **Reject** and let Copilot retry

### Step 7: Iterate (optional)

If time permits, ask for an enhancement in the same Agent Mode session:

```
Add a "Total Products" count badge to each supplier card that shows 
how many products that supplier provides. Use the existing 
GET /api/products/supplier/:supplierId endpoint.
```

### Step 8: Verify the build

```bash
cd frontend && npm run build
```

Open `http://localhost:5173/suppliers` — the dashboard should render.

---

## Module C — Review & Merge (10 min) ▸ Coding Agent

> **Pattern**: Return to the Coding Agent PR from Module A.

### Step 9: Open the PR

Go to your GitHub repo → **Pull requests** → find the PR opened by Copilot for the DeliveryVehicle entity.

### Step 10: Review against this checklist

| File | What to Verify |
|------|---------------|
| `api/src/models/deliveryVehicle.ts` | Has `@swagger` JSDoc, all 7 fields, correct types |
| `api/src/repositories/deliveryVehiclesRepo.ts` | All CRUD methods + `findBySupplierId`, parameterized SQL, factory/singleton |
| `api/src/routes/deliveryVehicle.ts` | Swagger docs for all 6 endpoints, proper status codes (201, 204, 404) |
| `api/src/index.ts` | Route registered: `app.use('/api/delivery-vehicles', ...)` |
| `api/sql/migrations/003_*.sql` | CREATE TABLE with FK, UNIQUE on `licensePlate`, CHECK on `status` |
| `api/sql/seed/005_*.sql` | 4–5 rows referencing supplier IDs 1–4 |
| `api/src/repositories/deliveryVehiclesRepo.test.ts` | Tests for all CRUD operations with mocks |

### Step 11: Request an iteration

Leave a review comment to test Copilot's ability to iterate:

```
Add a findByStatus method to the repository that filters vehicles by their status field.
Also add a GET endpoint: /api/delivery-vehicles/status/:status
```

Submit as **Request changes** and watch Copilot push a new commit.

### Step 12: Approve and merge

Once satisfied, approve and merge the PR.

Note the time: `___:___`

---

## What Made This Work

- **`api-endpoint` skill** (`.github/skills/api-endpoint/SKILL.md`) — taught Coding Agent the exact entity pattern
- **Custom instructions** — repo-wide + API-scoped rules automatically enforced
- **Well-structured issue** — detailed requirements = better Coding Agent output
- **Prompt file** (`build-supplier-dashboard.prompt.md`) — Agent Mode built a multi-file feature from a single prompt
- **Existing patterns** — Copilot learned from `Products.tsx`, `productsRepo.ts`, etc.

---

## Transition

> You've cleared two backlog items (entity + UI feature) without writing code. **Next**: Exercise 2 focuses on keeping that code clean — standards enforcement and automated review.

**→ Continue to [Exercise 2: Code Hygiene & Standards](02-code-hygiene.md)**
