import { useEffect, useState } from 'react'
import { Sword, Trophy, Users, CircleDot } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function LobbyCard({ lobby }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 hover:border-white/20 transition">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_50%)]" />
      <div className="relative flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lobby.accent }} />
            {lobby.title}
          </h3>
          <p className="mt-1 text-sm text-white/60">{lobby.description}</p>
          <div className="mt-4 flex items-center gap-4 text-white/80 text-sm">
            <span className="inline-flex items-center gap-1"><Users size={16}/> {lobby.players} players</span>
            <span className="inline-flex items-center gap-1"><Sword size={16}/> {lobby.difficulty}</span>
            <span className="inline-flex items-center gap-1"><CircleDot size={16}/> {lobby.status}</span>
          </div>
        </div>
        <button className="rounded-lg bg-white/10 text-white px-3 py-2 text-sm hover:bg-white/20 transition">
          Join
        </button>
      </div>
    </div>
  )
}

export default function Lobbies() {
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
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Live Lobbies</h2>
        <div className="text-amber-300 inline-flex items-center gap-2 text-sm"><Trophy size={16}/> Seasonal Rewards Active</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lobbies.map((l) => (
          <LobbyCard key={l.id} lobby={l} />
        ))}
      </div>
    </section>
  )
}
