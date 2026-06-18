import { describe, expect, it, vi } from 'vitest'

const { testDir, testManifestPath, mockSetup, mockUnwatch } = vi.hoisted(() => {
  const os = require('node:os')
  const path = require('node:path')
  const fs = require('node:fs')
  const dir = path.join(os.tmpdir(), 'vite-plugin-uni-manifest-test-plugin')
  fs.mkdirSync(dir, { recursive: true })
  return {
    testDir: dir,
    testManifestPath: path.join(dir, 'manifest.json'),
    mockSetup: vi.fn().mockResolvedValue(undefined),
    mockUnwatch: vi.fn(),
  }
})

vi.mock('../packages/core/src/constant', () => ({
  resolveManifestJsonPath: () => testManifestPath,
  defaultManifestConfig: {},
}))

vi.mock('c12', () => ({
  watchConfig: vi.fn().mockResolvedValue({
    config: { config: {} },
    unwatch: mockUnwatch,
  }),
}))

const MockManifestContext: any = vi.fn().mockImplementation(() => ({
  options: { minify: false, insertFinalNewline: false },
  setup: mockSetup,
  unwatch: mockUnwatch,
}))
MockManifestContext.CheckManifestJsonFile = vi.fn()

vi.mock('../packages/core/src/context', () => ({
  ManifestContext: MockManifestContext,
}))

import { VitePluginUniManifest } from '../packages/core/src/index'

describe('VitePluginUniManifest', () => {
  it('returns a Vite plugin object', () => {
    const plugin = VitePluginUniManifest()
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe('vite-plugin-uni-manifest')
    expect(plugin.enforce).toBe('pre')
  })

  it('has configResolved hook for async setup', () => {
    const plugin = VitePluginUniManifest()
    expect(typeof plugin.configResolved).toBe('function')
  })

  it('has buildEnd hook for cleanup', () => {
    const plugin = VitePluginUniManifest()
    expect(typeof plugin.buildEnd).toBe('function')
  })

  it('calls CheckManifestJsonFile and setup in configResolved', async () => {
    MockManifestContext.CheckManifestJsonFile.mockClear()
    mockSetup.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({} as any)
    expect(MockManifestContext.CheckManifestJsonFile).toHaveBeenCalled()
    expect(mockSetup).toHaveBeenCalled()
  })

  it('calls unwatch on buildEnd after configResolved', async () => {
    mockUnwatch.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({} as any)
    ;(plugin as any).buildEnd()
    expect(mockUnwatch).toHaveBeenCalled()
  })

  it('accepts user options', () => {
    const plugin = VitePluginUniManifest({ minify: true })
    expect(plugin.name).toBe('vite-plugin-uni-manifest')
  })
})
