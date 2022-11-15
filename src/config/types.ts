import { PartialDeep } from "type-fest";

export interface NetworkTimeout {
  /**
   * uni.request 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  request?: number;
  /**
   * uni.connectSocket 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  connectSocket?: number;
  /**
   * uni.uploadFile 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  uploadFile?: number;
  /**
   * uni.downloadFile 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  downloadFile?: number;
}

export interface UniStatistics {
  /**
   * 是否开启 uni 统计
   * 默认为 false
   */
  enable: boolean;
  /**
   * uni 统计版本
   * 默认为 1
   */
  version: "1" | "2";
  /**
   * 是否开启统计调试模式
   * 生产阶段务必关闭
   * 默认为 false
   */
  debug: boolean;
  /**
   * 前端数据上报周期
   * 默认为 10
   */
  reportInterval: number;
  /** 采集项配置 */
  collectItems: {
    /**
     * 是否开启推送 PushClientID 的采集
     * 默认为 false
     */
    uniPushClientID: boolean;
  };
}

export interface SimpleUniStatistics extends Pick<UniStatistics, "enable"> {}

export interface AppPlus {
  /** 编译器兼容性配置 */
  compatible: {
    /** 是否忽略运行环境与编译环境不一致的问题 */
    ignoreVersion: boolean;
    /**
     * 运行环境版本号
     * 可以使用英文逗号分割
     */
    runtimeVersion: string;
    /** 编译环境版本号 */
    compilerVersion: string;
  };
  /** 启动界面信息 */
  splashscreen: {
    /**
     * 是否等待首页渲染完毕后再关闭启动界面
     * 默认为 true
     */
    alwaysShowBeforeRender: boolean;
    /**
     * 是否自动关闭启动界面
     * 默认为 true
     */
    autoClose: boolean;
    /**
     * 是否在程序启动界面显示加载
     * 默认为 true
     */
    waiting: boolean;
    /** 是否使用原生提示框 */
    useOriginalMsgbox: boolean;
  };
  /** 重力感应、横竖屏配置 */
  screenOrientation: (
    | "portrait-primary"
    | "portrait-secondary"
    | "landscape-primary"
    | "landscape-secondary"
  )[];
  // TODO: better types
  /** APP 权限模块 */
  modules: Record<string, any>;
  /** APP 发布信息 */
  distribute: {
    // TODO: better types
    /** Android 专用配置 */
    android: Record<string, any>;
    // TODO: better types
    /** iOS 专用配置 */
    ios: Record<string, any>;
    // TODO: better types
    /**
     * SDK 配置
     * 仅打包生效
     */
    sdkConfigs: Record<string, any>;
  };
  /**
   * nvue 编译模式
   * 默认为 weex
   * 建议使用 uni-app
   */
  nvueCompiler: "weex" | "uni-app";
  /**
   * nvue 样式编译模式
   * 默认为 weex
   * 建议使用 uni-app
   */
  nvueStyleCompiler: "weex" | "uni-app";
  /** 运行框架 */
  renderer: "native";
  /**
   * nvue 首页启动模式
   * 默认为 normal
   */
  nvueLaunchMode: "normal" | "fast";
  /** nvue 页面布局初始配置 */
  nvue: {
    /**
     * flex 项目的排列方向
     * 默认为 column
     */
    "flex-direction": "row" | "row-reverse" | "column" | "column-reverse";
  };
  /** uni 统计配置项 */
  uniStatistics: SimpleUniStatistics;
  /** 优化配置 */
  optimization: {
    /**
     * 是否开启分包配置
     * 为 true 时必须设置 app-plus.runmode 为 liberate
     */
    subPackages: boolean;
  };
  /**
   * 运行模式
   * 分包时必须设置 liberate
   */
  runmode: "normal" | "liberate";
  /**
   * 系统 webview 低于指定版本时，会弹出提示，或者下载 x5 内核后继续启动
   * Android 支持
   */
  webView: {
    /**
     * 最小 webview 版本
     * 当低于最小版本要求时，显示弹框提示，点击确定退出应用
     */
    minUserAgentVersion: string;
    /**
     * x5 内核配置
     * 启用 Android X5 Webview 模块后生效
     */
    x5: {
      /**
       * 超时时间
       * 默认为 3000
       */
      timeOut: number;
      /**
       * 是否在非 WiFi 网络环境时弹框询问用户是否确认下载 X5 内核
       * 默认为 false，即不弹框询问
       */
      showTipsWithoutWifi: boolean;
      /**
       * 是否允许用户在非 WiFi 网络时直接下载 X5 内核
       * 默认为 false，此时 showTipsWithoutWifi 为 true 时弹框询问用户，showTipsWithoutWifi 为 false 时不下载
       * true 时不弹框询问用户
       */
      allowDownloadWithoutWiFi: boolean;
    };
  };
  [x: string]: any;
}

