/** Plugin configuration options. */
export interface Options {
  /**
   * minify the `manifest.json`
   * @default false
   */
  minify: boolean
  /**
   * insert newline at the end of the `manifest.json`
   * @default false
   */
  insertFinalNewline: boolean
  /**
   * Resolve configuration from this working directory.
   * @default process.env.VITE_ROOT_DIR
   */
  cwd?: string
  /**
   * Output directory for the generated `manifest.json`.
   * When omitted, falls back to uni-app's `UNI_INPUT_DIR` (or `cwd/src`).
   * @default undefined
   */
  outDir?: string
}

/** User-facing options — all fields are optional. */
export interface UserOptions extends Partial<Options> {}

/** Fully resolved options with all defaults applied. */
export interface ResolvedOptions extends Options {}
