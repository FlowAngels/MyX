# 📘 MyX Books Cockpit — 8 Card Overview (Updated)

This document explains to a new team member or contributor what the **Books Cockpit** is in MyX, how it is set up, and provides a prompt for Claude Code to implement it.

---

## 🎯 Purpose
The **Books Cockpit** is the compliance-focused dashboard in MyX. It ensures a small business owner can see at a glance whether they are **safe to file GST/tax** and what steps remain to be compliant.

It is **not** a full accounting suite. It is a **cockpit**: one screen, eight cards, each showing a decisive value with a status icon. Either things are in order, or they are not.

---

## 🧩 Structure — The 8 Cards

### 🔝 Hero Layer
1. **Cycle Timer → Share**  
   - Shows days left until the current GST/tax filing deadline.  
   - Morphs into a **Share now** button once compliance is achieved (Card 2 = ✅).  
   - Tap (when ready): generates Share Package (PDF summary + CSV transactions).

2. **Compliance Status**  
   - Binary: ✅ Compliant / ❌ Not Compliant.  
   - Driven by Cards 3–7.  
   - Subtext lists blockers when ❌ (e.g., "Pending: Bank/Recon, Deductibles").  
   - Uses the MyX DNA **status icon** slot for verdict (not a giant tick/cross as primary).

---

### ✅ Gauge Layer (Inputs → Feed Compliance)

3. **Bank & Reconciliation Health**  
   - ✅ “All accounts synced & reconciled”  
   - ❌ “1 account stale • 5 unreconciled”  
   - Sub: cycle tag or “Last sync 2h ago.”  
   - Tap: unified queue for feeds + reconciliations.

4. **Ledger Balance Check**  
   - ✅ “Ledger = Bank”  
   - ❌ “Mismatch $420”  
   - Sub: “Last check today.”  
   - Tap: balance check detail.

5. **Deductibles Split**  
   - Primary: “Deductible $12,500 • Non-deductible $1,800”  
   - Secondary: “87% deductible this cycle”  
   - Status: ✅ if all categorised / ❌ if uncategorised remain.  
   - Tap: categorisation queue.

6. **GST Position**  
   - Primary: “Payable $2,410” / “Refund $780”  
   - Secondary: “Cycle to date”  
   - Status: ✅ if calculation final / ❌ if inputs missing.  
   - Tap: GST detail screen.

7. **Tax Provision**  
   - Primary: “Provision $6,800 (YTD)”  
   - Secondary: “FY 2025”  
   - Status: ✅ if current / ❌ if data incomplete.  
   - Tap: tax detail screen.

---

### 📜 Proof Layer

8. **Activity Feed**  
   - Primary: last 3 transactions (Merchant • Amount • Timestamp).  
   - Secondary: scroll for up to 10.  
   - Purpose: proof-of-life.  
   - No status icon (it’s live feed, not a gauge).

---

## 🔑 Key Behaviors
- Card 2 (Compliance Status) = ✅ only when Cards 3–7 are ✅.  
- When Card 2 = ✅ → Card 1 morphs to **Share now**.  
- Cards 6–7 remain greyed until Cards 3–5 are ✅.  
- Each input card shows a **value + context line + status icon** (MyX DNA).  
- Activity feed always visible under the grid.

---

## 🛠 Claude Code Prompt (Build Task)

# GOAL
Implement the **Books Cockpit (8-card compliance dashboard)** inside the new `BooksDashboard` screen. Use existing card UI patterns. No new libraries.

# GUARDRAILS
- STOP if file paths differ; print actual ones.
- Use Heroicons already in project.
- Follow MyX brand DNA (hero card + context cards + activity feed).
- Minimal placeholders for now; logic wires later.

# IMPLEMENTATION
- Create `screens/BooksDashboard.tsx`.
- Layout:
  - **Top row:**
    - Card 1: Cycle Timer → Share (placeholder states)
    - Card 2: Compliance Status (binary ✅ / ❌ via status icon)
  - **Second row:**
    - Card 3: Bank & Reconciliation Health
    - Card 4: Ledger Balance Check
    - Card 5: Deductibles Split
    - Card 6: GST Position
    - Card 7: Tax Provision
  - **Third row:**
    - Card 8: Activity Feed (3-item placeholder list)

- Add routing for `/books` → BooksDashboard.
- Bottom nav already has **Books** tab (book-open Heroicon) → ensure it points here.

# ACCEPTANCE CRITERIA
- BooksDashboard loads via Books tab.
- All 8 cards render with placeholder content (values + secondary lines + status icons).
- Card 1 morph rule noted in placeholder text.
- Card 2 binary placeholder (✅ / ❌ via status icon).
- Cards 3–7 show correct titles as per spec.
- Activity Feed visible below cards.

# COMMIT MESSAGE
feat(books): add 8-card Books Cockpit dashboard shell with placeholders

---

## 📌 Summary
- **Books Cockpit** = compliance cockpit for small businesses.  
- **8 cards** answer the 4 burning questions (time, reconciliation, legitimacy, obligations).  
- MVP implementation begins with placeholders for all 8 cards.  
- Logic and data wiring come later.
