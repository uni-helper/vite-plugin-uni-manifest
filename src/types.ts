export interface Options {
  /**
   * minify the `manifest.json`
   * @default false
   */
  minify: boolean

  /**
   * Controls whether a newline character is added at the end of the `manifest.json` file.
   * @default false
   */
  newline?: boolean
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}
