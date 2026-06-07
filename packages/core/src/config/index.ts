import type { UserManifestConfig } from '@uni-helper/uni-manifest-types'

export * from '@uni-helper/uni-manifest-types'

/** Helper to define manifest config with type hints in `manifest.config.ts`. */
export function defineManifestConfig(config: UserManifestConfig) {
  return config
}
