import type { UserManifestConfig } from './config'
import type { ResolvedOptions, UserOptions } from './types'
import process from 'node:process'
import { watchConfig } from 'c12'
import dbg from 'debug'
import { defaultManifestConfig } from './defaults'
import { debug } from './logger'
import { writeManifestJson } from './writer'

/**
 * The public interface of the manifest watcher.
 *
 * Callers interact only with this surface — all orchestration
 * (option resolution, config watching, file writing) is hidden
 * behind it.
 */
export interface ManifestWatcher {
  /** Fully resolved options with defaults applied. */
  options: ResolvedOptions
  /** Stop watching config sources and release resources. */
  unwatch: () => Promise<void>
}

/** Merge user options with defaults to produce resolved options. */
function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    minify: false,
    insertFinalNewline: false,
    indent: 2,
    eol: '\n',
    debug: false,
    cwd: process.env.VITE_ROOT_DIR,
    ...userOptions,
  }
}

/**
 * Create a manifest watcher — the core deep module of this plugin.
 *
 * Resolves options, watches `manifest.config.ts` (via c12) and syncs
 * every change to `manifest.json`. The initial write also creates the
 * file when missing — and only after the config loads successfully, so
 * a broken config file never leaves a placeholder `manifest.json` behind.
 *
 * When the `debug` option is set, the corresponding logger namespaces
 * are enabled via the `debug` package — `true` enables every category,
 * a string enables only that one (e.g. `'writer'`).
 *
 * @example
 * ```ts
 * const watcher = await createManifestWatcher({ minify: true })
 * // later…
 * await watcher.unwatch()
 * ```
 */
export async function createManifestWatcher(userOptions: UserOptions = {}): Promise<ManifestWatcher> {
  const options = resolveOptions(userOptions)
  if (options.debug) {
    const suffix = typeof options.debug === 'boolean' ? '*' : options.debug
    dbg.enable(`vite-plugin-uni-manifest:${suffix}`)
  }
  debug.options(options)

  const { config, unwatch } = await watchConfig<UserManifestConfig>({
    cwd: options.cwd,
    name: 'manifest',
    defaultConfig: defaultManifestConfig,
    rcFile: false,
    packageJson: false,
    onUpdate: ({ newConfig, getDiff }) => {
      const diff = getDiff()
      if (diff.length === 0) {
        debug.config('config changed but produced no diff, skipping write')
        return
      }
      debug.config('config changed', diff)
      writeManifestJson(newConfig.config, options)
    },
  })
  writeManifestJson(config, options)

  return { options, unwatch }
}

/**
 * @deprecated Use {@link createManifestWatcher} instead.
 */
export class ManifestContext {
  options: ResolvedOptions
  unwatch!: () => Promise<void>

  constructor(options: UserOptions) {
    this.options = resolveOptions(options)
  }

  /** Start watching config sources and perform initial write. */
  async setup(): Promise<void> {
    const watcher = await createManifestWatcher(this.options)
    this.unwatch = watcher.unwatch
  }
}
