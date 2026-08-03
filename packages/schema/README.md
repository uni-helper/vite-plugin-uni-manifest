# @uni-helper/manifest-json-schema

为 `uni-app` 的 `manifest.json` 提供 schema。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-manifest"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

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