import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from 'react-router-dom'

type HeaderProps = {
  onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-6 py-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-300 hover:text-white lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <span className="text-lg">☰</span>
        </button>
        <Link to="/" className="text-lg font-semibold text-slate-100 hover:text-white">
          walletsandmore
        </Link>
        <Link
          to="/devtools"
          className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:text-white"
        >
          Test Devtools
        </Link>
      </div>
      <ConnectButton />
    </header>
  )
}
