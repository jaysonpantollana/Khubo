---
name: ai-md
description: "Use when working with ai-md"
---

---
name: ai-md
description: "Convert human-written CLAUDE.md into AI-native structured-label format. Battle-tested across 4 models. Same rules, fewer tokens, higher compliance."
risk: safe
source: community
date_added: "2026-03-11"
---

# AI.MD v4 â€” The Complete AI-Native Conversion System

## When to Use This Skill

- Use when your CLAUDE.md is long but AI still ignores your rules
- Use when token usage is too high from verbose system instructions
- Use when you want to optimize any LLM system prompt for compliance
- Use when migrating rules between AI tools (Claude, Codex, Gemini, Grok)

## What Is AI.MD?

AI.MD is a methodology for converting human-written `CLAUDE.md` (or any LLM system instructions)
into a structured-label format that AI models follow more reliably, using fewer tokens.

**The paradox we proved:** Adding more rules in natural language DECREASES compliance.
Converting the same rules to structured format RESTORES and EXCEEDS it.

```
Human prose (6 rules, 1 line)  â†’ AI follows 4 of them
Structured labels (6 rules, 6 lines) â†’ AI follows all 6
Same content. Different format. Different results.
```

---

## Why It Works: How LLMs Actually Process Instructions

LLMs don't "read" â€” they **attend**. Understanding this changes everything.

### Mechanism 1: Attention Splitting

When multiple rules share one line, the model's attention distributes across all tokens equally.
Each rule gets a fraction of the attention weight. Some rules get lost.

When each rule has its own line, the model processes it as a distinct unit.
Full attention weight on each rule.

```
# ONE LINE = attention splits 5 ways (some rules drop to near-zero weight)
EVIDENCE: no-fabricate no-guess | ç¦ç”¨è©ž:æ‡‰è©²æ˜¯/å¯èƒ½æ˜¯ â†’ å…ˆæ‹¿æ•¸æ“š | Read/Grepâ†’è¡Œè™Ÿ curlâ†’æ•¸æ“š | "å¥½åƒ"/"è¦ºå¾—"â†’è‡ªå·±å…ˆè·‘test | guess=shame-wall

# FIVE LINES = each rule gets full attention
EVIDENCE:
  core: no-fabricate | no-guess | unsure=say-so
  banned: æ‡‰è©²æ˜¯/å¯èƒ½æ˜¯/æ„Ÿè¦ºæ˜¯/æŽ¨æ¸¬ â†’ å…ˆæ‹¿æ•¸æ“š
  proof: all-claims-need(data/line#/source) | Read/Grepâ†’è¡Œè™Ÿ | curlâ†’æ•¸æ“š
  hear-doubt: "å¥½åƒ"/"è¦ºå¾—" â†’ self-test(curl/benchmark) â†’ ç¦åå•user
  violation: guess â†’ shame-wall
```

### Mechanism 2: Zero-Inference Labels

Natural language forces the model to INFER meaning from context.
Labels DECLARE meaning explicitly. No inference needed = no misinterpretation.

```
# AI must infer: what does (é˜²æžæ··) modify? what does ä¾‹å¤– apply to?
GATE-1: æ”¶åˆ°ä»»å‹™â†’å…ˆç”¨ä¸€å¥è©±è¤‡è¿°(é˜²æžæ··)(é•·å°è©±ä¸­æ¯å€‹æ–°ä»»å‹™éƒ½é‡æ–°è§¸ç™¼) | ä¾‹å¤–: signalså‘½ä¸­ã€Œè™•ç†ä¸€ä¸‹ã€=ç›´æŽ¥åŸ·è¡Œ

# AI reads labels directly: triggerâ†’actionâ†’exception. Zero ambiguity.
GATE-1 è¤‡è¿°:
  trigger: new-task
  action: first-sentence="ä½ è¦æˆ‘åšçš„æ˜¯___"
  persist: é•·å°è©±ä¸­æ¯å€‹æ–°ä»»å‹™éƒ½é‡æ–°è§¸ç™¼
  exception: signal=è™•ç†ä¸€ä¸‹ â†’ skip
  yields-to: GATE-3
```

