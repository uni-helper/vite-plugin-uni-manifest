import type { AndroidPermissionOrFeature } from './common'

/**
 * uni-app-x Android 图标配置
 *
 * HBuilderX 5.25 及以上版本支持自适应图标，图标文件改为打包到 `res/mipmap-*` 目录，
 * 自适应图标需在 nativeResources 目录下配置，详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#adaptiveicon>
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#icons-android>
 */
export interface AppIconsAndroid {
  /** 高分屏设备应用图标，分辨率要求 72x72，PNG 格式 */
  hdpi?: string

  /** 720P 高分屏设备应用图标，分辨率要求 96x96，PNG 格式 */
  xhdpi?: string

  /** 1080P 高分屏设备应用图标，分辨率要求 144x144，PNG 格式 */
  xxhdpi?: string

  /** 2K 屏设备应用图标，分辨率要求 192x192，PNG 格式 */
  xxxhdpi?: string

  [x: string]: any
}

/**
 * uni-app-x iOS 图标配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#icons-ios>
 */
export interface AppIconsIos {
  /** iPhone/iPad 设备应用图标，分辨率要求 1024x1024，PNG 格式，不能存在透明区域 */
  appstore?: string

  [x: string]: any
}

/**
 * uni-app-x App 端图标配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-icons>
 */
export interface AppIcons {
  /** Android 图标配置 */
  android?: AppIconsAndroid

  /** iOS 图标配置 */
  ios?: AppIconsIos

  [x: string]: any
}

/**
 * uni-app-x Android 平台启动界面配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#splashscreens-android>
 */
export interface AppSplashScreensAndroid {
  /**
   * 暗色模式下的启动界面背景色，仅 Android12 及以上设备生效
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#配置启动界面背景颜色>
   *
   * @since HBuilderX 4.75+
   */
  'background@night'?: string

  /** 适用于（ldpi）密度屏幕（~120dpi），建议分辨率 240x320，通常可以不用设置这项 */
  'ldpi'?: string

  /** 适用于（mdpi）密度屏幕（~160dpi），建议分辨率 320x480，通常可以不用设置这项 */
  'mdpi'?: string

  /** 适用于（hdpi）密度屏幕（~240dpi），建议分辨率 480x800，通常可以不用设置这项 */
  'hdpi'?: string

  /** 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 720x1280 */
  'xhdpi'?: string

  /** 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 1080x1920 */
  'xxhdpi'?: string

  /** 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 2160x3840 */
  'xxxhdpi'?: string

  [x: string]: any
}

/**
 * uni-app-x Android12 启动界面 Logo 图标配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#android12-icon>
 */
export interface AppSplashScreensAndroid12Icon {
  /** 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 480x480 */
  xhdpi?: string

  /** 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 720x720 */
  xxhdpi?: string

  /** 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 960x960 */
  xxxhdpi?: string

  [x: string]: any
}

/**
 * uni-app-x Android12 启动界面底部品牌图标配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#android12-brand>
 */
export interface AppSplashScreensAndroid12Brand {
  /** 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 400x160 */
  xhdpi?: string

  /** 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 600x240 */
  xxhdpi?: string

  /** 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 800x320 */
  xxxhdpi?: string

  [x: string]: any
}

/**
 * uni-app-x Android12 启动界面配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#splashscreen-android12>
 */
export interface AppSplashScreensAndroid12 {
  /** 仅在 Android12 及以上设备生效，默认值为白色 */
  background?: string

  /** Android12 启动界面中部 Logo 图标 */
  icon?: AppSplashScreensAndroid12Icon

  /** Android12 启动界面底部品牌图标 */
  brand?: AppSplashScreensAndroid12Brand

  [x: string]: any
}

/**
 * uni-app-x iOS 平台启动界面配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-splashscreens-3>
 */
export interface AppSplashScreensIos {
  /** 用于 iOS 平台自定义 storyboard 启动界面 */
  storyboard?: string

