import { describe, expect, it, vi } from 'vitest'

const { testDir, testManifestPath } = vi.hoisted(() => {
  const os = require('node:os')
  const path = require('node:path')
  const fs = require('node:fs')
  const dir = path.join(os.tmpdir(), 'vite-plugin-uni-manifest-test-plugin')
  fs.mkdirSync(dir, { recursive: true })
  return { testDir: dir, testManifestPath: path.join(dir, 'manifest.json') }
})

vi.mock('../packages/core/src/constant', () => ({
  manifestJsonPath: testManifestPath,
  defaultManifestConfig: {},
}))

vi.mock('c12', () => ({
  watchConfig: vi.fn().mockResolvedValue({
    config: { config: {} },
    unwatch: vi.fn(),
  }),
}))

import { VitePluginUniManifest } from '../packages/core/src/index'

describe('VitePluginUniManifest', () => {
  it('returns a Vite plugin object', async () => {
    const plugin = await VitePluginUniManifest()
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe('vite-plugin-uni-manifest')
    expect(plugin.enforce).toBe('pre')
  })

  it('has buildEnd hook for cleanup', async () => {
    const plugin = await VitePluginUniManifest()
    expect(typeof plugin.buildEnd).toBe('function')
  })

  it('accepts user options', async () => {
    const plugin = await VitePluginUniManifest({ minify: true })
    expect(plugin.name).toBe('vite-plugin-uni-manifest')
  })
})