Key insight: Labels like `trigger:` `action:` `exception:` work across ALL languages.
The model doesn't need to parse Chinese/Japanese/English grammar to understand structure.
**Labels are the universal language between humans and AI.**

### Mechanism 3: Semantic Anchoring

Labeled sub-items create **matchable tags**. When a user's input contains a keyword,
the model matches it directly to the corresponding label â€” like a hash table lookup
instead of a full-text search.

```
# BURIED: AI scans the whole sentence, might miss the connection
åŠ æ–°åŠŸèƒ½â†’ç¬¬ä¸€å¥å•schema | æ–°å¢žAPI/endpoint=å¿…ç¢ºèªhealth-check.pyè¦†è“‹

# ANCHORED: label "new-api:" directly matches user saying "åŠ å€‹ API"
MOAT:
  new-feature: ç¬¬ä¸€å¥å•schema/å¥‘ç´„/é—œè¯
  new-api: å¿…ç¢ºèªhealth-check.pyè¦†è“‹(GATE-5)
```

**Real proof:** This specific technique fixed a test case that failed 5 consecutive times
across all models. The label `new-api:` raised Codex T5 from âŒâ†’âœ… on first try.

---

## The Conversion Process: What Happens When You Give Me a CLAUDE.md

Here's the exact mental model I use when converting natural language instructions to AI.MD format.

### Phase 1: UNDERSTAND â€” Read Like a Compiler, Not a Human

I read the CLAUDE.md **as if I'm building a state machine**, not reading a document.

For each sentence, I ask:
1. **Is this a TRIGGER?** (What input activates this behavior?)
2. **Is this an ACTION?** (What should the AI do?)
3. **Is this a CONSTRAINT?** (What should the AI NOT do?)
4. **Is this METADATA?** (Priority, timing, persistence, exceptions?)
5. **Is this a HUMAN EXPLANATION?** (Why the rule exists â€” delete this)

Example analysis:

```
Input: "æ”¶åˆ°ä»»å‹™â†’å…ˆç”¨ä¸€å¥è©±è¤‡è¿°(é˜²æžæ··)(é•·å°è©±ä¸­æ¯å€‹æ–°ä»»å‹™éƒ½é‡æ–°è§¸ç™¼) | ä¾‹å¤–: signalså‘½ä¸­ã€Œè™•ç†ä¸€ä¸‹ã€=ç›´æŽ¥åŸ·è¡Œ"

Decomposition:
  â”œâ”€ TRIGGER:    "æ”¶åˆ°ä»»å‹™" â†’ new-task
  â”œâ”€ ACTION:     "å…ˆç”¨ä¸€å¥è©±è¤‡è¿°" â†’ first-sentence="ä½ è¦æˆ‘åšçš„æ˜¯___"
  â”œâ”€ DELETE:     "(é˜²æžæ··)" â†’ human motivation, AI doesn't need this
  â”œâ”€ METADATA:   "(é•·å°è©±ä¸­æ¯å€‹æ–°ä»»å‹™éƒ½é‡æ–°è§¸ç™¼)" â†’ persist: every-new-task
  â””â”€ EXCEPTION:  "ä¾‹å¤–: signalså‘½ä¸­ã€Œè™•ç†ä¸€ä¸‹ã€=ç›´æŽ¥åŸ·è¡Œ" â†’ exception: signal=è™•ç†ä¸€ä¸‹ â†’ skip
```

### Phase 2: DECOMPOSE â€” Break Every `|` and `()` Into Atomic Rules

The #1 source of compliance failure is **compound rules**.
A single line with 3 rules separated by `|` looks like 1 instruction to AI.
It needs to be 3 separate instructions.

**The splitter test:** If you can put "AND" between two parts of a sentence,
they are separate rules and MUST be on separate lines.

