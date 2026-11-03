import type { ResolvedOptions } from './types'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { normalizePath } from 'vite'
import { debug } from './logger'

/** Everything `writeManifestJson` needs to know about the file it produces. */
export interface OutputSpec {
  /**
   * Base directory for a relative `outDir` and for the `src` fallback.
   * Defaults to `process.cwd()`.
   */
  cwd?: string
  /**
   * Directory that receives `manifest.json`. Falls back to uni-app's
   * `UNI_INPUT_DIR`, then to `cwd/src`.
   */
  outDir?: string
  /** Indentation for `JSON.stringify`; `0` writes minified JSON. */
  indent: number | string
  eol: '\n' | '\r\n'
  /** Append `eol` after the closing brace. */
  finalNewline: boolean
}

/** Derive the output spec from resolved plugin options. */
export function resolveOutputSpec(
  options: Pick<ResolvedOptions, 'cwd' | 'outDir' | 'minify' | 'indent' | 'eol' | 'insertFinalNewline'>,
): OutputSpec {
  return {
    cwd: options.cwd,
    outDir: options.outDir,
    indent: options.minify
      ? 0
      : options.indent,
    eol: options.eol,
    finalNewline: options.insertFinalNewline,
  }
}

/**
 * Absolute POSIX path of `manifest.json`: `outDir` wins over uni-app's
 * `UNI_INPUT_DIR`, which wins over `cwd/src`. Relative paths resolve against
 * the spec's `cwd`, not the process directory. `UNI_INPUT_DIR` is read on every
 * write so a generator that sets the variable late still gets the right place.
 */
function resolveManifestJsonPath(spec: OutputSpec): string {
  return normalizePath(
    resolve(spec.cwd ?? process.cwd(), spec.outDir || process.env.UNI_INPUT_DIR || 'src', 'manifest.json'),
  )
}

/**
 * Write the manifest config to `manifest.json`.
 *
 * Skips the write when the content is unchanged, which keeps downstream
 * recompiles from firing on every config reload.
 */
export function writeManifestJson(config: any, spec: OutputSpec): void {
  const path = resolveManifestJsonPath(spec)
  let content = JSON.stringify(config, null, spec.indent)
  // JSON.stringify always emits LF; convert to the requested end-of-line sequence
  if (spec.eol !== '\n')
    content = content.replaceAll('\n', spec.eol)
  if (spec.finalNewline)
    content += spec.eol
  if (existsSync(path) && readFileSync(path, 'utf-8') === content) {
    debug.writer('content unchanged, skipping write:', path)
    return
  }
  debug.writer('writing', path)
  // `outDir` may point at a directory the project has not created yet
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}
