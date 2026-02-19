# Lab 09 — Debugging: "Root Cause in 60 Seconds"

| | |
|---|---|
| **Toil** | Debugging failures and finding root causes manually |
| **Feature** | Agent Mode + Self-Healing DevOps + Debug Agent |
| **Time** | 45–60 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | VS Code with Copilot Agent Mode, app running locally |

## Toil Scorecard

| Metric | Without Copilot | With Copilot |
|--------|----------------|--------------|
| Time to root cause | 30–120 min | 2–5 min |
| Stack Overflow searches | 3–10 | 0 |
| Log files manually read | 5+ | 0 |
| Time to fix after diagnosis | 15–60 min | 2–5 min |

---

## What You'll Do

You will **intentionally break the app** in 3 different ways, then use a **Debug Agent**, Agent Mode, and the self-healing DevOps workflow to diagnose and fix each issue — comparing AI debugging against manual approaches.

---

## Part A — Create a Debug Agent (5 min)

### Step 1: Create the debug specialist agent

Create `.github/agents/debug-specialist.agent.md`:

```markdown
---
name: 'Debug Specialist'
description: 'Diagnoses and fixes bugs, test failures, build errors, and runtime issues. Use when something is broken and you need root cause analysis.'
tools: ['codebase', 'editFiles', 'runCommands', 'problems', 'search', 'terminalLastCommand', 'testFailure', 'findTestFiles', 'runTests']
---

# Debug Specialist Agent

You are a debugging expert for the OctoCAT Supply Chain Management System.

## Debugging Process

When presented with an error, failure, or unexpected behavior:

### Step 1: Reproduce
- Run the failing command or test to see the exact error
- Capture the full error message and stack trace

### Step 2: Diagnose
- Read the file(s) mentioned in the error
- Identify the root cause (not just the symptom)
- Check for common patterns:
  - Import errors → missing import or wrong path
  - Type errors → missing interface field or wrong type
  - Runtime errors → null/undefined access, async issues
  - Test failures → assertion mismatch, setup issue, stale mock
  - Build errors → TypeScript config, missing declaration

### Step 3: Fix
- Apply the minimal fix that resolves the root cause
- Don't change unrelated code
- Explain what caused the issue and why the fix works

### Step 4: Verify
- Re-run the failing command to confirm the fix
- Run the full test suite to ensure no regressions

## Output Format

```
🐛 DEBUG REPORT

❌ Error: {exact error message}
📍 Location: {file:line}
🔍 Root Cause: {explanation}
🔧 Fix: {what was changed and why}
✅ Verification: {command run + result}
```

## Project-Specific Knowledge

- **API tests**: `cd api && npm test` (Vitest)
- **Frontend tests**: `cd frontend && npm test` (Vitest + RTL)
- **E2E tests**: `cd frontend && npm run test:e2e` (Playwright)
- **Build**: `cd api && npm run build` / `cd frontend && npm run build`
- **Common issues**:
  - SQLite errors → check migrations ran (`npm run db:seed:dev`)
  - Port already in use → kill process on port 3000 or 5173
  - Import errors → check `tsconfig.json` paths
  - Test timeout → async operation not awaited
```

---

## Part B — Bug #1: Runtime Error (15 min)

### Step 2: Inject a subtle bug

Open `api/src/repositories/productsRepo.ts` and find the `findAll` method. Change the SQL query to reference a non-existent column:

```typescript
// Change this line:
const rows = await this.db.all<DatabaseRow>('SELECT * FROM products ORDER BY product_id');

// To this (note: "product_name" doesn't exist — the column is "name"):
const rows = await this.db.all<DatabaseRow>('SELECT * FROM products ORDER BY product_name');
```

### Step 3: Trigger the error

```bash
cd api
npm run dev
```

Then in another terminal:

```bash
curl http://localhost:3000/api/products
```

You'll get a 500 error.

### Step 4: Ask the Debug Agent to fix it

In Agent Mode chat, type:

```
@debug-specialist The API endpoint GET /api/products is returning a 500 error. 
Run the API, hit the endpoint, and diagnose the issue.
```

Watch the agent:
1. Start the API
2. Make the request
3. Read the error message
4. Open the repository file
5. Identify the wrong column name
6. Fix it
7. Verify it works

