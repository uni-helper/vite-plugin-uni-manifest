import type { PlatformUniStatistics } from './uniStatistics'

export interface MpLark {
  /** 飞书小程序的 appid */
  appid?: string

  /** 飞书小程序小程序项目设置 */
  setting?: {
    /**
     * 是否启用 ES6 转 ES5
     *
     * @default true
     */
    es6?: boolean

    /**
     * 上传代码时是否自动压缩
     *
     * @default true
     */
    minified?: boolean

    /** 上传代码时样式是否自动补全 */
    postcss?: boolean

    /** 是否校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书 */
    urlCheck?: boolean

    /** Babel 的配置项 */
    babelSetting?: {
      /** 需要跳过 Babel 编译（包括代码压缩）处理的文件或目录 */
      ignore?: string[]
    }

    [x: string]: any
  }

  /** uni 统计配置项 */
  uniStatistics?: PlatformUniStatistics

  /**
   * Vue2 作用域插槽编译模式，uni-app 3.1.19+ 开始支持
   *
   * @default "auto"
   */
  scopedSlotsCompiler?: 'auto' | 'legacy' | 'augmented'

  /** 模拟单个作用域插槽渲染为多个实例，此配置仅限 Vue2 环境 3.7.12+，Vue3 环境已默认支持 */
  slotMultipleInstance?: boolean

  [x: string]: any
}
