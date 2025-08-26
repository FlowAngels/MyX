import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../../../lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST(request: NextRequest) {
  try {
    // Log the raw request for debugging
    const body = await request.text()
    console.log('Raw request body:', body)
    
    let data
    try {
      data = JSON.parse(body)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 })
    }
    
    const { email, password, businessName, country, taxNumber } = data

    // Clean up tax number (remove dashes and spaces)
    const cleanTaxNumber = taxNumber ? taxNumber.replace(/[-\s]/g, '') : null

    // Create user account
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto-confirm email for development
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (authData.user) {
      // Create organization using admin client
      const { error: orgError } = await supabaseAdmin
        .from('organizations')
        .insert({
          id: authData.user.id,
          name: businessName,
          country,
          tax_number: cleanTaxNumber,
        })

      if (orgError) {
        console.error('Organization creation error:', orgError)
        return NextResponse.json({ error: orgError.message }, { status: 400 })
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Account created successfully!' 
      })
    }

    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
