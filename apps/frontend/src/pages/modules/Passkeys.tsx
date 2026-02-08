import ModulePage from './ModulePage'

export default function Passkeys() {
  return (
    <ModulePage title="Passkeys" subtitle="WebAuthn-based keys and device-native signing.">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <p className="text-sm text-slate-300">
          We will integrate passkeys here and compare UX and recovery tradeoffs.
        </p>
      </div>
    </ModulePage>
  )
}
