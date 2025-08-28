# Claude Code Prompt: Implement MyX Basic Dashboard

## Role
You are my implementation agent inside a Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + heroicons project. Follow MyX’s established UI DNA exactly (header layout, time selector placement, card styling, icon set, color semantics). Do not introduce new patterns, copy, or components beyond what is specified here.

## Goal
Create the **Basic Personal (Golden Standard) Dashboard** view for the MyBiz named **“Basic”**, per our spec. This is a 4-card dashboard + activity feed, constraint-first.

## Source of truth (spec excerpt)
- Cards:
  - **AVAILABLE TO SPEND (Hero)** — NO secondary line, NO trend.
  - **INCOME** — secondary = hierarchical context (next horizon), trend arrow (% vs prior period), status icon (dual indicator system).
  - **COMMITTED** — secondary = “Planned $X / Actual $Y”, trend arrow, status icon.
  - **GOALS** — secondary = “Target $X / Actual $Y” (or “On Track / Behind”), trend arrow, status icon.
- **Activity Feed** (mandatory): shows 3 most recent by default; the card is scrollable to reveal up to the latest 10 transactions. Line format: Merchant – Amount – Relative timestamp. MyX minimal list styling (no icons/colors).
- Header: Pocket/Org name centered (uses active MyBiz name), **+ Add Expense** button on right. No “Welcome back” copy.
- Time selector: Day | Week | Month | Quarter | Year, docked above bottom nav (reuse the existing MyX time selector).
- Bottom nav: MyX | Reports | Setup (unchanged).
- Indicators (reuse MyX DNA):
  - **Colors**: green/grey/red on primary number only.
  - **Heroicons**: CheckCircle (green-600), FaceSmile (green-500), FaceNeutral / InformationCircle (amber-500), ExclamationTriangle (orange-500), XCircle (red-600).
- Trend arrows only on **INCOME, COMMITTED, GOALS** (↗/↘ % vs prior period). Not on hero or feed.

## Constraints & NON-goals
- Do NOT add quick action rows, banners, or conversational headers.
- Do NOT change bottom nav, time selector position, or header layout.
- Do NOT introduce new iconography or color semantics.
- Do NOT add categories/tags in the activity feed.

## Files to create/update (proposed)
- `app/(authenticated)/myx/basic/page.tsx`  ← new route for the Basic MyBiz mock.
- `components/myx/basic/AvailableToSpendHero.tsx`
- `components/myx/basic/ContextCard.tsx`
- `components/myx/basic/ActivityFeedCard.tsx`
- `lib/myx/basic/types.ts`
- `lib/myx/basic/mockData.ts` ← temporary mocked data; wire to real data later.
- Reuse existing: Header (org name + Add Expense), TimeSelector, BottomNav, card shell styles, typography tokens.

## Data model (mock for now)
Create minimal typed interfaces in `lib/myx/basic/types.ts`:

```ts
export type Period = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface IncomeKPI {
  value: number;
  nextHorizon: { label: string; value: number };
  trendPct?: number;
  status: 1|2|3|4|5;
}

export interface CommittedKPI {
  actual: number;
  planned: number;
  trendPct?: number;
  status: 1|2|3|4|5;
}

export interface GoalsKPI {
  actual: number;
  target: number;
  trendPct?: number;
  status: 1|2|3|4|5;
}

export interface AvailableToSpend {
  value: number;
}

export interface ActivityItem {
  merchant: string;
  amount: number;
  occurredAt: string;
}

export interface BasicDashboardData {
  period: Period;
  orgName: string;
  available: AvailableToSpend;
  income: IncomeKPI;
  committed: CommittedKPI;
  goals: GoalsKPI;
  activity: ActivityItem[];
  lastBankSyncIso?: string;
}
```

Provide a `lib/myx/basic/mockData.ts` with realistic placeholder values covering all periods, including at least 10 activity items.

## Components (behavioral requirements)

### AvailableToSpendHero.tsx
- Props: `{ value: number }`.
- Renders ALL-CAPS title “AVAILABLE TO SPEND”.
- Large primary $ number; **no** secondary line, **no** trend, **no** status icon.
- Apply MyX hero card styling (same scale as Business “OPERATING BUDGET”).
- Color: neutral grey for now.

### ContextCard.tsx
- Props shape to support INCOME, COMMITTED, GOALS.
- Rendering rules:
  - Always show large primary currency.
  - Secondary line:
    - INCOME → hierarchical context
    - COMMITTED → Planned vs Actual
    - GOALS → Target vs Actual (or On Track / Behind)
  - Trend arrow: show if defined, green up if >0, red down if <0, grey if 0.
  - Status icon: map statusLevel to heroicon+color.

### ActivityFeedCard.tsx
- Props: `{ items: ActivityItem[] }`
- Shows 3 items visible, scroll to reveal up to 10.
- Format: Merchant – $Amount – RelativeTime.
- No icons, no categories, no colors.
- No “View All” inside card.

## Page assembly (page.tsx)
- Read from `mockData.ts` for now.
- Layout:
  - Header (org/pocket name + Add Expense)
  - Time selector (reuse existing)
  - Row 1: AvailableToSpendHero
  - Row 2: 3 ContextCards
  - Row 3: ActivityFeedCard
  - Bottom nav (reuse existing).

## Styling & accessibility
- Use Tailwind + shadcn/ui as per MyX DNA.
- Currency formatting: reuse existing formatter util (or add `formatCurrency`).
- Relative time: reuse existing util (or stub).

## Deliverables
- New route with page assembled.
- Three components with props as specified.
- Types + mock data files.
- No changes outside this scope.

## After implementation
Report back with:
- List of files created/updated.
- Any imports reused from existing MyX components.
- Screenshot note of rendered page to confirm layout.
