export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          country: 'NZ' | 'AU' | 'UK' | 'US'
          tax_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          country: 'NZ' | 'AU' | 'UK' | 'US'
          tax_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: 'NZ' | 'AU' | 'UK' | 'US'
          tax_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          org_id: string
          amount: number
          tax_amount: number
          merchant_name: string
          category: string
          description: string | null
          receipt_url: string | null
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          org_id: string
          amount: number
          tax_amount: number
          merchant_name: string
          category: string
          description?: string | null
          receipt_url?: string | null
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          org_id?: string
          amount?: number
          tax_amount?: number
          merchant_name?: string
          category?: string
          description?: string | null
          receipt_url?: string | null
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          tax_deductible: boolean
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          tax_deductible: boolean
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          tax_deductible?: boolean
          description?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          org_id: string
          stripe_customer_id: string
          stripe_subscription_id: string
          status: 'active' | 'canceled' | 'past_due' | 'unpaid'
          plan_type: 'free' | 'pro'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          org_id: string
          stripe_customer_id: string
          stripe_subscription_id: string
          status: 'active' | 'canceled' | 'past_due' | 'unpaid'
          plan_type: 'free' | 'pro'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          org_id?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid'
          plan_type?: 'free' | 'pro'
          created_at?: string
          updated_at?: string
        }
      }
      user_organizations: {
        Row: {
          id: string
          user_id: string
          org_id: string
          role: 'owner' | 'user'
          joined_at: string
        }
        Insert: {
          id?: string
          user_id: string
          org_id: string
          role: 'owner' | 'user'
          joined_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          org_id?: string
          role?: 'owner' | 'user'
          joined_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Organization = Database['public']['Tables']['organizations']['Row']
export type Expense = Database['public']['Tables']['expenses']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type UserOrganization = Database['public']['Tables']['user_organizations']['Row']
