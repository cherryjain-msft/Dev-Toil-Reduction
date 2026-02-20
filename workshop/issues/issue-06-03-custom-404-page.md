---
title: "Add a custom 404 \"Lost Cat\" page"
labels: ["enhancement", "frontend", "copilot-coding-agent"]
assignees: ["copilot"]
---

## Summary

Add a fun, on-brand 404 page so users who navigate to an invalid route see a friendly "Lost Cat" message instead of a blank screen.

## Implementation

- Create `frontend/src/components/NotFound.tsx`
- Add a catch-all `<Route path="*">` in `frontend/src/App.tsx`
- Follow existing component patterns (Tailwind CSS, dark mode support via `useTheme`)

## Design Requirements

- Large centered "404" heading
- Fun subheading like "This cat wandered off..." or "Looks like this page used all 9 lives"
- A cat-themed emoji or ASCII art (🐱 or text art)
- A "Back to Home" button linking to `/`
- Must support dark mode (`dark:` Tailwind classes)
- Responsive layout (looks good on mobile and desktop)

## Acceptance Criteria

- [ ] Navigating to `/some-random-path` shows the 404 page
- [ ] "Back to Home" button navigates to `/`
- [ ] Dark mode works correctly
- [ ] Matches the app's visual style (Tailwind, same color palette)
- [ ] `npm run build` succeeds with no errors
