import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { testDir, testManifestPath } = vi.hoisted(() => {
  const os = require('node:os')
  const path = require('node:path')
  const dir = path.join(os.tmpdir(), 'vite-plugin-uni-manifest-test-writer')
  return { testDir: dir, testManifestPath: path.join(dir, 'manifest.json') }
})

vi.mock('../packages/core/src/constant', () => ({
  resolveManifestJsonPath: () => testManifestPath,
  defaultManifestConfig: {},
}))

import { ensureManifestJsonExists, writeManifestJson } from '../packages/core/src/writer'

describe('writeManifestJson', () => {
  beforeEach(() => {
    mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true })
  })

  it('writes valid JSON with default formatting', () => {
    writeManifestJson({ name: 'test' })
    const content = readFileSync(testManifestPath, 'utf-8')
    const parsed = JSON.parse(content)
    expect(parsed).toEqual({ name: 'test' })
    expect(content).toContain('  ')
    expect(content.endsWith('\n')).toBe(false)
  })

  it('writes minified JSON when minify is true', () => {
    writeManifestJson({ name: 'test' }, { minify: true, insertFinalNewline: false } as any)
    const content = readFileSync(testManifestPath, 'utf-8')
    expect(content).toBe('{"name":"test"}')
  })

  it('appends final newline when insertFinalNewline is true', () => {
    writeManifestJson({ name: 'test' }, { minify: false, insertFinalNewline: true } as any)
    const content = readFileSync(testManifestPath, 'utf-8')
    expect(content.endsWith('\n')).toBe(true)
  })

  it('writes empty object when called with no args', () => {
    writeManifestJson()
    const content = readFileSync(testManifestPath, 'utf-8')
    expect(JSON.parse(content)).toEqual({})
  })
})

describe('ensureManifestJsonExists', () => {
  beforeEach(() => {
    mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true })
  })

  it('creates manifest.json if it does not exist', () => {
    ensureManifestJsonExists()
    expect(existsSync(testManifestPath)).toBe(true)
  })

  it('does not overwrite existing manifest.json', () => {
    writeFileSync(testManifestPath, '{"custom":"data"}')
    ensureManifestJsonExists()
    const content = readFileSync(testManifestPath, 'utf-8')
    expect(JSON.parse(content)).toEqual({ custom: 'data' })
  })
})
