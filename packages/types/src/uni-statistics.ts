export interface UniStatistics {
  /**
   * 是否开启 uni 统计
   *
   * @default false
   */
  enable?: boolean

  /**
   * uni 统计版本
   *
   * @default "1"
   */
  version?: '1' | '2'

  /**
   * 是否开启统计调试模式
   *
   * 开启后会产生大量日志，在开发阶段上报数据，应用发布请关闭此项
   *
   * @default false
   */
  debug?: boolean

  /**
   * 前端数据上报周期
   *
   * @desc HBuilderX 3.5.4+ 支持
   *
   * @default 10
   */
  reportInterval?: number

  /**
   * 采集项配置
   *
   * @desc HBuilderX 3.5.5+ 支持
   */
  collectItems?: {
    /**
     * 是否开启推送 `PushClientID` 的采集
     *
     * @default false
     */
    uniPushClientID?: boolean

    /**
     * 是否开启页面数据采集
     *
     * @default true
     */
    uniStatPageLog?: boolean

    [x: string]: any
  }
}

export interface PlatformUniStatistics {
  /**
   * 是否开启 uni 统计
   *
   * @default false
   */
  enable?: boolean
}
