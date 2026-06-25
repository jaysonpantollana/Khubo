---
name: accesslint-audit
description: "Use when working with accesslint-audit"
---

---
name: accesslint-audit
description: "Find and fix WCAG 2.2 accessibility issues. Two modes â€” report (sweep a codebase or page, produce a prioritized written report, no edits) and fix (auditâ†’editâ†’verify loop on a target). Prefers direct-CDP live-DOM auditing; falls back to a browser-MCP composition or HTML-string audits."
risk: safe
source: "https://github.com/AccessLint/skills"
date_added: "2026-06-02"
---

You audit accessibility and optionally fix what's broken.

## When to Use
- Use this skill when the task matches this description: Find and fix WCAG 2.2 accessibility issues. Two modes â€” report (sweep a codebase or page, produce a prioritized written report, no edits) and fix (auditâ†’editâ†’verify loop on a target). Prefers direct-CDP live-DOM auditing; falls back to a browser-MCP composition or HTML-string audits.

## Pick a mode from the user's intent

- **Report mode** â€” "audit my codebase", "review src/components/", "what's wrong with this page?", "give me an a11y report". You audit + write a report. **You do not edit files.**
- **Fix mode** â€” "fix the a11y issues in X", "audit and fix", "make this accessible", "verify the contrast fix landed", or hands you a violation report and asks to apply it. You audit â†’ edit â†’ verify.

If unsure, ask. Don't default-to-fix when the user only asked for an audit.

For very large sweeps where main-thread context cost matters, you can be invoked via `Task` (general-purpose agent) for context isolation. The recipe is the same either way.

## Picking a flow

Three flows, in order of preference.

1. **`audit_live`** â€” try first for any URL. Connects to a running Chrome debug session, or auto-launches Chrome minimized â€” no user setup needed. Single call; IIFE bytes don't enter your context.
2. **`audit-live-page` prompt** â€” use when the user needs their **existing browser session** audited (authenticated app, specific state) and a browser MCP (chrome-devtools-mcp, playwright-mcp, puppeteer-mcp) is connected. Invoke via `Skill` with `mode: "fix"` or `mode: "plan"`.
3. **`audit_html`** â€” for raw HTML strings, files (`Read` first, then `audit_html`), or JSX you've rendered to a string. Pair with `audit_diff({ html })` for fix-mode verification.

For non-URL targets, skip straight to flow 3. For URLs, try flow 1; on auto-launch failure, try flow 2 if a browser MCP is connected; otherwise fall back to flow 3 with a note that live-DOM coverage is limited.

## Scope handling (report mode)

- **Directory path** â€” analyze all relevant files within.
- **Multiple files** â€” analyze the listed files plus imports they reach.
- **A URL** â€” audit it. If it's a dev-server URL, that's flow 1 or 2.
- **No arguments** â€” ask the user to narrow scope. Whole-codebase sweeps are rarely the right thing.

State the scope explicitly at the start of your report.

## Approach (report mode)

1. **Map the surface.** Glob/Grep to enumerate components, templates, styles. Sample representative files; don't open everything blindly.
2. **Audit live where possible** â€” the rendered DOM catches issues source can't show. Use the flow picker above.
3. **Look for patterns.** If one component fails a rule, similar components likely do too. Group by rule ID and component family â€” don't list 30 instances of the same issue 30 times.
4. **Prioritize by user impact.** Critical/serious first. Many low-impact violations of one rule are often a single root-cause fix.
5. **Use `format: "compact"` for sweep-time calls.** Reserve verbose output for rules you'll expand in the report.
6. **Trust `Source:` lines.** Live-DOM audits against React dev builds attach `Source: <file>:<line> (Symbol)` per violation via DevTools fibers. Use it as the file pointer instead of grepping selectors. Fall back to stable hooks â†’ visible text â†’ tree position when absent.
7. **Stop and ask if a single audit returns more than ~50 violations** â€” a 200-violation report isn't actionable.

The engine catches what's mechanically detectable. Manual judgment is needed for content clarity, screen-reader announcement quality, keyboard flow coherence, and complex visual contrast â€” flag those for human review, don't guess.

### Report format

```
# Accessibility audit â€” <scope>

## Summary
- N critical, M serious, K moderate, J minor (after deduplication)
- Most impactful patterns: <one-line each, max 3>

## Critical (blocks access)
For each pattern:
- **Pattern**: <one-line description>
- **WCAG**: <ID> â€” <name>
- **Affected files**: <file:line> (Ã—N if repeated)
- **Fix**: <directive from engine output, or specific code change>
- **Why critical**: <user impact>

## Serious
[same shape]

## Moderate / Minor
[Bullet list, deduplicated by rule. Skip per-instance detail unless the fix differs.]

## Recommendations
- Architectural / pattern-level changes that would prevent recurrence.
- Tooling or component abstractions worth introducing.
- What to verify manually (screen reader, keyboard, low-vision testing).

## Positive findings
What the codebase does well â€” short, factual, reinforces practices to keep.
```

Include rule IDs in every entry. Quote the `Fix:` directive verbatim for `mechanical` rules. For `visual` / `contextual`, leave a `TODO` with the rule ID; don't invent content.

## Recipe (fix mode)

1. **Baseline.** Audit with `name: "before"` and `format: "compact"`.
2. **Plan + apply.** For each violation:
   - `Source:` line present â†’ open that file at that line. If multiple are listed (separated by `â†`), the first is the JSX literal; the rest are enclosing components. Use `Symbol` to disambiguate.
   - No `Source:` â†’ grep stable hooks (`data-testid`, `id`, `aria-label`), then visible text, then tree position.
   - The violation's `Fixability:` and `Fix:` fields are authoritative â€” apply mechanical fixes verbatim, leave `TODO`s with the rule ID for `contextual` / `visual`. Never invent content.
   - Group same-file edits into one operation.
   - Confirm scope with the user before touching files outside the obvious target, or before more than ~10 mechanical fixes.
3. **Verify.** Run `audit_diff({ audit_name: "before" })` against the baseline (or re-baseline with a new name). Confirm `-fixed` covers your targets and `+new` is empty.

`Source:` lines come from React DevTools fibers and only appear in live-DOM audits against React dev builds. Static audits won't have them â€” fall back to selectors.

When unsure about a rule, call `explain_rule({ id: "<rule-id>" })` for guidance and `browserHint`.

## When to bail (fix mode)

- A violation has no `Fix:` directive â€” leave a `TODO`, don't guess.
- Verification fails (anything in `+new`, or a targeted rule missing from `-fixed`) â€” name it and stop. Do not iterate silently.

## Output (fix mode)

Per cycle: flow used, violations by impact, what was applied (file + rule), what was deferred (`TODO`s + reasons), final diff.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

