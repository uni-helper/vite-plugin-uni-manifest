import type { UserOptions } from './types'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { debug } from './logger'
import { resolveManifestJsonPath } from './paths'

/** Write the resolved manifest config to `manifest.json`. Skips the write when the content is unchanged, avoiding unnecessary downstream recompiles. */
export function writeManifestJson(config: any = {}, opts?: UserOptions): void {
  const path = resolveManifestJsonPath(opts?.outDir)
  const eol = opts?.eol ?? '\n'
  const indent = opts?.minify ? 0 : opts?.indent ?? 2
  let content = JSON.stringify(config, null, indent)
  // JSON.stringify always emits LF; convert to the requested end-of-line sequence
  if (eol !== '\n')
    content = content.replaceAll('\n', eol)
  if (opts?.insertFinalNewline)
    content += eol
  if (existsSync(path) && readFileSync(path, 'utf-8') === content) {
    debug.writer('content unchanged, skipping write:', path)
    return
  }
  debug.writer('writing', path)
  writeFileSync(path, content)
}

/** Ensure `manifest.json` exists; create an empty one if missing. */
export function ensureManifestJsonExists(opts?: UserOptions): void {
  if (!existsSync(resolveManifestJsonPath(opts?.outDir)))
    writeManifestJson({}, opts)
}
