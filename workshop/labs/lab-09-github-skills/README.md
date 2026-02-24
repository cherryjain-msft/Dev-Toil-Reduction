# Lab 09 — GitHub Copilot Skills: "Teach Copilot Your Patterns"

| | |
|---|---|
| **Toil** | Repeating the same entity/pattern scaffolding over and over |
| **Feature** | Copilot Skills (`.github/skills/`) |
| **Time** | 45–60 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | VS Code with Copilot Chat, app running locally |

## Toil Scorecard

| Metric | Without Copilot Skills | With Copilot Skills |
|--------|----------------------|---------------------|
| Time to scaffold a new entity | 1–2 hours | 5 min (skill invocation) |
| Pattern consistency | Varies (human memory) | 100% (codified in skill) |
| Onboarding new devs to patterns | Days of reading code | Invoke the skill |
| Files created manually | 7–8 per entity | 0 |

---

## What You'll Do

You will explore the existing `api-endpoint` skill, understand how skills work, and then **create a new skill** (`frontend-component`) that scaffolds React components following the project's exact patterns. You'll test both skills by invoking them.

---

## Part A — Explore the Existing Skill (10 min)

### Step 1: Open the api-endpoint skill

Open `.github/skills/api-endpoint/SKILL.md` and skim its structure.

**Key sections to note:**

| Section | What It Teaches Copilot |
|---------|------------------------|
| Architecture Overview | Layered pattern: Routes → Repository → DB |
| Step 1: Define the Model | TypeScript interface + Swagger JSDoc pattern |
| Step 2: Create the Repository | CRUD methods + factory/singleton pattern |
| Step 3: Create the Route | Express handlers + Swagger docs |
| Step 4: Register the Route | `index.ts` registration |
| Step 5–7: Migration, Seed, Tests | DB schema + data + test coverage |
| Naming Conventions | Table of PascalCase, camelCase, snake_case, kebab-case rules |
| Quick Reference Checklist | 8-item checklist ensuring nothing is missed |

### Step 2: Open the skill references

```
.github/skills/api-endpoint/
├── SKILL.md                              ← Main skill definition
└── references/
    ├── database-conventions.md           ← SQLite patterns
    ├── error-handling.md                 ← Custom error types
    ├── swagger-patterns.md              ← OpenAPI documentation
    └── testing-patterns.md              ← Vitest mock patterns
```

These reference files give Copilot **deep context** about specific aspects of the pattern.

### Step 3: Invoke the existing skill

In Copilot Chat (any mode), type:

```
Using the api-endpoint skill, create a new "Category" entity with fields:
- categoryId (integer, PK)
- name (string, required)
- description (string, optional)
- active (boolean, default true)

Generate all files including model, repository, routes, migration, seed data, and tests.
```

Watch Copilot generate 7+ files following the exact patterns defined in the skill.

---

## Part B — Create a Frontend Component Skill (20 min)

### Step 4: Create the skill directory

```
.github/skills/frontend-component/
├── SKILL.md
└── references/
    └── component-patterns.md
```

### Step 5: Create the main SKILL.md

Create `.github/skills/frontend-component/SKILL.md`:

```markdown
---
name: frontend-component
description: Generate React components for the OctoCAT Supply Chain frontend following established patterns. Use this skill when creating new entity pages, form components, or data display components. Triggers on requests to add frontend features, create pages, or implement UI components.
---

# Frontend Component Development

This skill guides the creation of React components following the OctoCAT Supply Chain application's established patterns.

## Architecture Overview

```
Pages (Routes)
  └── Entity Components (data display + interaction)
       └── Context Providers (state management)
            └── API Calls (axios + react-query)
```

## When to Use This Skill

- Creating a new entity page (list + detail view)
- Adding a data table/grid component
- Creating form components (create/edit)
- Adding modal dialogs for entity details
- Implementing search/filter functionality

## Workflow

### Step 1: Create the Entity Page Component

Create `frontend/src/components/entity/{entityName}/{EntityName}s.tsx`

**Pattern (based on Products.tsx):**

```tsx
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface EntityName {
  entityNameId: number;
  name: string;
  // ... fields matching API model
}

