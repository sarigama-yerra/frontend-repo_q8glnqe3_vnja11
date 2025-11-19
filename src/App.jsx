import { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Lobbies from './components/Lobbies'
import Wallet from './components/Wallet'
import UserProfile from './components/UserProfile'

function App() {
  const [view, setView] = useState('dashboard')

  return (
    <div className="min-h-screen bg-black">
      <Navbar onNav={setView} />
      <Hero />

      {/* Main content */}
      <main className="pb-20">
        {view === 'dashboard' && (
          <>
            <Lobbies />
          </>
        )}
        {view === 'wallet' && <Wallet />}
        {view === 'user' && <UserProfile />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/50">
        <div className="mx-auto max-w-7xl px-4">
          <p>Neon vibes • Crypto Arcade</p>
        </div>
      </footer>
    </div>
  )
}

export default App
