# 开发指南

本文档介绍如何在本地搭建并开发 `vite-plugin-uni-manifest`。

## 前置条件

- [Node.js](https://nodejs.org/) 26（见仓库根目录 `.node-version`）
- [pnpm](https://pnpm.io/) 12.14.0（见根 `package.json` 的 `packageManager` 字段）

## 常用命令

以下命令均在 monorepo 根目录执行：

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 仅构建 core 包
pnpm -C packages/core build

# 以 watch 模式并行构建所有包（开发时使用）
pnpm dev

# 运行测试
pnpm test

# 测试覆盖率
pnpm coverage

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck

# 启动 playground 调试
pnpm play:mp-weixin
pnpm play:h5
```

## 测试

测试文件位于 monorepo 根目录的 `test/` 目录下，使用 [Vitest](https://vitest.dev/) 运行：

```shell
test/
├── watcher.test.ts     createManifestWatcher 深模块（选项解析 + 监听 + 写入 + debug 日志开关）
├── plugin.test.ts      插件工厂形状 + 生命周期
├── writer.test.ts      writeManifestJson 格式化 + 幂等写入 + ensureManifestJsonExists
├── paths.test.ts       resolveManifestJsonPath 路径解析
├── defaults.test.ts    默认配置结构
└── config.test.ts      defineManifestConfig 类型断言
```

`watcher.test.ts` 和 `plugin.test.ts` 使用 `vi.mock` 隔离 `c12` 和文件系统，确保测试不依赖真实环境。

## 项目结构

```shell
vite-plugin-uni-manifest/
├── .agents/skills/     面向 AI 助手的维护技能（更新 packages/types 时使用）
├── .github/workflows/  CI 与发布工作流
├── packages/
│   ├── core/           插件核心逻辑
│   ├── types/          manifest.json TypeScript 类型定义
│   └── schema/         JSON Schema（从 types 自动生成）
├── test/               测试文件
├── playground/         示例 uni-app 项目
└── pnpm-workspace.yaml
```

## 提交规范

Fork 仓库并创建分支，分支名使用 `feat/xxx`、`fix/xxx`、`docs/xxx` 风格。提交信息遵循[约定式提交](https://www.conventionalcommits.org/zh-hans/)规范，破坏性变更需在提交信息中标记（如 `feat!:` 或 `BREAKING CHANGE:`）。发布流程由 `bumpp` 驱动（`pnpm release`），通常无需手动操作。

## Pull Request 指南

- 一个 PR 解决一个问题，不要夹带无关改动。
- 提 PR 前先在本地跑一遍 CI 会执行的检查：`pnpm build`、`pnpm lint`、`pnpm test`、`pnpm typecheck`。
- CI（`.github/workflows/ci.yml`）在 push 和 PR 到 `main` 时运行，矩阵为 ubuntu / macos / windows × Node 22 / 24 / 26，四个步骤全部通过才会合并。
- 改动 `packages/types` 时，`packages/schema/schema.json` 必须在同一次提交里重新生成（`pnpm build` 会顺带生成）。
- 改动脚本、插件选项或导出名时，同步更新根 README、本文件和对应包的 README。
- 新增选项、重构模块这类改动，先开 issue 讨论方案再动手。

## 发布

仅维护者操作：

1. `pnpm release` 调用 `bumpp`，按 `bump.config.ts` 同步 4 个 `package.json` 的版本号；bumpp 默认会提交、打 `v*` tag 并推送。
2. tag 推送后 `.github/workflows/release.yml` 触发：用 changelogithub 生成 GitHub Release，再 `pnpm -r publish --access public` 发布到 npm。

## 行为准则

本项目遵循 [uni-helper 行为准则](https://github.com/uni-helper/.github/blob/main/CODE_OF_CONDUCT.md)。

有问题或建议请到 [GitHub Issues](https://github.com/uni-helper/vite-plugin-uni-manifest/issues) 反馈。
