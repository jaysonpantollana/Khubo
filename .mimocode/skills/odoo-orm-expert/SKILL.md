---
name: odoo-orm-expert
description: "Use when working with odoo-orm-expert"
---

---
name: odoo-orm-expert
description: "Master Odoo ORM patterns: search, browse, create, write, domain filters, computed fields, and performance-safe query techniques."
risk: safe
source: "self"
---

# Odoo ORM Expert

## Overview

This skill teaches you Odoo's Object Relational Mapper (ORM) in depth. It covers reading/writing records, building domain filters, working with relational fields, and avoiding common performance pitfalls like N+1 queries.

## When to Use This Skill

- Writing `search()`, `browse()`, `create()`, `write()`, or `unlink()` calls.
- Building complex domain filters for views or server actions.
- Implementing computed, stored, and related fields.
- Debugging slow queries or optimizing bulk operations.

## How It Works

1. **Activate**: Mention `@odoo-orm-expert` and describe what data operation you need.
2. **Get Code**: Receive correct, idiomatic Odoo ORM code with explanations.
3. **Optimize**: Ask for performance review on existing ORM code.

## Examples

### Example 1: Search with Domain Filters

```python
# Find all confirmed sale orders for a specific customer, created this year
import datetime

start_of_year = datetime.date.today().replace(month=1, day=1).strftime('%Y-%m-%d')

orders = self.env['sale.order'].search([
    ('partner_id', '=', partner_id),
    ('state', '=', 'sale'),
    ('date_order', '>=', start_of_year),
], order='date_order desc', limit=50)

# Note: pass dates as 'YYYY-MM-DD' strings in domains,
# NOT as fields.Date objects â€” the ORM serializes them correctly.
```

### Example 2: Computed Field

```python
total_order_count = fields.Integer(
    string='Total Orders',
    compute='_compute_total_order_count',
    store=True
)

@api.depends('sale_order_ids')
def _compute_total_order_count(self):
    for record in self:
        record.total_order_count = len(record.sale_order_ids)
```

### Example 3: Safe Bulk Write (avoid N+1)

```python
# âœ… GOOD: One query for all records
partners = self.env['res.partner'].search([('country_id', '=', False)])
partners.write({'country_id': self.env.ref('base.us').id})

# âŒ BAD: Triggers a separate query per record
for partner in partners:
    partner.country_id = self.env.ref('base.us').id
```

## Best Practices

- âœ… **Do:** Use `mapped()`, `filtered()`, and `sorted()` on recordsets instead of Python loops.
- âœ… **Do:** Use `sudo()` sparingly and only when you understand the security implications.
- âœ… **Do:** Prefer `search_count()` over `len(search(...))` when you only need a count.
- âœ… **Do:** Use `with_context(...)` to pass context values cleanly rather than modifying `self.env.context` directly.
- âŒ **Don't:** Call `search()` inside a loop â€” this is the #1 Odoo performance killer.
- âŒ **Don't:** Use raw SQL unless absolutely necessary; use ORM for all standard operations.
- âŒ **Don't:** Pass Python `datetime`/`date` objects directly into domain tuples â€” always stringify them as `'YYYY-MM-DD'`.

## Limitations

- Does not cover **`cr.execute()` raw SQL** patterns in depth â€” use the Odoo performance tuner skill for SQL-level optimization.
- **Stored computed fields** can cause significant write overhead at scale; this skill does not cover partitioning strategies.
- Does not cover **transient models** (`models.TransientModel`) or wizard patterns.
- ORM behavior can differ slightly between Odoo SaaS and On-Premise due to config overrides.

