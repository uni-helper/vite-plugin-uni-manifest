# @uni-helper/manifest-json-schema

为 `uni-app` 的 `manifest.json` 提供 schema。

## 安装

```bash
pnpm add @uni-helper/manifest-json-schema
```

## 用法

```js
import ManifestSchema from '@uni-helper/manifest-json-schema'

console.log(ManifestSchema)

// {
//   "$ref": "#/definitions/ManifestConfig",
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "definitions": {...}
// }
```
