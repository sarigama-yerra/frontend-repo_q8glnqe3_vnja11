import { Wallet, User } from 'lucide-react';

export default function Navbar({ onNav, current }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-emerald-500" />
          <span className="text-white font-medium tracking-wide">Crypto Arcade</span>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => onNav('dashboard')}
            className={`px-3 py-1.5 rounded-md text-sm transition border border-white/10 hover:border-emerald-400/50 ${current==='dashboard' ? 'bg-white/5 text-white' : 'text-white/70'}`}
          >Dashboard</button>
          <button
            onClick={() => onNav('wallet')}
            className={`px-3 py-1.5 rounded-md text-sm transition border border-white/10 hover:border-emerald-400/50 inline-flex items-center gap-2 ${current==='wallet' ? 'bg-white/5 text-white' : 'text-white/70'}`}
          ><Wallet size={16}/> Wallet</button>
          <button
            onClick={() => onNav('user')}
            className={`px-3 py-1.5 rounded-md text-sm transition border border-white/10 hover:border-emerald-400/50 inline-flex items-center gap-2 ${current==='user' ? 'bg-white/5 text-white' : 'text-white/70'}`}
          ><User size={16}/> Profile</button>
        </nav>
      </div>
    </header>
  );
}
