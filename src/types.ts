export interface Options {
  /**
   * manifest.config path without ext
   * @default "manifest.config"
   */
  entry: string;
  /**
   * src path
   * @default "src"
   */
  outDir: string;
  /**
   * manifest.config file ext
   * @default "ts"
   */
  extension: string;
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}
