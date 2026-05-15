/**
 * HarmonyOS 签名配置
 */
export interface HarmonySigningConfig {
  /**
   * 私钥库文件
   *
   */
  storeFile?: string

  /**
   * 私钥库访问密码
   *
   * 用于访问密钥库的加密密码
   */
  storePassword?: string

  /**
   * 私钥库里面的私钥别名
   *
   * 用于标识密钥的别名，如 debugKey
   */
  keyAlias?: string

  /**
   * 私钥访问密码
   *
   * 用于访问私钥的加密密码
   */
  keyPassword?: string

  /**
   * 签名算法
   *
   * 签名算法，固定为 "SHA256withECDSA"
   */
  signAlg?: string

  /**
   * 证书文件
   *
   * 指向 .cer 证书文件的路径
   */
  certpath?: string

  /**
   * 签名描述文件
   *
   */
  profile?: string
}

/**
 * HarmonyOS 应用图标配置
 */
export interface HarmonyIcons {
  /**
   * 前景图
   *
   * 以相对路径指向一个图片文件
   */
  foreground?: string

  /**
   * 背景图
   *
   * 以相对路径指向一个图片文件
   */
  background?: string
}

/**
 * HarmonyOS 启动界面配置
 */
export interface HarmonySplashScreens {
  /**
   * 启动界面背景色
   *
   * 格式为 #RRGGBB
   * @format color
   */
  startWindowBackground?: string

  /**
   * 启动界面中部图标
   *
   * 以相对路径指向一个图片文件
   */
  startWindowIcon?: string
}

/**
 * HarmonyOS 模块配置
 */
export interface HarmonyModules {
  /**
   * 定位模块相关参数
   *
   * 设置定位模块相关参数
   */
  'uni-location'?: Record<string, any>

  /**
   * 地图模块相关参数
   *
   * 设置地图模块相关参数
   */
  'uni-map'?: Record<string, any>

  /**
   * 登录鉴权模块相关参数
   *
   * 设置登录鉴权模块相关参数
   */
  'uni-oauth'?: Record<string, any>

  /**
   * 支付模块相关参数
   *
   * 设置支付模块相关参数
   */
  'uni-payment'?: Record<string, any>

  /**
   * 分享模块相关参数
   *
   * 设置分享模块相关参数
   */
  'uni-share'?: Record<string, any>

  /**
   * 其他模块配置
   */
  [moduleName: string]: Record<string, any> | undefined
}

/**
 * HarmonyOS UserAgent 配置
 */
export interface HarmonyUserAgent {
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
 * HarmonyOS 分发配置
 */
export interface HarmonyDistribute {
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
   */
  signingConfigs?: {
    /**
     * 调试证书配置
     */
    default?: HarmonySigningConfig

    /**
     * 发布证书配置
     */
    release?: HarmonySigningConfig

    /**
     * 其他自定义签名配置
     */
    [configName: string]: HarmonySigningConfig | undefined
  }

  /**
   * 应用图标配置
   *
   * 配置应用的前景图和背景图
   */
  icons?: HarmonyIcons

  /**
   * 启动界面配置
   *
   * 配置启动界面的背景色和中部图标
   */
  splashScreens?: HarmonySplashScreens

  /**
   * 模块配置
   *
   * 配置各种功能模块的相关参数
   */
  modules?: HarmonyModules

  /**
   * UserAgent 配置
   *
   * 配置应用的 UserAgent 相关设置
   */
  useragent?: HarmonyUserAgent

  /**
   * 其他分发相关配置
   */
  [key: string]: any
}

/**
 * HarmonyOS 应用配置
 *
 * 详见 https://uniapp.dcloud.net.cn/collocation/manifest.html#app-harmony
 */
export interface AppHarmony {
  /**
   * HarmonyOS 分发配置
   *
   * 包含应用包名、签名配置、图标、启动界面等分发相关的设置
   */
  distribute?: HarmonyDistribute
  /**
   * 其他扩展配置
   *
   * 支持其他 HarmonyOS 平台特有的配置项
   */
  [key: string]: any
}