export interface H5 {
  /**
   * 页面标题
   * 默认使用顶层 name 字段
   */
  title: string;
  /** 相对于应用根目录的 index.html 模板路径 */
  template: string;
  /** 路由设置 */
  router: {
    /**
     * 路由跳转模式
     * 默认为 hash
     */
    mode: "hash" | "history";
    /**
     * 应用基础路径
     * 默认为 /
     */
    base: string;
  };
  /** 加载相关设置 */
  async: {
    /**
     * 页面 JavaScript 加载时使用的组件，需注册为全局组件
     * 默认为 AsyncLoading
     */
    loading: string;
    /**
     * 页面 JavaScript 加载失败时使用的组件，需注册为全局组件
     * 默认为 AsyncError
     */
    error: string;
    /**
     * 显示加载中组件的延时时间，如果在延时内加载完成，则不会显示加载中组件
     * 单位为 ms
     * 默认为 200
     *
     */
    delay: number;
    /**
     * 加载超时时间，如果超时，则显示加载失败组件
     * 单位为 ms
     * 默认为 60000
     */
    timeout: number;
  };
  /**
   * dev server 设置
   */
  devServer: {
    /**
     * 是否启用 HTTPS 协议
     * 默认为 false
     */
    https: boolean;
    /**
     * 是否禁用 host 检查
     * 默认为 false
     */
    disableHostCheck: boolean;
  };
  /** 引用资源的地址前缀，仅发布时生效 */
  publicPath: string;
  // TODO better types
  /** SDK 配置  */
  sdkConfigs: Record<string, any>;
  /** 优化配置 */
  optimization: {
    /**
     * 资源预获取
     * 默认为 false
     */
    prefetch: boolean;
    /**
     * 资源预加载
     * 默认为 false
     */
    preload: boolean;
    /** 摇树优化 */
    treeShaking: {
      /**
       * 是否开启摇树优化
       * 默认为 false
       */
      enable: boolean;
    };
  };
  /** uni 统计配置项 */
  uniStatistics: SimpleUniStatistics;
}

export interface QuickappWebview {
  /** 应用图标，推荐尺寸 192x192 */
  icon: string;
  /** 应用包名 */
  package: string;
  /** 最小平台支持，快应用联盟最低 1063，快应用华为最低 1070 */
  minPlatformVersion: number;
  /** 版本名称 */
  versionName: string;
  /** 版本号 */
  versionCode: number;
}

export interface QuickappWebviewUnion {
  /** 最小平台支持，最低 1063 */
  minPlatformVersion: number;
}

export interface QuickappWebviewHuawei {
  /** 最小平台支持，最低 1070 */
  minPlatformVersion: number;
}

