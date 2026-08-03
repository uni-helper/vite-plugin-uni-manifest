import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ensureManifestJsonExists, writeManifestJson } from '../packages/core/src/writer'

const { testDir, testManifestPath, customOutDir, customManifestPath } = vi.hoisted(() => {
  const os = require('node:os')
  const path = require('node:path')
  const dir = path.join(os.tmpdir(), 'vite-plugin-uni-manifest-test-writer')
  const custom = path.join(dir, 'custom')
  return {
    testDir: dir,
    testManifestPath: path.join(dir, 'manifest.json'),
    customOutDir: custom,
    customManifestPath: path.join(custom, 'manifest.json'),
  }
})

vi.mock('../packages/core/src/paths', () => {
  const path = require('node:path')
  return {
    resolveManifestJsonPath: (outDir?: string) => outDir ? path.join(outDir, 'manifest.json') : testManifestPath,
  }
})

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

  it('writes to outDir when provided in opts', () => {
    mkdirSync(customOutDir, { recursive: true })
    writeManifestJson({ name: 'custom' }, { outDir: customOutDir } as any)
    const content = readFileSync(customManifestPath, 'utf-8')
    expect(JSON.parse(content)).toEqual({ name: 'custom' })
  })

  it('skips writing when content is unchanged', () => {
    writeManifestJson({ name: 'test' })
    const before = statSync(testManifestPath).mtimeMs
    writeManifestJson({ name: 'test' })
    expect(statSync(testManifestPath).mtimeMs).toBe(before)
    // sanity check: a changed config does rewrite the file
    writeManifestJson({ name: 'changed' })
    expect(statSync(testManifestPath).mtimeMs).not.toBe(before)
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

  it('creates manifest.json in outDir when provided in opts', () => {
    mkdirSync(customOutDir, { recursive: true })
    ensureManifestJsonExists({ outDir: customOutDir } as any)
    expect(existsSync(customManifestPath)).toBe(true)
  })
})
