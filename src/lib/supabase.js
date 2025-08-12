import { createClient } from '@supabase/supabase-js'

// Read Supabase credentials from Vite env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Guard: if env vars are missing, log a clear warning and create a no-op client
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them to your .env file.')
}

// Create the Supabase client (it is okay if keys are missing; calls will fail gracefully)
export const supabase = createClient(supabaseUrl || 'https://example.supabase.co', supabaseAnonKey || 'anon')

// Test function to check if connection works
export const testConnection = async () => {
  try {
    console.log('Starting connection test...')
    console.log('Supabase URL:', supabaseUrl)
    console.log('Supabase Key length:', supabaseAnonKey ? supabaseAnonKey.length : 'undefined')

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase env vars; cannot connect')
      return false
    }

    // Just test if we can connect to Supabase (no auth needed)
    const { data, error } = await supabase.from('_dummy_').select('*').limit(1)

    // We expect an error about the table not existing, but that means connection works!
    if (error && error.message.includes('table')) {
      console.log('✅ Supabase connection successful! (Table error is expected)')
      return true
    }
    console.log('Unexpected result:', data, error)
    return false
  } catch (err) {
    console.log('Connection test error:', err.message)
    return false
  }
}