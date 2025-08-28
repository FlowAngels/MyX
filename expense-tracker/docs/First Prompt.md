# Build an AI-Powered Expense Tracker for Small Businesses

## Project Overview
Create a simple expense tracking web app specifically for small businesses, freelancers, and contractors who find QuickBooks/Xero too complex and expensive. The app should handle receipt capture, GST/tax calculations, and basic reporting for tax compliance.

## Core Concept
"The expense tracker for businesses too small for QuickBooks" - A dead-simple way to track business expenses, automatically calculate GST/tax, and export reports for accountants at tax time.

## Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS, Shadcn/ui components
- **Backend**: Supabase (PostgreSQL database, authentication, file storage)
- **OCR/AI**: OpenAI API for receipt text extraction and categorization
- **Payments**: Stripe for subscriptions
- **Deployment**: Vercel

## Database Schema
```sql
-- Users table (handled by Supabase Auth)

-- Organizations/Businesses
- id, name, country (NZ/AU/US/UK), tax_number, created_at

-- Expenses
- id, org_id, amount, tax_amount, merchant_name, category, description, receipt_url, date, created_at

-- Categories (pre-seeded)
- id, name, tax_deductible, description
- Examples: Meals, Travel, Office Supplies, Equipment, Professional Services

-- Subscriptions (Stripe integration)
- id, org_id, stripe_customer_id, stripe_subscription_id, status, plan_type


MVP Features (Launch in 1-2 weeks)
1. Authentication & Onboarding
•	Email/password signup with Supabase Auth
•	Simple onboarding: Business name, country (for GST/tax rate), tax number (optional)
•	Free tier: 20 expenses/month, Paid tier ($9/month): unlimited
2. Expense Entry
•	Manual Entry: Amount, merchant, date, category dropdown
•	Receipt Upload: 
o	Drag & drop or click to upload image
o	Process with OpenAI Vision API to extract: amount, merchant, date
o	Auto-calculate tax portion based on country (NZ: 15%, AU: 10%, UK: 20%)
o	User confirms/edits extracted data before saving
3. Dashboard
•	Current month total expenses
•	Tax/GST amount for the period
•	Expenses by category (simple bar chart)
•	Recent expenses list with search/filter
4. Reports & Export
•	Monthly/quarterly expense report
•	Export to CSV with columns: Date, Merchant, Category, Amount, Tax Amount, Description
•	Simple PDF report for accountant with totals by category
5. Settings
•	Business details
•	Manage subscription
•	Export all data
UI/UX Requirements
•	Mobile-responsive but desktop-first
•	Clean, minimal interface (think Linear.app meets stripe.com)
•	No accounting jargon - use plain language
•	Toast notifications for all actions
•	Loading states for all async operations
Key Implementation Details
Receipt Processing Flow
1.	User uploads image → Show processing spinner
2.	Send to OpenAI Vision API with prompt: "Extract the total amount, merchant name, and date from this receipt. Return as JSON."
3.	Display extracted data for user confirmation
4.	Calculate tax amount automatically based on country
5.	Save to database with receipt image URL
GST/Tax Calculations
const TAX_RATES = {
  NZ: 0.15,  // 15% GST
  AU: 0.10,  // 10% GST
  UK: 0.20,  // 20% VAT
  US: 0      // No federal tax
};

// Calculate tax portion from total
const calculateTaxAmount = (total: number, country: string) => {
  const rate = TAX_RATES[country] || 0;
  return total - (total / (1 + rate));
};

Subscription Tiers
•	Free: 20 expenses/month, basic features
•	Pro ($9/month): Unlimited expenses, priority support, API access (future)
Future Features (Post-MVP)
•	Bank integration (Plaid/Basiq)
•	Recurring expenses
•	Multiple users per organization
•	Mobile app
•	Mileage tracking
•	Invoice scanning
Getting Started
Create a Next.js 14 app with TypeScript, Tailwind CSS, and Shadcn/ui. Set up Supabase for the backend and implement the authentication flow first. Focus on making the receipt upload and processing experience magical - this is your key differentiator.
The goal is to have paying customers within 30 days by targeting small businesses who are frustrated with complex accounting software. Start with AU/NZ market given your location and understanding of GST requirements.

