---
title: "vite-plugin-uni-manifest 更新了什么"
description: "vite-plugin-uni-manifest 十来天里接连发布 v0.5 和 v0.6：转向 ESM-only、新增多个插件选项、补齐 uni-app x 相关类型。本文介绍改动和升级方式。"
date: "2026-09-01"
author: ModyQyW
authorUrl: "https://github.com/ModyQyW"
outline: deep
---

# vite-plugin-uni-manifest 更新了什么

<p class="blog-post-meta">{{ $frontmatter.date }} · <a :href="$frontmatter.authorUrl" target="_blank" rel="noreferrer noopener">{{ $frontmatter.author }}</a></p>

![vite-plugin-uni-manifest 0.5 和 0.6 的更新](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-08-28-vite-plugin-uni-manifest-0-5-0-6-cover.webp)

`vite-plugin-uni-manifest`，全称是 `@uni-helper/vite-plugin-uni-manifest`，它让你可以用 TypeScript 书写和校验 uni-app 的全局文件 `manifest.json`，理论上和 `manifest.json` 的字段一比一对齐。

我在 2026 年 8 月 3 日发布了 v0.5.0，又在 8 月 14 日发布了 v0.6.0。十来天连发两个大版本，可能大部分朋友还停留在 v0.4，所以我想专门写这篇文章介绍相关的改动和升级。

## 都改了什么

v0.5 版本着重处理产物的模块格式和插件选项。

v0.5 版本之前，`vite-plugin-uni-manifest` 同时支持 CJS 和 ESM。现在 v0.5 只支持 ESM 了，包体积更小，也更符合社区的演进方向。要处理这个破坏性改动，你可能需要调整你的 Vite 配置文件。

```ts
// vite.config.mts

// DCloudio 官方仍然只提供 CJS 包，所以需要额外处理
import dcloudioUni from '@dcloudio/vite-plugin-uni'
// 也可以直接使用我们提供的 ESM 包装
// import Uni from '@uni-helper/plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

const Uni = dcloudioUni.default || dcloudioUni

export default defineConfig({
  plugins: [
    UniManifest(), // 需要在 Uni() 之前调用
    Uni()
  ],
})
```

![v0.4 到 v0.5：从 CJS 加 ESM 双出口变为 ESM-only](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-08-28-vite-plugin-uni-manifest-esm-only.webp)

v0.5 版本之前，`vite-plugin-uni-manifest` 只有寥寥几个插件选项 `minify`、`insertFinalNewline`、`cwd`。为了增强定制能力、处理部分边缘情况，v0.5 新增了几个插件选项。

`indent` 和 `eol`（均为 v0.5.2 新增）分别自定义缩进和换行符，默认是两个空格和 `\n`。多平台协作时，这两项能让生成产物的格式稳定下来，减少无谓的文件冲突。

`outDir`（v0.5.1 新增）指定生成的 `manifest.json` 的输出目录，默认写入 uni-app 的输入目录（`UNI_INPUT_DIR`，通常是应用的 `src/`），和 `cwd` 搭配使用，monorepo 场景下会从容很多。

```ts
// vite.config.mts
import { resolve } from 'node:path'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniManifest({
      cwd: resolve(import.meta.dirname, 'packages/app'), // 从该目录查找 manifest.config.ts
      // 如需把 manifest.json 输出到其他位置，再配置 outDir
      // outDir: resolve(import.meta.dirname, 'packages/app/src'),
    }),
  ],
})
```

启用 `debug` 选项（v0.5.7 新增）会输出分类的调试日志，自己排查问题或向社区反馈时都更好定位。

![v0.5 新增的 4 个插件选项及引入版本](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-08-28-vite-plugin-uni-manifest-plugin-options.webp)

比起 v0.5 版本，v0.6 版本做的事情就专一一些。社区曾多次提起 uni-app x 并请求支持，这个版本正式响应了社区请求，补齐了 `uni-app x` 相关的类型。

在插件配置文件（比如 `manifest.config.ts`）中，现在可以带完整类型提示地书写 `uni-app-x`、`app` 等 `uni-app x` 相关的顶层字段。存在 `uni-app-x` 字段，就表示这是一个 `uni-app x` 项目。

算下来这次一共新增了 6 个类型模块，所有注释也都重新整理了一遍。与之关联的两个 NPM 包也同步更新：提供纯粹 TypeScript 类型的 `@uni-helper/uni-manifest-types` 导出类型从 40 个增加到 72 个，提供 JSON Schema 的 `@uni-helper/manifest-json-schema` 净增约 1100 行。

![v0.6 类型规模：导出类型从 40 个增加到 72 个，新增 6 个类型模块](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-08-28-vite-plugin-uni-manifest-types-growth.webp)

> 如果你只想使用 `manifest.json` 对应的 TypeScript 类型或 JSON Schema，而不想使用相应的 Vite 插件，`@uni-helper/uni-manifest-types` 和 `@uni-helper/manifest-json-schema` 就是你正在寻找的 NPM 包。

```ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // name、appid 等必填字段省略
  // 存在 uni-app-x 节点，表示这是一个 uni-app x 项目
  'uni-app-x': {
    'flex-direction': 'column',
    'vapor': false,
  },
  // uni-app x 的 App 端配置
  'app': {
    // 图标、模块、分发等配置
  },
})
```

部分类型在你的项目里可能触发 TypeScript 报错，用 `vue-tsc --noEmit` 或 `tsc --noEmit` 跑一遍就能把问题暴露出来，手动调整或丢给 AI 调整都很轻松。查看 [Deepwiki](https://deepwiki.com/uni-helper/vite-plugin-uni-manifest) 可以获取 AI 生成的文档供人类阅读，[context7](https://context7.com/uni-helper/vite-plugin-uni-manifest) 也提供了索引供 AI 读取，你还可以把 [仓库](https://github.com/uni-helper/vite-plugin-uni-manifest) 拉取下来并提供给 AI 让 AI 自由发挥，这里不再赘述。

## 其它的一些碎碎念

我也想吐一下苦水🤮

uni-app 的文档实在过于分散和跳跃，一个配置的信息经常分布在好几处，措辞也不完全一致。

我专门写了一个简单的 Skill，让 AI 先做第一轮同步更新，我再来做二次核对。AI 第一轮操作很快，我的部分却足足耗费了三晚的业余时间。真希望 DCloudio 能下点心思好好读一读自家的文档感受痛苦，再好好优化一下自家的文档吧。

![AI 先做第一轮同步更新，我再花三晚核对](https://cdn.jsdelivr.net/gh/ModyQyW/static@main/2026-08-28-vite-plugin-uni-manifest-ai-doc-review.webp)

最后照例打一下广告。如果这篇文章或者 uni-helper 系列插件对你有帮助，请考虑 [持续赞助我](https://modyqyw.top/sponsors)，这有利于项目的持续维护。我会给 uni-helper 服务器续费以及二次分配给 uni-helper 团队成员和其它开源项目成员，非常感谢🙏

希望对你有所帮助！下次见！

---

- [vite-plugin-uni-manifest 文档](/guide/introduction)
- [vite-plugin-uni-manifest 仓库](https://github.com/uni-helper/vite-plugin-uni-manifest)
- [问题反馈](https://github.com/uni-helper/vite-plugin-uni-manifest/issues)

---

[← 返回博客](/blog/)
