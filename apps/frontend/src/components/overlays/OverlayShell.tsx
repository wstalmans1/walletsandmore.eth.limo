import type { ReactNode } from 'react'

type OverlayShellProps = {
  title: string
  message?: string
  children?: ReactNode
  onClose?: () => void
  disableClose?: boolean
}

export default function OverlayShell({
  title,
  message,
  children,
  onClose,
  disableClose = false
}: OverlayShellProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
            {message ? <p className="mt-2 text-sm text-slate-300">{message}</p> : null}
          </div>
          {onClose && !disableClose ? (
            <button
              type="button"
              className="ml-4 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:text-white"
              onClick={onClose}
            >
              Close
            </button>
          ) : null}
        </div>
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </div>
  )
}
