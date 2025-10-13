<a href="https://uni-helper.js.org/vite-plugin-uni-manifest"><img src="./banner.svg" alt="banner" width="100%"/></a>

<br >
<a href="https://github.com/uni-helper/vite-plugin-uni-manifest/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/vite-plugin-uni-manifest?colorA=005947&colorB=eee&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-manifest"><img src="https://img.shields.io/npm/dm/@uni-helper/vite-plugin-uni-manifest?colorA=005947&colorB=eee&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-manifest"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-manifest?colorA=005947&colorB=eee&style=for-the-badge"></a>

使用 TypeScript 来编写 uni-app 的 manifest.json

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

## 使用

📖 **请阅读[完整文档](https://uni-helper.js.org/vite-plugin-uni-manifest)了解完整使用方法！**

```ts
// vite.config.ts
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniManifest(), // 需要在 Uni() 之前调用
    Uni()
  ],
})
```
