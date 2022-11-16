export interface Options {
  /**
   * src path
   * @default "src"
   */
  outDir: string;
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}
