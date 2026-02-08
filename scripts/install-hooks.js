#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, '..')
const GIT_HOOKS_DIR = path.join(PROJECT_ROOT, '.git', 'hooks')

const HOOKS = {
  'pre-commit': [
    'cd apps/frontend && pnpm lint',
    'cd ../..',
    'node scripts/check-contracts.mjs',
    'node scripts/check-hardcoded-chain.mjs'
  ].join(' && ')
}

function installHooks() {
  console.log('🔧 Installing git hooks...')

  if (!fs.existsSync(path.join(PROJECT_ROOT, '.git'))) {
    console.log('⚠️  No .git directory found. Skipping hook installation.')
    return
  }

  if (!fs.existsSync(GIT_HOOKS_DIR)) {
    fs.mkdirSync(GIT_HOOKS_DIR, { recursive: true })
  }

  let installedCount = 0

  for (const [hookName, hookContent] of Object.entries(HOOKS)) {
    const hookPath = path.join(GIT_HOOKS_DIR, hookName)

    try {
      fs.writeFileSync(hookPath, `#!/bin/sh\n${hookContent}\n`)
      fs.chmodSync(hookPath, '755')
      console.log(`✅ Installed ${hookName} hook`)
      installedCount += 1
    } catch (error) {
      console.error(`❌ Failed to install ${hookName} hook:`, error.message)
    }
  }

  if (installedCount > 0) {
    console.log(`\n🎉 Successfully installed ${installedCount} git hook(s)!`)
    console.log('💡 Hooks will now run automatically on every commit.')
  } else {
    console.log('\n⚠️  No hooks were installed.')
  }
}

installHooks()
