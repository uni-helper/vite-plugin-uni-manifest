import { resolve } from 'node:path'
import process from 'node:process'
import { normalizePath } from 'vite'

/** Resolve absolute path to `manifest.json` from uni-app's input directory. */
export function resolveManifestJsonPath(): string {
  return normalizePath(
    resolve((process.env.UNI_INPUT_DIR || `${process.cwd()}/src`) as string, 'manifest.json'),
  )
}
