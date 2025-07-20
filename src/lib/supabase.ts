import { createClient } from '@supabase/supabase-js'

// Debug: Let's see what environment variables are available
console.log('All environment variables:', import.meta.env)
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Make sure Supabase is properly connected to your Lovable project.')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Make sure Supabase is properly connected to your Lovable project.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      issues: {
        Row: {
          id: string
          title: string
          description: string
          status: 'todo' | 'inprogress' | 'done'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          assignee: string
          reporter: string
          created_at: string
          updated_at: string
          type: 'story' | 'bug' | 'task'
          estimate: number | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: 'todo' | 'inprogress' | 'done'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          assignee: string
          reporter: string
          created_at?: string
          updated_at?: string
          type: 'story' | 'bug' | 'task'
          estimate?: number | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'todo' | 'inprogress' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assignee?: string
          reporter?: string
          created_at?: string
          updated_at?: string
          type?: 'story' | 'bug' | 'task'
          estimate?: number | null
        }
      }
    }
  }
}