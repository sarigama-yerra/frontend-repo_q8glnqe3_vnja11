import { useState } from 'react'
import Navbar from './components/Navbar'
import Lobbies from './components/Lobbies'
import Wallet from './components/Wallet'
import UserProfile from './components/UserProfile'

function App() {
  const [view, setView] = useState('dashboard')

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onNav={setView} current={view} />

      <main className="px-4">
        {view === 'dashboard' && (
          <div className="min-h-[70vh] flex items-center justify-center">
            <Lobbies centered minimal />
          </div>
        )}
        {view === 'wallet' && <div className="max-w-7xl mx-auto py-12"><Wallet /></div>}
        {view === 'user' && <div className="max-w-7xl mx-auto py-12"><UserProfile /></div>}
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-white/50">
        <p>Crypto Arcade</p>
      </footer>
    </div>
  )
}

export default App
