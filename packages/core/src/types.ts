export interface Options {
  /**
   * minify the `manifest.json`
   * @default false
   */
  minify: boolean
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}
