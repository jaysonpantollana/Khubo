---
name: odoo-inventory-optimizer
description: "Use when working with odoo-inventory-optimizer"
---

---
name: odoo-inventory-optimizer
description: "Expert guide for Odoo Inventory: stock valuation (FIFO/AVCO), reordering rules, putaway strategies, routes, and multi-warehouse configuration."
risk: safe
source: "self"
---

# Odoo Inventory Optimizer

## Overview

This skill helps you configure and optimize Odoo Inventory for accuracy, efficiency, and traceability. It covers stock valuation methods, reordering rules, putaway strategies, warehouse routes, and multi-step flows (receive â†’ quality â†’ store).

## When to Use This Skill

- Choosing and configuring FIFO vs AVCO stock valuation.
- Setting up minimum stock reordering rules to avoid stockouts.
- Designing a multi-step warehouse flow (2-step receipt, 3-step delivery).
- Configuring putaway rules to direct products to specific storage locations.
- Troubleshooting negative stock, incorrect valuation, or missing moves.

## How It Works

1. **Activate**: Mention `@odoo-inventory-optimizer` and describe your warehouse scenario.
2. **Configure**: Receive step-by-step configuration instructions with exact Odoo menu paths.
3. **Optimize**: Get recommendations for reordering rules and stock accuracy improvements.

## Examples

### Example 1: Enable FIFO Stock Valuation

```text
Menu: Inventory â†’ Configuration â†’ Settings

Enable: Storage Locations
Enable: Multi-Step Routes
Costing Method: (set per Product Category, not globally)

Menu: Inventory â†’ Configuration â†’ Product Categories â†’ Edit

  Category: All / Physical Goods
  Costing Method: First In First Out (FIFO)
  Inventory Valuation: Automated
  Account Stock Valuation: [Balance Sheet inventory account]
  Account Stock Input:   [Stock Received Not Billed]
  Account Stock Output:  [Stock Delivered Not Invoiced]
```

### Example 2: Set Up a Min/Max Reordering Rule

```text
Menu: Inventory â†’ Operations â†’ Replenishment â†’ New

Product: Office Paper A4
Location: WH/Stock
Min Qty: 100   (trigger reorder when stock falls below this)
Max Qty: 500   (purchase up to this quantity)
Multiple Qty: 50  (always order in multiples of 50)
Route: Buy    (triggers a Purchase Order automatically)
       or Manufacture (triggers a Manufacturing Order)
```

### Example 3: Configure Putaway Rules

```text
Menu: Inventory â†’ Configuration â†’ Putaway Rules â†’ New

Purpose: Direct products from WH/Input to specific bin locations

Rules:
  Product Category: Refrigerated Goods
    â†’ Location: WH/Stock/Cold Storage

  Product: Laptop Model X
    â†’ Location: WH/Stock/Electronics/Shelf A

  (leave Product blank to apply the rule to an entire category)

Result: When a receipt is validated, Odoo automatically suggests
the correct destination location per product or category.
```

### Example 4: Configure 3-Step Warehouse Delivery

```text
Menu: Inventory â†’ Configuration â†’ Warehouses â†’ [Your Warehouse]

Outgoing Shipments: Pick + Pack + Ship (3 steps)

Operations created automatically:
  PICK  â€” Move goods from storage shelf to packing area
  PACK  â€” Package items and print shipping label
  OUT   â€” Hand off to carrier / mark as shipped
```

## Best Practices

- âœ… **Do:** Use **Lots/Serial Numbers** for high-value or regulated items (medical devices, electronics).
- âœ… **Do:** Run a **physical inventory adjustment** at least quarterly (Inventory â†’ Operations â†’ Physical Inventory) to correct drift.
- âœ… **Do:** Set reordering rules on fast-moving items so purchase orders are generated automatically.
- âœ… **Do:** Enable **Putaway Rules** on warehouses with multiple storage zones â€” it eliminates manual location selection errors.
- âŒ **Don't:** Switch stock valuation method (FIFO â†” AVCO) after recording transactions â€” it produces incorrect historical cost data.
- âŒ **Don't:** Use "Update Quantity" to fix stock errors â€” always use Inventory Adjustments to maintain a proper audit trail.
- âŒ **Don't:** Mix product categories with different costing methods in the same storage location without understanding the valuation impact.

## Limitations

- **Serial number tracking** at the individual unit level (SN per line) adds significant UI overhead; test performance with large volumes before enabling.
- Does not cover **landed costs** (import duties, freight allocation to product cost) â€” that requires the `stock_landed_costs` module.
- **Cross-warehouse stock transfers** have routing complexities (transit locations, intercompany invoicing) not fully covered here.
- Automated inventory valuation requires the **Accounting** module; Community Edition installations without it cannot post stock journal entries.