  [x: string]: any
}

/**
 * uni-app-x App 端启动界面配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-splashscreens>
 */
export interface AppSplashScreens {
  /** Android 平台启动界面配置 */
  android?: AppSplashScreensAndroid

  /** Android12 启动界面配置，无此配置项表示不适配支持 Android12 启动界面 */
  android12?: AppSplashScreensAndroid12

  /** iOS 平台启动界面配置 */
  ios?: AppSplashScreensIos

  [x: string]: any
}

/**
 * uni-app-x 启动界面关闭时机配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#splashscreenclose>
 */
export interface AppSplashScreen {
  /**
   * 启动界面关闭时机
   *
   * @default "onShow"
   */
  autoClose?: 'onShow' | 'onReady'

  [x: string]: any
}

/**
 * uni-app-x App-Android 平台发布配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-android>
 */
export interface AppDistributeAndroid {
  /**
   * 额外添加的权限
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#incloudpermissions>
   */
  permissions?: AndroidPermissionOrFeature[]

  /**
   * 强制移除的权限
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#excludepermissions>
   */
  excludePermissions?: AndroidPermissionOrFeature[]

  /**
   * 应用兼容的最低 Android 版本（API 等级）
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#minsdkversion>
   *
   * @default 21
   */
  minSdkVersion?: number

  /**
   * 应用适配的目标 Android 版本（API 等级），部分应用市场要求设置较高的 targetSdkVersion 才能提交审核
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#targetsdkversion>
   *
   * @default 32
   */
  targetSdkVersion?: number

  /**
   * 应用支持的 CPU 类型
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#abifilters>
   *
   * @default ["arm64-v8a"]
   */
  abiFilters?: ('armeabi-v7a' | 'arm64-v8a' | 'x86' | 'x86_64')[]

  /**
   * 是否开启 Android 原生 res 资源文件优化，开启后 res 资源文件名称会被混淆
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#enableresourceoptimizations>
   *
   * @default true
   *
   * @since HBuilderX 4.33+
   */
  enableResourceOptimizations?: boolean

  /**
   * aaptOptions 配置项
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#aaptoptions>
   */
  aaptOptions?: string[]

  /**
   * buildFeatures 配置项
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#buildfeatures>
   */
  buildFeatures?: string[]

  /**
   * packagingOptions 配置项
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#packagingoptions>
   */
  packagingOptions?: string[]

  /**
   * 是否不压缩原生库（.so 文件），设置为 true 时 .so 文件以未压缩方式打包
   *
   * @since HBuilderX 5.21+
   *
   * @default false
   */
  disableLegacyPackaging?: boolean

  [x: string]: any
}

/**
 * uni-app-x iOS 平台发布配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-ios>
 */
export interface AppDistributeIos {
  /**
   * iOS 支持的设备
   *
   * @default "auto"
   */
  devices?: 'auto' | 'iphone' | 'ipad' | 'universal'

  /**
   * 应用构建目标（Target）的标识名称
   *
   * 自定义基座默认为 “UniAppX”，正式版默认为应用标识（AppID）去掉 `__UNI__` 前缀后转大写
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#targetname>
   *
   * @since HBuilderX 4.34+
   */
  targetName?: string

  /**
   * 应用内部名称（可作为开发者标识），最多可使用 15 个字符
   *
   * 默认值为 targetName
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#cfbundlename>
   *
   * @since HBuilderX 4.34+
   */
  CFBundleName?: string

  /**
   * 在 iPad 设备是否全屏显示，设置为 false 表示应用能够与其他应用共享屏幕显示（分屏显示）
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#uirequiresfullscreen>
   *
   * @default false
   */
  UIRequiresFullScreen?: boolean

  /**
   * 应用能安装的最低 iOS 系统版本
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#deploymenttarget>
   *
   * @default "15.0"
   *
   * @since HBuilderX 5.25+
   */
  deploymentTarget?: string

  [x: string]: any
}

