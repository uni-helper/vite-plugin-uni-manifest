import type { Plugin } from 'vite'
import type { UserOptions } from './types'
import { createReadStream } from 'node:fs'
import { bold, cyan, green } from 'colorette'
import { manifestJsonPath } from './constant'
import { ManifestContext } from './context'

export * from './config'

ManifestContext.CheckManifestJsonFile()

export async function VitePluginUniManifest(userOptions: UserOptions = {}): Promise<Plugin> {
  const ctx = new ManifestContext(userOptions)
  await ctx.setup()
  return {
    name: 'vite-plugin-uni-manifest',
    enforce: 'pre',
    buildEnd: () => ctx.unwatch(),
    configureServer(server) {
      const baseUrl = '__manifest'

      server.middlewares.use(`/${baseUrl}`, async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const stream = createReadStream(manifestJsonPath)
        stream.pipe(res)
        stream.on('error', (err) => {
          console.error('Error reading manifest.json:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Failed to read manifest.json' }))
        })
      })

      const _printUrls = server.printUrls
      const colorUrl = (url: string) =>
        cyan(url.replace(/:(\d+)\//, (_, port) => `:${bold(port)}/`))
      server.printUrls = () => {
        _printUrls()
        for (const localUrl of [
          ...(server.resolvedUrls?.local ?? []),
          ...(server.resolvedUrls?.network ?? []),
        ].filter((url, index, self) => self.indexOf(url) === index)) {
          const appUrl = localUrl.endsWith('/') ? localUrl : `${localUrl}/`
          const serverUrl = server.config.base && appUrl.endsWith(server.config.base)
            ? appUrl.slice(0, -server.config.base.length)
            : appUrl.slice(0, -1)
          const inspectorUrl = `${serverUrl}/${baseUrl}/`
          console.log(`  ${green('➜')}  ${bold('Manifest Inspector')}: ${colorUrl(`${inspectorUrl}`)}`) // eslint-disable-line no-console
        }
      }
    },
  }
}

export default VitePluginUniManifest
