export interface NetworkTimeout {
  request?: number;
  connectSocket?: number;
  uploadFile?: number;
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

export interface UserManifestConfig extends Partial<ManifestConfig> {}
