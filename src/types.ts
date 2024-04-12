export interface Options {
  /**
   * minify the `manifest.json`
   * @default false
   */
  minify: boolean

  /**
   * `manifest.json` 最后增加换行符
   * @default false
   */
  newline?: boolean
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}
