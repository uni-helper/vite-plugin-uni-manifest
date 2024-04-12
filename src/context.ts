import { existsSync, writeFileSync } from 'node:fs'
import { watchConfig } from 'c12'
import { resolveOptions } from './options'
import type { ResolvedOptions, UserOptions } from './types'
import { defaultManifestConfig, manifestJsonPath } from './constant'
import type { UserManifestConfig } from './config'

export class ManifestContext {
  options: ResolvedOptions
  unwatch!: () => Promise<void>
  constructor(options: UserOptions) {
    this.options = resolveOptions(options)
  }

  async setup() {
    const { config, unwatch } = await watchConfig<UserManifestConfig>({
      name: 'manifest',
      defaultConfig: defaultManifestConfig,
      rcFile: false,
      packageJson: false,
      onUpdate: (config: any) => {
        ManifestContext.WriteManifestJSON(config.newConfig.config, this.options)
      },
    })
    ManifestContext.WriteManifestJSON(config, this.options)

    this.unwatch = unwatch
  }

  static WriteManifestJSON(config: any = {}, options: ResolvedOptions = { minify: false }) {
    // 生成配置内容字符串
    let body = JSON.stringify(config, null, options.minify ? 0 : 2)
    // 文件最后增加空白换行符
    if (options?.newline)
      body = `${body}\n`

    // 写入文件
    writeFileSync(manifestJsonPath, body)
  }

  static CheckManifestJsonFile() {
    if (!existsSync(manifestJsonPath))
      ManifestContext.WriteManifestJSON()
  }
}
