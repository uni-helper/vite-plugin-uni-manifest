import { describe, expect, it, vi } from 'vitest'

import { createManifestWatcher } from '../packages/core/src/watcher'

const { mockWriteManifestJson, mockEnsureManifestJsonExists, mockUnwatch, mockWatchConfig } = vi.hoisted(() => ({
  mockWriteManifestJson: vi.fn(),
  mockEnsureManifestJsonExists: vi.fn(),
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
  ensureManifestJsonExists: mockEnsureManifestJsonExists,
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
  })

  it('merges user options', async () => {
    const watcher = await createManifestWatcher({ minify: true })
    expect(watcher.options.minify).toBe(true)
  })

  it('merges user outDir option', async () => {
    const watcher = await createManifestWatcher({ outDir: '/custom/out' })
    expect(watcher.options.outDir).toBe('/custom/out')
  })

  it('ensures manifest.json exists before watching', async () => {
    mockEnsureManifestJsonExists.mockClear()
    await createManifestWatcher({})
    expect(mockEnsureManifestJsonExists).toHaveBeenCalled()
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

    expect(mockWriteManifestJson).toHaveBeenCalledWith({ name: 'changed' }, expect.objectContaining({ minify: false }))
  })
})
