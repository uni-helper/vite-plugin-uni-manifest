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
   * @default undefined
   * @since 0.5.1
   */
  outDir?: string
}

/** User-facing options — all fields are optional. */
export interface UserOptions extends Partial<Options> {}

/** Fully resolved options with all defaults applied. */
export interface ResolvedOptions extends Options {}
