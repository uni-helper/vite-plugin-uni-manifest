# 编程接口

包的入口除了插件工厂，还导出下面这些函数和类型。它们和插件内部走同一套实现，用在脚本、测试或自定义编排里。

## 插件工厂

```ts
import type { UniManifestPlugin, UserOptions } from '@uni-helper/vite-plugin-uni-manifest'

declare function VitePluginUniManifest(options?: UserOptions): UniManifestPlugin
```

默认导出和具名导出是同一个函数。返回的实例带 `prepare()`，见 [prepare()](/api/prepare)。

## 生成一次

```ts
import type { UserOptions } from '@uni-helper/vite-plugin-uni-manifest'

declare function generateManifest(options?: UserOptions, mode?: string): Promise<void>
```

加载配置并写一次 `manifest.json`，不创建监听器。`mode` 用于 `.env.{mode}`，默认 `process.env.NODE_ENV`。一次性构建用的就是它。

## 持续监听

```ts
import type { ManifestWatcher, UserOptions } from '@uni-helper/vite-plugin-uni-manifest'

declare function createManifestWatcher(options?: UserOptions, mode?: string): Promise<ManifestWatcher>

const watcher = await createManifestWatcher()
watcher.options // 补齐默认值后的选项
await watcher.unwatch() // 停止监听
```

监听 `manifest.config.*`，每次改动写回 `manifest.json`，同时完成首次写入。插件自身不调用 `unwatch()`：`buildEnd` 在每次重建后都会触发，在那里关闭监听会让 watch 期间的改动不再同步，监听器随进程退出释放。自己创建 watcher 的脚本需要负责调用 `unwatch()`。

## 更低层的写入

```ts
import { resolveOutputSpec, writeManifestJson } from '@uni-helper/vite-plugin-uni-manifest'

const spec = resolveOutputSpec({
  cwd: process.cwd(),
  outDir: 'src',
  minify: false,
  indent: 2,
  eol: '\n',
  insertFinalNewline: true,
})

writeManifestJson({ name: 'my-project' }, spec)
```

`resolveOutputSpec()` 把选项折成 `OutputSpec`：`minify` 变成 `indent: 0`，其余字段原样传递。`writeManifestJson()` 负责目录优先级、格式化、幂等写入和建目录。

写入前会检查内容是不是对象，数组或原始值直接抛 `TypeError`，不会覆盖已有的 `manifest.json`。

## 类型

```ts
import type {
  DebugType,
  ManifestWatcher,
  Options,
  OutputSpec,
  PrepareOptions,
  ResolvedOptions,
  UniManifestPlugin,
  UserManifestConfig,
  UserOptions,
} from '@uni-helper/vite-plugin-uni-manifest'
```

| 类型 | 说明 |
| --- | --- |
| `Options` | 全部选项，字段都有默认值 |
| `UserOptions` | `Options` 的 `Partial`，插件工厂接收的类型 |
| `ResolvedOptions` | 补齐默认值后的选项 |
| `DebugType` | 调试类别：`'options' \| 'config' \| 'writer'` |
| `OutputSpec` | writer 需要的输出规格：`cwd`、`outDir`、`indent`、`eol`、`finalNewline` |
| `PrepareOptions` | `prepare()` 的参数：`cwd`、`mode` |
| `UniManifestPlugin` | 插件实例，带 `prepare()` |
| `ManifestWatcher` | watcher：`options` 和 `unwatch()` |
| `UserManifestConfig` | 配置文件的内容类型，来自 `@uni-helper/uni-manifest-types` |

`UserManifestConfig` 连同各平台字段都从类型包 re-export，`defineManifestConfig()` 就是类型提示用的辅助函数：

```ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  name: 'my-project',
})
```
