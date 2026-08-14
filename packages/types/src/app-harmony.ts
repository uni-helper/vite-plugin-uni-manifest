import type { HEXColor } from './common'

/**
 * HarmonyOS 签名配置
 *
 * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-signingconfigs>
 */
export interface AppHarmonyDistributeSigningConfig {
  /**
   * 私钥库文件
   */
  storeFile?: string

  /**
   * 私钥库访问密码
   */
  storePassword?: string

  /**
   * 私钥库里面的私钥别名
   */
  keyAlias?: string

  /**
   * 私钥访问密码
   */
  keyPassword?: string

  /**
   * 签名算法，固定为 "SHA256withECDSA"
   */
  signAlg?: string

  /**
   * 证书文件
   */
  certpath?: string

  /**
   * 签名描述文件
   */
  profile?: string
}

/**
 * HarmonyOS 应用图标配置
 *
 * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-icons>
 */
export interface AppHarmonyIcons {
  /**
   * 前景图，以相对路径指向一个图片文件
   */
  foreground?: string

  /**
   * 背景图，以相对路径指向一个图片文件
   */
  background?: string

  [x: string]: any
}

/**
 * HarmonyOS 启动界面配置
 *
 * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-splashscreens>
 */
export interface AppHarmonySplashScreens {
  /**
   * 启动界面背景色
   *
   * @format color
   */
  startWindowBackground?: HEXColor

  /**
   * 启动界面中部图标，以相对路径指向一个图片文件
   */
  startWindowIcon?: string

  [x: string]: any
}

/**
 * HarmonyOS 模块配置
 *
 * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-modules> 和 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-modules-3>
 */
export interface AppHarmonyModules {
  /** 定位模块相关参数 */
  'uni-location'?: Record<string, any>

  /** 地图模块相关参数 */
  'uni-map'?: Record<string, any>

  /** 登录鉴权模块相关参数 */
  'uni-oauth'?: {
    /** 华为 OAuth 模块 */
    huawei?: Record<string, any>

    /** 微信 OAuth 模块 */
    weixin?: {
      /** 微信开放平台申请的应用 ID（AppID） */
      appid?: string

      [x: string]: any
    }

    [x: string]: any
  }

  /** 支付模块相关参数 */
  'uni-payment'?: Record<string, any>

  /** 分享模块相关参数 */
  'uni-share'?: {
    /** 微信分享模块 */
    weixin?: {
      /** 微信开放平台申请的应用 ID（AppID） */
      appid?: string

      [x: string]: any
    }

    [x: string]: any
  }

  /** 系统定位模块（uni-app x） */
  'uni-location-system'?: Record<string, any>

  /** 腾讯地图模块（uni-app x） */
  'uni-map-tencent'?: Record<string, any>

  /** 支付宝支付模块（uni-app x） */
  'uni-payment-alipay'?: Record<string, any>

  /** 微信支付模块（uni-app x） */
  'uni-payment-wxpay'?: Record<string, any>

  /** 统一推送模块（uni-app x） */
  'uni-push'?: Record<string, any>

  /** 一键登录模块（uni-app x） */
  'uni-verify'?: Record<string, any>

  /** uni 实人认证模块（uni-app x） */
  'uni-facialVerify'?: Record<string, any>

  [x: string]: any
}

/**
 * HarmonyOS 分发配置
 *
 * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-distribute> 和 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#app-harmony-distribute>
 */
export interface AppHarmonyDistribute {
  /**
   * 应用包名
   *
   * HarmonyOS 应用的唯一标识符，格式为反向域名
   */
  bundleName?: string

  /**
   * 证书签名配置
   *
   * 配置鸿蒙打包时使用的数字签名证书信息，可分别配置调试证书和发布证书
   *
   * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-signingconfigs>
   */
  signingConfigs?: {
    /**
     * 调试证书配置
     */
    default?: AppHarmonyDistributeSigningConfig

    /**
     * 发布证书配置
     */
    release?: AppHarmonyDistributeSigningConfig

    /**
     * 其他自定义签名配置
     */
    [configName: string]: AppHarmonyDistributeSigningConfig | undefined
  }

  /**
   * 应用图标配置
   *
   * 配置应用的前景图和背景图，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-icons>
   */
  icons?: AppHarmonyIcons

  /**
   * 启动界面配置
   *
   * 配置启动界面的背景色和中部图标，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-splashscreens>
   */
  splashScreens?: AppHarmonySplashScreens

  /**
   * 模块配置
   *
   * 配置各种功能模块的相关参数，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-modules>
   */
  modules?: AppHarmonyModules

  /**
   * 其他分发相关配置
   */
  [x: string]: any
}

/**
 * HarmonyOS UserAgent 配置，配置应用的 UserAgent 相关设置
 *
 * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-useragent>
 */
export interface AppHarmonyUserAgent {
  /**
   * UserAgent 值
   *
   * 应用 UserAgent 相关配置，默认值为系统 UserAgent
   */
  value?: string

  /**
   * 是否追加到系统默认 userAgent
   *
   * 是否将 value 值作为追加值连接到系统默认 userAgent 值之后
   */
  concatenate?: boolean
}

/**
 * HarmonyOS 底部安全区域配置
 *
 * 详见 <https://uniapp.dcloud.net.cn/tutorial/darkmode.html#app-harmony-safearea-bottom>
 */
export interface AppHarmonySafearea {
  /**
   * 底部安全区域背景色
   *
   * @format color
   */
  background?: HEXColor

  /**
   * 暗黑模式下底部安全区域背景色
   *
   * @format color
   */
  backgroundDark?: HEXColor

  bottom?: {
    /** 底部区域占位方式，目前仅支持 none（无 tabBar 时不占位） */
    offset: 'none'
  }
}

/**
 * uni-app-x App HarmonyOS 应用配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#manifest-app-harmony>
 */
export interface AppHarmony {
  /**
   * HarmonyOS 分发配置
   *
   * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-distribute> 和 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#app-harmony-distribute>
   */
  distribute?: AppHarmonyDistribute

  /**
   * UserAgent 配置，配置应用的 UserAgent 相关设置
   *
   * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony-useragent>
   */
  useragent?: AppHarmonyUserAgent

  /**
   * 是否开启暗黑模式
   *
   * 详见 <https://uniapp.dcloud.net.cn/tutorial/darkmode#app-harmony>
   *
   * @default false
   */
  darkmode?: boolean

  /**
   * 主题配置文件路径
   *
   * 详见 <https://uniapp.dcloud.net.cn/tutorial/darkmode.html#app-harmony>
   *
   * @default "theme.json"
   */
  themeLocation?: string

  /**
   * 底部安全区域配置
   *
   * 详见 <https://uniapp.dcloud.net.cn/tutorial/darkmode.html#app-harmony-safearea-bottom>
   */
  safearea?: AppHarmonySafearea

  /**
   * 其他扩展配置
   *
   * 支持其他 HarmonyOS 平台特有的配置项
   */
  [x: string]: any
}
