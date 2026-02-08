import OverlayShell from './OverlayShell'

type ErrorOverlayProps = {
  title?: string
  message?: string
  onClose: () => void
}

export default function ErrorOverlay({
  title = 'Transaction failed',
  message = 'Something went wrong. Please try again.',
  onClose
}: ErrorOverlayProps) {
  return (
    <OverlayShell title={title} message={message} onClose={onClose}>
      <div className="mt-4 flex items-center gap-3 text-sm text-rose-300">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20">
          !
        </span>
        Check your wallet or RPC connection.
      </div>
    </OverlayShell>
  )
}
