---
name: domain-modeling
description: "Use when working with domain-modeling"
---

---
name: domain-modeling
description: Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, or when another skill needs to maintain the domain model.
category: "architecture"
risk: "safe"
source: "community"
source_repo: "mattpocock/skills"
source_type: "community"
date_added: "2026-06-19"
author: "Matt Pocock"
license: "MIT"
license_source: "https://github.com/mattpocock/skills/blob/main/LICENSE"
tags:
  - architecture
  - workflow
  - coding-agents
tools:
  - claude-code
  - codex-cli
  - cursor
---

# Domain Modeling

## When to Use

Use when this workflow matches the user request: Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, or when another skill needs to maintain the domain model.


_Source: [mattpocock/skills](https://github.com/mattpocock/skills) (MIT)._

Actively build and sharpen the project's domain model as you design. This is the *active* discipline â€” challenging terms, inventing edge-case scenarios, and writing the glossary and decisions down the moment they crystallise. (Merely *reading* `CONTEXT.md` for vocabulary is not this skill â€” that's a one-line habit any skill can do. This skill is for when you're changing the model, not just consuming it.)

## File structure

Most repos have a single context:

```
/
â”œâ”€â”€ CONTEXT.md
â”œâ”€â”€ docs/
â”‚   â””â”€â”€ adr/
â”‚       â”œâ”€â”€ 0001-event-sourced-orders.md
â”‚       â””â”€â”€ 0002-postgres-for-write-model.md
â””â”€â”€ src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
â”œâ”€â”€ CONTEXT-MAP.md
â”œâ”€â”€ docs/
â”‚   â””â”€â”€ adr/                          â† system-wide decisions
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ ordering/
â”‚   â”‚   â”œâ”€â”€ CONTEXT.md
â”‚   â”‚   â””â”€â”€ docs/adr/                 â† context-specific decisions
â”‚   â””â”€â”€ billing/
â”‚       â”œâ”€â”€ CONTEXT.md
â”‚       â””â”€â”€ docs/adr/
```

Create files lazily â€” only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y â€” which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' â€” do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible â€” which is right?"

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch these up â€” capture them as they happen. Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

`CONTEXT.md` should be totally devoid of implementation details. Do not treat `CONTEXT.md` as a spec, a scratch pad, or a repository for implementation decisions. It is a glossary and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** â€” the cost of changing your mind later is meaningful
2. **Surprising without context** â€” a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** â€” there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).


## Limitations

- Requires the upstream tool, account, API key, or local setup when the workflow names one.
- Does not authorize destructive, production, paid, or external-message actions without explicit user approval.
- Validate generated artifacts or recommendations against the user's real sources before treating them as final.

