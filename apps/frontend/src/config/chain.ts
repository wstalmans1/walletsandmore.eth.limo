import { sepolia } from 'wagmi/chains'
import type { Chain } from 'wagmi/chains'

const SUPPORTED_CHAINS = [sepolia] as const
const DEFAULT_ID = sepolia.id

const envChainId = import.meta.env.VITE_APP_CHAIN_ID
const parsed = envChainId ? Number(envChainId) : Number.NaN
const ENV_ID = Number.isFinite(parsed) ? parsed : DEFAULT_ID

export const APP_CHAIN_ID = SUPPORTED_CHAINS.some((chain) => chain.id === ENV_ID)
  ? ENV_ID
  : DEFAULT_ID

export const APP_CHAIN: Chain = SUPPORTED_CHAINS.find((chain) => chain.id === APP_CHAIN_ID)!
export const APP_CHAIN_NAME = APP_CHAIN.name
