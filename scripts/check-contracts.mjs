#!/usr/bin/env node

import { execSync } from 'child_process'

try {
  execSync('pnpm --filter contracts compile', { stdio: 'inherit' })
} catch (error) {
  process.exitCode = 1
}
