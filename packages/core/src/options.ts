import type { ResolvedOptions, UserOptions } from './types'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    minify: false,
    insertFinalNewline: false,
    ...userOptions,
  }
}
