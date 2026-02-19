---
mode: 'agent'
description: 'Exercise 1-B: Build a Supplier Dashboard with Agent Mode'
tools: ['changes', 'codebase', 'editFiles', 'fetch', 'findTestFiles', 'githubRepo', 'openSimpleBrowser', 'problems', 'runCommands', 'runTasks', 'search', 'terminalLastCommand', 'testFailure', 'usages']
---

# Build Supplier Dashboard

## Context

You are working with the OctoCAT Supply Chain Management System — a TypeScript monorepo with a React 18 + Vite + Tailwind frontend and an Express.js + SQLite API.

The API already has these endpoints:
- `GET /api/suppliers` — returns all suppliers (includes `name`, `contactEmail`, `phone`, `address`, `isActive`, `isVerified`, `status`)
- `GET /api/suppliers/:id` — returns supplier by ID
- `GET /api/products` — returns all products (each has `supplierId`)
- `GET /api/products/supplier/:supplierId` — returns products for a specific supplier

The frontend has a working Products page at `frontend/src/components/entity/product/Products.tsx` — **use it as the pattern reference** for styling, layout, React Query usage, and dark mode support.

## Task

Build a complete **Supplier Dashboard** with the following components:

### 1. SupplierDashboard Page (`frontend/src/components/entity/supplier/SupplierDashboard.tsx`)

- Fetch all suppliers from `GET /api/suppliers` using `react-query`
- Display summary stats at the top:
  - Total suppliers count
  - Active suppliers count (where `isActive === true`)
  - Verified suppliers count (where `isVerified === true`)
- Display suppliers as **cards** in a responsive grid (not a table)
- Include a search bar to filter suppliers by name (same style as Products page)
- Include a status filter dropdown: "All", "Active", "Inactive"
- Support dark and light themes (use existing Tailwind `dark:` classes)
- Loading spinner and error state (follow `Products.tsx` patterns)

### 2. SupplierCard Component (`frontend/src/components/entity/supplier/SupplierCard.tsx`)

- Card layout with supplier name as heading
- Status badges: green "Active" / red "Inactive" badge, blue "Verified" / gray "Unverified" badge
- Show contact email and phone
- Show address (truncated if long)
- Click handler that calls a callback prop (for future detail modal)
- Tailwind styling with hover effect and shadow
- Dark mode support

### 3. Routing & Navigation

- Add route `/suppliers` in `frontend/src/App.tsx` (follow existing route patterns)
- Add "Suppliers" link in `frontend/src/components/Navigation.tsx` (follow existing nav link patterns)

### 4. Unit Tests (`frontend/src/components/entity/supplier/SupplierDashboard.test.tsx`)

- Test that the dashboard renders with mock supplier data
- Test the loading state
- Test the search filter functionality
- Test the status filter
- Use `@testing-library/react` and `vitest` (follow existing test patterns)

## Requirements

- Use `axios` for API calls (already installed)
- Use `react-query` for data fetching (already installed)
- Use Tailwind CSS for all styling — NO custom CSS files
- Support dark mode using `dark:` classes throughout
- Follow the component patterns in `Products.tsx`
- Components must be under 150 lines each (split if larger)
- Make the page responsive (grid columns adjust on mobile/tablet/desktop)
- All interactive elements must have proper `aria-label` attributes

## Verification

After implementation:
1. Run `cd frontend && npm run build` — must pass with no errors
2. Run `cd frontend && npm test` — must pass
3. Open `http://localhost:5173/suppliers` — dashboard should display supplier cards
4. Test the search bar and status filter
