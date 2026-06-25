---
name: seo-aeo-internal-linking
description: "Use when working with seo-aeo-internal-linking"
---

---
name: seo-aeo-internal-linking
description: "Maps internal link opportunities between pages with anchor text, placement instructions, orphan page detection, and cannibalization checks. Activate when the user wants to build an internal linking strategy or find link opportunities."
risk: safe
source: community
date_added: "2026-04-01"
---

# SEO-AEO Internal Linking

## Overview

Analyses a set of pages and produces a prioritised list of internal link opportunities with exact anchor text, a context sentence showing where each link should appear, orphan page detection, anchor text cannibalization warnings, and a link equity map showing how authority flows across the content.

Part of the [SEO-AEO Engine](https://github.com/mrprewsh/seo-aeo-engine).

## When to Use This Skill

- Use when building internal links between a new pillar page and its cluster articles
- Use when auditing an existing site for orphan pages
- Use after content-cluster generates a topic map
- Use when you need anchor text suggestions with placement context

## How It Works

### Step 1: Detect Orphan Pages
Flag any page with zero incoming internal links. These are invisible to search engines and must be linked immediately.

### Step 2: Build Semantic Overlap Matrix
Match pages by primary keyword similarity and content summary to identify natural linking opportunities.

### Step 3: Assign Link Types
Every suggestion gets one of four labels:
- **Cluster â†’ Pillar** â€” highest priority, consolidates authority upward
- **Pillar â†’ Cluster** â€” distributes authority downward
- **Cluster â†’ Cluster** â€” builds semantic depth
- **Contextual Boost** â€” concentrates equity on a focus page

### Step 4: Write Context Sentences
For every link opportunity, write the sentence the anchor text should appear in â€” naturally placed, not forced.

### Step 5: Check Anchor Text
Flag any exact-match anchor used more than once for the same target page as a cannibalization risk. Never use generic anchors like "click here".

## Examples

### Example: Link Opportunity Output
ðŸ”´ High Priority â€” Link 1
Type: Cluster â†’ Pillar
Source: "How to Build a Budget That Actually Works"
Target: "The Complete Guide to Automated Budgeting"
Anchor: "automated budgeting guide"
Context: "For a full breakdown of every method available,
see our [automated budgeting guide]."
Impact: Consolidates topical authority on pillar page.
Orphan Alert:
"PennyWise Pricing Page" has no incoming links.
Fix: Add link from comparison table in Article 2.

## Best Practices

- âœ… **Do:** Every cluster article must have at least one Cluster â†’ Pillar link
- âœ… **Do:** Write a context sentence for every suggestion â€” anchor text needs natural placement
- âœ… **Do:** Fix orphan pages before adding any new links
- âŒ **Don't:** Use the same exact-match anchor for the same target page more than once
- âŒ **Don't:** Use "click here", "read more", or "learn more" as anchor text â€” ever
- âŒ **Don't:** Add more than 100 outgoing internal links on any single page

## Common Pitfalls

- **Problem:** All cluster articles link to the pillar but not to each other
  **Solution:** Add Cluster â†’ Cluster links between semantically related articles to build depth.

- **Problem:** Same anchor text used across multiple pages for the same target
  **Solution:** Use partial match and branded anchors for subsequent links after the first exact-match use.

## Related Skills

- `@seo-aeo-content-cluster` â€” generates the cluster map this skill links together
- `@seo-aeo-schema-generator` â€” uses link map output for BreadcrumbList schema

## Additional Resources

- [SEO-AEO Engine Repository](https://github.com/mrprewsh/seo-aeo-engine)
- [Full Internal Linking SKILL.md](https://github.com/mrprewsh/seo-aeo-engine/blob/main/.agent/skills/internal-linking/SKILL.md)

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.

