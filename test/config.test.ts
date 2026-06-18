import { describe, expect, it } from 'vitest'
import { defineManifestConfig } from '../packages/core/src/config'

describe('defineManifestConfig', () => {
  it('returns the config object as-is', () => {
    const config = { name: 'test', appid: 'test-appid', description: 'desc', versionName: '1.0.0', versionCode: '100' }
    const result = defineManifestConfig(config)
    expect(result).toBe(config)
  })

  it('works with empty config', () => {
    const config = {} as any
    const result = defineManifestConfig(config)
    expect(result).toBe(config)
  })

  it('preserves nested platform configs', () => {
    const config = {
      name: 'test',
      appid: '',
      description: '',
      versionName: '1.0.0',
      versionCode: '100',
      'mp-weixin': { appid: 'wx123', usingComponents: true },
      'app-plus': { usingComponents: true },
    }
    const result = defineManifestConfig(config)
    expect(result['mp-weixin']).toEqual({ appid: 'wx123', usingComponents: true })
    expect(result['app-plus']).toEqual({ usingComponents: true })
  })
})
