# 开发指南

本文档介绍如何在本地搭建并开发 `vite-plugin-uni-manifest`。

## 前置条件

- [Node.js](https://nodejs.org/) 24（见仓库根目录 `.node-version`）
- [pnpm](https://pnpm.io/) 10.34.5（见根 `package.json` 的 `packageManager` 字段）

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
pnpm type-check

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
├── packages/
│   ├── core/           插件核心逻辑
│   ├── types/          manifest.json TypeScript 类型定义
│   └── schema/         JSON Schema（从 types 自动生成）
├── test/               测试文件
├── playground/         示例 uni-app 项目
└── pnpm-workspace.yaml
```

## 提交规范

提交信息遵循[约定式提交](https://www.conventionalcommits.org/zh-hans/)规范，破坏性变更需在提交信息中标记（如 `feat!:` 或 `BREAKING CHANGE:`）。发布流程由 `bumpp` 驱动（`pnpm release`），通常无需手动操作。
