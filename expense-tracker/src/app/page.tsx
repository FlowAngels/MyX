import { createServerComponentClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Receipt, BarChart3, Download } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createServerComponentClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">ExpenseTracker</div>
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          The expense tracker for businesses too small for QuickBooks
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Track business expenses, automatically calculate GST/tax, and export reports for your accountant. 
          Simple, fast, and designed for small businesses.
        </p>
        <div className="space-x-4">
          <Link href="/auth/signup">
            <Button size="lg">Start Free Trial</Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" size="lg">Sign In</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Receipt className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Receipt Capture</CardTitle>
              <CardDescription>
                Upload receipts and let AI extract all the details automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  AI-powered receipt processing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Automatic tax calculations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Manual entry option
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Smart Reporting</CardTitle>
              <CardDescription>
                Get insights into your spending patterns and tax obligations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Monthly expense summaries
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Category breakdowns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Tax/GST tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Export & Share</CardTitle>
              <CardDescription>
                Generate reports for your accountant at tax time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  CSV export
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  PDF reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Accountant-ready format
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
          <p className="text-gray-600">No hidden fees, no complex tiers</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-4">$0</div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>20 expenses per month</li>
                <li>Receipt processing</li>
                <li>Basic reporting</li>
                <li>CSV export</li>
              </ul>
              <Link href="/auth/signup">
                <Button className="w-full">Get Started Free</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2024 ExpenseTracker. Built for small businesses.</p>
      </footer>
    </div>
  )
}
