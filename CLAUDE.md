# MyX Project Context for Claude

## 🚨 CRITICAL DEVELOPMENT PHILOSOPHY

**UI-FIRST METHODOLOGY - DO NOT IGNORE THIS**

This project follows a strict UI-first development approach. DO NOT suggest database-first or backend-first development. Here's why:

### The Hard-Won Lesson
- Traditional "database-first" expert advice leads to AI agent architectural chaos
- AI agents with database access but no UI constraints create systems that don't match real user workflows  
- When the UI breaks, you know immediately - when the database is wrong, you might not discover it for weeks
- UI-first forces thinking like a user, not like a database designer

### The Correct Approach
1. **Build the UI experience first** (✅ COMPLETED - Phase 1)
2. **Let the UI define exact data requirements** (🔄 CURRENT PHASE)
3. **Implement only what the experience actually needs** (⏭️ NEXT PHASE)

**Never suggest architectural changes that aren't driven by UI requirements.**

---

## 📊 PROJECT STATUS: Phase 1 Complete ✅

### What's Built and Working
- ✅ **4 Dashboard System**: Business (Profit First) + Personal (Barefoot Investor) 
- ✅ **8-Card Executive Layouts**: Hero cards, status indicators, period toggles
- ✅ **Organization Switching**: Multi-org architecture with cookie-based state
- ✅ **Responsive UI Logic**: Conditional secondary lines, hierarchical context
- ✅ **Visual System**: Heroicons, dual indicators (status + trend), standardized sizing
- ✅ **Authentication Flow**: Supabase auth with email confirmation
- ✅ **Enterprise Security Foundation**: RLS policies, audit trails, secure functions

## 🎯 CURRENT STATUS: Phase 2 - Basic Compliance Dashboard

**Active Phase**: Phase 2 - Basic Dashboard  
**Current Focus**: Third & fourth dashboard option for users who just need expense tracking compliance  
**Next Milestone**: Core job dashboard without methodology complexity  

### Strategic Priority: Core-First Strategy
- **Core Job**: GST/tax compliance and legitimacy - "Be f*cking good at this"
- **Delighter Jobs**: Advanced financial frameworks (Profit First/Barefoot) - switchable features  
- **Target Market**: "Too small for QuickBooks" segment who need compliance without complexity

### Phase 2 Requirements
- [ ] Third & fourth dashboard option: Basic/Compliance (no methodology complexity)
- [ ] Core compliance metrics: Total expenses, GST, tax-deductible categories  
- [ ] Clean, simple UI for "just need to track expenses" users
- [ ] Focus on mainstream adoption before advanced financial frameworks

---

## 🎯 PRODUCT POSITIONING

**Brand**: MyX - "Find your X-factor in financial management"
**Vision**: "The expense tracker for the non-accountant who gets things done: in work, play, life"
**Core Value**: Show what you CAN spend (future-focused) not what you HAVE spent (reactive)

### Key Differentiators
1. **Dual Dashboard Approach**: Business (Profit First) + Personal (Barefoot Investor)
2. **Constraint-Based Budgeting**: Hero cards show spending limits, not historical totals
3. **Executive-Level Status**: Numbers + interpretation + actionable insights
4. **Multi-Organization Support**: Personal and business contexts in one app

### Target Market
- "Too small for QuickBooks" segment
- Small businesses, freelancers, contractors
- Multi-entity users (personal + business expenses)
- Primary market: New Zealand (GST compliance expertise)

---

## 🏗️ TECHNICAL ARCHITECTURE

### Current Stack
- **Frontend**: Next.js 15.5.0 with App Router, TypeScript, Tailwind CSS
- **UI**: shadcn/ui components, Heroicons for consistency
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Security**: Enterprise-grade multi-tenant with comprehensive audit trails

### Database Schema Status
- ✅ **Organizations**: Multi-org support implemented
- ✅ **User_organizations**: Junction table for multi-tenant access
- ✅ **Expenses**: Basic expense tracking ready
- ✅ **Audit_logs**: Comprehensive security and compliance logging
- 🔄 **Categories**: Predefined tax-deductible categories (Phase 2)
- 🔄 **Subscriptions**: Stripe integration (Future)

### Key Files Understanding
- `dashboard-content.tsx`: Business dashboard (Profit First 8-card layout)
- `personal-dashboard-content.tsx`: Personal dashboard (Barefoot Investor 8-card layout)  
- `enterprise-foundation.sql`: Secure multi-tenant database foundation
- `database.types.ts`: TypeScript interfaces for all database tables

