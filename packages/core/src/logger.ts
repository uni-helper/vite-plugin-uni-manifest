import Debug from 'debug'

/**
 * Debug loggers, keyed by category.
 *
 * Output is controlled by the `debug` plugin option or the standard
 * `DEBUG` environment variable (e.g. `DEBUG=vite-plugin-uni-manifest:*`).
 */
export const debug = {
  /** Option resolution logs */
  options: Debug('vite-plugin-uni-manifest:options'),
  /** manifest.config loading and change-detection logs */
  config: Debug('vite-plugin-uni-manifest:config'),
  /** manifest.json write logs */
  writer: Debug('vite-plugin-uni-manifest:writer'),
}
