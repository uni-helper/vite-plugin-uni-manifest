import type { PlatformUniStatistics } from './uni-statistics'

export interface MpBaidu {
  /** 百度小程序的 appid */
  appid?: string

  /** 项目名称 */
  projectname?: string

  /**
   * 需要在后台使用的能力
   *
   * "audio" 背景音频播放
   */
  requiredBackgroundModes?: ('audio')[]

  /** 预请求的所有 url 的列表，详见 <https://smartprogram.baidu.com/docs/develop/tutorial/process/#prefetches> */
  prefetches?: string[]

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

  /** 动态库，详见 <https://smartprogram.baidu.com/docs/develop/framework/dynamiclib_use/> */
  dynamicLib?: Record<string, Record<string, string>>

  /** 百度小程序平台的原生组件 */
  nativeTags?: string[]

  [x: string]: any
}
