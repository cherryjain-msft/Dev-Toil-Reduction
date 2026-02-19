---
mode: 'agent'
description: 'Lab 02: Build a complete Order History page with Agent Mode'
tools: ['changes', 'codebase', 'editFiles', 'fetch', 'findTestFiles', 'githubRepo', 'openSimpleBrowser', 'problems', 'runCommands', 'runTasks', 'search', 'terminalLastCommand', 'testFailure', 'usages']
---

# Build Order History Page

## Context

You are working with the OctoCAT Supply Chain Management System — a TypeScript monorepo with a React 18 + Vite + Tailwind frontend and an Express.js + SQLite API.

The API already has these endpoints:
- `GET /api/orders` — returns all orders
- `GET /api/orders/:id` — returns order by ID
- `GET /api/order-details` — returns all order details (line items)

The frontend already has a working Products page at `frontend/src/components/entity/product/Products.tsx` — **use it as the pattern reference** for styling, layout, and React Query usage.

## Task

Build a complete **Order History** page with the following:

### 1. OrderHistory Component (`frontend/src/components/entity/orders/OrderHistory.tsx`)

- Fetch orders from `GET /api/orders` using `react-query`
- Display in a Tailwind-styled table: Order ID, Branch ID, Order Date, Status, Total Amount
- Include loading spinner and error state (follow `Products.tsx` patterns)
- Support both dark and light themes (use existing Tailwind dark: classes)
- Add a search/filter bar at the top (same style as Products page)

### 2. OrderDetail Modal (`frontend/src/components/entity/orders/OrderDetail.tsx`)

- Click any order row to open a detail modal
- Fetch order details from `GET /api/order-details` filtered by order ID
- Show line items: Product ID, Quantity, Unit Price, Subtotal
- Modal styling should match the existing product modal pattern

### 3. Routing & Navigation

- Add route `/orders` in `frontend/src/App.tsx` (follow existing route patterns)
- Add "Orders" link in `frontend/src/components/Navigation.tsx` (follow existing nav link patterns)

### 4. Unit Tests (`frontend/src/components/entity/orders/OrderHistory.test.tsx`)

- Test that the component renders with mock data
- Test loading state
- Test empty state
- Use `@testing-library/react` and `vitest` (follow existing test patterns in the project)

## Requirements

- Use `axios` for API calls (already installed)
- Use `react-query` for data fetching (already installed)
- Use Tailwind CSS for all styling — NO custom CSS
- Support dark mode using `dark:` classes
- Follow the component patterns in `Products.tsx`
- Make the page responsive

## Verification

After implementation:
1. Run `cd frontend && npm run build` — must pass
2. Run `cd frontend && npm test` — must pass
3. Open `http://localhost:5173/orders` — page should display orders
