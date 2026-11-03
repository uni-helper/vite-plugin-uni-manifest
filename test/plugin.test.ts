import { describe, expect, it, vi } from 'vitest'

import { VitePluginUniManifest } from '../packages/core/src/index'

const { mockCreateManifestWatcher, mockGenerateManifest } = vi.hoisted(() => {
  const mockCreateManifestWatcher = vi.fn().mockResolvedValue({
    options: { minify: false, insertFinalNewline: false },
    unwatch: vi.fn().mockResolvedValue(undefined),
  })
  const mockGenerateManifest = vi.fn().mockResolvedValue(undefined)
  return { mockCreateManifestWatcher, mockGenerateManifest }
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

  it('creates watcher in configResolved for serve', async () => {
    mockCreateManifestWatcher.mockClear()
    mockGenerateManifest.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({ command: 'serve', mode: 'development' } as any)
    expect(mockCreateManifestWatcher).toHaveBeenCalledWith({}, 'development')
    expect(mockGenerateManifest).not.toHaveBeenCalled()
  })

  it('passes user options to createManifestWatcher', async () => {
    mockCreateManifestWatcher.mockClear()
    const plugin = VitePluginUniManifest({ minify: true })
    await (plugin as any).configResolved({ command: 'serve', mode: 'development' } as any)
    expect(mockCreateManifestWatcher).toHaveBeenCalledWith({ minify: true }, 'development')
  })

  it('generates once without creating a watcher for a one-shot build', async () => {
    mockCreateManifestWatcher.mockClear()
    mockGenerateManifest.mockClear()
    const plugin = VitePluginUniManifest({ minify: true })
    await (plugin as any).configResolved({
      command: 'build',
      build: { watch: null },
      mode: 'production',
    } as any)
    expect(mockGenerateManifest).toHaveBeenCalledWith({ minify: true }, 'production')
    expect(mockCreateManifestWatcher).not.toHaveBeenCalled()
  })

  it('keeps the watcher for watch builds', async () => {
    mockCreateManifestWatcher.mockClear()
    mockGenerateManifest.mockClear()
    const plugin = VitePluginUniManifest()
    await (plugin as any).configResolved({
      command: 'build',
      build: { watch: {} },
      mode: 'development',
    } as any)
    expect(mockCreateManifestWatcher).toHaveBeenCalledWith({}, 'development')
    expect(mockGenerateManifest).not.toHaveBeenCalled()
  })
})
