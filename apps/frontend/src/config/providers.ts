const normalize = (value: string | undefined) => (value && value.trim() !== '' ? value : undefined)

const ALCHEMY_KEY = normalize(import.meta.env.VITE_ALCHEMY_API_KEY)

if (!ALCHEMY_KEY) {
  const errorMessage =
    '[providers] Missing VITE_ALCHEMY_API_KEY. Please set it in your .env.local file. Get your key from https://www.alchemy.com/'
  console.error(errorMessage)
  throw new Error(errorMessage)
}

import { APP_CHAIN } from './chain'

export const ALCHEMY_API_KEY = ALCHEMY_KEY
export const ALCHEMY_HTTP_SEPOLIA = `https://eth-${APP_CHAIN.name.toLowerCase()}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
export const ALCHEMY_WS_SEPOLIA = `wss://eth-${APP_CHAIN.name.toLowerCase()}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

if (import.meta.env.DEV) {
  console.log('[providers] Alchemy configuration:', {
    apiKey: `${ALCHEMY_API_KEY.substring(0, 10)}...`,
    httpUrl: ALCHEMY_HTTP_SEPOLIA,
    wsUrl: ALCHEMY_WS_SEPOLIA
  })
}
