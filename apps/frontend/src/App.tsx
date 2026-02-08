import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Devtools from './pages/modules/Devtools'
import EoaBaseline from './pages/modules/EoaBaseline'
import Intro from './pages/modules/Intro'
import Mpc from './pages/modules/Mpc'
import Passkeys from './pages/modules/Passkeys'
import Paymaster from './pages/modules/Paymaster'
import Recovery from './pages/modules/Recovery'
import SecurityNotes from './pages/modules/SecurityNotes'
import SmartAccounts from './pages/modules/SmartAccounts'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Intro />} />
        <Route path="eoa-baseline" element={<EoaBaseline />} />
        <Route path="smart-accounts" element={<SmartAccounts />} />
        <Route path="passkeys" element={<Passkeys />} />
        <Route path="mpc" element={<Mpc />} />
        <Route path="paymaster" element={<Paymaster />} />
        <Route path="recovery" element={<Recovery />} />
        <Route path="security-notes" element={<SecurityNotes />} />
        <Route path="devtools" element={<Devtools />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
