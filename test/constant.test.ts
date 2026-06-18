import { describe, expect, it } from 'vitest'
import { defaultManifestConfig, manifestJsonPath } from '../packages/core/src/constant'

describe('manifestJsonPath', () => {
  it('is an absolute path ending with manifest.json', () => {
    expect(manifestJsonPath).toMatch(/\/manifest\.json$/)
  })

  it('uses UNI_INPUT_DIR when set, or falls back to cwd/src', () => {
    const expected = process.env.UNI_INPUT_DIR || `${process.cwd()}/src`
    expect(manifestJsonPath).toContain(expected)
  })
})

describe('defaultManifestConfig', () => {
  it('has required fields', () => {
    expect(defaultManifestConfig.name).toBe('')
    expect(defaultManifestConfig.appid).toBe('')
    expect(defaultManifestConfig.description).toBe('')
    expect(defaultManifestConfig.versionName).toBe('1.0.0')
    expect(defaultManifestConfig.versionCode).toBe('100')
    expect(defaultManifestConfig.transformPx).toBe(false)
  })

  it('has app-plus config', () => {
    const appPlus = defaultManifestConfig['app-plus']!
    expect(appPlus).toBeDefined()
    expect(appPlus.usingComponents).toBe(true)
    expect(appPlus.nvueStyleCompiler).toBe('uni-app')
    expect(appPlus.compilerVersion).toBe(3)
  })

  it('has mp-weixin config', () => {
    const mpWeixin = defaultManifestConfig['mp-weixin']!
    expect(mpWeixin).toBeDefined()
    expect(mpWeixin.appid).toBe('')
    expect(mpWeixin.usingComponents).toBe(true)
    expect(mpWeixin.setting!.urlCheck).toBe(false)
  })

  it('has other mini-program configs', () => {
    expect(defaultManifestConfig['mp-alipay']!.usingComponents).toBe(true)
    expect(defaultManifestConfig['mp-baidu']!.usingComponents).toBe(true)
    expect(defaultManifestConfig['mp-toutiao']!.usingComponents).toBe(true)
  })

  it('has vueVersion set to 3', () => {
    expect(defaultManifestConfig.vueVersion).toBe('3')
  })

  it('has uniStatistics disabled by default', () => {
    expect(defaultManifestConfig.uniStatistics!.enable).toBe(false)
  })
})
