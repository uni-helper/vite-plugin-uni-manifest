import type { UserManifestConfig } from '../packages/core/src/config'
import { describe, expectTypeOf, it } from 'vitest'
import { defineManifestConfig } from '../packages/core/src/config'

describe('defineManifestConfig', () => {
  it('returns the same type as input', () => {
    expectTypeOf(defineManifestConfig).returns.toEqualTypeOf<UserManifestConfig>()
  })

  it('accepts UserManifestConfig and preserves its type', () => {
    expectTypeOf(defineManifestConfig).parameter(0).toEqualTypeOf<UserManifestConfig>()
  })

  it('preserves platform-specific config types', () => {
    const config = defineManifestConfig({
      'name': 'test',
      'appid': '',
      'description': '',
      'versionName': '1.0.0',
      'versionCode': '100',
      'mp-weixin': { appid: 'wx123', usingComponents: true },
    })
    expectTypeOf(config).toEqualTypeOf<UserManifestConfig>()
  })
})