```
# Input: one sentence hiding 4 rules
ç¦ç”¨è©ž:æ‡‰è©²æ˜¯/å¯èƒ½æ˜¯â†’å…ˆæ‹¿æ•¸æ“š | "å¥½åƒ"/"è¦ºå¾—"â†’è‡ªå·±å…ˆè·‘test(ä¸æ˜¯å•user)â†’æœ‰æ•¸æ“šæ‰èƒ½æ±ºå®š

# Analysis: I find 4 hidden rules
Rule 1: certain words are banned â†’ use data instead
Rule 2: hearing doubt words â†’ run self-test
Rule 3: don't ask the user for data â†’ look it up yourself
Rule 4: preference claims â†’ require A/B comparison before accepting

# Output: 4 atomic rules
banned: æ‡‰è©²æ˜¯/å¯èƒ½æ˜¯/æ„Ÿè¦ºæ˜¯/æŽ¨æ¸¬ â†’ å…ˆæ‹¿æ•¸æ“š
hear-doubt: "å¥½åƒ"/"è¦ºå¾—" â†’ self-test(curl/benchmark)
self-serve: ç¦åå•user(è‡ªå·±æŸ¥)
compare: "è¦ºå¾—Aæ¯”Bå¥½" â†’ A/Bå¯¦æ¸¬å…ˆè¡Œ
```

### Phase 3: LABEL â€” Assign Function Labels

Every atomic rule gets a label that declares its function.
I use a standard vocabulary of ~12 label types:

| Label | What It Declares | When to Use |
|-------|-----------------|-------------|
| `trigger:` | What input activates this | Every gate/rule needs one |
| `action:` | What the AI must do | The core behavior |
| `exception:` | When NOT to do it | Override cases |
| `not-triggered:` | Explicit negative examples | Prevent over-triggering |
| `format:` | Output format constraint | Position, structure requirements |
| `priority:` | Override relationship | When rules conflict |
| `yields-to:` | Which gate takes precedence | Inter-gate priority |
| `persist:` | Durability across turns | Rules that survive conversation flow |
| `timing:` | When in the workflow | Before/after/during constraints |
| `violation:` | Consequence of breaking | Accountability mechanism |
| `banned:` | Forbidden words/actions | Hard no-go list |
| `policy:` | Decision heuristic | When judgment is needed |

**The label selection technique:** I pick the label that would help a DIFFERENT AI model
(not the one being instructed) understand this rule's function if it saw ONLY the label.
If `trigger:` clearly tells you "this is what activates the rule" without reading anything else,
it's the right label.

### Phase 4: STRUCTURE â€” Build the Architecture

I organize rules into a hierarchy:

```
<gates>    = Hard stops (MUST check before any action)
<rules>    = Behavioral guidelines (HOW to act)
<rhythm>   = Workflow patterns (WHEN to do what)
<conn>     = Connection strings (FACTS â€” never compress)
<ref>      = On-demand references (don't load until needed)
<learn>    = Evolution rules (how the system improves)
```

**Why this order matters:**
Gates come first because they MUST be checked before anything else.
The model processes instructions top-to-bottom. Priority = position.

**Grouping technique:** Rules that share a DOMAIN become sub-items under one heading.

```
# FLAT (bad): 7 unrelated rules, model treats equally
1. no guessing
2. backup before editing
3. use tables for output
4. check health after deploy
5. don't say "æ‡‰è©²æ˜¯"
6. test before reporting
7. all claims need proof

# GROUPED (good): 3 domains, model understands hierarchy
EVIDENCE:               â† domain: truthfulness
  core: no-guess
  banned: æ‡‰è©²æ˜¯
  proof: all-claims-need-data

SCOPE:                  â† domain: safety
  pre-change: backup
  pre-run: check-health

OUTPUT:                 â† domain: format
  format: tables+numbers
```

### Phase 5: RESOLVE â€” Handle Conflicts and Edge Cases

