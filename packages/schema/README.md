# @uni-helper/manifest-json-schema

<p style="text-align: center">
  <a href="https://github.com/uni-helper/vite-plugin-uni-manifest/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/vite-plugin-uni-manifest?colorA=005947&colorB=eee&style=for-the-badge" alt="Stars"></a>
  <a href="https://npmx.dev/package/@uni-helper/manifest-json-schema"><img src="https://img.shields.io/npm/dm/@uni-helper/manifest-json-schema?colorA=005947&colorB=eee&style=for-the-badge" alt="Downloads"></a>
  <a href="https://npmx.dev/package/@uni-helper/manifest-json-schema"><img src="https://img.shields.io/npm/v/@uni-helper/manifest-json-schema?colorA=005947&colorB=eee&style=for-the-badge" alt="NPM Version"></a>
</p>
<p style="text-align: center">
  <a href="https://github.com/kejunmao"><img src="https://img.shields.io/badge/Author-KeJun-blue?style=for-the-badge" alt="Author"></a>
  <a href="https://github.com/ModyQyW"><img src="https://img.shields.io/badge/Maintainer-ModyQyW-blue?style=for-the-badge" alt="Author"></a>
</p>

为 `uni-app` 的 `manifest.json` 提供 schema。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-manifest"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

> **请考虑持续[赞助](https://github.com/ModyQyW/sponsors)以维持该项目的持续健康发展，非常感谢！🙏**

## 安装

```bash
pnpm add @uni-helper/manifest-json-schema
```

## 编辑器提示

为 `manifest.json` 启用自动补全与校验，推荐安装 [`uni-app-schemas-vscode`](https://github.com/uni-helper/uni-app-schemas-vscode) 扩展。

- VS Code：<https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-app-schemas-vscode>
- Open VSX（Cursor / VSCodium 等）：<https://open-vsx.org/extension/uni-helper/uni-app-schemas-vscode>

不想安装扩展时，也可手动在 `.vscode/settings.json` 关联 schema：

```json
{
  "json.schemas": [
    {
      "fileMatch": ["manifest.json"],
      "url": "https://unpkg.com/@uni-helper/manifest-json-schema/schema.json"
    }
  ]
}
```

除了 unpkg，还可以使用 jsdelivr。

```json
{
  "json.schemas": [
    {
      "fileMatch": ["manifest.json"],
      "url": "https://cdn.jsdelivr.net/npm/@uni-helper/manifest-json-schema/schema.json"
    }
  ]
}
```

## 代码内使用

```js
import ManifestSchema from '@uni-helper/manifest-json-schema/schema.json'

console.log(ManifestSchema)

// {
//   "$ref": "#/definitions/ManifestConfig",
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "definitions": {...}
// }
```

如果你正在使用 TypeScript，请在对应的 tsconfig.json 中设置 `compilerOptions.resolveJsonModule` 为 true。

## 关联项目

- [@uni-helper/vite-plugin-uni-manifest](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/core) - 使用 TypeScript 编写 `uni-app` 的 `manifest.json`
- [@uni-helper/manifest-json-schema](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/schema) - 为 uni-app 的 manifest.json 提供 schema
- [@uni-helper/uni-manifest-types](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/types) - 为 uni-app 的 manifest.json 提供 TypeScript 类型
- [uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) - 为 Vite 下的 uni-app 提供基于文件系统的路由
- [uni-helper/vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform) - 基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件
- [uni-helper/vite-plugin-uni-platform-modifier](https://github.com/uni-helper/vite-plugin-uni-platform-modifier) - 为属性、指令提供平台修饰符并按需编译
- [uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) - 为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统
- [uni-ku/root](https://github.com/uni-ku/root) - 解决 uni-app 无法使用根部组件问题
