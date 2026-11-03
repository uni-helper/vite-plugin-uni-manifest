import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { VitePluginUniManifest } from '../packages/core/src/index'

// prepare() runs before Vite, so these tests drive the plugin factory directly
// with a real config file and a real output directory.
describe('prepare', () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'vite-plugin-uni-manifest-prepare-'))
    writeFileSync(join(dir, 'manifest.config.mjs'), 'export default { name: \'prepared\' }\n')
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('writes manifest.json and returns the same plugin instance', async () => {
    const plugin = VitePluginUniManifest({ cwd: dir, outDir: dir })

    const prepared = await plugin.prepare()

    expect(prepared).toBe(plugin)
    expect(JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf-8')).name).toBe('prepared')
  })

  it('takes cwd from its own options', async () => {
    const plugin = VitePluginUniManifest({ outDir: dir })

    await plugin.prepare({ cwd: dir })

    expect(JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf-8')).name).toBe('prepared')
  })

  it('loads .env.{mode} from the mode it is given', async () => {
    writeFileSync(join(dir, '.env.staging'), 'PREPARE_NAME=from-mode\n')
    writeFileSync(
      join(dir, 'manifest.config.mjs'),
      'export default { name: process.env.PREPARE_NAME ?? \'missing\' }\n',
    )
    delete process.env.PREPARE_NAME
    const plugin = VitePluginUniManifest({ cwd: dir, outDir: dir, dotenv: true })

    try {
      await plugin.prepare({ mode: 'staging' })

      expect(JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf-8')).name).toBe('from-mode')
    }
    finally {
      delete process.env.PREPARE_NAME
    }
  })

  it('leaves manifest.json untouched when there is no config file', async () => {
    writeFileSync(join(dir, 'manifest.json'), '{"name":"hand-written"}')
    rmSync(join(dir, 'manifest.config.mjs'))
    const plugin = VitePluginUniManifest({ cwd: dir, outDir: dir })

    await plugin.prepare()

    expect(readFileSync(join(dir, 'manifest.json'), 'utf-8')).toBe('{"name":"hand-written"}')
  })
})
