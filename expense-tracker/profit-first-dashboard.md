# MyX Business Dashboard - UI Design Specifications

## Framework Foundation
Implements Profit First: Revenue → allocate Profit first, then Taxes, then Owner Pay; Operating Budget shows the constrained remainder for spending.

## 8-Card Layout Structure

### Card Arrangement
- Top Row (4): REVENUE, PROFIT (X%), TAXES (Y%), OWNER PAY (Z%)
- Bottom Row (4): OPERATING BUDGET (hero), CURRENT EXPENSES, GST, TAXES
- Time Selector: Day | Week | Month | Quarter | Year (docked above bottom nav)
- Bottom Navigation: MyX | Reports | Setup

## Visual Hierarchy Rules

### Hero Card: OPERATING BUDGET
- Largest primary number (no secondary line)
- ALL CAPS, centered title
- Purpose: hard spending constraint (e.g., “You have $1,920 to spend”)

### Standard Cards: All Others
- Primary number: current period value (large)
- Secondary text (below, smaller):
  - Hierarchical context for five cards:
    - Day → show Week underneath
    - Week → show Month underneath
    - Month → show Quarter underneath
    - Quarter → show Year underneath
    - Year → show All‑time underneath
  - Tax cycle context for GST and TAXES: “[Selected period]” on top; “[Filing cycle to date]” underneath
- Dual indicators: Color on number + status icon (see below)

## Time Context Logic

### Hierarchical Context (applies to 5 cards)
- REVENUE, PROFIT (X%), TAXES (Y%), OWNER PAY (Z%), CURRENT EXPENSES
- Secondary line shows the next-higher period total as above

### Tax Cycle Context (applies to 2 cards)
- GST
- TAXES
- Secondary line shows filing-cycle-to-date (cadence configured per org; e.g., NZ monthly/2‑monthly/6‑monthly, income tax annually)

### No Context (1 card)
- OPERATING BUDGET (hero): real-time Opex balance; no secondary line

## Dual Indicator System

### Color Coding (applies to the primary number)
- Green: allocation executed (transfers made into the relevant Profit/Tax/Owner Pay account)
- Grey: pending (no transfer executed yet)
- Red: still to be transferred (not an error state)

### Status Indicators (heroicons, not emojis)
- Level 5: CheckCircle (solid, green-600)
- Level 4: FaceSmile (solid, green-500)
- Level 3: FaceNeutral or InformationCircle (amber-500)
- Level 2: ExclamationTriangle (orange-500)
- Level 1: XCircle (red-600)

Note: Final status logic will compare allocation execution vs. targets (X/Y/Z). Until org setup exists, show a neutral placeholder icon.

## Card Content (intent)

### REVENUE
- Primary: current period inflows (bank inflows only; exclude owner top‑ups and internal transfers)
- Secondary: hierarchical context (e.g., “Quarter: $24,800”)

### OPERATING BUDGET (Hero)
- Primary: current Opex account balance (live)
- Secondary: none

### CURRENT EXPENSES
- Primary: total outflows in period (exclude transfers and tax payments)
- Secondary: hierarchical context

### GST / TAXES
- Primary: current period amount
- Secondary: filing cycle to date

### PROFIT (X%) / TAXES (Y%) / OWNER PAY (Z%)
- Targets configured per‑org (later, via Setup)
- Primary: current period value; color and status based on transfer execution vs intent (later)
- Secondary: hierarchical context

## Mobile-First Layout
- 8 cards in 2x4 grid
- ALL CAPS centered titles
- Sticky header (org name centered in 75% area; + Add Expense on right)
- Time selector docked just above bottom nav; bank update timestamp above selector

## Time Period Behavior
- Day | Week | Month | Quarter | Year control the period for calculations.
- Operating Budget always shows real-time Opex balance.

## Implementation Plan (UI first)
- Phase 1 (Now)
  - Style OPERATING BUDGET as hero (larger number, no secondary line)
  - Add secondary lines (placeholder numbers) for 5 hierarchical cards
  - Add secondary “Filing cycle: —” placeholders for GST/TAXES
  - Add neutral status icon placeholders (heroicons)
  - Keep color as neutral for now; Grey pending text
- Phase 2 (Setup + Backend)
  - Org Setup: targets X/Y/Z (toggle defaults), GST/tax cycles, account tagging (Opex/Profit/Tax/Owner)
  - Allocation execution recording (transfers)
  - Drive colors and status from actual state
  - Replace placeholders with real numbers