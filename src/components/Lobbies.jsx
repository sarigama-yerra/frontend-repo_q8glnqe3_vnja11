import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function LobbyPill({ lobby }) {
  return (
    <button className="group relative w-full max-w-xl rounded-xl border border-white/10 bg-black px-5 py-4 text-left transition hover:border-emerald-500/50">
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition" style={{boxShadow:'0 0 0 1px rgba(16,185,129,0.35), 0 8px 30px rgba(16,185,129,0.08)'}} />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lobby.accent }} />
            <h3 className="text-lg font-medium text-white">{lobby.title}</h3>
          </div>
          <p className="mt-1 text-sm text-white/60">{lobby.description}</p>
        </div>
        <div className="text-right">
          <div className="text-white/80 text-sm inline-flex items-center gap-1"><Users size={16}/> {lobby.players}</div>
          <div className="mt-1 text-xs text-white/50">{lobby.difficulty} • {lobby.status}</div>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-md bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 transition">Join</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function Lobbies({ centered=false }) {
  const [lobbies, setLobbies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/lobbies`)
        const data = await res.json()
        setLobbies(data.lobbies || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="text-white/70">Loading lobbies...</div>
  }

  return (
    <section className={`${centered ? 'w-full flex flex-col items-center' : ''}`}>
      <div className="space-y-4">
        {lobbies.map((l) => (
          <LobbyPill key={l.id} lobby={l} />
        ))}
      </div>
    </section>
  )
}