/**
 * uni-app-x app 内置模块配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-modules>
 */
export interface AppModules {
  /**
   * uni-ad 广告联盟模块
   *
   * 详见 <https://uniad.dcloud.net.cn/>
   */
  'uni-ad'?: AppModulesUniAd

  /**
   * canvas 画布组件模块（HBuilderX 4.25+）
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/component/canvas.html>
   */
  'uni-canvas'?: Record<string, any>

  /**
   * uniCloud 云函数/云对象模块（HBuilderX 4.25+）
   *
   * 详见 <https://doc.dcloud.net.cn/uniCloud/cf-functions.html>
   */
  'uni-cloud-client'?: Record<string, any>

  /**
   * 监听权限申请模块（HBuilderX 4.0+）
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/create-request-permission-listener.html>
   */
  'uni-createRequestPermissionListener'?: Record<string, any>

  /**
   * 创建 web-view 组件的上下文对象模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/create-webview-context.html>
   */
  'uni-createWebviewContext'?: Record<string, any>

  /**
   * uni 实人认证模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/facial-recognition-meta-info.html>
   */
  'uni-facialRecognitionVerify'?: Record<string, any>

  /**
   * 文件管理模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html>
   */
  'uni-fileSystemManager'?: Record<string, any>

  /**
   * 系统定位模块，HBuilderX 4.61 以下版本名为 uni-getLocation
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/get-location.html>
   *
   * @since Android HBuilderX 3.91, iOS HBuilderX 4.11
   */
  'uni-location'?: AppModulesUniLocation

  /**
   * 地图模块
   *
   * @since Android HBuilderX 4.31, iOS HBuilderX 4.31
   */
  'uni-map'?: AppModulesUniMap

  /**
   * 获取网络类型模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/get-network-type.html>
   */
  'uni-getNetworkType'?: Record<string, any>

  /**
   * 安装 apk 模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/install-apk.html>
   */
  'uni-installApk'?: Record<string, any>

  /**
   * 内置音频模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html#createinneraudiocontext>
   */
  'uni-createInnerAudioContext'?: Record<string, any>

  /**
   * 使用地图选择位置模块，依赖 uni-location（HBuilderX 4.61 之前为 uni-getLocation）和 uni-cloud-client
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html>
   *
   * @since HBuilderX 4.33+
   */
  'uni-chooseLocation'?: Record<string, any>

  /**
   * 相机组件扫码模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#modulesscan>
   */
  'uni-barcode-scanning'?: Record<string, any>

  /**
   * 网络模块使用 Cronet，支持 Quic/h3 协议
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#modulesnetwork>
   */
  'uni-network-cronet'?: Record<string, any>

  /**
   * 请求支付模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html>
   *
   * @since Android HBuilderX 4.02, iOS HBuilderX 4.18
   */
  'uni-payment'?: AppModulesUniPayment

  /**
   * 获取服务供应商模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/provider.html>
   */
  'uni-getProvider'?: Record<string, any>

  /**
   * 三方登录模块（HBuilderX 5.08+），需配置使用的登录服务供应商
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-oauth>
   */
  'uni-oauth'?: AppModulesUniOauth

  /**
   * 三方分享模块（HBuilderX 5.08+），需配置使用的分享服务供应商
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-share>
   */
  'uni-share'?: AppModulesUniShare

  /**
   * 使用系统分享模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/share-with-system.html>
   *
   * @since HBuilderX 4.33+
   */
  'uni-shareWithSystem'?: Record<string, any>

  /**
   * 统一推送模块，可分别配置各厂商的离线推送 SDK
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#modulespush>
   */
  'uni-push'?: AppModulesUniPush

  /**
   * 多媒体模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html>
   */
  'uni-media'?: Record<string, any>

  /**
   * 网络请求（文件上传/下载）模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/network-summarize.html>
   */
  'uni-network'?: Record<string, any>

  /**
   * 虚拟支付模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/virtual-payment.html>
   */
  'uni-virtualPayment'?: Record<string, any>

