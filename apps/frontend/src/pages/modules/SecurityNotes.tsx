import ModulePage from './ModulePage'

export default function SecurityNotes() {
  return (
    <ModulePage title="Security Notes" subtitle="Threat modeling and mitigations.">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <p className="text-sm text-slate-300">
          We will document risks, mitigations, and operational best practices here.
        </p>
      </div>
    </ModulePage>
  )
}
