import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'
import { z } from 'zod'

// Input validation schema
const createOrgSchema = z.object({
  name: z.string().min(1, 'Organization name is required').max(100, 'Organization name too long'),
  country: z.enum(['NZ', 'AU', 'UK', 'US'], {
    errorMap: () => ({ message: 'Invalid country code' })
  })
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { name, country } = createOrgSchema.parse(body)

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

    // Get client IP and user agent for audit trail
    const clientIp = request.ip || 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      null
    const userAgent = request.headers.get('user-agent') || null

    // Call the secure organization creation function
    const { data: orgId, error: createError } = await supabase
      .rpc('create_user_organization', {
        org_name: name,
        org_country: country,
        client_ip: clientIp,
        user_agent: userAgent,
        session_id: null
      })

    if (createError) {
      console.error('Organization creation error:', createError)
      
      // Handle specific error cases
      if (createError.message.includes('already has an organization')) {
        return NextResponse.json(
          { error: 'User already has an organization' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to create organization' },
        { status: 500 }
      )
    }

    // Success - return the new organization ID
    return NextResponse.json({
      success: true,
      organizationId: orgId,
      message: 'Organization created successfully'
    })

  } catch (error) {
    console.error('API route error:', error)
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
