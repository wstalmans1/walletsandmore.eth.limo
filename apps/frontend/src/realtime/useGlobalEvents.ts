import { useEffect } from 'react'
import { type Address } from 'viem'

import { useQueryClient } from '@tanstack/react-query'

import { APP_CHAIN_ID } from '../config/chain'
import { scopes } from '../lib/scopes'
import { wsClient } from './wsClient'

export type GlobalEventConfig = {
  enabled?: boolean
  contractAddress?: Address
}

export function useGlobalEvents({ enabled = false, contractAddress }: GlobalEventConfig) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!enabled || !contractAddress) return undefined

    const unwatch = wsClient.watchContractEvent({
      address: contractAddress,
      abi: [], // TODO: replace with contract ABI/event definitions
      onLogs: () => {
        queryClient.invalidateQueries({ queryKey: scopes.orgCount(APP_CHAIN_ID) })
      }
    })

    return () => {
      unwatch()
    }
  }, [enabled, contractAddress, queryClient])
}
