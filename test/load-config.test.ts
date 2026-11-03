import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { generateManifest } from '../packages/core/src/watcher'

// Real c12 and Vite `loadEnv`: dotenv handling is not ours to mock, and this is
// the only place the config file actually reads the variables back.
const KEY = {
  env: 'VITE_PLUGIN_UNI_MANIFEST_TEST_ENV',
  local: 'VITE_PLUGIN_UNI_MANIFEST_TEST_LOCAL',
  mode: 'VITE_PLUGIN_UNI_MANIFEST_TEST_MODE',
  modeLocal: 'VITE_PLUGIN_UNI_MANIFEST_TEST_MODE_LOCAL',
}
const SHARED_KEY = 'VITE_PLUGIN_UNI_MANIFEST_TEST_SHARED'
const ALL_KEYS = [
  ...Object.values(KEY),
  SHARED_KEY,
]

describe('dotenv loading', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'vite-plugin-uni-manifest-dotenv-'))
    writeFileSync(join(dir, 'manifest.config.mjs'), `export default {
  name: [${Object.values(KEY).map(key => `process.env.${key} ?? '-'`).join(', ')}].join('|'),
  description: process.env.${SHARED_KEY} ?? '-',
}
`)
    for (const key of ALL_KEYS) delete process.env[key]
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
    for (const key of ALL_KEYS) delete process.env[key]
  })

  it('reads .env, .env.local, .env.{mode} and .env.{mode}.local', async () => {
    writeFileSync(join(dir, '.env'), `${KEY.env}=env\n`)
    writeFileSync(join(dir, '.env.local'), `${KEY.local}=local\n`)
    writeFileSync(join(dir, '.env.development'), `${KEY.mode}=mode\n`)
    writeFileSync(join(dir, '.env.development.local'), `${KEY.modeLocal}=mode-local\n`)

    await generateManifest({ cwd: dir, outDir: dir, dotenv: true }, 'development')

    expect(JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf-8')).name)
      .toBe('env|local|mode|mode-local')
  })

  it('lets later files win', async () => {
    writeFileSync(join(dir, '.env'), `${SHARED_KEY}=from-env\n`)
    writeFileSync(join(dir, '.env.development.local'), `${SHARED_KEY}=from-mode-local\n`)

    await generateManifest({ cwd: dir, outDir: dir, dotenv: true }, 'development')

    expect(JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf-8')).description)
      .toBe('from-mode-local')
  })

  it('keeps an environment variable that is already set', async () => {
    writeFileSync(join(dir, '.env'), `${SHARED_KEY}=from-env\n`)
    process.env[SHARED_KEY] = 'from-process'

    await generateManifest({ cwd: dir, outDir: dir, dotenv: true }, 'development')

    expect(JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf-8')).description)
      .toBe('from-process')
  })

  it('leaves a hand-written manifest.json alone when there is no config file', async () => {
    const srcDir = join(dir, 'src')
    mkdirSync(srcDir, { recursive: true })
    writeFileSync(join(srcDir, 'manifest.json'), '{"name":"hand-written"}')
    rmSync(join(dir, 'manifest.config.mjs'))

    await generateManifest({ cwd: dir, outDir: srcDir }, 'development')

    expect(readFileSync(join(srcDir, 'manifest.json'), 'utf-8')).toBe('{"name":"hand-written"}')
  })

  it('ignores .env files unless dotenv is on', async () => {
    writeFileSync(join(dir, '.env'), `${KEY.env}=env\n`)

    await generateManifest({ cwd: dir, outDir: dir }, 'development')

    expect(JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf-8')).name)
      .toBe('-|-|-|-')
  })
})
