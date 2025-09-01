'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Organization } from '@/lib/database.types'

// Status Icons (MyX DNA)
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
  </svg>
)

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd"/>
  </svg>
)

const InformationCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
  </svg>
)

const ExclamationTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
)

const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
    <polyline points="16,6 12,2 8,6"/>
    <line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
)

type Period = 'day' | 'week' | 'month' | 'quarter' | 'year'

// Placeholder GST/Tax due date logic
function getNextFilingLabel({ gstDue, taxDue, today }: { gstDue: Date, taxDue: Date, today: Date }) {
  const gstDiff = Math.ceil((gstDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const taxDiff = Math.ceil((taxDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  const nextGstDue = gstDiff >= 0 ? gstDiff : Infinity
  const nextTaxDue = taxDiff >= 0 ? taxDiff : Infinity
  
  let daysUntilNext: number
  let label: string
  
  if (nextGstDue < nextTaxDue) {
    daysUntilNext = nextGstDue
    label = 'before GST report is due'
  } else if (nextTaxDue < nextGstDue) {
    daysUntilNext = nextTaxDue
    label = 'before Tax report is due'
  } else {
    daysUntilNext = nextGstDue
    label = 'before GST & Tax reports are due'
  }
  
  return { daysUntilNext, label }
}

export default function BooksDashboard() {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [period, setPeriod] = useState<Period>('month')
  const [loading, setLoading] = useState(true)
  
  // Placeholder due dates - will be driven by org configuration later
  const today = new Date()
  const gstDueDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
  const taxDueDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  
  const { daysUntilNext, label: nextFilingLabel } = getNextFilingLabel({
    gstDue: gstDueDate,
    taxDue: taxDueDate,
    today
  })
  
  // Temporary compliance selectors with TODOs
  // TODO(wire): Replace with useFeedsHealthForActiveBiz()
  const feedsUpToDate = true // Stub: true when all connected accounts fresh + no unreconciled items
  
  // TODO(wire): Replace with useLedgerVsBankMatchForCycle() 
  const numbersMatch = false // Stub: true when ledger totals == consolidated bank totals
  
  // TODO(wire): Replace with useGstTaxReadyForCycle()
  const readyToReport = false // Stub: true when GST/tax inputs complete + valid calc
  
  // Derived aggregate compliance
  const isCompliant = feedsUpToDate && numbersMatch && readyToReport

  useEffect(() => {
    loadOrganization()
  }, [])

  const loadOrganization = async () => {
    try {
      // Read active org from cookie (matching dashboard pattern)
      const activeOrgId = typeof document !== 'undefined'
        ? document.cookie.split('; ').find(c => c.startsWith('active_org_id='))?.split('=')[1]
        : null

      if (activeOrgId) {
        const res = await fetch('/api/organizations/list', { cache: 'no-store' })
        if (res.ok) {
          const { organizations } = await res.json()
          const activeOrg = organizations?.find((o: Organization) => o.id === activeOrgId)
          setOrganization(activeOrg || organizations?.[0] || null)
        }
      }
    } catch (e) {
      console.error('Failed to load organization:', e)
    } finally {
      setLoading(false)
    }
  }

  const lastBankUpdate = new Date()
  
  function formatLastUpdateText(d: Date): string {
    const now = new Date()
    if (d.toDateString() === now.toDateString()) {
      const h = d.getHours() % 12 || 12
      const m = d.getMinutes().toString().padStart(2, '0')
      const ampm = d.getHours() >= 12 ? 'pm' : 'am'
      return `Today ${h}:${m}${ampm}`
    }
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-4 pb-24 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-24">

      {/* Header with org name centered and Add Expense on right */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 py-2 mb-4 grid grid-cols-4 items-center">
        <div className="col-span-3 flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900 text-center truncate max-w-full">
            {organization?.name || 'Books Cockpit'}
          </h1>
        </div>
        <div className="flex justify-end">
          <Link href="/expenses/new">
            <Button>+ Add Expense</Button>
          </Link>
        </div>
      </div>

      {/* Top Row - Compliance (Full Width) */}
      <div className="mb-4">
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">COMPLIANCE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="space-y-1">
                  {/* 3-item checklist - ✅ first, then issues */}
                  <div className="flex items-center gap-2 text-sm">
                    {feedsUpToDate ? (
                      <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircleIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
                    )}
                    <span className="text-gray-900">All info up to date</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {numbersMatch ? (
                      <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircleIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
                    )}
                    <span className="text-gray-900">All numbers match</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {readyToReport ? (
                      <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircleIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
                    )}
                    <span className="text-gray-900">Ready to report</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-0.5 h-11 ml-2">
                <div className="w-5 h-5" />
                {isCompliant ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 1: Next Filing, Bank Health */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Next Filing (was GST Filing) */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">NEXT FILING</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">
                {daysUntilNext} days
              </div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <ClockIcon className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">
              {nextFilingLabel}
            </div>
          </CardContent>
        </Card>

        {/* Bank Health */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">BANK HEALTH</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">2 stale</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">5 unreconciled</div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Balance, Deductibles */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Balance */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">BALANCE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">-$420</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <XCircleIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">Mismatch found</div>
          </CardContent>
        </Card>

        {/* Deductibles */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">DEDUCTIBLES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">$12.5k</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <InformationCircleIcon className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">87% deductible</div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: GST, Tax Provision */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* GST */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">GST</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">$2,410</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <InformationCircleIcon className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">Payable</div>
          </CardContent>
        </Card>

        {/* Tax Provision */}
        <Card className="p-3">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-semibold tracking-wide text-center">TAX PROVISION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-600">$6,800</div>
              <div className="flex flex-col items-center gap-0.5 h-11">
                <div className="w-5 h-5" />
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-400">FY 2025</div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}