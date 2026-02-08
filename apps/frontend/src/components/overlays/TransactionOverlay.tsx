import OverlayShell from './OverlayShell'

type TransactionOverlayProps = {
  title?: string
  message?: string
}

export default function TransactionOverlay({
  title = 'Confirm transaction',
  message = 'Please confirm in your wallet.'
}: TransactionOverlayProps) {
  return (
    <OverlayShell title={title} message={message} disableClose>
      <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
        <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-amber-400" />
        Waiting for signature or network confirmation.
      </div>
    </OverlayShell>
  )
}
