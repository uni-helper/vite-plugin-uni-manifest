---
title: "vite-plugin-uni-manifest 0.7：在 uni-app 读取之前生成"
description: "0.7 新增 prepare()、dotenv 和 replaceArrays，让 manifest.json 在 uni-app 读取之前就准备好、能读 .env、数组整体覆盖；同时修掉几个会覆盖文件或让构建失败的边角，移除了三个导出。"
date: "2026-11-03"
author: ModyQyW
authorUrl: "https://github.com/ModyQyW"
outline: deep
---

# vite-plugin-uni-manifest 0.7：在 uni-app 读取之前生成

<p class="blog-post-meta">{{ $frontmatter.date }} · <a :href="$frontmatter.authorUrl" target="_blank" rel="noreferrer noopener">{{ $frontmatter.author }}</a></p>

![UNI MANIFEST 0.7 的封面：文档图形外面套着一个箭头向前的框](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-11-03-vite-plugin-uni-manifest-0-7-cover.webp)

0.5 处理的是模块格式和选项，0.6 把 uni-app x 的类型补齐。那之后我收到的反馈集中在两件事：`manifest.config.ts` 读不到 `.env` 里的值，默认配置里的数组总会跟你写的拼在一起。再往下看，还有一批「装上去就可能出问题」的边角：没有配置文件时会把项目里手写的 `manifest.json` 覆盖成默认值，`outDir` 指向不存在的目录会让构建直接失败，打开调试日志会改掉你的 `DEBUG` 变量。

0.7 主要解决这两类问题。时序上的老毛病也终于有了内置方案。

## 升级前先看：四个破坏性变更

### `writeManifestJson` 改用输出规格

0.6 的第二个参数是用户选项，`minify`、`indent`、`eol` 由 writer 再算一遍默认值，和插件内部的解析重复。0.7 改成接收已经解析好的 `OutputSpec`，`minify` 在这一步折成 `indent: 0`。

```ts
// 0.6
import { writeManifestJson } from '@uni-helper/vite-plugin-uni-manifest'

writeManifestJson(config, { minify: true, indent: 2, eol: '\n' })
```

```ts
// 0.7
import { resolveOutputSpec, writeManifestJson } from '@uni-helper/vite-plugin-uni-manifest'

const spec = resolveOutputSpec({
  cwd: process.cwd(),
  minify: true,
  indent: 2,
  eol: '\n',
  insertFinalNewline: false,
})
writeManifestJson(config, spec)
```

只在直接调用这个函数时需要改，插件内部已经换过来了。

### 相对 `outDir` 改为基于 `cwd`

0.6 里相对的 `outDir` 基于 `process.cwd()` 解析，而 `cwd` 选项指的是项目根。monorepo 里从仓库根执行命令时，两者不是一回事：

```ts
UniManifest({
  cwd: 'packages/app',
  outDir: 'src', // 0.7 写入 packages/app/src，0.6 写入 <仓库根>/src
})
```

单包项目里两个基准相同，不受影响。

### 没有配置文件时不再写文件

0.6 找不到 `manifest.config.*` 时会用内置默认配置写一份 `manifest.json`。装了插件但还没建配置文件的阶段，项目里手写的 `manifest.json` 就在一次构建后被换成了空壳，`appid`、权限这些配置全部消失。

0.7 在 c12 报告没有配置文件时跳过写入，初次写入和运行期间配置文件被删掉的情况都跳过。

### 移除三个导出

| 移除 | 替代 |
| --- | --- |
| `ensureManifestJsonExists()` | 无。它没有调用方，行为还和「配置加载失败不留占位文件」的约定相反 |
| `ManifestContext` | `createManifestWatcher()` |
| `debug`（入口导出） | 无。日志对象改为内部使用，`DebugType` 仍然导出 |

顺带一提，`logger.ts` 里的 `debug` 以前通过 `export *` 成了公开接口，使用者可以直接改插件内部的 logger。0.7 把这一行去掉了，其它导出不变。

