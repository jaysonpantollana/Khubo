# Agents

This file contains agent instructions for the project.

## Auto-Load Skills

At the start of EVERY task, automatically load these skills using the `skill` tool:

### Required Skills (load always)
1. `ponytail` - Core coding principles (YAGNI, reuse, stdlib-first)
2. `coding-standards` - Code quality rules
3. `security-review` - Security best practices

### Task-Specific Skills (load when relevant)
- **New features**: `tdd-workflow`, `api-design`, `frontend-patterns` or `backend-patterns`
- **Bug fixes**: `tdd-workflow`, `verification-loop`
- **Code review**: `ponytail-review`, `code-review`
- **Refactoring**: `ponytail-audit`, `refactor-clean`
- **Documentation**: `doc-updater`

### ECC Skills (load when working with ECC)
- `configure-ecc` - For ECC setup/installation
- `ecc-guide` - For ECC navigation
- `ecc-recipes` - For ECC workflow recipes

## Skill Loading Protocol

1. Always load `ponytail` first - it sets the coding philosophy
2. Load domain-specific skills based on the task
3. Use `skill({ name: "skill-name" })` to load each skill
4. Skills stay loaded for the session - no need to reload
