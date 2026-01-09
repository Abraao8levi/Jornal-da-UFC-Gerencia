import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zdntrhopvswtmhupeecl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnRyaG9wdnN3dG1odXBlZWNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzEyODU3MSwiZXhwIjoyMDgyNzA0NTcxfQ.iiSKmz-ydJE-JDqAHYWv5mcSM_R3JvDq-z3VlZ8H4YE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface User {
    id: string
    email: string
    role: 'editor' | 'admin'
}

export interface AuthState {
    user: User | null
    loading: boolean
}