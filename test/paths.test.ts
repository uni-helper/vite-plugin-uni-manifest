import { describe, expect, it } from 'vitest'
import { resolveManifestJsonPath } from '../packages/core/src/paths'

describe('resolveManifestJsonPath', () => {
  it('returns an absolute path ending with manifest.json', () => {
    const path = resolveManifestJsonPath()
    expect(path).toMatch(/\/manifest\.json$/)
  })

  it('uses UNI_INPUT_DIR when set, or falls back to cwd/src', () => {
    const expected = process.env.UNI_INPUT_DIR || `${process.cwd()}/src`
    expect(resolveManifestJsonPath()).toContain(expected)
  })

  it('returns a consistent result across calls', () => {
    const a = resolveManifestJsonPath()
    const b = resolveManifestJsonPath()
    expect(a).toBe(b)
  })

  it('uses outDir when provided, taking precedence over UNI_INPUT_DIR', () => {
    const path = resolveManifestJsonPath('/custom/out/dir')
    expect(path).toBe('/custom/out/dir/manifest.json')
  })

  it('resolves relative outDir against process.cwd()', () => {
    const path = resolveManifestJsonPath('relative/dir')
    expect(path).toContain('/relative/dir/manifest.json')
    expect(path.startsWith(process.cwd())).toBe(true)
  })
})
