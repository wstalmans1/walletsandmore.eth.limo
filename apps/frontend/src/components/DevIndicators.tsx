import { useConnectionHealth } from '../hooks/useConnectionHealth'

const qualityStyles = {
  excellent: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
  good: 'border-sky-400/40 bg-sky-500/10 text-sky-200',
  poor: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
  failed: 'border-rose-400/40 bg-rose-500/10 text-rose-200'
} as const

export default function DevIndicators() {
  const { status, quality, latencyMs } = useConnectionHealth()

  return (
    <div
      className={`fixed bottom-4 left-4 max-w-[70vw] overflow-hidden text-ellipsis whitespace-nowrap rounded-full border px-4 py-2 text-xs shadow-lg lg:right-20 lg:left-auto lg:max-w-sm ${
        qualityStyles[quality]
      }`}
      title={`WebSocket: ${status} · Quality: ${quality}${latencyMs ? ` · ${latencyMs}ms` : ''}`}
    >
      WebSocket: {status} · Quality: {quality}
      {latencyMs ? ` · ${latencyMs}ms` : ''}
    </div>
  )
}
