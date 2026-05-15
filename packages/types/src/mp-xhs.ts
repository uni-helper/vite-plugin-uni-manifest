import type { PlatformUniStatistics } from './uni-statistics'

export interface MpXhs {
  /** 小红书小程序的 appid */
  appid?: string

  /** 项目名称 */
  projectname?: string

  /** 项目描述 */
  description?: string

  /** 项目的编译模式 */
  compileType?: string

  /** 基础库版本 */
  libVersion?: string

  /** 启用条件编译 */
  condition?: Record<string, any>

  /** 项目设置，详见 <https://miniapp.xiaohongshu.com/doc/DC977105#anchorId-setting> */
  setting?: Record<string, any>

  /** 打包配置选项 */
  packOptions?: Record<string, any>

  /** 优化配置 */
  optimization?: {
    /** 是否开启分包优化 */
    subPackages?: boolean

    [x: string]: any
  }

  /** uni 统计配置项 */
  uniStatistics?: PlatformUniStatistics

  /** 小红书小程序平台的原生组件 */
  nativeTags?: string[]

  [x: string]: any
}
