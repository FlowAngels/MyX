# MyX Basic Personal Dashboard – UI Design Specifications

## Framework Foundation
Implements the “Golden Standard” approach: Available to Spend = Income − Committed − Goals.  
Emphasis is on forward-looking constraint visibility, not backward reporting.

---

## Layout Structure

### Card Arrangement
- **Hero Card (1):** AVAILABLE TO SPEND
- **Context Cards (3):** INCOME, COMMITTED, GOALS
- **Activity Feed (1):**
  - **Placement:** Always beneath the 4 cards (Hero + 3 context).
  - **Default view:** 3 most recent expenses visible.
  - **Scroll behavior:** Card scroll reveals up to the last 10 transactions.
  - **Line format:** Merchant – Amount – Timestamp (relative: “2h ago,” “Yesterday”).
  - **Styling:** MyX minimal list (no icons, no categories, no colors).
  - **Purpose:** Proof-of-life + trust anchor → connects the abstract cards with the tangible daily flow.

**The Activity Feed has two feeding pipes, both already consistent with MyX DNA:**

- **Bank Feeds (primary source)**
  - Live imports of transactions from connected bank accounts.
  - What shows up: merchant name, amount, timestamp.
  - What doesn’t show: internal transfers, duplicate categorisation clutter.
  - **Purpose:** Proof-of-life → user sees their actual bank spend flow through.

- **Manual Expense Input (secondary source)**
  - Triggered via **+ Add Expense** in the header.
  - User can add cash transactions, one-off items, or things not captured in the bank feed.
  - These appear in the same Activity Feed list, styled consistently.

### Time Selector
Day | Week | Month | Quarter | Year (docked above bottom nav)

### Bottom Navigation
MyX | Reports | Setup

### Header
- Pocket/Org name centered (75% area)
- **+ Add Expense** button on right
- No “Welcome back” or conversational copy

---

## Visual Hierarchy Rules

### Hero Card: AVAILABLE TO SPEND
- Largest primary number (no secondary line)
- ALL CAPS, centered title
- Purpose: forward-looking constraint → “You have $1,247 left this month”

### Context Cards: INCOME, COMMITTED, GOALS
- Primary number: current period value (large)
- Secondary line (smaller text, beneath primary):
  - **INCOME:** hierarchical context (e.g. “Month: $3,200”)
  - **COMMITTED:** “Planned $X / Actual $Y”
  - **GOALS:** “Target $X / Actual $Y” or simple “On Track / Behind”
- **Trend:** All three context cards show trend arrows (↗/↘ % vs prior period) to reveal directionality.
- **Status Icon:** All three context cards use the dual indicator system (Heroicons + color coding).

---

## Time Context Logic

### Hierarchical Context
- Applies to **INCOME** → shows the next-higher period total
  - Day → Week
  - Week → Month
  - Month → Quarter
  - Quarter → Year
  - Year → All-time

### Constraint Context
- **COMMITTED** → Planned vs Actual
- **GOALS** → Target vs Actual

### No Context
- **AVAILABLE TO SPEND** (hero)

---

## Dual Indicator System

### Color Coding (applies to the primary number)
- Green: execution aligned / positive state
- Grey: pending / neutral
- Red: constraint breached / behind plan

### Status Indicators (Heroicons, consistent with Business spec)
- Level 5: CheckCircle (solid, green-600)
- Level 4: FaceSmile (solid, green-500)
- Level 3: FaceNeutral or InformationCircle (amber-500)
- Level 2: ExclamationTriangle (orange-500)
- Level 1: XCircle (red-600)

---

## Card Content (Intent)

### AVAILABLE TO SPEND (Hero)
- Primary: constraint balance (Income − Committed − Goals) for current timeframe
- Secondary: none

### INCOME
- Primary: inflows this period
- Secondary: hierarchical context
- **Trend:** Show trend arrow (↗/↘ % vs prior period)
- **Status Icon:** Use dual indicator system (Heroicons, color-coded)

### COMMITTED
- Primary: bills & must-haves this period
- Secondary: “Planned $X / Actual $Y”
- **Trend:** Show trend arrow (↗/↘ % vs prior period to detect creep)
- **Status Icon:** Use dual indicator system (Heroicons, color-coded)

### GOALS
- Primary: contributions to savings, investments, or debt
- Secondary: “Target $X / Actual $Y” (or On Track / Behind)
- **Trend:** Show trend arrow (↗/↘ % vs prior period to monitor consistency)
- **Status Icon:** Use dual indicator system (Heroicons, color-coded)

### Recent Activity (Activity Feed)
- Appears below cards in MyX list styling
- Shows last 3 transactions visible by default, scroll for up to 10
- Merchant, amount, timestamp per entry
- Purpose: confirmation that system is live and accurate
- No “Quick Actions” block — actions remain in header

---

## Mobile-First Layout
- Hero card (Available to Spend) at top
- 3 context cards in 2×2 grid beneath
- Activity Feed below cards
- Sticky header (Pocket name + Add Expense)
- Time selector docked above bottom nav

---

## Time Period Behavior
- Day | Week | Month | Quarter | Year control period for Income, Committed, Goals
- Available to Spend always reflects real-time constraint for selected period

---

## Implementation Plan (UI First)

### Phase 1 (Now)
- Style **AVAILABLE TO SPEND** as hero (larger primary number, no secondary line)
- Add secondary lines for **INCOME** (hierarchical), **COMMITTED** (planned vs actual), **GOALS** (target vs actual)
- Add neutral status icon placeholders (Heroicons)
- Add trend arrow placeholders (↗/↘) on INCOME, COMMITTED, GOALS
- Keep color neutral (grey) until backend links exist

### Phase 2 (Setup + Backend)
- Setup: define recurring Committed obligations and Goal targets
- Integrate bank feeds for Income inflows and expense categorization
- Drive colors, status icons, and trends from actual data vs planned constraints
