import type { PlatformUniStatistics } from './uniStatistics'

export interface MpToutiao {
  /** 字节跳动小程序的 appid */
  appid?: string

  /** 字节跳动小程序小程序项目设置 */
  setting?: {
    /** 是否启用 ES6 转 ES5 */
    es6?: boolean

    /** 是否校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书 */
    urlCheck?: boolean

    /** 修改文件的时候是否自动编译 */
    autoCompile?: boolean

    /** 下次编译是否模拟更新 */
    mockUpdate?: boolean

    /** 是否启动自定义处理命令 */
    scripts?: boolean

    /** 是否开启宿主登录模拟 */
    mockLogin?: boolean

    /** 上传代码时样式是否自动补全 */
    postcss?: boolean

    /** 上传代码时是否自动压缩脚本文件 */
    minified?: boolean

    [x: string]: any
  }

  /** 需要跳转的字节跳动小程序列表 */
  navigateToMiniProgramAppIdList?: string[]

  /** 优化配置 */
  optimization?: {
    /** 是否开启分包优化 */
    subPackages?: boolean

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
