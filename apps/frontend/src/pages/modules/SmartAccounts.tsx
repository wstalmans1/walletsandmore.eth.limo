import ModulePage from './ModulePage'

export default function SmartAccounts() {
  return (
    <ModulePage title="Smart Accounts" subtitle="EIP-4337 flow and account abstraction concepts.">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <p className="text-sm text-slate-300">
          We will wire UserOperation submission, bundlers, validation, and paymaster support here.
        </p>
      </div>
    </ModulePage>
  )
}