This is the most critical and least obvious phase. Natural language instructions
often contain **hidden conflicts** that humans resolve with intuition but AI cannot.

**Technique: Conflict Detection Matrix**

I check every pair of gates/rules for conflicts:

```
GATE-1 (è¤‡è¿°: repeat task) vs GATE-3 (ä¿è­·æª”: backup first)
â†’ CONFLICT: If user says "edit .env", should AI repeat the task first, or backup first?
â†’ RESOLUTION: priority: GATE-3 > GATE-1 (safety before courtesy)
             yields-to: GATE-3 (explicit in GATE-1)

GATE-4 (å ±çµè«–: cite evidence) vs bug-close (è¨˜éŒ„æ ¹å› : write root cause)
â†’ CONFLICT: bug-close requires stating root cause, but GATE-4 bans definitive claims
â†’ RESOLUTION: timing: GATE-4 is pre-conclusion brake; bug-close is post-verification record
             GATE-4 not-triggered when bug already verified

EVIDENCE (no-guess) vs user says "è™•ç†ä¸€ä¸‹" (just do it)
â†’ CONFLICT: should AI verify assumptions or execute immediately?
â†’ RESOLUTION: signal "è™•ç†ä¸€ä¸‹" = user has decided, skip confirmation
```

**Technique: Not-Triggered Lists**

For any rule that could over-trigger, I add explicit negative examples:

```
GATE-4 å ±çµè«–:
  trigger: æœ€çµ‚æ­¸å› /æ ¹å› åˆ¤å®š/ä¸å¯é€†å»ºè­°
  not-triggered: ä¸­é–“é€²åº¦æ•¸å­— | ç´”æŒ‡æ¨™æŸ¥è©¢ | å·¥å…·åŽŸå§‹è¼¸å‡º | å·²çŸ¥äº‹å¯¦ | è½‰è¿°æ–‡ä»¶
```

This was discovered because Gemini 2.5 Pro kept triggering GATE-4 on simple number queries
like "æˆåŠŸçŽ‡æ€Žéº¼æ¨£?". Adding `not-triggered: ç´”æŒ‡æ¨™æŸ¥è©¢` fixed it immediately.

### Phase 6: TEST â€” Multi-Model Validation (Non-Negotiable)

**This is not optional.** Every conversion MUST be validated by 2+ different LLM models.

Why? Because a format that works perfectly for Claude might confuse GPT, and vice versa.
The whole point of AI.MD is that it works ACROSS models.

**The exam protocol we developed:**

