# Lab 02 — Agent Mode: "Feature Build"

| | |
|---|---|
| **Toil** | Scaffolding components and boilerplate code |
| **Feature** | Copilot Agent Mode (multi-file editing in VS Code) |
| **Time** | 45–60 minutes |
| **Difficulty** | Beginner |
| **Prerequisites** | VS Code with Copilot Chat, app running locally (`make dev`) |

## Toil Scorecard

| Metric | Without Copilot | With Copilot |
|--------|----------------|--------------|
| Time to build feature | 3–4 hours | ~30 min |
| Files created/modified | 8–12 (manual) | 8–12 (automated) |
| Context switches to docs | 5+ (React, Tailwind, API) | 0 |
| Boilerplate typed manually | ~400 lines | 0 |

---

## What You'll Do

You will use **Agent Mode** in VS Code to build a complete "Order History" page — a new frontend feature with React components, API integration, routing, and tests — using a single prompt file. You won't write code manually.

---

## Part A — Setup (5 min)

### Step 1: Start the application

```bash
make install
make dev
```

Verify:
- API running at `http://localhost:3000/api-docs`
- Frontend running at `http://localhost:5173`
- Navigate to the Products page — the app should load with products visible

### Step 2: Open Agent Mode

1. Open **Copilot Chat** panel in VS Code (Ctrl+Shift+I / Cmd+Shift+I)
2. At the top of the chat, click the mode dropdown and select **Agent**
3. You should see the tools list (codebase, editFiles, runCommands, etc.)

---

## Part B — Build with a Prompt File (25 min)

### Step 3: Open the pre-built prompt file

This lab includes a ready-to-use prompt file. Open it:

**File:** `workshop/labs/lab-02-agent-mode/build-order-history.prompt.md`

### Step 4: Run the prompt

1. In VS Code, open the Command Palette (Ctrl+Shift+P)
2. Type **"Copilot: Run Prompt File"** and select it
3. Choose `workshop/labs/lab-02-agent-mode/build-order-history.prompt.md`
4. Agent Mode will start executing — watch the chat panel

> **What happens:** Copilot reads the prompt, analyzes the codebase, and starts creating files. You'll see it:
> - Read existing components (`Products.tsx`, `App.tsx`, `Navigation.tsx`)
> - Create the `OrderHistory.tsx` component
> - Create the `OrderDetail.tsx` modal component
> - Add the route to `App.tsx`
> - Add navigation link to `Navigation.tsx`
> - Create unit tests
> - Build and verify

### Step 5: Review the changes as they appear

As Agent Mode works, it will show you each file it's editing. For each:
- Click **Accept** to apply the change
- Or click **Reject** to skip and let it try again

**Expected files created/modified:**

| Action | File |
|--------|------|
| Create | `frontend/src/components/entity/orders/OrderHistory.tsx` |
| Create | `frontend/src/components/entity/orders/OrderDetail.tsx` |
| Modify | `frontend/src/App.tsx` — add `/orders` route |
| Modify | `frontend/src/components/Navigation.tsx` — add "Orders" nav link |
| Create | `frontend/src/components/entity/orders/OrderHistory.test.tsx` |

---

## Part C — Iterate with Agent Mode (15 min)

### Step 6: Ask for enhancements

After the feature is built, stay in the same Agent Mode session and type:

```
Add a status filter dropdown to the OrderHistory page that lets users 
filter orders by status: "All", "Pending", "Shipped", "Delivered", "Cancelled". 
Use Tailwind styling consistent with the existing Products page search bar.
```

Watch Copilot modify `OrderHistory.tsx` to add the filter.

### Step 7: Ask for another enhancement

```
Add a "Reorder" button to each order row that adds all items from that 
order back to the cart using the existing CartContext. Import useCart 
from the cart context.
```

Watch Copilot integrate with the existing `CartContext`.

### Step 8: Fix any issues interactively

If the build has errors, type:

```
Check for any build errors and fix them.
```

Agent Mode will run the build, read the errors, and fix them.

---

## Part D — Verify (10 min)

### Step 9: Check the frontend

1. Open `http://localhost:5173` in your browser
2. Click **Orders** in the navigation
3. You should see a table of orders from the API
4. Try the status filter dropdown
5. Click an order to see the detail modal

### Step 10: Run tests

```bash
cd frontend
npm test
```

### Step 11: Check the build

```bash
npm run build
```

Both should pass with no errors.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Total time from start to working feature | ___ min |
| Lines of code you wrote manually | ___ |
| Number of Agent Mode iterations | ___ |
| Did it follow existing patterns (Tailwind, React Query)? | Yes / Partially / No |
| Build passes? | Yes / No |
| Tests pass? | Yes / No |

---

## Key Takeaway

> **Agent Mode built an entire multi-file feature (components, routes, tests) from a single prompt.** When you needed changes, you described them in natural language and Copilot iterated — no manual coding required.

### What Made This Work

- **Prompt file** (`build-order-history.prompt.md`): Detailed requirements in a reusable file
- **Existing patterns**: Copilot learned the component structure from `Products.tsx`
- **Custom instructions** (`.github/instructions/frontend.instructions.md`): Frontend-specific rules (Tailwind, accessibility, React Query)
- **Iterative refinement**: Each follow-up prompt built on the previous context

---

## Bonus Challenge (Optional, 15 min)

Create your own prompt file for a new feature. Try:

1. Create `workshop/labs/lab-02-agent-mode/build-supplier-dashboard.prompt.md`
2. Describe a supplier analytics dashboard: supplier list, total products per supplier, average product price
3. Run it with Agent Mode
4. Compare the output quality with the Order History feature
