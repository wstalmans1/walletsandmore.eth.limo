import { create } from 'zustand'

export type OverlayKind = 'tx' | 'success' | 'error'

export type TxOverlayState = {
  title: string
  message: string
  txHash?: string
}

type ModalState = {
  overlay: OverlayKind | null
  payload?: TxOverlayState
  open: (overlay: OverlayKind, payload?: TxOverlayState) => void
  close: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  overlay: null,
  payload: undefined,
  open: (overlay, payload) => set({ overlay, payload }),
  close: () => set({ overlay: null, payload: undefined })
}))
