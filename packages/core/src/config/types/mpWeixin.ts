import type { PlatformUniStatistics } from './uniStatistics'

export interface MpWeixin {
  /** 微信小程序的 appid */
  appid?: string

  /**
   * 微信小程序项目设置，详见 <https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html#setting>
   */
  setting?: {
    /** 是否启用条件编译，详见 <https://dev.weixin.qq.com/docs/framework/dev/framework/operation/condition-compile.html> */
    condition?: boolean

    /**
     * 是否启用 ES6 转 ES5
     *
     * `es6` 和 `enhance` 需同时为 true/false，对应于 `将 JS 编译成 ES5`
     */
    es6?: boolean

    /**
     * 是否使用增强编译
     *
     * `es6` 和 `enhance` 需同时为 true/false，对应于 `将 JS 编译成 ES5`
     */
    enhance?: boolean

    /**
     * 是否使用增强编译，详见 <https://developers.weixin.qq.com/community/develop/doc/0002ce07a58000a57c5da5e6456c09>
     */
    es7?: boolean

    /** 上传代码时样式是否自动补全  */
    postcss?: boolean

    /** 上传代码时是否自动压缩脚本文件 */
    minified?: boolean

    /** 上传代码时是否自动压缩样式文件 */
    minifyWXSS?: boolean

    /** 上传代码时是否自动压缩 WXML 文件 */
    minifyWXML?: boolean

    /**
     * 开启 swc 编译模式
     *
     * @default false
     */
    swc?: boolean

    /** 上传时是否代码保护 */
    uglifyFileName?: boolean

    /** 上传时是否过滤无依赖文件 */
    ignoreUploadUnusedFiles?: boolean

    /** 是否自动运行体验评分 */
    autoAudits?: boolean

    /** 是否检查安全域名和 TLS 版本 */
    urlCheck?: boolean

    /** 是否启用代码自动热重载 */
    compileHotReLoad?: boolean

    /** 是否启用数据预拉取 */
    preloadBackgroundData?: boolean

    /** 是否启用懒注入占位组件调试 */
    lazyloadPlaceholderEnable?: boolean

    /** 小游戏项目有效，是否开启静态资源服务器 */
    useStaticServer?: boolean

    /**
     * 预览及真机调试的时主包、分包体积上限是否调整为小程序 4M、小游戏 8M
     *
     * @default true
     */
    bigPackageSizeSupport?: boolean

    /** 是否开启 skyline 渲染调试 */
    skylineRenderEnable?: boolean

    /** 增强编译 Babel 的配置项 */
    babelSetting?: {
      /**
       * Babel 辅助函数的输出目录
       *
       * @default "@babel/runtime"
       */
      outputPath?: string

      /** 需要跳过 Babel 编译（包括代码压缩）处理的文件或目录 */
      ignore?: string[]

      [x: string]: any
    }

    /** 编译插件配置 */
    useCompilerPlugins?: false | ('typescript' | 'less' | 'sass')[]

    /** 将 JS 编译成 ES5 时，是否禁用严格模式 */
    disableUseStrict?: boolean

    /**
     * 上传时是否带上 sourcemap
     *
     * @default true
     */
    uploadWithSourceMap?: boolean

    /** 在小游戏插件项目中，是否启用“以本地目录为插件资源来源”特性 */
    localPlugins?: boolean

    /** 是否手动配置构建 npm 的路径 */
    packNpmManually?: boolean

    /** 仅 packNpmManually 为 true 时生效，详见 <https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html> */
    packNpmRelationList?: {
      /** node_modules 源对应的 package.json */
      packageJsonPath?: string

      /** node_modules 的构建结果目标位置 */
      miniprogramNpmDistDir?: string

      [x: string]: any
    }[]

    /** 是否使用工具渲染 CoverView */
    coverView?: boolean

    /**
     * 预览、真机调试和本地模拟器等开发阶段是否过滤无依赖文件
     *
     * @default true
     */
    ignoreDevUnusedFiles?: boolean

    /** 是否展示 JSON 文件校验错误信息 */
    checkInvalidKey?: boolean

    /** 是否开启调试器 WXML 面板展示 shadow-root */
    showShadowRootInWxmlPanel?: boolean

    /** 是否开启小程序独立域调试特性 */
    useIsolateContext?: boolean

    /**
     * 是否开启模拟器预先载入小程序的某些资源，设置为 false 时会导致 useIsolateContext 失效
     */
    useMultiFrameRuntime?: boolean

    /** 是否启用 API Hook 功能 */
    useApiHook?: boolean

    /** 是否在额外的进程处理一些小程序 API */
    useApiHostProcess?: boolean

    /** 小游戏有效，是否开启局域网调试服务器 */
    useLanDebug?: boolean

    /** 是否在游戏引擎项目中开启支持引用 node 原生模块的底层加速特性 */
    enableEngineNative?: boolean

    /** 是否在本地设置中展示传统的 ES6 转 ES5 开关（对应 es6），增强编译开关（对应 enhance） */
    showES6CompileOption?: boolean

    /** 是否检查 SiteMap 索引 */
    checkSiteMap?: boolean
  }

