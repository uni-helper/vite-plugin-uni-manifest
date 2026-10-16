import { describe, expect, it } from 'vitest'
import { resolveManifestJsonPath } from '../packages/core/src/paths'

// resolveManifestJsonPath 返回 POSIX 风格路径（内部使用 Vite 的 normalizePath），
// Windows 上还带盘符且 process.cwd() 使用反斜杠，直接比较会因分隔符和盘符不同而失败
const toPosix = (path: string): string => path.replace(/\\/g, '/')
const cwd = toPosix(process.cwd())

describe('resolveManifestJsonPath', () => {
  it('returns an absolute path ending with manifest.json', () => {
    const path = resolveManifestJsonPath()
    expect(path).toMatch(/\/manifest\.json$/)
  })

  it('uses UNI_INPUT_DIR when set, or falls back to cwd/src', () => {
    const expected = process.env.UNI_INPUT_DIR ? toPosix(process.env.UNI_INPUT_DIR) : `${cwd}/src`
    expect(resolveManifestJsonPath()).toContain(expected)
  })

  it('returns a consistent result across calls', () => {
    const a = resolveManifestJsonPath()
    const b = resolveManifestJsonPath()
    expect(a).toBe(b)
  })

  it('uses outDir when provided, taking precedence over UNI_INPUT_DIR', () => {
    const path = resolveManifestJsonPath('/custom/out/dir')
    // Windows 上 /custom/out/dir 解析到当前盘的根目录，因此盘符可有可无
    expect(path).toMatch(/^([A-Za-z]:)?\/custom\/out\/dir\/manifest\.json$/)
  })

  it('resolves relative outDir against process.cwd()', () => {
    const path = resolveManifestJsonPath('relative/dir')
    expect(path).toContain('/relative/dir/manifest.json')
    expect(path.startsWith(cwd)).toBe(true)
  })
})
