# vite-plugin-uni-manifest

用 TypeScript 编写 `uni-app` 的 `manifest.json`：Vite 插件在构建时从 `manifest.config.*` 生成 `manifest.json`，同时发布类型包和 JSON Schema。

## 项目

- **语言/模块**：TypeScript，`strict` 全开（`tsconfig.json`）；ESM only（三个发布包与根的 `package.json` 都是 `"type": "module"`，playground 没有 `type` 字段），产物：core/types 为 `dist/index.mjs` + `dist/index.d.mts`，schema 为 `schema.json`。
- **Node**：开发环境用 26（`.node-version`）；只有 `packages/core` 发布 `engines.node: "^22.22.2 || ^24.15.0 || >=26.0.0"`，其余包不声明。
- **包管理器**：pnpm 12.16.1（根 `package.json` 的 `packageManager`）。依赖版本集中在 `pnpm-workspace.yaml` 的 `catalog:`，包里一律写 `"catalog:"`，不要在单个包里写死版本。
- **构建**：`packages/core`、`packages/types` 用 tsdown；`packages/schema` 用 ts-json-schema-generator 从 `packages/types` 生成 `schema.json`。
- **测试**：vitest，无配置文件，测试全部在根目录 `test/`，直接 import `packages/*/src`（靠 tsconfig `paths`，不依赖 `dist`）。
- **Lint**：`@antfu/eslint-config`（`type: 'lib'`），`.md` 里的代码块也会被格式化；`packages/schema/schema.json` 是生成物，已加入 ignores。
- **workspace**：`packages/*` 是三个发布包（`packages/core`、`packages/types`、`packages/schema`），`playground` 是示例 uni-app 应用，不发布。
- **依赖**：`packages/core` 的运行时依赖是 `@uni-helper/uni-manifest-types`、`c12`、`obug`；根 `devDependencies` 也装了 `obug`，因为根 `test/` 直接 import 它的 `disable()` 来重置命名空间。
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

# 文档站（VitePress，本地预览会起 dev server）
pnpm docs:dev
pnpm docs:build                  # 产物在 docs/.vitepress/dist
pnpm docs:preview

# 发布（维护者）
pnpm release                    # bumpp：改 4 个 package.json 的版本并打 tag
```

## 架构

| 路径 | 职责 |
| --- | --- |
| `packages/core/src/index.ts` | Vite 插件入口：`enforce: 'pre'`，`configResolved` 里启动 watcher（`command === 'build'` 且没有 `build.watch` 时只调一次 `generateManifest`）；插件不 `unwatch`，否则 watch 期间第一次 `buildEnd` 后同步就断了 |
| `packages/core/src/watcher.ts` | 深模块 `createManifestWatcher`：选项解析 + c12 监听 + 首次写入；一次性构建走同文件的 `generateManifest`（c12 `loadConfig`）；`dotenv` 用 Vite 的 `loadEnv`（空前缀）写回 `process.env`，`replaceArrays` 映射到 c12 的 `merger`；找不到 `manifest.config.*` 时不写文件（避免覆盖手写的 `manifest.json`） |
| `packages/core/src/writer.ts` | `resolveOutputSpec` 把已解析选项折成 `OutputSpec`，`writeManifestJson(config, spec)` 负责目录优先级（`outDir` → `UNI_INPUT_DIR` → `cwd/src`，相对路径以 `cwd` 为基准，环境变量每次写入重读）、格式化与幂等写入 |
| `packages/core/src/defaults.ts` | `defaultManifestConfig`（c12 的 `defaultConfig`） |
| `packages/core/src/config.ts` | `defineManifestConfig` 辅助函数，并 re-export 整个 types 包 |
| `packages/core/src/logger.ts` | `obug` 封装的分类日志（`options` / `config` / `writer`） |
| `packages/core/src/types.ts` | `Options` / `UserOptions` / `ResolvedOptions` / `DebugType` |
| `packages/types/src/*.ts` | `manifest.json` 类型定义，按平台/节点分文件（详见 `packages/types/AGENTS.md`） |
| `packages/schema/schema.json` | **生成物**：从 `packages/types` 的 `ManifestConfig` 生成，不要手改 |
| `test/` | 根目录的 vitest 测试，模块级 `vi.mock` 隔离 fs 与 c12；`load-config.test.ts` 与 `prepare.test.ts` 例外，用真实 c12 验证 `.env` 与提前生成 |
| `docs/` | VitePress 文档站（`pnpm docs:dev` / `docs:build` / `docs:preview`），内容以 `packages/core/src` 的实现为准 |
| `playground/` | 示例 uni-app 应用，`vite.config.mts` 里注册插件 |

数据流：`packages/types` 是类型的事实来源 → `packages/schema` 从中生成 `schema.json` → `packages/core` 通过 `src/config.ts` re-export 类型并消费 `ManifestConfig`。

## 约定

- **提交信息**：Conventional Commits（`feat:` / `fix:` / `docs:` / `chore:` / `test:` …），破坏性变更加 `!` 或 `BREAKING CHANGE:`。
- **改 types 必须重建 schema**：`packages/schema/schema.json` 是生成物，任何 `packages/types` 的改动都要在同一次提交里跑 `pnpm build`（或 `pnpm -C packages/schema build`）把 `schema.json` 一起带上。
- **注释语言**：`packages/core/src` 用英文 JSDoc；`packages/types/src` 用中文 JSDoc。
- **文档链接**：JSDoc 里的链接写成 `<https://…>` 尖括号形式，改完要确认页面与锚点仍存在。
- **测试方式**：测试放在根 `test/`，用 `vi.mock` 替换 `defaults` / `c12`。`writer.test.ts` 与 `watcher.test.ts` 用真实临时目录写盘，不再 mock writer。
- **平台路径**：`writeManifestJson` 写的是 POSIX 风格路径（内部用 Vite 的 `normalizePath`），在 Windows 上是 `D:/…` 形式；断言路径时先归一化。
- **CI**：`.github/workflows/ci.yml` 在 push / PR 到 `main` 时跑 `build` → `lint` → `test` → `typecheck`，矩阵为 ubuntu / macos / windows × Node 22 / 24 / 26。
- **发布**：`pnpm release`（bumpp 同步 4 个 `package.json` 的版本并打 `v*` tag）→ `release.yml` 用 changelogithub 建 GitHub Release，再 `pnpm -r publish`。
- **更新类型**：按 `.agents/skills/bump-types/SKILL.md` 对照 DCloud 官方文档（`uniapp.dcloud.net.cn/collocation/manifest.html`、`doc.dcloud.net.cn/uni-app-x/collocation/manifest.html` 及其外链）核对字段与注释。
- **文档同步**：README、CONTRIBUTING、各包 README 会随包发布，改脚本、选项、导出名时要一并更新。
