import type { Plugin } from 'vite'
import { ManifestContext } from './context'
import type { UserOptions } from './types'

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
