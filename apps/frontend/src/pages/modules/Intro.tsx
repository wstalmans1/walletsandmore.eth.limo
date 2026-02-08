import ModulePage from './ModulePage'

export default function Intro() {
  return (
    <ModulePage title="Intro" subtitle="Start here: project context, goals, and learning path.">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <h2 className="text-lg font-semibold">What we’re building</h2>
        <p className="mt-2 text-sm text-slate-300">
          A learning DApp that starts with a plain EOA wallet flow, then adds smart accounts and
          embedded wallet models (passkeys, MPC, paymasters, recovery).
        </p>
      </div>
    </ModulePage>
  )
}
