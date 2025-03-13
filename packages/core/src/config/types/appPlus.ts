import type { HEXColor, PercentageSize, PNG, PxSize } from './common'
import type { PlatformUniStatistics } from './uniStatistics'

// https://developer.android.com/reference/android/Manifest.permission
export type AndroidPermissionName = 'android.permission.ACCEPT_HANDOVER' | 'android.permission.ACCESS_BACKGROUND_LOCATION' | 'android.permission.ACCESS_BLOBS_ACROSS_USERS' | 'android.permission.ACCESS_CHECKIN_PROPERTIES' | 'android.permission.ACCESS_COARSE_LOCATION' | 'android.permission.ACCESS_FINE_LOCATION' | 'android.permission.ACCESS_LOCATION_EXTRA_COMMANDS' | 'android.permission.ACCESS_MEDIA_LOCATION' | 'android.permission.ACCESS_NETWORK_STATE' | 'android.permission.ACCESS_NOTIFICATION_POLICY' | 'android.permission.ACCESS_WIFI_STATE' | 'android.permission.ACCOUNT_MANAGER' | 'android.permission.ACTIVITY_RECOGNITION' | 'android.permission.ADD_VOICEMAIL' | 'android.permission.ANSWER_PHONE_CALLS' | 'android.permission.BATTERY_STATS' | 'android.permission.BIND_ACCESSIBILITY_SERVICE' | 'android.permission.BIND_APPWIDGET' | 'android.permission.BIND_AUTOFILL_SERVICE' | 'android.permission.BIND_CALL_REDIRECTION_SERVICE' | 'android.permission.BIND_CARRIER_MESSAGING_CLIENT_SERVICE' | 'android.permission.BIND_CARRIER_MESSAGING_SERVICE' | 'android.permission.BIND_CARRIER_SERVICES' | 'android.permission.BIND_CHOOSER_TARGET_SERVICE' | 'android.permission.BIND_COMPANION_DEVICE_SERVICE' | 'android.permission.BIND_CONDITION_PROVIDER_SERVICE' | 'android.permission.BIND_CONTROLS' | 'android.permission.BIND_CREDENTIAL_PROVIDER_SERVICE' | 'android.permission.BIND_DEVICE_ADMIN' | 'android.permission.BIND_DREAM_SERVICE' | 'android.permission.BIND_INCALL_SERVICE' | 'android.permission.BIND_INPUT_METHOD' | 'android.permission.BIND_MIDI_DEVICE_SERVICE' | 'android.permission.BIND_NFC_SERVICE' | 'android.permission.BIND_NOTIFICATION_LISTENER_SERVICE' | 'android.permission.BIND_PRINT_SERVICE' | 'android.permission.BIND_QUICK_ACCESS_WALLET_SERVICE' | 'android.permission.BIND_QUICK_SETTINGS_TILE' | 'android.permission.BIND_REMOTEVIEWS' | 'android.permission.BIND_SCREENING_SERVICE' | 'android.permission.BIND_TELECOM_CONNECTION_SERVICE' | 'android.permission.BIND_TEXT_SERVICE' | 'android.permission.BIND_TV_INPUT' | 'android.permission.BIND_TV_INTERACTIVE_APP' | 'android.permission.BIND_VISUAL_VOICEMAIL_SERVICE' | 'android.permission.BIND_VOICE_INTERACTION' | 'android.permission.BIND_VPN_SERVICE' | 'android.permission.BIND_VR_LISTENER_SERVICE' | 'android.permission.BIND_WALLPAPER' | 'android.permission.BLUETOOTH' | 'android.permission.BLUETOOTH_ADMIN' | 'android.permission.BLUETOOTH_ADVERTISE' | 'android.permission.BLUETOOTH_CONNECT' | 'android.permission.BLUETOOTH_PRIVILEGED' | 'android.permission.BLUETOOTH_SCAN' | 'android.permission.BODY_SENSORS' | 'android.permission.BODY_SENSORS_BACKGROUND' | 'android.permission.BROADCAST_PACKAGE_REMOVED' | 'android.permission.BROADCAST_SMS' | 'android.permission.BROADCAST_STICKY' | 'android.permission.BROADCAST_WAP_PUSH' | 'android.permission.CALL_COMPANION_APP' | 'android.permission.CALL_PHONE' | 'android.permission.CALL_PRIVILEGED' | 'android.permission.CAMERA' | 'android.permission.CAPTURE_AUDIO_OUTPUT' | 'android.permission.CHANGE_COMPONENT_ENABLED_STATE' | 'android.permission.CHANGE_CONFIGURATION' | 'android.permission.CHANGE_NETWORK_STATE' | 'android.permission.CHANGE_WIFI_MULTICAST_STATE' | 'android.permission.CHANGE_WIFI_STATE' | 'android.permission.CLEAR_APP_CACHE' | 'android.permission.CONFIGURE_WIFI_DISPLAY' | 'android.permission.CONTROL_LOCATION_UPDATES' | 'android.permission.CREDENTIAL_MANAGER_QUERY_CANDIDATE_CREDENTIALS' | 'android.permission.CREDENTIAL_MANAGER_SET_ALLOWED_PROVIDERS' | 'android.permission.CREDENTIAL_MANAGER_SET_ORIGIN' | 'android.permission.DELETE_CACHE_FILES' | 'android.permission.DELETE_PACKAGES' | 'android.permission.DELIVER_COMPANION_MESSAGES' | 'android.permission.DETECT_SCREEN_CAPTURE' | 'android.permission.DETECT_SCREEN_RECORDING' | 'android.permission.DIAGNOSTIC' | 'android.permission.DISABLE_KEYGUARD' | 'android.permission.DUMP' | 'android.permission.ENFORCE_UPDATE_OWNERSHIP' | 'android.permission.EXECUTE_APP_ACTION' | 'android.permission.EXPAND_STATUS_BAR' | 'android.permission.FACTORY_TEST' | 'android.permission.FOREGROUND_SERVICE' | 'android.permission.FOREGROUND_SERVICE_CAMERA' | 'android.permission.FOREGROUND_SERVICE_CONNECTED_DEVICE' | 'android.permission.FOREGROUND_SERVICE_DATA_SYNC' | 'android.permission.FOREGROUND_SERVICE_HEALTH' | 'android.permission.FOREGROUND_SERVICE_LOCATION' | 'android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK' | 'android.permission.FOREGROUND_SERVICE_MEDIA_PROCESSING' | 'android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION' | 'android.permission.FOREGROUND_SERVICE_MICROPHONE' | 'android.permission.FOREGROUND_SERVICE_PHONE_CALL' | 'android.permission.FOREGROUND_SERVICE_REMOTE_MESSAGING' | 'android.permission.FOREGROUND_SERVICE_SPECIAL_USE' | 'android.permission.FOREGROUND_SERVICE_SYSTEM_EXEMPTED' | 'android.permission.GET_ACCOUNTS' | 'android.permission.GET_ACCOUNTS_PRIVILEGED' | 'android.permission.GET_PACKAGE_SIZE' | 'android.permission.GET_TASKS' | 'android.permission.GLOBAL_SEARCH' | 'android.permission.HIDE_OVERLAY_WINDOWS' | 'android.permission.HIGH_SAMPLING_RATE_SENSORS' | 'android.permission.INSTALL_LOCATION_PROVIDER' | 'android.permission.INSTALL_PACKAGES' | 'android.permission.INSTALL_SHORTCUT' | 'android.permission.INSTANT_APP_FOREGROUND_SERVICE' | 'android.permission.INTERACT_ACROSS_PROFILES' | 'android.permission.INTERNET' | 'android.permission.KILL_BACKGROUND_PROCESSES' | 'android.permission.LAUNCH_CAPTURE_CONTENT_ACTIVITY_FOR_NOTE' | 'android.permission.LAUNCH_MULTI_PANE_SETTINGS_DEEP_LINK' | 'android.permission.LOADER_USAGE_STATS' | 'android.permission.LOCATION_HARDWARE' | 'android.permission.MANAGE_DEVICE_LOCK_STATE' | 'android.permission.MANAGE_DEVICE_POLICY_ACCESSIBILITY' | 'android.permission.MANAGE_DEVICE_POLICY_ACCOUNT_MANAGEMENT' | 'android.permission.MANAGE_DEVICE_POLICY_ACROSS_USERS' | 'android.permission.MANAGE_DEVICE_POLICY_ACROSS_USERS_FULL' | 'android.permission.MANAGE_DEVICE_POLICY_ACROSS_USERS_SECURITY_CRITICAL' | 'android.permission.MANAGE_DEVICE_POLICY_AIRPLANE_MODE' | 'android.permission.MANAGE_DEVICE_POLICY_APPS_CONTROL' | 'android.permission.MANAGE_DEVICE_POLICY_APP_RESTRICTIONS' | 'android.permission.MANAGE_DEVICE_POLICY_APP_USER_DATA' | 'android.permission.MANAGE_DEVICE_POLICY_AUDIO_OUTPUT' | 'android.permission.MANAGE_DEVICE_POLICY_AUTOFILL' | 'android.permission.MANAGE_DEVICE_POLICY_BACKUP_SERVICE' | 'android.permission.MANAGE_DEVICE_POLICY_BLUETOOTH' | 'android.permission.MANAGE_DEVICE_POLICY_BUGREPORT' | 'android.permission.MANAGE_DEVICE_POLICY_CALLS' | 'android.permission.MANAGE_DEVICE_POLICY_CAMERA' | 'android.permission.MANAGE_DEVICE_POLICY_CERTIFICATES' | 'android.permission.MANAGE_DEVICE_POLICY_COMMON_CRITERIA_MODE' | 'android.permission.MANAGE_DEVICE_POLICY_CONTENT_PROTECTION' | 'android.permission.MANAGE_DEVICE_POLICY_DEBUGGING_FEATURES' | 'android.permission.MANAGE_DEVICE_POLICY_DEFAULT_SMS' | 'android.permission.MANAGE_DEVICE_POLICY_DEVICE_IDENTIFIERS' | 'android.permission.MANAGE_DEVICE_POLICY_DISPLAY' | 'android.permission.MANAGE_DEVICE_POLICY_FACTORY_RESET' | 'android.permission.MANAGE_DEVICE_POLICY_FUN' | 'android.permission.MANAGE_DEVICE_POLICY_INPUT_METHODS' | 'android.permission.MANAGE_DEVICE_POLICY_INSTALL_UNKNOWN_SOURCES' | 'android.permission.MANAGE_DEVICE_POLICY_KEEP_UNINSTALLED_PACKAGES' | 'android.permission.MANAGE_DEVICE_POLICY_KEYGUARD' | 'android.permission.MANAGE_DEVICE_POLICY_LOCALE' | 'android.permission.MANAGE_DEVICE_POLICY_LOCATION' | 'android.permission.MANAGE_DEVICE_POLICY_LOCK' | 'android.permission.MANAGE_DEVICE_POLICY_LOCK_CREDENTIALS' | 'android.permission.MANAGE_DEVICE_POLICY_LOCK_TASK' | 'android.permission.MANAGE_DEVICE_POLICY_METERED_DATA' | 'android.permission.MANAGE_DEVICE_POLICY_MICROPHONE' | 'android.permission.MANAGE_DEVICE_POLICY_MOBILE_NETWORK' | 'android.permission.MANAGE_DEVICE_POLICY_MODIFY_USERS' | 'android.permission.MANAGE_DEVICE_POLICY_MTE' | 'android.permission.MANAGE_DEVICE_POLICY_NEARBY_COMMUNICATION' | 'android.permission.MANAGE_DEVICE_POLICY_NETWORK_LOGGING' | 'android.permission.MANAGE_DEVICE_POLICY_ORGANIZATION_IDENTITY' | 'android.permission.MANAGE_DEVICE_POLICY_OVERRIDE_APN' | 'android.permission.MANAGE_DEVICE_POLICY_PACKAGE_STATE' | 'android.permission.MANAGE_DEVICE_POLICY_PHYSICAL_MEDIA' | 'android.permission.MANAGE_DEVICE_POLICY_PRINTING' | 'android.permission.MANAGE_DEVICE_POLICY_PRIVATE_DNS' | 'android.permission.MANAGE_DEVICE_POLICY_PROFILES' | 'android.permission.MANAGE_DEVICE_POLICY_PROFILE_INTERACTION' | 'android.permission.MANAGE_DEVICE_POLICY_PROXY' | 'android.permission.MANAGE_DEVICE_POLICY_QUERY_SYSTEM_UPDATES' | 'android.permission.MANAGE_DEVICE_POLICY_RESET_PASSWORD' | 'android.permission.MANAGE_DEVICE_POLICY_RESTRICT_PRIVATE_DNS' | 'android.permission.MANAGE_DEVICE_POLICY_RUNTIME_PERMISSIONS' | 'android.permission.MANAGE_DEVICE_POLICY_RUN_IN_BACKGROUND' | 'android.permission.MANAGE_DEVICE_POLICY_SAFE_BOOT' | 'android.permission.MANAGE_DEVICE_POLICY_SCREEN_CAPTURE' | 'android.permission.MANAGE_DEVICE_POLICY_SCREEN_CONTENT' | 'android.permission.MANAGE_DEVICE_POLICY_SECURITY_LOGGING' | 'android.permission.MANAGE_DEVICE_POLICY_SETTINGS' | 'android.permission.MANAGE_DEVICE_POLICY_SMS' | 'android.permission.MANAGE_DEVICE_POLICY_STATUS_BAR' | 'android.permission.MANAGE_DEVICE_POLICY_SUPPORT_MESSAGE' | 'android.permission.MANAGE_DEVICE_POLICY_SUSPEND_PERSONAL_APPS' | 'android.permission.MANAGE_DEVICE_POLICY_SYSTEM_APPS' | 'android.permission.MANAGE_DEVICE_POLICY_SYSTEM_DIALOGS' | 'android.permission.MANAGE_DEVICE_POLICY_SYSTEM_UPDATES' | 'android.permission.MANAGE_DEVICE_POLICY_TIME' | 'android.permission.MANAGE_DEVICE_POLICY_USB_DATA_SIGNALLING' | 'android.permission.MANAGE_DEVICE_POLICY_USB_FILE_TRANSFER' | 'android.permission.MANAGE_DEVICE_POLICY_USERS' | 'android.permission.MANAGE_DEVICE_POLICY_VPN' | 'android.permission.MANAGE_DEVICE_POLICY_WALLPAPER' | 'android.permission.MANAGE_DEVICE_POLICY_WIFI' | 'android.permission.MANAGE_DEVICE_POLICY_WINDOWS' | 'android.permission.MANAGE_DEVICE_POLICY_WIPE_DATA' | 'android.permission.MANAGE_DOCUMENTS' | 'android.permission.MANAGE_EXTERNAL_STORAGE' | 'android.permission.MANAGE_MEDIA' | 'android.permission.MANAGE_ONGOING_CALLS' | 'android.permission.MANAGE_OWN_CALLS' | 'android.permission.MANAGE_WIFI_INTERFACES' | 'android.permission.MANAGE_WIFI_NETWORK_SELECTION' | 'android.permission.MASTER_CLEAR' | 'android.permission.MEDIA_CONTENT_CONTROL' | 'android.permission.MEDIA_ROUTING_CONTROL' | 'android.permission.MODIFY_AUDIO_SETTINGS' | 'android.permission.MODIFY_PHONE_STATE' | 'android.permission.MOUNT_FORMAT_FILESYSTEMS' | 'android.permission.MOUNT_UNMOUNT_FILESYSTEMS' | 'android.permission.NEARBY_WIFI_DEVICES' | 'android.permission.NFC' | 'android.permission.NFC_PREFERRED_PAYMENT_INFO' | 'android.permission.NFC_TRANSACTION_EVENT' | 'android.permission.OVERRIDE_WIFI_CONFIG' | 'android.permission.PACKAGE_USAGE_STATS' | 'android.permission.PERSISTENT_ACTIVITY' | 'android.permission.POST_NOTIFICATIONS' | 'android.permission.PROCESS_OUTGOING_CALLS' | 'android.permission.PROVIDE_OWN_AUTOFILL_SUGGESTIONS' | 'android.permission.PROVIDE_REMOTE_CREDENTIALS' | 'android.permission.QUERY_ALL_PACKAGES' | 'android.permission.READ_ASSISTANT_APP_SEARCH_DATA' | 'android.permission.READ_BASIC_PHONE_STATE' | 'android.permission.READ_CALENDAR' | 'android.permission.READ_CALL_LOG' | 'android.permission.READ_CONTACTS' | 'android.permission.READ_EXTERNAL_STORAGE' | 'android.permission.READ_HOME_APP_SEARCH_DATA' | 'android.permission.READ_INPUT_STATE' | 'android.permission.READ_LOGS' | 'android.permission.READ_MEDIA_AUDIO' | 'android.permission.READ_MEDIA_IMAGES' | 'android.permission.READ_MEDIA_VIDEO' | 'android.permission.READ_MEDIA_VISUAL_USER_SELECTED' | 'android.permission.READ_NEARBY_STREAMING_POLICY' | 'android.permission.READ_PHONE_NUMBERS' | 'android.permission.READ_PHONE_STATE' | 'android.permission.READ_PRECISE_PHONE_STATE' | 'android.permission.READ_SMS' | 'android.permission.READ_SYNC_SETTINGS' | 'android.permission.READ_SYNC_STATS' | 'android.permission.READ_VOICEMAIL' | 'android.permission.REBOOT' | 'android.permission.RECEIVE_BOOT_COMPLETED' | 'android.permission.RECEIVE_MMS' | 'android.permission.RECEIVE_SMS' | 'android.permission.RECEIVE_WAP_PUSH' | 'android.permission.RECORD_AUDIO' | 'android.permission.REORDER_TASKS' | 'android.permission.REQUEST_COMPANION_PROFILE_APP_STREAMING' | 'android.permission.REQUEST_COMPANION_PROFILE_AUTOMOTIVE_PROJECTION' | 'android.permission.REQUEST_COMPANION_PROFILE_COMPUTER' | 'android.permission.REQUEST_COMPANION_PROFILE_GLASSES' | 'android.permission.REQUEST_COMPANION_PROFILE_NEARBY_DEVICE_STREAMING' | 'android.permission.REQUEST_COMPANION_PROFILE_WATCH' | 'android.permission.REQUEST_COMPANION_RUN_IN_BACKGROUND' | 'android.permission.REQUEST_COMPANION_SELF_MANAGED' | 'android.permission.REQUEST_COMPANION_START_FOREGROUND_SERVICES_FROM_BACKGROUND' | 'android.permission.REQUEST_COMPANION_USE_DATA_IN_BACKGROUND' | 'android.permission.REQUEST_DELETE_PACKAGES' | 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS' | 'android.permission.REQUEST_INSTALL_PACKAGES' | 'android.permission.REQUEST_OBSERVE_COMPANION_DEVICE_PRESENCE' | 'android.permission.REQUEST_PASSWORD_COMPLEXITY' | 'android.permission.RESTART_PACKAGES' | 'android.permission.RUN_BACKUP_JOBS' | 'android.permission.RUN_USER_INITIATED_JOBS' | 'android.permission.SCHEDULE_EXACT_ALARM' | 'android.permission.SEND_RESPOND_VIA_MESSAGE' | 'android.permission.SEND_SMS' | 'android.permission.SET_ALARM' | 'android.permission.SET_ALWAYS_FINISH' | 'android.permission.SET_ANIMATION_SCALE' | 'android.permission.SET_DEBUG_APP' | 'android.permission.SET_PREFERRED_APPLICATIONS' | 'android.permission.SET_PROCESS_LIMIT' | 'android.permission.SET_TIME' | 'android.permission.SET_TIME_ZONE' | 'android.permission.SET_WALLPAPER' | 'android.permission.SET_WALLPAPER_HINTS' | 'android.permission.SIGNAL_PERSISTENT_PROCESSES' | 'android.permission.SMS_FINANCIAL_TRANSACTIONS' | 'android.permission.START_FOREGROUND_SERVICES_FROM_BACKGROUND' | 'android.permission.START_VIEW_APP_FEATURES' | 'android.permission.START_VIEW_PERMISSION_USAGE' | 'android.permission.STATUS_BAR' | 'android.permission.SUBSCRIBE_TO_KEYGUARD_LOCKED_STATE' | 'android.permission.SYSTEM_ALERT_WINDOW' | 'android.permission.TRANSMIT_IR' | 'android.permission.TURN_SCREEN_ON' | 'android.permission.UNINSTALL_SHORTCUT' | 'android.permission.UPDATE_DEVICE_STATS' | 'android.permission.UPDATE_PACKAGES_WITHOUT_USER_ACTION' | 'android.permission.USE_BIOMETRIC' | 'android.permission.USE_EXACT_ALARM' | 'android.permission.USE_FINGERPRINT' | 'android.permission.USE_FULL_SCREEN_INTENT' | 'android.permission.USE_ICC_AUTH_WITH_DEVICE_IDENTIFIER' | 'android.permission.USE_SIP' | 'android.permission.UWB_RANGING' | 'android.permission.VIBRATE' | 'android.permission.WAKE_LOCK' | 'android.permission.WRITE_APN_SETTINGS' | 'android.permission.WRITE_CALENDAR' | 'android.permission.WRITE_CALL_LOG' | 'android.permission.WRITE_CONTACTS' | 'android.permission.WRITE_EXTERNAL_STORAGE' | 'android.permission.WRITE_GSERVICES' | 'android.permission.WRITE_SECURE_SETTINGS' | 'android.permission.WRITE_SETTINGS' | 'android.permission.WRITE_SYNC_SETTINGS' | 'android.permission.WRITE_VOICEMAIL' | 'com.asus.msa.SupplementaryDID.ACCESS' | 'com.huawei.android.launcher.permission.CHANGE_BADGE' | 'com.android.launcher.permission.INSTALL_SHORTCUT' | 'com.android.launcher.permission.UNINSTALL_SHORTCUT' | 'com.google.android.gms.permission.AD_ID' | 'android.permission.FLASHLIGHT'

