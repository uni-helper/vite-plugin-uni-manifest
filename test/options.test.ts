import { describe, expect, it } from 'vitest'
import { resolveOptions } from '../packages/core/src/options'

describe('resolveOptions', () => {
  it('returns defaults when called with empty object', () => {
    const result = resolveOptions({})
    expect(result).toEqual({
      minify: false,
      insertFinalNewline: false,
      cwd: process.env.VITE_ROOT_DIR,
    })
  })

  it('merges user minify option', () => {
    const result = resolveOptions({ minify: true })
    expect(result.minify).toBe(true)
  })

  it('merges user insertFinalNewline option', () => {
    const result = resolveOptions({ insertFinalNewline: true })
    expect(result.insertFinalNewline).toBe(true)
  })

  it('merges user cwd option', () => {
    const result = resolveOptions({ cwd: '/custom/path' })
    expect(result.cwd).toBe('/custom/path')
  })

  it('merges all user options at once', () => {
    const result = resolveOptions({
      minify: true,
      insertFinalNewline: true,
      cwd: '/test',
    })
    expect(result).toEqual({
      minify: true,
      insertFinalNewline: true,
      cwd: '/test',
    })
  })
})
