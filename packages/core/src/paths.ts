import { resolve } from 'node:path'
import process from 'node:process'
import { normalizePath } from 'vite'

/**
 * Resolve absolute path to `manifest.json`.
 *
 * @param outDir - Explicit output directory. When provided, takes precedence over
 *                 uni-app's `UNI_INPUT_DIR` and the `cwd/src` fallback.
 *                 Relative paths are resolved against `process.cwd()`.
 */
export function resolveManifestJsonPath(outDir?: string): string {
  return normalizePath(
    resolve((outDir || process.env.UNI_INPUT_DIR || `${process.cwd()}/src`) as string, 'manifest.json'),
  )
}
