# @uni-helper/vite-plugin-uni-manifest

使用 TypeScript 编写 uni-app 的 `manifest.json`

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

## 使用

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'

export default defineConfig({
  plugins: [
    UniManifest({
      /**
       * minify the `manifest.json`
       * @default false
       */
      minify: true,
      /**
       * Controls whether a newline character is added at the end of the `manifest.json` file.
       * @default false
       */
      newline: true
    }),
    Uni()
  ],
})
```

创建 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`, 然后用 TypeScript 编写你的 `manifest.json`

```ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // code here...
})
```

在[这里](./playground/manifest.config.ts)，你可以找到 uni-app 默认的 Vite-TS 模版的`manifest.json` 是如何用 TypeScript 编写的

## Configuration

查看 [types.ts](./src/types.ts)
