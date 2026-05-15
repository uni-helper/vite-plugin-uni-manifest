import type { PlatformUniStatistics } from './uni-statistics'

export interface MpQq {
  /** QQ 小程序的 appid */
  appid?: string

  /** 项目名称 */
  projectname?: string

  /**
   * 需要在后台使用的能力，详见 <https://q.qq.com/wiki/develop/miniprogram/frame/dispose.html#requiredbackgroundmodes>
   *
   * "audio" 后台音乐播放
   */
  requiredBackgroundModes?: ('audio')[]

  /** 需要跳转的 QQ 小程序列表，详见 <https://q.qq.com/wiki/develop/miniprogram/frame/dispose.html#navigatetominiprogramappidlist> */
  navigateToMiniProgramAppIdList?: string[]

  /** 接口权限设置，详见 <https://q.qq.com/wiki/develop/miniprogram/frame/dispose.html#permission> */
  permission?: Record<'scope.userLocation', {
    /** 小程序获取权限时展示的接口用途说明 */
    desc: string
  }>

  /** Worker 代码目录，详见 <https://q.qq.com/wiki/develop/miniprogram/frame/dispose.html#workers> */
  workers?: string

  /** 需要打开群资料卡的群号列表，详见 <https://q.qq.com/wiki/develop/miniprogram/frame/dispose.html#groupidlist> */
  groupIdList?: string[]

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

  /** QQ 小程序平台的原生组件 */
  nativeTags?: string[]

  [x: string]: any
}
