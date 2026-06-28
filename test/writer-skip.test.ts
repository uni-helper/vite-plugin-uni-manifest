import { describe, expect, it, vi } from 'vitest'

const { mockWriteFileSync, mockExistsSync, mockReadFileSync, testPath } = vi.hoisted(() => {
  const path = require('node:path')
  return {
    mockWriteFileSync: vi.fn(),
    // Simulate an in-memory file: returns the bytes last written, or undefined if absent
    mockExistsSync: vi.fn(() => false),
    mockReadFileSync: vi.fn(() => ''),
    testPath: path.join('/tmp', 'vite-plugin-uni-manifest-skip', 'manifest.json'),
  }
})

vi.mock('node:fs', () => ({
  writeFileSync: mockWriteFileSync,
  existsSync: mockExistsSync,
  readFileSync: mockReadFileSync,
}))

vi.mock('../packages/core/src/constant', () => ({
  resolveManifestJsonPath: () => testPath,
  defaultManifestConfig: {},
}))

import { writeManifestJson } from '../packages/core/src/writer'

describe('writeManifestJson — idempotency', () => {
  it('writes when the file does not yet exist', () => {
    mockWriteFileSync.mockClear()
    mockExistsSync.mockReturnValue(false)

    writeManifestJson({ name: 'test' })

    expect(mockWriteFileSync).toHaveBeenCalledOnce()
  })

  it('skips the write when existing content is identical', () => {
    mockWriteFileSync.mockClear()
    const existing = JSON.stringify({ name: 'test' }, null, 2)
    mockExistsSync.mockReturnValue(true)
    mockReadFileSync.mockReturnValue(existing)

    writeManifestJson({ name: 'test' })

    expect(mockWriteFileSync).not.toHaveBeenCalled()
  })

  it('writes when existing content differs', () => {
    mockWriteFileSync.mockClear()
    mockExistsSync.mockReturnValue(true)
    mockReadFileSync.mockReturnValue(JSON.stringify({ name: 'old' }, null, 2))

    writeManifestJson({ name: 'test' })

    expect(mockWriteFileSync).toHaveBeenCalledOnce()
  })

  it('respects insertFinalNewline when deciding equality', () => {
    mockWriteFileSync.mockClear()
    mockExistsSync.mockReturnValue(true)
    // on-disk content has no trailing newline; output now requires one => not equal => writes
    mockReadFileSync.mockReturnValue(JSON.stringify({ name: 'test' }, null, 2))

    writeManifestJson({ name: 'test' }, { minify: false, insertFinalNewline: true } as any)

    expect(mockWriteFileSync).toHaveBeenCalledOnce()
  })
})
