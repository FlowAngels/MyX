# ExpenseTracker - AI-Powered Expense Tracking for Small Businesses

The expense tracker for businesses too small for QuickBooks. A dead-simple way to track business expenses, automatically calculate GST/tax, and export reports for accountants at tax time.

## 🚀 Features

- **AI-Powered Receipt Processing**: Upload receipts and let OpenAI Vision API extract all details automatically
- **Automatic Tax Calculations**: Supports GST (AU/NZ), VAT (UK), and US tax rates
- **Simple Dashboard**: View monthly totals, tax amounts, and category breakdowns
- **Export Reports**: Generate CSV and PDF reports for your accountant
- **Mobile Responsive**: Works great on desktop and mobile devices
- **Free Tier**: 20 expenses/month, with paid plans for unlimited usage

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI/OCR**: OpenAI Vision API for receipt processing
- **Charts**: Recharts for data visualization
- **Payments**: Stripe (planned for future)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payments)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd expense-tracker
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Run the database schema:

```bash
# Copy the SQL from supabase-schema.sql and run it in your Supabase SQL editor
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Stripe Configuration (for future use)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Schema

The application uses the following main tables:

- **organizations**: Business information and settings
- **expenses**: Individual expense records
- **categories**: Pre-defined expense categories
- **subscriptions**: Stripe subscription data (future)

## 🔧 Key Features Implementation

### Receipt Processing Flow

1. User uploads image → Show processing spinner
2. Send to OpenAI Vision API with structured prompt
3. Display extracted data for user confirmation
4. Calculate tax amount automatically based on country
5. Save to database with receipt image URL

### Tax Calculations

```typescript
const TAX_RATES = {
  NZ: 0.15,  // 15% GST
  AU: 0.10,  // 10% GST
  UK: 0.20,  // 20% VAT
  US: 0      // No federal tax
};
```

### Subscription Tiers

- **Free**: 20 expenses/month, basic features
- **Pro ($9/month)**: Unlimited expenses, priority support, API access (future)

## 🎯 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── expenses/          # Expense management
│   └── api/               # API routes
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── lib/                   # Utility functions and configurations
│   ├── supabase.ts       # Supabase client setup
│   ├── database.types.ts # TypeScript database types
│   ├── tax-calculations.ts # Tax calculation utilities
│   ├── receipt-processing.ts # OpenAI receipt processing
│   └── categories.ts     # Expense categories data
└── styles/               # Global styles
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your production environment (Vercel, etc.).

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own organization's data
- Supabase Auth handles authentication
- File uploads restricted to authenticated users

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📈 Future Features

- [ ] Bank integration (Plaid/Basiq)
- [ ] Recurring expenses
- [ ] Multiple users per organization
- [ ] Mobile app
- [ ] Mileage tracking
- [ ] Invoice scanning
- [ ] Advanced reporting
- [ ] API access for integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@expensetracker.com or create an issue in this repository.

---

Built with ❤️ for small businesses who deserve better expense tracking.
