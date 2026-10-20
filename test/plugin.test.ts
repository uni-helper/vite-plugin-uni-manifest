import { describe, expect, it, vi } from 'vitest'

import { VitePluginUniManifest } from '../packages/core/src/index'

const { mockUnwatch, mockCreateManifestWatcher, mockGenerateManifest } = vi.hoisted(() => {
  const mockUnwatch = vi.fn().mockResolvedValue(undefined)
  const mockCreateManifestWatcher = vi.fn().mockResolvedValue({
    options: { minify: false, insertFinalNewline: false },
    unwatch: mockUnwatch,
  })
  const mockGenerateManifest = vi.fn().mockResolvedValue(undefined)
  return { mockUnwatch, mockCreateManifestWatcher, mockGenerateManifest }
})

vi.mock('../packages/core/src/watcher', () => ({
  createManifestWatcher: mockCreateManifestWatcher,
  generateManifest: mockGenerateManifest,
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

  it('creates watcher in configResolved for serve', async () => {
    mockCreateManifestWatcher.mockClear()
    mockGenerateManifest.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({ command: 'serve' } as any)
    expect(mockCreateManifestWatcher).toHaveBeenCalled()
    expect(mockGenerateManifest).not.toHaveBeenCalled()
  })

  it('calls unwatch on buildEnd after configResolved', async () => {
    mockUnwatch.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({ command: 'serve' } as any)
    ;(plugin as any).buildEnd()
    expect(mockUnwatch).toHaveBeenCalled()
  })

  it('passes user options to createManifestWatcher', async () => {
    mockCreateManifestWatcher.mockClear()
    const plugin = VitePluginUniManifest({ minify: true })
    await (plugin as any).configResolved({ command: 'serve' } as any)
    expect(mockCreateManifestWatcher).toHaveBeenCalledWith({ minify: true })
  })

  it('generates once without creating a watcher for build', async () => {
    mockCreateManifestWatcher.mockClear()
    mockGenerateManifest.mockClear()
    const plugin = VitePluginUniManifest({ minify: true })
    await (plugin as any).configResolved({ command: 'build' } as any)
    expect(mockGenerateManifest).toHaveBeenCalledWith({ minify: true })
    expect(mockCreateManifestWatcher).not.toHaveBeenCalled()
  })

  it('does not call unwatch after build', async () => {
    mockUnwatch.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({ command: 'build' } as any)
    ;(plugin as any).buildEnd()
    expect(mockUnwatch).not.toHaveBeenCalled()
  })
})
