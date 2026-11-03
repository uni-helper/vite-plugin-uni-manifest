import type { LoadConfigOptions } from 'c12'
import type { UserManifestConfig } from './config'
import type { ResolvedOptions, UserOptions } from './types'
import process from 'node:process'
import { loadConfig, watchConfig } from 'c12'
import { createDefu } from 'defu'
import { enable } from 'obug'
import { loadEnv } from 'vite'
import { defaultManifestConfig } from './defaults'
import { debug } from './logger'
import { resolveOutputSpec, writeManifestJson } from './writer'

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

/** Load the manifest config once and write it to `manifest.json`. */
export async function generateManifest(
  userOptions: UserOptions = {},
  mode = process.env.NODE_ENV,
): Promise<void> {
  const options = prepareOptions(userOptions)
  loadDotenv(options, mode)
  const { config, _configFile } = await loadConfig<UserManifestConfig>(getConfigOptions(options))
  if (!_configFile) {
    debug.config('no manifest.config.* found, leaving manifest.json untouched')
    return
  }
  writeManifestJson(config, resolveOutputSpec(options))
}

/** Merge user options with defaults to produce resolved options. */
function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    minify: false,
    insertFinalNewline: false,
    indent: 2,
    eol: '\n',
    debug: false,
    dotenv: false,
    replaceArrays: false,
    cwd: process.env.VITE_ROOT_DIR,
    ...userOptions,
  }
}

function prepareOptions(userOptions: UserOptions): ResolvedOptions {
  const options = resolveOptions(userOptions)
  if (options.debug) {
    const suffix = typeof options.debug === 'boolean'
      ? '*'
      : options.debug
    // obug's `enable` writes the namespaces into `process.env.DEBUG`. Keep the
    // caller's value so the plugin does not silence their other debuggers.
    const previousDebug = process.env.DEBUG
    enable(`vite-plugin-uni-manifest:${suffix}`)
    if (previousDebug === undefined)
      delete process.env.DEBUG
    else
      process.env.DEBUG = previousDebug
  }
  debug.options(options)
  return options
}

/**
 * c12 merger for the `replaceArrays` option: defu joins arrays from every
 * source, this one lets the higher-priority array win as a whole.
 */
const replaceArrayMerger = createDefu((object, key, value) => {
  if (Array.isArray(value)) {
    object[key] = value
    return true
  }
  return false
}) as NonNullable<LoadConfigOptions<UserManifestConfig>['merger']>

/**
 * Load `.env`, `.env.local`, `.env.{mode}` and `.env.{mode}.local` into
 * `process.env`, so `manifest.config.*` can read them.
 *
 * Vite's `loadEnv` only returns the values and filters by prefix (`VITE_` by
 * default), so ask for every key with an empty prefix and write them back here.
 */
function loadDotenv(options: ResolvedOptions, mode?: string): void {
  if (!options.dotenv)
    return
  Object.assign(process.env, loadEnv(mode ?? '', options.cwd ?? process.cwd(), ''))
}

function getConfigOptions(options: ResolvedOptions): LoadConfigOptions<UserManifestConfig> {
  return {
    cwd: options.cwd,
    name: 'manifest',
    defaultConfig: defaultManifestConfig,
    rcFile: false,
    packageJson: false,
    merger: options.replaceArrays ? replaceArrayMerger : undefined,
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
 * are enabled via `obug` — `true` enables every category,
 * a string enables only that one (e.g. `'writer'`).
 *
 * @example
 * ```ts
 * const watcher = await createManifestWatcher({ minify: true })
 * // later…
 * await watcher.unwatch()
 * ```
 */
export async function createManifestWatcher(
  userOptions: UserOptions = {},
  mode = process.env.NODE_ENV,
): Promise<ManifestWatcher> {
  const options = prepareOptions(userOptions)
  loadDotenv(options, mode)
  const spec = resolveOutputSpec(options)

  const { config, unwatch, _configFile } = await watchConfig<UserManifestConfig>({
    ...getConfigOptions(options),
    onUpdate: ({ newConfig, getDiff }) => {
      if (!newConfig._configFile) {
        debug.config('manifest.config.* is gone, leaving manifest.json untouched')
        return
      }
      const diff = getDiff()
      if (diff.length === 0) {
        debug.config('config changed but produced no diff, skipping write')
        return
      }
      debug.config('config changed', diff)
      writeManifestJson(newConfig.config, spec)
    },
  })
  if (_configFile)
    writeManifestJson(config, spec)
  else
    debug.config('no manifest.config.* found, leaving manifest.json untouched')

  return { options, unwatch }
}
