'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getMockBasicDashboardData } from '@/lib/myx/basic/mockData'
import { Period } from '@/lib/myx/basic/types'
import AvailableToSpendHero from './AvailableToSpendHero'
import ContextCard from './ContextCard'
import ActivityFeedCard from './ActivityFeedCard'

type TimePeriod = 'day' | 'week' | 'month' | 'quarter' | 'year'

interface BasicDashboardProps {
  orgName: string;
}

export default function BasicDashboard({ orgName }: BasicDashboardProps) {
  const [period, setPeriod] = useState<TimePeriod>('month')
  const data = getMockBasicDashboardData(period)
  
  const lastBankUpdate = new Date(data.lastBankSyncIso || Date.now())

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
    <div className="container mx-auto px-4 py-4 h-screen overflow-hidden flex flex-col">
      {/* Bank update placeholder just above toggle */}
      <div className="fixed left-1/2 -translate-x-1/2 z-40 text-xs text-gray-500 bg-gray-50/90 px-2 py-0.5 rounded" style={{ bottom: 96 }}>
        Update bank data: {formatLastUpdateText(lastBankUpdate)}
      </div>
      
      {/* Period Toggle - docked just above bottom nav */}
      <div className="fixed left-1/2 -translate-x-1/2 z-40" style={{ bottom: 72 }}>
        <div className="inline-flex rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
          {(['day','week','month','quarter','year'] as TimePeriod[]).map((p) => (
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

      {/* Header with org name centered and Add Expense on right */}
      <div className="flex-shrink-0 bg-gray-50 border-b border-gray-100 py-2 mb-4 grid grid-cols-4 items-center">
        <div className="col-span-3 flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900 text-center truncate max-w-full">{orgName}</h1>
        </div>
        <div className="flex justify-end">
          <Link href="/expenses/new">
            <Button>+ Add Expense</Button>
          </Link>
        </div>
      </div>

      {/* Content area that fits in remaining viewport */}
      <div className="flex-1 flex flex-col min-h-0 pb-32">
        {/* Top Row: 4 Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {/* Available to Spend (Hero) - First position */}
          <AvailableToSpendHero value={data.available.value} />
          
          <ContextCard
            title="Income"
            type="income"
            data={{
              value: data.income.value,
              nextHorizon: data.income.nextHorizon,
              trendPct: data.income.trendPct,
              status: data.income.status
            }}
          />
          <ContextCard
            title="Committed"
            type="committed"
            data={{
              actual: data.committed.actual,
              planned: data.committed.planned,
              trendPct: data.committed.trendPct,
              status: data.committed.status
            }}
          />
          <ContextCard
            title="Goals"
            type="goals"
            data={{
              actual: data.goals.actual,
              target: data.goals.target,
              trendPct: data.goals.trendPct,
              status: data.goals.status
            }}
          />
        </div>

        {/* Bottom Row: Activity Feed (full width) */}
        <div className="flex-1 min-h-0">
          <ActivityFeedCard items={data.activity} />
        </div>
      </div>
    </div>
  )
}