// https://developer.android.com/guide/topics/manifest/uses-feature-element
export type AndroidFeatureName = 'android.hardware.audio.low_latency' | 'android.hardware.audio.output' | 'android.hardware.audio.pro' | 'android.hardware.microphone' | 'android.hardware.bluetooth' | 'android.hardware.bluetooth_le' | 'android.hardware.camera.any' | 'android.hardware.camera' | 'android.hardware.camera.front' | 'android.hardware.camera.external' | 'android.hardware.camera.autofocus' | 'android.hardware.camera.flash' | 'android.hardware.camera.capability.manual_post_processing' | 'android.hardware.camera.capability.manual_sensor' | 'android.hardware.camera.capability.raw' | 'android.hardware.camera.level.full' | 'android.hardware.type.automotive' | 'android.hardware.type.television' | 'android.hardware.type.watch' | 'android.hardware.type.pc' | 'android.hardware.fingerprint' | 'android.hardware.gamepad' | 'android.hardware.consumerir' | 'android.hardware.location' | 'android.hardware.location.gps' | 'android.hardware.location.network' | 'android.hardware.nfc' | 'android.hardware.nfc.hce' | 'android.hardware.opengles.aep' | 'android.hardware.sensor.accelerometer' | 'android.hardware.sensor.ambient_temperature' | 'android.hardware.sensor.barometer' | 'android.hardware.sensor.compass' | 'android.hardware.sensor.gyroscope' | 'android.hardware.sensor.hifi_sensors' | 'android.hardware.sensor.heartrate' | 'android.hardware.sensor.heartrate.ecg' | 'android.hardware.sensor.light' | 'android.hardware.sensor.proximity' | 'android.hardware.sensor.relative_humidity' | 'android.hardware.sensor.stepcounter' | 'android.hardware.sensor.stepdetector' | 'android.hardware.screen.landscape' | 'android.hardware.screen.portrait' | 'android.hardware.telephony' | 'android.hardware.telephony.cdma' | 'android.hardware.telephony.gsm' | 'android.hardware.faketouch' | 'android.hardware.faketouch.multitouch.distinct' | 'android.hardware.faketouch.multitouch.jazzhand' | 'android.hardware.touchscreen' | 'android.hardware.touchscreen.multitouch' | 'android.hardware.touchscreen.multitouch.distinct' | 'android.hardware.touchscreen.multitouch.jazzhand' | 'android.hardware.usb.accessory' | 'android.hardware.usb.host' | 'android.hardware.vulkan.compute' | 'android.hardware.vulkan.level' | 'android.hardware.vulkan.version' | 'android.hardware.wifi' | 'android.hardware.wifi.direct' | 'android.software.sip' | 'android.software.webview' | 'android.software.input_methods' | 'android.software.backup' | 'android.software.device_admin' | 'android.software.managed_users' | 'android.software.securely_removes_users' | 'android.software.verified_boot' | 'android.software.midi' | 'android.software.print' | 'android.software.leanback' | 'android.software.live_tv' | 'android.software.app_widgets' | 'android.software.home_screen' | 'android.software.live_wallpaper'

