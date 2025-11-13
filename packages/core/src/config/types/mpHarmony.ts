/**
 * HarmonyOS 元服务签名配置
 */
export interface MpHarmonySigningConfig {
  /**
   * 私钥库文件
   *
   */
  storeFile?: string

  /**
   * 私钥库访问密码
   *
   * 用于访问密钥库的加密密码
   */
  storePassword?: string

  /**
   * 私钥库里面的私钥别名
   *
   * 用于标识密钥的别名，如 debugKey
   */
  keyAlias?: string

  /**
   * 私钥访问密码
   *
   * 用于访问私钥的加密密码
   */
  keyPassword?: string

  /**
   * 签名算法
   *
   * 签名算法，固定为 "SHA256withECDSA"
   */
  signAlg?: string

  /**
   * 证书文件
   *
   * 指向 .cer 证书文件的路径
   */
  certpath?: string

  /**
   * 签名描述文件
   *
   */
  profile?: string
}

/**
 * HarmonyOS 元服务分发配置
 */
export interface MpHarmonyDistribute {
  /**
   * 元服务包名
   *
   * 固定格式为 com.atomicservice.[纯数字 appId]
   */
  bundleName?: string

  /**
   * 证书签名配置
   *
   * 用于配置鸿蒙打包时使用的数字签名证书信息，可分别配置调试证书和发布证书两组信息
   */
  signingConfigs?: {
    /**
     * 调试证书配置
     */
    default?: MpHarmonySigningConfig

    /**
     * 发布证书配置
     */
    release?: MpHarmonySigningConfig

    /**
     * 其他签名配置
     */
    [configName: string]: MpHarmonySigningConfig | undefined
  }

  /**
   * 鸿蒙元服务平台的原生组件
   *
   * 支持版本：4.81+
   */
  nativeTags?: string[]
}

/**
 * HarmonyOS 元服务配置
 *
 * 鸿蒙元服务项目设置，目前只支持一个 distribute 属性
 */
export interface MpHarmony {
  /**
   * HarmonyOS 元服务分发配置
   *
   * 包含元服务包名、签名配置、原生组件等分发相关的设置
   */
  distribute?: MpHarmonyDistribute

  /**
   * 其他扩展配置
   *
   * 支持其他 HarmonyOS 元服务平台特有的配置项
   */
  [key: string]: any
}