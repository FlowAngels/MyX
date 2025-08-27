'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

export default function ClientCreateOrgModal() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener('open-create-org-modal' as any, handler)
    return () => document.removeEventListener('open-create-org-modal' as any, handler)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New MyBiz</DialogTitle>
        </DialogHeader>
        <CreateOrgForm onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

function CreateOrgForm({ onDone }: { onDone: () => void }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const res = await fetch('/api/organizations/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, country: 'NZ' }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Failed to create' }))
      setError(data.error || 'Failed to create')
      setSubmitting(false)
      return
    }
    onDone()
    router.replace('/setup')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">MyBiz name</label>
        <input
          type="text"
          maxLength={20}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="e.g. Flow Angels Ltd"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      <button disabled={submitting} className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
        {submitting ? 'Creating…' : 'Create'}
      </button>
    </form>
  )
}


