import type { Plugin } from 'vite'
import type { debug } from './logger'

/** Debug log category, corresponds to the loggers exposed by {@link debug}. */
export type DebugType = keyof typeof debug

/** Plugin configuration options. */
export interface Options {
  /**
   * minify the `manifest.json`
   * @default false
   * @since 0.1.3
   */
  minify: boolean
  /**
   * insert newline at the end of the `manifest.json`
   * @default false
   * @since 0.2.9
   */
  insertFinalNewline: boolean
  /**
   * Indentation of the generated `manifest.json`.
   * Accepts a number of spaces or a string (e.g. `'\t'`).
   * Ignored when `minify` is `true`.
   * @default 2
   * @since 0.5.2
   */
  indent: number | string
  /**
   * End-of-line sequence of the generated `manifest.json`.
   * @default '\n'
   * @since 0.5.2
   */
  eol: '\n' | '\r\n'
  /**
   * Resolve configuration from this working directory.
   * Falls back to `process.cwd()` when the env variable is unset.
   * @default process.env.VITE_ROOT_DIR
   * @since 0.2.12
   */
  cwd?: string
  /**
   * Output directory for the generated `manifest.json`.
   * When omitted, falls back to uni-app's `UNI_INPUT_DIR` (or `cwd/src`).
   * Relative paths resolve against `cwd`, the same directory the config is
   * loaded from.
   * @default undefined
   * @since 0.5.1
   */
  outDir?: string
  /**
   * Enable debug logs. `true` enables every category; a string
   * enables a single one (e.g. `'writer'`).
   * Equivalent to the `DEBUG=vite-plugin-uni-manifest:*` env variable.
   * @default false
   * @since 0.5.7
   */
  debug: boolean | DebugType
  /**
   * Load `.env`, `.env.local`, `.env.{mode}` and `.env.{mode}.local` from `cwd`
   * into `process.env` before reading the config, so `manifest.config.*` can use
   * them. Uses Vite's `loadEnv` without the `VITE_` prefix filter; variables
   * already present in `process.env` win over the files.
   * @default false
   * @since 0.7.0
   */
  dotenv: boolean
  /**
   * Let arrays replace each other instead of being concatenated. c12 merges with
   * `defu`, which joins arrays from every source, so the default config arrays
   * end up appended to the array you write.
   * @default false
   * @since 0.7.0
   */
  replaceArrays: boolean
}

/** User-facing options — all fields are optional. */
export interface UserOptions extends Partial<Options> {}

/** Fully resolved options with all defaults applied. */
export interface ResolvedOptions extends Options {}

/** Options for {@link UniManifestPlugin.prepare}. */
export interface PrepareOptions {
  /**
   * Project root used to find `manifest.config.*`. Overrides the `cwd` option
   * for this call. Falls back to `VITE_ROOT_DIR`, then `process.cwd()`.
   */
  cwd?: string
  /**
   * Mode used to pick `.env.{mode}` files. Falls back to `process.env.NODE_ENV`.
   * Pass the same mode Vite runs with (`--mode`), otherwise the prepared file
   * can be built from a different `.env` file than the one Vite uses later.
   */
  mode?: string
}

/** Plugin instance returned by {@link VitePluginUniManifest}. */
export interface UniManifestPlugin extends Plugin {
  /**
   * Load `manifest.config.*` and write `manifest.json` before Vite starts.
   *
   * uni-app reads `manifest.json` in its `config` hook, before this plugin's
   * `configResolved`, so waiting for `prepare()` is the only way to have the
   * generated file in place in time. Returns the same plugin instance, so it can
   * be awaited inline in the `plugins` array.
   *
   * Vite writes the file again when it takes over; the writer skips identical
   * content, so the second pass is a no-op.
   *
   * @throws When the config file cannot be loaded or its content is not an object.
   */
  prepare: (options?: PrepareOptions) => Promise<UniManifestPlugin>
}
