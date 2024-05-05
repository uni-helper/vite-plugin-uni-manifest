import type { PlatformUniStatistics } from './uniStatistics'

export interface MpKuaishou {
  /** 快手小程序的 appid */
  appid?: string

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
