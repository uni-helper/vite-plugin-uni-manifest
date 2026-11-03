import type { Plugin } from 'vite'
import type { UserOptions } from './types'
import type { ManifestWatcher } from './watcher'
import { createManifestWatcher, generateManifest } from './watcher'

export * from './config'
export * from './logger'
export * from './types'
export * from './watcher'
export * from './writer'

/**
 * Vite plugin that generates uni-app `manifest.json` from a TypeScript config file.
 *
 * Watches `manifest.config.ts` during development and loads it once for a one-shot build.
 */
export function VitePluginUniManifest(userOptions: UserOptions = {}): Plugin {
  let watcher: ManifestWatcher | undefined
  return {
    name: 'vite-plugin-uni-manifest',
    // Run before other configResolved hooks to keep manifest.json in sync
    enforce: 'pre',
    async configResolved(config) {
      // `command` alone is not enough: uni-app mini program dev runs Vite's
      // build API with `watch`, which still needs a live config watcher.
      if (config.command === 'build' && !config.build.watch) {
        await generateManifest(userOptions)
        return
      }
      watcher = await createManifestWatcher(userOptions)
    },
    buildEnd: () => watcher?.unwatch(),
  }
}

export default VitePluginUniManifest