  /**
   * video 视频组件模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/component/video.html>
   */
  'uni-video'?: Record<string, any>

  /**
   * WebSocket 模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/websocket.html>
   */
  'uni-websocket'?: Record<string, any>

  /**
   * 一键登录模块
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html>
   */
  'uni-verify'?: Record<string, any>

  /**
   * 包含 ICU 的 V8 引擎
   *
   * 仅蒸汽模式的 Android 平台生效。云端打包默认禁用 ICU（编译参数 `v8_enable_i18n_support = false`），
   * 配置此节点后可使用依赖 ICU 的国际化 API，其余影响详见
   * <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#js引擎>
   *
   * @since HBuilderX 5.33+
   */
  'v8-icu'?: Record<string, any>

  [x: string]: any
}

/**
 * uni-app-x uni-oauth（三方登录）模块配置
 */
export interface AppModulesUniOauth {
  /** 微信登录 */
  weixin?: {
    /** 微信开放平台申请的应用 ID（AppID） */
    appid?: string

    /** 通用链接（Universal Link），配置方式参考 <https://uniapp.dcloud.net.cn/tutorial/app-ios-capabilities.html#通用链接-universal-link-配置教程> */
    universalLink?: string

    [x: string]: any
  }

  /** Apple 登录，仅 iOS 平台支持 */
  apple?: Record<string, any>

  [x: string]: any
}

/**
 * uni-app-x uni-share（三方分享）模块配置
 */
export interface AppModulesUniShare {
  /** 微信分享 */
  weixin?: {
    /** 微信开放平台申请的应用 ID（AppID） */
    appid?: string

    /** 通用链接（Universal Link），配置方式参考 <https://uniapp.dcloud.net.cn/tutorial/app-ios-capabilities.html#通用链接-universal-link-配置教程> */
    universalLink?: string

    [x: string]: any
  }

  [x: string]: any
}

/**
 * uni-app-x uni-push（统一推送）模块配置
 */
export interface AppModulesUniPush {
  /** 华为厂商推送 SDK */
  hms?: Record<string, any>

  /** OPPO 厂商推送 SDK */
  oppo?: Record<string, any>

  /** VIVO 厂商推送 SDK */
  vivo?: Record<string, any>

  /** 小米厂商推送 SDK */
  xiaomi?: Record<string, any>

  /** 魅族厂商推送 SDK */
  meizu?: Record<string, any>

  /** 荣耀厂商推送 SDK */
  honor?: Record<string, any>

  /** Google FCM 推送 SDK */
  fcm?: Record<string, any>

  [x: string]: any
}

/**
 * uni-app-x uni-ad 广告联盟配置
 *
 * 添加对应节点后，云端打包会将对应广告平台的 SDK 打包到安装包中
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#配置三方广告sdk>
 */
export interface AppModulesUniAd {
  /** 腾讯优量汇广告联盟 */
  'gdt'?: Record<string, any>

  /** 穿山甲 GroMore */
  'gm'?: Record<string, any>

  /** 穿山甲内容联盟（短剧/信息流），配置后方可使用短剧广告，仅 Android 平台支持（HBuilderX 5.31+） */
  'gm-content'?: Record<string, any>

  /** 快手广告联盟 */
  'ks'?: Record<string, any>

  /** 百度百青藤广告联盟 */
  'bd'?: Record<string, any>

  /** Sigmob 广告联盟（配置项列表中记为 sgm） */
  'sigmob'?: Record<string, any>

  /** Sigmob 广告联盟（示例代码中记为 sigmob） */
  'sgm'?: Record<string, any>

  /** 华为鲸鸿动能，仅 Android 平台支持 */
  'hw'?: Record<string, any>

  /** AdScope 倍孜广告，仅 Android 平台支持 */
  'bz'?: Record<string, any>

  /** Octopus 章鱼移动广告 */
  'zy'?: Record<string, any>