export interface MpWeixin {
  /** 微信小程序的 appid */
  appid: string;
  /**
   * 微信小程序项目设置
   * 更多信息查看 <https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html>
   */
  setting: {
    /** 是否启用 ES6 转 ES5 */
    es6: boolean;
    /** 是否使用增强编译 */
    enhance: boolean;
    /** 上传代码时样式是否自动补全  */
    postcss: boolean;
    /** 上传代码时是否自动压缩脚本文件 */
    minified: boolean;
    /** 上传代码时是否自动压缩样式文件 */
    minifyWXSS: boolean;
    /** 上传代码时是否自动压缩 WXML 文件 */
    minifyWXML: boolean;
    /** 上传时是否代码保护 */
    uglifyFileName: boolean;
    /** 上传时是否过滤无依赖文件 */
    ignoreUploadUnusedFiles: boolean;
    /** 是否自动运行体验评分 */
    autoAudits: boolean;
    /** 是否检查安全域名和 TLS 版本 */
    urlCheck: boolean;
    /** 是否启用代码自动热重载 */
    compileHotReLoad: boolean;
    /** 是否启用数据预拉取 */
    preloadBackgroundData: boolean;
    /** 是否启用懒注入占位组件调试 */
    lazyloadPlaceholderEnable: boolean;
    /** 小游戏项目有效，是否开启静态资源服务器 */
    useStaticServer: boolean;
    /** 预览及真机调试的时主包、分包体积上限是否调整为小程序 4M、小游戏 8M */
    bigPackageSizeSupport: boolean;
    /** 增强编译 Babel 的配置项 */
    babelSetting: {
      /**
       * Babel 辅助函数的输出目录
       * 默认为 @babel/runtime
       */
      outputPath: string;
      /** 需要跳过 Babel 编译（包括代码压缩）处理的文件或目录 */
      ignore: string[];
    };
    /** 编译插件配置 */
    useCompilerPlugins: false | string[];
    /** 将 JS 编译成 ES5 时，是否禁用严格模式 */
    disableUseStrict: boolean;
    /**
     * 上传时是否带上 sourcemap
     * 默认为 true
     */
    uploadWithSourceMap: boolean;
    /** 在小游戏插件项目中，是否启用 以本地目录为插件资源来源 特性 */
    localPlugins: boolean;
    /** 是否手动配置构建 npm 的路径 */
    packNpmManually: boolean;
    /** 仅 packNpmManually 为 true 时生效 */
    packNpmRelationList: {
      /** node_modules 源对应的 package.json */
      packageJsonPath: string;
      /** node_modules 的构建结果目标位置 */
      miniprogramNpmDistDir: string;
    }[];
    /** 是否使用工具渲染 CoverView */
    coverView: boolean;
    /**
     * 预览、真机调试和本地模拟器等开发阶段是否过滤无依赖文件
     * 默认为 true
     */
    ignoreDevUnusedFiles: boolean;
    /** 是否检查键名 */
    checkInvalidKey: boolean;
    /** 是否开启调试器 WXML 面板展示 shadow-root */
    showShadowRootInWxmlPanel: boolean;
    /** 是否开启小程序独立域调试特性 */
    useIsolateContext: boolean;
    /**
     * 是否开启模拟器预先载入小程序的某些资源
     * 设置为 false 时会导致 useIsolateContext 失效
     */
    useMultiFrameRuntime: boolean;
    /** 是否启用 API Hook 功能 */
    useApiHook: boolean;
    /** 是否在额外的进程处理一些小程序 API */
    useApiHostProcess: boolean;
    /** 小游戏有效，是否开启局域网调试服务器 */
    useLanDebug: boolean;
    /** 是否在游戏引擎项目中开启支持引用 node 原生模块的底层加速特性 */
    enableEngineNative: boolean;
    /** 是否在本地设置中展示传统的 ES6 转 ES5 开关（对应 es6），增强编译开关 （对应 enhance） */
    showES6CompileOption: boolean;
    /** 是否检查 SiteMap 索引 */
    checkSiteMap: boolean;
  };
  /**
   * 是否启用插件功能页
   * 默认为 false
   */
  functionalPages: boolean;
  /** 需要在后台使用的能力 */
  requiredBackgroundModes: ("audio" | "location")[];
  // TODO better types
  /** 使用到的插件 */
  plugins: Record<string, any>;
  /**
   * 是否支持 iPad 上屏幕旋转
   * 默认为 false
   */
  resizable: boolean;
  /** 需要跳转的微信小程序列表 */
  navigateToMiniProgramAppIdList: string[];
  // TODO better types
  /** 接口权限设置 */
  permission: Record<string, any>;
  /** Worker 代码目录 */
  workers: string;
  /** 优化配置 */
  optimization: {
    /** 是否开启分包优化 */
    subPackages: boolean;
  };
  /** 云开发代码目录 */
  cloudfunctionRoot: string;
  /** uni 统计配置项 */
  uniStatistics: SimpleUniStatistics;
  /**
   * Vue2 作用域插槽编译模式
   * 默认为 auto
   */
  scopedSlotsCompiler: "auto" | "legacy" | "augmented";
  /**
   * 是否合并组件虚拟节点外层属性
   * 目前仅支持 style、class 属性
   */
  mergeVirtualHostAttributes: boolean;
  /** 要半屏跳转的小程序 appid */
  embeddedAppIdList: string[];
  /** 地理位置相关接口 */
  requiredPrivateInfos: string[];
  /** 目前仅支持值 requiredComponents，代表开启小程序按需注入特性 */
  lazyCodeLoading: "requiredComponents";
}

export interface MpAlipay {
  // TODO better types
  /** 使用到的插件 */
  plugins: Record<string, any>;
  /**
   * 是否启用 component2 编译
   * 默认为 true
   */
  component2: boolean;
  /**
   * 是否启用小程序基础库 2.0 构建
   * 默认为 true
   */
  enableAppxNg: boolean;
  /**
   * 是否开启 axml 严格语法检查
   * 默认为 false
   */
  axmlStrictCheck: boolean;
  /**
   * 是否启用多进程编译
   * 默认为 false
   */
  enableParallelLoader: boolean;
  /**
   * 是否压缩编译产物，仅在真机预览/真机调试时生效
   * 默认为 false
   */
  enableDistFileMinify: boolean;
  /** uni 统计配置项 */
  uniStatistics: SimpleUniStatistics;
  /**
   * Vue2 作用域插槽编译模式
   * 默认为 auto
   */
  scopedSlotsCompiler: "auto" | "legacy" | "augmented";
  /**
   * 是否合并组件虚拟节点外层属性
   * 目前仅支持 style、class 属性
   */
  mergeVirtualHostAttributes: boolean;
  /** 目前仅支持值 requiredComponents，代表开启小程序按需注入特性 */
  lazyCodeLoading: "requiredComponents";
}

