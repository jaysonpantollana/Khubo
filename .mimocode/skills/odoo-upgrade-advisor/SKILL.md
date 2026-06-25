---
name: odoo-upgrade-advisor
description: "Use when working with odoo-upgrade-advisor"
---

---
name: odoo-upgrade-advisor
description: "Step-by-step Odoo version upgrade advisor: pre-upgrade checklist, community vs enterprise upgrade path, OCA module compatibility, and post-upgrade validation."
risk: safe
source: "self"
---

# Odoo Upgrade Advisor

## Overview

Upgrading Odoo between major versions (e.g., v15 â†’ v16 â†’ v17) requires careful preparation, testing, and validation. This skill provides a structured pre-upgrade checklist, guides you through the upgrade tools (Odoo Upgrade Service and OpenUpgrade), and gives you a post-upgrade validation protocol.

## When to Use This Skill

- Planning a major Odoo version upgrade.
- Identifying which custom modules need to be migrated.
- Running the upgrade on a staging environment before production.
- Validating the system after an upgrade.

## How It Works

1. **Activate**: Mention `@odoo-upgrade-advisor`, state your current and target version.
2. **Plan**: Receive the full upgrade roadmap and risk assessment.
3. **Execute**: Get a step-by-step upgrade command sequence.

## Upgrade Paths

| From | To | Supported? | Tool |
|---|---|---|---|
| v16 | v17 | âœ… Direct | Odoo Upgrade Service / OpenUpgrade |
| v15 | v16 | âœ… Direct | Odoo Upgrade Service / OpenUpgrade |
| v14 | v15 | âœ… Direct | Odoo Upgrade Service / OpenUpgrade |
| v14 | v17 | âš ï¸ Multi-hop | v14â†’v15â†’v16â†’v17 (cannot skip) |
| v13 or older | any | âŒ Not supported | Manual migration required |

## Examples

### Example 1: Pre-Upgrade Checklist

```text
BEFORE YOU START:
  â˜‘ 1. List all installed modules (Settings â†’ Technical â†’ Modules)
        Export to CSV and review for custom/OCA modules
  â˜‘ 2. Check OCA compatibility matrix for each community module
        https://github.com/OCA/maintainer-tools/wiki/Migration-Status
  â˜‘ 3. Take a full backup (database + filestore) â€” your restore point
  â˜‘ 4. Clone production to a staging environment
  â˜‘ 5. Run the Odoo Upgrade pre-analysis:
        https://upgrade.odoo.com/ â†’ Upload DB â†’ Review breaking changes report
  â˜‘ 6. Review custom modules against migration notes
        (use @odoo-migration-helper for per-module analysis)
  â˜‘ 7. Upgrade and test in staging â†’ Fix all errors â†’ Re-test
  â˜‘ 8. Schedule a production maintenance window
  â˜‘ 9. Notify users of scheduled downtime
  â˜‘ 10. Perform production upgrade â†’ Validate â†’ Go/No-Go decision
```

### Example 2: Community Upgrade with OpenUpgrade

```bash
# Clone OpenUpgrade for the TARGET version (e.g., upgrading to v17)
git clone https://github.com/OCA/OpenUpgrade.git \
  --branch 17.0 \
  --single-branch \
  /opt/openupgrade

# Run the migration against your staging database
python3 /opt/openupgrade/odoo-bin \
  --update all \
  --database odoo_staging \
  --config /etc/odoo/odoo.conf \
  --stop-after-init \
  --load openupgrade_framework

# Review the log for errors before touching production
tail -200 /var/log/odoo/odoo.log | grep -E "ERROR|WARNING|Traceback"
```

### Example 3: Post-Upgrade Validation Checklist

```text
After upgrading, validate these critical areas before going live:

Accounting:
  â˜‘ Trial Balance totals match the pre-upgrade snapshot
  â˜‘ Open invoices, bills, and payments are accessible
  â˜‘ Bank reconciliation can be performed on a test statement

Inventory:
  â˜‘ Stock valuation report matches pre-upgrade (run Inventory Valuation)
  â˜‘ Open Purchase Orders and Sale Orders are visible

HR / Payroll:
  â˜‘ All employee records are intact
  â˜‘ Payslips from the last 3 months are accessible and correct

Custom Modules:
  â˜‘ Every custom module loaded without ImportError or XML error
  â˜‘ Run the critical business workflows end-to-end:
      Create sale order â†’ confirm â†’ deliver â†’ invoice â†’ payment

Users & Security:
  â˜‘ User logins work correctly
  â˜‘ Access rights are preserved (spot-check 3-5 users)
```

## Best Practices

- âœ… **Do:** Always upgrade on a **copy of production** (staging) first â€” never the live instance.
- âœ… **Do:** Keep the old version running until the new version is **fully validated and signed off**.
- âœ… **Do:** Check OCA's migration status page: [OCA Migration Status](https://github.com/OCA/maintainer-tools/wiki/Migration-Status)
- âœ… **Do:** Use the [Odoo Upgrade Service](https://upgrade.odoo.com/) pre-analysis report to get a list of breaking changes **before writing any code**.
- âŒ **Don't:** Skip intermediate versions â€” Odoo requires sequential upgrades (v14â†’v15â†’v16â†’v17).
- âŒ **Don't:** Upgrade custom modules and Odoo core simultaneously â€” adapt Odoo core first, then fix custom modules.
- âŒ **Don't:** Run OpenUpgrade against production directly â€” always test on a staging copy first.

## Limitations

- Covers **v14â€“v17** only. Versions v13 and older have a fundamentally different module structure and require manual migration.
- **Enterprise-exclusive module changes** (e.g., `sign`, `account_accountant`) may have undocumented breaking changes not included in OpenUpgrade.
- The **Odoo.sh** automated upgrade path has a separate workflow (managed from the Odoo.sh dashboard) not covered here.
- OWL JavaScript component migration (legacy widget â†’ OWL v16+) is a complex front-end topic beyond the scope of this skill.

