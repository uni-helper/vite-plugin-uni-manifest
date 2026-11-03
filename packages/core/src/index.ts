import type { PrepareOptions, UniManifestPlugin, UserOptions } from './types'
import { createManifestWatcher, generateManifest } from './watcher'

export * from './config'
export * from './types'
export * from './watcher'
export * from './writer'

/**
 * Vite plugin that generates uni-app `manifest.json` from a TypeScript config file.
 *
 * Watches `manifest.config.ts` whenever the build stays alive (`vite dev`, and
 * `build` with `watch`, which is how uni-app runs mini program development) and
 * loads it once for a one-shot build.
 */
export function VitePluginUniManifest(userOptions: UserOptions = {}): UniManifestPlugin {
  const plugin: UniManifestPlugin = {
    name: 'vite-plugin-uni-manifest',
    // Run before other configResolved hooks to keep manifest.json in sync
    enforce: 'pre',
    async configResolved(config) {
      // `command` alone is not enough: uni-app mini program dev runs Vite's
      // build API with `watch`, which still needs a live config watcher.
      if (config.command === 'build' && !config.build.watch) {
        await generateManifest(userOptions, config.mode)
        return
      }
      // Never closed here: `buildEnd` fires after every rebuild, so closing on
      // it would stop syncing manifest.config.* for the rest of a watch run.
      // The watcher is released when the process exits, which means a caller
      // that closes a programmatic watch build keeps it alive.
      await createManifestWatcher(userOptions, config.mode)
    },
    async prepare(options: PrepareOptions = {}) {
      const prepared = options.cwd === undefined
        ? userOptions
        : { ...userOptions, cwd: options.cwd }
      await generateManifest(prepared, options.mode)
      return plugin
    },
  }
  return plugin
}

export default VitePluginUniManifest
