# @uni-helper/manifest-json-schema

本包只发布一个**生成物** `schema.json`，内容由 `packages/types` 导出生成，没有手写源码。

## 生成

```bash
pnpm -C packages/schema build   # = ts-json-schema-generator -p ../types/src/index.ts -t ManifestConfig -o schema.json --no-type-check
```

- 输入是 `packages/types/src/index.ts` 的根类型 `ManifestConfig`：根节点结构变了（新增 `mp-*`、`app-*` 等顶层键），schema 的 `definitions` 随之变化。
- 生成器直接读 types 的源码，不需要先构建 types。

## 约定

- **不要手改 `schema.json`**：任何改动都会在下次 `pnpm build` 被覆盖。
- **改 types 必须重建**：`packages/types` 的任何改动都要在同一次提交里重新生成 `schema.json`（根目录 `pnpm build` 或 `pnpm -C packages/schema build`），否则发布出去的 schema 与实际类型不一致。
- **ESLint 忽略该文件**：生成器输出末尾没有换行，`eslint.config.js` 已把 `packages/schema/schema.json` 加进 `ignores`，不要为了 lint 去格式化它。
- **发布形态**：`files` 只有 `schema.json`，没有 `exports` 字段，因此消费方按子路径引用 `@uni-helper/manifest-json-schema/schema.json`；README 里给出的 unpkg / jsDelivr 地址依赖这个文件名不变。
- 版本号由根目录 `pnpm release`（bumpp）和其他包一起同步。
