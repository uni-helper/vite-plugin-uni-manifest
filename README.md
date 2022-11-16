# @uni-helper/vite-plugin-uni-manifest

Use TypeScript to write `manifest.json` of uni-app

English | [简体中文](./README.ZhCN.md)

## Installation

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import Uni from "@dcloudio/vite-plugin-uni";
import UniManifest from "@uni-helper/vite-plugin-uni-manifest";
export default defineConfig({
  plugins: [Uni(), UniManifest()],
});
```

Create `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`, and write your `manifest.json` using TypeScript.

```ts
// manifest.config.ts
import { defineManifestConfig } from "@uni-helper/vite-plugin-uni-manifest";

export default defineManifestConfig({...});
```

[Here](./playground/manifest.config.ts) you can find how the `manifest.json` of the default `Vite-TS` template is written in Typescript.

## Configuration

see [types.ts](./src/types.ts)
