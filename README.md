# @uni-helper/vite-plugin-uni-manifest

使用 TypeScript 编写 `uni-app` 的 `manifest.json`。

<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-manifest"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-manifest" alt="NPM version"></a></p>

## 相关依赖

- [vite-plugin-uni-manifest](./packages/core) - 核心，Vite 插件
- [manifest-json-schema](./packages/schema) - 为 `uni-app` 的 `manifest.json` 提供 schema

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

## 使用

```ts
// vite.config.ts
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UniManifest(), Uni()],
})
```

创建 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`, 然后用 TypeScript 编写你的 `manifest.json`。

```ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // code here...
})
```

在 [这里](./playground/manifest.config.ts)，你可以找到 `uni-app` 默认的 Vite-TS 模版的 `manifest.json` 是如何用 TypeScript 编写的。

## Configuration

请查看 [types.ts](./packages/core/src/types.ts)。
