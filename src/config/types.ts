import { PartialDeep } from "type-fest";

export interface NetworkTimeout {
  /**
   * uni.request 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  request?: number;
  /**
   * uni.connectSocket 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  connectSocket?: number;
  /**
   * uni.uploadFile 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  uploadFile?: number;
  /**
   * uni.downloadFile 超时时间
   * 单位为 ms
   * 默认为 60000
   */
  downloadFile?: number;
}

export interface UniStatistics {
  /**
   * 是否开启 uni 统计
   * 默认为 false
   */
  enable: boolean;
  /**
   * uni 统计版本
   * 默认为 1
   */
  version: "1" | "2";
  /**
   * 是否开启统计调试模式
   * 生产阶段务必关闭
   * 默认为 false
   */
  debug: boolean;
  /**
   * 前端数据上报周期
   * 默认为 10
   */
  reportInterval: number;
  /** 采集项配置 */
  collectItems: {
    /**
     * 是否开启推送 PushClientID 的采集
     * 默认为 false
     */
    uniPushClientID: boolean;
  };
}

export interface SimpleUniStatistics extends Pick<UniStatistics, "enable"> {}

export interface AppPlus {
  splashscreen?: any;
  screenOrientation?: any;
  modules?: any;
  distribute?: any;
  nvueCompiler?: any;
  nvueStyleCompiler?: any;
  renderer?: any;
  nvueLaunchMode?: any;
  nvue?: any;
  optimization?: any;
  uniStatistics?: any;
  webView?: any;
  [x: string]: any;
}

export interface ManifestConfig {
  /** 应用名称，安装 APP 后显示的名称 */
  name: string;
  /**
   * 应用标识，由 DCloud 云端分配
   * 更多信息查看 <https://ask.dcloud.net.cn/article/35907>
   */
  appid: string;
  /** 应用描述 */
  description: string;
  /**
   * 当前默认语言
   * 默认为 auto
   */
  locale: string;
  /** 版本名称，在云打包和生成 wgt 资源时使用 */
  versionName: string;
  /** 版本号 */
  versionCode: string;
  /**
   * 是否转换 px 为 rpx
   * 默认为 true
   * 建议使用 false
   */
  transformPx: boolean;
  /** 网络超时时间 */
  networkTimeout: NetworkTimeout;
  /**
   * 是否开启 debug 模式
   * 默认为 false
   */
  debug: boolean;
  /**
   * uni 统计配置
   * 更多信息查看 <https://uniapp.dcloud.net.cn/uni-stat-v1.html> 和 <https://uniapp.dcloud.net.cn/uni-stat-v2.html>
   */
  uniStatistics: UniStatistics;
  "app-plus": AppPlus;
  h5: any;
  quickapp: any;
  "mp-weixin": any;
  "mp-alipay": any;
  "mp-baidu": any;
  "mp-toutiao": any;
  "mp-lark": any;
  "mp-qq": any;
  "mp-kuaishou": any;
}

export interface UserManifestConfig extends PartialDeep<ManifestConfig> {}
