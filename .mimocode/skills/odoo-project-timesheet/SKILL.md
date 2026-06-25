---
name: odoo-project-timesheet
description: "Use when working with odoo-project-timesheet"
---

---
name: odoo-project-timesheet
description: "Expert guide for Odoo Project and Timesheets: task stages, billable time tracking, timesheet approval, budget alerts, and invoicing from timesheets."
risk: safe
source: "self"
---

# Odoo Project & Timesheet

## Overview

This skill helps you configure Odoo Project and Timesheets for service businesses, agencies, and consulting firms. It covers project setup with budgets, task stage management, employee timesheet logging, approval workflows, and converting approved timesheet hours to customer invoices.

## When to Use This Skill

- Setting up a new project with tasks, deadlines, and team assignments.
- Configuring billable vs. non-billable time tracking per project.
- Creating a timesheet approval workflow for managers.
- Invoicing customers based on logged hours (Time & Materials billing).

## How It Works

1. **Activate**: Mention `@odoo-project-timesheet` and describe your project or billing scenario.
2. **Configure**: Receive step-by-step setup instructions.
3. **Automate**: Get guidance on automatically generating invoices from approved timesheets.

## Examples

### Example 1: Create a Billable Project

```text
Menu: Project â†’ New Project (or the "+" button in Project view)

Name:     Website Redesign â€” Acme Corp
Customer: Acme Corporation
Billable: YES  (toggle ON)

Settings tab:
  Billing Type: Based on Timesheets (Time & Materials)
  Service Product: Consulting Hours ($150/hr)
  â˜‘ Timesheets
  â˜‘ Task Dependencies
  â˜‘ Subtasks

Budget:
  Planned Hours: 120 hours
  Budget Alert: at 80% (96 hrs) â†’ notify project manager
```

### Example 2: Log Time on a Task

```text
Method A â€” Directly inside the Task (recommended for accuracy):
  Open Task â†’ Timesheets tab â†’ Add a Line
  Employee:    John Doe
  Date:        Today
  Description: "Initial wireframes and site map" (required for clear invoices)
  Duration:    3:30  (3 hours 30 minutes)

Method B â€” Timesheets app (for end-of-day bulk entry):
  Menu: Timesheets â†’ My Timesheets â†’ New
  Project:  Website Redesign
  Task:     Wireframe Design
  Duration: 3:30
```

### Example 3: Enable Timesheet Approval Before Invoicing

```text
Menu: Timesheets â†’ Configuration â†’ Settings
  â˜‘ Timesheet Approval  (employees submit; managers approve)

Approval flow:
  1. Employee submits timesheet at week/month end
  2. Manager reviews: Timesheets â†’ Managers â†’ Timesheets to Approve
  3. Manager clicks "Approve" â†’ entries are locked and billable
  4. Only approved entries flow into the invoice

If Approval is disabled, all logged hours are immediately billable.
```

### Example 4: Invoice from Timesheets

```text
Step 1: Verify approved hours
  Menu: Timesheets â†’ Managers â†’ All Timesheets
  Filter: Billable = YES, Timesheet Invoice State = "To Invoice"

Step 2: Generate Invoice
  Menu: Sales â†’ Orders â†’ To Invoice â†’ Timesheets  (v15/v16)
  or:   Accounting â†’ Customers â†’ Invoiceable Time  (v17)
  Filter by Customer: Acme Corporation
  Select entries â†’ Create Invoices

Step 3: Invoice pre-populates with:
  Product: Consulting Hours
  Quantity: Sum of approved hours
  Unit Price: $150.00
  Total: Calculated automatically
```

## Best Practices

- âœ… **Do:** Enable **Timesheet Approval** so only manager-approved hours appear on customer invoices.
- âœ… **Do:** Set a **budget alert** at 80% of planned hours so PMs can intervene before overruns.
- âœ… **Do:** Require **timesheet descriptions** â€” vague entries like "Work done" on invoices destroy client trust.
- âœ… **Do:** Use **Subtasks** to break work into granular pieces while keeping the parent task on the Kanban board.
- âŒ **Don't:** Mix billable and internal projects without tagging â€” it corrupts profitability and utilization reports.
- âŒ **Don't:** Log time on the Project itself (without a Task) â€” it cannot be reported at the task level.

## Limitations

- **Timesheet Approval** is an Enterprise-only feature in some Odoo versions â€” verify your plan includes it.
- Does not cover **Project Forecast** (resource capacity planning) â€” that requires the Enterprise Forecast app.
- **Time & Materials** invoicing works well for hourly billing but is not suited for **fixed-price projects** â€” use milestones or manual invoice lines for those.
- Timesheet entries logged outside an active project-task pair (e.g., on internal projects) are not assignable to customer invoices without custom configuration.

