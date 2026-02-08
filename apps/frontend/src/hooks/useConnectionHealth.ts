import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { wsClient } from '../realtime/wsClient'

type ConnectionQuality = 'excellent' | 'good' | 'poor' | 'failed'

type HealthState = {
  quality: ConnectionQuality
  lastLatencyMs?: number
  consecutiveFailures: number
}

const QUALITY_THRESHOLDS = {
  excellent: 500,
  good: 1000,
  poor: 1500
}

export function useConnectionHealth(pollIntervalMs = 15000) {
  const [state, setState] = useState<HealthState>({
    quality: 'failed',
    lastLatencyMs: undefined,
    consecutiveFailures: 0
  })

  const isMounted = useRef(true)

  const measureHealth = useCallback(async () => {
    const start = performance.now()
    try {
      await wsClient.getBlockNumber()
      const latency = Math.round(performance.now() - start)

      if (!isMounted.current) return

      const quality: ConnectionQuality =
        latency <= QUALITY_THRESHOLDS.excellent
          ? 'excellent'
          : latency <= QUALITY_THRESHOLDS.good
          ? 'good'
          : latency <= QUALITY_THRESHOLDS.poor
          ? 'poor'
          : 'failed'

      setState({
        quality,
        lastLatencyMs: latency,
        consecutiveFailures: 0
      })
    } catch (error) {
      if (!isMounted.current) return

      setState((prev) => ({
        quality: 'failed',
        lastLatencyMs: prev.lastLatencyMs,
        consecutiveFailures: prev.consecutiveFailures + 1
      }))
    }
  }, [])

  useEffect(() => {
    isMounted.current = true
    measureHealth()

    const id = window.setInterval(measureHealth, pollIntervalMs)
    return () => {
      isMounted.current = false
      window.clearInterval(id)
    }
  }, [measureHealth, pollIntervalMs])

  const statusLabel = useMemo(() => {
    if (state.quality === 'failed') return 'Unhealthy'
    return 'Healthy'
  }, [state.quality])

  return {
    quality: state.quality,
    status: statusLabel,
    latencyMs: state.lastLatencyMs,
    consecutiveFailures: state.consecutiveFailures
  }
}
