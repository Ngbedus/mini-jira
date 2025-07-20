import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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