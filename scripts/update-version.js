#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packagePath = path.join(__dirname, '..', 'apps', 'frontend', 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
const version = packageJson.version

const buildConstantsPath = path.join(__dirname, '..', 'apps', 'frontend', 'src', 'constants', 'build.ts')
let buildConstantsContent = fs.readFileSync(buildConstantsPath, 'utf8')

const versionRegex = /export const APP_VERSION = ['"`][^'"`]*['"`]/
const newVersionLine = `export const APP_VERSION = '${version}'`

if (versionRegex.test(buildConstantsContent)) {
  buildConstantsContent = buildConstantsContent.replace(versionRegex, newVersionLine)
  console.log(`✅ Updated APP_VERSION to ${version}`)
} else {
  console.warn('⚠️  Could not find APP_VERSION constant to update')
}

const timestampRegex = /export const BUILD_TIMESTAMP = \d+/
const newTimestampLine = `export const BUILD_TIMESTAMP = ${Date.now()}`

if (timestampRegex.test(buildConstantsContent)) {
  buildConstantsContent = buildConstantsContent.replace(timestampRegex, newTimestampLine)
  console.log(`✅ Updated BUILD_TIMESTAMP to ${Date.now()}`)
} else {
  console.warn('⚠️  Could not find BUILD_TIMESTAMP constant to update')
}

fs.writeFileSync(buildConstantsPath, buildConstantsContent)
console.log(`🚀 Build constants updated for version ${version}`)
