'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import type { Expense, Organization } from '@/lib/database.types'
import PersonalDashboardContent from '@/app/personal/personal-dashboard-content'
const StatusNeutralIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <line x1="8" y1="15" x2="16" y2="15" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
  </svg>
)

type Period = 'day' | 'week' | 'month' | 'quarter' | 'year'

export default function DashboardContent() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<Period>('month')
  const supabase = createClientComponentClient()

  // Derived label (no hook to avoid hook-order issues)
  const periodLabel = period.charAt(0).toUpperCase() + period.slice(1)
  const lastBankUpdate = new Date()

  useEffect(() => {
    loadDashboardData()
  }, [period])

  const loadDashboardData = async () => {
    try {
      // Get organization
      // Read active org from cookie; fall back to first membership
      const activeOrgId = typeof document !== 'undefined'
        ? (document.cookie.split('; ').find((c) => c.startsWith('active_org_id='))?.split('=')[1])
        : undefined

      if (activeOrgId) {
        const { data: orgById } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', activeOrgId)
          .maybeSingle()
        if (orgById) setOrganization(orgById)
      } else {
        const { data: firstOrg } = await supabase
          .from('organizations')
          .select('*')
          .order('name')
          .limit(1)
          .maybeSingle()
        if (firstOrg) setOrganization(firstOrg)
      }

      // organization state is set above

      // Get expenses for current month
      const now = new Date()
      const { startISO, endISO } = getRangeForPeriod(now, period)

      const { data: expensesData } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', startISO)
        .lte('date', endISO)
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

  function getRangeForPeriod(base: Date, p: Period) {
    const d = new Date(base)
    let start: Date
    let end: Date
    if (p === 'day') {
      start = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    } else if (p === 'week') {
      const day = d.getDay() || 7 // Sun=0 -> 7
      start = new Date(d)
      start.setDate(d.getDate() - day + 1) // Monday
      start.setHours(0, 0, 0, 0)
      end = new Date(start)
      end.setDate(start.getDate() + 7)
    } else if (p === 'quarter') {
      const q = Math.floor(d.getMonth() / 3) // 0..3
      start = new Date(d.getFullYear(), q * 3, 1)
      end = new Date(d.getFullYear(), q * 3 + 3, 1)
    } else if (p === 'year') {
      start = new Date(d.getFullYear(), 0, 1)
      end = new Date(d.getFullYear() + 1, 0, 1)
    } else {
      start = new Date(d.getFullYear(), d.getMonth(), 1)
      end = new Date(d.getFullYear(), d.getMonth() + 1, 1)
    }
    return { startISO: start.toISOString(), endISO: end.toISOString() }
  }

  function nextHigherContextLabel(p: Period): string {
    switch (p) {
      case 'day':
        return 'Week'
      case 'week':
        return 'Month'
      case 'month':
        return 'Quarter'
      case 'quarter':
        return 'Year'
      case 'year':
      default:
        return 'All-time'
    }
  }

  const currentMonthTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const currentMonthTax = expenses.reduce((sum, expense) => sum + expense.tax_amount, 0)

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

  // If no organization, show lightweight in-page callout linking to MyBiz create
  if (!organization) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600">Create your new MyBiz here!</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6 bg-white text-gray-700">
          <p className="text-lg font-medium">Tap the MyBiz tab to create your first MyBiz.</p>
        </div>
      </div>
    )
  }

  // Dev preview: if the active organization's name is "Personal", show the personal dashboard UI
  if (organization?.name?.toLowerCase() === 'personal') {
    return <PersonalDashboardContent />
  }

  function formatLastUpdateText(d: Date): string {
    const now = new Date()
    if (d.toDateString() === now.toDateString()) {
      const h = d.getHours() % 12 || 12
      const m = d.getMinutes().toString().padStart(2, '0')
      const ampm = d.getHours() >= 12 ? 'pm' : 'am'
      return `Today ${h}:${m}${ampm}`
    }
    const msPerDay = 86400000
    const diffDays = Math.floor((now.getTime() - d.getTime()) / msPerDay)
    if (diffDays < 7) return d.toLocaleDateString(undefined, { weekday: 'short' })
    if (diffDays < 14) return 'Last Week'
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    if (d.getFullYear() === prevMonth.getFullYear() && d.getMonth() === prevMonth.getMonth()) return 'Last Month'
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bank update placeholder just above toggle */}
      <div className="fixed left-1/2 -translate-x-1/2 z-40 text-xs text-gray-500 bg-gray-50/90 px-2 py-0.5 rounded" style={{ bottom: 104 }}>
        Update bank data: {formatLastUpdateText(lastBankUpdate)}
      </div>
      {/* Period Toggle - docked just above bottom nav */}
      <div className="fixed left-1/2 -translate-x-1/2 z-40" style={{ bottom: 80 }}>
        <div className="inline-flex rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
          {(['day','week','month','quarter','year'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-sm transition-colors ${p===period? 'bg-black text-white' : 'bg-white text-gray-600 hover:text-gray-900'}`}
            >
              {p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Sticky header with active MyBiz centered in 75% and Add Expense on right */}
      <div className="sticky top-0 z-30 bg-gray-50 border-b border-gray-100 py-2 mb-4 grid grid-cols-4 items-center">
        <div className="col-span-3 flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900 text-center truncate max-w-full">{organization?.name ?? 'MyX'}</h1>
        </div>
        <div className="flex justify-end">
          <Link href="/expenses/new">
            <Button>+ Add Expense</Button>
          </Link>
        </div>
      </div>
      {/* (Removed old bank placeholder) */}
      {/* (Removed previous KPI cards) */}

      {/* Profit First Dashboard */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {/* Top Row - Delighter Job */}
          {[
            { title: 'Revenue', value: null, help: 'Income coming in' },
            { title: 'Profit (X%)', value: null, help: 'Pay yourself first for wealth' },
            { title: 'Taxes (Y%)', value: null, help: 'Non-negotiable obligations' },
            { title: 'Owner Pay (Z%)', value: null, help: 'Your salary/drawings' },
          ].map((c, i) => (
            <Card key={i} className="p-3">
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-semibold tracking-wide text-center">{c.title.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-gray-600">{c.value !== null ? formatCurrency(c.value as number) : '—'}</div>
                  <StatusNeutralIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="mt-0.5 text-[11px] leading-4 text-gray-400">{nextHigherContextLabel(period)}: —</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Bottom Row - Core Job */}
          {[
            { title: 'Operating Budget', value: null, help: 'Constrained remainder' },
            { title: 'Current Expenses', value: expenses.length, help: 'Tracking actual spending' },
            { title: organization?.country === 'US' ? 'Sales Tax' : 'GST', value: null, help: 'Tax compliance' },
            { title: 'Taxes', value: null, help: 'Total tax obligations' },
          ].map((c, i) => (
            <Card key={i} className="p-3">
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-semibold tracking-wide text-center">{c.title.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent>
                {c.title === 'Operating Budget' ? (
                  <div className="text-3xl font-bold text-gray-600">{c.value !== null ? formatCurrency(c.value as number) : '—'}</div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-600">{c.value !== null ? c.title==='Current Expenses' ? c.value : formatCurrency(c.value as number) : '—'}</div>
                      <StatusNeutralIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="mt-0.5 text-[11px] leading-4 text-gray-400">
                      {c.title === 'GST' || c.title === 'Taxes' || c.title === 'Sales Tax' ? 'Cycle: —' : `${nextHigherContextLabel(period)}: —`}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* (Removed charts and recent expenses sections) */}
    </div>
  )
}
