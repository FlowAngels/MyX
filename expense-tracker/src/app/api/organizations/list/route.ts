import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    // Create Supabase client with user context
    const supabase = await createServerComponentClient()
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Prefer direct select with RLS policies (simpler and reliable)
    const { data: organizations, error: listError } = await supabase
      .from('organizations')
      .select('*')
      .order('name')

    if (listError) {
      console.error('Organizations list error:', listError)
      return NextResponse.json(
        { error: 'Failed to fetch organizations' },
        { status: 500 }
      )
    }

    // Return organizations with proper structure
    return NextResponse.json({
      success: true,
      organizations: organizations || []
    })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
