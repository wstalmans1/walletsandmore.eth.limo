/// <reference types="vite/client" />

declare const __BUILD_ID__: string

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly VITE_ALCHEMY_API_KEY: string
  readonly VITE_WALLETCONNECT_PROJECT_ID: string
  readonly VITE_APP_CHAIN_ID?: string
  readonly VITE_MY_TOKEN_ADDRESS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
