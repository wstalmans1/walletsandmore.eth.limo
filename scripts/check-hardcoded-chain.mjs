#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.join(PROJECT_ROOT, 'apps', 'frontend', 'src')

const ALLOWED_FILES = [
  'apps/frontend/src/config/chain.ts',
  'apps/frontend/src/config/wagmi.ts',
  'apps/frontend/src/utils/etherscan.ts',
  'scripts/check-hardcoded-chain.mjs'
]

const PATTERNS = [
  /sepolia\.id/g,
  /sepolia\.id\b/g,
  /\b11155111\b/g,
  /===\s*11155111/g,
  /chainId:\s*11155111/g,
  /\bsepolia\b/g,
  /mainnet\.id/g,
  /chainId:\s*1\b/g,
  /chainId:\s*1,/g,
  /chainId:\s*1\)/g,
  /chainId:\s*1\s*$/g
]

function isLegitimateChainIdOne(line) {
  return (
    line.includes('// Mainnet for ENS') ||
    line.includes('// ENS resolution') ||
    line.includes('// ENS only works on Mainnet')
  )
}

function isLegitimateChainIdReference(line, pattern) {
  if (pattern.source.includes('sepolia\\.id') || pattern.source.includes('mainnet\\.id')) {
    if (line.includes('import') && line.includes('from')) return true
    if (line.includes('[') && line.includes(']:')) return true
    if (line.includes('//')) return true
  }

  if (pattern.source.includes('\\bsepolia\\b') && line.includes('import')) return true

  return false
}

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const violations = []

    PATTERNS.forEach((pattern) => {
      const matches = content.match(pattern)
      if (matches) {
        const lines = content
          .split('\n')
          .map((line, index) => {
            if (pattern.test(line)) {
              if (pattern.source.includes('chainId:\\s*1') && isLegitimateChainIdOne(line)) {
                return null
              }
              if (isLegitimateChainIdReference(line, pattern)) {
                return null
              }
              return { lineNumber: index + 1, content: line.trim() }
            }
            return null
          })
          .filter(Boolean)

        if (lines.length > 0) {
          violations.push({
            pattern: pattern.source,
            count: lines.length,
            lines
          })
        }
      }
    })

    return violations
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return []
  }
}

function getAllFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = []

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir)

    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath)
      } else if (stat.isFile() && extensions.includes(path.extname(item))) {
        files.push(fullPath)
      }
    }
  }

  traverse(dir)
  return files
}

function main() {
  console.log('🔍 Checking for hardcoded chain IDs...')

  const allFiles = getAllFiles(SRC_DIR)
  let totalViolations = 0
  const filesWithViolations = []

  for (const file of allFiles) {
    const relativePath = path.relative(PROJECT_ROOT, file)

    if (ALLOWED_FILES.includes(relativePath)) {
      continue
    }

    const violations = checkFile(file)

    if (violations.length > 0) {
      filesWithViolations.push({ file: relativePath, violations })
      totalViolations += violations.reduce((sum, v) => sum + v.count, 0)
    }
  }

  if (filesWithViolations.length === 0) {
    console.log('✅ No hardcoded chain IDs found outside config files!')
    process.exit(0)
  }

  console.log(
    `❌ Found ${totalViolations} hardcoded chain ID usage(s) in ${filesWithViolations.length} file(s):`
  )
  console.log()

  for (const { file, violations } of filesWithViolations) {
    console.log(`📁 ${file}:`)
    violations.forEach((violation) => {
      console.log(`   Pattern: ${violation.pattern} (${violation.count} occurrences)`) 
      violation.lines.forEach((line) => {
        console.log(`     Line ${line.lineNumber}: ${line.content}`)
      })
    })
    console.log()
  }

  console.log('💡 Please use APP_CHAIN_ID from src/config/chain.ts instead of hardcoded IDs')
  process.exit(1)
}

main()