---

## 📱 UI DESIGN SYSTEM (IMPLEMENTED)

### Dashboard Structure
**Business Dashboard (Profit First)**:
- **Top Row**: Revenue, Profit (X%), Taxes (Y%), Owner Pay (Z%)
- **Bottom Row**: Operating Budget (Hero), Current Expenses, GST, Taxes

**Personal Dashboard (Barefoot Investor)**:
- **Top Row**: Money In, Pay You First (A%), Kill Debt (B%), Big Bills (C%)  
- **Bottom Row**: Living Expenses (Hero), Fun Cash (D%), Rainy Day (E%), Big Wins

### Visual Hierarchy Rules
- **Hero Cards**: 3xl text, no secondary line (constraint numbers)
- **Standard Cards**: xl text, secondary context lines, dual indicators
- **Status Icons**: 5-level Heroicon system (CheckCircle → XCircle)
- **Trend Icons**: Custom flat trend icon positioned above status
- **Period Toggle**: Fixed positioning 72px from bottom, bank update 24px above

### Responsive Behavior  
- **Time Periods**: Day/Week/Month/Quarter/Year drive all calculations
- **Secondary Lines**: Hierarchical context (Day→Week, Week→Month, etc.)
- **Conditional Logic**: Hide certain secondary lines on Day view
- **Organization Context**: Everything switches based on selected organization

---

## 🗺️ DEVELOPMENT ROADMAP

### Phase 1: ✅ COMPLETED - Dashboard UI Foundation
- Dual dashboard system fully implemented
- Organization switching and period toggles working  
- Visual design system complete with Heroicons
- All UI interaction patterns established

### **Phase 2a: 🔄 Basic Personal Dashboard (Golden Standard)** *(Current)*
- [ ] Third dashboard option: **Basic (Personal)** constraint-first, methodology-agnostic
- [ ] Hero card: **Available to Spend**
- [ ] Context cards: **Income, Committed, Goals** (with trends + status icons)
- [ ] Activity Feed: live expense list (3 visible, scroll to 10; fed by bank + manual entries)
- [ ] Universal UI for users who just want the core job done brilliantly without frameworks

### Phase 2b: 🔄 CURRENT - Professional (Compliance) Dashboard
- [ ] Fourth dashboard option: Basic/Compliance (no methodology complexity)
- [ ] Core compliance metrics: Total expenses, GST, tax-deductible categories  
- [ ] Clean, simple UI for "just need to track expenses" users
- [ ] Focus on mainstream adoption before advanced financial frameworks
- **DO NOT CHANGE UI ARCHITECTURE - BUILD THE COMPLIANCE OPTION**

### Phase 3: Magic Expense Entry
- Receipt photo → instant categorization → one-tap save
- Smart categorization engine for tax compliance  
- Smooth UX that competitors can't match

### Phase 4: Organization Setup Foundation
- Setup pages for compliance requirements (tax rates, business details)
- Category management and customization
- Basic organization configuration

### Phase 5+: Bank Integration, Advanced Features
- ANZ bank integration (NZ market testing)
- Beautiful drill-down reports
- GST/tax compliance automation

---

## 🚨 WHAT NOT TO DO

### Never Suggest These Anti-Patterns
1. **Database schema changes** without UI requirements driving them
2. **"Best practice" architecture** that doesn't serve the actual user experience
3. **Backend-first development** - the UI is the source of truth for data needs
4. **Complex abstractions** before proving the simple case works
5. **Framework changes** - the current stack is working perfectly

### Always Remember
- The UI defines the data contracts, not the other way around
- Every database change must be justified by a specific UI interaction
- Placeholder data in working UI is better than "correct" data in broken architecture
- Users interact with UI, not databases - optimize accordingly

---

## 🎯 SUCCESS METRICS

### User Experience Validation
- Time to first expense < 2 minutes
- Organization switching < 3 taps  
- Expense entry < 30 seconds
- Dashboard provides immediate financial insight

### Business Model
- **Free tier**: 20 expenses/month, basic features
- **Pro tier**: Unlimited expenses, multiple organizations, priority support
- **Target**: Paying customers within 30 days via NZ/AU market

---

*This document ensures consistent understanding of the MyX project philosophy and current status. Always refer to this context before suggesting technical changes.*

**Last Updated**: August 28, 2025
**Current Phase**: Phase 2 - Data Integration (UI-driven backend implementation)