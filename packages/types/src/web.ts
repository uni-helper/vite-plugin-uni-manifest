/**
 * Web 平台配置（uni-app x）
 *
 * 详见 <https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#web>
 */
export interface Web {
  /** 页面标题，默认为应用名称 */
  title?: string

  /** 可定制生成的 HTML 代码，参考 <https://uniapp.dcloud.net.cn/collocation/manifest.html#h5-template> */
  template?: string

  /** 路由配置 */
  router?: {
    /** 路由跳转模式，hash、history 二选一 */
    mode?: 'hash' | 'history'

    /** 应用基础路径，如设为 ./，则代表相对路径，支持 file 协议打开，此时路由模式强制为 hash 模式 */
    base?: string

    [x: string]: any
  }

  /** 开发环境 server 配置 */
  devServer?: {
    /** 开发服务端口 */
    port?: number

    /** 是否启用 HTTPS 协议 */
    https?: boolean

    [x: string]: any
  }

  /** 打包优化配置 */
  optimization?: {
    /** 摇树优化 */
    treeShaking?: {
      /** 是否开启摇树优化 */
      enable?: boolean

      [x: string]: any
    }

    [x: string]: any
  }

  /** uni-push 配置 */
  unipush?: {
    /** 是否启用 uni-push */
    enable?: boolean

    [x: string]: any
  }

  /** SDK 配置 */
  sdkConfigs?: {
    /** 定位和地图（只能选一个） */
    maps?: {
      /** 腾讯地图，旧配置项为 qqmap */
      tencent?: {
        /** 腾讯地图密钥，申请地址 <https://lbs.qq.com/dev/console/key/manage> */
        key?: string

        [x: string]: any
      }

      /** 谷歌地图 */
      google?: {
        /** 谷歌地图密钥，申请地址 <https://developers.google.com/maps/documentation/javascript/get-api-key> */
        key?: string

        [x: string]: any
      }

      /** 高德地图 */
      amap?: {
        /** 高德地图密钥，申请地址 <https://console.amap.com/dev/key/app> */
        key?: string

        /** 高德地图安全密钥，申请地址 <https://console.amap.com/dev/key/app> */
        securityJsCode?: string

        /** 高德地图安全密钥代理服务器地址，参考 <https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare> */
        serviceHost?: string

        [x: string]: any
      }

      [x: string]: any
    }

    [x: string]: any
  }

  /** 是否开启暗黑模式，详见 <https://doc.dcloud.net.cn/uni-app-x/api/theme-change.html> */
  darkmode?: boolean

  [x: string]: any
}
