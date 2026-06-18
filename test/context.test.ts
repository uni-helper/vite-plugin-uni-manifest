import { describe, expect, it, vi } from 'vitest'

const { mockWriteManifestJson } = vi.hoisted(() => ({
  mockWriteManifestJson: vi.fn(),
}))

vi.mock('../packages/core/src/constant', () => ({
  resolveManifestJsonPath: () => '/tmp/test-manifest.json',
  defaultManifestConfig: {},
}))

vi.mock('../packages/core/src/writer', () => ({
  writeManifestJson: mockWriteManifestJson,
  ensureManifestJsonExists: vi.fn(),
}))

vi.mock('c12', () => ({
  watchConfig: vi.fn().mockResolvedValue({
    config: { config: { name: 'test' } },
    unwatch: vi.fn(),
  }),
}))

import { ManifestContext } from '../packages/core/src/context'

describe('ManifestContext', () => {
  describe('constructor', () => {
    it('resolves options with defaults', () => {
      const ctx = new ManifestContext({})
      expect(ctx.options.minify).toBe(false)
      expect(ctx.options.insertFinalNewline).toBe(false)
    })

    it('merges user options', () => {
      const ctx = new ManifestContext({ minify: true })
      expect(ctx.options.minify).toBe(true)
    })
  })

  describe('setup', () => {
    it('writes initial config and assigns unwatch', async () => {
      mockWriteManifestJson.mockClear()
      const ctx = new ManifestContext({})
      await ctx.setup()
      expect(mockWriteManifestJson).toHaveBeenCalled()
      expect(ctx.unwatch).toBeDefined()
    })
  })
})
