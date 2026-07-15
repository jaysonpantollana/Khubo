# Agent Name Convention (CRITICAL)

## Rule: Always Use Bare Agent Names

In this OpenCode project, **always use bare agent names** without any prefix.

### Correct (use these):
- `e2e-runner`
- `code-reviewer`
- `security-reviewer`
- `tdd-guide`
- `build-error-resolver`
- `planner`
- `architect`
- `doc-updater`
- `refactor-cleaner`
- `go-reviewer`
- `go-build-resolver`
- `database-reviewer`
- `python-reviewer`
- `build`

### WRONG (never use these):
- `everything-claude-code:e2e-runner`
- `everything-claude-code:code-reviewer`
- `everything-claude-code:security-reviewer`
- Any form with `plugin-name:` prefix

## Why

The `everything-claude-code:` prefix is a Claude Code plugin namespace that does NOT exist in OpenCode. Using it will cause "Agent not found" errors.

## Where This Applies

1. **When spawning subagents**: Use bare names like `task({ description: "...", subagent_type: "code-reviewer" })`
2. **When referencing agents in commands**: The `agent:` field in command files uses bare names
3. **When generating orchestrate commands**: Use `/orchestrate` not `/everything-claude-code:orchestrate`
4. **In all tool calls and prompts**: Never prefix agent names with `everything-claude-code:`

## Agent Catalogue

| Bare Name | Purpose |
|-----------|---------|
| `build` | Primary coding agent |
| `planner` | Implementation planning |
| `architect` | System design |
| `tdd-guide` | Test-driven development |
| `code-reviewer` | Code review |
| `security-reviewer` | Security audit |
| `build-error-resolver` | Fix build errors |
| `e2e-runner` | E2E testing |
| `refactor-cleaner` | Dead code cleanup |
| `doc-updater` | Documentation |
| `go-reviewer` | Go code review |
| `go-build-resolver` | Go build errors |
| `database-reviewer` | Database optimization |
| `python-reviewer` | Python code review |
| `harness-optimizer` | Agent harness config |
| `loop-operator` | Autonomous loops |
| `docs-lookup` | Library API lookups |
| `cpp-reviewer` | C++ code review |
| `cpp-build-resolver` | C++ build errors |
| `java-reviewer` | Java code review |
| `java-build-resolver` | Java build errors |
| `kotlin-reviewer` | Kotlin code review |
| `kotlin-build-resolver` | Kotlin build errors |
| `rust-reviewer` | Rust code review |
| `rust-build-resolver` | Rust build errors |
| `php-reviewer` | PHP code review |
