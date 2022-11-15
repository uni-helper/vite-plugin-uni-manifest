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
  [x: string]: any;
  name: string;
  appid: string;
  description: string;
  locale: string;
  versionName: string;
  versionCode: string;
  transformPx: boolean;
  networkTimeout: NetworkTimeout;
  debug: boolean;
  uniStatistics: any;
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
