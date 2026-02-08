import ModulePage from './ModulePage'

export default function Recovery() {
  return (
    <ModulePage title="Recovery" subtitle="Device loss, guardians, and fallback strategies.">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <p className="text-sm text-slate-300">
          We will compare recovery strategies across passkeys, MPC, and smart accounts.
        </p>
      </div>
    </ModulePage>
  )
}
