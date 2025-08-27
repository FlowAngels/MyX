'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z
    .string()
    .min(1, 'Organization name is required')
    .max(20, 'Max 20 characters'),
})

type FormValues = z.infer<typeof schema>

export default function CreateOrganizationPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    const res = await fetch('/api/organizations/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: values.name, country: 'NZ' }),
    })

    if (!res.ok) {
      // Show inline form error; no toasts per spec
      const data = await res.json().catch(() => ({ error: 'Failed to create' }))
      alert(data.error || 'Failed to create organization')
      return
    }

    // Redirect to Setup page; the UI will reflect the current org in header
    router.replace('/setup')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create New MyBiz</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              MyBiz name
            </label>
            <input
              id="name"
              type="text"
              maxLength={20}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Flow Angels Ltd"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating…' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  )
}


