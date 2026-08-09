import { describe, expect, it, vi } from 'vitest'

import { VitePluginUniManifest } from '../packages/core/src/index'

const { mockUnwatch, mockCreateManifestWatcher } = vi.hoisted(() => {
  const mockUnwatch = vi.fn().mockResolvedValue(undefined)
  const mockCreateManifestWatcher = vi.fn().mockResolvedValue({
    options: { minify: false, insertFinalNewline: false },
    unwatch: mockUnwatch,
  })
  return { mockUnwatch, mockCreateManifestWatcher }
})

vi.mock('../packages/core/src/watcher', () => ({
  createManifestWatcher: mockCreateManifestWatcher,
}))

describe('vitePluginUniManifest', () => {
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

  it('creates watcher in configResolved', async () => {
    mockCreateManifestWatcher.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({} as any)
    expect(mockCreateManifestWatcher).toHaveBeenCalled()
  })

  it('calls unwatch on buildEnd after configResolved', async () => {
    mockUnwatch.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({} as any)
    ;(plugin as any).buildEnd()
    expect(mockUnwatch).toHaveBeenCalled()
  })

  it('passes user options to createManifestWatcher', async () => {
    mockCreateManifestWatcher.mockClear()
    const plugin = VitePluginUniManifest({ minify: true })
    await (plugin as any).configResolved({} as any)
    expect(mockCreateManifestWatcher).toHaveBeenCalledWith({ minify: true })
  })
})
