# @uni-helper/uni-manifest-types

本包只提供 `uni-app` 的 `manifest.json` 类型，没有运行时代码：`src/index.ts` 只做 re-export，`src/*.ts` 按平台/节点分文件（`app-plus`、`app-harmony`、`mp-weixin`、`h5`、`web` 等）。

## 构建

```bash
pnpm -C packages/types build   # tsdown → dist/index.mjs + dist/index.d.mts
```

`dist/` 是产物，不要手改。本包无 `dependencies`；`typescript ^5.0.0` 是可选 peer，但仓库开发用的 catalog 是 `typescript ^6.0.3`。

## 命名与注释约定

- **接口按 manifest 节点命名并用 PascalCase**：根节点 `ManifestConfig`（另导出 `UserManifestConfig` 别名），平台节点 `AppPlus` / `App` / `AppAndroid` / `AppIos` / `AppHarmony` / `Web` / `H5` / `MpWeixin` / `MpAlipay` / …，子节点 `AppDistribute` / `AppModules` / `AppIcons` / `AppSplashScreens` 等，前缀表示所属节点。
- **注释用中文 JSDoc**，标签沿用现有写法：`@default`、`@since`（写 `HBuilderX x.y+` 或插件版本 `0.5.1`）、`@deprecated`、`@example`、`@format color`。
- **文档链接**写成 `<https://…>` 尖括号形式，尽量指到具体锚点；引用完要能打开，锚点会随官方文档改版失效。
- **键名**：manifest 里带 `-` 的键（`app-plus`、`mp-weixin`、`uni-app-x`、`background@night`）用引号包起来；普通 camelCase 键不加引号。
- **索引签名**：节点型接口末尾保留 `[x: string]: any`，让官方新增但类型未收录的字段仍能写入；叶子配置（如 `AppHarmonyDistributeSigningConfig`）可以不加。
- 类型是包的公开 API：接口改名或删除字段都算破坏性变更，`packages/core` 还会通过 `src/config.ts` 把整包 re-export 出去。

## 更新流程

按 `.agents/skills/bump-types/SKILL.md` 执行，要点：

1. 对照 `https://uniapp.dcloud.net.cn/collocation/manifest.html`（js 引擎版）和 `https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html`（uni-app x）逐节点核对字段、默认值、枚举值。
2. 两个页面上的外链，以及本包注释里已经写着的链接，也要打开核对，锚点和内容都可能变。
3. 官方文档常把同一信息拆散在多处、彼此矛盾；以能落到具体源码视图示例或配置项表的那条为准，无法确认的写进交接说明，不要臆造字段。
4. 改完跑 `pnpm -C packages/types build`、`pnpm typecheck`、`pnpm lint`，并按 `AGENTS.md`（根目录）的要求在同一次提交里重新生成 `packages/schema/schema.json`。
