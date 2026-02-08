import { type Address } from 'viem'
import { useAccount, useBlockNumber, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { APP_CHAIN_NAME } from '../../config/chain'
import { BUILD_ID } from '../../constants/build'
import { useTransactionOverlay } from '../../hooks/useTransactionOverlay'
import ModulePage from './ModulePage'

const tokenAbi = [
  {
    type: 'function',
    name: 'mint',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: []
  }
] as const

const tokenAddress = import.meta.env.VITE_MY_TOKEN_ADDRESS as Address | undefined

export default function EoaBaseline() {
  const { address, isConnected } = useAccount()
  const { data: blockNumber, isLoading } = useBlockNumber({
    watch: isConnected
  })

  const { data: txHash, isPending, isError, error, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash
  })

  useTransactionOverlay({
    isPending,
    isConfirming,
    isSuccess,
    isError,
    txHash,
    errorMessage: error?.message
  })

  const canMint = Boolean(isConnected && address && tokenAddress)

  return (
    <ModulePage title="EOA Baseline" subtitle={`Plain MetaMask flow on ${APP_CHAIN_NAME}.`}>
      <section className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <h2 className="text-lg font-semibold">Connection</h2>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <p>
            Status:{' '}
            <span className={isConnected ? 'text-emerald-400' : 'text-slate-400'}>
              {isConnected ? 'connected' : 'disconnected'}
            </span>
          </p>
          <p>Address: {address ?? '—'}</p>
          <p>Block number: {isConnected ? (isLoading ? 'loading…' : blockNumber?.toString() ?? '—') : '—'}</p>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <h2 className="text-lg font-semibold">Build</h2>
        <p className="mt-2 text-sm text-slate-300">Build id: {BUILD_ID}</p>
      </section>

      <section className="rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-700/60 p-6">
        <h2 className="text-lg font-semibold">Sample write</h2>
        <p className="mt-2 text-sm text-slate-300">
          Calls <span className="text-slate-100">MyToken.mint</span> using the address from
          <span className="text-slate-100"> VITE_MY_TOKEN_ADDRESS</span>.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canMint || isPending || isConfirming}
            onClick={() => {
              if (!address || !tokenAddress) return
              writeContract({
                address: tokenAddress,
                abi: tokenAbi,
                functionName: 'mint',
                args: [address, 1n]
              })
            }}
          >
            Mint 1 token
          </button>
          <span className="text-xs text-slate-400">
            {tokenAddress ? `Contract: ${tokenAddress}` : 'Set VITE_MY_TOKEN_ADDRESS in .env.local'}
          </span>
        </div>
      </section>
    </ModulePage>
  )
}
