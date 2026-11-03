# 常见问题

## 写入配置晚于 uni-app 读取配置

`@dcloudio/vite-plugin-uni` 在 Vite 的 `config` 钩子里通过 `parseManifestJsonOnce` 读取 `manifest.json`，读完就缓存。本插件在更晚的 `configResolved` 里写，首次启动读到的是旧文件。

`config` 早于 `configResolved`，插件设置 `enforce: 'pre'` 也只能在 `configResolved` 内部抢先，无法早于 `config`。核心矛盾是必须在 uni-app 进程启动前把文件生成好。

按推荐度排列：

### 方案一：prepare()

在 `vite.config.ts` 里等一次生成：

```ts
export default defineConfig(async () => ({
  plugins: [
    await UniManifest().prepare(),
    Uni(),
  ],
}))
```

参数、行为和限制见 [prepare()](/api/prepare)。

### 方案二：@uni-helper/unh

[`unh`](https://uni-helper.cn/unh/auto-generate) 在调用 `uni dev/build` 前生成文件，再 spawn 子进程，顺带覆盖其它需要预生成的插件。

```jsonc
// package.json
{
  "scripts": {
    "dev": "unh dev",
    "build": "unh build"
  }
}
```

```ts
// unh.config.ts
import { defineConfig } from '@uni-helper/unh'

export default defineConfig({
  autoGenerate: {
    manifest: true,
  },
})
```

### 方案三：自己写脚本

在 `uni` 命令前跑一个脚本，用插件导出的 `generateManifest()` 写盘：

```bash
pnpm i -D tsx
```

```ts
// scripts/generate-manifest.ts
import { resolve } from 'node:path'
import { generateManifest } from '@uni-helper/vite-plugin-uni-manifest'

await generateManifest(
  {
    outDir: resolve(process.cwd(), 'src'),
  },
  process.env.NODE_ENV,
)
```

脚本在 uni 进程之外运行，不受钩子顺序影响。用 `&&` 串到命令前面：

```jsonc
{
  "scripts": {
    "dev:h5": "tsx scripts/generate-manifest.ts && uni",
    "build:mp-weixin": "tsx scripts/generate-manifest.ts && uni build -p mp-weixin"
  }
}
```

这种方式只生成一次，开发期间改配置需要重新执行脚本。插件仍可以被 Vite 加载，用于运行期间的同步；首次启动由脚本兜底。

## 改完 manifest.config.ts 为什么要重启

uni-app 只在启动时读一次 `manifest.json` 并做进程级缓存。文件变了既不会触发 HMR，也不会触发整页刷新，即使 `vite build --watch` 重建也还是用旧配置。插件能保证文件是最新的，但没法让已经启动的 uni-app 重新读。

所以要自动重启，得监视生成的 `manifest.json`：

```bash
pnpm i -D nodemon
```

```jsonc
{
  "scripts": {
    "dev:h5": "nodemon -e json --watch src/manifest.json --exec \"uni\""
  }
}
```

## 配置文件导入的模块不会热更新

c12 的监听范围只有 `manifest.config.*` 这一组候选文件名。配置里 `import` 的本地模块不在监听范围内：

```ts
// manifest.config.ts
import { mpWeixin } from './manifest/mp-weixin' // 改这个文件不会触发重新生成
```

改完后碰一下 `manifest.config.ts`，或者重启 dev server。`prepare()` 也不解决这个问题，它同样只读一次。

## 改完 .env 为什么要重启

打开 `dotenv` 后，`.env` 系列文件在插件启动时读一次，之后不会监听。改完要重启，和 Vite 自身对 `.env` 的处理一致。

## 会不会覆盖我手写的 manifest.json

不会。插件只在找到 `manifest.config.*` 时才写文件。装好插件但还没创建配置文件的阶段，构建不会动你的 `manifest.json`。

配置导出的内容不是对象时（比如误写成数组），插件抛 `TypeError` 并保留原文件。

## monorepo 里怎么写路径

用 `cwd` 指向应用目录，`outDir` 写相对路径：

```ts
UniManifest({
  cwd: 'packages/app',
  outDir: 'src',
})
```

`cwd` 默认是 `VITE_ROOT_DIR`，没有时回退到 `process.cwd()`。相对 `outDir` 以 `cwd` 为基准，和配置文件的位置一致。

## debug 打开后，其它日志为什么还在

插件用 obug 的 `enable()` 打开自己的命名空间，随后把 `process.env.DEBUG` 还原成调用前的值。你自己的 `DEBUG` 设置不受影响。

## Windows 上的路径

生成和日志里的路径是 POSIX 风格（`D:/project/src/manifest.json`），内部用 Vite 的 `normalizePath` 归一化。自己写脚本比较路径时先做同样的归一化，否则会因分隔符不同判等失败。

## 输出目录不存在会怎样

插件会创建它，包括多级目录。不需要提前 `mkdir`。
