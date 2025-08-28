# MyX - Financial Automation System

> "Find your X-factor in financial management"

MyX is a financial automation system designed for small businesses, freelancers, and contractors who need expense tracking without the complexity of traditional accounting software. Built with the Profit First methodology in mind, MyX focuses on showing what you CAN spend rather than just tracking what you spent.

## 🎯 Vision

**"The expense tracker for the non-accountant who gets things done: in work, play, life."**

MyX transforms financial management from reactive record-keeping to proactive cash flow optimization using the proven Profit First approach: `Revenue - Profit = Expenses` (not the traditional `Revenue - Expenses = Profit`).

## ✨ Key Features

- **Dual Dashboard System**: Business (Profit First) + Personal (Barefoot Investor) financial management
- **8-Card Executive Layout**: Automated allocations (top row) + Responsive management (bottom row)
- **Multi-Entity Management**: Organization switching between personal and business contexts
- **Smart Indicators**: Dual indicator system with status icons and trend tracking
- **Period Flexibility**: Day/Week/Month/Quarter/Year time period selection
- **Receipt Processing**: AI-powered OCR for automatic expense capture *(future)*
- **GST/Tax Automation**: Automatic tax calculations for NZ, AU, UK, and US *(future)*
- **Mobile-First Design**: Bottom navigation with context-aware switching

## 🛠 Tech Stack

- **Frontend**: Next.js 15.5.0 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Heroicons
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod validation *(future)*
- **Charts**: Recharts for data visualization *(future)*
- **AI/OCR**: OpenAI Vision API for receipt processing *(future)*
- **Payments**: Stripe for subscriptions *(future)*

## 🏗 Current Architecture

### Database Schema
- **Organizations**: Multi-org support for personal and business contexts
- **Expenses**: Complete expense tracking with receipt storage *(future)*
- **Categories**: Pre-seeded tax-deductible categories *(future)*
- **Subscriptions**: Stripe integration for billing *(future)*

### Security
- Row Level Security (RLS) policies
- Supabase Auth with email confirmation
- Organization-based data isolation

## 📊 Dashboard Design

### Dual Dashboard System ✅ IMPLEMENTED

#### **Business Dashboard (Profit First Philosophy)**
**Top Row - Automated Allocations:**
- **REVENUE** - Current period inflows with hierarchical context
- **PROFIT (X%)** - Profit allocation with hierarchical context
- **TAXES (Y%)** - Tax allocation with hierarchical context
- **OWNER PAY (Z%)** - Owner compensation with average vs target format

**Bottom Row - Responsive Management:**
- **OPERATING BUDGET** (Hero) - Real-time spending constraint
- **CURRENT EXPENSES** - Period expenses with hierarchical context
- **GST** - GST obligations with tax cycle context
- **TAXES** - Tax obligations with tax cycle context

#### **Personal Dashboard (Barefoot Investor Philosophy)**
**Top Row - Automated Allocations:**
- **MONEY IN** - Current period income with hierarchical context
- **PAY YOU FIRST (A%)** - Wealth building with hierarchical context
- **KILL DEBT (B%)** - Debt payments with hierarchical context
- **BIG BILLS (C%)** - Irregular expenses with average vs target format

**Bottom Row - Responsive Management:**
- **LIVING EXPENSES** (Hero) - Available spending budget
- **FUN CASH (D%)** - Guilt-free spending with hierarchical context
- **RAINY DAY (E%)** - Emergency fund with goal progress format
- **BIG WINS** - Medium-term goals with goal progress format

### Implemented Features ✅

#### **Visual System**
- **Hero Cards**: Larger display for constraint numbers (Operating Budget / Living Expenses)
- **Status Icons**: 5-level Heroicon system (CheckCircle → XCircle)
- **Trend Indicators**: Custom heroicon for flat trends, positioned above status
- **Standardized Sizing**: All icons w-5 h-5 with consistent positioning

#### **Context-Aware Behavior**
- **Time Period Integration**: Day/Week/Month/Quarter/Year selector with responsive context
- **Secondary Lines**: Hierarchical context, average vs target, goal progress formats
- **Conditional Display**: Smart hiding of secondary lines on Day view for target comparison cards
- **Organization Switching**: Dropdown UI with green checkmark for active selection

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key (for future receipt processing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/FlowAngels/MyX.git
cd MyX/expense-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` *(future)*

4. **Database setup**
```bash
# Run the schema setup in your Supabase project
psql -f enterprise-foundation.sql
```

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🎯 Current Status: Phase 1 Complete ✅

**Phase**: Dashboard UI Implementation Complete - Ready for Data Integration

### ✅ Phase 1 Completed
- ✅ Dual dashboard system (Business + Personal) implemented
- ✅ 8-card layout with Profit First + Barefoot Investor methodologies
- ✅ Organization switching with dropdown UI
- ✅ Heroicon integration with dual indicator system
- ✅ Period toggles (Day/Week/Month/Quarter/Year) with responsive positioning
- ✅ Context-aware secondary lines with conditional logic
- ✅ Organization creation via API routes

### 🎯 Phase 2 Priorities (Data Integration)
1. Connect dashboards to real expense data
2. Implement expense entry functionality  
3. Add financial framework setup (allocation percentages)
4. Build calculation engine for dashboard metrics
5. Implement receipt upload and processing

### 🔮 Future Phases
- **Phase 3**: Multi-user organization support
- **Phase 4**: Bank integration, advanced reporting, automation features

## 📚 Documentation

- **[Exploration Notes](expense-tracker/EXPLORATION_NOTES.md)** - Complete strategic context, decision history, and roadmap
- **[Business Dashboard Specs](expense-tracker/profit-first-dashboard.md)** - Profit First implementation details
- **[Personal Dashboard Specs](expense-tracker/barefoot-investor-dashboard)** - Barefoot Investor implementation details
- **[Current Project Status](Current Project Status.md)** - Living status document and priorities
- **[Original Requirements](First Prompt.md)** - Historical project vision and requirements

## 📦 Subscription Tiers *(Future)*

- **Free**: 20 expenses/month, basic features
- **Pro ($9/month)**: Unlimited expenses, priority support, API access

## 🌍 Tax Support *(Future)*

Automatic GST/tax calculations for:
- **New Zealand**: 15% GST
- **Australia**: 10% GST  
- **United Kingdom**: 20% VAT
- **United States**: No federal tax (state tax coming)

## 📁 Project Structure

```
MyX/
├── Current Project Status.md    # Living project status and priorities
├── First Prompt.md             # Original project requirements and vision
├── expense-tracker/            # Main Next.js application
│   ├── EXPLORATION_NOTES.md    # Complete strategic documentation
│   ├── barefoot-investor-dashboard # Personal dashboard specifications
│   ├── profit-first-dashboard.md   # Business dashboard specifications
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # Reusable UI components
│   │   └── lib/               # Utilities, database types, business logic
│   ├── enterprise-foundation.sql
│   └── package.json
└── README.md                   # This file
```

## 🤝 Contributing

This is currently a private project in active development. For questions or collaboration opportunities, please reach out through GitHub issues.

## 📄 License

Private project - All rights reserved.

---

**MyX** - Because finding your financial X-factor shouldn't require an accounting degree.