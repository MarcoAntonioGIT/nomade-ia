
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vrhttonrlgqynhenlxfo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyaHR0b25ybGdxeW5oZW5seGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNDI1MTIsImV4cCI6MjA2NTgxODUxMn0.mf80UMTFjwUWxIYkX5D02jhavM8xkhNTyHyxN9FYskI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
})
