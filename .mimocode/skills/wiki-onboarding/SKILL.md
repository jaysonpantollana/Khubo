---
name: wiki-onboarding
description: "Use when working with wiki-onboarding"
---

---
name: wiki-onboarding
description: "Generate two complementary onboarding documents that together give any engineer â€” from newcomer to principal â€” a complete understanding of a codebase. Use when user asks for onboarding docs or getting-started guides, user runs /deep-wiki, or user wants to help new team members understand a codebase."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Wiki Onboarding Guide Generator

Generate two complementary onboarding documents that together give any engineer â€” from newcomer to principal â€” a complete understanding of a codebase.

## When to Use
- User asks for onboarding docs or getting-started guides
- User runs `/deep-wiki:onboard` command
- User wants to help new team members understand a codebase

## Language Detection

Scan the repository for build files to determine the primary language for code examples:
- `package.json` / `tsconfig.json` â†’ TypeScript/JavaScript
- `*.csproj` / `*.sln` â†’ C# / .NET
- `Cargo.toml` â†’ Rust
- `pyproject.toml` / `setup.py` / `requirements.txt` â†’ Python
- `go.mod` â†’ Go
- `pom.xml` / `build.gradle` â†’ Java

## Guide 1: Principal-Level Onboarding

**Audience**: Senior/staff+ engineers who need the "why" behind decisions.

### Required Sections

1. **System Philosophy & Design Principles** â€” What invariants does the system maintain? What were the key design choices and why?
2. **Architecture Overview** â€” Component map with Mermaid diagram. What owns what, communication patterns.
3. **Key Abstractions & Interfaces** â€” The load-bearing abstractions everything depends on
4. **Decision Log** â€” Major architectural decisions with context, alternatives considered, trade-offs
5. **Dependency Rationale** â€” Why each major dependency was chosen, what it replaced
6. **Data Flow & State** â€” How data moves through the system (traced from actual code, not guessed)
7. **Failure Modes & Error Handling** â€” What breaks, how errors propagate, recovery patterns
8. **Performance Characteristics** â€” Bottlenecks, scaling limits, hot paths
9. **Security Model** â€” Auth, authorization, trust boundaries, data sensitivity
10. **Testing Strategy** â€” What's tested, what isn't, testing philosophy
11. **Operational Concerns** â€” Deployment, monitoring, feature flags, configuration
12. **Known Technical Debt** â€” Honest assessment of shortcuts and their risks

### Rules
- Every claim backed by `(file_path:line_number)` citation
- Minimum 3 Mermaid diagrams (architecture, data flow, dependency graph)
- All Mermaid diagrams use dark-mode colors (see wiki-vitepress skill)
- Focus on WHY decisions were made, not just WHAT exists

## Guide 2: Zero-to-Hero Contributor Guide

**Audience**: New contributors who need step-by-step practical guidance.

### Required Sections

1. **What This Project Does** â€” 2-3 sentence elevator pitch
2. **Prerequisites** â€” Tools, versions, accounts needed
3. **Environment Setup** â€” Step-by-step with exact commands, expected output at each step
4. **Project Structure** â€” Annotated directory tree (what lives where and why)
5. **Your First Task** â€” End-to-end walkthrough of adding a simple feature
6. **Development Workflow** â€” Branch strategy, commit conventions, PR process
7. **Running Tests** â€” How to run tests, what to test, how to add a test
8. **Debugging Guide** â€” Common issues and how to diagnose them
9. **Key Concepts** â€” Domain-specific terminology explained with code examples
10. **Code Patterns** â€” "If you want to add X, follow this pattern" templates
11. **Common Pitfalls** â€” Mistakes every new contributor makes and how to avoid them
12. **Where to Get Help** â€” Communication channels, documentation, key contacts
13. **Glossary** â€” Terms used in the codebase that aren't obvious
14. **Quick Reference Card** â€” Cheat sheet of most-used commands and patterns

### Rules
- All code examples in the detected primary language
- Every command must be copy-pasteable
- Include expected output for verification steps
- Use Mermaid for workflow diagrams (dark-mode colors)
- Ground all claims in actual code â€” cite `(file_path:line_number)`

### When to Use
This skill is applicable to execute the workflow or actions described in the overview.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

