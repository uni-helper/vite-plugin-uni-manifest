/**
 * 存在 uni-app-x 节点则表示为 uni-app x 项目，uni-app x 独有配置
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#manifest-uni-app-x>
 */
export interface UniAppX {
  /**
   * uvue 页面默认 flex 排列方向
   *
   * @default "column"
   */
  'flex-direction'?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

  /**
   * 是否启用蒸汽模式
   *
   * @default false
   */
  'vapor'?: boolean

  /**
   * 样式隔离策略
   *
   * @default "2"
   */
  'styleIsolationVersion'?: '2'

  /**
   * 视图层编译目标
   *
   * @default "bytecode"
   */
  'vapor-render-target'?: 'bytecode' | 'nativecode'

  [x: string]: any
}
