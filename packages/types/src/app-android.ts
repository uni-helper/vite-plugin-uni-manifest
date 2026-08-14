import type { AppDistributeAndroid, AppIconsAndroid, AppModules, AppSplashScreen, AppSplashScreensAndroid } from './app'

/**
 * uni-app-x Android 平台发布配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#app-android-distribute>
 */
export interface AppAndroidDistribute extends AppDistributeAndroid {
  /**
   * 是否为自定义调试基座
   *
   * @default false
   */
  syncDebug?: boolean

  /** Android 平台应用图标配置，云端打包后生效 */
  icons?: AppIconsAndroid

  /** Android 平台应用启动界面配置，云端打包后生效 */
  splashScreens?: AppSplashScreensAndroid

  /** Android 内置模块配置 */
  modules?: AppModules

  [x: string]: any
}

/**
 * uni-app-x App-Android 平台配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#manifest-app-android>
 */
export interface AppAndroid {
  /**
   * 应用默认主题，可取值 light/dark/auto
   *
   * @default "light"
   */
  defaultAppTheme?: 'auto' | 'light' | 'dark'

  /**
   * Android 平台发布配置
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#app-android-distribute>
   */
  distribute?: AppAndroidDistribute

  /**
   * 启动界面关闭时机配置，HBuilderX 4.71 及以上版本配置于 app-android 节点
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#android平台splash关闭时机>
   */
  splashScreen?: AppSplashScreen

  /**
   * 隐私协议初始状态，可取值 auto/agree/disagree
   *
   * @default "auto"
   */
  initPrivacyAuthorization?: 'auto' | 'agree' | 'disagree'

  [x: string]: any
}
