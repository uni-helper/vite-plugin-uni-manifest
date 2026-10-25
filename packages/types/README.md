# @uni-helper/uni-manifest-types

<p align="center">
  <a href="https://github.com/uni-helper/vite-plugin-uni-manifest/blob/main/LICENSE"><img src="https://img.shields.io/github/license/uni-helper/vite-plugin-uni-manifest?style=for-the-badge&labelColor=005947&color=eee" alt="License"></a>
  <a href="https://github.com/uni-helper/vite-plugin-uni-manifest/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/vite-plugin-uni-manifest?style=for-the-badge&labelColor=005947&color=eee" alt="Stars"></a>
  <a href="https://npmx.dev/package/@uni-helper/uni-manifest-types"><img src="https://img.shields.io/npm/v/@uni-helper/uni-manifest-types?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Version"></a>
  <a href="https://npmx.dev/package/@uni-helper/uni-manifest-types"><img src="https://img.shields.io/npm/dm/@uni-helper/uni-manifest-types?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Downloads"></a>
</p>
<p align="center">
  <a href="https://github.com/ModyQyW"><img src="https://img.shields.io/badge/Author%20%26%20Maintainer-ModyQyW-blue?style=for-the-badge" alt="Author & Maintainer"></a>
</p>

为 `uni-app` 的 `manifest.json` 提供 TypeScript 类型。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-manifest"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

> **请考虑持续[赞助](https://github.com/ModyQyW/sponsors)以维持该项目的持续健康发展，非常感谢！🙏**

## 安装

```bash
pnpm add @uni-helper/uni-manifest-types
```

## 代码内使用

```ts
import type { AndroidPermissionName, AppHarmonyDistributeSigningConfig } from '@uni-helper/uni-manifest-types'
```

完整类型请参考 [./src/index.ts](./src/index.ts)。

## 关联项目

- [@uni-helper/vite-plugin-uni-manifest](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/core) - 使用 TypeScript 编写 `uni-app` 的 `manifest.json`
- [@uni-helper/manifest-json-schema](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/schema) - 为 uni-app 的 manifest.json 提供 schema
- [uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) - 为 Vite 下的 uni-app 提供基于文件系统的路由
- [uni-helper/vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform) - 基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件
- [uni-helper/vite-plugin-uni-platform-modifier](https://github.com/uni-helper/vite-plugin-uni-platform-modifier) - 为属性、指令提供平台修饰符并按需编译
- [uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) - 为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统
- [uni-ku/root](https://github.com/uni-ku/root) - 解决 uni-app 无法使用根部组件问题

## 参与贡献

请阅读仓库根目录的 [CONTRIBUTING.md](https://github.com/uni-helper/vite-plugin-uni-manifest/blob/main/CONTRIBUTING.md) 了解本地开发、测试与提交规范。

## 许可证

本项目基于 [MIT](https://github.com/uni-helper/vite-plugin-uni-manifest/blob/main/LICENSE) 许可发布。
