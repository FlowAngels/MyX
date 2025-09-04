import ClientCreateOrgModal from './client-create-org-modal'
import { createServerComponentClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DashboardContent from './dashboard-content'

export default async function DashboardPage() {
  const supabase = await createServerComponentClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardContent />
      <ClientCreateOrgModal />
    </div>
  )
}
