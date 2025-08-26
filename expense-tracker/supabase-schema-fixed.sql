-- Create organizations table
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL CHECK (country IN ('NZ', 'AU', 'UK', 'US')),
  tax_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expenses table
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  merchant_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  receipt_url TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tax_deductible BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')),
  plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'pro')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (id, name, tax_deductible, description) VALUES
('meals', 'Meals & Entertainment', true, 'Business meals, client entertainment, and dining expenses'),
('travel', 'Travel', true, 'Airfare, accommodation, car rentals, and travel-related expenses'),
('office-supplies', 'Office Supplies', true, 'Stationery, paper, pens, and other office materials'),
('equipment', 'Equipment', true, 'Computers, phones, furniture, and business equipment'),
('professional-services', 'Professional Services', true, 'Legal, accounting, consulting, and professional fees'),
('software', 'Software & Subscriptions', true, 'Software licenses, SaaS subscriptions, and digital tools'),
('marketing', 'Marketing & Advertising', true, 'Advertising, marketing materials, and promotional expenses'),
('utilities', 'Utilities', true, 'Electricity, internet, phone, and utility bills'),
('insurance', 'Insurance', true, 'Business insurance, liability coverage, and professional indemnity'),
('other', 'Other', false, 'Miscellaneous business expenses');

-- Create indexes for better performance
CREATE INDEX idx_expenses_org_id ON expenses(org_id);
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_subscriptions_org_id ON subscriptions(org_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Organizations: Users can only access their own organization
CREATE POLICY "Users can view own organization" ON organizations
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own organization" ON organizations
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update own organization" ON organizations
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Expenses: Users can only access expenses for their organization
CREATE POLICY "Users can view own expenses" ON expenses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = expenses.org_id 
      AND organizations.id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own expenses" ON expenses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = expenses.org_id 
      AND organizations.id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can update own expenses" ON expenses
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = expenses.org_id 
      AND organizations.id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can delete own expenses" ON expenses
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = expenses.org_id 
      AND organizations.id::text = auth.uid()::text
    )
  );

-- Categories: Everyone can read categories
CREATE POLICY "Everyone can view categories" ON categories
  FOR SELECT USING (true);

-- Subscriptions: Users can only access subscriptions for their organization
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = subscriptions.org_id 
      AND organizations.id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = subscriptions.org_id 
      AND organizations.id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM organizations 
      WHERE organizations.id = subscriptions.org_id 
      AND organizations.id::text = auth.uid()::text
    )
  );

-- Create storage bucket for receipts
INSERT INTO storage.buckets (id, name, public) VALUES ('receipts', 'receipts', true);

-- Create storage policies
CREATE POLICY "Users can upload receipts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'receipts');

CREATE POLICY "Users can view receipts" ON storage.objects
  FOR SELECT USING (bucket_id = 'receipts');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
