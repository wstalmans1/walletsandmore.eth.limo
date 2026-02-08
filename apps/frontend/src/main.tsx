import { Buffer } from 'buffer'
import * as util from 'util'

if (typeof window !== 'undefined') {
  ;(window as any).Buffer = Buffer
  ;(window as any).util = util
  ;(window as any).global = window
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'

import { config } from './config/wagmi'
import ModalManager from './components/ModalManager'
import App from './App'

import '@rainbow-me/rainbowkit/styles.css'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: (previousData: unknown) => previousData,
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30_000,
      gcTime: 5 * 60 * 1000
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
        <ModalManager />
        {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