const EntityNames = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<EntityName | null>(null);

  const { data: entities, isLoading, error } = useQuery<EntityName[]>(
    'entityNames',
    async () => {
      const response = await axios.get('http://localhost:3000/api/entity-names');
      return response.data;
    }
  );

  const filteredEntities = entities?.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 dark:text-red-400">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Entity Names
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 
                     dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Data Grid/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntities.map((entity) => (
          <div
            key={entity.entityNameId}
            onClick={() => setSelectedEntity(entity)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 
                       cursor-pointer hover:shadow-lg transition-shadow
                       border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {entity.name}
            </h3>
            {/* ... entity fields */}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedEntity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
             onClick={() => setSelectedEntity(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-lg w-full mx-4"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {selectedEntity.name}
            </h2>
            {/* ... detail fields */}
            <button
              onClick={() => setSelectedEntity(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityNames;
```

### Step 2: Create the Form Component (Optional)

Create `frontend/src/components/entity/{entityName}/{EntityName}Form.tsx`

**Pattern (based on ProductForm.tsx):**
- Controlled form with useState for each field
- Submit handler using axios POST/PUT
- Field validation before submit
- Tailwind-styled form inputs
- Dark mode support
- Loading/error states

### Step 3: Create Unit Tests

Create `frontend/src/components/entity/{entityName}/{EntityName}s.test.tsx`

**Pattern:**

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import EntityNames from './EntityNames';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('EntityNames', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    renderWithProviders(<EntityNames />);
    expect(screen.getByRole('status') || document.querySelector('.animate-spin')).toBeTruthy();
  });

  it('should render entity list', async () => {
    const axios = (await import('axios')).default;
    (axios.get as any).mockResolvedValueOnce({
      data: [
        { entityNameId: 1, name: 'Test Entity 1' },
        { entityNameId: 2, name: 'Test Entity 2' },
      ],
    });
    renderWithProviders(<EntityNames />);
    await waitFor(() => {
      expect(screen.getByText('Test Entity 1')).toBeTruthy();
      expect(screen.getByText('Test Entity 2')).toBeTruthy();
    });
  });

  it('should filter entities by search term', async () => {
    // ... search test
  });
});
```

### Step 4: Add Route

In `frontend/src/App.tsx`, add:

```tsx
import EntityNames from './components/entity/{entityName}/EntityNames';
// In the Routes:
<Route path="/{entity-names}" element={<EntityNames />} />
```

### Step 5: Add Navigation Link

In `frontend/src/components/Navigation.tsx`, add a link to the nav bar following existing patterns.

## Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Component file | PascalCase | `Suppliers.tsx` |
| Component folder | camelCase | `entity/supplier/` |
| Route path | kebab-case | `/suppliers` |
| API endpoint | kebab-case | `http://localhost:3000/api/suppliers` |
| Test file | PascalCase + .test | `Suppliers.test.tsx` |
| React Query key | camelCase | `'suppliers'` |

## Styling Rules

- Use **Tailwind CSS only** — no custom CSS files
- Support dark mode with `dark:` prefix on all color classes
- Use `container mx-auto px-4` for page layouts
- Use responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Loading spinner: `animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500`

## Quick Reference Checklist

When creating a new frontend component, ensure you complete ALL steps:

- [ ] **Page component** (`frontend/src/components/entity/{entity}/{Entity}s.tsx`) — List view with search, cards/table, detail modal
- [ ] **Form component** (`frontend/src/components/entity/{entity}/{Entity}Form.tsx`) — Create/edit form (if needed)
- [ ] **Unit tests** (`frontend/src/components/entity/{entity}/{Entity}s.test.tsx`) — Render, loading, data, search tests
- [ ] **Route** (`frontend/src/App.tsx`) — Add React Router path
- [ ] **Navigation** (`frontend/src/components/Navigation.tsx`) — Add nav link
```

### Step 6: Create the references file

Create `.github/skills/frontend-component/references/component-patterns.md`:

```markdown
# Component Patterns Reference

## Data Fetching

Always use react-query for API data:

```tsx
const { data, isLoading, error } = useQuery<Type[]>('key', async () => {
  const response = await axios.get('http://localhost:3000/api/endpoint');
  return response.data;
});
```

## Dark Mode Classes

Every color class needs a dark mode variant:

| Light | Dark |
|-------|------|
| `text-gray-800` | `dark:text-gray-100` |
| `bg-white` | `dark:bg-gray-800` |
| `border-gray-200` | `dark:border-gray-700` |
| `bg-gray-100` | `dark:bg-gray-900` |
| `text-gray-600` | `dark:text-gray-400` |

## Common Tailwind Patterns

**Card:**
```
bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700
```

**Button (primary):**
```
px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors
```

**Input:**
```
w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
```

**Table row:**
```
border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700
```

## Contexts Available

- `useAuth()` from `context/AuthContext` — current user, login/logout
- `useTheme()` from `context/ThemeContext` — dark/light mode toggle
- `useCart()` from `context/CartContext` — cart operations
```

---

## Part C — Test the New Skill (15 min)

### Step 7: Invoke the frontend-component skill

In Copilot Chat, type:

```
Using the frontend-component skill, create a "Suppliers" page with:
- Fetch suppliers from GET /api/suppliers
- Display as cards with: name, contact info, active/verified status badges
- Search bar to filter by name
- Click a supplier card to show detail modal with all fields
- Include unit tests
- Add route and navigation link
```

### Step 8: Review the generated component

Verify:
- ✅ Component follows `Products.tsx` pattern
- ✅ Uses `react-query` for data fetching
- ✅ Tailwind-only styling
- ✅ Dark mode support
- ✅ Search/filter works
- ✅ Tests created

### Step 9: Run and verify

```bash
cd frontend
npm run build
npm test
```

Open `http://localhost:5173/suppliers` — the page should render.

---

## Part D — Compare Skills vs. No Skills (10 min)

### Step 10: Generate without the skill

Open a **new chat session** and type:

```
Create a "Shipments" page component for the frontend that shows a list 
of shipments from an API. Add search and a detail modal.
```

(Don't reference the skill.)

### Step 11: Compare

| Aspect | With Skill | Without Skill |
|--------|-----------|---------------|
| File location? | Correct (`entity/shipment/`) | May vary |
| Dark mode? | ✅ All classes have `dark:` variant | Often missed |
| React Query? | ✅ Always used | May use `useEffect` + `useState` |
| Test structure? | ✅ Follows project patterns | Generic patterns |
| Route added? | ✅ In App.tsx | May forget |
| Nav link added? | ✅ In Navigation.tsx | May forget |

> The skill ensures **100% pattern consistency** every time.

---

## Scorecard — Fill This In

| Metric | Your Result |
|--------|-------------|
| Existing skill explored? | Yes / No |
| New skill created (frontend-component)? | Yes / No |
| Skill invocation generated correct files? | Yes / Partially / No |
| Pattern consistency (dark mode, react-query, etc.) | All / Most / Some |
| Time to scaffold with skill | ___ min |
| Time to scaffold without skill | ___ min |

---

## Key Takeaway

> **Skills are reusable pattern blueprints.** Instead of hoping Copilot infers your patterns, you teach them explicitly. Every invocation produces consistent, project-aligned code. Create skills for any repeating pattern: API endpoints, React components, database entities, test files.

### What Made This Work

- **Existing skill** (`api-endpoint`): Proven pattern with 4 reference files
- **New skill** (`frontend-component`): Component template + Tailwind patterns + test patterns
- **Reference files**: Deep context for specific aspects (DB conventions, error handling, component patterns)
- **Naming conventions**: Explicit table mapping PascalCase → camelCase → snake_case → kebab-case
- **Checklist**: Skills include an "ALL steps" checklist so nothing is missed
