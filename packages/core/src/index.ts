import type { Plugin } from 'vite'
import type { UserOptions } from './types'
import type { ManifestWatcher } from './watcher'
import { resolveManifestJsonPath } from './paths'
import { createManifestWatcher } from './watcher'

export * from './config'
export * from './types'
export * from './watcher'
export * from './writer'

/**
 * Vite plugin that generates uni-app `manifest.json` from a TypeScript config file.
 *
 * Uses `c12`'s `watchConfig` to watch `manifest.config.ts` and auto-sync to `manifest.json`.
 */
export function VitePluginUniManifest(userOptions: UserOptions = {}): Plugin {
  let watcher: ManifestWatcher | undefined
  return {
    name: 'vite-plugin-uni-manifest',
    // Run before other plugins to ensure manifest.json is ready
    enforce: 'pre',
    buildStart() {
      this.addWatchFile(resolveManifestJsonPath())
    },
    async configResolved() {
      watcher = await createManifestWatcher(userOptions)
    },
    buildEnd: () => watcher?.unwatch(),
  }
}

export default VitePluginUniManifest
