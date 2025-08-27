'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'
import type { Organization } from '@/lib/database.types'
import { cn } from '@/lib/utils'

// MyX Logo Component
const MyXLogo = ({ className }: { className?: string }) => (
  <img 
    src="/MyX-logo.png" 
    alt="MyX" 
    className={className}
    style={{ objectFit: 'contain' }}
  />
)

// Currency Dollar Icon from heroicons
const CurrencyDollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z"/>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.112 2.178.502.4 1.102.647 1.72.756v2.816a2.251 2.251 0 01-.921-.421c-.427-.32-.579-.686-.579-.991a.75.75 0 00-1.5 0c0 .828.4 1.612 1.112 2.178a3.836 3.836 0 001.888.756V18a.75.75 0 001.5 0v-.816a3.836 3.836 0 001.72-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.112-2.178a3.836 3.836 0 00-1.72-.756V9.5c.4.094.764.267 1.112.421.427.32.579.686.579.991a.75.75 0 001.5 0c0-.828-.4-1.612-1.112-2.178A3.836 3.836 0 0012.75 6.816V6z" clipRule="evenodd"/>
  </svg>
)

const CurrencyDollarOutlineIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)

const DocumentChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V15zm2.25-3a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75v5.25a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V12zm3-3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v8.25a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V8.25z" clipRule="evenodd"/>
    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"/>
  </svg>
)

const DocumentChartBarOutlineIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
  </svg>
)

const CogIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.570.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd"/>
  </svg>
)

const CogOutlineIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
)

const navItems = [
  {
    name: 'MyX',
    href: '/dashboard',
    icon: MyXLogo,
    outlineIcon: MyXLogo,
    isLogo: true,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: DocumentChartBarIcon,
    outlineIcon: DocumentChartBarOutlineIcon,
  },
  {
    name: 'Setup',
    href: '/setup',
    icon: CogIcon,
    outlineIcon: CogOutlineIcon,
  },
]

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

export default function BottomNav() {
  const pathname = usePathname()
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)

  useEffect(() => {
    // Initial load via API for robustness with RLS and session
    refreshOrgs()
    // Read active org from cookie
    const cookie = typeof document !== 'undefined' ? document.cookie : ''
    const value = cookie.split('; ').find((c) => c.startsWith('active_org_id='))?.split('=')[1]
    setActiveOrgId(value || null)
  }, [])

  const refreshOrgs = async () => {
    try {
      const res = await fetch('/api/organizations/list', { cache: 'no-store' })
      if (!res.ok) return
      const { organizations } = await res.json()
      setOrgs(organizations || [])
    } catch (e) {
      // ignore silently; menu will show Create New
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          
          const IconComponent = isActive ? item.icon : item.outlineIcon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-1 text-xs font-medium transition-colors",
                isActive 
                  ? "text-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {item.isLogo ? (
                <DropdownMenu onOpenChange={(open) => { if (open) refreshOrgs() }}>
                  <DropdownMenuTrigger className="flex flex-col items-center outline-none">
                    <IconComponent className="h-12 w-auto" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="center">
                    {orgs.length > 0 && orgs.map((o) => (
                      <DropdownMenuItem
                        key={o.id}
                        onSelect={async () => {
                          await fetch('/api/organizations/select', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ orgId: o.id }),
                          })
                          window.location.href = '/dashboard'
                        }}
                      >
                        <span className="flex items-center gap-2">
                          {activeOrgId === o.id && (
                            <CheckIcon className="w-4 h-4 text-blue-600" />
                          )}
                          <span>{o.name}</span>
                        </span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem asChild>
                      <Link href="#" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-create-org-modal')) }}>Create New</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <IconComponent className="w-6 h-6 mb-1" />
                  <span className="truncate">{item.name}</span>
                </>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
