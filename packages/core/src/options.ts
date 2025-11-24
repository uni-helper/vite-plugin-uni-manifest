import type { ResolvedOptions, UserOptions } from './types'
import process from 'node:process'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  return {
    minify: false,
    insertFinalNewline: false,
    cwd: process.env.VITE_ROOT_DIR,
    ...userOptions,
  }
}
