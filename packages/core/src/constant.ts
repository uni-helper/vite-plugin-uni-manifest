import { resolve } from 'node:path'
import process from 'node:process'
import { normalizePath } from 'vite'
import type { UserManifestConfig } from './config'

export const manifestJsonPath = normalizePath(
  resolve((process.env.UNI_INPUT_DIR || `${process.cwd()}/src`) as string, 'manifest.json'),
)

/**
 * {@link https://github.com/dcloudio/uni-preset-vue/blob/vite-alpha/src/manifest.json}
 */
export const defaultManifestConfig: UserManifestConfig = {
  'name': '',
  'appid': '',
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {},
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        permissions: [],
      },
      /* ios打包配置 */
      ios: {},
      /* SDK配置 */
      sdkConfigs: {},
    },
  },
  /* 快应用特有相关 */
  'quickapp': {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: '',
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
  },
  'mp-alipay': {
    usingComponents: true,
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
}
