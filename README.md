# walletsandmore

Live DApp: [https://walletsandmore.eth.limo](https://walletsandmore.eth.limo)

Monorepo scaffold based on DamirOS setup guides 001 + 002.

## Structure
- `apps/frontend` — React + Vite + RainbowKit/Wagmi (Sepolia)
- `packages/contracts` — Hardhat + OpenZeppelin

## Quick start
1. Copy env files:
   - `apps/frontend/.env.example` -> `apps/frontend/.env.local`
   - `packages/contracts/.env.example` -> `packages/contracts/.env`
2. Install dependencies: `pnpm install`
3. Run frontend: `pnpm dev:arm64` (recommended) or `pnpm dev` if your Node is already arm64
4. Compile contracts: `pnpm compile`

## Notes
- Build counter stored in `apps/frontend/.build-counter`.
- Git hooks installed on `pnpm install` (lint + contract compile + chain ID scan).
- Learning plan: `docs/learning_plan.md`.
