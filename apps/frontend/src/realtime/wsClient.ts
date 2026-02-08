import { createPublicClient, webSocket } from 'viem'
import { sepolia } from 'viem/chains'

import { ALCHEMY_WS_SEPOLIA } from '../config/providers'

export const wsClient = createPublicClient({
  chain: sepolia,
  transport: webSocket(ALCHEMY_WS_SEPOLIA)
})
