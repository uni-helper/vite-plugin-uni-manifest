# 使用

## 创建配置文件

在项目根目录创建 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`，用 `defineManifestConfig` 写配置：

```ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // 属性参考 manifest.json，理论上一比一对齐
  // 如果发现没有对齐，请提交 issue，谢谢 🙏
  // https://uniapp.dcloud.net.cn/collocation/manifest.html
  'name': 'my-project',
  'appid': '',
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'mp-weixin': {
    appid: 'wx123',
    usingComponents: true,
  },
})
```

`defineManifestConfig` 只做类型提示，返回值原样返回。插件用 [c12](https://github.com/unjs/c12) 加载这个文件，所以只认上面这几种文件名：

- 不读 `.manifestrc`
- 不读 `package.json` 里的字段
- 配置文件从 `cwd` 里找，默认是 `VITE_ROOT_DIR`（uni-app 注入的项目根），没有该环境变量时用 `process.cwd()`

没写到的字段用内置的默认配置补齐，默认值参考 [uni-preset-vue](https://github.com/dcloudio/uni-preset-vue/blob/vite-alpha/src/manifest.json)。

## 生成到哪个文件

默认写到 uni-app 的输入目录：`UNI_INPUT_DIR`（通常是 `src/`），该变量不存在时写 `cwd/src`。用 `outDir` 改位置：

```ts
UniManifest({
  outDir: 'dist/manifest',
})
```

相对路径以 `cwd` 为基准，不是进程的工作目录。目录不存在时插件会建出来。

找不到 `manifest.config.*` 时插件不写文件，项目里手写的 `manifest.json` 保持原样。

## 读取 .env

`.env` 文件的加载是 opt-in 的，打开 `dotenv` 后 `manifest.config.ts` 能读到：

```ts
UniManifest({
  dotenv: true,
})
```

读取顺序是 `.env`、`.env.local`、`.env.{mode}`、`.env.{mode}.local`，后读的覆盖先读的。解析交给 Vite 自己的 `loadEnv`，用的是空前缀，所以变量名不受 `VITE_` 限制；`process.env` 里已经有的值优先于文件。

```ini
# .env
UNI_APPID=wx123
```

```ts
// manifest.config.ts
export default defineManifestConfig({
  'name': 'my-project',
  'mp-weixin': {
    appid: process.env.UNI_APPID,
  },
})
```

`mode` 取 Vite 的 mode（`development`、`production`，或者 `--mode` 指定的值）。改完 `.env` 要重启，插件只在启动时读一次。

## 数组整体覆盖

c12 默认用 `defu` 合并，数组会被拼起来：默认配置里的数组在前，你写的接在后面。想让数组整体替换，打开 `replaceArrays`：

```ts
UniManifest({
  replaceArrays: true,
})
```

```ts
export default defineManifestConfig({
  'app-plus': {
    distribute: {
      android: {
        // 关闭 replaceArrays 时会和默认配置里的权限合并，打开后只保留这一条
        permissions: ['<uses-permission android:name="android.permission.INTERNET"/>'],
      },
    },
  },
})
```

## 提前生成

uni-app 在 Vite 的 `config` 钩子里读 `manifest.json`，早于本插件的写入。需要第一次启动就读到新内容时，用 `prepare()` 在 Vite 启动前生成：

```ts
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig(async () => ({
  plugins: [
    await UniManifest().prepare(),
    // ...其它插件
  ],
}))
```

细节见 [prepare()](/api/prepare)。

## 输出格式

```ts
UniManifest({
  minify: true, // 压缩成一行
  insertFinalNewline: true, // 末尾补一个换行
  indent: 2, // 缩进，number 或字符串（如 '\t'）
  eol: '\r\n', // 换行符，'\n' 或 '\r\n'
})
```

内容没变化时插件跳过写入，避免触发下游重编译。全部选项见[插件选项](/api/options)。
