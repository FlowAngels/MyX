'use client'

import Link from 'next/link'

export default function SetupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Setup</h1>
        <p className="text-gray-600">Configure your MyBiz details</p>
      </div>
      <div className="text-gray-500">
        {/* Placeholder for future setup sections (GST, bank accounts, defaults, etc.) */}
        <p>
          This is the Setup area. After creating a MyBiz, you will configure details here.
          Return to the{' '}
          <Link href="/dashboard" className="text-blue-600 underline">
            Dashboard
          </Link>
          {' '}any time.
        </p>
      </div>
    </div>
  )
}


