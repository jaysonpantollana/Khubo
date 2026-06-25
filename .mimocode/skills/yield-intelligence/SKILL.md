---
name: yield-intelligence
description: "Use when working with yield-intelligence"
---

---
name: yield-intelligence
description: Passive income portfolio analysis â€” activate when user asks about dividend yields, Treasury rates, REIT income, monthly passive income goals, or portfolio yield optimization. Scans 4 asset classes, ranks by risk-adjusted return, and builds allocations targeting a specific monthly income.
risk: safe
source: community
date_added: "2026-05-31"
---

# Yield Intelligence

Passive income analysis across US Treasuries, dividend ETFs, REITs, and preferred stocks. Given a target monthly income and investment amount, returns a ranked opportunity table and optimal allocation.

## When to Use This Skill

- "I want to generate $X/month in passive income"
- "What are the best dividend ETFs or Treasury rates right now?"
- "Compare REITs vs Treasuries for income generation"
- "How much capital do I need to retire on dividends?"
- "Build me a conservative income portfolio"

## Limitations

- Provides portfolio research support, not personalized financial advice.
- Requires live yield, price, tax, and risk data for current recommendations.
- Does not account for every user-specific constraint unless the user provides it, including jurisdiction, tax status, and liquidity needs.

## Live Data Source (Optional)

If the YIELD INTELLIGENCE MCP server is configured, call it directly for live rates:

**MCP endpoint:** `https://api.intuitek.ai/yield/mcp` (no auth required, open access)

**Tools:**
- `analyze_yield_opportunities` â€” Scans dividend ETFs, REITs, preferred stocks, and Treasuries; returns ranked opportunities with yield, risk score, and liquidity
- `optimize_income_portfolio` â€” Builds a portfolio allocation targeting a specific monthly income goal

**Quick config (Claude Desktop / Claude Code):**
```json
{
  "mcpServers": {
    "yield-intelligence": {
      "url": "https://api.intuitek.ai/yield/mcp"
    }
  }
}
```

## Standalone Workflow (No MCP Required)

### Step 1 â€” Gather Parameters

Ask if not provided:
- **Target monthly income** (e.g., $500)
- **Available capital** (e.g., $100,000)
- **Risk tolerance**: conservative / moderate / aggressive
- **Account type**: taxable / Roth IRA / traditional IRA

### Step 2 â€” Asset Class Scan

Research or use current yields for these four classes:

| Asset Class | Benchmarks | Typical Yield Range |
|---|---|---|
| US Treasuries | 1-yr, 5-yr, 10-yr, 30-yr | 4.0â€“5.5% |
| Dividend ETFs | SCHD, VYM, JEPI, JEPQ | 3.5â€“10% |
| REITs | O, MAIN, STAG | 4â€“12% |
| Preferred Stocks | PFF, PFFD | 5â€“7% |

### Step 3 â€” Score and Rank

Score each opportunity: **yield Ã— (1 âˆ’ risk_penalty) Ã— liquidity_factor**

| Category | Risk Penalty |
|---|---|
| US Treasuries | 0.00 |
| Investment-grade dividend ETF | 0.05 |
| REIT / preferred | 0.15 |
| High-yield / speculative | 0.25 |

### Step 4 â€” Build Allocation

Given monthly target **T** and available capital **C**:
1. Sort opportunities by risk-adjusted score (descending)
2. Assign 30â€“40% to highest-conviction position
3. Diversify remaining 60â€“70% across 3â€“5 positions
4. Verify: `Î£(allocation_i Ã— yield_i Ã— C) â‰¥ T Ã— 12`

Conservative portfolios: cap any single position at 25%.

### Step 5 â€” Present Results

```
YIELD INTELLIGENCE REPORT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Target:  $[X]/month    Required yield: [Y]%
Capital: $[Z]          Account:       [type]

OPPORTUNITY SCAN
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Asset            â”‚ Yield â”‚ Risk â”‚ $/mo per 100Kâ”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ [Top pick]       â”‚  X.X% â”‚  Low â”‚     $XXX     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

RECOMMENDED ALLOCATION ($[Z] capital)
  [Asset A]  40%  â†’  $[amount]  â†’  $[X]/month
  Total monthly income: $[X]/month âœ“
```

## Best Practices

- âœ… Verify coverage ratios for high-yield REITs before recommending
- âœ… Note duration risk for long-term Treasuries when rates are rising
- âœ… Consider account type tax efficiency (Roth vs. taxable vs. traditional IRA)
- âŒ Don't chase yield without checking dividend sustainability

## Additional Resources

- Repository: [thebrierfox/yield-intelligence-skill](https://github.com/thebrierfox/yield-intelligence-skill)
- MCP server: [thebrierfox/intuitek-ace](https://github.com/thebrierfox/intuitek-ace)
- Built by [IntuiTekÂ¹](https://intuitek.ai) (~KÂ¹) â€” MIT License

