import type { UserManifestConfig } from './config'
import type { ResolvedOptions, UserOptions } from './types'
import { existsSync, writeFileSync } from 'node:fs'
import { watchConfig } from 'c12'
import { defaultManifestConfig, manifestJsonPath } from './constant'
import { resolveOptions } from './options'

/**
 * Manages the lifecycle of `manifest.json` generation.
 *
 * Uses `c12`'s `watchConfig` to watch `manifest.config.ts` (and other config sources)
 * and writes the resolved config to `manifest.json` on every change.
 */
export class ManifestContext {
  options: ResolvedOptions
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
        ManifestContext.WriteManifestJSON(config.newConfig.config, this.options)
      },
    })
    ManifestContext.WriteManifestJSON(config, this.options)

    this.unwatch = unwatch
  }

  /** Write the resolved manifest config to `manifest.json`. */
  static WriteManifestJSON(config: any = {}, opts?: ResolvedOptions) {
    writeFileSync(
      manifestJsonPath,
      JSON.stringify(config, null, opts?.minify ? 0 : 2) + (opts?.insertFinalNewline ? '\n' : ''),
    )
  }

  /** Ensure `manifest.json` exists; create an empty one if missing. */
  static CheckManifestJsonFile() {
    if (!existsSync(manifestJsonPath))
      ManifestContext.WriteManifestJSON()
  }
}
