---
mode: 'agent'
description: 'Regenerate all project documentation from source code'
tools: ['codebase', 'editFiles', 'search', 'runCommands']
---

# Update All Documentation

Read the current source code and update ALL documentation files to match
the current state of the codebase.

## Files to Update

1. **docs/api-reference.md** — Regenerate from `api/src/routes/*.ts`
2. **docs/components.md** — Regenerate from `frontend/src/components/**/*.tsx`
3. **docs/architecture.md** — Update tech stack, structure, patterns
4. **docs/getting-started.md** — Update commands, versions, prerequisites

## Rules

- Read actual source files — never assume or guess
- Preserve existing content structure but update all details
- Add new sections for anything added since last update
- Remove sections for code that no longer exists
- Include accurate version numbers from package.json
- All curl examples must use real endpoints and realistic data
