import { useModalStore } from '../stores/modalStore'
import ErrorOverlay from './overlays/ErrorOverlay'
import SuccessOverlay from './overlays/SuccessOverlay'
import TransactionOverlay from './overlays/TransactionOverlay'

export default function ModalManager() {
  const { overlay, payload, close } = useModalStore()

  if (!overlay) return null

  if (overlay === 'tx') {
    return <TransactionOverlay title={payload?.title} message={payload?.message} />
  }

  if (overlay === 'success') {
    return (
      <SuccessOverlay
        title={payload?.title}
        message={payload?.message}
        onClose={close}
      />
    )
  }

  return <ErrorOverlay title={payload?.title} message={payload?.message} onClose={close} />
}