  /** 泛连广告，仅 Android 平台支持 */
  'fl'?: Record<string, any>

  /** 旺脉广告（HBuilderX 5.11+） */
  'wa'?: Record<string, any>

  /** 佳投广告（HBuilderX 5.11+），仅 Android 平台支持 */
  'jt'?: Record<string, any>

  /** 美数广告（HBuilderX 5.25+） */
  'ms'?: Record<string, any>

  /** Google AdMob */
  'gg'?: Record<string, any>

  /** Pangle（海外穿山甲） */
  'pg'?: Record<string, any>

  /** inMobi */
  'inmobi'?: Record<string, any>

  /** ironSource */
  'ironsource'?: Record<string, any>

  /** Liftoff */
  'liftoff'?: Record<string, any>

  /** Meta Audience Network */
  'meta'?: Record<string, any>

  /** Mintegral */
  'mintegral'?: Record<string, any>

  /** Unity Ads */
  'unity'?: Record<string, any>

  /** AppLovin（HBuilderX 4.81+） */
  'applovin'?: Record<string, any>

  [x: string]: any
}

/**
 * uni-app-x uni-location（定位）模块 Provider 配置
 */
export interface AppModulesUniLocation {
  /** 系统定位 */
  system?: Record<string, any>

  /** 腾讯定位 */
  tencent?: {
    /** 腾讯位置服务后台申请的 Key */
    key?: string

    [x: string]: any
  }

  [x: string]: any
}

/**
 * uni-app-x uni-map（地图）模块 Provider 配置
 */
export interface AppModulesUniMap {
  /** 腾讯地图 */
  tencent?: {
    /** 腾讯位置服务后台申请的 Key */
    key?: string

    [x: string]: any
  }

  [x: string]: any
}

/**
 * uni-app-x uni-payment wxpay 配置
 */
export interface AppModulesUniPaymentWxpay {
  /** Android 平台微信支付配置信息 */
  android?: Record<string, any>

  /** iOS 平台微信支付配置信息 */
  ios?: {
    /** 微信开放平台申请的应用 ID（AppID） */
    appid?: string

    /** 通用链接（Universal Link），配置方式参考 <https://uniapp.dcloud.net.cn/tutorial/app-ios-capabilities.html#通用链接-universal-link-配置教程> */
    universalLink?: string

    [x: string]: any
  }

  [x: string]: any
}

/**
 * uni-app-x uni-payment（支付）模块 Provider 配置
 */
export interface AppModulesUniPayment {
  /** 支付宝支付 */
  alipay?: Record<string, any>

  /** 微信支付 */
  wxpay?: AppModulesUniPaymentWxpay

  [x: string]: any
}

/**
 * uni-app-x App 平台发布配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#app-distribute>
 */
export interface AppDistribute {
  /**
   * 是否为自定义调试基座
   *
   * @default false
   */
  syncDebug?: boolean

  /**
   * Android、iOS 平台应用图标配置，云端打包后生效
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-icons>
   */
  icons?: AppIcons

  /**
   * Android、iOS 平台应用启动界面配置，云端打包后生效
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-splashscreens>
   */
  splashScreens?: AppSplashScreens

  /**
   * App-Android 平台发布配置
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-android>
   */
  android?: AppDistributeAndroid

  /**
   * iOS 平台发布配置
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-ios>
   */
  ios?: AppDistributeIos

  /**
   * app 内置模块配置
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-modules>
   */
  modules?: AppModules

  [x: string]: any
}

/**
 * uni-app-x App 平台（原生 App）配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#manifest-app>
 */
export interface App {
  /**
   * 应用默认主题，可取值 light/dark/auto
   *
   * @default "light"
   */
  defaultAppTheme?: 'auto' | 'light' | 'dark'

  /** App 平台发布配置 */
  distribute?: AppDistribute

  /**
   * 启动界面关闭时机配置，HBuilderX 4.71 以下版本配置于 app 节点
   *
   * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#splashscreenclose>
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