## 新能力

### `prepare()`：在 uni-app 读取之前生成

`@dcloudio/vite-plugin-uni` 在自己的 `config` 钩子里通过 `parseManifestJsonOnce` 读走 `manifest.json` 并缓存，本插件最早只能在 `configResolved` 里写。这个时序问题在[常见问题](/other/faq#写入配置晚于-uni-app-读取配置)里从 0.5 起就只能靠 [@uni-helper/unh](https://uni-helper.cn/unh/auto-generate) 或自己写脚本兜底。

0.7 给插件加了 `prepare()`，在 Vite 加载配置之前先跑一次完整生成：

```ts
// vite.config.mts
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

数组按顺序求值，`Uni()` 会在准备完成后才创建。Vite 接管时会再写一次，writer 发现内容相同会跳过，不产生多余写入。

`prepare()` 返回同一个插件实例，也可以分步调用。`cwd` 和 `mode` 可以覆盖这一次运行，`mode` 决定读哪个 `.env.{mode}`。默认取 `process.env.NODE_ENV`，命令里用了 `--mode staging` 时要显式传 `{ mode: 'staging' }`，否则准备阶段读的是 `.env.production`。

![0.6 的顺序：config 钩子先读到旧文件，configResolved 才写入；0.7 用 prepare() 提前写好新文件](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-11-03-vite-plugin-uni-manifest-prepare-timing.webp)

需要子进程隔离、同时生成多个文件的场景，`unh` 仍然更合适。

### `dotenv`：让 `manifest.config.ts` 读到 `.env`

c12 的 `dotenv` 是 opt-in，插件之前没传，所以 `.env` 和 `.env.{mode}` 里的值进不来。0.7 加了 `dotenv` 选项：

```ts
UniManifest({ dotenv: true })
```

读取交给 Vite 自己的 `loadEnv`，文件和解析规则跟 Vite 完全一致，空前缀，变量名不受 `VITE_` 限制：

| 文件 | 说明 |
| --- | --- |
| `.env` | 所有模式共用 |
| `.env.local` | 本地覆盖，通常不提交 |
| `.env.{mode}` | 当前 mode 专用 |
| `.env.{mode}.local` | 当前 mode 的本地覆盖 |

后读的覆盖先读的，`process.env` 里已有的值优先于文件。文件只在启动时读一次，改完 `.env` 要重启。

![.env、.env.local、.env.{mode}、.env.{mode}.local 依次合并进 process.env，再交给 manifest.config.ts](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-11-03-vite-plugin-uni-manifest-dotenv-order.webp)

### `replaceArrays`：数组整体覆盖

c12 默认的合并策略是 `defu`，数组会被拼接：默认配置里的数组在前，你写的接在后面。想让数组整体替换，打开 `replaceArrays`：

```ts
UniManifest({ replaceArrays: true })
```

```ts
export default defineManifestConfig({
  'app-plus': {
    distribute: {
      android: {
        // 关闭时和默认配置里的权限拼接，打开后只保留这一条
        permissions: ['<uses-permission android:name="android.permission.INTERNET"/>'],
      },
    },
  },
})
```

对象照常深合并，标量以你写的为准，只有数组的处理变了。

![defu 把用户数组和默认数组拼在一起，replaceArrays 只用用户写的数组](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-11-03-vite-plugin-uni-manifest-replace-arrays.webp)

## 监听与写入的收尾

一次性构建以前也会建一个 chokidar 监听器，等到 `buildEnd` 才关掉。这个监听器对一次构建没有用处，在文件描述符紧张的 macOS 环境里还会推到 `EMFILE`（[#88](https://github.com/uni-helper/vite-plugin-uni-manifest/issues/88)）。0.7 只在构建会持续时创建监听器，一次性构建只加载一次配置。

![一次性构建只加载一次配置，不建监听器；watch 构建保留监听器，重建期间继续同步](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-11-03-vite-plugin-uni-manifest-build-watcher.webp)

watch 构建这边同期修掉了一个更隐蔽的问题：插件原来在 `buildEnd` 里关闭监听，而 `buildEnd` 在每次重建后都会触发，所以 uni-app 小程序开发时改 `manifest.config.ts`，第一次构建之后就不再有反应。0.7 不再主动关闭监听，交给进程退出释放。

剩下的是几个会让构建失败或让人困惑的边角：

- `outDir` 指向不存在的目录时先建出来，不再抛 `ENOENT`
- 配置导出的内容不是对象时抛 `TypeError` 并保留原文件。数组以前会被原样写进 `manifest.json`
- 打开 `debug` 不再覆盖你的 `process.env.DEBUG`，同进程里其它 obug 日志照常工作
- 生成路径的优先级（`outDir` → `UNI_INPUT_DIR` → `cwd/src`）和格式化规则集中到 writer 里，`paths.ts` 并入，少一个模块

## 文档与工程

仓库里新增了 VitePress 文档站，按指南、API、其它分开，带选项表、`prepare()` 的参数与限制、编程接口、FAQ 和 0.6 到 0.7 的迁移指南，配了 Netlify 与 Cloudflare Pages 的部署配置。上一篇 0.5 和 0.6 的更新说明也迁到了站内博客。

CI 和发布流程补了三道闸：`pnpm build` 之后比对 `packages/schema/schema.json` 与提交是否一致，发布流程先跑构建和测试，`changelogithub` 锁定大版本。

内部的 `debug` 换成了 [obug](https://github.com/sxzz/obug)，一个 ESM 原生、自带类型的 debug fork，`@types/debug` 一并去掉。产出的日志格式不变。

测试文件从 6 个增加到 7 个，用例从 46 个增加到 64 个。新增的 `load-config.test.ts` 和 `prepare.test.ts` 用真实 c12、真实 `.env` 和临时目录跑完整加载流程，不再是只断言 mock 的调用参数。

## 升级清单

1. 升级依赖，确认运行时不低于 Node 22.22.2 或 24.15.0，然后跑一次构建，确认 `manifest.json` 的差异。
2. 直接调用 `writeManifestJson()` 的地方改用 `resolveOutputSpec()`。
3. monorepo 里检查相对的 `outDir`，改成相对 `cwd` 的写法。
4. 用 `ensureManifestJsonExists()`、`ManifestContext` 或入口导出的 `debug` 的地方，按上表替换。
5. 想要 `.env` 或数组覆盖的，打开 `dotenv` 和 `replaceArrays`；`--mode` 场景记得给 `prepare()` 传 `mode`。

完整规则和旧写法对照见[迁移指南](/other/migration)。

## 致谢

感谢 [@ByteRax](https://github.com/ByteRax) 报告构建期多余监听器导致的 `EMFILE`（[#88](https://github.com/uni-helper/vite-plugin-uni-manifest/issues/88)），并提交了[#89](https://github.com/uni-helper/vite-plugin-uni-manifest/pull/89) 把一次性构建和 watch 构建分开。那笔 PR 里对 `config.command` 的判断后来补上了 `build.watch` 的检查，因为 uni-app 小程序开发也是用 Vite 的 build API 加 watch。

`.env` 加载和数组合并的需求来自 [#91](https://github.com/uni-helper/vite-plugin-uni-manifest/issues/91)，实现时参照了 [oiyo](https://oiyo.js.org) 里的写法，谢谢 [@skiyee](https://github.com/skiyee) 把这个项目开源出来。也谢谢在 issue 里提交复现和反馈的朋友。

## 相关链接

- [vite-plugin-uni-manifest 文档](/guide/introduction)
- [vite-plugin-uni-manifest 仓库](https://github.com/uni-helper/vite-plugin-uni-manifest)
- [问题反馈](https://github.com/uni-helper/vite-plugin-uni-manifest/issues)

---

[← 返回博客](/blog/)
