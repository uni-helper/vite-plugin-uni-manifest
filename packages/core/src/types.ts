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
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}