export interface MpBaidu {
  /** 百度小程序的 appid */
  appid: string;
  /** 需要在后台使用的能力 */
  requiredBackgroundModes: "audio"[];
  /** 预请求的所有 url 的列表 */
  prefetches: string[];
  /** 优化配置 */
  optimization: {
    /** 是否开启分包优化 */
    subPackages: boolean;
  };
  /** uni 统计配置项 */
  uniStatistics: SimpleUniStatistics;
  /**
   * Vue2 作用域插槽编译模式
   * 默认为 auto
   */
  scopedSlotsCompiler: "auto" | "legacy" | "augmented";
}

export interface MpToutiao {
  /** 字节跳动小程序的 appid */
  appid: string;
  /** 字节跳动小程序小程序项目设置 */
  setting: {
    /** 是否启用 ES6 转 ES5 */
    es6: boolean;
    /** 上传代码时样式是否自动补全 */
    postcss: boolean;
    /** 上传代码时是否自动压缩脚本文件 */
    minified: boolean;
    /** 是否检查安全域名和 TLS 版本 */
    urlCheck: boolean;
    /** 修改文件的时候是否自动编译 */
    autoCompile: boolean;
    /** 下次编译是否模拟更新 */
    mockUpdate: boolean;
    /** 是否启动自定义处理命令 */
    scripts: boolean;
    /** 是否开启宿主登录模拟 */
    mockLogin: boolean;
  };
  /** 需要跳转的字节跳动小程序列表 */
  navigateToMiniProgramAppIdList: string[];
  /** 优化配置 */
  optimization: {
    /** 是否开启分包优化 */
    subPackages: boolean;
  };
  /** uni 统计配置项 */
  uniStatistics: SimpleUniStatistics;
  /**
   * Vue2 作用域插槽编译模式
   * 默认为 auto
   */
  scopedSlotsCompiler: "auto" | "legacy" | "augmented";
}

export interface ManifestConfig {
  /** 应用名称，安装 APP 后显示的名称 */
  name: string;
  /**
   * 应用标识，由 DCloud 云端分配
   * 更多信息查看 <https://ask.dcloud.net.cn/article/35907>
   */
  appid: string;
  /** 应用描述 */
  description: string;
  /**
   * 当前默认语言
   * 默认为 auto
   */
  locale: string;
  /** 版本名称，在云打包和生成 wgt 资源时使用 */
  versionName: string;
  /** 版本号 */
  versionCode: string;
  /**
   * 是否转换 px 为 rpx
   * 默认为 true
   * 建议使用 false
   */
  transformPx: boolean;
  /** 网络超时时间 */
  networkTimeout: NetworkTimeout;
  /**
   * 是否开启 debug 模式
   * 默认为 false
   */
  debug: boolean;
  /**
   * uni 统计配置
   * 更多信息查看 <https://uniapp.dcloud.net.cn/uni-stat-v1.html> 和 <https://uniapp.dcloud.net.cn/uni-stat-v2.html>
   */
  uniStatistics: UniStatistics;
  /** APP 特有配置 */
  "app-plus": AppPlus;
  /** H5 特有配置 */
  h5: H5;
  /** 快应用特有配置 */
  "quickapp-webview": QuickappWebview;
  /** 快应用联盟特有配置 */
  "quickapp-webview-union": QuickappWebviewUnion;
  /** 快应用华为特有配置 */
  "quickapp-webview-huawei": QuickappWebviewHuawei;
  /** 微信小程序特有配置 */
  "mp-weixin": MpWeixin;
  /** 支付宝小程序特有配置 */
  "mp-alipay": MpAlipay;
  /** 百度小程序特有配置 */
  "mp-baidu": MpBaidu;
  /** 字节跳动小程序特有配置 */
  "mp-toutiao": MpToutiao;
  "mp-lark": any;
  "mp-qq": any;
  "mp-kuaishou": any;
  [x: string]: any;
}

export interface UserManifestConfig extends PartialDeep<ManifestConfig> {}
