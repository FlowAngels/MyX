# MyX - Financial Automation System

> "Find your X-factor in financial management"

MyX is a financial automation system designed for small businesses, freelancers, and contractors who need expense tracking without the complexity of traditional accounting software. Built with the Profit First methodology in mind, MyX focuses on showing what you CAN spend rather than just tracking what you spent.

## 🎯 Vision

**"The expense tracker for the non-accountant who gets things done: in work, play, life."**

MyX transforms financial management from reactive record-keeping to proactive cash flow optimization using the proven Profit First approach: `Revenue - Profit = Expenses` (not the traditional `Revenue - Expenses = Profit`).

## ✨ Key Features

- **Multi-Entity Management**: Personal (MyX) + Business (MyBiz) expense tracking
- **Profit First Integration**: Built-in allocation system for Revenue, Profit, Taxes, and Owner Pay
- **Smart Dashboard**: 8-card layout with dual indicator system (color-coded numbers + smiley status)
- **Receipt Processing**: AI-powered OCR for automatic expense capture
- **GST/Tax Automation**: Automatic tax calculations for NZ, AU, UK, and US
- **Mobile-First Design**: Bottom navigation with context-aware switching

## 🛠 Tech Stack

- **Frontend**: Next.js 15.5.0 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Heroicons
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for data visualization
- **AI/OCR**: OpenAI Vision API for receipt processing
- **Payments**: Stripe for subscriptions

## 🏗 Current Architecture

### Database Schema
- **Organizations**: Multi-org support for personal and business contexts
- **Expenses**: Complete expense tracking with receipt storage
- **Categories**: Pre-seeded tax-deductible categories
- **Subscriptions**: Stripe integration for billing

### Security
- Row Level Security (RLS) policies
- Supabase Auth with email confirmation
- Organization-based data isolation

## 📊 Dashboard Design

### 8-Card Layout System
**Delighter Cards** (Profit First focus):
- Revenue tracking with allocation indicators
- Profit allocation and status
- Tax reserves and calculations
- Owner pay scheduling

**Core Cards** (Operations):
- Operating budget vs. actual
- Current month expenses
- GST/tax status
- Upcoming tax obligations

### Dual Indicator System
- **Color-coded numbers**: Green (allocated), White/Grey (pending), Red (issues)
- **Smiley status**: 5-level performance indicators (😢 to 😍)
- **Context-aware**: Everything updates based on selected organization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key (for receipt processing)

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
- `OPENAI_API_KEY`

4. **Database setup**
```bash
# Run the schema setup in your Supabase project
psql -f supabase-schema-fixed.sql
```

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🎯 Current Status: Exploration Complete ✅

**Phase**: Ready for Implementation

### ✅ Completed
- Dashboard design exploration with executive-level indicators
- Core vs. Delighter philosophy established
- Multi-org architecture planning
- Technical stack integration
- UI/UX foundation with shadcn/ui

### 🎯 Next Priority Items
1. Fix organization creation via API route with service role
2. Implement organization setup flow after email confirmation
3. Add multi-org foundation (user_organizations junction table)
4. Create organization switching UI
5. Implement the 8-card dashboard with dual indicator system

### 🐛 Known Issues
- Organization creation blocked by RLS policies
- Email confirmation workflow needs org setup integration
- Multi-org architecture gap in current schema

## 📦 Subscription Tiers

- **Free**: 20 expenses/month, basic features
- **Pro ($9/month)**: Unlimited expenses, priority support, API access

## 🌍 Tax Support

Automatic GST/tax calculations for:
- **New Zealand**: 15% GST
- **Australia**: 10% GST  
- **United Kingdom**: 20% VAT
- **United States**: No federal tax (state tax coming)

## 📁 Project Structure

```
MyX/
├── Current Project Status.md    # Detailed project status and roadmap
├── First Prompt.md             # Original project requirements and vision
├── smileys.png                 # Dashboard status indicator reference
├── expense-tracker/            # Main Next.js application
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # Reusable UI components
│   │   └── lib/               # Utilities, database types, business logic
│   ├── supabase-schema-fixed.sql
│   └── package.json
└── README.md                   # This file
```

## 🤝 Contributing

This is currently a private project in active development. For questions or collaboration opportunities, please reach out through GitHub issues.

## 📄 License

Private project - All rights reserved.

---

**MyX** - Because finding your financial X-factor shouldn't require an accounting degree.