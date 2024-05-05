export interface QuickappWebview {
  /** 应用图标，华为推荐 192x192 */
  icon?: string

  /** 应用包名 */
  package?: string

  /** 最小平台运行支持，快应用联盟最低 1063，快应用华为最低 1070 */
  minPlatformVersion?: number

  /** 版本名称 */
  versionName?: string

  /** 版本号 */
  versionCode?: number

  [x: string]: any
}

export interface QuickappWebviewUnion {
  /** 最小平台支持，最低 1063 */
  minPlatformVersion?: number
}

export interface QuickappWebviewHuawei {
  /** 最小平台支持，最低 1070 */
  minPlatformVersion?: number
}
