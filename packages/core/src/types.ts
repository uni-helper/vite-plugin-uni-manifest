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
}

/** User-facing options — all fields are optional. */
export interface UserOptions extends Partial<Options> {}

/** Fully resolved options with all defaults applied. */
export interface ResolvedOptions extends Options {}