  /** 基础库版本， */
  libVersion?: string

  /**
   * 是否启用插件功能页
   *
   * @default false
   */
  functionalPages?: boolean

  /**
   * 需要在后台使用的能力，详见 <https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#requiredBackgroundModes>
   *
   * "audio" 后台音乐播放
   *
   * "location" 后台定位
   */
  requiredBackgroundModes?: ('audio' | 'location')[]

  /** 使用到的插件 */
  plugins?: Record<string, Record<string, any>>

  /**
   * 在 iPad 上小程序是否支持屏幕旋转
   *
   * @default false
   */
  resizable?: boolean

  /** 需要跳转的微信小程序列表，详见 <https://developers.weixin.qq.com/minigame/dev/reference/configuration/app.html#navigateToMiniProgramAppIdList> */
  navigateToMiniProgramAppIdList?: string[]

  /** 接口权限设置，详见 <https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission> */
  permission?: Partial<
    Record<
      'scope.userLocation' | 'scope.userLocationBackground' | 'scope.userFuzzyLocation',
      {
        /** 小程序获取权限时展示的接口用途说明 */
        desc: string
      }
    >
  >

  /** Worker 代码目录，详见 <https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html> */
  workers?: string | {
    path: string

    /** 是否打包为分包 */
    isSubpackage?: boolean

    [x: string]: any
  }

  /** 优化配置 */
  optimization?: {
    /** 是否开启分包优化 */
    subPackages?: boolean

    [x: string]: any
  }

  /** 云开发代码目录，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#cloudfunctionroot> */
  cloudfunctionRoot?: string

  /** uni 统计配置项 */
  uniStatistics?: PlatformUniStatistics

  /**
   * Vue2 作用域插槽编译模式，uni-app 3.1.19+ 开始支持
   *
   * @default "auto"
   */
  scopedSlotsCompiler?: 'auto' | 'legacy' | 'augmented'

  /**
   * 是否合并组件虚拟节点外层属性，uni-app 3.5.1+ 开始支持
   *
   * 目前仅支持 style、class 属性
   */
  mergeVirtualHostAttributes?: boolean

  /** 模拟单个作用域插槽渲染为多个实例，此配置仅限 Vue2 环境 3.7.12+，Vue3 环境已默认支持 */
  slotMultipleInstance?: boolean

  /** 要半屏跳转的小程序 appid，详见 <https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/openEmbeddedMiniProgram.html> */
  embeddedAppIdList?: string[]

  /** 地理位置相关接口，详见 <https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#requiredPrivateInfos> */
  requiredPrivateInfos?: ('getFuzzyLocation' | 'getLocation' | 'onLocationChange' | 'startLocationUpdate' | 'startLocationUpdateBackground' | 'chooseLocation' | 'choosePoi' | 'chooseAddress')[]

  /** 目前仅支持值 "requiredComponents"，代表开启小程序按需注入特性，详见 <https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#lazyCodeLoading> */
  lazyCodeLoading?: 'requiredComponents'

  [x: string]: any
}
