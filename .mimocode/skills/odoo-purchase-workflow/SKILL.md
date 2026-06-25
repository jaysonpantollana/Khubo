---
name: odoo-purchase-workflow
description: "Use when working with odoo-purchase-workflow"
---

---
name: odoo-purchase-workflow
description: "Expert guide for Odoo Purchase: RFQ â†’ PO â†’ Receipt â†’ Vendor Bill workflow, purchase agreements, vendor price lists, and 3-way matching."
risk: safe
source: "self"
---

# Odoo Purchase Workflow

## Overview

This skill guides you through the complete Odoo Purchase workflow â€” from sending a Request for Quotation (RFQ) to receiving goods and matching the vendor bill. It also covers purchase agreements, vendor price lists on products, automated reordering, and 3-way matching controls.

## When to Use This Skill

- Setting up the purchase flow for a new Odoo instance.
- Implementing purchase order approval workflows (2-level approval).
- Configuring vendor price lists with quantity-based discounts.
- Troubleshooting billing/receipt mismatches in 3-way matching.

## How It Works

1. **Activate**: Mention `@odoo-purchase-workflow` and describe your purchasing scenario.
2. **Configure**: Receive exact Odoo menu paths and field-by-field configuration.
3. **Troubleshoot**: Describe a billing or receiving issue and get a root cause diagnosis.

## Examples

### Example 1: Standard RFQ â†’ PO â†’ Receipt â†’ Bill Flow

```text
Step 1: Create RFQ
  Menu: Purchase â†’ Orders â†’ Requests for Quotation â†’ New
  Vendor: Acme Supplies
  Add product lines with quantity and unit price

Step 2: Send RFQ to Vendor
  Click "Send by Email" â†’ Vendor receives PDF with RFQ details

Step 3: Confirm as Purchase Order
  Click "Confirm Order" â†’ Status changes to "Purchase Order"

Step 4: Receive Goods
  Click "Receive Products" â†’ Validate received quantities
  (partial receipts are supported; PO stays open for remaining qty)

Step 5: Match Vendor Bill (3-Way Match)
  Click "Create Bill" â†’ Bill pre-filled from PO quantities
  Verify: PO qty = Received qty = Billed qty
  Post Bill â†’ Register Payment
```

### Example 2: Enable 2-Level Purchase Approval

```text
Menu: Purchase â†’ Configuration â†’ Settings

Purchase Order Approval:
  â˜‘ Purchase Order Approval
  Minimum Order Amount: $5,000

Result:
  Orders â‰¤ $5,000  â†’ Confirm directly to PO
  Orders > $5,000  â†’ Status: "Waiting for Approval"
                     A purchase manager must click "Approve"
```

### Example 3: Vendor Price List (Quantity Breaks on a Product)

```text
Vendor price lists are configured per product, not as a global menu.

Menu: Inventory â†’ Products â†’ [Select Product] â†’ Purchase Tab
  â†’ Vendor Pricelist section â†’ Add a line

Vendor: Acme Supplies
Currency: USD
Price:    $12.00
Min. Qty: 1

Add another line for quantity discount:
Min. Qty: 100 â†’ Price: $10.50   (12.5% discount)
Min. Qty: 500 â†’ Price:  $9.00   (25% discount)

Result: Odoo automatically selects the right price on a PO
based on the ordered quantity for this vendor.
```

## Best Practices

- âœ… **Do:** Enable **Purchase Order Approval** for orders above your company's approval threshold.
- âœ… **Do:** Use **Purchase Agreements (Blanket Orders)** for recurring vendors with pre-negotiated annual contracts.
- âœ… **Do:** Set a **vendor lead time** on products (Purchase tab) so Odoo can schedule arrival dates accurately.
- âœ… **Do:** Set the **Bill Control** policy to "Based on received quantities" (not ordered qty) for accurate 3-way matching.
- âŒ **Don't:** Confirm a PO before prices are agreed â€” use Draft/RFQ status to negotiate first.
- âŒ **Don't:** Post a vendor bill without linking it to a receipt â€” bypassing 3-way matching creates accounting discrepancies.
- âŒ **Don't:** Delete a PO that has received quantities â€” archive it instead to preserve the stock and accounting trail.

## Limitations

- Does not cover **subcontracting purchase flows** â€” those require the Manufacturing module and subcontracting BoM type.
- **EDI-based order exchange** (automated PO import/export) requires custom integration â€” use `@odoo-edi-connector` for that.
- Vendor pricelist currency conversion depends on the active **currency rate** in Odoo; rates must be kept current for accuracy.
- The **2-level approval** is a binary threshold; more complex approval matrices (department-based, multi-tier) require custom development or the Approvals app.