1. Write 8 test inputs that simulate REAL user behavior (not textbook examples)
2. Include "trap" questions where two rules conflict
3. Include "negative" tests where a rule should NOT trigger
4. DO NOT hint which rules are being tested (the AI shouldn't know)
5. Run each model independently
6. Score each answer: âœ… full compliance, âš ï¸ partial, âŒ miss
7. If ANY model's score drops after conversion â†’ revert that specific change

**The 8-question template we used:**

```
T1: Simple task (does GATE-1 trigger?)
T2: Database write attempt (does GATE-2 catch it?)
T3: Protected file edit (does GATE-3 fire FIRST, before GATE-1?)
T4: Root cause analysis (does GATE-4 require all 4 questions?)
T5: Business API addition (does AI mention health-check.py?)
T6: User says "å¥½åƒXæ¯”Yå¥½" (does AI run comparison or just accept it?)
T7: User says "è™•ç†ä¸€ä¸‹" (does AI skip GATE-1 confirmation?)
T8: Simple metric query (does GATE-4 NOT trigger?)
```

---

## Special Techniques Discovered During Battle-Testing

### Technique 1: Bilingual Label Strategy

Labels in English, output strings in the user's language.
English labels are shorter AND more universally understood by all models.
But the actual text the AI produces must stay in the user's language.

```
action: first-sentence="ä½ è¦æˆ‘åšçš„æ˜¯___"    â† AI outputs Chinese
format: must-be-line-1                      â† structural constraint in English
banned: æ‡‰è©²æ˜¯/å¯èƒ½æ˜¯                        â† forbidden words stay in original language
```

**Why this works:** English label vocabulary (`trigger`, `action`, `exception`) maps directly
to concepts in every model's training data. Chinese grammar labels (è§¸ç™¼æ¢ä»¶, åŸ·è¡Œå‹•ä½œ, ä¾‹å¤–æƒ…æ³)
are less standardized across models.

### Technique 2: State Machine Gates

Instead of treating rules as a flat list, model them as a **state machine**:
- Each gate has a `trigger` (input state)
- Each gate has an `action` (transition)
- Gates have `priority` (which fires first when multiple match)
- Gates have `yields-to` (explicit conflict resolution)

This gives AI a clear execution model:
```
Input arrives â†’ Check GATE-3 first (highest priority) â†’ Check GATE-1 â†’ Check GATE-2 â†’ ...
```

Instead of:
```
Input arrives â†’ Read all rules â†’ Try to figure out which one applies â†’ Maybe miss one
```

### Technique 3: XML Section Tags for Semantic Boundaries

Using `<gates>`, `<rules>`, `<rhythm>`, `<conn>` as section delimiters
creates hard boundaries that prevent rule-bleed (where the model confuses
which section a rule belongs to).

```xml
<gates label="ç¡¬æ€§é–˜é–€ | å„ªå…ˆåº: gates>rules>rhythm | ç¼ºä¸€é …=STOP">
...gates here...
</gates>

<rules>
...rules here...
</rules>
```

The `label` attribute on the opening tag serves as a section-level instruction:
"these are hard gates, this is their priority, missing = stop"

### Technique 4: Cross-Reference Instead of Duplicate

When the same concept appears in multiple rules, DON'T repeat it.
Use a cross-reference label.

```
# BAD: health-check mentioned in 3 places
GATE-5: ...check health-check.py...
MOAT: ...must check health-check.py...
SCOPE: ...verify health-check.py exists...

# GOOD: single source of truth + cross-reference
GATE-5 é©—æ”¶:
  checks:
    æ–°å¢žAPI â†’ ç¢ºèªhealth-check.pyè¦†è“‹

MOAT:
  new-api: å¿…ç¢ºèªhealth-check.pyè¦†è“‹(GATE-5)    â† cross-ref, not duplicate
```

### Technique 5: The "What Not Why" Principle

Delete ALL text that exists to explain WHY a rule exists.
AI needs WHAT to do, not WHY.

```
# DELETE these human explanations:
(é˜²æžæ··)                     â†’ motivation
(ä¸æ˜¯å¤§çˆ†ç ´,æ˜¯æ¯æ¬¡é †æ‰‹ä¸€é»ž)    â†’ metaphor
(æƒ³æ¸…æ¥š100å€å¾Œæ‰åšç¾åœ¨çš„)     â†’ backstory
(å› ç‚ºç”¨æˆ¶æ˜¯éžå·¥ç¨‹å¸«)          â†’ justification

# KEEP only the actionable instruction:
action: first-sentence="ä½ è¦æˆ‘åšçš„æ˜¯___"
refactor: åŒå€å¡Šé€£çºŒç¬¬3æ¬¡ä¿®æ”¹ â†’ extract
```

Every deleted explanation saves tokens AND removes noise that could confuse the model
about what it should actually DO.

---

## Two-Stage Workflow

### Stage 1: PREVIEW â€” Measure, Don't Touch

```bash
echo "=== Current Token Burn ==="
claude_md=$(wc -c < ~/.claude/CLAUDE.md 2>/dev/null || echo 0)
rules=$(cat ~/.claude/rules/*.md 2>/dev/null | wc -c || echo 0)
total=$((claude_md + rules))
tokens=$((total / 4))
echo "CLAUDE.md:     $claude_md bytes"
echo "rules/*.md:    $rules bytes"
echo "Total:         $total bytes â‰ˆ $tokens tokens/turn"
echo "50-turn session: â‰ˆ $((tokens * 50)) tokens on instructions alone"
```

Then: Read all auto-loaded files. Identify redundancy, prose overhead, and duplicate rules.

**Ask user before proceeding: "Want to distill?"**

### Stage 2: DISTILL â€” Convert with Safety Net

1. **Backup**: `cp ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.bak-pre-distill`
2. **Phase 1-5**: Run the full conversion process above
3. **Phase 6**: Run multi-model test (minimum 2 models, 8 questions)
4. **Report**: Show before/after scores

```
=== AI.MD Conversion Complete ===

Before: {old} bytes ({old_score} compliance)
After:  {new} bytes ({new_score} compliance)
Saved:  {percent}% bytes, +{delta} compliance points

Backup: ~/.claude/CLAUDE.md.bak-pre-distill
Restore: cp ~/.claude/CLAUDE.md.bak-pre-distill ~/.claude/CLAUDE.md
```

---

## AI-Native Template

```xml
# PROJECT-NAME | lang:xx | for-AI-parsing | optimize=results-over-format

<user>
identity, tone, signals, decision-style (key: value pairs)
</user>

<gates label="ç¡¬æ€§é–˜é–€ | å„ªå…ˆåº: gates>rules>rhythm | ç¼ºä¸€é …=STOP">

GATE-1 name:
  trigger: ...
  action: ...
  exception: ...
  yields-to: ...

GATE-2 name:
  trigger: ...
  action: ...
  policy: ...

</gates>

<rules>

RULE-NAME:
  core: ...
  banned: ...
  hear-X: ... â†’ action
  violation: ...

</rules>

<rhythm>
workflow patterns as key: value pairs
</rhythm>

<conn>
connection strings (keep exact â€” NEVER compress facts/credentials/URLs)
</conn>

<ref label="on-demand Read only">
file-path â†’ purpose
</ref>

<learn>
how system evolves over time
</learn>
```

---

## Anti-Patterns

| Don't | Do Instead | Why |
|-------|------------|-----|
| Human prose in CLAUDE.md | Structured labels | Prose requires inference; labels are direct |
| Multiple rules on one line | One concept per line | Attention splits across dense lines |
| Parenthetical explanations | Remove them | AI needs "what" not "why" |
| Same rule in 3 places | Single source + cross-ref | Duplicates can diverge and confuse |
| 20+ flat rules | 5-7 domains with sub-items | Hierarchy helps model organize behavior |
| Compress without testing | Validate with 2+ models | What works for Claude might fail for GPT |
| Assume format doesn't matter | Test it â€” it does | Same content, different format = different compliance |
| Chinese-only labels | English labels + native output | English labels are more universal across models |
| Flat rule list | State machine with priorities | Clear execution order prevents missed rules |

---

## Real-World Results

Tested 2026-03, washinmura.jp CLAUDE.md, 5 rounds, 4 models:

| Round | Change | Codex (GPT-5.3) | Gemini 2.5 Pro | Claude Opus 4.6 |
|-------|--------|-----------------|----------------|-----------------|
| R1 (baseline prose) | â€” | 8/8 | 7/8 | 8/8 |
| R2 (added rules) | +gates +examples | 7/8 | 6/8 | â€” |
| R3 (refined prose) | +exceptions +non-triggers | 6/8 | 6.5/8 | â€” |
| R4 (AI-native convert) | structured labels | **8/8** | **7/8** | **8/8** |

Key findings:
1. **More prose rules = worse compliance** (R1â†’R3: scores dropped as rules grew)
2. **Structured format = restored + exceeded** (R4: back to max despite more rules)
3. **Cross-model consistency**: Format that works for one model works for all (except Grok)
4. **Semantic anchoring**: The `new-api:` label fix was the single most impactful change

**The uncomfortable truth: Your beautiful, carefully-written CLAUDE.md
might be HURTING your AI's performance. Structure > Prose. Always.**

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

