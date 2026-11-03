# 安装

## 前置条件

- Node.js `^20.19.0` 或 `>=22.12.0`
- Vite `^5.0.0`（插件的 peer 依赖）
- 用 `@dcloudio/vite-plugin-uni` 或 `@uni-helper/plugin-uni` 驱动的 uni-app 项目

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

类型包 `@uni-helper/uni-manifest-types` 会作为依赖一起装上，不需要单独安装。

## 注册插件

在 `vite.config.ts` 里注册，放在 uni 插件之前：

```ts
import Uni from '@uni-helper/plugin-uni'
// 或者
// import dcloudioUni from '@dcloudio/vite-plugin-uni'
// const Uni = dcloudioUni.default || dcloudioUni
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniManifest(), // 需要在 Uni() 之前调用
    Uni(),
  ],
})
```

插件自己设了 `enforce: 'pre'`，在 `plugins` 里靠前写是为了让 `manifest.json` 在同一次 `configResolved` 里更早就绪。

## 下一步

- [创建 manifest.config.ts 并生成 manifest.json](/guide/usage)
