import type { OutputSpec } from '../packages/core/src/writer'
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, utimesSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { debug } from '../packages/core/src/logger'
import { resolveOutputSpec, writeManifestJson } from '../packages/core/src/writer'

const { testDir, customOutDir, envDir, cwdDir } = vi.hoisted(() => {
  const os = require('node:os')
  const path = require('node:path')
  const dir = path.join(os.tmpdir(), 'vite-plugin-uni-manifest-test-writer')
  return {
    testDir: dir,
    customOutDir: path.join(dir, 'custom'),
    envDir: path.join(dir, 'from-env'),
    cwdDir: path.join(dir, 'from-cwd'),
  }
})

// resolveManifestJsonPath returns POSIX paths (it runs through Vite's normalizePath),
// while path.join uses the platform separator, so compare on the normalized form.
const toPosix = (path: string): string => path.replace(/\\/g, '/')
const manifestOf = (dir: string): string => toPosix(join(dir, 'manifest.json'))

function spec(overrides: Partial<OutputSpec> = {}): OutputSpec {
  return {
    cwd: testDir,
    outDir: testDir,
    indent: 2,
    eol: '\n',
    finalNewline: false,
    ...overrides,
  }
}

describe('writeManifestJson', () => {
  let previousUniInputDir: string | undefined

  beforeEach(() => {
    previousUniInputDir = process.env.UNI_INPUT_DIR
    delete process.env.UNI_INPUT_DIR
    mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true })
    vi.restoreAllMocks()
    if (previousUniInputDir === undefined)
      delete process.env.UNI_INPUT_DIR
    else
      process.env.UNI_INPUT_DIR = previousUniInputDir
  })

  it('writes valid JSON with the spec formatting', () => {
    writeManifestJson({ name: 'test' }, spec())
    const content = readFileSync(join(testDir, 'manifest.json'), 'utf-8')
    expect(JSON.parse(content)).toEqual({ name: 'test' })
    expect(content).toBe('{\n  "name": "test"\n}')
  })

  it('minifies when resolveOutputSpec sees minify, ignoring indent', () => {
    const options = {
      outDir: testDir,
      minify: true,
      indent: 4,
      eol: '\n' as const,
      insertFinalNewline: false,
    }
    writeManifestJson({ name: 'test' }, resolveOutputSpec(options))
    expect(readFileSync(manifestOf(testDir), 'utf-8')).toBe('{"name":"test"}')
  })

  it('appends a final newline when the spec asks for one', () => {
    writeManifestJson({ name: 'test' }, spec({ finalNewline: true }))
    expect(readFileSync(manifestOf(testDir), 'utf-8').endsWith('\n')).toBe(true)
  })

  it('applies a custom numeric indent', () => {
    writeManifestJson({ name: 'test' }, spec({ indent: 4 }))
    expect(readFileSync(manifestOf(testDir), 'utf-8')).toBe('{\n    "name": "test"\n}')
  })

  it('applies a custom string indent', () => {
    writeManifestJson({ name: 'test' }, spec({ indent: '\t' }))
    expect(readFileSync(manifestOf(testDir), 'utf-8')).toBe('{\n\t"name": "test"\n}')
  })

  it('converts line endings when the spec asks for CRLF', () => {
    writeManifestJson({ name: 'test' }, spec({ eol: '\r\n' }))
    const content = readFileSync(manifestOf(testDir), 'utf-8')
    expect(content).toBe('{\r\n  "name": "test"\r\n}')
    expect(content.replaceAll('\r\n', '')).not.toContain('\n')
  })

  it('appends the final newline with the configured eol', () => {
    writeManifestJson({ name: 'test' }, spec({ finalNewline: true, eol: '\r\n' }))
    expect(readFileSync(manifestOf(testDir), 'utf-8').endsWith('\r\n')).toBe(true)
  })

  it('prefers outDir over UNI_INPUT_DIR', () => {
    mkdirSync(envDir, { recursive: true })
    mkdirSync(customOutDir, { recursive: true })
    process.env.UNI_INPUT_DIR = envDir

    writeManifestJson({ name: 'custom' }, spec({ outDir: customOutDir }))

    expect(JSON.parse(readFileSync(manifestOf(customOutDir), 'utf-8'))).toEqual({ name: 'custom' })
    expect(() => readFileSync(manifestOf(envDir), 'utf-8')).toThrow()
  })

  it('falls back to UNI_INPUT_DIR when the spec has no outDir', () => {
    mkdirSync(envDir, { recursive: true })
    process.env.UNI_INPUT_DIR = envDir

    writeManifestJson({ name: 'env' }, spec({ outDir: undefined }))

    expect(JSON.parse(readFileSync(manifestOf(envDir), 'utf-8'))).toEqual({ name: 'env' })
  })

  it('resolves a relative outDir against the spec cwd', () => {
    writeManifestJson({ name: 'relative' }, spec({ outDir: 'nested/manifest-dir', cwd: cwdDir }))

    expect(JSON.parse(readFileSync(manifestOf(join(cwdDir, 'nested/manifest-dir')), 'utf-8')))
      .toEqual({ name: 'relative' })
  })

  it('falls back to cwd/src when neither outDir nor UNI_INPUT_DIR is set', () => {
    writeManifestJson({ name: 'cwd' }, spec({ outDir: undefined, cwd: cwdDir }))

    expect(JSON.parse(readFileSync(manifestOf(join(cwdDir, 'src')), 'utf-8'))).toEqual({ name: 'cwd' })
  })

  it('uses process.cwd() when the spec has no cwd', () => {
    vi.spyOn(process, 'cwd').mockReturnValue(cwdDir)

    writeManifestJson({ name: 'default-base' }, spec({ outDir: 'from-process-cwd', cwd: undefined }))

    expect(JSON.parse(readFileSync(manifestOf(join(cwdDir, 'from-process-cwd')), 'utf-8')))
      .toEqual({ name: 'default-base' })
  })

  it('creates the output directory when it does not exist yet', () => {
    const nested = join(testDir, 'nested', 'deep')

    writeManifestJson({ name: 'nested' }, spec({ outDir: nested }))

    expect(existsSync(join(nested, 'manifest.json'))).toBe(true)
  })

  it('skips writing when content is unchanged', () => {
    writeManifestJson({ name: 'test' }, spec())
    // 先把 mtime 固定到一个过去的时间，避免依赖文件系统时间戳的精度（Windows 上两次写入可能落在同一时刻）
    const untouched = new Date(2000, 0, 1)
    const path = manifestOf(testDir)
    utimesSync(path, untouched, untouched)
    writeManifestJson({ name: 'test' }, spec())
    expect(statSync(path).mtimeMs).toBe(untouched.getTime())
    // sanity check: a changed config does rewrite the file
    writeManifestJson({ name: 'changed' }, spec())
    expect(statSync(path).mtimeMs).not.toBe(untouched.getTime())
  })

  it('logs write and skip decisions via debug.writer', () => {
    const spy = vi.spyOn(debug, 'writer')
    writeManifestJson({ name: 'test' }, spec())
    expect(spy).toHaveBeenCalledWith('writing', manifestOf(testDir))
    spy.mockClear()
    writeManifestJson({ name: 'test' }, spec())
    expect(spy).toHaveBeenCalledWith('content unchanged, skipping write:', manifestOf(testDir))
  })
})
