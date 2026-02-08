# Learning Plan — Smart Accounts & Embedded Wallets

This project is a learning DApp that starts with a plain EOA wallet flow and gradually adds smart accounts and embedded wallet models. The plan is designed to be hands-on and iterative.

## Phase 0 — Project Baseline (Week 0)
- Confirm local dev setup (Node, pnpm, env vars, Sepolia).
- Verify the app runs and connects with a standard wallet (MetaMask).
- Outcome: working baseline DApp + shared understanding of repo structure.

## Phase 1 — Foundations (Week 1)
- Concepts: EOA vs smart accounts, custody models, recovery basics.
- Map the architecture of this repo: frontend, contracts, RPC, bundler/paymaster later.
- Outcome: glossary + short architecture diagram and notes.

## Phase 2 — Smart Account Core (Week 2)
- EIP-4337 flow: UserOperation, bundlers, paymasters, validation.
- Introduce a minimal smart account flow in the app (initial scaffolding, no advanced features yet).
- Outcome: working smart account transaction on Sepolia.

## Phase 3 — Embedded Wallet Track A (Week 3)
- Passkeys (WebAuthn): device-native keys and UX.
- Implement passkey-based account flow as a modular wallet backend.
- Outcome: passkey onboarding + signing flow in app.

## Phase 4 — Embedded Wallet Track B (Week 4)
- MPC / shared custody: key shares, server-assisted signing.
- Implement MPC-based flow (or integrate a provider) as a modular wallet backend.
- Outcome: MPC flow in app + recovery notes.

## Phase 5 — Embedded Wallet Track C (Week 5)
- Hosted/custodial model (for comparison only).
- Outcome: UX comparison and trade-off analysis.

## Phase 6 — Gas & Paymaster (Week 6)
- Sponsor transactions via paymaster.
- Implement a policy-based gas sponsorship flow.
- Outcome: gasless user journey.

## Phase 7 — Recovery & Security (Week 7)
- Recovery flows across passkeys, MPC, smart accounts.
- Threat model + mitigations checklist.
- Outcome: recovery plan and security notes module.

## Phase 8 — Polish & Demo (Optional)
- UX refinements, docs, demo walkthrough.
- Outcome: demo-ready learning DApp.

## Learning Modules (App Navigation)
- Intro
- EOA Baseline
- Smart Accounts
- Passkeys
- MPC
- Paymaster
- Recovery
- Security Notes
