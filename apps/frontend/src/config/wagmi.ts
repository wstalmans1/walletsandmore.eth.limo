import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http, webSocket } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { ALCHEMY_HTTP_SEPOLIA, ALCHEMY_WS_SEPOLIA } from './providers'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  console.warn('VITE_WALLETCONNECT_PROJECT_ID not found. WalletConnect will not work until it is set.')
}

const isMobile =
  typeof window !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

function buildSepoliaTransport() {
  if (isMobile) {
    return http(ALCHEMY_HTTP_SEPOLIA)
  }

  return webSocket(ALCHEMY_WS_SEPOLIA)
}

export const config = getDefaultConfig({
  appName: 'walletsandmore',
  projectId: projectId || 'missing-project-id',
  chains: [sepolia],
  transports: {
    [sepolia.id]: buildSepoliaTransport()
  }
})
