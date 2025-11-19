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
    <section>
      <div className="flex items-center gap-3 text-white mb-6">
        <User />
        <h2 className="text-xl font-semibold">Profile</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/10 bg-black p-6">
          <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-lg border border-white/10" />
          <div className="mt-3 text-white text-lg font-medium">{user.username}</div>
          <div className="text-white/60 text-sm">Rank: {user.rank}</div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-white/10 bg-black p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-2"><Award size={18}/> Level {user.level}</span>
              <span className="text-white/60 text-sm">{user.xp}/{user.xpToNext} XP</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black p-6 text-white">
            <div className="flex items-center gap-2 mb-3"><BarChart3 size={18}/> Stats</div>
            <div className="grid grid-cols-2 gap-4 text-white/90">
              <div className="rounded-lg border border-white/10 p-4"><div className="text-white/60 text-sm">Wins</div><div className="text-xl font-semibold">{user.wins}</div></div>
              <div className="rounded-lg border border-white/10 p-4"><div className="text-white/60 text-sm">Losses</div><div className="text-xl font-semibold">{user.losses}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
