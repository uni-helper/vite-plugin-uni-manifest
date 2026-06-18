import type { ResolvedOptions } from './types'
import { existsSync, writeFileSync } from 'node:fs'
import { resolveManifestJsonPath } from './constant'

/** Write the resolved manifest config to `manifest.json`. */
export function writeManifestJson(config: any = {}, opts?: ResolvedOptions): void {
  writeFileSync(
    resolveManifestJsonPath(),
    JSON.stringify(config, null, opts?.minify ? 0 : 2) + (opts?.insertFinalNewline ? '\n' : ''),
  )
}

/** Ensure `manifest.json` exists; create an empty one if missing. */
export function ensureManifestJsonExists(): void {
  if (!existsSync(resolveManifestJsonPath()))
    writeManifestJson()
}
