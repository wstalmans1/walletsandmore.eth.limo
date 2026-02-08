export type LearningModule = {
  id: string
  label: string
  path: string
  description: string
}

export const learningModules: LearningModule[] = [
  {
    id: 'intro',
    label: 'Intro',
    path: '/',
    description: 'Project overview, goals, and how to navigate the learning path.'
  },
  {
    id: 'eoa-baseline',
    label: 'EOA Baseline',
    path: '/eoa-baseline',
    description: 'Plain MetaMask flow: connect, read, write, and basic UX.'
  },
  {
    id: 'smart-accounts',
    label: 'Smart Accounts',
    path: '/smart-accounts',
    description: 'EIP-4337 core flow: UserOperation, bundler, paymaster, validation.'
  },
  {
    id: 'passkeys',
    label: 'Passkeys',
    path: '/passkeys',
    description: 'WebAuthn-based keys, device UX, and recovery implications.'
  },
  {
    id: 'mpc',
    label: 'MPC',
    path: '/mpc',
    description: 'Shared-custody signing and recovery flows.'
  },
  {
    id: 'paymaster',
    label: 'Paymaster',
    path: '/paymaster',
    description: 'Sponsorship policies, gas abstraction, and limits.'
  },
  {
    id: 'recovery',
    label: 'Recovery',
    path: '/recovery',
    description: 'Device loss, guardians, and fallback strategies.'
  },
  {
    id: 'security-notes',
    label: 'Security Notes',
    path: '/security-notes',
    description: 'Threat modeling, mitigations, and operational safety.'
  }
]
