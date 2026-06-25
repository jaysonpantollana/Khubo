---
name: efficient-web-research
description: "Use when working with efficient-web-research"
---

---
name: efficient-web-research
risk: safe
description: >
  Protocol for token-efficient web research. Use when accessing URLs, GitHub repos, or running search queries. Prevents full-page fetching waste.
---

# Efficient Web Research Skill

A protocol for accessing web content in the most token-efficient, accurate, and structured way â€”
using the right tool at the right depth, and stopping as soon as the question is answerable.

---

## Core Principle

> **Fetch the minimum needed to answer. Skim before you dive. Stop when you can answer.**

Every unnecessary fetch wastes tokens and adds noise. This skill enforces a layered approach
where you escalate fetch depth only when shallower layers fail.

---

## Step 1 â€” Classify the Input

Before fetching anything, identify what kind of input you received:

| Input Type | Example | Go To |
|---|---|---|
| GitHub repo URL | `github.com/user/repo` | [GitHub Protocol](#github-protocol) |
| Specific page URL | `docs.python.org/3/library/os` | [URL Protocol](#url-protocol) |
| Topic / query (no URL) | "how does RAFT consensus work" | [Search Protocol](#search-protocol) |
| Multiple URLs | List of links | [Multi-URL Protocol](#multi-url-protocol) |
| PDF / file link | `.pdf`, `.txt`, `.md` URL | [File Protocol](#file-protocol) |

---

## GitHub Protocol

Use when input is a GitHub URL (repo, file, PR, issue, etc.)

### Step 1 â€” Parse the URL

```
github.com/{owner}/{repo}                â†’ Repo root
github.com/{owner}/{repo}/tree/{branch}  â†’ Directory
github.com/{owner}/{repo}/blob/{branch}/{path} â†’ Single file
github.com/{owner}/{repo}/issues/{n}     â†’ Issue
github.com/{owner}/{repo}/pull/{n}       â†’ Pull request
```

### Step 2 â€” Use GitHub API (preferred over scraping)

Always prefer the GitHub API. It returns clean JSON â€” no HTML parsing needed.

```
# Repo metadata (name, description, language, stars, topics)
GET https://api.github.com/repos/{owner}/{repo}

# File tree (see what files exist â€” very cheap)
GET https://api.github.com/repos/{owner}/{repo}/git/trees/{ref}?recursive=1

# Single file content (base64 encoded)
GET https://api.github.com/repos/{owner}/{repo}/contents/{path}?ref={ref}

# README only (usually enough to understand the repo)
GET https://api.github.com/repos/{owner}/{repo}/readme
```

### Step 3 â€” Layered Fetch for Repos

```
Layer 1 (always do first):
  â†’ Fetch repo metadata + README only
  â†’ Can you answer the user's question now? YES â†’ STOP. NO â†’ continue.

Layer 2 (only if needed):
  â†’ Fetch file tree to understand structure
  â†’ Identify the 1-3 most relevant files based on the question
  â†’ Can you answer now? YES â†’ STOP. NO â†’ continue.

Layer 3 (last resort):
  â†’ Fetch specific relevant files only (never fetch all files)
  â†’ Prioritize: main entry point, config files, key modules
```

### Token Rules for GitHub

- README alone answers ~70% of "what does this repo do" questions â€” always try it first
- Never fetch more than 3 files in a single research turn
- If a file exceeds ~300 lines, read only the top (imports + class/function signatures)
- Decode base64 content from API before passing to context

---

## URL Protocol

Use when the user gives a specific non-GitHub URL (docs, articles, blogs, etc.)

### Step 1 â€” Assess the URL type

| Site type | Likely works with | Notes |
|---|---|---|
| Static docs / MDN / ReadTheDocs | `read_url_content` | Fast, clean, cheap |
| News articles / blogs | `read_url_content` | Usually fine |
| SPAs / React/Next.js apps | `browser_subagent` | JS-rendered |
| Auth-gated pages | `browser_subagent` | Needs login |
| Raw GitHub files (raw.githubusercontent) | `read_url_content` | Direct text |

### Step 2 â€” Layered Fetch

```
Layer 1 â€” Skim
  â†’ Fetch the URL with read_url_content
  â†’ Read only headings (H1, H2, H3) and first paragraph
  â†’ Does this page contain what the user needs? NO â†’ try a different URL or search. YES â†’ continue.

Layer 2 â€” Targeted Extract
  â†’ If the page has anchor links (e.g. /docs/page#section), fetch with the anchor
  â†’ Extract only the relevant section (200â€“500 tokens max)
  â†’ Can you answer? YES â†’ STOP.

Layer 3 â€” Full Fetch
  â†’ Fetch full page, strip boilerplate (nav, footer, ads, cookie banners, sidebars)
  â†’ Cap at 2000 tokens. Summarize before passing to answer.

Layer 4 â€” Browser Subagent (last resort only)
  â†’ Use ONLY if read_url_content returns empty, garbled, or JS-placeholder content
  â†’ Instruct subagent: "Navigate to [URL], wait for content to load, extract [specific section]"
  â†’ Do NOT use browser_subagent for static pages â€” it's expensive
```

### What to Strip from Fetched Pages

Always remove before using fetched content:
- Navigation menus and breadcrumbs
- Cookie banners and GDPR notices
- "Related articles" / "You might also like" blocks
- Footer content (copyright, links)
- Social share buttons
- Ads and sponsored content

Extract and keep:
- Main article / documentation body
- Code blocks
- Tables with data
- Numbered steps or procedures

---

## Search Protocol

Use when the user gives a topic, question, or query â€” not a specific URL.

### Step 1 â€” Sharpen the Query Before Searching

Do NOT search the raw user query. Transform it first:

```
Raw: "how to deploy fastapi on aws"
Sharpened: "fastapi AWS deployment tutorial 2024"

Raw: "python async vs threads"
Sharpened: "Python asyncio vs threading performance comparison"

Raw: "best way to structure react project"
Sharpened: "React project folder structure best practices"
```

**Query sharpening rules:**
- Add specificity: version numbers, technology names, "tutorial" / "guide" / "comparison"
- Add recency if relevant: current year
- Remove filler words: "how do I", "what is the", "can you explain"
- For code questions: add the language + framework name explicitly

### Step 2 â€” Search and Select

```
1. Run search_web with the sharpened query
2. Get results (titles + snippets)
3. Scan titles + snippets ONLY â€” do not fetch yet
4. Pick the TOP 1-2 most relevant results (max 3 in complex cases)
5. Skip results from: forums (if docs exist), aggregator blogs, paywalled sites
6. Prefer: official docs, GitHub repos, well-known tech blogs, academic sources
```

### Step 3 â€” Fetch Selected Results

Apply the URL Protocol (above) to each selected URL.
Process results one at a time â€” only fetch the second URL if the first didn't answer the question.

### Token Rules for Search

- Never read more than 3 URLs per search query
- If the snippet already contains the answer â†’ do NOT fetch the full page, use the snippet
- For factual questions (dates, names, simple facts) â†’ snippet is usually enough
- For procedural questions (how to do X) â†’ fetch 1 relevant page, targeted section only

---

## Multi-URL Protocol

Use when the user provides a list of URLs to compare or summarize.

```
1. Skim all URLs first (Layer 1 fetch for each)
2. Group by relevance to the user's question
3. Deep-fetch only the most relevant 1-3 URLs
4. Summarize each in 3-5 sentences before combining
5. Never dump raw content from multiple pages â€” always summarize per-source first
```

---

## File Protocol

Use when URL points directly to a file (PDF, .txt, .md, .csv, etc.)

- `.md` / `.txt` / `.csv` â†’ `read_url_content` works directly, read full content
- `.pdf` â†’ Use browser_subagent or a PDF extraction tool; extract text only
- `.json` / `.yaml` â†’ `read_url_content`, parse structure, summarize schema + key values
- Large files (>500 lines) â†’ Read first 100 lines + last 20 lines + search for relevant sections

---

## Anti-Patterns (Never Do These)

| Anti-pattern | Why it's bad | Do this instead |
|---|---|---|
| Fetching full page for a simple fact | Wastes 1000s of tokens | Use snippet or targeted anchor |
| Using browser_subagent for static sites | Very expensive | Use read_url_content first |
| Searching with the raw user query | Vague results | Sharpen query first |
| Fetching 5+ search results | Token explosion | Max 3, stop when answered |
| Dumping raw HTML into context | Noisy, wasteful | Always strip to Markdown |
| Fetching "just in case" | Unnecessary tokens | Only fetch what's needed to answer |
| Re-fetching the same URL | Redundant | Cache result in context, reuse |
| Fetching entire GitHub repo | Extremely wasteful | README + targeted files only |

---

## Decision Flowchart (Quick Reference)

```
Input received
â”‚
â”œâ”€ GitHub URL?
â”‚   â”œâ”€ Fetch README + metadata via API
â”‚   â”œâ”€ Answered? â†’ STOP
â”‚   â”œâ”€ Need more? â†’ Fetch file tree, pick 1-3 files
â”‚   â””â”€ Still need more? â†’ Fetch specific files only
â”‚
â”œâ”€ Specific URL?
â”‚   â”œâ”€ Try read_url_content â†’ skim headings
â”‚   â”œâ”€ Answered? â†’ STOP
â”‚   â”œâ”€ Need more? â†’ Targeted section fetch
â”‚   â”œâ”€ Still need more? â†’ Full fetch, stripped
â”‚   â””â”€ JS-rendered / broken? â†’ browser_subagent (last resort)
â”‚
â”œâ”€ Topic/query?
â”‚   â”œâ”€ Sharpen query
â”‚   â”œâ”€ search_web â†’ scan snippets
â”‚   â”œâ”€ Snippet enough? â†’ Answer from snippet, STOP
â”‚   â”œâ”€ Need more? â†’ Fetch top 1 result (targeted)
â”‚   â””â”€ Still need more? â†’ Fetch top 2nd result (targeted)
â”‚
â””â”€ List of URLs?
    â”œâ”€ Skim all (Layer 1 each)
    â”œâ”€ Deep fetch top 1-3 relevant ones
    â””â”€ Summarize per-source, then combine
```

---

## Output Format Rules

After fetching, structure your response as:

```
Source: [URL or "Web search for: query"]
Summary: [2-5 sentences of what was found]
Answer: [Direct answer to user's question]
Confidence: [High / Medium / Low â€” based on source quality]
```

For multiple sources:
```
Source 1: ...
Source 2: ...
Combined Answer: ...
```

Never output:
- Raw HTML fragments
- Full page dumps
- Unattributed information
- More than needed to answer the question

---

## Token Budget Guide

| Operation | Approximate token cost | When to use |
|---|---|---|
| GitHub README fetch | ~300â€“800 tokens | Always first for repos |
| GitHub API metadata | ~200 tokens | Always for repos |
| Skim (headings only) | ~100â€“200 tokens | Always first for URLs |
| Targeted section fetch | ~300â€“600 tokens | When skim isn't enough |
| Full page fetch (stripped) | ~1000â€“2000 tokens | Only when targeted fails |
| browser_subagent | ~2000â€“5000 tokens | Last resort only |
| Search snippet scan | ~300â€“500 tokens | Always before fetching |

**Rule of thumb:** If you're about to spend >2000 tokens on a fetch, ask yourself if there's a cheaper path first.

---

## Limitations

- **JavaScript Reliance**: Standard fetching may not fully render Single Page Applications (SPAs). You must fallback to `browser_subagent` for these, which is slower and more expensive.
- **Paywalls & Protections**: This skill cannot bypass CAPTCHAs, bot protections (e.g., strict Cloudflare rules), or hard paywalls.
- **GitHub API Limits**: Frequent GitHub API requests without authentication may hit rate limits.

