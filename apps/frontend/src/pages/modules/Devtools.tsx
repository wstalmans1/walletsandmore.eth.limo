import ModulePage from './ModulePage'

export default function Devtools() {
  return (
    <ModulePage title="Test Devtools" subtitle="Diagnostics and development helpers.">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <p className="text-sm text-slate-300">
          This is a placeholder for developer tools and debug helpers.
        </p>
      </div>
    </ModulePage>
  )
}
