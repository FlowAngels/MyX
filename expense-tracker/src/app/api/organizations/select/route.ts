import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { orgId } = await request.json()
    if (!orgId) {
      return NextResponse.json({ error: 'orgId required' }, { status: 400 })
    }

    const supabase = await createServerComponentClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Verify membership via RLS-safe check
    const { data: membership } = await supabase
      .from('user_organizations')
      .select('id')
      .eq('user_id', user.id)
      .eq('org_id', orgId)
      .maybeSingle()

    if (!membership) {
      return NextResponse.json({ error: 'No access to organization' }, { status: 403 })
    }

    const res = NextResponse.json({ success: true })
    // Non-HttpOnly so client code can read and update UI immediately
    res.cookies.set('active_org_id', orgId, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    })
    return res
  } catch (e) {
    return NextResponse.json({ error: 'Failed to select organization' }, { status: 500 })
  }
}


