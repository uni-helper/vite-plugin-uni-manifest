<a href="https://uni-helper.js.org/vite-plugin-uni-manifest"><img src="https://cdn.jsdelivr.net/gh/uni-helper/vite-plugin-uni-manifest@main/banner.svg" alt="banner" width="100%"/></a>

# vite-plugin-uni-manifest

<p align="center">
  <a href="https://github.com/uni-helper/vite-plugin-uni-manifest/blob/main/LICENSE"><img src="https://img.shields.io/github/license/uni-helper/vite-plugin-uni-manifest?style=for-the-badge&labelColor=005947&color=eee" alt="License"></a>
  <a href="https://github.com/uni-helper/vite-plugin-uni-manifest/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/vite-plugin-uni-manifest?style=for-the-badge&labelColor=005947&color=eee" alt="Stars"></a>
  <a href="https://npmx.dev/package/@uni-helper/vite-plugin-uni-manifest"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-manifest?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Version"></a>
  <a href="https://npmx.dev/package/@uni-helper/vite-plugin-uni-manifest"><img src="https://img.shields.io/npm/dm/@uni-helper/vite-plugin-uni-manifest?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Downloads"></a>
</p>
<p align="center">
  <a href="https://github.com/kejunmao"><img src="https://img.shields.io/badge/Author-KeJun-blue?style=for-the-badge" alt="Author"></a>
  <a href="https://github.com/ModyQyW"><img src="https://img.shields.io/badge/Maintainer-ModyQyW-blue?style=for-the-badge" alt="Maintainer"></a>
</p>

使用 TypeScript 来编写 uni-app 的 manifest.json。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-manifest"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

> **请考虑持续[赞助](https://github.com/ModyQyW/sponsors)以维持该项目的持续健康发展，非常感谢！🙏**

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

## 使用

📖 请阅读[在线文档](https://uni-helper.js.org/vite-plugin-uni-manifest)或各包 README 文档了解使用方法。

```ts
// vite.config.mts
import Uni from '@uni-helper/plugin-uni'
// 或者
// import dcloudioUni from '@dcloudio/vite-plugin-uni'
// const Uni = dcloudioUni.default || dcloudioUni
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniManifest(), // 需要在 Uni() 之前调用
    Uni()
  ],
})
```

## 关联项目

- [uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) - 为 Vite 下的 uni-app 提供基于文件系统的路由
- [uni-helper/vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform) - 基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件
- [uni-helper/vite-plugin-uni-platform-modifier](https://github.com/uni-helper/vite-plugin-uni-platform-modifier) - 为属性、指令提供平台修饰符并按需编译
- [uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) - 为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统
- [uni-ku/root](https://github.com/uni-ku/root) - 解决 UniApp 无法使用根部组件问题

## 包

| 包 | 说明 |
| --- | --- |
| [`@uni-helper/vite-plugin-uni-manifest`](./packages/core/) | Vite 插件，从 `manifest.config.*` 生成 `manifest.json` |
| [`@uni-helper/uni-manifest-types`](./packages/types/) | `manifest.json` 的 TypeScript 类型 |
| [`@uni-helper/manifest-json-schema`](./packages/schema/) | `manifest.json` 的 JSON Schema（由 types 生成） |

## 参与贡献

请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解本地开发、测试与提交规范；[AGENTS.md](./AGENTS.md) 面向 AI 助手。

## 许可证

本项目基于 [MIT](./LICENSE) 许可发布。
