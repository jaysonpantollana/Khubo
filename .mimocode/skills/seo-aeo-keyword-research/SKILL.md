---
name: seo-aeo-keyword-research
description: "Use when working with seo-aeo-keyword-research"
---

---
name: seo-aeo-keyword-research
description: "Researches and prioritises SEO keywords with AEO question queries, difficulty tiers, cannibalization checks, and a content map. Activate when the user wants to find keywords, research search terms, or build a keyword strategy."
risk: safe
source: community
date_added: "2026-04-01"
---

# SEO-AEO Keyword Research

## Overview

Identifies high-value SEO keywords and AEO question-based queries for a topic. Produces keyword tiers (easy wins to long-term goals), search intent classification, cannibalization checks, and a content production map â€” all from a single topic input.

Part of the [SEO-AEO Engine](https://github.com/mrprewsh/seo-aeo-engine) â€” an open-source AI-powered content growth system.

## When to Use This Skill

- Use when you need to build a keyword strategy for a new topic or niche
- Use when you want to find AEO question queries for AI engine citation
- Use when you need to prioritise which keywords to target first
- Use when you want to check for keyword cannibalization before writing content

## How It Works

### Step 1: Extract Seed Keywords
Identify 3â€“5 core terms that anchor the topic's search territory. Go beyond the obvious head term to include adjacent terms the audience actually uses.

### Step 2: Expand Into Tiers
Sort all keywords into three tiers:
- **Tier 1** â€” Low-to-moderate difficulty. Target first.
- **Tier 2** â€” Medium difficulty. Build toward after Tier 1 content is live.
- **Tier 3** â€” High difficulty. Long-term goals only.

### Step 3: Generate AEO Keywords
Produce question-based keywords that AI engines surface in direct answers and People Also Ask boxes. For each AEO keyword, specify the answer format to use (definition sentence, numbered steps, comparison table, direct number).

### Step 4: Run Cannibalization Check
Flag any two keywords similar enough to split traffic if targeted on separate pages. Recommend which page should own which term.

### Step 5: Build Content Map
Recommend content type and production order for all Tier 1 and Tier 2 keywords.

## Examples

### Example 1: SaaS Product
Input: topic = "remote project management software"
audience = "engineering managers and startup founders"
goal = "convert"
Output:
Tier 1 Keywords:

"remote project management software" | Medium volume | Difficulty: 38
"project management tool remote teams" | Low volume | Difficulty: 29

AEO Keywords:

"What is the best project management software for remote teams?"
â†’ Answer format: Comparison table
"How does remote project management work?"
â†’ Answer format: Numbered steps

Content Map:

Landing page â†’ "remote project management software"
Pillar blog â†’ "complete guide to remote project management"
Cluster article â†’ "how to manage remote engineering teams"


### Example 2: Fintech App
Input: topic = "automated budgeting app"
audience = "millennials managing personal finances"
goal = "all"
Output:
Tier 1 Keywords:

"automated budgeting app" | Medium volume | Difficulty: 33
"automatic savings app" | Low volume | Difficulty: 24

AEO Keywords:

"What is the best budgeting app for millennials?"
â†’ Answer format: Comparison table
"How does automated budgeting work?"
â†’ Answer format: Numbered steps


## Best Practices

- âœ… **Do:** Target Tier 1 keywords first â€” build authority before going after competitive terms
- âœ… **Do:** Use AEO keywords in FAQ sections and definition blocks for AI engine citation
- âœ… **Do:** Validate estimated volume and difficulty with a live tool (Ahrefs, SEMrush) before committing
- âŒ **Don't:** Target two keywords on the same page if cannibalization is flagged
- âŒ **Don't:** Use volume as the only prioritisation signal â€” difficulty and intent matter more

## Common Pitfalls

- **Problem:** High-volume keyword chosen but impossible to rank for early on
  **Solution:** Always cross-check volume with difficulty. Tier 1 should have difficulty under 45.

- **Problem:** AEO keywords ignored in favour of traditional search terms
  **Solution:** AEO keywords drive AI engine citation â€” include at least 5 in every research run.

## Related Skills

- `@seo-aeo-content-cluster` â€” uses keyword research output to build topic cluster
- `@seo-aeo-landing-page-writer` â€” consumes primary keyword to generate landing page
- `@seo-aeo-blog-writer` â€” uses secondary keywords for cluster article targeting

## Additional Resources

- [SEO-AEO Engine Repository](https://github.com/mrprewsh/seo-aeo-engine)
- [Full Keyword Research SKILL.md](https://github.com/mrprewsh/seo-aeo-engine/blob/main/.agent/skills/keyword-research/SKILL.md)

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

