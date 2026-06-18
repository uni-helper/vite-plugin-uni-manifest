import type { UserManifestConfig } from './config'
import type { UserOptions } from './types'
import { watchConfig } from 'c12'
import { defaultManifestConfig } from './constant'
import { resolveOptions } from './options'
import { writeManifestJson } from './writer'

/**
 * Manages the lifecycle of `manifest.json` generation.
 *
 * Uses `c12`'s `watchConfig` to watch `manifest.config.ts` (and other config sources)
 * and writes the resolved config to `manifest.json` on every change.
 */
export class ManifestContext {
  options
  unwatch!: () => Promise<void>
  constructor(options: UserOptions) {
    this.options = resolveOptions(options)
  }

  /**
   * Start watching config sources and perform initial write.
   * Must be called after construction.
   */
  async setup() {
    const { config, unwatch } = await watchConfig<UserManifestConfig>({
      cwd: this.options.cwd,
      name: 'manifest',
      defaultConfig: defaultManifestConfig,
      rcFile: false,
      packageJson: false,
      onUpdate: (config) => {
        writeManifestJson(config.newConfig.config, this.options)
      },
    })
    writeManifestJson(config, this.options)

    this.unwatch = unwatch
  }
}
