import type { PlatformUniStatistics } from './uniStatistics'

export interface H5 {
  /**
   * 页面标题，默认使用顶层 name 字段
   */
  title?: string

  /**
   * 相对于应用根目录的 index.html 模板路径，可定制生成的 html 代码，详见 <https://uniapp.dcloud.net.cn/collocation/manifest#h5-template>
   *
   * Vue3 暂不支持
   */
  template?: string

  /** 路由设置，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#h5-router> */
  router?: {
    /**
     * 路由跳转模式
     *
     * @default "hash"
     */
    mode?: 'hash' | 'history'

    /**
     * 应用基础路径
     *
     * @default "/"
     */
    base?: string

    [x: string]: any
  }

  /** 加载相关设置，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#h5-async> */
  async?: {
    /**
     * 页面 JavaScript 加载时使用的组件，需注册为全局组件
     *
     * @default "AsyncLoading"
     */
    loading?: string

    /**
     * 页面 JavaScript 加载失败时使用的组件，需注册为全局组件
     *
     * @default "AsyncError"
     */
    error?: string

    /**
     * 显示加载中组件的延时时间，如果在延时内加载完成，则不会显示加载中组件，单位为 ms
     *
     * @default 200
     */
    delay?: number

    /**
     * 加载超时时间，如果超时，则显示加载失败组件，单位为 ms
     *
     * @default 60000
     */
    timeout?: number

    [x: string]: any
  }

  /**
   * 开发环境 server 设置，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#devserver>
   */
  devServer?: {
    /**
     * 是否启用 HTTPS 协议
     *
     * @default false
     */
    https?: boolean

    /**
     * 开发服务端口
     *
     * @default Vue2 8080, Vue3 3000
     */
    port?: number

    /**
     * 是否禁用 host 检查
     *
     * @default false
     */
    disableHostCheck?: boolean

    [x: string]: any
  }

  /** 引用资源的地址前缀，仅 Vue2 发布时生效，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#publicpath> */
  publicPath?: string

  /** SDK 配置 */
  sdkConfigs?: {
    /** 地图服务商 SDK 配置，使用地图以及位置（IP 定位及坐标转换）需要配置此项 */
    maps?: {
      /** 腾讯地图 */
      qqmap?: {
        /** https://lbs.qq.com/dev/console/key/manage */
        key?: string

        [x: string]: any
      }

      /** 谷歌地图，HBuilderX 3.2.10+ */
      google?: {
        /** https://developers.google.com/maps/documentation/javascript/get-api-key */
        key?: string

        [x: string]: any
      }

      /** 高德地图，HBuilderX 3.6.0+ */
      amap?: {
        /** https://console.amap.com/dev/key/app */
        key?: string

        /** https://console.amap.com/dev/key/app */
        securityJsCode?: string

        /** https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare */
        serviceHost?: string

        [x: string]: any
      }

      /** 百度地图，HBuilderX 3.99+ */
      bmap?: {
        /** http://lbsyun.baidu.com/apiconsole/key#/home */
        key?: string

        [x: string]: any
      }

      [x: string]: any
    }

    [x: string]: any
  }

  /** 打包优化配置，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#optimization> */
  optimization?: {
    /**
     * 资源预获取
     *
     * @default false
     */
    prefetch?: boolean

    /**
     * 资源预加载
     *
     * @default false
     */
    preload?: boolean

    /** 摇树优化，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#treeshaking> */
    treeShaking?: {
      /**
       * 是否开启摇树优化
       *
       * @default false
       */
      enable?: boolean

      [x: string]: any
    }

    [x: string]: any
  }

  /** uni 统计配置项 */
  uniStatistics?: PlatformUniStatistics

  [x: string]: any
}
