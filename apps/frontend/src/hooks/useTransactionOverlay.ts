import { useEffect } from 'react'
import type { Hash } from 'viem'

import { useModalStore } from '../stores/modalStore'

type TransactionOverlayOptions = {
  isPending: boolean
  isConfirming: boolean
  isSuccess: boolean
  isError: boolean
  txHash?: Hash
  errorMessage?: string
}

export function useTransactionOverlay({
  isPending,
  isConfirming,
  isSuccess,
  isError,
  txHash,
  errorMessage
}: TransactionOverlayOptions) {
  const { open, close } = useModalStore()

  useEffect(() => {
    if (isPending) {
      open('tx', {
        title: 'Confirm transaction',
        message: 'Please confirm in your wallet.'
      })
      return
    }

    if (isConfirming) {
      open('tx', {
        title: 'Processing on-chain',
        message: 'Waiting for confirmations.'
      })
      return
    }

    if (isSuccess) {
      open('success', {
        title: 'Transaction confirmed',
        message: txHash ? `Hash: ${txHash}` : 'Your transaction is confirmed.'
      })
      return
    }

    if (isError) {
      open('error', {
        title: 'Transaction failed',
        message: errorMessage || 'Something went wrong. Please try again.'
      })
      return
    }

    close()
  }, [isPending, isConfirming, isSuccess, isError, txHash, errorMessage, open, close])
}
