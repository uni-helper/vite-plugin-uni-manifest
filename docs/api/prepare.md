# prepare()

<Badge type="tip" text="v0.7.0 新增" />

`prepare()` 在 Vite 启动前完成一次生成，用在 uni-app 已经读走 `manifest.json` 的场景。

```ts
import Uni from '@uni-helper/plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig(async () => ({
  plugins: [
    await UniManifest().prepare(),
    Uni(),
  ],
}))
```

`defineConfig` 需要改成异步工厂：数组按顺序求值，`await` 完成后后面的插件才创建。

也可以分步调用：

```ts
const manifest = UniManifest(options)
await manifest.prepare()
// 之后把 manifest 放进 plugins
```

`prepare()` 返回同一个插件实例，所以能直接写在 `plugins` 数组里。

## 为什么需要它

`@dcloudio/vite-plugin-uni` 在 Vite 的 `config` 钩子里通过 `parseManifestJsonOnce` 读 `manifest.json`，读完就缓存。本插件最早只能在 `configResolved` 里写，而这个钩子晚于 `config`，首次启动时 uni-app 读到的仍是磁盘上的旧文件。

`prepare()` 在 Vite 加载配置之前就把文件写好，uni-app 启动时读到的就是新内容。Vite 接管时会再写一次，writer 发现内容相同会跳过，不产生多余写入。

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cwd` | `string` | 插件选项里的 `cwd`，没有时 `VITE_ROOT_DIR`，再没有时 `process.cwd()` | 查找 `manifest.config.*` 的目录 |
| `mode` | `string` | `process.env.NODE_ENV` | 读取 `.env.{mode}` 用的 mode，只在打开 `dotenv` 时有用 |

```ts
await UniManifest({ dotenv: true }).prepare({ cwd: 'packages/app', mode: 'staging' })
```

## 行为

- 只加载一次配置并写一次文件，不创建文件监听器。
- 找不到 `manifest.config.*` 时不写文件，项目里手写的 `manifest.json` 保持原样。
- 配置导出的内容不是对象时抛错，不会写出 uni-app 读不懂的 JSON。
- 写目录不存在时会创建。
- 返回同一个插件实例，可以继续交给 Vite。

## 限制

- **`mode` 要和 Vite 一致**。`prepare()` 早于 Vite 解析配置，拿不到 `config.mode`，只能默认 `process.env.NODE_ENV`。如果命令里用了 `--mode staging`，插件写出的文件来自 `.env.production`，Vite 接管后才会换成 `.env.staging` 那份。第一次启动读到的是旧模式的值，所以要显式传 `{ mode: 'staging' }`。
- **准备到监听建立之间的修改不保证被发现**。`prepare()` 只写一次，之后的同步靠 Vite 接管后的 watcher。改完配置要再动一次文件，或者重新执行命令。
- **不会刷新下游插件已经缓存的值**。需要完整配置的插件应该在 `prepare()` 之后创建。

## 和其它方案的关系

`prepare()` 覆盖单插件、单进程的常见场景。如果同时要生成多个文件、需要子进程隔离，或者项目已经在用 [`@uni-helper/unh`](https://uni-helper.cn/unh/auto-generate)，继续用 `unh` 即可。手工脚本的方案见[常见问题](/other/faq#写入配置晚于-uni-app-读取配置)。
