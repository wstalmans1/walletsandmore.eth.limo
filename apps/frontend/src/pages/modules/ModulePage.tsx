import type { ReactNode } from 'react'

type ModulePageProps = {
  title: string
  subtitle: string
  children?: ReactNode
}

export default function ModulePage({ title, subtitle, children }: ModulePageProps) {
  return (
    <section className="space-y-6">
      <header className="rounded-2xl bg-gradient-to-r from-emerald-700/45 via-emerald-800/35 to-emerald-900/20 px-6 py-6">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-sm text-emerald-100/90">{subtitle}</p>
      </header>
      {children}
    </section>
  )
}
