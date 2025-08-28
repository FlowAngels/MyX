MyX Personal Dashboard - UI Design Specifications
Framework Foundation

Implements universal personal finance principles with Harry-style naming. Compatible with Profit First, Barefoot Investor, and 50/30/20 methodologies through adjustable percentage sliders.
8-Card Layout Structure
Card Arrangement

    Top Row (4): MONEY IN, PAY YOU FIRST (A%), KILL DEBT (B%), BIG BILLS (C%)
    Bottom Row (4): LIVING EXPENSES (hero), FUN CASH (D%), RAINY DAY (E%), BIG WINS
    Time Selector: Day | Week | Month | Quarter | Year (docked above bottom nav)
    Bottom Navigation: MyX | Reports | Setup

Visual Hierarchy Rules
Hero Card: LIVING EXPENSES

    Largest primary number (no secondary line)
    ALL CAPS, centered title
    Purpose: spending constraint - what's left for essential living expenses

Standard Cards: All Others

    Primary number: current period value (large)
    Secondary text (below, smaller): Hierarchical context or status info
    Dual indicators: Color on number + status icon

Time Context Logic
Hierarchical Context (applies to 4 cards)

    MONEY IN, PAY YOU FIRST (A%), KILL DEBT (B%), FUN CASH (D%)
    Secondary line shows the next-higher period total

Status Context (applies to 3 cards)

    BIG BILLS (C%): Current allocation with "Avg: $XXX / $XXX"
    RAINY DAY (E%): Goal progress with "Goal: $X,XXX / $Y,YYY"
    BIG WINS: Goal progress with "Goal: $X,XXX / $Y,YYY"

No Context (1 card)

    LIVING EXPENSES (hero): current available budget for essentials; no secondary line

Dual Indicator System
Color Coding (applies to the primary number)

    Green: allocation executed (money moved to proper accounts/investments)
    Grey: pending (allocation not executed yet)
    Red: overdue allocation (creates urgency)

Status Indicators (heroicons)

    Level 5: CheckCircle (solid, green-600) - exceeding targets
    Level 4: FaceSmile (solid, green-500) - meeting targets
    Level 3: InformationCircle (amber-500) - acceptable progress
    Level 2: ExclamationTriangle (orange-500) - below target
    Level 1: XCircle (red-600) - significant issues

Card Content
MONEY IN

    Primary: current period income (salary, benefits, side income)
    Secondary: hierarchical context

PAY YOU FIRST (A%)

    Primary: current period allocation to wealth building (2%-20%+ range)
    Secondary: hierarchical context + "Total: $X,XXX invested"

KILL DEBT (B%)

    Primary: current period debt payments
    Secondary: hierarchical context + "Remaining: $X,XXX total debt"

BIG BILLS (C%)

    Primary: current period allocation for irregular expenses (responsive to timeframe)
    Secondary: "Avg: $XXX / $XXX" (12-month average vs planned monthly)

LIVING EXPENSES (Hero)

    Primary: available budget for essential living expenses
    Secondary: none

FUN CASH (D%)

    Primary: current period guilt-free spending allocation
    Secondary: hierarchical context + "Available: $XXX"

RAINY DAY (E%)

    Primary: current period allocation to emergency fund
    Secondary: "Goal: $X,XXX / $Y,YYY"

BIG WINS

    Primary: current period allocation to medium-term goals
    Secondary: "Goal: $X,XXX / $Y,YYY"

Mobile-First Layout

    8 cards in 2x4 grid (same as business dashboard)
    ALL CAPS centered titles
    Sticky header (personal account name; + Add Expense on right)
    Time selector docked just above bottom nav

Personal vs Business Differences
Universal Language Structure

    8 cards with Harry-style naming (no methodology jargon)
    Separates debt elimination from irregular bills
    Flexible percentage sliders accommodate any framework
    Focus on momentum (top row) vs foundation (bottom row)

Different Psychology

    Investments = building personal wealth (not business profit extraction)
    Emergency Fund = financial security (not tax obligations)
    Living Expenses = household constraint (not business operations)
    More permission-based language ("Fun & Play" vs "Owner Pay")

Implementation Plan (UI first)

    Phase 1 (Now)
        Style LIVING EXPENSES as hero (larger number, no secondary line)
        Add secondary lines with placeholder numbers for 5 cards
        Add neutral status icon placeholders (heroicons)
        Keep colors neutral initially
    Phase 2 (Personal Setup + Backend)
        Personal financial setup: emergency fund goals, investment targets
        Track personal allocations and transfers
        Drive colors and status from actual execution
        Replace placeholders with real calculations

Time Period Behavior

    Day | Week | Month | Quarter | Year control period calculations
    Living Expenses always shows current available budget
    Percentages apply to whatever income period is selected (daily, weekly, monthly income)

