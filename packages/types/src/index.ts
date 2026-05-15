import type { AppHarmony } from './app-harmony'
import type { AppPlus } from './app-plus'
import type { H5 } from './h5'
import type { MpAlipay } from './mp-alipay'
import type { MpBaidu } from './mp-baidu'
import type { MpHarmony } from './mp-harmony'
import type { MpKuaishou } from './mp-kuaishou'
import type { MpLark } from './mp-lark'
import type { MpQq } from './mp-qq'
import type { MpToutiao } from './mp-toutiao'
import type { MpWeixin } from './mp-weixin'
import type { QuickappWebview, QuickappWebviewHuawei, QuickappWebviewUnion } from './quickapp-webview'
import type { UniStatistics } from './uni-statistics'

export * from './app-harmony'
export * from './app-plus'
export * from './common'
export * from './h5'
export * from './mp-alipay'
export * from './mp-baidu'
export * from './mp-harmony'
export * from './mp-kuaishou'
export * from './mp-lark'
export * from './mp-qq'
export * from './mp-toutiao'
export * from './mp-weixin'
export * from './quickapp-webview'
export * from './uni-statistics'

/**
 * 应用的配置文件，用于指定应用的名称、图标、权限等
 *
 * HBuilderX 创建的工程此文件在根目录，CLI 创建的工程此文件在 src 目录
 */
export interface ManifestConfig {
  /** 应用名称，安装 APP 后显示的名称 */
  'name': string

  /** 应用标识，由 DCloud 云端分配，详见 <https://ask.dcloud.net.cn/article/35907> */
  'appid': string

  /** 应用描述 */
  'description': string

  /**
   * 当前默认语言，详见 <https://uniapp.dcloud.net.cn/api/ui/locale.html>
   *
   * @default "auto"
   */
  'locale'?: string

  /** 版本名称，在云打包和生成 wgt 资源时使用 */
  'versionName': string

  /** 版本号 */
  'versionCode': string | number

  /**
   * 是否转换 px 为 rpx，仅部分平台支持，不推荐新项目启用此配置，建议设为 false
   *
   * @default true
   *
   * @deprecated
   */
  'transformPx'?: boolean

  /** 网络超时时间 */
  'networkTimeout'?: {
    /**
     * uni.request 超时时间，单位为 ms
     *
     * @default 60000
     */
    request?: number
    /**
     * uni.connectSocket 超时时间，单位为 ms
     *
     * @default 60000
     */
    connectSocket?: number
    /**
     * uni.uploadFile 超时时间，单位为 ms
     *
     * @default 60000
     */
    uploadFile?: number
    /**
     * uni.downloadFile 超时时间，单位为 ms
     *
     * @default 60000
     */
    downloadFile?: number

    [x: string]: any
  }

  /**
   * 是否开启 debug 模式，开启后调试信息以 `info` 的形式给出，其信息有页面注册、页面路由、数据更新、事件触发等
   *
   * @default false
   */
  'debug'?: boolean

  /**
   * uni 统计配置
   * 更多信息查看 <https://uniapp.dcloud.net.cn/uni-stat-v1.html> 和 <https://uniapp.dcloud.net.cn/uni-stat-v2.html>
   */
  'uniStatistics'?: UniStatistics

  /** APP 特有配置 */
  'app-plus'?: AppPlus

  /** HarmonyOS 应用配置 */
  'app-harmony'?: AppHarmony

  /** HarmonyOS 元服务配置 */
  'mp-harmony'?: MpHarmony

  /** H5 配置 */
  'h5'?: H5

  /** 快应用特有配置 */
  'quickapp-webview'?: QuickappWebview

  /** 快应用联盟特有配置 */
  'quickapp-webview-union'?: QuickappWebviewUnion

  /** 快应用华为特有配置 */
  'quickapp-webview-huawei'?: QuickappWebviewHuawei

  /** 微信小程序特有配置 */
  'mp-weixin'?: MpWeixin

  /** 支付宝小程序特有配置 */
  'mp-alipay'?: MpAlipay

  /** 百度小程序特有配置 */
  'mp-baidu'?: MpBaidu

  /** 字节跳动小程序特有配置 */
  'mp-toutiao'?: MpToutiao

  /** 飞书小程序特有配置 */
  'mp-lark'?: MpLark

  /** QQ 小程序特有配置 */
  'mp-qq'?: MpQq

  /** 快手小程序特有配置 */
  'mp-kuaishou'?: MpKuaishou

  [x: string]: any
}

export interface UserManifestConfig extends ManifestConfig {}
