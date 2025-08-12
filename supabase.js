import { createClient } from '@supabase/supabase-js'

// My supabase credentials from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test function to check if connection works
export const testConnection = async () => {
    try {
        console.log('Starting connection test...')
        console.log('Supabase URL:', supabaseUrl)
        console.log('Supabase Key length:', supabaseAnonKey ? supabaseAnonKey.length : 'undefined')
        
        // Just test if we can connect to Supabase (no auth needed)
        const { data, error } = await supabase.from('_dummy_').select('*').limit(1)

        // We expect an error about the table not existing, but that means connection works!
        if (error && error.message.includes('table')) {
            console.log('✅ Supabase connection successful! (Table error is expected)')
            return true 
        }
        console.log('Unexpected result:', data, error)
        return false 
    }   catch (err) {
        console.log('Connection test error:', err.message)
        return false
    }
}