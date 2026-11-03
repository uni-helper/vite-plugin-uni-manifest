import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { disable } from 'obug'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { defaultManifestConfig } from '../packages/core/src/defaults'
import { debug } from '../packages/core/src/logger'
import { createManifestWatcher, generateManifest } from '../packages/core/src/watcher'

const { mockUnwatch, mockWatchConfig, mockLoadConfig } = vi.hoisted(() => ({
  mockUnwatch: vi.fn().mockResolvedValue(undefined),
  mockWatchConfig: vi.fn(),
  mockLoadConfig: vi.fn().mockResolvedValue({
    config: { name: 'test' },
    _configFile: '/tmp/manifest.config.ts',
  }),
}))

// 'c12' is not resolvable from the repo root under pnpm strict node_modules,
// so mock it via the path that packages/core resolves it to.
vi.mock('../packages/core/node_modules/c12', () => ({
  loadConfig: mockLoadConfig,
  watchConfig: mockWatchConfig,
}))

// Capture the onUpdate hook so tests can simulate config-change events.
let capturedOnUpdate: ((params: { newConfig: { config: any, _configFile?: string }, getDiff: () => unknown[] }) => void) | undefined
mockWatchConfig.mockImplementation(async (opts: any) => {
  capturedOnUpdate = opts.onUpdate
  return {
    config: { name: 'test' },
    _configFile: '/tmp/manifest.config.ts',
    unwatch: mockUnwatch,
  }
})

// The writer is real here, so every test needs a directory to write into.
let outDir: string
let manifestPath: string

beforeEach(() => {
  outDir = mkdtempSync(join(tmpdir(), 'vite-plugin-uni-manifest-watcher-'))
  manifestPath = join(outDir, 'manifest.json')
})

afterEach(() => {
  rmSync(outDir, { recursive: true, force: true })
})

describe('createManifestWatcher', () => {
  it('resolves options with defaults', async () => {
    const watcher = await createManifestWatcher({ outDir })
    expect(watcher.options.minify).toBe(false)
    expect(watcher.options.insertFinalNewline).toBe(false)
    expect(watcher.options.indent).toBe(2)
    expect(watcher.options.eol).toBe('\n')
    expect(watcher.options.debug).toBe(false)
  })

  it('merges user options', async () => {
    const watcher = await createManifestWatcher({
      outDir,
      minify: true,
      indent: '\t',
      eol: '\r\n',
    })
    expect(watcher.options.minify).toBe(true)
    expect(watcher.options.indent).toBe('\t')
    expect(watcher.options.eol).toBe('\r\n')
  })

  it('merges user outDir option', async () => {
    const watcher = await createManifestWatcher({ outDir })
    expect(watcher.options.outDir).toBe(outDir)
  })

  it('writes the initial config to disk and returns unwatch', async () => {
    const watcher = await createManifestWatcher({ outDir })

    expect(JSON.parse(readFileSync(manifestPath, 'utf-8'))).toEqual({ name: 'test' })
    expect(typeof watcher.unwatch).toBe('function')
  })

  it('leaves manifest.json alone when the config diff is empty', async () => {
    await createManifestWatcher({ outDir })
    expect(mockWatchConfig).toHaveBeenCalled()
    // A sentinel proves the writer never ran, which idempotency alone would hide.
    writeFileSync(manifestPath, '{"name":"sentinel"}')

    capturedOnUpdate!({
      newConfig: {
        config: { name: 'test' },
        _configFile: '/tmp/manifest.config.ts',
      },
      getDiff: () => [],
    })

    expect(readFileSync(manifestPath, 'utf-8')).toBe('{"name":"sentinel"}')
  })

  it('leaves manifest.json alone when no manifest.config.* exists', async () => {
    writeFileSync(manifestPath, '{"name":"hand-written"}')
    mockWatchConfig.mockResolvedValueOnce({
      config: { name: 'defaults' },
      unwatch: mockUnwatch,
    })

    await createManifestWatcher({ outDir })

    expect(readFileSync(manifestPath, 'utf-8')).toBe('{"name":"hand-written"}')
  })

  it('leaves manifest.json alone when manifest.config.* disappears', async () => {
    await createManifestWatcher({ outDir })
    writeFileSync(manifestPath, '{"name":"hand-written"}')

    capturedOnUpdate!({
      newConfig: {
        config: { name: 'defaults' },
      },
      getDiff: () => [
        ['name', 'test', 'defaults'],
      ],
    })

    expect(readFileSync(manifestPath, 'utf-8')).toBe('{"name":"hand-written"}')
  })

  it('rewrites manifest.json when the config diff is not empty', async () => {
    await createManifestWatcher({ outDir })

    capturedOnUpdate!({
      newConfig: {
        config: { name: 'changed' },
        _configFile: '/tmp/manifest.config.ts',
      },
      getDiff: () => [
        ['name', 'test', 'changed'],
      ],
    })

    expect(JSON.parse(readFileSync(manifestPath, 'utf-8'))).toEqual({ name: 'changed' })
  })
})

