import { NavLink, useLocation } from 'react-router-dom'

import { learningModules } from '../../config/modules'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const activeModule = learningModules.find((module) => module.path === location.pathname) ?? learningModules[0]

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-30 bg-slate-950/70 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-label="Close sidebar"
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-slate-800 bg-transparent px-6 py-6 transition-transform lg:static lg:h-auto lg:w-80 lg:translate-x-0 lg:border-b-0 lg:bg-transparent ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between lg:hidden">
          <span className="text-sm uppercase tracking-wide text-slate-400">Navigation</span>
          <button
            type="button"
            className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4 rounded-xl bg-gradient-to-br from-emerald-700/30 via-emerald-800/15 to-slate-900/20 p-5 text-slate-100">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-lg">🏛️</div>
          <div>
            <p className="text-sm uppercase tracking-wide text-emerald-100">Current module</p>
            <h2 className="text-lg font-semibold">{activeModule.label}</h2>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-200/90">{activeModule.description}</p>
      </div>

      <nav className="mt-6 space-y-2">
        {learningModules.map((module) => (
          <NavLink
            key={module.id}
            to={module.path}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                isActive ? 'bg-slate-800 text-slate-100' : 'text-slate-300 hover:bg-slate-800/70'
              }`
            }
            end={module.path === '/'}
            onClick={onClose}
          >
            <span>{module.label}</span>
          </NavLink>
        ))}
      </nav>
      </aside>
    </>
  )
}
