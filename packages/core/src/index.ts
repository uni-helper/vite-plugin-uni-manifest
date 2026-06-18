import type { Plugin } from 'vite'
import type { UserOptions } from './types'
import { ManifestContext } from './context'

export * from './config'
export * from './context'

/**
 * Vite plugin that generates uni-app `manifest.json` from a TypeScript config file.
 *
 * Uses `c12`'s `watchConfig` to watch `manifest.config.ts` and auto-sync to `manifest.json`.
 */
export function VitePluginUniManifest(userOptions: UserOptions = {}): Plugin {
  let ctx: ManifestContext
  return {
    name: 'vite-plugin-uni-manifest',
    // Run before other plugins to ensure manifest.json is ready
    enforce: 'pre',
    async configResolved() {
      // Ensure manifest.json exists before plugin runs, avoiding downstream errors
      ManifestContext.CheckManifestJsonFile()
      ctx = new ManifestContext(userOptions)
      await ctx.setup()
    },
    buildEnd: () => ctx?.unwatch(),
  }
}

export default VitePluginUniManifest
