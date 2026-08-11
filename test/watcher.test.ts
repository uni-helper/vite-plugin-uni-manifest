import dbg from 'debug'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { debug } from '../packages/core/src/logger'
import { createManifestWatcher } from '../packages/core/src/watcher'

const { mockWriteManifestJson, mockUnwatch, mockWatchConfig } = vi.hoisted(() => ({
  mockWriteManifestJson: vi.fn(),
  mockUnwatch: vi.fn().mockResolvedValue(undefined),
  mockWatchConfig: vi.fn(),
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

    capturedOnUpdate!({ newConfig: { config: { name: 'test' } }, getDiff: () => [] })

    expect(mockWriteManifestJson).not.toHaveBeenCalled()
  })

  it('writes manifest.json when the config diff is not empty', async () => {
    await createManifestWatcher({})
    mockWriteManifestJson.mockClear()

    capturedOnUpdate!({ newConfig: { config: { name: 'changed' } }, getDiff: () => [['name', 'test', 'changed']] })

    expect(mockWriteManifestJson).toHaveBeenCalledWith({ name: 'changed' }, expect.objectContaining({ minify: false, debug: false }))
  })
})

describe('debug option', () => {
  beforeEach(() => {
    dbg.disable()
  })

  afterEach(() => {
    dbg.disable()
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
