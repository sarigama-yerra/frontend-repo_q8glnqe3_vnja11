import { useEffect, useState } from 'react'
import { User, Award, BarChart3 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function UserProfile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/user`)
        const d = await res.json()
        setUser(d)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  if (!user) return <div className="text-white/70">Loading profile...</div>

  const progress = Math.round((user.xp / user.xpToNext) * 100)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center gap-3 text-white mb-6">
        <User />
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-xl bg-white/10" />
          <div className="mt-3 text-white text-xl font-semibold">{user.username}</div>
          <div className="text-white/60">Rank: {user.rank}</div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-2"><Award size={18}/> Level {user.level}</span>
              <span className="text-white/60 text-sm">{user.xp}/{user.xpToNext} XP</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="flex items-center gap-2 mb-3"><BarChart3 size={18}/> Stats</div>
            <div className="grid grid-cols-2 gap-4 text-white/90">
              <div className="rounded-xl bg-white/5 p-4"><div className="text-white/60 text-sm">Wins</div><div className="text-2xl font-semibold">{user.wins}</div></div>
              <div className="rounded-xl bg-white/5 p-4"><div className="text-white/60 text-sm">Losses</div><div className="text-2xl font-semibold">{user.losses}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
