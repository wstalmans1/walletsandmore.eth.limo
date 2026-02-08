import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
import DevIndicators from '../DevIndicators'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen text-slate-100">
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex flex-col lg:flex-row">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
      <DevIndicators />
    </div>
  )
}
