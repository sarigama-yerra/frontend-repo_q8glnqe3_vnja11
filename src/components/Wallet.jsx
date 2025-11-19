import { useEffect, useState } from 'react'
import { Wallet as WalletIcon, Coins } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Wallet() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/wallet`)
        const d = await res.json()
        setData(d)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  if (!data) return <div className="text-white/70">Loading wallet...</div>

  return (
    <section>
      <div className="flex items-center gap-3 text-white mb-6">
        <WalletIcon />
        <h2 className="text-xl font-semibold">Wallet</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/10 bg-black p-6">
          <div className="text-white/60 text-sm">Address</div>
          <div className="text-white font-mono">{data.address}</div>
          <div className="mt-4 text-white/60 text-sm">Net Worth</div>
          <div className="text-2xl font-semibold text-emerald-400">${data.netWorthUSD.toLocaleString()}</div>
        </div>

        <div className="md:col-span-2 rounded-xl border border-white/10 bg-black p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white">
              <Coins size={18}/> <span className="font-semibold">Tokens</span>
            </div>
            <span className="text-white/60 text-sm">{data.tokens.length} assets</span>
          </div>
          <div className="space-y-3">
            {data.tokens.map(t => (
              <div key={t.symbol} className="flex items-center justify-between text-white/90">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full border border-white/10 bg-black flex items-center justify-center font-bold text-xs">{t.symbol}</div>
                  <div className="text-white">{t.symbol}</div>
                </div>
                <div className="text-right">
                  <div>{t.amount} • ${(t.priceUSD).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
