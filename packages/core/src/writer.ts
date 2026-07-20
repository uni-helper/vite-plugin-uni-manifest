import type { UserOptions } from './types'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolveManifestJsonPath } from './constant'

/** Write the resolved manifest config to `manifest.json`. Skips the write when the content is unchanged, avoiding unnecessary downstream recompiles. */
export function writeManifestJson(config: any = {}, opts?: UserOptions): void {
  const path = resolveManifestJsonPath(opts?.outDir)
  const content = JSON.stringify(config, null, opts?.minify ? 0 : 2) + (opts?.insertFinalNewline ? '\n' : '')
  if (existsSync(path) && readFileSync(path, 'utf-8') === content)
    return
  writeFileSync(path, content)
}

/** Ensure `manifest.json` exists; create an empty one if missing. */
export function ensureManifestJsonExists(opts?: UserOptions): void {
  if (!existsSync(resolveManifestJsonPath(opts?.outDir)))
    writeManifestJson({}, opts)
}
