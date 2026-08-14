import type { AppDistributeIos, AppIconsIos, AppModules, AppSplashScreensIos } from './app'

/**
 * uni-app-x iOS 平台发布配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#app-ios-distribute>
 */
export interface AppIosDistribute extends AppDistributeIos {
  /**
   * 是否为自定义调试基座
   *
   * @default false
   */
  syncDebug?: boolean

  /** iOS 平台应用图标配置，云端打包后生效 */
  icons?: AppIconsIos

  /** iOS 平台应用启动界面配置，云端打包后生效 */
  splashScreens?: AppSplashScreensIos

  /** app 内置模块配置 */
  modules?: AppModules

  [x: string]: any
}

/**
 * uni-app-x iOS App 平台配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#manifest-app-ios>
 */
export interface AppIos {
  /**
   * 应用默认主题，可取值 light/dark/auto
   *
   * @default "light"
   */
  defaultAppTheme?: 'auto' | 'light' | 'dark'

  /**
   * iOS 平台发布配置
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#app-ios-distribute>
   */
  distribute?: AppIosDistribute

  /**
   * 隐私协议初始状态，可取值 auto/agree/disagree
   *
   * @default "auto"
   */
  initPrivacyAuthorization?: 'auto' | 'agree' | 'disagree'

  [x: string]: any
}
