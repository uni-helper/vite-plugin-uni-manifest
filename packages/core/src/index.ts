import type { Plugin } from 'vite'
import type { UserOptions } from './types'
import { ManifestContext } from './context'

export * from './config'

ManifestContext.CheckManifestJsonFile()

export async function VitePluginUniManifest(userOptions: UserOptions = {}): Promise<Plugin> {
  const ctx = new ManifestContext(userOptions)
  ctx.setup()
  return {
    name: 'vite-plugin-uni-manifest',
    enforce: 'pre',
    buildEnd: () => ctx.unwatch(),
  }
}

export default VitePluginUniManifest
