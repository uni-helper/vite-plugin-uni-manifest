# @uni-helper/vite-plugin-uni-manifest

<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-manifest"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-manifest" alt="NPM version"></a>

使用 TypeScript 编写 `uni-app` 的 `manifest.json`。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-manifest"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a> <a href="https://zread.ai/uni-helper/vite-plugin-uni-manifest" target="_blank"><img src="https://img.shields.io/badge/Ask_Zread-_.svg?style=flat&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff" alt="zread"/></a>

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

## 使用

```ts
// vite.config.ts
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UniManifest(), Uni()]
})
```

创建 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`，然后用 TypeScript 编写你的 `manifest.json`。

```ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // 属性参考 manifest.json，理论上一比一对齐
  // 如果发现没有对齐，请提交 issue，谢谢 🙏
  // https://uniapp.dcloud.net.cn/collocation/manifest.html
  name: "my-project",
})
```

在 [这里](../../playground/manifest.config.ts)，你可以找到 `uni-app` 默认的 Vite-TS 模版的 `manifest.json` 是如何用 TypeScript 编写的。

## 插件配置

`UniManifest()` 支持以下选项定义行为：

```ts
interface Options {
  /**
   * 是否压缩生成的 manifest.json（去除缩进和换行）。
   * @default false
   */
  minify?: boolean

  /**
   * 是否在 manifest.json 末尾插入换行。
   * @default false
   */
  insertFinalNewline?: boolean

  /**
   * 解析配置的工作目录。
   * 插件会从该目录查找 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)` 文件。
   * @default process.env.VITE_ROOT_DIR
   */
  cwd?: string
}
```

### minify

默认生成的 `manifest.json` 是格式化后的（缩进 2 空格）。开启 `minify` 后会输出紧凑的 JSON，减少文件体积。

```ts
UniManifest({ minify: true })
```

### insertFinalNewline

控制在生成的 `manifest.json` 末尾是否追加一个换行符。开启后符合 POSIX 文件规范，部分工具链可能会要求文件以换行结尾。

```ts
UniManifest({ insertFinalNewline: true })
```

### cwd

指定插件查找 `manifest.config.*` 配置文件的目录。如果未设置，会使用 `process.env.VITE_ROOT_DIR`（由 `@dcloudio/vite-plugin-uni` 注入的环境变量），通常无需手动配置。

在 monorepo 场景下，如果你需要从其他目录解析配置，可以显式指定：

```ts
UniManifest({ cwd: resolve(__dirname, 'packages/h5') })
```

## FAQ

### 这个插件写入配置晚于 uni-app 读取配置，导致无法正常运行

请使用 [@uni-helper/unh](https://uni-helper.cn/unh/auto-generate)，或自行编写脚本处理。

## 开发

### 前置条件

- [Node.js](https://nodejs.org/) 24
- [pnpm](https://pnpm.io/) 10.33.4

### 常用命令

```bash
# 安装依赖（在 monorepo 根目录执行）
pnpm install

# 构建所有包
pnpm build

# 仅构建 core 包
pnpm -C packages/core build

# 运行测试（在 monorepo 根目录执行）
pnpm test

# 类型检查
pnpm type-check
```

### 测试

测试文件位于 monorepo 根目录的 `test/` 目录下，使用 [Vitest](https://vitest.dev/) 运行：

```shell
test/
├── options.test.ts     resolveOptions 默认值与合并
├── config.test.ts      defineManifestConfig 恒等函数
├── constant.test.ts    resolveManifestJsonPath + 默认配置结构
├── context.test.ts     ManifestContext 构造 + setup
├── writer.test.ts      writeManifestJson 格式化 + ensureManifestJsonExists
└── plugin.test.ts      插件工厂形状 + 生命周期
```

`context.test.ts` 和 `plugin.test.ts` 使用 `vi.mock` 隔离 `c12` 和文件系统，确保测试不依赖真实环境。

### 项目结构

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

## 架构

插件由四个职责清晰的模块组成：

```
index.ts          Vite 插件入口，组装各模块
context.ts        ManifestContext — 配置监听生命周期（c12 watchConfig）
writer.ts         文件 I/O — writeManifestJson / ensureManifestJsonExists
constant.ts       路径解析 — resolveManifestJsonPath + 默认配置
config/index.ts   defineManifestConfig 辅助函数 + 类型重导出
options.ts        resolveOptions — 合并用户选项与默认值
```

### 模块依赖关系

```shell
index.ts
  ├─ context.ts ── writer.ts ── constant.ts (resolveManifestJsonPath)
  │                │
  │                └── options.ts
  └─ writer.ts
```

### 插件生命周期

插件通过 Vite 的生命周期钩子驱动，顺序如下：

1. **`configResolved`**（异步）— 确保 `manifest.json` 存在 → 创建 `ManifestContext` → 调用 `setup()` 启动 c12 监听
2. **运行时** — c12 检测到 `manifest.config.ts` 变更 → `onUpdate` 回调 → `writeManifestJson()` 写入文件
3. **`buildEnd`** — 调用 `unwatch()` 停止 c12 监听

### 关键设计决策

- **无导入时副作用**：所有文件系统操作（路径解析、文件写入）都在插件生命周期内执行，而非模块导入时。这使得模块可独立测试。
- **路径解析为函数**：`resolveManifestJsonPath()` 每次调用重新计算路径，依赖 `process.env.UNI_INPUT_DIR`（由 `@dcloudio/vite-plugin-uni` 注入），不缓存。
- **c12 配置加载**：通过 `c12` 的 `watchConfig` 实现 `manifest.config.ts` 的监听和热更新，支持 `.ts`、`.mts`、`.js`、`.json` 等格式。
