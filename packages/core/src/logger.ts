import { createDebug } from 'obug'

/**
 * Debug loggers, keyed by category.
 *
 * Output is controlled by the `debug` plugin option or the standard
 * `DEBUG` environment variable (e.g. `DEBUG=vite-plugin-uni-manifest:*`).
 */
export const debug = {
  /** Option resolution logs */
  options: createDebug('vite-plugin-uni-manifest:options'),
  /** manifest.config loading and change-detection logs */
  config: createDebug('vite-plugin-uni-manifest:config'),
  /** manifest.json write logs */
  writer: createDebug('vite-plugin-uni-manifest:writer'),
}
