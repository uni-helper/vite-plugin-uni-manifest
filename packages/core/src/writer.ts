import type { ResolvedOptions } from './types'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolveManifestJsonPath } from './constant'

/** Write the resolved manifest config to `manifest.json`. Skips the write when the content is unchanged, avoiding unnecessary downstream recompiles. */
export function writeManifestJson(config: any = {}, opts?: ResolvedOptions): void {
  const path = resolveManifestJsonPath()
  const content = JSON.stringify(config, null, opts?.minify ? 0 : 2) + (opts?.insertFinalNewline ? '\n' : '')
  if (existsSync(path) && readFileSync(path, 'utf-8') === content)
    return
  writeFileSync(path, content)
}

/** Ensure `manifest.json` exists; create an empty one if missing. */
export function ensureManifestJsonExists(): void {
  if (!existsSync(resolveManifestJsonPath()))
    writeManifestJson()
}
