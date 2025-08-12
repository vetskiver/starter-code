import './App.css'
import { testConnection } from './lib/supabase.js'

function App() {

  const handleTest = async () => {
    console.log('Testing Supabase connection...')
    const result = await testConnection()
    if (result) {
      alert('✅ Supabase connection successful!')
    } else {
      alert('❌ Supabase connection failed. Check console for details.')
    }
  }

  return (
    <div className="App">
      <h1>English-Farsi Flashcards</h1>
      <p>Welcome to your language learning app! 🚀</p>

      {/* Test Button*/}
      <button
        onClick={handleTest}
        style = {{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test Supabase Connection
      </button>
    </div>
  )
}

export default App