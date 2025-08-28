'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Period = 'day' | 'week' | 'month' | 'quarter' | 'year'

const StatusNeutralIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <line x1="8" y1="15" x2="16" y2="15" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
  </svg>
)

const TrendFlatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 12h10" />
    <path d="m15 9 3 3-3 3" />
    <path d="m9 9-3 3 3 3" />
  </svg>
)

export default function PersonalDashboardContent() {
  const [period, setPeriod] = useState<Period>('month')
  const supabase = createClientComponentClient()

  // Placeholder for header title (e.g., user's personal profile name later)
  const [title, setTitle] = useState<string>('Personal')

  useEffect(() => {
    // If we later store a personal profile name, fetch it here (placeholder for now)
    setTitle('Personal')
  }, [])

  function getRangeForPeriod(base: Date, p: Period) {
    const d = new Date(base)
    let start: Date
    let end: Date
    if (p === 'day') {
      start = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    } else if (p === 'week') {
      const day = d.getDay() || 7
      start = new Date(d)
      start.setDate(d.getDate() - day + 1)
      start.setHours(0, 0, 0, 0)
      end = new Date(start)
      end.setDate(start.getDate() + 7)
    } else if (p === 'quarter') {
      const q = Math.floor(d.getMonth() / 3)
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

  const lastBankUpdate = new Date()

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
      <div className="fixed left-1/2 -translate-x-1/2 z-40 text-xs text-gray-500 bg-gray-50/90 px-2 py-0.5 rounded" style={{ bottom: 96 }}>
        Update bank data: {formatLastUpdateText(lastBankUpdate)}
      </div>
      {/* Period Toggle - docked just above bottom nav */}
      <div className="fixed left-1/2 -translate-x-1/2 z-40" style={{ bottom: 72 }}>
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

      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-gray-50 border-b border-gray-100 py-2 mb-4 grid grid-cols-4 items-center">
        <div className="col-span-3 flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900 text-center truncate max-w-full">{title}</h1>
        </div>
        <div className="flex justify-end">
          <Link href="/expenses/new">
            <Button>+ Add Expense</Button>
          </Link>
        </div>
      </div>

      {/* Top row: 4 cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { title: 'MONEY IN' },
          { title: 'PAY YOU FIRST (A%)' },
          { title: 'KILL DEBT (B%)' },
          { title: 'BIG BILLS (C%)' },
        ].map((c, i) => (
          <Card key={i} className="p-3">
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-semibold tracking-wide text-center">{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-600">—</div>
                <div className="flex flex-col items-center gap-0.5 h-11">
                  {(c.title === 'MONEY IN') && period !== 'day' ? (
                    <TrendFlatIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <div className="w-5 h-5" />
                  )}
                  <StatusNeutralIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {!(c.title.startsWith('BIG BILLS') && period === 'day') && (
                <div className="mt-0.5 text-[11px] leading-4 text-gray-400">
                  {c.title.startsWith('BIG BILLS') ? 'Avg: — / —' : `${nextHigherContextLabel(period)}: —`}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom row: 4 cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* LIVING EXPENSES (Hero) */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">LIVING EXPENSES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-600">—</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                {period !== 'day' ? (
                  <TrendFlatIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <div className="w-5 h-5" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FUN CASH */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">FUN CASH (D%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">—</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <StatusNeutralIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">{nextHigherContextLabel(period)}: —</div>
          </CardContent>
        </Card>

        {/* RAINY DAY */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">RAINY DAY (E%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">—</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <StatusNeutralIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">Goal: — / —</div>
          </CardContent>
        </Card>

        {/* BIG WINS */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">BIG WINS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">—</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <StatusNeutralIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">Goal: — / —</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