### Step 5: Undo the fix (reset for next bug)

Revert `productsRepo.ts` to the original:

```bash
git checkout api/src/repositories/productsRepo.ts
```

---

## Part C — Bug #2: Test Failure (15 min)

### Step 6: Break a test

Open `frontend/src/components/entity/cart/Cart.test.tsx` and find a quantity-related test. Add a line that changes expected behavior:

Add this line at the top of the file, after the imports:

```typescript
// Simulate a bug: override the discount calculation
vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: () => ({
      ...(actual as any).useCart(),
      getCartTotal: () => -999, // Bug: returns negative total
    }),
  };
});
```

### Step 7: Run tests and see the failure

```bash
cd frontend
npm test
```

Some cart tests will fail.

### Step 8: Ask the Debug Agent

```
@debug-specialist The frontend cart tests are failing. Run `cd frontend && npm test` 
and diagnose why. Don't just look — actually run the tests and read the output.
```

The agent should:
1. Run the test suite
2. Read the failure output
3. Find the mock override
4. Explain the root cause
5. Suggest removing the rogue mock

### Step 9: Reset

```bash
git checkout frontend/src/components/entity/cart/Cart.test.tsx
```

---

## Part D — Bug #3: Build Error (10 min)

### Step 10: Break the TypeScript build

Open `api/src/models/product.ts` and add an invalid field:

```typescript
export interface Product {
  productId: number;
  supplierId: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  unit: string;
  imgName: string;
  discount?: number;
  invalidField: UndefinedType; // Bug: reference non-existent type
}
```

### Step 11: Try to build

```bash
cd api
npm run build
```

You'll get a TypeScript compilation error.

### Step 12: Ask Agent Mode to fix it

In Agent Mode (don't even need the debug agent), type:

```
The API build is failing. Check for errors and fix them.
```

Agent Mode will:
1. Run the build
2. Read the error
3. Remove the invalid field
4. Re-run the build to verify

### Step 13: Reset

```bash
git checkout api/src/models/product.ts
```

---

## Part E — Self-Healing DevOps (10 min)

### Step 14: Explore the self-healing workflow

Open `.github/workflows/auto-analyze-failures.yml`. This workflow:

1. **Triggers** when any other workflow fails
2. **Analyzes** the failure using AI (`actions/ai-inference`)
3. **Creates** a GitHub issue with the diagnosis
4. **Assigns** the fix to Copilot Coding Agent (for code/test failures)

### Step 15: Understand the flow

```
Workflow Fails → auto-analyze-failures triggers
    → AI reads failure logs
    → Categorizes: code | test | config | infra | transient
    → Creates remediation issue
    → If code/test: assigns to Copilot Coding Agent
    → Coding Agent fixes and opens PR
    → Full loop: fail → diagnose → fix → PR — no human required
```

### Step 16: Discuss with your facilitator

This is the "holy grail" of developer toil reduction:
- **Build breaks at 2 AM** → Auto-diagnosed, auto-fixed, PR waiting for review by morning
- **Flaky test detected** → Categorized as "transient", no issue created
- **Config error** → Issue created with exact fix steps

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Bugs injected | 3 |
| Bugs diagnosed by Debug Agent | ___ / 3 |
| Time to root cause (average) | ___ min |
| Did the agent run commands to verify? | Yes / No |
| Self-healing workflow understood? | Yes / No |

---

## Key Takeaway

> **Debugging goes from an art to a conversation.** Instead of reading logs, searching Stack Overflow, and forming hypotheses manually, you describe the symptom and the Debug Agent runs commands, reads errors, and applies fixes. The self-healing DevOps workflow takes it further — failures are auto-diagnosed and auto-fixed without any human involvement.

### What Made This Work

- **Custom agent** (`debug-specialist.agent.md`): Structured debugging methodology with tool access
- **Tool access**: Agent can run commands (`runCommands`), read errors (`problems`), and edit files (`editFiles`)
- **Self-healing workflow** (`auto-analyze-failures.yml`): AI inference + Coding Agent for autonomous fix
- **Project context**: Agent knows the test commands, build tools, and common issues