describe('generateManifest', () => {
  it('loads and writes the config without creating a watcher', async () => {
    mockLoadConfig.mockClear()
    mockWatchConfig.mockClear()

    await generateManifest({ outDir, minify: true })

    expect(mockLoadConfig).toHaveBeenCalledWith(expect.objectContaining({
      name: 'manifest',
      rcFile: false,
      packageJson: false,
    }))
    expect(readFileSync(manifestPath, 'utf-8')).toBe('{"name":"test"}')
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

    await createManifestWatcher({ cwd: dir, outDir: dir, dotenv: true }, 'staging')

    expect(process.env[envKey]).toBe('from-mode')
  })

  it('leaves process.env alone when dotenv is off', async () => {
    writeFileSync(join(dir, '.env'), `${envKey}=from-env\n`)

    await createManifestWatcher({ cwd: dir, outDir: dir }, 'staging')

    expect(process.env[envKey]).toBeUndefined()
  })
})

describe('c12 config options', () => {
  it('passes the real default config and no merger by default', async () => {
    mockWatchConfig.mockClear()

    await createManifestWatcher({ outDir })

    const options = mockWatchConfig.mock.calls[0]![0]
    expect(options.defaultConfig).toBe(defaultManifestConfig)
    expect(options.merger).toBeUndefined()
  })

  // defu joins arrays from every source, so the default `permissions: []` of a
  // preset would end up in front of the arrays a project declares.
  it('replaces arrays instead of joining them when replaceArrays is on', async () => {
    mockWatchConfig.mockClear()

    await createManifestWatcher({ outDir, replaceArrays: true })

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
    await createManifestWatcher({ outDir })
    expect(debug.options.enabled).toBeFalsy()
    expect(debug.config.enabled).toBeFalsy()
    expect(debug.writer.enabled).toBeFalsy()
  })

  it('enables every namespace when debug is true', async () => {
    await createManifestWatcher({ outDir, debug: true })
    expect(debug.options.enabled).toBe(true)
    expect(debug.config.enabled).toBe(true)
    expect(debug.writer.enabled).toBe(true)
  })

  it('enables a single namespace when debug is a category', async () => {
    await createManifestWatcher({ outDir, debug: 'writer' })
    expect(debug.writer.enabled).toBe(true)
    expect(debug.options.enabled).toBeFalsy()
    expect(debug.config.enabled).toBeFalsy()
  })

  it('keeps the DEBUG value of the caller', async () => {
    const previous = process.env.DEBUG
    process.env.DEBUG = 'someone-else:*'
    try {
      await createManifestWatcher({ outDir, debug: 'writer' })

      expect(process.env.DEBUG).toBe('someone-else:*')
      expect(debug.writer.enabled).toBe(true)
    }
    finally {
      if (previous === undefined)
        delete process.env.DEBUG
      else
        process.env.DEBUG = previous
    }
  })

  it('writes with the resolved format options', async () => {
    await createManifestWatcher({ outDir, minify: true })
    expect(readFileSync(manifestPath, 'utf-8')).toBe('{"name":"test"}')
  })
})
