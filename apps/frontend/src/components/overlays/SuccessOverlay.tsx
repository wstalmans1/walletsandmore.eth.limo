import OverlayShell from './OverlayShell'

type SuccessOverlayProps = {
  title?: string
  message?: string
  onClose: () => void
}

export default function SuccessOverlay({
  title = 'Success',
  message = 'Transaction confirmed.',
  onClose
}: SuccessOverlayProps) {
  return (
    <OverlayShell title={title} message={message} onClose={onClose}>
      <div className="mt-4 flex items-center gap-3 text-sm text-emerald-300">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
          ✓
        </span>
        You can close this and continue.
      </div>
    </OverlayShell>
  )
}
