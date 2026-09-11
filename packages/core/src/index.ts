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
 * Watches `manifest.config.ts` during development and loads it once for production builds.
 */
export function VitePluginUniManifest(userOptions: UserOptions = {}): Plugin {
  let watcher: ManifestWatcher | undefined
  return {
    name: 'vite-plugin-uni-manifest',
    // Run before other configResolved hooks to keep manifest.json in sync
    enforce: 'pre',
    async configResolved(config) {
      if (config.command === 'build') {
        await generateManifest(userOptions)
        return
      }
      watcher = await createManifestWatcher(userOptions)
    },
    buildEnd: () => watcher?.unwatch(),
  }
}

export default VitePluginUniManifest