export type AndroidPermission =
  `<uses-permission android:name="${AndroidPermissionName}" />` |
  `<uses-permission android:name="${AndroidPermissionName}"/>` |
  `<uses-permission android:name="${AndroidPermissionName}" android:maxSdkVersion="${number}" />` |
  `<uses-permission android:name="${AndroidPermissionName}" android:maxSdkVersion="${number}"/>`

export type AndroidFeature =
  `<uses-feature android:name="${AndroidFeatureName}" />` |
  `<uses-feature android:name="${AndroidFeatureName}"/>` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="true" />` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="false" />` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="true"/>` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="false"/>` |
  `<uses-feature android:name="${AndroidFeatureName}" android:glEsVersion="${number}" />` |
  `<uses-feature android:name="${AndroidFeatureName}" android:glEsVersion="${number}"/>` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="true" android:glEsVersion="${number}" />` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="false" android:glEsVersion="${number}" />` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="true" android:glEsVersion="${number}"/>` |
  `<uses-feature android:name="${AndroidFeatureName}" android:required="false" android:glEsVersion="${number}"/>`

export type AndroidPermissionOrFeature = AndroidPermission | AndroidFeature

export interface AppPlus {
  /**
   * 编译器兼容性配置，详见 <https://ask.dcloud.net.cn/article/35627>
   */
  compatible?: {
    /**
     * 是否忽略运行环境与编译环境不一致的问题
     *
     * @default false
     */
    ignoreVersion?: boolean

    /**
     * 应用兼容的 uni-app 运行环境版本号，可以配置多个版本号，使用英文字符 `,` 分隔
     */
    runtimeVersion?: string

    /**
     * 编译环境版本号，通常配置为当前 HBuilderX 的版本号或 cli 编译器版本，不可以配置多个
     */
    compilerVersion?: string

    [x: string]: any
  }

  /**
   * 编译器版本，详见 <https://ask.dcloud.net.cn/article/36599>
   *
   * @default 2
   */
  compilerVersion?: 2 | 3

  /**
   * APP 启动界面信息，详见 <https://uniapp.dcloud.net.cn/tutorial/app-splashscreen.html>
   */
  splashscreen?: {
    /**
     * 是否等待首页渲染完毕后再关闭启动界面
     *
     * @default true
     */
    alwaysShowBeforeRender?: boolean

    /**
     * 是否自动关闭启动界面，仅当 alwaysShowBeforeRender 为 false 时生效
     *
     * 如需要手动关闭启动界面，需设置 alwaysShowBeforeRender 和 autoclose 为 false
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-splashscreen.html>
     *
     * @default true
     */
    autoclose?: boolean

    /**
     * 是否在程序启动界面显示等待圈或雪花
     *
     * @default true
     */
    waiting?: boolean

    /**
     * 不明属性
     *
     * @deprecated
     *
     * @default "loaded"
     */
    event?: 'titleUpdate' | 'rendering' | 'loaded'

    /**
     * 不明属性
     *
     * @deprecated
     *
     * @default "default"
     */
    target?: 'default' | 'second'

    /**
     * 延迟自动关闭启动时间，单位为 ms
     *
     * @deprecated
     */
    delay?: number

    /** 开屏广告配置  */
    ads?: {
      /**
       * 开屏广告背景颜色，支持 HEX 颜色
       *
       * @format color
       */
      background?: HEXColor

      /**
       * 底部图片地址，相对应用资源目录路径
       */
      image?: string

      [x: string]: any
    }

    /**
     * 使用“自定义启动图”启动界面时是否显示透明过渡界面，可解决点击桌面图标延时启动应用的效果
     *
     * @default false
     */
    androidTranslucent?: boolean

    [x: string]: any
  }

  /**
   * 重力感应、横竖屏配置
   *
   * "portrait-primary" 竖屏正方向
   *
   * "portrait-secondary" 竖屏反方向
   *
   * "landscape-primary" 横屏正方向
   *
   * "landscape-secondary" 横屏反方向
   */
  screenOrientation?: (
    | 'portrait-primary'
    | 'portrait-secondary'
    | 'landscape-primary'
    | 'landscape-secondary'
  )[]

  /**
   * APP 权限模块，仅云打包生效，本地打包需自行在原生工程中配置
   *
   * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-modules.html>
   */
  modules?: {
    /** 扫码 */
    'Barcode'?: Record<string, any>

    /** 低功耗蓝牙 */
    'Bluetooth'?: Record<string, any>

    /** 相机和相册 */
    'Camera'?: Record<string, any>

    /** 系统通讯录 */
    'Contacts'?: Record<string, any>

    /** 人脸识别，仅 iOS 支持 */
    'FaceId'?: Record<string, any>

    /** 实人认证 */
    'FacialRecognitionVerify'?: Record<string, any>

    /** 指纹识别 */
    'Fingerprint'?: Record<string, any>

    /**
     * 定位，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-geolocation.html>
     */
    'Geolocation'?: Record<string, any>

    'iBeacon'?: Record<string, any>

    /** 直播推流 */
    'LivePusher'?: Record<string, any>

    /**
     * 地图，只能选一个，部分国产 Android 手机获取位置必须申请定位服务商的SDK
     *
     * 依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-maps.html>
     */
    'Maps'?: Record<string, any>

    /** 短彩邮件消息 */
    'Messaging'?: Record<string, any>

    /**
     * 登录鉴权，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-oauth.html>
     */
    'OAuth'?: Record<string, any>

    /**
     * 支付，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-payment.html>
     */
    'Payment'?: Record<string, any>

    /**
     * 消息推送
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-push.html> 和 <https://uniapp.dcloud.net.cn/tutorial/app-push-unipush.html>
     */
    'Push'?: Record<string, any>

    /** 录音 */
    'Record'?: Record<string, any>

    /** uni 云端一体安全网络 */
    'SecureNetwork'?: Record<string, any>

    /**
     * 分享，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-share.html>
     */
    'Share'?: Record<string, any>

    /**
     * 语音输入
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-speech.html>
     */
    'Speech'?: Record<string, any>

    /**
     * 统计，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-statistic.html>
     */
    'Statistic'?: Record<string, any>

    /** SQLite 数据库 */
    'SQLite'?: Record<string, any>

    /** 视频播放 */
    'VideoPlayer'?: Record<string, any>

    /**
     * Android X5 Webview，依赖腾讯 TBS SDK，上架到国内应用市场需要在隐私协议中添加相应条款
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-android-x5.html>
     */
    'Webview-x5'?: Record<string, any>

    /**
     * iOS UIWebview
     *
     * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-ios-uiwebview.html>
     */
    'UIWebview'?: Record<string, any>

    [x: string]: any
  }

  /** APP 云端打包配置 */
  distribute?: {
    /** Android 平台云端打包配置 */
    android?: {
      /** Android 平台云端打包包名  */
      packagename?: string

      /** Android 签名证书文件路径 */
      keystore?: string

      /** Android 签名证书文件密码 */
      password?: string

      /** Android 签名证书别名 */
      aliasname?: string

      /**
       * Android 平台 APP 注册的 scheme，多个 scheme 使用 `,` 分割，详见 <https://uniapp.dcloud.io/tutorial/app-android-schemes>
       */
      schemes?: string

      /**
       * Android 平台 APP 支持的 CPU 类型，详见 <https://uniapp.dcloud.io/tutorial/app-android-abifilters>
       */
      abiFilters?: ('armeabi-v7a' | 'arm64-v8a' | 'x86' | 'x86_64')[]

      /**
       * Android 平台 APP 使用的权限，详见 <https://uniapp.dcloud.net.cn/tutorial/app-permission-android.html> 和 <https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html>
       */
      permissions?: AndroidPermissionOrFeature[]

      /**
       * Android 平台 APP 不使用的权限，详见 <https://uniapp.dcloud.net.cn/tutorial/app-permission-android.html> 和 <https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html>
       */
      excludePermissions?: AndroidPermissionOrFeature[]

      /**
       * 是否自定义 Android 权限配置
       */
      custompermissions?: boolean

      /** Android 平台 APP 启动时申请读写手机存储权限策略配置，详见 <https://ask.dcloud.net.cn/article/36549> */
      permissionExternalStorage?: {
        /**
         * Android 平台 APP 启动时申请读写手机存储权限策略的策略
         *
         * "none" 启动时不申请
         *
         * "once" 第一次启动时申请，用户可以拒绝
         *
         * "always" 每次启动都申请，用户必须允许，用户拒绝时弹出提示框引导用户重新允许
         */
        request?: 'none' | 'once' | 'always'

        /**
         * 用户拒绝时弹出提示框上的内容，国际化配置参考 <https://ask.dcloud.net.cn/article/35860#strings>
         */
        prompt?: string

        [x: string]: any
      }

      /**
       * Android 平台 APP 启动时申请读取设备信息权限配置，详见 <https://ask.dcloud.net.cn/article/36549>
       */
      permissionPhoneState?: {
        /**
         * Android 平台 APP 启动时申请读取设备信息权限的策略
         *
         * "none" 启动时不申请
         *
         * "once" 第一次启动时申请，用户可以拒绝
         *
         * "always" 每次启动都申请，用户必须允许，用户拒绝时弹出提示框引导用户重新允许
         */
        request?: 'none' | 'once' | 'always'

        /**
         * 用户拒绝时弹出提示框上的内容，国际化配置参考 <https://ask.dcloud.net.cn/article/35860#strings>
         */
        prompt?: string

        [x: string]: any
      }

      /**
       * Android 平台最低支持版本，详见 <https://uniapp.dcloud.io/tutorial/app-android-minsdkversion>
       */
      minSdkVersion?: number

      /**
       * Android 平台目标版本，详见 <https://uniapp.dcloud.net.cn/tutorial/app-android-targetsdkversion>
       */
      targetSdkVersion?: number

      /**
       * Android 平台云端打包时 build.gradle 的 packagingOptions 配置项
       *
       * @example ["doNotStrip '/armeabi-v7a/.so'"]
       */
      packagingOptions?: string[]

      /**
       * uni-app 使用的 JS 引擎
       *
       * @deprecated
       */
      jsEngine?: 'v8' | 'jsc'

      /**
       * 是否开启 Android 调试开关
       *
       * @default false
       */
      debuggable?: boolean

      /**
       * 应用的默认语言
       */
      locale?: string

      /**
       * 是否强制允许暗黑模式
       *
       * @default false
       */
      forceDarkAllowed?: boolean

      /**
       * 是否支持分屏调整窗口大小
       *
       * @default false
       */
      resizeableActivity?: boolean

      /**
       * 是否设置 android: taskAffinity，详见 <https://uniapp.dcloud.net.cn/tutorial/app-sec-android.html#strandhogg%E6%BC%8F%E6%B4%9E>
       *
       * @default false
       */
      hasTaskAffinity?: boolean

      /**
       * Android 平台云端打包时 build.gradle 的 buildFeatures 配置项，详见 <https://uniapp.dcloud.net.cn/collocation/manifest-app.html#buildfeatures>
       */
      buildFeatures?: {
        /**
         * 是否设置 dataBinding
         *
         * @default false
         */
        dataBinding?: boolean

        /**
         * 是否设置 viewBinding
         *
         * @default false
         */
        viewBinding?: boolean

        [x: string]: any
      }

      /**
       * 延迟初始化 uni-push 的配置，当配置此项值为 manual 后 uni-push 不会初始化，直到首次调用 getPushClientId、getClientInfo、getClientInfoAsync 时才会初始化
       *
       * 调用获取 cid 的方法后，下次 APP 启动不再延迟初始化 uni-push
       */
      pushRegisterMode?: 'manual'

      /**
       * 是否支持获取 OAID（匿名设备标识符），详见 <https://uniapp.dcloud.net.cn/collocation/manifest-app.html#enableoaid>
       *
       * @default true
       */
      enableOAID?: boolean

      [x: string]: any
    }

    /** iOS 平台云端打包配置 */
    ios?: {
      /** iOS 平台云端打包使用的 Bundle ID */
      appid?: string

      /** iOS 平台云端打包使用的 profile 文件路径 */
      mobileprovision?: string

      /** iOS 平台云端打包使用的证书文件路径 */
      p12?: string

      /** iOS 打包使用的证书密码 */
      password?: string

      /**
       * iOS支持的设备类型
       *
       * "iphone" 仅支持 iPhone 设备
       *
       * "ipad" 仅支持 iPad 设备
       *
       * "universal" 同时支持iPhone和iPad设备
       */
      devices?: 'iphone' | 'ipad' | 'universal'

      /** 应用访问白名单列表，多个白名单使用 `,` 分割，详见 <https://uniapp.dcloud.io/tutorial/app-ios-schemewhitelist> */
      urlschemewhitelist?: string

      /** iOS 平台 APP 注册的 scheme，多个 scheme 使用 `,` 分割，详见 <https://uniapp.dcloud.io/tutorial/app-ios-schemes> */
      urltypes?: string

      /**
       * 应用后台运行模式，详见 <https://uniapp.dcloud.net.cn/tutorial/app-ios-uibackgroundmodes.html>
       *
       * "audio" 后台播放音乐
       *
       * "location" 后台定位
       */
      UIBackgroundModes?: 'audio' | 'location' | 'audio,location'

      /**
       * 依赖的系统库，推荐使用 uni 原生插件扩展使用系统依赖库
       *
       * @deprecate
       */
      frameworks?: string[]

      /** iOS 支持的最低版本 */
      deploymentTarget?: string

      /** iOS 隐私信息访问的许可描述 */
      privacyDescription?: {
        /** 相册读取权限描述 */
        NSPhotoLibraryUsageDescription?: string

        /** 相册写入权限描述 */
        NSPhotoLibraryAddUsageDescription?: string

        /** 摄像头使用权限描述 */
        NSCameraUsageDescription?: string

        /** 麦克风使用权限描述 */
        NSMicrophoneUsageDescription?: string

        /** 运行期访问位置权限描述 */
        NSLocationWhenInUseUsageDescription?: string

        /** 后台运行访问位置权限描述 */
        NSLocationAlwaysUsageDescription?: string

        /** 运行期后后台访问位置权限描述 */
        NSLocationAlwaysAndWhenInUseUsageDescription?: string

        /** 使用日历权限描述 */
        NSCalendarsUsageDescription?: string

        /** 使用通讯录权限描述 */
        NSContactsUsageDescription?: string

        /** 使用蓝牙权限描述 */
        NSBluetoothPeripheralUsageDescription?: string

        /** 后台使用蓝牙权限描述 */
        NSBluetoothAlwaysUsageDescription?: string

        /** 系统语音识别权限描述 */
        NSSpeechRecognitionUsageDescription?: string

        /** 系统提醒事项权限描述 */
        NSRemindersUsageDescription?: string

        /** 使用运动与健康权限描述 */
        NSMotionUsageDescription?: string

        /** 使用健康更新权限描述 */
        NSHealthUpdateUsageDescription?: string

        /** 使用健康分享权限描述 */
        NSHealthShareUsageDescription?: string

        /** 使用媒体资料库权限描述 */
        NSAppleMusicUsageDescription?: string

        /** 使用 NFC 权限描述 */
        NFCReaderUsageDescription?: string

        /** 访问临床记录权限描述 */
        NSHealthClinicalHealthRecordsShareUsageDescription?: string

        /** 访问 HomeKit 权限描述 */
        NSHomeKitUsageDescription?: string

        /** 访问 Siri 权限描述 */
        NSSiriUsageDescription?: string

        /** 使用 FaceID 权限描述 */
        NSFaceIDUsageDescription?: string

        /** 访问本地网络权限描述 */
        NSLocalNetworkUsageDescription?: string

        /** 跟踪用户活动权限描述 */
        NSUserTrackingUsageDescription?: string

        [x: string]: any
      }

      /**
       * 是否使用广告标识
       *
       * @default true
       */
      idfa?: boolean

      /** 应用的能力配置（Capabilities），根据 XCode 规范分别配置到 entitlements 和 plist 文件中 */
      capabilities?: {
        /** 合并到工程 entitlements 文件的数据，json 格式 */
        entitlements?: Record<string, any>

        /** 合并到工程 Info.plist 文件的数据，json格式 */
        plists?: Record<string, any>
      }

      /**
       * 应用的CFBundleName名称
       *
       * @default "HBuilder"
       */
      CFBundleName?: string

      /** 编译时支持的 CPU 指令 */
      validArchitectures?: ('arm64' | 'arm64e' | 'armv7' | 'armv7s' | 'x86_64')[]

      /**
       * 使用 Push（消息推送）模块时申请系统推送权限模式
       *
       * "manual" 调用 push 相关 API 时申请
       *
       * 其它 应用启动时自动申请
       */
      pushRegisterMode?: 'manual' | string

      /**
       * "manual" 用户同意隐私政策后才获取相关隐私信息
       *
       * 其它 应用启动时自动获取
       *
       * 详见 <https://uniapp.dcloud.net.cn/collocation/manifest#privacyRegisterMode>
       */
      privacyRegisterMode?: 'manual' | string

      [x: string]: any
    }

    /**
     * APP 图标配置，详见 <https://uniapp.dcloud.net.cn/tutorial/app-icons.html>
     *
     * 注意事项：
     *
     * - 必须使用 PNG 格式，其它格式需要使用图片工具转换，不要直接将 PNG 等其它格式直接改为 PNG
     * - Android 系统没有对图标分辨率进行限制，按照建议的分辨率配置即可
     * - Android 图片支持透明区域，建议使用圆角图标
     * - iOS 图标必须是直角，不要使用圆角图标，否则不过审
     * - iOS 打包提交 App Store 时，必须配置分辨率 1024x1024 AppStore 图标，云端打包机默认使用纯白色图标
     * - iOS 所有图标不要包含透明信息（alpha 通道），否则提交 AppStore 会报错
     */
    icons?: {
      /**
       * iOS 平台图标配置，详见 <https://uniapp.dcloud.net.cn/tutorial/app-icons.html#ios%E5%B9%B3%E5%8F%B0>
       *
       * 注意事项：
       *
       * - 必须使用 PNG 格式，其它格式需要使用图片工具转换，不要直接将 PNG 等其它格式直接改为 PNG
       * - 图标必须是直角，不要使用圆角图标，否则不过审
       * - 打包提交 App Store 时，必须配置分辨率 1024x1024 AppStore 图标，云端打包机默认使用纯白色图标
       * - 所有图标不要包含透明信息（alpha 通道），否则提交 AppStore 会报错
       */
      ios?: {
        /** App Store 图标路径，分辨率 1024x1024 */
        appstore?: PNG

        /** iPhone 设备程序图标 */
        iphone?: {
          /** iOS7+ 设备程序主图标，分辨率 120x120 */
          'app@2x': PNG

          /** iOS7+ 设备程序主图标，分辨率 180x180 */
          'app@3x': PNG

          /** iOS7+ 设备 Spotlight 搜索图标，分辨率 80x80 */
          'spotlight@2x': PNG

          /** iOS7+ 设备 Spotlight 搜索图标，分辨率 120x120 */
          'spotlight@3x': PNG

          /** iOS7+ 设备 Settings 设置图标，分辨率 58x58 */
          'settings@2x': PNG

          /** iOS7+ 设备 Settings 设置图标，分辨率 87x87 */
          'settings@3x': PNG

          /** iOS7+ 设备通知栏图标，分辨率 40x40 */
          'notification@2x': PNG

          /** iOS7+ 设备通知栏图标，分辨率 60x60 */
          'notification@3x': PNG

          [x: string]: any
        }

        /** iPad 设备程序图标 */
        ipad?: {
          /** iOS7+ 设备程序主图标，分辨率 76x76 */
          'app'?: PNG

          /** iOS7+ 设备程序主图标，分辨率 152x152 */
          'app@2x'?: PNG

          /** iOS9+ iPad Pro（12.9英寸）设备程序主图标，分辨率 167x167 */
          'proapp@2x'?: PNG

          /** iOS7+ 设备 Spotlight 搜索图标，分辨率 40x40 */
          'spotlight'?: PNG

          /** iOS7+ 高分屏设备 Spotlight 搜索图标，分辨率 80x80 */
          'spotlight@2x'?: PNG

          /** iOS5+ 设备 Settings 设置图标，分辨率 29x29 */
          'settings'?: PNG

          /** iOS5+ 高分屏设备 Settings 设置图标，分辨率 58x58 */
          'settings@2x'?: PNG

          /** iOS7+ 设备通知栏图标，分辨率 20x20 */
          'notification'?: PNG

          /** iOS7+ 高分屏设备通知栏图标，分辨率 40x40 */
          'notification@2x'?: PNG

          [x: string]: any
        }

        [x: string]: any
      }

      /**
       * Android 平台图标配置，详见 <https://uniapp.dcloud.net.cn/tutorial/app-icons.html#android%E5%B9%B3%E5%8F%B0>
       *
       * 注意事项：
       *
       * - 必须使用 PNG 格式，其它格式需要使用图片工具转换，不要直接将 PNG 等其它格式直接改为 PNG
       * - 系统没有对图标分辨率进行限制，按照建议的分辨率配置即可
       * - 图片支持透明区域，建议使用圆角图标
       */
      android?: {
        /**
         * 普通屏设备程序图标，分辨率 48x48
         *
         * @deprecated
         */
        ldpi?: PNG

        /**
         * 大屏设备程序图标，分辨率 48x48
         *
         * @deprecated
         */
        mdpi?: PNG

        /** 高分屏设备程序图标，分辨率 72x72 */
        hdpi?: PNG

        /** 720P 高分屏设备程序图标，分辨率 96x96 */
        xhdpi?: PNG

        /** 1080P 高分屏设备程序图标，分辨率 144x144 */
        xxhdpi?: PNG

        /** 2K 屏设备程序图标，分辨率 192x192 */
        xxxhdpi?: PNG

        [x: string]: any
      }
    }

    /**
     * SDK 配置，仅打包生效
     */
    sdkConfigs?: {
      /**
       * 定位，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-geolocation.html>
       */
      geolocation?: {
        /** 系统定位，由手机厂商提供定位服务，无需商业授权 */
        system?: {
          /** 支持平台，至少选一个 */
          __platform__?: ('ios' | 'android')[]

          [x: string]: any
        }

        /** 高德定位，需要申请高德服务并配置，高德地图和高德定位配置信息应保持一致 */
        amap?: {
          /** 高德用户名 */
          name?: string

          /** 支持平台，至少选一个 */
          __platform__?: ('ios' | 'android')[]

          /** iOS 平台高德定位地图应用 key */
          appkey_ios?: string

          /** Android 平台高德定位地图应用 key */
          appkey_android?: string

          [x: string]: any
        }

        /** 百度定位，需要申请百度服务并配置，百度地图和百度定位配置信息应保持一致 */
        baidu?: {
          /** 支持平台，至少选一个 */
          __platform__?: ('ios' | 'android')[]

          /** iOS 平台百度地图应用 key */
          appkey_ios?: string

          /** Android 平台百度地图应用 key */
          appkey_android?: string

          [x: string]: any
        }
      }

      /**
       * 地图，只能选一个，部分国产 Android 手机获取位置必须申请定位服务商的SDK
       *
       * 依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-maps.html>
       */
      maps?: {
        /** 高德地图，需要申请高德服务并配置，高德地图和高德定位配置信息应保持一致 */
        amap?: {
          /** 高德用户名 */
          name?: string

          /** iOS 平台高德地图应用 key */
          appkey_ios?: string

          /** Android 平台高德地图应用 key */
          appkey_android?: string

          [x: string]: any
        }

        /**
         * 百度地图，需要申请百度服务并配置，百度地图和百度定位配置信息应保持一致
         *
         * 不支持 nvue
         */
        baidu?: {
          /** iOS 平台百度地图应用 key */
          appkey_ios?: string

          /** Android 平台百度地图应用 key */
          appkey_android?: string

          [x: string]: any
        }

        /** Google 地图 */
        google?: {
          /** iOS 平台 Google 地图 API 密钥  */
          APIKey_ios?: string

          /** Android 平台 Google 地图 API 密钥  */
          APIKey_android?: string

          [x: string]: any
        }

        [x: string]: any
      }

      /**
       * 登录鉴权，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-oauth.html>
       */
      oauth?: {
        /** 一键登录 */
        univerify?: Record<string, any>

        /**
         * 苹果登录，iOS 13+ 支持
         *
         * 如果开发者提供任何第三方登录，则必须同时提供苹果登录
         */
        apple?: Record<string, any>

        /** 微信登录，微信登录、微信分享和微信支付的配置信息应保持一致 */
        weixin?: {
          /** 微信开放平台申请应用的 AppID 值 */
          appid?: string

          /** 微信开放平台申请应用的 AppSecret 值 */
          appsecret?: string

          /** 微信开放平台申请应用时配置的 Universal Links */
          UniversalLinks?: string

          [x: string]: any
        }

        /** QQ 登录，QQ 登录和 QQ 分享的配置信息应保持一致 */
        qq?: {
          /** 腾讯 QQ 开放平台申请应用的 AppID 值 */
          appid?: string

          /** 腾讯 QQ 开放平台申请应用时配置的 Universal Links */
          UniversalLinks?: string

          [x: string]: any
        }

        /** 新浪微博登录，新浪微博登录和新浪微博分享的配置信息应保持一致 */
        sina?: {
          /** 新浪微博开放平台应用 appkey */
          appkey?: string

          /** 新浪微博开放平台应用授权回调页地址 */
          redirect_uri?: string

          /** 新浪微博开放平台申请应用时配置的 Universal Links */
          UniversalLinks?: string

          [x: string]: any
        }

        /** Google登录 */
        google?: {
          /** Google API Console 项目中获取的 OAuth 客户端 ID */
          clientid?: string

          [x: string]: any
        }

        /** Facebook 脸书登录 */
        facebook?: {
          /** Facebook 开发者中心获取的应用编号 */
          appid?: string

          /** Facebook 开发者中心获取的 client_token */
          client_token?: string

          [x: string]: any
        }

        [x: string]: any
      }

      /**
       * 支付，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-payment.html>
       */
      payment?: {
        /** Apple 应用内支付，仅 iOS 支持 */
        appleiap?: Record<string, any>

        /** 支付宝支付 */
        alipay?: {
          /** 支持平台，至少选一个 */
          __platform__?: ('ios' | 'android')[]
        }

        /** 微信支付，微信登录、微信分享和微信支付的配置信息应保持一致 */
        weixin?: {
          /** 支持平台，至少选一个 */
          __platform__?: ('ios' | 'android')[]

          /** 微信开放平台申请应用的 AppID 值 */
          appid?: string

          /** 微信开放平台申请应用时配置的 Universal Links */
          UniversalLinks?: string

          [x: string]: any
        }

        paypal?: {
          /** 支持平台，至少选一个 */
          __platform__?: ('ios' | 'android')[]

          /** iOS 平台返回 URL 地址，推荐使用 `包名+://paypalpay`，要求使用小写 */
          returnURL_ios?: string

          /** Android 平台返回 URL 地址，推荐使用 `包名+://paypalpay`，要求使用小写 */
          returnURL_android?: string

          [x: string]: any
        }

        stripe?: {
          /** 支持平台，至少选一个 */
          __platform__?: ('ios' | 'android')[]

          /** iOS 平台返回 URL 地址，格式为 `协议名称://stripe` */
          returnURL_ios?: string

          [x: string]: any
        }

        /** Google 支付 */
        google?: Record<string, any>

        [x: string]: any
      }

      /**
       * 消息推送
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-push.html> 和 <https://uniapp.dcloud.net.cn/tutorial/app-push-unipush.html>
       */
      push?: {
        /** uni-push 配置 */
        unipush?: {
          /**
           * uni-push 版本
           *
           * @default "1"
           */
          version?: '1' | '2'

          /**
           * APP 离线推送，APP 离线时适用，推送消息进入手机通知栏
           *
           * SDK 体积 1024K
           *
           * uni-push v2 支持
           *
           * @default false
           */
          offline?: boolean

          /** 华为推送 SDK，上线国内应用市场需在 APP 隐私协议中添加条款 */
          hms?: Record<string, any>

          /** OPPO 推送 SDK，上线国内应用市场需在 APP 隐私协议中添加条款 */
          oppo?: Record<string, any>

          /** VIVO 推送 SDK，上线国内应用市场需在 APP 隐私协议中添加条款 */
          vivo?: Record<string, any>

          /** 小米推送 SDK，上线国内应用市场需在 APP 隐私协议中添加条款 */
          mi?: Record<string, any>

          /** 魅族推送 SDK，上线国内应用市场需在 APP 隐私协议中添加条款 */
          meizu?: Record<string, any>

          /** 荣耀推送 SDK，上线国内应用市场需在 APP 隐私协议中添加条款 */
          honor?: Record<string, any>

          /** Google FCM 推送 SDK，上线国内应用市场需在 APP 隐私协议中添加条款 */
          fcm?: Record<string, any>

          icons?: {
            /** 图标配置 */
            push?: {
              /** 48x48 */
              ldpi?: string

              /** 48x48 */
              mdpi?: string

              /** 72x72 */
              hdpi?: string

              /** 96x96 */
              xhdpi?: string

              /** 144x144 */
              xxhdpi?: string

              /** 192x192 */
              xxxhdpi?: string

              [x: string]: any
            }

            /** 小图标配置 */
            small?: {
              /** 18x18 */
              ldpi?: string

              /** 24x24 */
              mdpi?: string

              /** 36x36 */
              hdpi?: string

              /** 48x48 */
              xhdpi?: string

              /** 72x72 */
              xxhdpi?: string

              /** 96x96 */
              xxxhdpi?: string

              [x: string]: any
            }

            [x: string]: any
          }

          [x: string]: any
        }

        [x: string]: any
      }

      /**
       * 分享，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-share.html>
       */
      share?: {
        /** 微信分享，微信登录、微信分享和微信支付的配置信息应保持一致 */
        weixin?: {
          /** 微信开放平台申请应用的 AppID 值 */
          appid?: string

          /** 微信开放平台申请应用时配置的 Universal Links */
          UniversalLinks?: string

          [x: string]: any
        }

        /** QQ 分享，QQ 登录和 QQ 分享的配置信息应保持一致 */
        qq?: {
          /** 腾讯 QQ 开放平台申请应用的 AppID 值 */
          appid?: string

          /** 腾讯 QQ 开放平台申请应用时配置的 Universal Links */
          UniversalLinks?: string

          [x: string]: any
        }

        /** 新浪微博分享，新浪微博登录和新浪微博分享的配置信息应保持一致 */
        sina?: {
          /** 新浪微博开放平台应用 appkey */
          appkey?: string

          /** 新浪微博开放平台应用授权回调页地址 */
          redirect_uri?: string

          /** 新浪微博开放平台申请应用时配置的 Universal Links */
          UniversalLinks?: string

          [x: string]: any
        }
      }

      /**
       * 语音输入
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-speech.html>
       */
      speech?: {
        /** 百度语音识别 */
        baidu?: {
          /** 百度开放平台申请的 AppID 值 */
          appid?: string

          /** 百度开放平台申请的 ApiKey 值 */
          apikey?: string

          /** 百度开放平台申请的 SecretKey 值 */
          secretkey?: string

          [x: string]: any
        }

        [x: string]: any
      }

      /**
       * 统计，依赖三方 SDK，上架到国内应用市场需要在隐私协议中添加相应条款
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-statistic.html>
       */
      statics?: {
        /** 友盟统计 */
        umeng?: {
          /** iOS 平台友盟 appkey */
          appkey_ios?: string

          /** iOS 平台友盟渠道 id */
          channelid_ios?: string

          /** Android 平台友盟 appkey */
          appkey_android?: string

          /** Android 平台友盟渠道 id */
          channelid_android?: string

          [x: string]: any
        }

        /** Google Analytics for Firebase */
        google?: {
          /** iOS 平台 Google Analytics 的配置文件 */
          config_ios?: string

          /** Android 平台 Google Analytics 的配置文件 */
          config_android?: string

          [x: string]: any
        }

        [x: string]: any
      }

      /** uni-ad 配置 */
      ad?: {
        /** 360 广告联盟 */
        '360'?: Record<string, any>

        /** 今日头条穿山甲广告联盟 */
        'csj'?: Record<string, any>

        /** 腾讯优量汇广告联盟 */
        'gdt'?: Record<string, any>

        /** 快手广告联盟 */
        'ks'?: Record<string, any>

        /** 快手内容联盟 */
        'ks-content'?: Record<string, any>

        /** Sigmob广告联盟 */
        'sigmob'?: Record<string, any>

        /** 华为广告联盟 */
        'hw'?: Record<string, any>

        /** 百度百青藤广告联盟 */
        'bd'?: Record<string, any>

        /** 互动游戏（变现猫） */
        'BXM-AD'?: Record<string, any>

        /** Google AdMob */
        'gg'?: Record<string, any>

        /** Pangle（海外穿山甲） */
        'pg'?: Record<string, any>

        [x: string]: any
      }

      [x: string]: any
    }

    /**
     * 启动界面配置
     */
    splashscreen?: {
      /**
       * iOS 平台启动界面样式
       *
       * @default "common"
       */
      iosStyle?: 'common' | 'default' | 'storyboard'

      /**
       * iOS 平台启动界面配置
       */
      ios?: {
        /**
         * 自定义 storyboard 启动界面文件路径，iosStyle 为 "storyboard" 时生效
         */
        storyboard?: string

        /**
         * iPhone 设备启动图配置，iosStyle 为 "default" 时生效
         */
        iphone?: {
          /**
           * 分辨率 320x480，iPhone3（G/GS）启动图片路径
           *
           * @deprecated
           */
          'default'?: string

          /**
           * 分辨率 640x960，3.5 英寸设备（iPhone4/4S）启动图片路径
           *
           * @deprecated
           */
          'retina35'?: string

          /**
           * 分辨率 640x1136，4.0 英寸设备（iPhone5/5S）启动图片路径
           */
          'retina40'?: string

          /**
           * 分辨率 1136x640，4.0 英寸设备（iPhone5/5S）横屏启动图片路径
           */
          'retina40l'?: string

          /**
           * 分辨率 750x1334，4.7 英寸设备（iPhone6/7/8）启动图片路径
           */
          'retina47'?: string

          /**
           * 分辨率 1334x750，5.5 英寸设备（iPhone6/7/8）启动图片路径
           */
          'retina47l'?: string

          /**
           * 分辨率 1242x2208，5.5英寸设备（iPhone6/7/8Plus）启动图片路径
           */
          'retina55'?: string

          /**
           * 分辨率 2208x1242，5.5英寸设备（iPhone6/7/8Plus）横屏启动图片路径
           */
          'retina55l'?: string

          /**
           * 分辨率 1125x2436，5.8英寸设备（iPhoneX/XS）启动图片路径
           */
          'iphonex'?: string

          /**
           * 分辨率 2436x1125，5.8英寸设备（iPhoneX/XS）横屏启动图片路径
           */
          'iphonexl'?: string

          /**
           * 分辨率 828x1792，6.1英寸设备（iPhoneXR）启动图片路径
           */
          'portrait-896h@2x'?: string

          /**
           * 分辨率 1792x828，6.1英寸设备（iPhoneXR）横屏启动图片路径
           */
          'landscape-896h@2x'?: string

          /**
           * 分辨率 1242x2688，6.5英寸设备（iPhoneXS Max）横屏启动图片路径
           */
          'portrait-896h@3x'?: string

          /**
           * 分辨率 2688x1242，6.5英寸设备（iPhoneXS Max）横屏启动图片路径
           */
          'landscape-896h@3x'?: string

          [x: string]: any
        }

        /**
         * iPad 设备启动图配置，iosStyle 为 "default" 时生效
         */
        ipad?: {
          /**
           * 分辨率 768x1004，iPad 竖屏启动图片路径
           *
           * @deprecated
           */
          'portrait'?: string

          /**
           * 分辨率 1536x2008，iPad 高分屏竖屏启动图片路径
           *
           * @deprecated
           */
          'portrait-retina'?: string

          /**
           * 分辨率 1024x748，iPad 横屏启动图片路径
           *
           * @deprecated
           */
          'landscape'?: string

          /**
           * 分辨率 2048x1496，iPad 高分屏横屏启动图片路径
           *
           * @deprecated
           */
          'landscape-retina'?: string
          /**
           * 分辨率 768x1024，9.7/7.9 英寸 iPad/mini 竖屏启动图片路径
           */
          'portrait7'?: string

          /**
           * 分辨率 1024x768，9.7/7.9 英寸 iPad/mini 横屏启动图片路径
           */
          'landscape7'?: string

          /**
           * 分辨率 1536x2048，9.7/7.9 英寸 iPad/mini 高分屏竖屏图片路径
           */
          'portrait-retina7'?: string

          /**
           * 分辨率 2048x1536，9.7/7.9 英寸 iPad/mini 高分屏横屏启动图片路径
           */
          'landscape-retina7'?: string

          /**
           * 分辨率 1668x2224，10.5 英寸 iPad Pro 竖屏启动图片路径
           */
          'portrait-1112h@2x'?: string

          /**
           * 分辨率 2224x1668，10.5 英寸 iPad Pro 横屏启动图片路径
           */
          'landscape-1112h@2x'?: string

          /**
           * 分辨率 1668x2388，11 英寸 iPad Pro 竖屏启动图片路径
           */
          'portrait-1194h@2x'?: string

          /**
           * 分辨率 2388x1668，11 英寸 iPad Pro 横屏启动图片路径
           */
          'landscape-1194h@2x'?: string

          /**
           * 分辨率 2048x2732，12.9 英寸 iPad Pro竖屏启动图片路径
           */
          'portrait-1366h@2x'?: string

          /**
           * 分辨率 2732x2048，12.9 英寸 iPad Pro 横屏启动图片路径
           */
          'landscape-1366h@2x'?: string
        }

        [x: string]: any
      }

      /**
       * Android 平台启动界面样式
       *
       * @default "common"
       */
      androidStyle?: 'common' | 'default'

      /**
       * Android 平台启动图片配置， androidStyle 为 "default" 时生效
       */
      android?: {
        /**
         * 低密度屏幕启动图片路径，320x442
         *
          @deprecated */
        ldpi?: string

        /**
         * 中密度屏幕启动图片路径，240x282
         *
         * @deprecated
         */
        mdpi?: string
        /**
         * 高密度屏幕启动图片路径，480x762
         */
        hdpi?: string
        /**
         * 720P 高密度屏幕启动图片路径，720x1242
         */
        xhdpi?: string

        /**
         * 1080P 高密度屏幕启动图片路径，1080x1882
         */
        xxhdpi?: string
      }

      /**
       * 是否使用原生隐私政策提示框，仅支持 Android
       *
       * 详见 <https://uniapp.dcloud.net.cn/tutorial/app-privacy-android.html>
       */
      useOriginalMsgbox?: boolean
    }

    /**
     * 重力感应、横竖屏配置
     *
     * "portrait-primary" 竖屏正方向
     *
     * "portrait-secondary" 竖屏反方向
     *
     * "landscape-primary" 横屏正方向
     *
     * "landscape-secondary" 横屏反方向
     *
     * @deprecated 使用 screenOrientation 替代
     */
    orientation?: ('portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary')[]

    [x: string]: any
  }

  /**
   * nvue 编译模式，区别详见 <https://ask.dcloud.net.cn/article/36074>
   *
   * @desc 2.0.3+
   *
   * @default "uni-app"
   */
  nvueCompiler?: 'weex' | 'uni-app'

  /**
   * nvue 样式编译模式，区别详见 <https://ask.dcloud.net.cn/article/38751>
   *
   * @desc 3.1.1+
   *
   * @default "weex"
   */
  nvueStyleCompiler?: 'weex' | 'uni-app'

  /**
   * 运行框架
   *
   * "native" 不加载基于 webview 的运行框架，减少包体积、提升启动速度
   *
   * @desc App-nvue 2.2.0+
   */
  renderer?: 'native'

  /**
   * nvue 首页启动模式，详见 <https://ask.dcloud.net.cn/article/36749>
   *
   * @desc 2.5.0+
   *
   * @default "normal"
   */
  nvueLaunchMode?: 'normal' | 'fast'

  /**
   * nvue 页面布局初始配置
   *
   * @desc 2.0.3+
   */
  nvue?: {
    /**
     * flex 项目的排列方向
     *
     * "row" 从左到右
     *
     * "row-reverse" 从右到左
     *
     * "column" 从上到下
     *
     * "column-reverse" 从下到上
     *
     * @default "column"
     */
    'flex-direction'?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  }

  /**
   * 分包配置，可以减轻启动时加载的脚本数量，提升启动速度，详见 <https://uniapp.dcloud.net.cn/collocation/manifest.html#app-vue-optimization>
   *
   * @desc 2.7.12+
   */
  optimization?: {
    /**
     * 是否开启分包配置
     *
     * 为 true 时必须设置 app-plus.runmode 为 "liberate"
     *
     * @desc uni-app vue2
     */
    subPackages?: boolean

    [x: string]: any
  }

  /**
   * 运行模式，分包时必须设置为 "liberate"
   *
   * "normal" 默认模式
   *
   * "liberate" 资源释放模式
   *
   * @default "normal"
   */
  runmode?: 'normal' | 'liberate'

  /**
   * uni 统计配置项
   *
   * @desc 2.2.3+
   */
  uniStatistics?: PlatformUniStatistics

  /**
   * 系统 webview 低于指定版本时，会弹出提示，或者下载 x5 内核后继续启动，仅 Android 支持
   *
   * @desc 3.5.0+
   */
  webView?: {
    /**
     * 最小 webview 版本
     *
     * 当低于最小版本要求时，显示弹框，点击确定退出应用
     *
     * Vue3 要求 Android 系统 webview 最低版本为 64.0.3282.116
     *
     * @example "64.0.3282.116"
     */
    minUserAgentVersion?: string

    /**
     * X5 内核配置，启用 Android X5 Webview 模块后生效
     */
    x5?: {
      /**
       * 超时时间
       *
       * @default 3000
       */
      timeOut?: number

      /**
       * 是否在非 WiFi 网络环境时弹框询问用户是否确认下载 X5 内核
       *
       * true 弹框
       *
       * false 不弹框
       *
       * @default false
       */
      showTipsWithoutWifi?: boolean

      /**
       * 是否允许用户在非 WiFi 网络时直接下载 X5 内核
       *
       * true 不弹框询问用户直接下载
       *
       * false 且 showTipsWithoutWifi 为 true，弹框询问用户，确认再下载
       *
       * false 且 showTipsWithoutWifi 为 false，不弹框不下载
       *
       * @default false
       */
      allowDownloadWithoutWiFi?: boolean

      [x: string]: any
    }

    [x: string]: any
  }

  /**
   * 是否允许 H5 中视频非全屏播放，仅 iOS 生效
   *
   * @default true
   */
  allowsInlineMediaPlayback?: boolean

  /**
   * H5 中的音视频是否需要用户操作允许播放，仅 iOS 生效
   *
   * true 需要用户操作允许
   *
   * false 允许 API 控制自动播放
   *
   * @desc 3.0.1+
   *
   * @default false
   */
  mediaPlaybackRequiresUserAction?: boolean

  /**
   * 是否校验已拒绝权限，如果拒绝则不会再申请
   *
   * true 校验已拒绝权限
   *
   * false 不校验已拒绝权限
   *
   * @default false
   */
  checkPermissionDenied?: boolean

  /** 原生混淆加密配置，详见 <https://uniapp.dcloud.net.cn/tutorial/app-sec-confusion.html> */
  confusion?: {
    /** 原生混淆描述 */
    description?: string

    /** 原生混淆文件配置 */
    resources?: Record<string, Record<string, any>>

    [x: string]: any
  }

  /** 渠道标识 */
  channel?: string

  /** 应用的异常崩溃与错误报告系统配置 */
  cers?: {
    /** 是否提交应用异常崩溃信息 */
    crash?: boolean

    [x: string]: any
  }

  /**
   * webview 窗口默认使用的缓存模式，uni-app 项目已废弃
   *
   * @deprecated
   */
  cache?: {
    /**
     * @default "default"
     */
    mode?: 'default' | 'cacheElseNetwork' | 'noCache' | 'cacheOnly'

    [x: string]: any
  }

  /** 页面加载错误配置，uni-app 项目仅对 webview 组件有效，详见 <https://uniapp.dcloud.net.cn/tutorial/app-webview-error.html> */
  error?: {
    /** webview 页面错误时跳转的页面地址 */
    url?: string

    [x: string]: any
  }

  /** iOS webview 内核配置 */
  kernel?: {
    /**
     * iOS 平台使用的 webview 内核
     *
     * @default "WKWebview"
     */
    ios?: 'WKWebview' | 'UIWebview'

    /**
     * iOS 平台使用 WKWebview 时，内核崩溃后的处理逻辑
     *
     * @default "reload"
     */
    recovery?: 'reload' | 'restart' | 'none'

    [x: string]: any
  }

  /** 应用首页相关配置，uni-app 项目不建议手动修改 */
  launchwebview?: {
    /**
     * 加载 plus API 时机
     *
     * @default 'normal
     */
    plusrequire?: 'normal' | 'later' | 'ahead' | 'none'

    /**
     * 是否提前注入 plus API
     *
     * @default false
     */
    injection?: boolean

    /** 应用首页的拦截资源相关配置 */
    overrideresource?: {
      /** 匹配拦截的资源 url 地址的正则表达式字符串 */
      match?: string

      /** 拦截资源的重定向地址 */
      redirect?: string

      /** 拦截资源的数据类型 mime */
      mime?: string

      /** 拦截资源的数据编码 */
      encoding?: string

      /** 拦截资源的 http 头数据 */
      header?: Record<string, any>

      [x: string]: any
    }[]

    /** 应用首页的拦截链接请求处理逻辑 */
    overrideurl?: {
      /** 拦截模式 */
      mode?: 'reject' | 'allow'

      /** 匹配拦截规则，支持正则表达式 */
      match?: string

      /** 排除拦截理规则 */
      exclude?: 'none' | 'redirect'

      [x: string]: any
    }

    /** 是否重写 Web API 实现相关配置 */
    replacewebapi?: {
      /** 重写标准定位API */
      geolocation?: 'none' | 'alldevice' | 'auto'

      [x: string]: any
    }

    /**
     * 首页原生 View 相关配置
     *
     * @deprecated
     */
    subNViews?: {
      /** 原生 View 标识 */
      id?: string

      /** 原生 View 样式 */
      styles?: Record<string, any>

      /** 原生 View 中包含的 tag 标签列表 */
      tags?: Record<string, any>[]

      [x: string]: any
    }[]

    /** 标题栏相关配置 */
    titleNView?: {
      /**
       * 标题栏背景颜色
       *
       * @format color
       */
      backgroundColor?: HEXColor

      /** 标题栏标题文字内容 */
      titleText?: string

      /**
       * 标题栏标题文字颜色
       *
       * @format color
       */
      titleColor?: HEXColor

      /**
       * 标题字体大小
       *
       * @default "17px"
       */
      titleSize?: string

      /**
       * 是否显示标题栏上返回键
       *
       * @default true
       */
      autoBackButton?: boolean

      /** 返回按钮样式 */
      backButton?: {
        /**
         * 返回按钮背景颜色
         *
         * @format color
         */
        backgournd?: HEXColor

        /**
         * 返回图标颜色
         *
         * @format color
         */
        color?: HEXColor

        /**
         * 返回图标按下时的颜色
         *
         * @format color
         */
        colorPressed?: HEXColor

        [x: string]: any
      }

      /** 标题栏按钮配置 */
      buttons?: {
        /**
         * 按钮文字颜色
         *
         * @format color
         */
        color?: HEXColor

        /**
         * 按钮按下状态文字颜色
         *
         * @format color
         */
        colorPressed?: HEXColor

        /** 按钮显示位置 */
        float?: 'left' | 'right'

        /**
         * 按钮文字粗细
         *
         * @default "normal"
         */
        fontWeight?: 'normal' | 'bold'

        /**
         * 按钮文字大小
         *
         * @default "22px"
         */
        fontSize?: string

        /** 按钮上文字使用的字体文件路径 */
        fontSrc?: string

        /** 按钮显示文字 */
        text?: string

        [x: string]: any
      }[]

      /** 标题栏分割线样式 */
      splitLine?: {
        /**
         * 分割线颜色
         *
         * @format color
         */
        color?: HEXColor

        /**
         * 分割线高度
         *
         * @default "1px"
         */
        height?: string

        [x: string]: any
      }
    }

    /** 状态栏配置 */
    statusbar?: {
      /**
       * 沉浸式状态栏样式下系统状态栏背景颜色
       *
       * @format color
       */
      background?: HEXColor

      [x: string]: any
    }

    /**
     * Webview 顶部偏移量
     *
     * @default "0px"
     */
    top?: PxSize | PercentageSize

    /**
     * Webview 窗口高度
     *
     * @default "100%"
     */
    height?: PxSize | PercentageSize

    /**
     * Webview 底部偏移量，仅在未同时设置 top 和 height 属性时生效
     *
     * @default "0px"
     */
    bottom?: string

    /**
     * 运行环境自动处理返回键的控制逻辑
     *
     * @default "none"
     */
    backButtonAutoControl?: 'none' | 'hide' | 'close'

    /**
     * 运行环境额外添加HTTP请求头
     */
    additionalHttpHeaders?: Record<string, any>

    [x: string]: any
  }

  /** uni 原生插件配置，详见 <https://nativesupport.dcloud.net.cn/NativePlugin/use/use_local_plugin.html> */
  nativePlugins?: Record<string, Record<string, any>>

  /**
   * 窗口侧滑返回默认效果
   *
   * @default "none"
   */
  popGesture?: 'none' | 'close' | 'hide'

  /** 安全区域配置 */
  safearea?: {
    /**
     * 安全区域背景颜色
     *
     * @format color
     */
    background?: HEXColor

    /**
     * 暗黑模式安全区域背景颜色
     *
     * @format color
     */
    backgroundDark?: HEXColor

    /** 底部安全区域配置 */
    bottom?: {
      /**
       * 安全区域偏移值
       *
       * @default "none"
       */
      offset?: 'none' | 'auto'

      [x: string]: any
    }

    /** 左侧安全区域配置 */
    left?: {
      /**
       * 安全区域偏移值
       *
       * @default "none"
       */
      offset?: 'none' | 'auto'

      [x: string]: any
    }

    /** 右侧安全区域配置 */
    right?: {
      /**
       * 安全区域偏移值
       *
       * @default "none"
       */
      offset?: 'none' | 'auto'

      [x: string]: any
    }

    [x: string]: any
  }

  /** 软键盘相关配置 */
  softinput?: {
    /**
     * iOS 平台软键盘上导航条的显示模式
     *
     * @default "auto"
     */
    navBar?: 'auto' | 'none'

    /**
     * 是否开启辅助输入功能
     *
     * @default false
     */
    auxiliary?: boolean

    /**
     * 弹出系统软键盘模式
     *
     * @default "adjustResize"
     */
    mode?: 'adjustResize' | 'adjustPan'

    [x: string]: any
  }

  /** ssl 相关设置 */
  ssl?: {
    /**
     * https 请求时服务器非受信证书的处理逻辑
     *
     * @default "accept"
     */
    untrustedca?: 'accept' | 'refuse' | 'warning'

    [x: string]: any
  }

  /** 应用启动后的系统状态栏相关配置 */
  statusbar?: {
    /**
     * 沉浸式状态栏样式
     *
     * @default "none"
     */
    immersed?: 'none' | 'suggestedDevice' | 'supportedDevice'

    /**
     * 系统状态栏样式（前景颜色）
     *
     * @default "light"
     */
    style?: 'light' | 'dark'

    /**
     * 系统状态栏背景颜色
     *
     * @format color
     */
    background?: HEXColor

    [x: string]: any
  }

  /**
   * 应用 UserAgent 相关配置
   *
   * @default 系统 UserAgent，并添加 `uni-app Html5Plus/1.0`
   */
  useragent?: {
    /** 设置的默认 UserAgent 值 */
    value?: string

    /**
     * 是否将 value 值作为追加值连接到系统默认 UserAgent 值之后
     *
     * @default false
     */
    concatenate?: boolean

    [x: string]: any
  }

  /** Android 平台应用 UserAgent 相关配置，优先级高于 UserAgent 配置 */
  useragent_android?: {
    /** 设置的默认 UserAgent 值 */
    value?: string

    /**
     * 是否将 value 值作为追加值连接到系统默认 UserAgent 值之后
     *
     * @default false
     */
    concatenate?: boolean

    [x: string]: any
  }

  /** iOS 平台应用 UserAgent 相关配置，优先级高于 UserAgent 配置 */
  useragent_ios?: {
    /** 设置的默认 UserAgent 值 */
    value?: string

    /**
     * 是否将 value 值作为追加值连接到系统默认 UserAgent 值之后
     *
     * @default false
     */
    concatenate?: boolean

    [x: string]: any
  }

  [x: string]: any
}
