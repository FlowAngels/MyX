'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Plus, DollarSign, Receipt, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import type { Expense, Organization } from '@/lib/database.types'
import { getCategoryName } from '@/lib/categories'

export default function DashboardContent() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Get organization
      const { data: orgData } = await supabase
        .from('organizations')
        .select('*')
        .single()

      if (orgData) {
        setOrganization(orgData)
      }

      // Get expenses for current month
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()

      const { data: expensesData } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
        .order('date', { ascending: false })

      if (expensesData) {
        setExpenses(expensesData)
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const currentMonthTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const currentMonthTax = expenses.reduce((sum, expense) => sum + expense.tax_amount, 0)

  // Group expenses by category for chart
  const categoryData = expenses.reduce((acc, expense) => {
    const category = getCategoryName(expense.category as any)
    acc[category] = (acc[category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount
  }))

  const recentExpenses = expenses.slice(0, 5)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back{organization ? `, ${organization.name}` : ''}
          </h1>
          <p className="text-gray-600">Here's your expense overview for this month</p>
        </div>
        <Link href="/expenses/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentMonthTotal)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Amount</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentMonthTax)}</div>
            <p className="text-xs text-muted-foreground">
              {organization?.country === 'US' ? 'Tax' : organization?.country === 'UK' ? 'VAT' : 'GST'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense Count</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenses.length}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expenses by Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Breakdown of your expenses this month</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No expenses yet this month
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your latest expense entries</CardDescription>
          </CardHeader>
          <CardContent>
            {recentExpenses.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        {new Date(expense.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{expense.merchant_name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {getCategoryName(expense.category as any)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No expenses yet
              </div>
            )}
            {expenses.length > 5 && (
              <div className="mt-4 text-center">
                <Link href="/expenses">
                  <Button variant="outline" size="sm">
                    View all expenses
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
