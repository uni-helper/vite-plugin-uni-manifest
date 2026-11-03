import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { disable } from 'obug'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { debug } from '../packages/core/src/logger'
import { createManifestWatcher, generateManifest } from '../packages/core/src/watcher'

const { mockWriteManifestJson, mockUnwatch, mockWatchConfig, mockLoadConfig } = vi.hoisted(() => ({
  mockWriteManifestJson: vi.fn(),
  mockUnwatch: vi.fn().mockResolvedValue(undefined),
  mockWatchConfig: vi.fn(),
  mockLoadConfig: vi.fn().mockResolvedValue({
    config: { name: 'test' },
  }),
}))

vi.mock('../packages/core/src/paths', () => ({
  resolveManifestJsonPath: () => '/tmp/test-manifest.json',
}))

vi.mock('../packages/core/src/defaults', () => ({
  defaultManifestConfig: {},
}))

vi.mock('../packages/core/src/writer', () => ({
  writeManifestJson: mockWriteManifestJson,
}))

// 'c12' is not resolvable from the repo root under pnpm strict node_modules,
// so mock it via the path that packages/core resolves it to.
vi.mock('../packages/core/node_modules/c12', () => ({
  loadConfig: mockLoadConfig,
  watchConfig: mockWatchConfig,
}))

// Capture the onUpdate hook so tests can simulate config-change events.
let capturedOnUpdate: ((params: { newConfig: { config: any }, getDiff: () => unknown[] }) => void) | undefined
mockWatchConfig.mockImplementation(async (opts: any) => {
  capturedOnUpdate = opts.onUpdate
  return {
    config: { name: 'test' },
    unwatch: mockUnwatch,
  }
})

describe('createManifestWatcher', () => {
  it('resolves options with defaults', async () => {
    const watcher = await createManifestWatcher({})
    expect(watcher.options.minify).toBe(false)
    expect(watcher.options.insertFinalNewline).toBe(false)
    expect(watcher.options.indent).toBe(2)
    expect(watcher.options.eol).toBe('\n')
    expect(watcher.options.debug).toBe(false)
  })

  it('merges user options', async () => {
    const watcher = await createManifestWatcher({ minify: true, indent: '\t', eol: '\r\n' })
    expect(watcher.options.minify).toBe(true)
    expect(watcher.options.indent).toBe('\t')
    expect(watcher.options.eol).toBe('\r\n')
  })

  it('merges user outDir option', async () => {
    const watcher = await createManifestWatcher({ outDir: '/custom/out' })
    expect(watcher.options.outDir).toBe('/custom/out')
  })

  it('writes initial config and returns unwatch', async () => {
    mockWriteManifestJson.mockClear()
    const watcher = await createManifestWatcher({})
    expect(mockWriteManifestJson).toHaveBeenCalled()
    expect(typeof watcher.unwatch).toBe('function')
  })

  it('skips writing manifest.json when the config diff is empty', async () => {
    await createManifestWatcher({})
    expect(mockWatchConfig).toHaveBeenCalled()
    mockWriteManifestJson.mockClear()

    capturedOnUpdate!({
      newConfig: {
        config: { name: 'test' },
      },
      getDiff: () => [],
    })

    expect(mockWriteManifestJson).not.toHaveBeenCalled()
  })

  it('writes manifest.json when the config diff is not empty', async () => {
    await createManifestWatcher({})
    mockWriteManifestJson.mockClear()

    capturedOnUpdate!({
      newConfig: {
        config: { name: 'changed' },
      },
      getDiff: () => [
        ['name', 'test', 'changed'],
      ],
    })

    expect(mockWriteManifestJson).toHaveBeenCalledWith({ name: 'changed' }, expect.objectContaining({ minify: false, debug: false }))
  })
})

describe('generateManifest', () => {
  it('loads and writes the config without creating a watcher', async () => {
    mockLoadConfig.mockClear()
    mockWatchConfig.mockClear()
    mockWriteManifestJson.mockClear()

    await generateManifest({ minify: true })

    expect(mockLoadConfig).toHaveBeenCalledWith(expect.objectContaining({
      name: 'manifest',
      rcFile: false,
      packageJson: false,
    }))
    expect(mockWriteManifestJson).toHaveBeenCalledWith(
      { name: 'test' },
      expect.objectContaining({ minify: true }),
    )
    expect(mockWatchConfig).not.toHaveBeenCalled()
  })
})

describe('dotenv option', () => {
  const envKey = 'VITE_PLUGIN_UNI_MANIFEST_WATCHER_ENV'
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'vite-plugin-uni-manifest-watcher-dotenv-'))
    delete process.env[envKey]
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
    delete process.env[envKey]
  })

  it('loads .env and .env.{mode} into process.env when dotenv is on', async () => {
    writeFileSync(join(dir, '.env'), `${envKey}=from-env\n`)
    writeFileSync(join(dir, '.env.staging'), `${envKey}=from-mode\n`)

    await createManifestWatcher({ cwd: dir, dotenv: true }, 'staging')

    expect(process.env[envKey]).toBe('from-mode')
  })

  it('leaves process.env alone when dotenv is off', async () => {
    writeFileSync(join(dir, '.env'), `${envKey}=from-env\n`)

    await createManifestWatcher({ cwd: dir }, 'staging')

    expect(process.env[envKey]).toBeUndefined()
  })
})

describe('c12 config options', () => {
  it('passes no merger by default', async () => {
    mockWatchConfig.mockClear()

    await createManifestWatcher({})

    expect(mockWatchConfig.mock.calls[0]![0].merger).toBeUndefined()
  })

  // defu joins arrays from every source, so the default `permissions: []` of a
  // preset would end up in front of the arrays a project declares.
  it('replaces arrays instead of joining them when replaceArrays is on', async () => {
    mockWatchConfig.mockClear()

    await createManifestWatcher({ replaceArrays: true })

    const { merger } = mockWatchConfig.mock.calls[0]![0]
    expect(merger({
      list: ['mine'],
    }, {
      list: ['default-a', 'default-b'],
      other: true,
    }))
      .toEqual({
        list: ['mine'],
        other: true,
      })
  })
})

describe('debug option', () => {
  beforeEach(() => {
    disable()
  })

  afterEach(() => {
    disable()
  })

  it('uses the vite-plugin-uni-manifest namespace prefix', () => {
    expect(debug.options.namespace).toBe('vite-plugin-uni-manifest:options')
    expect(debug.config.namespace).toBe('vite-plugin-uni-manifest:config')
    expect(debug.writer.namespace).toBe('vite-plugin-uni-manifest:writer')
  })

  it('keeps debug loggers disabled by default', async () => {
    await createManifestWatcher({})
    expect(debug.options.enabled).toBeFalsy()
    expect(debug.config.enabled).toBeFalsy()
    expect(debug.writer.enabled).toBeFalsy()
  })

  it('enables every namespace when debug is true', async () => {
    await createManifestWatcher({ debug: true })
    expect(debug.options.enabled).toBe(true)
    expect(debug.config.enabled).toBe(true)
    expect(debug.writer.enabled).toBe(true)
  })

  it('enables a single namespace when debug is a category', async () => {
    await createManifestWatcher({ debug: 'writer' })
    expect(debug.writer.enabled).toBe(true)
    expect(debug.options.enabled).toBeFalsy()
    expect(debug.config.enabled).toBeFalsy()
  })

  it('passes the resolved debug option through to writeManifestJson', async () => {
    mockWriteManifestJson.mockClear()
    await createManifestWatcher({ debug: 'writer' })
    expect(mockWriteManifestJson).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ debug: 'writer' }),
    )
  })
})
