import ModulePage from './ModulePage'

export default function Mpc() {
  return (
    <ModulePage title="MPC" subtitle="Shared custody signing and recovery flows.">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <p className="text-sm text-slate-300">
          We will explore MPC-based wallets and compare them to passkeys and EOAs.
        </p>
      </div>
    </ModulePage>
  )
}
