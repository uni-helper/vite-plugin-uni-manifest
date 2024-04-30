import type { PlatformUniStatistics } from './uniStatistics'

export interface MpAlipay {
  /** 使用到的插件，详见 <https://opendocs.alipay.com/mini/plugin/plugin-usage> */
  plugins?: Record<string, Record<string, any>>

  /**
   * 旧版项目配置，是否启用 component2 编译，详见 <https://opendocs.alipay.com/mini/framework/custom-component-overview>
   *
   * @default true
   */
  component2?: boolean

  /**
   * 旧版项目配置，是否启用小程序基础库 2.0 构建，详见 <https://opendocs.alipay.com/mini/framework/project>
   *
   * @default true
   */
  enableAppxNg?: boolean

  /**
   * 旧版项目配置，是否开启 axml 严格语法检查
   *
   * @default false
   */
  axmlStrictCheck?: boolean

  /**
   * 旧版项目配置，是否启用多进程编译
   *
   * @default false
   */
  enableParallelLoader?: boolean

  /**
   * 旧版项目配置，是否压缩编译产物，仅在真机预览/真机调试时生效
   *
   * @default false
   */
  enableDistFileMinify?: boolean

  /**
   * 旧版项目配置，初始化小程序时，是否隐藏默认 loading 动画
   *
   * @default true
   */
  nonLoadingIndicator?: boolean

  /** 旧版项目配置，打包时需要包含的文件/文件夹，遵循 Glob 语法，详见 <https://opendocs.alipay.com/mini/framework/project#include%20%E6%89%93%E5%8C%85%E7%99%BD%E5%90%8D%E5%8D%95> */
  include?: string[]

  /** 旧版项目配置，打包时需要忽略的文件/文件夹，遵循 Glob 语法，详见 <https://opendocs.alipay.com/mini/framework/project#exclude%20%E6%89%93%E5%8C%85%E9%BB%91%E5%90%8D%E5%8D%95> */
  exclude?: string[]

  /**
   * 旧版项目配置， appx 2.0 特性，对 node_modules 中的模块做 babel 编译
   *
   * @default false
   */
  enableNodeModuleBabelTransform?: boolean

  /**
   * 自定义预处理脚本，详见 <https://opendocs.alipay.com/mini/framework/project#%E9%A2%84%E5%A4%84%E7%90%86%E8%84%9A%E6%9C%AC>
   */
  scripts?: Record<'watch' | 'beforeCompile' | 'beforePreview' | 'beforeUpload', string>

  /** 是否使用新版项目配置 */
  format?: 2

  /** 新版项目配置，编译相关的配置 */
  compileOptions?: {
    /**
     * 自定义组件是否开启新的生命周期运行模型，详见 <https://opendocs.alipay.com/mini/framework/component-lifecycle>
     *
     * 如果在 app.json 中开启了 plugins 或 useDynamicPlugins 则会强制开启 component2 运行模式
     *
     * @default false
     */
    component2?: boolean

    /**
     * 小程序是否启用 typescript 支持，详见 <https://opendocs.alipay.com/mini/02zko2>
     *
     * @default false
     */
    typescript?: boolean

    /**
     * 小程序是否启用 less 支持，详见 <https://opendocs.alipay.com/mini/02zko2>
     *
     * @default false
     */
    less?: boolean

    /**
     * 是否在生产构建时进行 tree shaking 优化
     *
     * @default false
     */
    treeShaking?: boolean

    /**
     * IDE 3.7.5 开始支持路径别名配置, 详见 <https://opendocs.alipay.com/mini/03dbc3#resolveAlias>
     */
    resolveAlias?: Record<string, string>

    /**
     * 小程序全局对象（global/globalThis）访问策略, 详见 <https://opendocs.alipay.com/mini/03dbc3#globalObjectMode>
     *
     * "legacy" 禁止访问全局对象
     *
     * "enable" 可访问到真实的小程序 JavaScript 全局对象  global 与 globalThis
     *
     * "fake" 可访问到一个全局挂载的虚拟空对象
     */
    globalObjectMode?: 'legacy' | 'enable' | 'fake'

    /** 小程序代码转 ES5 配置（新），详见 <https://opendocs.alipay.com/mini/03dbc3#transpile> */
    transpile?: {
      /** 小程序代码转 ES5 配置 */
      script?: {
        /** 通过 glob 规则跳过某些文件/目录的转译 */
        ignore?: string[]

        [x: string]: any
      }

      [x: string]: any
    }

    [x: string]: any
  }

  /**
   * 新版项目配置，用户本地代码上传时需要忽略的文件
   *
   * 字段接受一个字符串数组，支持 glob 语法，底层使用 minimatch 3.0.4 版本进行匹配
   */
  uploadExclude?: string[]

  /**
   * 新版项目配置，用户构建后需要打包至产物中的资产
   *
   * 字段接受一个字符串数组，支持 glob 语法，底层使用 minimatch 3.0.4 版本进行匹配
   */
  assetsInclude?: string[]

  /**
   * 新版项目配置，本地开发的相关配置，详见 <https://opendocs.alipay.com/mini/03dbc3#developOptions>
   */
  developOptions?: {
    /**
     * 是否开启产物热更新，配置后开启模拟器热更新，支持 AXML、ACSS、JS 文件中的 method
     *
     * @default false
     */
    hotReload?: boolean

    /**
     * 是否开启多进程构建
     *
     * @default true
     */
    parallel?: boolean

    /**
     * IDE 3.8.1 开始支持，是否开启生成 sourcemap
     *
     * @default true
     */
    sourcemap?: boolean

    /**
     * IDE 3.8.1 开始支持，是否开启代码压缩
     *
     * @default true
     */
    minify?: boolean

    /**
     * IDE 3.8.8 开始支持，是否跳过 ES5 转译, 以加快开发时构建速度
     *
     * @default false
     */
    skipTranspile?: boolean

    /**
     * IDE 3.8.8 开始支持，是否按需编译页面, 以加快开发时构建速度
     *
     * 必须在 app.json 中同时开启 lazyCodeLoading
     *
     * @default false
     */
    lazyCompile?: boolean

    [x: string]: any
  }

  /**
   * 新版项目配置，插件联调选项，详见 <https://opendocs.alipay.com/mini/03dbc3#pluginResolution>
   */
  pluginResolution?: {
    /**
     * 是否启用调试配置
     *
     * @default false
     */
    enable?: boolean

    /** 指定插件联调的静态插件版本 */
    plugins?: {
      [x: string]: {
        /** 插件联调版本信息 */
        version: string

        [x: string]: any
      }
    }

    /** 指定插件联调的动态插件版本 */
    dynamicPlugins?: {
      [x: string]: {
        /** 插件联调版本信息 */
        version: string

        [x: string]: any
      }
    }

    [x: string]: any
  }

  /** uni 统计配置项 */
  uniStatistics?: PlatformUniStatistics

  /**
   * Vue2 作用域插槽编译模式
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

  /** 是否开启代码按需执行 */
  lazyCodeLoading?: 'requiredComponents'

  /**
   * 组件样式隔离方式，uni-app 3.99+ 开始支持，详见 <https://opendocs.alipay.com/mini/framework/page-acss>
   *
   * @default "apply-shared"
   */
  styleIsolation?: 'apply-shared' | 'shared'

  [x: string]: any
}
