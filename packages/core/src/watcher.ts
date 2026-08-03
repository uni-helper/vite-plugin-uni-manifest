import type { UserManifestConfig } from './config'
import type { ResolvedOptions, UserOptions } from './types'
import process from 'node:process'
import { watchConfig } from 'c12'
import { defaultManifestConfig } from './defaults'
import { ensureManifestJsonExists, writeManifestJson } from './writer'

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
    cwd: process.env.VITE_ROOT_DIR,
    ...userOptions,
  }
}

/**
 * Create a manifest watcher — the core deep module of this plugin.
 *
 * Resolves options, ensures `manifest.json` exists, watches
 * `manifest.config.ts` (via c12) and syncs every change to `manifest.json`.
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

  ensureManifestJsonExists()

  const { config, unwatch } = await watchConfig<UserManifestConfig>({
    cwd: options.cwd,
    name: 'manifest',
    defaultConfig: defaultManifestConfig,
    rcFile: false,
    packageJson: false,
    onUpdate: ({ newConfig, getDiff }) => {
      const diff = getDiff()
      if (diff.length === 0)
        return
      writeManifestJson(newConfig.config, options)
    },
  })
  writeManifestJson(config, options)

  return { options, unwatch }
}

/**
 * @deprecated Use {@link createManifestWatcher} instead.
 * Kept for backward compatibility — will be removed in v0.5.0.
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
