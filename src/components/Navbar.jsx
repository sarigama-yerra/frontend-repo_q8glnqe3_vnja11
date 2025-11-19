import { Menu, Wallet, User, Gamepad2 } from 'lucide-react';

export default function Navbar({ onNav }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500" />
          <span className="text-white font-semibold tracking-wide">Crypto Arcade</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-white/80">
          <button onClick={() => onNav('dashboard')} className="hover:text-white transition">Dashboard</button>
          <button onClick={() => onNav('wallet')} className="hover:text-white transition inline-flex items-center gap-2"><Wallet size={18}/> Wallet</button>
          <button onClick={() => onNav('user')} className="hover:text-white transition inline-flex items-center gap-2"><User size={18}/> Profile</button>
        </nav>

        <button className="md:hidden text-white/80 hover:text-white">
          <Menu />
        </button>
      </div>
    </header>
  );
}
