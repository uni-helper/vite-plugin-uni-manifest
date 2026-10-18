# vite-plugin-uni-manifest

用 TypeScript 编写 `uni-app` 的 `manifest.json`：Vite 插件在构建时从 `manifest.config.*` 生成 `manifest.json`，同时发布类型包和 JSON Schema。

## 项目

- **语言/模块**：TypeScript，`strict` 全开（`tsconfig.json`）；ESM only（三个发布包与根的 `package.json` 都是 `"type": "module"`，playground 没有 `type` 字段），产物：core/types 为 `dist/index.mjs` + `dist/index.d.mts`，schema 为 `schema.json`。
- **Node**：开发环境用 26（`.node-version`）；只有 `packages/core` 发布 `engines.node: ^20.19.0 || >=22.12.0`，其余包不声明。
- **包管理器**：pnpm 12.14.0（根 `package.json` 的 `packageManager`）。依赖版本集中在 `pnpm-workspace.yaml` 的 `catalog:`，包里一律写 `"catalog:"`，不要在单个包里写死版本。
- **构建**：`packages/core`、`packages/types` 用 tsdown；`packages/schema` 用 ts-json-schema-generator 从 `packages/types` 生成 `schema.json`。
- **测试**：vitest，无配置文件，测试全部在根目录 `test/`，直接 import `packages/*/src`（靠 tsconfig `paths`，不依赖 `dist`）。
- **Lint**：`@antfu/eslint-config`（`type: 'lib'`），`.md` 里的代码块也会被格式化；`packages/schema/schema.json` 是生成物，已加入 ignores。
- **workspace**：`packages/*` 是三个发布包（`packages/core`、`packages/types`、`packages/schema`），`playground` 是示例 uni-app 应用，不发布。
- **peer 依赖**：`packages/core` peer 依赖 `vite ^5.0.0`；`packages/types` 的 `typescript` peer 可选，范围是 `^5.0.0 || ^6.0.0 || ^7.0.0`（仓库开发用的 catalog 是 `^6.0.3`）。

## 命令

```bash
# 安装
pnpm install

# 构建所有发布包（先清空 packages/*/dist，含从 types 生成 schema.json）
pnpm build

# 只构建 core / types
pnpm -C packages/core build
pnpm -C packages/types build
pnpm -C packages/schema build   # 重新生成 packages/schema/schema.json

# watch 模式并行构建（改包源码时用）
pnpm dev

# 检查
pnpm test                       # vitest，根 test/
pnpm coverage                   # vitest run --coverage
pnpm typecheck                  # tsc --noEmit
pnpm lint                       # eslint .
pnpm lint:fix

# 跑 playground（会先 pnpm dev 构建包，再起 uni-app）
pnpm play:h5
pnpm play:mp-weixin
pnpm build:h5                   # pnpm build + playground build:h5
pnpm build:mp-weixin

# 直接调 playground 的其它平台脚本
pnpm -C playground run dev:app
pnpm -C playground run build:mp-weixin

# 发布（维护者）
pnpm release                    # bumpp：改 4 个 package.json 的版本并打 tag
```

## 架构

| 路径 | 职责 |
| --- | --- |
| `packages/core/src/index.ts` | Vite 插件入口：`enforce: 'pre'`，在 `configResolved` 里启动 watcher，`buildEnd` 里 `unwatch` |
| `packages/core/src/watcher.ts` | 深模块 `createManifestWatcher`：选项解析 + c12 监听 + 首次写入；另含已废弃的 `ManifestContext` |
| `packages/core/src/writer.ts` | `writeManifestJson` / `ensureManifestJsonExists`，内容未变时跳过写入 |
| `packages/core/src/paths.ts` | `resolveManifestJsonPath`，每次重新读 `UNI_INPUT_DIR` |
| `packages/core/src/defaults.ts` | `defaultManifestConfig`（c12 的 `defaultConfig`） |
| `packages/core/src/config.ts` | `defineManifestConfig` 辅助函数，并 re-export 整个 types 包 |
| `packages/core/src/logger.ts` | `debug` 包封装的分类日志（`options` / `config` / `writer`） |
| `packages/core/src/types.ts` | `Options` / `UserOptions` / `ResolvedOptions` / `DebugType` |
| `packages/types/src/*.ts` | `manifest.json` 类型定义，按平台/节点分文件（详见 `packages/types/AGENTS.md`） |
| `packages/schema/schema.json` | **生成物**：从 `packages/types` 的 `ManifestConfig` 生成，不要手改 |
| `test/` | 根目录的 vitest 测试，模块级 `vi.mock` 隔离 fs 与 c12 |
| `playground/` | 示例 uni-app 应用，`vite.config.mts` 里注册插件 |

数据流：`packages/types` 是类型的事实来源 → `packages/schema` 从中生成 `schema.json` → `packages/core` 通过 `src/config.ts` re-export 类型并消费 `ManifestConfig`。

## 约定

- **提交信息**：Conventional Commits（`feat:` / `fix:` / `docs:` / `chore:` / `test:` …），破坏性变更加 `!` 或 `BREAKING CHANGE:`。
- **改 types 必须重建 schema**：`packages/schema/schema.json` 是生成物，任何 `packages/types` 的改动都要在同一次提交里跑 `pnpm build`（或 `pnpm -C packages/schema build`）把 `schema.json` 一起带上。
- **注释语言**：`packages/core/src` 用英文 JSDoc；`packages/types/src` 用中文 JSDoc。
- **文档链接**：JSDoc 里的链接写成 `<https://…>` 尖括号形式，改完要确认页面与锚点仍存在。
- **测试方式**：测试放在根 `test/`，用 `vi.mock` 替换 `paths` / `defaults` / `writer` / `c12`，不依赖真实文件系统和真实配置加载。
- **平台路径**：`resolveManifestJsonPath` 返回 POSIX 风格路径（内部用 Vite 的 `normalizePath`），在 Windows 上是 `D:/…` 形式；断言路径时先归一化。
- **CI**：`.github/workflows/ci.yml` 在 push / PR 到 `main` 时跑 `build` → `lint` → `test` → `typecheck`，矩阵为 ubuntu / macos / windows × Node 22 / 24 / 26。
- **发布**：`pnpm release`（bumpp 同步 4 个 `package.json` 的版本并打 `v*` tag）→ `release.yml` 用 changelogithub 建 GitHub Release，再 `pnpm -r publish`。
- **更新类型**：按 `.agents/skills/bump-types/SKILL.md` 对照 DCloud 官方文档（`uniapp.dcloud.net.cn/collocation/manifest.html`、`doc.dcloud.net.cn/uni-app-x/collocation/manifest.html` 及其外链）核对字段与注释。
- **文档同步**：README、CONTRIBUTING、各包 README 会随包发布，改脚本、选项、导出名时要一并更新。
